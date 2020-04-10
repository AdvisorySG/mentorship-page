import React, { useState } from "react";
import "./App.css";
import ProfileCard from "./components/profile-card";
import Header from "./components/header";
import ProfileModal from "./components/profile-modal";

import { mentors } from "./mentorsData";

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeMentorId, setActiveMentorId] = useState(null);

  const readMoreHandler = (mentorId) => {
    setModalVisible(true);
    setActiveMentorId(mentorId);
  };

  const closeHandler = () => {
    setModalVisible(false);
    setActiveMentorId(null);
  };

  return (
    <div className="page-layout">
      <Header />

      {modalVisible && (
        <ProfileModal
          key={activeMentorId}
          mentor={mentors[activeMentorId]}
          onClose={closeHandler}
        />
      )}

      <div className="profile-cards">
        {mentors.map((mentor) => (
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
