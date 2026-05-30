"use client";
import React from "react";
import Link from "next/link";

import { advisoryMentorshipLogo } from "../assets";
import Canvas from "../components/Canvas";
import Logo from "../components/PartnerLogos";
import Statistics, { Statistic } from "../components/Statistics";
import { URL_APPLY } from "../links";
import "../styles/Header.css";
import "../styles/App.css";

const STATISTICS: Statistic[] = [
  {
    title: "Mentors",
    value: "3200+",
    icon: "mdi:account",
  },
  {
    title: "Mentees",
    value: "3800+",
    icon: "mdi:school",
  },
  {
    title: "Industries",
    value: "48",
    icon: "mdi:domain",
  },
  {
    title: "Mentorship Hours",
    value: "15,000+",
    icon: "mdi:clock-time-four-outline",
  },
];

const Index = () => {
  return (
    <Canvas>
      <div className="logo-and-intro-container">
        <img
          className="header-mentorship-logo"
          src={advisoryMentorshipLogo}
          alt="Advisory Mentorship Programme"
        />
        <div className="header-mentorship-intro container text-lg" id="aboutus">
          <p>
            The Advisory Mentorship Programme pairs students with working
            professionals in their fields of interest on a 1-1 basis. Over the
            course of four months, mentors give an hour each month to meet with
            their mentee.
          </p>
        </div>
      </div>
      <h2>Our Impact</h2>
      <Statistics stats={STATISTICS} />
      <h2>Our Partner Organisations</h2>
      <Logo />

      <div
        className="container"
        style={{
          width: "100%",
          // marginTop: "64px",
          paddingBottom: "60px",
        }}
      >
        <span
          style={{
            lineHeight: 1.2,
            textAlign: "center",
            fontSize: "1.5em",
            fontWeight: "700",
            color: "var(--brand-color)",
          }}
        >
          Start discovering your career interests now!
        </span>
        <p
          style={{
            maxWidth: "1024px",
            margin: "20px 0",
            textAlign: "justify",
            textJustify: "inter-word",
          }}
        >
          Check out our mentors with impressive industry experience on the
          mentor page and apply today to discover your career interests. Have
          any questions? Head to our FAQ page to get your burning questions
          answered!
        </p>
        <button
          className="apply-button"
          style={{
            margin: "20px auto",
            display: "block",
          }}
        >
          <Link href={URL_APPLY} target="_blank">
            <h2 style={{ color: "white" }}>Apply Now</h2>
          </Link>
        </button>
      </div>
    </Canvas>
  );
};

export default Index;
