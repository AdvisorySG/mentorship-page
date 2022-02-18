import React, { useEffect, useMemo, useState } from "react";
import { Tab, Tabs, TabList } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Header from "./components/header";
import ProfileCard from "./components/profile-card";
import ProfileModal from "./components/profile-modal";
import SearchBar from "./components/search-bar";
import { fetchWaves } from "./waves";
import { Mentor } from "./interfaces";
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
});

// configuration options
const configurationOptions = {
  apiConnector: connector,
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

//
const setHash = (hash: string) => {
  window.history.replaceState({}, "", `#${hash}`);
};

//

function App() {
  const [activeWaveIndex, setActiveWaveId] = useState(0);
  const [waves, setWaves] = useState<{ [key: string]: Mentor }[]>([{}]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const convertIndex = (index: number) => waves.length - 1 - index;
  const activateTab = (tabIndex: number) =>
    setActiveWaveId(convertIndex(tabIndex));

  const [activeMentorId, setActiveMentorId] = useState("");
  const activateModal = (waveId: number, mentorId: string) => {
    setActiveWaveId(waveId);
    setActiveMentorId(mentorId);
    setIsModalOpen(true);
  };

  const [hasWavesFetched, setHasWavesFetched] = useState(false);
  useEffect(() => {
    async function fetchData() {
      await fetchWaves(setWaves, setActiveWaveId);
      setHasWavesFetched(true);
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Checks hash and ensures that any modal with a corresponding name is open.
    const ensureModalFromHash = () => {
      const mentorId = window.location.hash.slice(1);
      const matchingWaves = waves
        .map((wave, waveId) => [wave, waveId])
        .filter(([wave]) => wave.hasOwnProperty(mentorId));
      if (
        matchingWaves.length > 0 &&
        (!isModalOpen || mentorId !== activeMentorId)
      ) {
        const [, waveId] = matchingWaves[0];

        if (typeof waveId === "number") {
          activateModal(waveId, mentorId);
          return true;
        }
      }
    };

    // If modal is open, ensure that the hash is active.
    if (isModalOpen) {
      setHash(activeMentorId);
    } else {
      // If modal is not open and `activeMentorId === ""`, this must be the
      // initial load. Check for a hash, and open the modal if such an ID
      // exists.
      if (activeMentorId === "") {
        if (!ensureModalFromHash()) {
          // Otherwise, set a default ID, but do not open the modal.
          setActiveMentorId("");
        }
      } else {
        // An ID exists, but the modal is not open, so remove the hash.
        setHash("");
      }
    }

    // Add event listeners to catch if the user manually changes the hash.
    window.addEventListener("hashchange", ensureModalFromHash, false);
    return () =>
      window.removeEventListener("hashchange", ensureModalFromHash, false);
  }, [isModalOpen, activeMentorId, waves]);

  const [hasSearch, setHasSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const visibleMentorIds = useMemo(
    () => (hasSearch ? searchResults : Object.keys(waves[activeWaveIndex])),
    [hasSearch, searchResults, waves, activeWaveIndex]
  );

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
        {hasWavesFetched ? (
          <div className="results">
            <SearchProvider config={configurationOptions}>
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
                            value: "",
                            direction: "",
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
        ) : (
          <p className="placeholder-text">Loading Mentors Available...</p>
        )}
      </div>

      {waves.length > 0 && (
        <ProfileModal
          isOpen={isModalOpen}
          mentor={waves[activeWaveIndex][activeMentorId]}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
