import React, { useState } from "react";

import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import {
  PagingInfo,
  ResultsPerPage,
  Paging,
  Facet,
  SearchProvider,
  Results,
  SearchBox,
  Sorting,
} from "@elastic/react-search-ui";
import { FilterType, SortDirection } from "@elastic/search-ui";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Header from "../components/Header";
import ResultView from "../components/ResultView";
import "../styles/App.css";
import styles from "../styles/faq.module.css";

const Question = ({ question, answer }) => {
  const [enable, setEnable] = useState(false);
  return (
    <div>
      <div
        className={styles.question}
        onClick={() => {
          setEnable(!enable);
        }}
      >
        <span style={{ padding: "5px" }}>{question}</span>
      </div>
      <div className={styles.answer + " " + (enable ? styles.active : "")}>
        <p>{answer}</p>
      </div>
    </div>
  );
};
const App = () => {
  const isSmall = useMediaQuery("(max-width: 800px)");
  const questions = [
    {
      question:
        "How does the programme work and what will be covered in the monthly meetings?",
      answer:
        "The Advisory Mentorship Programme is a four-month structured mentorship programme consisting of a one hour session each month, from June to September 2022. The consistency and timings of meetings would be dependent on the individual availability of mentees and their mentors. In terms of the content covered in each meeting, while we do ultimately leave it to the discretion of the individual mentee-mentor pairs, we have also provided a suggested structure for each month’s session in our Mentee Manual, which is distributed to all confirmed mentees prior to the commencement of the programme. Very briefly, we recommend the first month’s session be used for you and your mentor to set some ground rules and expectations, and to get to know one another better. The second session on “understanding career interests” could be a chance for your mentor to share how they navigated their own career path, so as to provide you with some insights on how to bridge the gap between school and work. The third session on “understanding next steps” consolidates the discussions of the past two sessions. It is a good time for your mentor to offer you some advice on the practical steps you can take post-mentorship to pursue your occupation(s) of interest. The fourth session on “working on next steps” would allow mentors to offer some guidance on how you can proceed from where you are now, to where you want to be. This can be through actionables or tasks, and so on.",
    },
  ];
  return (
    <div className="container">
      {/*<Header />*/}
      <div
        className="canvas"
        style={{
          width: isSmall ? "90%" : "80%",
          marginLeft: "auto",
          marginRight: "auto",
          paddingBottom: "20px",
        }}
      >
        <h1>Frequently Asked Questions</h1>
        <div style={{}}>
          {questions.map(({ question, answer }, index) => (
            <Question key={index} question={question} answer={answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
