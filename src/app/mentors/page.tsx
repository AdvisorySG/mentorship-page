"use client";
import React from "react";
import { init as initApm } from "@elastic/apm-rum";
import { withTransaction } from "@elastic/apm-rum-react";
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
  initApm({
    serviceName: "mentorship-page",
    serverUrl:
      "https://8dd263e7f7024f9086fd4aa060ae4d79.apm.ap-southeast-1.aws.cloud.es.io:443",
    serviceVersion: "",
    environment: process.env.NODE_ENV,
  });

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
      resultsPerPage: 200,
      sort: [{ field: "", direction: "asc" as SortDirection }],
    },
    searchQuery: {
      search_fields: {
        name: { weight: 10 },
        organisation: { weight: 5 },
        role: { weight: 3 },
        course_of_study: { weight: 2 },
        school: { weight: 1 },
        full_bio: { weight: 1 },
      },
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
      // FIXME: see https://github.com/AdvisorySG/mentorship-page/issues/918
      //filters: [{ type: "all" as FilterType, field: "wave_id", values: [WAVE.waveId] }],
      facets: {
        industries: { type: "value", size: 100 },
        "organisation.keyword": { type: "value", size: 100 },
        "course_of_study.keyword": { type: "value", size: 100 },
      },
      disjunctiveFacets: ["organisation.keyword", "course_of_study.keyword"],
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
                <>
                  <PagingInfo />
                  <Paging />
                  <div className="search-config">
                    <ResultsPerPage options={[50, 100, 200]} />
                  </div>
                </>
              }
              bodyFooter={<Paging />}
            />
          </div>
        </SearchProvider>
      </div>
    </Canvas>
  );
};

export default withTransaction("App", "component")(App);
