import React, { useState } from "react";

import Header from "./components/header";
import ProfileCard from "./components/profile-card";
import ProfileModal from "./components/profile-modal";
import { fuse, mentors } from "./mentorsData";

import "./App.css";

const mentorIds = mentors.map((mentor) => mentor.id);

function App() {
  const [visibleMentorIds, setVisibleMentorIds] = useState(mentorIds);

  const searchHandler = (input) => {
    const processedInput = input.trim();
    if (processedInput.length <= 0) {
      setVisibleMentorIds(mentorIds);
      return;
    }
    const searchResults = fuse.search(processedInput);
    setVisibleMentorIds(searchResults.map((result) => result.item.id));
  };

  const [isModalActive, setIsModalActive] = useState(false);
  const [activeMentorId, setActiveMentorId] = useState(null);

  const readMoreHandler = (mentorId) => {
    setIsModalActive(true);
    setActiveMentorId(mentorId);
  };

  const closeHandler = () => {
    setIsModalActive(false);
    setActiveMentorId(null);
  };

  return (
    <div className="container">
      <Header onSearch={searchHandler} />

      {isModalActive && (
        <ProfileModal
          key={activeMentorId}
          mentor={mentors[activeMentorId]}
          onClose={closeHandler}
        />
      )}

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
