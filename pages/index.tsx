import React, { useState } from "react";

import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
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
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Header from "../src/components/Header";
import ResultView from "../src/components/ResultView";
import "../src/App.css";

const App = () => {
  const isSmall = useMediaQuery("(max-width: 800px)");
  const [isListView, setIsListView] = useState(false);

  const WAVES = [
    { waveId: 3, waveName: "Institution-Specific Wave" },
    { waveId: 2, waveName: "2022 Wave" },
  ];
  const [currentTabId, setCurrentTabId] = useState(0);

  const connector = new AppSearchAPIConnector({
    engineName: "mentorship-page",
    endpointBase: "https://advisorysg.ent.ap-southeast-1.aws.found.io",
    searchKey: "search-bv3s7kksqjinbswx7g4my9ur",
  });

  const configurationOptions = {
    alwaysSearchOnInitialLoad: true,
    apiConnector: connector,
    autocompleteQuery: {
      suggestions: {
        types: {
          documents: {
            fields: [
              "name",
              "organisation",
              "role",
              "school",
              "course_of_study",
            ],
          },
        },
        size: 5,
      },
    },
    initialState: {
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
          values: [WAVES[currentTabId].waveId],
        },
      ],
      disjunctiveFacets: ["organisation", "school", "course_of_study"],
      facets: {
        industries: { type: "value", size: 100 },
        organisation: { type: "value", size: 100 },
        school: { type: "value", size: 100 },
        course_of_study: { type: "value", size: 100 },
      },
    },
  };

  const handleTabChange = (_: React.ChangeEvent<{}>, tab: number) =>
    setCurrentTabId(tab);

  return (
    <div className="container">
      <Header />
      <div className="canvas">
        <p className="disclaimer">
          <small>
            The privacy and safety of our mentors is of utmost priority to
            Advisory. Any attempt to approach or contact our mentors outside of
            the parameters of the Advisory Mentorship Programme—whilst claiming
            affiliation to Advisory, or misrepresenting a relationship to
            Advisory—will be treated as misrepresentation, even fraudulent
            misrepresentation, as considered under the Misrepresentation Act.
            Advisory will take legal action against any individuals or
            organisations who attempt to deceive, harass, or otherwise request
            dishonest assistance from our mentors.
          </small>
        </p>
        <div className="results" id="mentors">
          <SearchProvider config={configurationOptions}>
            <div className="App">
              <Layout
                header={
                  <div>
                    <SearchBox
                      autocompleteSuggestions={true}
                      searchAsYouType={true}
                      debounceLength={300}
                    />
                    <br></br>
                    <Tabs
                      value={currentTabId}
                      onChange={handleTabChange}
                      variant="scrollable"
                      scrollButtons="auto"
                      textColor="primary"
                      indicatorColor="primary"
                    >
                      {WAVES.map(({ waveName }) => (
                        <Tab label={waveName} />
                      ))}
                    </Tabs>
                  </div>
                }
                bodyContent={
                  <Results
                    resultView={({ result }) => (
                      <ResultView result={result} isListView={isListView} />
                    )}
                  />
                }
                sideContent={
                  <div>
                    <Sorting
                      label={"Sort by"}
                      sortOptions={[
                        { name: "Relevance", value: "", direction: "" },
                        { name: "Name", value: "name", direction: "asc" },
                      ]}
                    />
                    <Facet field="industries" label="Industries" />
                    <Facet
                      field="organisation"
                      filterType="any"
                      label="Organisation"
                    />
                    <Facet field="school" filterType="any" label="School" />
                    <Facet
                      field="course_of_study"
                      filterType="any"
                      label="Course of Study"
                    />
                  </div>
                }
                bodyHeader={
                  <React.Fragment>
                    {<PagingInfo />}
                    <div className="search-config">
                      <ResultsPerPage />
                      <span
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <IconButton
                          aria-label="grid view"
                          color={isListView ? "default" : "primary"}
                          onClick={() => setIsListView(false)}
                          size={isSmall ? "small" : "medium"}
                        >
                          <GridViewIcon />
                        </IconButton>
                        <IconButton
                          aria-label="list view"
                          color={isListView ? "primary" : "default"}
                          onClick={() => setIsListView(true)}
                          size={isSmall ? "small" : "medium"}
                        >
                          <ViewListIcon />
                        </IconButton>
                      </span>
                    </div>
                  </React.Fragment>
                }
                bodyFooter={<Paging />}
              />
            </div>
          </SearchProvider>
        </div>
      </div>
    </div>
  );
};

export default App;
