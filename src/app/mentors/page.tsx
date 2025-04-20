"use client";
import React, { useEffect } from "react";
import { Layout } from "@elastic/react-search-ui-views";
import {
  PagingInfo,
  ResultsPerPage,
  Paging,
  Facet,
  SearchProvider,
  Results,
  SearchBox,
  Sorting,
} from "@elastic/react-search-ui";
import { FilterType, SortDirection } from "@elastic/search-ui";
import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";

import Canvas from "../../components/Canvas";
import ClearFacets from "../../components/ResetButton";
import ResultView from "../../components/ResultView";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import "../../styles/App.css";

import {
  createTracker,
  trackPageView,
  trackSearch,
  trackSearchClick,
} from "@elastic/behavioral-analytics-javascript-tracker";

const ELASTIC_CLOUD_ID =
  "My_deployment:YXAtc291dGhlYXN0LTEuYXdzLmZvdW5kLmlvJGZmM2E4NzcwZmM2YzRiYTZiMDcwZmZiNzQzM2ExMDk0JDgwZDc3ZGY2NGQxODQwMjNiNDkxOWQ0YWEwNWVjZjRm";
const ELASTIC_ENDPOINT =
  "https://ff3a8770fc6c4ba6b070ffb7433a1094.ap-southeast-1.aws.found.io:443";
const ELASTIC_APIKEY =
  "Slp3MDVwVUJpOWRNZTZnQmdrbU46YTU5RTBtdVlTVXVpMS1qYWdKSUljQQ=="; // exposed to client! should be read-only
const ELASTIC_INDEX = "mentorship-page-current";

createTracker({
  endpoint: ELASTIC_ENDPOINT,
  collectionName: process.env.NODE_ENV,
  apiKey: ELASTIC_APIKEY,
});

const App = () => {
  const WAVE = { waveId: "2024", waveName: "2024 Wave" };

  const connector = new ElasticsearchAPIConnector({
    cloud: { id: ELASTIC_CLOUD_ID },
    apiKey: ELASTIC_APIKEY,
    index: ELASTIC_INDEX,
  });

  const configurationOptions = {
    alwaysSearchOnInitialLoad: true,
    apiConnector: connector,
    autocompleteQuery: {
      suggestions: {
        types: {
          documents: {
            fields: [
              "name.suggest",
              "organisation.suggest",
              "role.suggest",
              "course_of_study.suggest",
            ],
          },
        },
        size: 5,
      },
    },
    initialState: {
      resultsPerPage: 80,
      sort: [{ field: "", direction: "asc" as SortDirection }],
    },
    searchQuery: {
      result_fields: {
        course_of_study: { raw: {}, snippet: { size: 100 } },
        full_bio: { raw: {}, snippet: { size: 200, fallback: true } },
        full_image_url: { raw: {} },
        industries: { raw: {} },
        name: { raw: {}, snippet: { size: 100 } },
        organisation: { raw: {}, snippet: { size: 100 } },
        role: { raw: {}, snippet: { size: 100 } },
        school: { raw: {}, snippet: { size: 100 } },
        thumbnail_image_url: { raw: {} },
      },
      filters: [
        {
          type: "all" as FilterType,
          field: "wave_id",
          values: [WAVE.waveId],
        },
      ],
      disjunctiveFacets: ["organisation.keyword", "course_of_study.keyword"],
      facets: {
        industries: { type: "value", size: 100 },
        "organisation.keyword": { type: "value", size: 100 },
        "course_of_study.keyword": { type: "value", size: 100 },
      },
    },
  };

  useEffect(() => {
    trackPageView({ document: { id: "Mentors Search Page", index: "pages" } });
  }, []);

  // Track search when query is entered
  const handleSearchQuery = (query: string) => {
    // Call trackSearch when a search query is entered
    trackSearch({ search: { query } });
  };

  // Track search click when a result is clicked
  const handleSearchClick = (id: string, query: string) => {
    trackSearchClick({
      document: {
        id: id,
        index: "mentors",
      },
      search: {
        query: query,
      },
    });
  };

  return (
    <Canvas>
      <div className="results" id="mentors">
        <SearchProvider config={configurationOptions}>
          <div className="App">
            <Layout
              header={
                <SearchBox
                  autocompleteSuggestions={true}
                  searchAsYouType={true}
                  debounceLength={300}
                  onSubmit={handleSearchQuery}
                />
              }
              bodyContent={
                <Results
                  resultView={({ result }) => (
                    <ResultView result={result} onClick={handleSearchClick} />
                  )}
                />
              }
              sideContent={
                <div>
                  <Sorting
                    label="Sort by"
                    sortOptions={[
                      {
                        name: "Relevance",
                        value: "",
                        direction: "",
                      },
                      {
                        name: "Name",
                        value: "name.keyword",
                        direction: "asc",
                      },
                    ]}
                  />
                  <Facet field="industries" label="Industries" />
                  <Facet
                    field="organisation.keyword"
                    filterType="any"
                    label="Organisation"
                  />
                  <Facet
                    field="course_of_study.keyword"
                    filterType="any"
                    label="Course of Study"
                  />
                  <ClearFacets />
                </div>
              }
              bodyHeader={
                <React.Fragment>
                  {<PagingInfo />}
                  <div className="search-config">
                    <ResultsPerPage options={[20, 40, 80]} />
                  </div>
                </React.Fragment>
              }
              bodyFooter={<Paging />}
            />
          </div>
        </SearchProvider>
      </div>
    </Canvas>
  );
};

export default App;
