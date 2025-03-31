"use client";
import React from "react";
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

const ELASTIC_CLOUD_ID =
  "My_deployment:YXAtc291dGhlYXN0LTEuYXdzLmZvdW5kLmlvJGZmM2E4NzcwZmM2YzRiYTZiMDcwZmZiNzQzM2ExMDk0JDgwZDc3ZGY2NGQxODQwMjNiNDkxOWQ0YWEwNWVjZjRm";
const ELASTIC_APIKEY =
  "Slp3MDVwVUJpOWRNZTZnQmdrbU46YTU5RTBtdVlTVXVpMS1qYWdKSUljQQ=="; // exposed to client! should be read-only
const ELASTIC_INDEX = "mentorship-page-current";

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
                />
              }
              bodyContent={
                <Results
                  resultView={({ result }) => <ResultView result={result} />}
                />
              }
              sideContent={
                <div>
                  <Sorting
                    label="Sort by"
                    sortOptions={[
                      { name: "Relevance", value: "", direction: "" },
                      { name: "Name", value: "name.keyword", direction: "asc" },
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
