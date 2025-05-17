"use client";
import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import { LRUCache } from "lru-cache";
import { withSearch } from "@elastic/react-search-ui";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";

// FIXME: make these globals
const ELASTIC_ENDPOINT =
  "https://ff3a8770fc6c4ba6b070ffb7433a1094.ap-southeast-1.aws.found.io:443";
const ELASTIC_APIKEY =
  "Slp3MDVwVUJpOWRNZTZnQmdrbU46YTU5RTBtdVlTVXVpMS1qYWdKSUljQQ=="; // exposed to client! should be read-only
const ELASTIC_INDEX = "query-suggestions";

const MIN_HITS = 1;
const MAX_HITS = Infinity;
const NUM_SUGGESTIONS = 10;
const NUM_CANDIDATES = NUM_SUGGESTIONS * 5;
const cache = new LRUCache({ max: 100 });

const QuerySuggestionsList = ({ resultSearchTerm, setSearchTerm }: any) => {
  const [suggestions, setSuggestions] = useState(null);
  const [workerResult, setWorkerResult] = useState(null);
  const worker = useRef(null);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("./pipeline_worker.js", import.meta.url),
        {
          type: "module",
        },
      );
    }

    const onMessageReceived = (e) => {
      switch (e.data.status) {
        case "complete":
          setWorkerResult(e.data.output);
          break;
      }
    };

    worker.current.addEventListener("message", onMessageReceived);
    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  });

  useEffect(() => {
    if (/^\s*$/.test(resultSearchTerm) || resultSearchTerm.length <= 2) {
      setSuggestions([]);
      return;
    }

    if (cache.has(resultSearchTerm)) {
      setSuggestions(cache.get(resultSearchTerm));
      setWorkerResult(null);
      return;
    }

    if (worker.current) {
      worker.current.postMessage({ text: resultSearchTerm });
    }
  }, [resultSearchTerm]);

  useEffect(() => {
    if (!workerResult) {
      return;
    }

    const embedding = workerResult;

    async function setTopSuggestions() {
      const response = await axios.post(
        `${ELASTIC_ENDPOINT}/${ELASTIC_INDEX}/_search`,
        {
          retriever: {
            knn: {
              field: "embedding",
              query_vector: embedding,
              k: NUM_CANDIDATES,
              num_candidates: NUM_CANDIDATES,
            },
          },
          fields: ["suggestion", "num_hits"],
          _source: false,
        },
        {
          headers: {
            Authorization: `ApiKey ${ELASTIC_APIKEY}`,
            "Content-Type": "application/json",
          },
        },
      );
      const suggestions_arr = response.data.hits.hits
        .filter(
          (hit) =>
            hit.fields.num_hits >= MIN_HITS &&
            hit.fields.num_hits <= MAX_HITS &&
            hit.fields.suggestion[0].toLowerCase().trim() !=
              resultSearchTerm.toLowerCase().trim(),
        )
        .map((hit) => hit.fields.suggestion[0]);
      cache.set(resultSearchTerm, suggestions_arr);
      setSuggestions(suggestions_arr);
    }

    setTopSuggestions();
  }, [workerResult]);

  if (suggestions === null) {
    return <CircularProgress />;
  }
  return suggestions.length == 0 ? (
    <Typography style={{ marginBottom: "0.5rem" }}>
      No suggestions available.
    </Typography>
  ) : (
    <>
      {suggestions.slice(0, NUM_SUGGESTIONS).map((suggestion, index) => (
        <Button
          key={index}
          variant="outlined"
          style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }}
          onClick={() => {
            setSuggestions(null);
            setSearchTerm(suggestion);
          }}
        >
          {suggestion}
        </Button>
      ))}
    </>
  );
};

const QuerySuggestions = ({ resultSearchTerm, setSearchTerm }: any) => {
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <div
      id="query-suggestions"
      style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
    >
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={isEnabled}
              onChange={(e) => setIsEnabled(e.target.checked)}
            />
          }
          label="AI Suggestions"
        />
      </FormGroup>
      {isEnabled && (
        <>
          <Alert severity="warning" style={{ marginBottom: "1rem" }}>
            The "AI Suggestions" feature is experimental and automatically
            generated using artificial intelligence. Advisory does not guarantee
            the accuracy or relevance of the information provided, and in no way
            do we assume any liability for the use or interpretation of this
            content.
          </Alert>
          <QuerySuggestionsList
            resultSearchTerm={resultSearchTerm}
            setSearchTerm={setSearchTerm}
          />
        </>
      )}
    </div>
  );
};

export default withSearch(({ resultSearchTerm, setSearchTerm }) => ({
  resultSearchTerm,
  setSearchTerm,
}))(QuerySuggestions);
