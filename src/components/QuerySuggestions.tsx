"use client";
import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import { withSearch } from "@elastic/react-search-ui";

// FIXME: make these globals
const ELASTIC_ENDPOINT =
  "https://ff3a8770fc6c4ba6b070ffb7433a1094.ap-southeast-1.aws.found.io:443";
const ELASTIC_APIKEY =
  "Slp3MDVwVUJpOWRNZTZnQmdrbU46YTU5RTBtdVlTVXVpMS1qYWdKSUljQQ=="; // exposed to client! should be read-only
const ELASTIC_INDEX = "query-suggestions";

const MIN_HITS = 5;
const MAX_HITS = 40;
const NUM_CANDIDATES = 10;

const QuerySuggestions = ({ resultSearchTerm }: any) => {
  const [workerResult, setWorkerResult] = useState(null);
  const [workerReady, setWorkerReady] = useState(null);
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
        case "initiate":
          setWorkerReady(false);
          break;
        case "ready":
          setWorkerReady(true);
          break;
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
    if (/^\s*$/.test(resultSearchTerm)) {
      return;
    }

    if (worker.current) {
      worker.current.postMessage({ text: resultSearchTerm });
    }
  }, [resultSearchTerm]);

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!workerResult) {
      setSuggestions([]);
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
      setSuggestions(
        response.data.hits.hits
          .filter(
            (hit) =>
              hit.fields.num_hits >= MIN_HITS &&
              hit.fields.num_hits <= MAX_HITS &&
              hit.fields.suggestion[0].toLowerCase().trim() !=
                resultSearchTerm.toLowerCase().trim(),
          )
          .map((hit) => [hit.fields.suggestion[0], hit._score]),
      );
    }

    setTopSuggestions();
  }, [workerResult]);

  return (
    <>
      {workerReady && (
        <div id="query-suggestions">
          <p>Query Suggestions for {resultSearchTerm}:</p>
          <ul>
            {suggestions.map(([suggestion, score]) => (
              <li>
                {suggestion} ({score})
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default withSearch(({ resultSearchTerm }) => ({
  resultSearchTerm,
}))(QuerySuggestions);
