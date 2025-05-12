"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { withSearch } from "@elastic/react-search-ui";

const QuerySuggestions = ({ resultSearchTerm }: any) => {
  const [workerResult, setWorkerResult] = useState(null);
  const [workerReady, setWorkerReady] = useState(null);
  const worker = useRef(null);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('./pipeline_worker.js', import.meta.url), {
        type: 'module'
      });
    }

    const onMessageReceived = (e) => {
      switch (e.data.status) {
        case 'initiate':
          setWorkerReady(false);
          break;
        case 'ready':
          setWorkerReady(true);
          break;
        case 'complete':
          setWorkerResult(e.data.output);
          break;
      }
    };

    worker.current.addEventListener('message', onMessageReceived);
    return () => worker.current.removeEventListener('message', onMessageReceived);
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
    if (!workerReady || !workerResult) {
      setSuggestions([]);
      return;
    }

    setSuggestions([workerResult[0]]); // TODO
  }, [resultSearchTerm, workerReady])

  return (
    <div id="query-suggestions">
      <p>Hi here, you just searched {resultSearchTerm}.</p>
      {(suggestions.length > 0) && (
        <p>{JSON.stringify(suggestions, null, 2)}</p>
      )}
    </div>
  )
}

export default withSearch(({ resultSearchTerm }) => ({
  resultSearchTerm,
}))(QuerySuggestions);
