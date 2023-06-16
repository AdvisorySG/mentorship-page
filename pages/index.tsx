import React from "react";

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

import Header from "../components/Header";

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

const App = () => {
  const isSmall = useMediaQuery("(max-width: 800px)");
  const theme = useTheme();

  const [activeStep, setActiveStep] = React.useState(0);
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
        <p className="disclaimer">
          <small>
            The privacy and safety of our mentors is of utmost priority to
            Advisory. Any attempt to approach or contact our mentors outside of
            the parameters of the Advisory Mentorship Programme—whilst claiming
            affiliation to Advisory, or misrepresenting a relationship to
            Advisory—will be treated as misrepresentation, even fraudulent
            misrepresentation, as considered under the Misrepresentation Act.
            Advisory will take legal action against any individuals or
            organisations who attempt to deceive, harass, or otherwise request
            dishonest assistance from our mentors.
          </small>
        </p>

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
    </div>
  );
};

export default App;
