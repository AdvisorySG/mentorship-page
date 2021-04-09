import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/header";
import ProfileCard from "./components/profile-card";
import ProfileModal from "./components/profile-modal";
import SearchBar from "./components/search-bar";
import { mentors } from "./mentors";

import { fieldSearch } from "./search";

import "react-tabs/style/react-tabs.css";
import "./App.css";

const setHash = (hash) => window.history.replaceState({}, "", `#${hash}`);

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMentor, setActiveMentor] = useState("");
  const activateModal = (mentor) => {
    setActiveMentor(mentor);
    setIsModalOpen(true);
  };

  useEffect(() => {
    // Checks hash and ensures that any modal with a corresponding name is open.
    const ensureModalFromHash = () => {
      const mentor = window.location.hash.slice(1);
      if (mentors.hasOwnProperty(mentor)) {
        if (!isModalOpen || mentor !== activeMentor) {
          activateModal(mentor);
          return true;
        }
      }
    };

    console.log(mentors)
    console.log(visibleMentor)

    // If modal is open, ensure that the hash is active.
    if (isModalOpen) {
      setHash(activeMentor);
    } else {
      // If modal is not open and `activeMentor === ""`, this must be the
      // initial load. Check for a hash, and open the modal if such an ID
      // exists.
      if (activeMentor === "") {
        if (!ensureModalFromHash()) {
          // Otherwise, set a default ID, but do not open the modal.
          setActiveMentor("");
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
  }, [isModalOpen, activeMentor]);

  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState({});

  const visibleMentor = useMemo(
    () =>
      searchValue.trim().length === 0
        ? mentors
        : fieldSearch(searchQuery),
    [searchQuery, searchValue]
  );

  return (
    <div className="container">
      <Header />

      <SearchBar
        value={searchValue}
        waveIndex={waveIndex}
        onSearchChange={setSearchValue}
        onSearchSelect={setSearchQuery}
      />

      <div className="tabs-container">
        <div className="card-container">
          {mentors.map((mentor) => (
            <ProfileCard
              key={mentor.name}
              mentor={mentor}
              onReadMore={() => activateModal(mentor)}
            />
          ))}
        </div>
      </div>
      
      <ProfileModal
        isOpen={isModalOpen}
        mentor={activeMentor}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default App;
