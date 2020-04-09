import React, { useState } from "react";
import "./App.css";
import ProfileCard from "./components/profile-card";
import Header from "./components/header";
import ProfileModal from "./components/profile-modal";

import mentors from "./mentors";

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalId, setModalId] = useState(null);

  const readMoreHandler = (modalId) => {
    setModalVisible(true);
    setModalId(modalId);
  };

  const closeHandler = () => {
    setModalVisible(false);
    setModalId(null);
  };

  return (
    <div className="page-layout">
      <Header />

      {modalVisible && (
        <ProfileModal
          id={modalId}
          onClose={closeHandler}
          {...mentors[modalId]}
        />
      )}

      <div className="profile-cards">
        {mentors.map((mentor) => (
          <ProfileCard
            key={mentor.id}
            img_url={mentor.imageUrl}
            name={mentor.name}
            role={mentor.role}
            organization={mentor.organization}
            onReadMore={() => readMoreHandler(mentor.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
