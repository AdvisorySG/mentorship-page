import React, { useState, useEffect } from "react";

import Header from "./components/header";
import ProfileCard from "./components/profile-card";
import ProfileModal from "./components/profile-modal";
import SearchBar from "./components/search-bar";
import { mentors } from "./mentors.json";
import { fieldSearch } from "./search";

import "./App.css";

const mentorIds = mentors.map((mentor, index) => index);

// Convert names into usable `#`-ids.
const mentorHashes = mentors.map(({ name }) =>
  name.toLowerCase().replace(" ", "-").replace("(", "").replace(")", "")
);
const setHash = (hash) => window.history.replaceState({}, "", `#${hash}`);

function App() {
  const [visibleMentorIds, setVisibleMentorIds] = useState(mentorIds);
  const searchChangeHandler = (input) =>
    input.trim().length === 0 && setVisibleMentorIds(mentorIds);
  const searchSelectHandler = (query) =>
    setVisibleMentorIds(fieldSearch(query));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMentorId, setActiveMentorId] = useState(0);

  useEffect(() => {
    // Checks hash and ensures that any modal with a corresponding name is open.
    let ensureModalFromHash = () => {
      let hash = window.location.hash.slice(1);
      let mentorName = hash.length ? String(hash) : "";
      let mentorId = mentorName.length ? mentorHashes.indexOf(mentorName) : -1;

      if (mentorId !== -1) {
        if (!isModalOpen || mentorId !== activeMentorId) {
          activateModal(mentorId);
          return true;
        }
      }
    };

    // If modal is open, ensure that the hash is active.
    if (isModalOpen) {
      setHash(mentorHashes[activeMentorId]);
    } else {
      // If modal is not open and `activeMentorId === null`, this must be the
      // initial load. Check for a hash, and open the modal if such an ID
      // exists.
      if (activeMentorId === null) {
        if (!ensureModalFromHash()) {
          // Otherwise, set a default ID, but do not open the modal.
          setActiveMentorId(0);
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
  }, [isModalOpen, activeMentorId]);

  const activateModal = (mentorId) => {
    setActiveMentorId(mentorId);
    setIsModalOpen(true);
  };

  const closeHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <Header />

      <SearchBar
        onSearchChange={searchChangeHandler}
        onSearchSelect={searchSelectHandler}
      />

      <ProfileModal
        isOpen={isModalOpen}
        mentor={mentors[activeMentorId]}
        onClose={closeHandler}
      />

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
  );
}

export default App;
