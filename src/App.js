import React, { useState } from "react";

import Header from "./components/header";
import ProfileCard from "./components/profile-card";
import ProfileModal from "./components/profile-modal";
import { mentors } from "./mentors.json";

import "./App.css";

const mentorIds = mentors.map((mentor, index) => index);

function App() {
  const [visibleMentorIds, setVisibleMentorIds] = useState(mentorIds);

  const searchHandler = (input) => {
    const processedInput = input.trim();
    if (processedInput.length <= 0) {
      setVisibleMentorIds(mentorIds);
      return;
    }
    // TODO: add filter feature
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMentorId, setActiveMentorId] = useState(null);

  const readMoreHandler = (mentorId) => {
    setIsModalOpen(true);
    setActiveMentorId(mentorId);
  };

  const closeHandler = () => {
    setIsModalOpen(false);
    setActiveMentorId(null);
  };

  return (
    <div className="container">
      <Header onSearch={searchHandler} />

      {isModalOpen && (
        <ProfileModal
          isOpen={isModalOpen}
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
