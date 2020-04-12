import React, { useState } from "react";

import Header from "./components/header";
import ProfileCard from "./components/profile-card";
import ProfileModal from "./components/profile-modal";
import { fuse, mentors } from "./mentorsData";

import "./App.css";

function App() {
  const [visibleMentors, setVisibleMentors] = useState(mentors);

  const searchHandler = (input) => {
    const processedInput = input.trim();
    if (processedInput.length <= 0) {
      setVisibleMentors(mentors);
      return;
    }
    const searchResults = fuse.search(processedInput);
    setVisibleMentors(searchResults.map((result) => result.item));
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeMentorId, setActiveMentorId] = useState(null);

  const readMoreHandler = (mentorId) => {
    setIsModalVisible(true);
    setActiveMentorId(mentorId);
  };

  const closeHandler = () => {
    setIsModalVisible(false);
    setActiveMentorId(null);
  };

  return (
    <div className="page-layout">
      <Header onSearch={searchHandler} />

      {isModalVisible && (
        <ProfileModal
          key={activeMentorId}
          mentor={mentors[activeMentorId]}
          onClose={closeHandler}
        />
      )}

      <div className="profile-cards">
        {visibleMentors.map((mentor) => (
          <ProfileCard
            key={mentor.id}
            mentor={mentor}
            onReadMore={() => readMoreHandler(mentor.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
