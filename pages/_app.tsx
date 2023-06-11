import React from "react";

import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

import {
  advisoryMentorshipLogo,
  advisoryMentorshipPartners,
} from "../components/assets";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Footer from "../components/Footer";

import "../styles/App.css";

const footer = `The privacy and safety of our mentors is of utmost priority to
    Advisory. Any attempt to approach or contact our mentors outside of
    the parameters of the Advisory Mentorship Programme—whilst claiming
    affiliation to Advisory, or misrepresenting a relationship to
    Advisory—will be treated as misrepresentation, even fraudulent
    misrepresentation, as considered under the Misrepresentation Act.
    Advisory will take legal action against any individuals or
    organisations who attempt to deceive, harass, or otherwise request
    dishonest assistance from our mentors.`;

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

const Homepage = () => {
  const isSmall = useMediaQuery("(max-width: 800px)");
  const [activeStep, setActiveStep] = React.useState(0);

  const theme = useTheme();

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
      {/* <Header /> */}
      <div
        className="canvas"
        style={{
          width: isSmall ? "90%" : "80%",
          marginLeft: "auto",
          marginRight: "auto",
          paddingBottom: "20px",
        }}
      >
        <Stack spacing={2} direction="row">
          <Button
            onClick={() => {}} //todo
            sx={{ textTransform: "none" }}
            style={{
              color: "#000000",
              fontFamily: "Inter",
              // fontSize: 28,
            }} //todo create separate component for this
          >
            About Advisory
          </Button>
          <Button
            sx={{ textTransform: "none" }}
            style={{
              color: "#000000",
              fontFamily: "Inter",
            }}
          >
            Mentor Profiles
          </Button>
          <Button
            sx={{ textTransform: "none" }}
            style={{
              color: "#000000",
              fontFamily: "Inter",
            }}
          >
            Apply
          </Button>
          <Button
            sx={{ textTransform: "none" }}
            style={{
              color: "#000000",
              fontFamily: "Inter",
            }}
          >
            FAQ
          </Button>
        </Stack>
        <Box component="main">
          <img
            className="header-mentorship-logo"
            src={advisoryMentorshipLogo}
            alt="Advisory Mentorship Programme"
          />
          <img
            id="partners"
            className="header-mentorship-partners"
            src={advisoryMentorshipPartners}
            alt="Advisory Mentorship Programme Partners"
          />
          <p>
            The Advisory Mentorship Programme pairs students with working
            professionals in their fields of interest on a 1-1 basis. Over the
            course of four months, mentors give an hour each month to meet with
            their mentee. Over the past 2 years, the programme delivered over
            8,000 hours of mentorship to 2,211 students with the involvement of
            1,826 mentors. This year, we’re excited to share that over 1,600
            working professionals and 27 mentorship partners whose fields of
            expertise range across 48 different industries have come aboard in
            support of this programme.
          </p>
        </Box>
        <h2>What can you expect?</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et
          faucibus tortor.{" "}
        </p>
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          style={{
            backgroundColor: "#D9D9D9",
            color: "#000000",
            fontFamily: "Inter",
          }}
        >
          Mentors' Profiles
        </Button>
        <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
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
                          //display: 'block',
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
                          //display: 'block',
                          overflow: "hidden",
                          width: "100%",
                        }}
                        src={"/mentor-thumbnail.png"}
                        alt={step.label2}
                      />
                    </Grid>
                    <Grid item xs={6}>
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
    </div>
  );
};

export default Homepage;
