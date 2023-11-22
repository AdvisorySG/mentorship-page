import React, { useState } from "react";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import { advisoryMentorshipLogo } from "../components/assets";
import Header from "../components/Header";
import Logo from "../components/Logo";
import Footer from "../components/Footer.tsx";
import "../styles/Header.css";
import "../styles/App.css";

const testimonials = [
  {
    person: "Randell Sie",
    type: "Mentor",
    role: "Managing Director",
    company: "Persistensie Pte Ltd",
    text: "I've benefitted from mentorship tremendously in my career. You gain new perspectives, experience and a friendly ear who will not judge. The job of a mentor is to listen and extend your thinking, then let you make the final decision and own it.",
  },
  {
    person: "Clarinda Ong",
    type: "Mentee",
    school: "Tampines Meridian Junior College",
    text: "Going into this, I thought I knew what career I wanted. With my mentor's advice and guidance, and Advisory's thought-provoking worksheets, however, I discovered what better suited me. I used to be extremely unsure of my future, so I'm very glad this experience helped me shed light on my path forward. I have learnt more about myself and gained insights into what I want to do professionally.",
  },
];

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    index: "",
    label1: "Mentor",
    imgPath1: "/mentor-randallsie.png",
  },
  {
    index: "",
    label1: "Mentee",
    imgPath1: "/mentee-clarindaong.png",
  },
];

const maxSteps = testimonials.length;

const Index = () => {
  const isSmall = useMediaQuery("(max-width: 800px)");
  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <div className="container">
      <Box component="main" display="flex" flexDirection="column">
        <div className="header">
          <Header />
        </div>
        <div className="header-bottom container">
          <div className="logo-and-intro-container container">
            <img
              className="header-mentorship-logo container"
              src={advisoryMentorshipLogo}
              alt="Advisory Mentorship Programme"
            />
            <div className="header-mentorship-intro container" id="aboutus">
              <p>
                The Advisory Mentorship Programme pairs students with working
                professionals in their fields of interest on a 1-1 basis. Over
                the course of four months, mentors give an hour each month to
                meet with their mentee.
              </p>
              <h2></h2>
            </div>
          </div>
          <div className="stats">
            <div className="hours">
              <h1>8,000</h1>
              <p>Hours of Mentorship</p>
            </div>
            <div className="students">
              <h1>2,211</h1>
              <p>Students</p>
            </div>
            <div className="mentors">
              <h1>1,826</h1>
              <p>Mentors</p>
            </div>
            <div className="industries">
              <h1>48</h1>
              <p>Industries</p>
            </div>
          </div>
          <h2
            style={{
              color: "var(--brand-color)",
              textAlign: "left",
              paddingLeft: "10px",
            }}
          >
            Our Partner Organisations:
          </h2>
          <Logo />
        </div>
        <div
          className="canvas container"
          style={{
            width: "100%",
            maxWidth: isSmall ? "90%" : "80%",
            margin: "auto",
            paddingBottom: "20px",
            flexDirection: "column",
            alignItems: "center",
            boxSizing: "border-box",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <p className="disclaimer container">
            <small>
              The privacy and safety of our mentors is of utmost priority to
              Advisory. Any attempt to approach or contact our mentors outside
              of the parameters of the Advisory Mentorship Programme—whilst
              claiming affiliation to Advisory, or misrepresenting a
              relationship to Advisory—will be treated as misrepresentation,
              even fraudulent misrepresentation, as considered under the
              Misrepresentation Act. Advisory will take legal action against any
              individuals or organisations who attempt to deceive, harass, or
              otherwise request dishonest assistance from our mentors.
            </small>
          </p>
          <div className="testimonial-header container">
            <h2
              style={{
                color: "var(--brand-color)",
                textAlign: "left",
                paddingLeft: "10px",
              }}
            >
              Testimonials
            </h2>
          </div>
          <Box
            sx={{ maxWidth: 600, flexGrow: 1, margin: "auto" }}
            className="testimonal-carousel container"
          >
            <AutoPlaySwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {testimonials.map((testimonial, index) => (
                <div key={index}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <Grid
                      container
                      sx={{ width: "100%" }}
                      spacing={2}
                      alignItems="center"
                    >
                      <Grid item xs={6}>
                        <Box
                          component="div"
                          sx={{
                            height: "250px",
                            width: "250px",
                            borderRadius: "50%",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={images[index].imgPath1}
                            alt={images[index].label1}
                            style={{
                              height: "100%",
                              width: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          {testimonial.type === "Mentor" ? (
                            <>
                              <p>
                                <strong style={{ padding: "10px" }}>
                                  {testimonial.person}
                                </strong>
                                <span
                                  style={{
                                    background: "var(--brand-color)",
                                    padding: "5px",
                                    borderRadius: "100px",
                                  }}
                                >
                                  Mentor
                                </span>
                                <div style={{ paddingTop: "10px" }}>
                                  {testimonial.role}
                                  <br />
                                  {testimonial.company}
                                </div>
                              </p>
                              {testimonial.text}
                            </>
                          ) : (
                            <>
                              <p>
                                <strong style={{ padding: "10px" }}>
                                  {testimonial.person}
                                </strong>
                                <span
                                  style={{
                                    background: "var(--brand-color)",
                                    padding: "5px",
                                    borderRadius: "100px",
                                  }}
                                >
                                  Mentee
                                </span>
                                <br />
                                <div style={{ paddingTop: "10px" }}>
                                  {testimonial.school}
                                </div>
                              </p>
                              {testimonial.text}
                            </>
                          )}
                        </Typography>
                      </Grid>
                    </Grid>
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
                style={{ marginLeft: "auto" }}
              >
                <KeyboardArrowLeft />
              </Button>
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
                style={{ marginRight: "auto" }}
              >
                <KeyboardArrowRight />
              </Button>
            </Box>
          </Box>
        </div>
        <Footer />
      </Box>
    </div>
  );
};

export default Index;
