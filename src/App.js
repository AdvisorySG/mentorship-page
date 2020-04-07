import React from "react";
import "./App.css";
import ProfileCard from "./components/profile-card";
import NavBarAndIntro from "./components/nav-bar-and-intro";
// import jsonData from "./mentor-data/mentor-data.json";

function App() {
  //let mentorData = JSON.parse({ name: "puta" });

  const mentorData = [
    {
      id: 0,
      name: "Jane Doe",
      role: "MFA Student",
      organization: "SVA, New York City",
      school: "UC Irvine",
      course_of_study: "Fine Arts",
      full_bio:
        "Jane Doe is an MFA student at the School of Visual Arts, New York City. She graduated from UC Irvine in 2016, and works predominantly in Photography.",
      image_url:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9",
    },
    {
      id: 1,
      name: "Peter Pan",
      role: "Wizard",
      organization: "Asteroid Belt Infinity Enterprises",
      school: "Waverly Place",
      course_of_study: "Meteor Alchemy",
      full_bio:
        "Peter Pan is a meteor conjurer at the Association of Waverly Place, 0:0:1132:124932 Solar System 33148293",
      image_url:
        "https://i.pinimg.com/originals/42/9e/9f/429e9f32eb7d0213342a4e447e6e93ae.jpg",
    },
  ];

  return (
    <div className="page-layout">
      <NavBarAndIntro />
      <div className="profile-cards">
        {mentorData.map((mentor) => (
          <ProfileCard
            key={mentor.id}
            img_url={mentor.image_url}
            name={mentor.name}
            role={mentor.role}
            organization={mentor.organization}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
