import React, { useEffect } from "react";
import "react-tabs/style/react-tabs.css";

import Header from "./components/header";
import "./App.css";

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

const connector = new AppSearchAPIConnector({
  engineName: "mentorship-page",
  endpointBase: "https://advisorysg.ent.ap-southeast-1.aws.found.io",
  searchKey: "search-bv3s7kksqjinbswx7g4my9ur",
  beforeSearchCall: (result_fields: any, next: (arg0: any) => any) =>
    next({
      ...result_fields,
      group: { field: "name" },
    }),
});

const configurationOptions = {
  alwaysSearchOnInitialLoad: true,
  apiConnector: connector,
  debug: true,
  autocompleteQuery: {
    suggestions: {
      types: {
        documents: {
          // Which fields to search for suggestions.
          fields: ["name", "role"],
        },
      },
      // How many suggestions appear.
      size: 5,
    },
  },
  searchQuery: {
    // 2. Results: name of the video game, its genre, publisher, scores, and platform.
    result_fields: {
      name: {
        // A snippet means that matching search terms will be highlighted via <em> tags.
        snippet: {
          size: 75, // Limit the snippet to 75 characters.
          fallback: true, // Fallback to a "raw" result.
        },
      },
      industries: {
        snippet: {
          size: 50,
          fallback: true,
        },
      },
      course_of_study: {
        snippet: {
          size: 50,
          fallback: true,
        },
      },
      organisation: {
        snippet: {
          size: 100,
          fallback: true,
        },
      },
      role: {
        snippet: {
          size: 100,
          fallback: true,
        },
      },
      thumbnail_image_url: {
        raw: {},
      },
    },
    // 3. Facet by scores, genre, publisher, and platform, which we'll use to build filters later.
    facets: {
      industries: { type: "value", size: 100 },
    },
  },
};

function App() {
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
        <div className="results">
          <SearchProvider config={configurationOptions} >
            <div className="App">
              <Layout
                header={<SearchBox autocompleteSuggestions={true} />}
                bodyContent={
                  <Results
                    titleField="name"
                    urlField="thumbnail_image_url"
                    thumbnailField="thumbnail_image_url"
                  />
                }
                sideContent={
                  <div>
                    <Sorting
                      label={"Sort by"}
                      sortOptions={[
                        {
                          name: "Relevance",
                          value: "name",
                          direction: "desc",
                        },
                        {
                          name: "Name",
                          value: "name",
                          direction: "asc",
                        },
                      ]}
                    />
                    <Facet field="industries" label="Industries" />
                  </div>
                }
                bodyHeader={
                  <>
                    <PagingInfo />
                    <ResultsPerPage />
                  </>
                }
                bodyFooter={<Paging />}
              />
            </div>
          </SearchProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
