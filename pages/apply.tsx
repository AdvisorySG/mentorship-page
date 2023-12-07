import React, { useState } from "react";

import useMediaQuery from "@mui/material/useMediaQuery";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ResultView from "../components/ResultView";
import "../styles/App.css";

const App = () => {
  const isSmall = useMediaQuery("(max-width: 800px)");
  return (
    <div className="container">
      <div
        className="canvas container"
        style={{
          width: isSmall ? "90%" : "80%",
          marginLeft: "auto",
          marginRight: "auto",
          paddingBottom: "20px",
        }}
      >
        <Header />
        <h1>Application</h1>
        <div>
          <h2 style={{ color: "var(--brand-color)" }}>Timeline</h2>
          <img
            style={{ width: "100%" }}
            src="https://images.template.net/wp-content/uploads/2017/01/16095358/Sample-Blank-Timeline.jpg"
          />
        </div>
        <div>
          <h2 style={{ color: "var(--brand-color)" }}>Resources</h2>
          <div className="resources">
            <Button
              variant="text"
              target="_blank"
              rel="noopener noreferrer"
              href="https://drive.google.com/file/d/1w7zlMuGY_7hVXeW0LaNKXWWjLRt3ic4G/view?usp=sharing"
            >
              APPLICATION GUIDE ON CV AND RESUME
            </Button>{" "}
            <Button
              variant="text"
              target="_blank"
              rel="noopener noreferrer"
              href="https://drive.google.com/file/d/1aA3l_WQ1ehGO8UBKuRFLqj4URpQbAVzN/view?usp=sharing"
            >
              SAMPLE APPLICATION RESPONSE
            </Button>{" "}
            <Button
              variant="text"
              target="_blank"
              rel="noopener noreferrer"
              href="https://drive.google.com/file/d/19lUr2BchbYFAPMjEbN_M2mf1pyw-n7pj/view?usp=sharing"
            >
              VIEW LIST OF INDUSTRIES
            </Button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "2em",
            paddingBottom: "2em",
          }}
        >
          <Button
            variant="contained"
            color="success"
            target="_blank"
            rel="noopener noreferrer"
            href="https://advisorysg.typeform.com/to/NQaJmE6j#source=mentorsite"
          >
            Apply Now
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
