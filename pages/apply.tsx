import React, { useState } from "react";

import useMediaQuery from "@mui/material/useMediaQuery";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

import Header from "../components/Header";
import ResultView from "../components/ResultView";
import "../styles/App.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
} from "@mui/material";

const links = [
  {
    text: "Application Guide on CVs and Resumes",
    url: "https://drive.google.com/file/d/1w7zlMuGY_7hVXeW0LaNKXWWjLRt3ic4G/view?usp=sharing",
  },
  {
    text: "FAQs for Applicants",
    url: "https://docs.google.com/document/d/1mGjAsgTP7KIheWVDm-TZ5Hxxf8WYPfWemiqcZ40XCwo/edit?usp=sharing",
  },
  {
    text: "Sample Application Response",
    url: "https://drive.google.com/file/d/1aA3l_WQ1ehGO8UBKuRFLqj4URpQbAVzN/view?usp=sharing",
  },
  {
    text: "Industries to Filter Mentors",
    url: "https://drive.google.com/file/d/19lUr2BchbYFAPMjEbN_M2mf1pyw-n7pj/view?usp=sharing",
  },
];

const App = () => {
  const isSmall = useMediaQuery("(max-width: 800px)");
  return (
    <div className="container">
      <Header />
      <div
        className="canvas"
        style={{
          width: isSmall ? "90%" : "80%",
          marginLeft: "auto",
          marginRight: "auto",
          paddingBottom: "20px",
        }}
      >
        <h1>Application</h1>
        <div>
          <h2>Timeline</h2>
          <img
            style={{ width: "100%" }}
            src="https://images.template.net/wp-content/uploads/2017/01/16095358/Sample-Blank-Timeline.jpg"
          />
        </div>
        <div>
          <h2>Resources</h2>
          <TableContainer>
            <Table>
              <TableBody>
                {links.map((link, index) => (
                  <TableRow
                    key={index}
                    hover
                    onClick={() =>
                      window.open(link.url, "_blank", "noopener noreferrer")
                    }
                  >
                    <TableCell>
                      <p style={{ textAlign: "center" }}>
                        <Link
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.text}
                        </Link>
                      </p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
    </div>
  );
};

export default App;
