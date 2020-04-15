import React, { useState } from "react";

import Header from "./components/header";
import ProfileCard from "./components/profile-card";
import ProfileModal from "./components/profile-modal";
import { mentors } from "./mentors.json";
import searchOverall from "./search";

import "./App.css";

const mentorIds = mentors.map((mentor, index) => index);

function App() {
  const [visibleMentorIds, setVisibleMentorIds] = useState(mentorIds);
  const searchChangeHandler = (input) =>
    input.trim() === ""
      ? setVisibleMentorIds(mentorIds)
      : setVisibleMentorIds(searchOverall(input));

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
      <Header onChange={searchChangeHandler} />

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
