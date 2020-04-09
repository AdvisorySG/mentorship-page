import React, { useState } from "react";
import "./App.css";
import ProfileCard from "./components/profile-card";
import Header from "./components/header";
import ProfileModal from "./components/profile-modal";

import mentorData from "./mentorData.json";

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
          {...mentorData.data[modalId]}
        />
      )}

      <div className="profile-cards">
        {mentorData.data.map((mentor) => (
          <ProfileCard
            key={mentor.id}
            img_url={process.env.PUBLIC_URL + mentor.image_url}
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
