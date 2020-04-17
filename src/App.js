import React, { useState } from "react";
import DocumentMeta from "react-document-meta";

import Header from "./components/header";
import ProfileCard from "./components/profile-card";
import ProfileModal from "./components/profile-modal";
import { mentors } from "./mentors.json";
import { advisoryMentorshipLogo } from "./assets";

import "./App.css";

const visibleMentorIds = mentors.map((mentor, index) => index);
const meta = {
  title: "Advisory Mentorship",
  description: "The Advisory Mentorship Program",
  canonical: "mentorship.advisory.sg",
  meta: {
    charset: "utf-8",
    name: {
      keywords: "advisory,mentorship,program,professional,industry,education",
    },
    property: {
      "og:title:": "The Advisory Mentorship Program",
      "og:url": "https//mentorship.advisory.sg",
      "og:image": { advisoryMentorshipLogo },
      "og:description": "The Advisory Mentorship Program",

      "twitter:title": "The Advisory Mentorship Program",
      "twitter:description": "The Advisory Mentorship Program",
      "twitter:image": { advisoryMentorshipLogo },
    },
  },
};

function App() {
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
    <DocumentMeta {...meta}>
      <div className="container">
        <Header />

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
    </DocumentMeta>
  );
}

export default App;
