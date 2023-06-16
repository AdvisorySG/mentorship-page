import React from "react";

import useMediaQuery from "@mui/material/useMediaQuery";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "../styles/App.css";

const questions = [
  {
    question:
      "How does the programme work and what will be covered in the monthly meetings?",
    answer:
      "The Advisory Mentorship Programme is a four-month structured mentorship programme consisting of a one hour session each month, from June to September 2022. The consistency and timings of meetings would be dependent on the individual availability of mentees and their mentors. In terms of the content covered in each meeting, while we do ultimately leave it to the discretion of the individual mentee-mentor pairs, we have also provided a suggested structure for each month’s session in our Mentee Manual, which is distributed to all confirmed mentees prior to the commencement of the programme. Very briefly, we recommend the first month’s session be used for you and your mentor to set some ground rules and expectations, and to get to know one another better. The second session on “understanding career interests” could be a chance for your mentor to share how they navigated their own career path, so as to provide you with some insights on how to bridge the gap between school and work. The third session on “understanding next steps” consolidates the discussions of the past two sessions. It is a good time for your mentor to offer you some advice on the practical steps you can take post-mentorship to pursue your occupation(s) of interest. The fourth session on “working on next steps” would allow mentors to offer some guidance on how you can proceed from where you are now, to where you want to be. This can be through actionables or tasks, and so on.",
  },
  {
    question:
      "How does the programme work and what will be covered in the monthly meetings?",
    answer:
      "The Advisory Mentorship Programme is a four-month structured mentorship programme consisting of a one hour session each month, from June to September 2022. The consistency and timings of meetings would be dependent on the individual availability of mentees and their mentors. In terms of the content covered in each meeting, while we do ultimately leave it to the discretion of the individual mentee-mentor pairs, we have also provided a suggested structure for each month’s session in our Mentee Manual, which is distributed to all confirmed mentees prior to the commencement of the programme. Very briefly, we recommend the first month’s session be used for you and your mentor to set some ground rules and expectations, and to get to know one another better. The second session on “understanding career interests” could be a chance for your mentor to share how they navigated their own career path, so as to provide you with some insights on how to bridge the gap between school and work. The third session on “understanding next steps” consolidates the discussions of the past two sessions. It is a good time for your mentor to offer you some advice on the practical steps you can take post-mentorship to pursue your occupation(s) of interest. The fourth session on “working on next steps” would allow mentors to offer some guidance on how you can proceed from where you are now, to where you want to be. This can be through actionables or tasks, and so on.",
  },
];

const App = () => {
  const isSmall = useMediaQuery("(max-width: 800px)");
  return (
    <div className="container">
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
        <div>
          {questions.map(({ question, answer }, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  <b>{question}</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
