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
    mentor: "Mentor 1",
    mentee: "Mentee 1",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et faucibus tortor.`,
  },
  {
    mentor: "Mentor 2",
    mentee: "Mentee 2",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et faucibus tortor.`,
  },
];

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    index: "",
    label1: "Mentor",
    label2: "Mentee",
    imgPath: "/mentor-thumbnail.png",
  },
  {
    index: "",
    label1: "Mentor",
    label2: "Mentee",
    imgPath: "/mentor-thumbnail.png",
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
      <Box component="main">
        <div className="header-bottom container">
          <Header />
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
                meet with their mentee and give them valuable insights on their
                industry.
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
          <h3
            style={{
              color: "var(--brand-color)",
              textAlign: "left",
              paddingLeft: "10px",
            }}
          >
            Our Partner Organisations:
          </h3>
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
            justifyContent: "center", // Center horizontally
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
            <h2>What can you expect?</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              et faucibus tortor.{" "}
            </p>
            <Button
              variant="contained"
              sx={{ textTransform: "none" }}
              style={{
                alignItems: "left",
                backgroundColor: "#D9D9D9",
                color: "#000000",
              }}
            >
              Mentors' Profiles
            </Button>
          </div>
          <Box
            sx={{ maxWidth: 400, flexGrow: 1, margin: "auto" }}
            className="testimonal-carousel container"
          >
            <Paper
              square
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                height: 50,
                pl: 2,
                bgcolor: "background.default",
              }}
            >
              <Typography>{images[activeStep].index}</Typography>
            </Paper>
            <AutoPlaySwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {images.map((step, index) => (
                <div key={step.index}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <Grid container sx={{ width: "100%" }} spacing={6}>
                      <Grid item xs={6}>
                        <Box
                          component="img"
                          sx={{
                            height: "100%",
                            overflow: "hidden",
                            width: "100%",
                          }}
                          src={"/mentor-thumbnail.png"}
                          alt={step.label1}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Box
                          component="img"
                          sx={{
                            height: "100%",
                            overflow: "hidden",
                            width: "100%",
                          }}
                          src={"/mentor-thumbnail.png"}
                          alt={step.label2}
                        />
                      </Grid>
                      <Grid item xs={9}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Curabitur et faucibus tortor.
                      </Grid>
                    </Grid>
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </Box>
        </div>
        <Footer />
      </Box>
    </div>
  );
};

export default Index;
