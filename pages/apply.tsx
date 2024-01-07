import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { List, ListItem, Link } from "@mui/material";
import Header from "../components/Header";
import "../styles/App.css";
import Divider from "@mui/material/Divider";

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
            alt="Timeline"
          />
        </div>
        <div>
          <h2>Resources</h2>
          <Box textAlign="center">
            <List
              style={{
                display: "flex",
                flexDirection: isSmall ? "column" : "row",
                justifyContent: "center",
                padding: 0,
                flexWrap: "wrap",
              }}
            >
              {links.map((link, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    component="li"
                    onClick={() =>
                      window.open(link.url, "_blank", "noopener noreferrer")
                    }
                    style={{
                      listStyle: "none",
                      margin: isSmall ? "0 0 10px 0" : "0 10px",
                      width: isSmall ? "100%" : "auto",
                      boxSizing: "border-box",
                    }}
                  >
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                    >
                      <Typography variant="body1">{link.text}</Typography>
                    </Link>
                  </ListItem>
                  {index < links.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Box>
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
