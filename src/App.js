import React, { useState } from "react";

import Header from "./components/header";
import ProfileCard from "./components/profile-card";
import ProfileModal from "./components/profile-modal";
import { mentors } from "./mentors.json";
import { querySearch } from "./search";

import "./App.css";

const visibleMentorIds = mentors.map((mentor, index) => index);

function App() {
  const [visibleMentorIds, setVisibleMentorIds] = useState(mentorIds);
  const searchChangeHandler = (input) =>
    input.trim().length === 0 && setVisibleMentorIds(mentorIds);
  const searchSelectHandler = (query) =>
    setVisibleMentorIds(querySearch(query));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMentorId, setActiveMentorId] = useState(0);

  const readMoreHandler = (mentorId) => {
    setActiveMentorId(mentorId);
    setIsModalOpen(true);
  };

  const closeHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <Header
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
            onReadMore={() => readMoreHandler(mentorId)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
