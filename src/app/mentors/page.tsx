"use client";
import { init as initApm } from "@elastic/apm-rum";
import { withTransaction } from "@elastic/apm-rum-react";
import {
  FacetViewProps,
  Layout,
  MultiCheckboxFacet,
} from "@elastic/react-search-ui-views";

import {
  Facet,
  PagingInfo,
  ResultsPerPage,
  Paging,
  SearchProvider,
  Results,
  SearchBox,
  Sorting,
} from "@elastic/react-search-ui";
import { SortDirection } from "@elastic/search-ui";
import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";

import Canvas from "../../components/Canvas";
import ClearFacets from "../../components/ResetButton";
import ResultView from "../../components/ResultView";
import QuerySuggestions from "../../components/QuerySuggestions";
import {
  MENTORS_ELASTIC_CLOUD_ID,
  MENTORS_ELASTIC_APIKEY,
  MENTORS_ELASTIC_INDEX,
} from "../../lib/elasticsearch";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import "../../styles/App.css";

const CustomSortFacetView: React.FC<FacetViewProps> = (props) => {
  const { options } = props;

  const sortedOptions = [...options].sort((a, b) => {
    // First: checked items come first
    if (a.selected && !b.selected) return -1;
    if (!a.selected && b.selected) return 1;

    // Second: sort by count descending
    if (a.count !== b.count) {
      return b.count - a.count;
    }

    // Tiebreaker: alphabetical order by value
    if (typeof a.value === "string" && typeof b.value === "string") {
      return a.value.localeCompare(b.value);
    }
    return 0;
  });

  return <MultiCheckboxFacet {...props} options={sortedOptions} />;
};

const App = () => {
  initApm({
    serviceName: "mentorship-page",
    serverUrl: "https://advisorysg-mentorship.apm.ap-southeast-1.aws.found.io",
    serviceVersion: "",
    environment: process.env.NODE_ENV,
  });

  const connector = new ElasticsearchAPIConnector({
    cloud: { id: MENTORS_ELASTIC_CLOUD_ID },
    apiKey: MENTORS_ELASTIC_APIKEY,
    index: MENTORS_ELASTIC_INDEX,
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
      fuzziness: true,
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
        competencies: { raw: {} },
        name: { raw: {}, snippet: { size: 100 } },
        organisation: { raw: {}, snippet: { size: 100 } },
        role: { raw: {}, snippet: { size: 100 } },
        school: { raw: {}, snippet: { size: 100 } },
        thumbnail_image_url: { raw: {} },
      },
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
                <div>
                  <SearchBox
                    autocompleteSuggestions={true}
                    searchAsYouType={false}
                  />
                  {/* <QuerySuggestions /> */}
                </div>
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
                  <Facet
                    field="industries"
                    label="Industries"
                    view={CustomSortFacetView}
                  />
                  <Facet
                    field="organisation.keyword"
                    filterType="any"
                    label="Organisation"
                    view={CustomSortFacetView}
                  />
                  <Facet
                    field="course_of_study.keyword"
                    filterType="any"
                    label="Course of Study"
                    view={CustomSortFacetView}
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
