"use client";
import React, { useRef, useEffect } from "react";
import Link from "next/link";

import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";
// import { Grid } from "@mui/material";
// import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

import { advisoryMentorshipLogo } from "../assets";
import Canvas from "../components/Canvas";
import Logo from "../components/PartnerLogos";
import Statistics, { Statistic } from "../components/Statistics";
import { URL_APPLY } from "../links";
import "../styles/Header.css";
import "../styles/App.css";

/*
interface Testimonial {
  person: string;
  type: string;
  role?: string;
  company?: string;
  school?: string;
  text: string;
}
*/

interface Image {
  index: string;
  label1: string;
  imgPath1: string;
}

/*
const TESTIMONIALS: Testimonial[] = [
  {
    person: "Mr. Randell Sie",
    type: "Mentor",
    role: "Managing Director",
    company: "Persistensie Pte Ltd",
    text: "“I've benefitted from mentorship tremendously in my career. You gain new perspectives, experience and a friendly ear who will not judge. The job of a mentor is to listen and extend your thinking, then let you make the final decision and own it.”",
  },
  {
    person: "Clarinda Ong",
    type: "Mentee",
    school: "Tampines Meridian Junior College",
    text: "“Going into this, I thought I knew what career I wanted. With my mentor's advice and guidance, and Advisory's thought-provoking worksheets, however, I discovered what better suited me. I used to be extremely unsure of my future, so I'm very glad this experience helped me shed light on my path forward. I have learnt more about myself and gained insights into what I want to do professionally.”",
  },
];

const IMAGES: Image[] = [
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
*/

const STATISTICS: Statistic[] = [
  {
    title: "Mentors",
    value: "3200+",
    icon: "mdi:account",
  },
  {
    title: "Mentees",
    value: "3800+",
    icon: "mdi:school",
  },
  {
    title: "Industries",
    value: "48",
    icon: "mdi:domain",
  },
  {
    title: "Mentorship Hours",
    value: "15,000+",
    icon: "mdi:clock-time-four-outline",
  },
];

const Index = () => {
  const isSmall = useMediaQuery("(max-width: 767px)");

  /*
  const glideRef = useRef(null);

  let glideTestimonial: any;

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
      ?.addEventListener("click", function () {
        glideTestimonial.go("<");
      });

    document
      .querySelector(".glide__arrow--right")
      ?.addEventListener("click", function () {
        glideTestimonial.go(">");
      });
  }

  function destroyGlide() {
    if (glideTestimonial && glideTestimonial.root) {
      glideTestimonial.destroy();
    }
  }

  function debounce(func: Function, delay: number) {
    let timer: any;
    return function (this: any) {
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        func.apply(context, args);
      }, delay);
    };
  }

  const refreshGlide = debounce(function () {
    destroyGlide(); // Clear any past instance
    initializeGlide();
  }, 500);

  useEffect(() => {
    refreshGlide();
    return () => destroyGlide();
  }, []);

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
  */

  return (
    <Canvas>
      <div className="logo-and-intro-container">
        <img
          className="header-mentorship-logo"
          src={advisoryMentorshipLogo}
          alt="Advisory Mentorship Programme"
        />
        <div className="header-mentorship-intro container text-lg" id="aboutus">
          <p>
            The Advisory Mentorship Programme pairs students with working
            professionals in their fields of interest on a 1-1 basis. Over the
            course of four months, mentors give an hour each month to meet with
            their mentee.
          </p>
        </div>
      </div>
      <h2>Our Impact</h2>
      <Statistics stats={STATISTICS} />
      <h2>Our Partner Organisations</h2>
      <Logo />
      {/*
      <h2>Testimonials</h2>
      <Box
        ref={glideRef}
        className="testimonal-carousel container glide"
        style={{
          position: "relative",
          paddingLeft: isSmall ? "25px" : "90px",
          maxWidth: "768px",
          flexGrow: 1,
          margin: "auto",
          justifyContent: "center",
        }}
      >
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {TESTIMONIALS.map((testimonial, index) => (
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
                        src={IMAGES[index].imgPath1}
                        alt={IMAGES[index].label1}
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
                      <strong>{testimonial.person}</strong>
                      <span
                        style={{
                          background: "var(--brand-color)",
                          marginLeft: "0.5rem",
                          padding: "5px",
                          borderRadius: "100px",
                        }}
                      >
                        {testimonial.type}
                      </span>
                      {testimonial.type === "Mentor" ? (
                        <>
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
            marginLeft: isSmall ? "12.5%" : "25%",
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
            marginRight: isSmall ? "12.5%" : "25%",
          }}
        >
          {">"}
        </button>
      </div>
      */}
      <div
        className="container"
        style={{
          width: "100%",
          // marginTop: "64px",
          paddingBottom: "60px",
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
            maxWidth: "1024px",
            margin: "20px 0",
            textAlign: "justify",
            textJustify: "inter-word",
          }}
        >
          Check out our mentors with impressive industry experience on the
          mentor page and apply today to discover your career interests. Have
          any questions? Head to our FAQ page to get your burning questions
          answered!
        </p>
        <button
          className="apply-button"
          style={{
            margin: "20px auto",
            display: "block",
          }}
        >
          <Link href={URL_APPLY} target="_blank">
            <h2 style={{ color: "white" }}>Apply Now</h2>
          </Link>
        </button>
      </div>
    </Canvas>
  );
};

export default Index;
