import React, { useEffect, useMemo, useState } from "react";

import Header from "./components/header";
import ProfileCard from "./components/profile-card";
import ProfileModal from "./components/profile-modal";
import SearchBar from "./components/search-bar";
import { fetchMentors } from "./mentors";

import "./App.css";

const setHash = (hash) => window.history.replaceState({}, "", `#${hash}`);

function App() {
  const [mentors, setMentors] = useState([]);
  const [mentorIds, setMentorIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeMentorId, setActiveMentorId] = useState("");
  const activateModal = (mentorId) => {
    setActiveMentorId(mentorId);
    setIsModalOpen(true);
  };

  const [hasMentorsFetched, setHasMentorsFetched] = useState(false);
  useEffect(() => {
    async function fetchData() {
      await fetchMentors(setMentors, setMentorIds);
      setHasMentorsFetched(true);
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Checks hash and ensures that any modal with a corresponding name is open.
    const ensureModalFromHash = () => {
      const mentorId = window.location.hash.slice(1);
      if (mentors.hasOwnProperty(mentorId)) {
        if (!isModalOpen || mentorId !== activeMentorId) {
          activateModal(mentorId);
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
  }, [isModalOpen, activeMentorId, mentors]);

  const [hasSearch, setHasSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const visibleMentorIds = useMemo(
    () => (hasSearch ? searchResults : mentorIds),
    [hasSearch, searchResults, mentorIds]
  );

  return (
    <div className="container">
      <Header />

      <div className="canvas">
        <p className="disclaimer">
          <small>
            All Mentors have the rights to privacy and non-harassment that must
            be respected. You are hereby informed not to misrepresent your
            relationship or affiliation with Advisory in any way and on any
            platform, if and when you communicate with any mentors. Failing
            which you accept that you have been informed and therefore
            understand that legal action may be taken against you.
          </small>
        </p>
        {hasMentorsFetched ? (
          <div>
            <SearchBar
              mentors={mentors}
              setHasSearch={setHasSearch}
              setSearchResults={setSearchResults}
            />
            <p className="results-text">
              Displaying {visibleMentorIds.length} search result(s).
            </p>
            <div className="card-container">
              {visibleMentorIds.map((mentorId) => (
                <ProfileCard
                  key={mentorId}
                  mentor={mentors[mentorId]}
                  onReadMore={() => activateModal(mentorId)}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="placeholder-text">Loading...</p>
        )}
      </div>

      <ProfileModal
        isOpen={isModalOpen}
        mentor={mentors[activeMentorId]}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default App;
