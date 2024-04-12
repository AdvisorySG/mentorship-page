import React, { useRef, useEffect } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { advisoryMentorshipLogo } from "../components/assets";
import Header from "../components/Header";
import Logo from "../components/Logo";
import Footer from "../components/Footer.tsx";
import "../styles/Header.css";
import "../styles/App.css";
import Link from "next/link";

const testimonials = [
  {
    person: "Mr. Randell Sie",
    type: "Mentor",
    role: "Managing Director",
    company: "Persistensie Pte Ltd",
    text: "“I've benefitted from mentorship tremendously in my career. You gain new perspectives, experience and a friendly ear who will not judge. The job of a mentor is to listen and extend your thinking, then let you make the final decision and own it.”",
  },
  {
    person: "Ms. Clarinda Ong",
    type: "Mentee",
    school: "Tampines Meridian Junior College",
    text: "“Going into this, I thought I knew what career I wanted. With my mentor's advice and guidance, and Advisory's thought-provoking worksheets, however, I discovered what better suited me. I used to be extremely unsure of my future, so I'm very glad this experience helped me shed light on my path forward. I have learnt more about myself and gained insights into what I want to do professionally.”",
  },
];

const images = [
  {
    index: "",
    label1: "Mentor: Randall Sie",
    imgPath1: "/mentor-randallsie.png",
  },
  {
    index: "",
    label1: "Mentee: Clarinda Ong",
    imgPath1: "/mentee-clarindaong.png",
  },
];

const Index = () => {
  const isSmall = useMediaQuery("(max-width: 800px)");
  const glideRef = useRef(null);

  let glideTestimonial;

  function initializeGlide() {
    glideTestimonial = new Glide(glideRef.current, {
      type: "carousel",
      autoplay: 10000,
      perView: 1,
      breakpoints: {
        576: { perView: 1 },
        768: { perView: 1 },
        992: { perView: 1 },
        1200: { perView: 1 },
        1400: { perView: 1 },
      },
    });

    glideTestimonial.on(["mount.after", "run"], function () {
      glideTestimonial.update({ perView: 1 });
    });

    glideTestimonial.mount();

    document
      .querySelector(".glide__arrow--left")
      .addEventListener("click", function () {
        glideTestimonial.go("<");
      });

    document
      .querySelector(".glide__arrow--right")
      .addEventListener("click", function () {
        glideTestimonial.go(">");
      });
  }

  function destroyGlide() {
    if (glideTestimonial && glideTestimonial.root) {
      glideTestimonial.destroy();
    }
  }

  useEffect(() => {
    initializeGlide();

    return () => destroyGlide();
  }, []);

  function debounce(func, delay) {
    let timer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        func.apply(context, args);
      }, delay);
    };
  }

  const debouncedResize = debounce(function () {
    if (glideTestimonial) {
      glideTestimonial.update({
        breakpoints: {
          576: { perView: 1 },
          768: { perView: 1 },
          992: { perView: 1 },
          1200: { perView: 1 },
          1400: { perView: 1 },
        },
        animationDuration: 800,
      });
    }
  }, 200);

  useEffect(() => {
    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      destroyGlide();
    };
  }, [debouncedResize]);

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
            </div>
          </div>
          <div className="stats">
            <div className="stat-1">
              <div className="hours">
                <h1>8000</h1>
                <p>Hours of Mentorship</p>
              </div>
              <div className="students">
                <h1>2211</h1>
                <p>Students</p>
              </div>
            </div>
            <div className="stats-2">
              <div className="mentors">
                <h1>1826</h1>
                <p>Mentors</p>
              </div>
              <div className="industries">
                <h1>48</h1>
                <p>Industries</p>
              </div>
            </div>
          </div>
          <h2
            style={{
              color: "var(--brand-color)",
              textAlign: "left",
              paddingLeft: "20px",
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
            maxWidth: isSmall ? "90%" : "75%",
            margin: "auto",
            paddingBottom: "50px",
            flexDirection: "column",
            alignItems: "center",
            boxSizing: "border-box",
            textAlign: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <p
            className="disclaimer container"
            style={{ paddingLeft: "20px", paddingRight: "20px" }}
          >
            <small>
              The privacy and safety of our mentors are of utmost priority to
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
                paddingTop: "50px",
                paddingLeft: "20px",
                textAlign: "left",
              }}
            >
              Testimonials
            </h2>
          </div>
          <Box
            ref={glideRef}
            className="testimonal-carousel container glide"
            style={{
              position: "relative",
              paddingLeft: isSmall ? "25px" : "90px",
              maxWidth: 900,
              flexGrow: 1,
              margin: "auto",
              justifyContent: "center",
            }}
          >
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                {testimonials.map((testimonial, index) => (
                  <li key={index} className="glide__slide">
                    <Grid
                      container
                      sx={{
                        width: "100%",
                        justifyContent: isSmall ? "center" : "flex-start",
                      }}
                      spacing={2}
                      alignItems="center"
                    >
                      <Grid item>
                        <Box
                          component="div"
                          sx={{
                            height: isSmall ? "150px" : "250px",
                            width: isSmall ? "150px" : "250px",
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
                      <Grid item xs={isSmall ? 12 : 7}>
                        <div style={{ paddingBottom: "20px" }}>
                          {testimonial.type === "Mentor" ? (
                            <>
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
                                <p>
                                  {testimonial.role}
                                  <br />
                                  {testimonial.company}
                                </p>
                              </div>
                              <div style={{ textAlign: "left" }}>
                                {testimonial.text}
                              </div>
                            </>
                          ) : (
                            <>
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
                                <p>{testimonial.school}</p>
                              </div>
                              <div style={{ textAlign: "left" }}>
                                {testimonial.text}
                              </div>
                            </>
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </li>
                ))}
              </ul>
            </div>
          </Box>
          <div
            className="glide__arrows"
            data-glide-el="controls"
            style={{ position: "relative" }}
          >
            <button
              className="glide__arrow glide__arrow--left"
              data-glide-dir="<"
              style={{
                background: "transparent",
                border: "none",
                fontSize: "24px",
                color: "var(--brand-color)",
                margin: "10px",
                marginLeft: isSmall ? "0" : "300px",
                position: "absolute",
              }}
            >
              {"<"}
            </button>
            <button
              className="glide__arrow glide__arrow--right"
              data-glide-dir=">"
              style={{
                background: "transparent",
                border: "none",
                fontSize: "24px",
                color: "var(--brand-color)",
                margin: "10px",
                position: "absolute",
                marginRight: isSmall ? "0" : "300px",
              }}
            >
              {">"}
            </button>
          </div>

          <div
            className="container"
            style={{
              width: "100%",
              marginTop: "64px",
              marginBottom: "-32px",
              padding: "20px 50px",
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
                maxWidth: "1080px",
                margin: "20px auto",
                textAlign: "justify",
                textJustify: "inter-word",
              }}
            >
              Check out our mentors with impressive industry experience on the
              mentor page and apply today to discover your career interests.
              Have any questions? Head to our FAQ page to get your burning
              questions answered!
            </p>
            <button
              className="apply-button"
              style={{
                margin: "20px auto",
                display: "block",
              }}
            >
              <Link href="/apply">
                <h2 style={{ color: "black" }}>Apply Now</h2>
              </Link>
            </button>
          </div>
        </div>

        <Footer />
      </Box>
    </div>
  );
};

export default Index;
