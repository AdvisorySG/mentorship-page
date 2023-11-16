// Footer.js
import React from "react";
import "../styles/Footer.css";
import { footerLogo } from "../components/assets";

const Footer = () => {
  return (
    <footer
      className="flex-col align-center bg-neutral-900 w-screen"
      id="footer"
    >
      <div className="w-screen max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 justify-items-center pt-16 px-16">
        <div
          className="col-auto max-w-2xl flex flex-col sm:flex-row sm:col-span-3 md:col-span-2 md:flex-col lg:flex-row items-center"
          style={{ minWidth: "25rem" }}
        >
          <img className="h-60 m-auto" src={footerLogo} alt="Footer Logo" />
          <p
            className="text-neutral-300 text-center sm:text-left md:text-center lg:text-left"
            id="desc"
          >
            Advisory is a fully youth-led non-profit dedicated to empowering
            young Singaporeans to make informed decisions about their futures.
          </p>
        </div>
        <div
          className="text-center sm:text-left md:text-center lg:text-left"
          id="grid1"
        >
          <h4 className="text-white">WHO WE ARE</h4>
          <p className="page-links">
            <a className="text-neutral-300" href="/team/">
              Our Team
            </a>
          </p>
          <p className="page-links">
            <a className="text-neutral-300" href="/our-partners/">
              Our Partners
            </a>
          </p>
          <p className="page-links">
            <a className="text-neutral-300" href="/about-us/">
              About Us
            </a>
          </p>
        </div>
        <div className="text-center sm:text-left md:text-center lg:text-left">
          <h4 className="text-white">WHAT WE DO</h4>
          <p className="page-links">
            <a className="text-neutral-300" href="/events/">
              Our Events
            </a>
          </p>
          <p className="page-links">
            <a className="text-neutral-300" href="/stories/">
              Our Stories
            </a>
          </p>
          <p className="page-links">
            <a className="text-neutral-300" href="/impact/">
              Our Impact
            </a>
          </p>
        </div>
        <div className="text-center sm:text-left md:text-center lg:text-left">
          <h4 className="text-white">GET INVOLVED</h4>
          <p className="page-links">
            <a className="text-neutral-300" href="/contact-us/">
              Contact Us
            </a>
          </p>
          <p className="page-links">
            <a className="text-neutral-300" href="/join-us/">
              Join Us
            </a>
          </p>
        </div>
      </div>
      <div className="w-screen max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 px-16 py-8 justify-center sm:justify-between">
        <div className="justify-self-center sm:justify-self-start">
          <p className="text-neutral-300">© 2022 Advisory SG</p>
        </div>
        <div className="justify-self-center sm:justify-self-end flex flex-row gap-4">
          {/* Replace these placeholder social media icons with your actual icons or images */}
          <a
            className="social-item social-item-facebook"
            href="https://www.facebook.com/advisory.sg/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            {/* Placeholder image for Facebook */}
            <img
              src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/facebook-round-color-icon.png"
              alt="Facebook Icon"
              width="30"
              height="30"
              style={{ fill: "white" }}
            />
          </a>
          <a
            className="social-item social-item-instagram"
            href="https://www.instagram.com/advisory.sg/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            {/* Placeholder image for Instagram */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/240px-Instagram_logo_2016.svg.png"
              alt="Instagram Icon"
              width="30"
              height="30"
            />
          </a>
          <a
            className="social-item social-item-linkedin"
            href="https://www.linkedin.com/company/advisorysg/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            {/* Placeholder image for LinkedIn */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png"
              alt="LinkedIn Icon"
              width="30"
              height="30"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
