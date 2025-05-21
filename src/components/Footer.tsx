import React from "react";

import { footerLogo } from "../assets";
import "../styles/Footer.css";

const FacebookBox = () => (
  <a href="https://www.facebook.com/advisorysg/">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="icon"
      id="facebook-box"
    >
      <path d="M2.667 0h18.666C22.8 0 24 1.2 24 2.667v18.666C24 22.8 22.8 24 21.333 24H2.667A2.675 2.675 0 0 1 0 21.333V2.667C0 1.2 1.2 0 2.667 0Zm17.332 2.667h-3.333A4.672 4.672 0 0 0 12 7.334v3.333H9.333v4h2.666v9.332h4v-9.333h4v-4h-4V8c0-.733.6-1.333 1.333-1.333H20z"></path>
    </svg>
  </a>
);

const InstagramBox = () => (
  <a href="https://www.instagram.com/advisory.sg/">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="icon"
      id="instagram-box"
    >
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63a5.876 5.876 0 0 0-2.126 1.384A5.855 5.855 0 0 0 .63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 0 0 1.384 2.126A5.868 5.868 0 0 0 4.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 0 0 2.126-1.384 5.86 5.86 0 0 0 1.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 0 0-1.384-2.126A5.847 5.847 0 0 0 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0Zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85 0 3.204-.015 3.585-.074 4.85-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 0 1-.899 1.382 3.744 3.744 0 0 1-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 0 1-1.379-.899 3.644 3.644 0 0 1-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"></path>
    </svg>
  </a>
);

const LinkedinBox = () => (
  <a href="https://sg.linkedin.com/company/advisorysg">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="icon"
      id="linkedin-box"
    >
      <path d="M21.333 0A2.667 2.667 0 0 1 24 2.667v18.666A2.667 2.667 0 0 1 21.333 24H2.667A2.667 2.667 0 0 1 0 21.333V2.667A2.667 2.667 0 0 1 2.667 0zm-.666 20.666V13.6c0-2.4-1.946-4.346-4.347-4.346-1.133 0-2.453.693-3.093 1.733v-1.48h-3.72v11.16h3.72v-6.574a1.86 1.86 0 0 1 1.853-1.867c1.031 0 1.867.836 1.867 1.867v6.573h3.72zM5.174 7.413a2.247 2.247 0 0 0 0-4.493A2.253 2.253 0 0 0 2.92 5.173c0 1.24 1.013 2.24 2.253 2.24zm1.854 13.253V9.506H3.335v11.16Z"></path>
    </svg>
  </a>
);

const Footer = () => {
  return (
    <footer
      className="flex-col align-center bg-neutral-900 w-screen"
      id="footer"
    >
      <div className="w-screen max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-5 justify-items-center pt-8">
        <div
          className="col-auto max-w-2xl flex flex-col sm:flex-row sm:col-span-3 md:col-span-2 md:flex-row lg:flex-row items-center"
          style={{ maxWidth: "25rem" }}
        >
          <img
            className="h-60 m-auto"
            src={footerLogo}
            alt="Footer Logo"
            id="logo"
          />
          <div style={{ width: "20rem" }}>
            <p
              className="text-neutral-300 text-center sm:text-left md:text-center lg:text-left"
              id="desc"
            >
              Advisory is a fully youth-led non-profit dedicated to empowering
              young Singaporeans to make informed decisions about their futures.
            </p>
          </div>
        </div>
      </div>
      <div className="w-screen max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 pt-0 px-8 justify-center sm:justify-between">
        <div className="justify-self-center sm:justify-self-start">
          <p className="text-neutral-300" id="copyright-text">
            © 2024 Advisory Singapore (CLG) Ltd
          </p>
        </div>
        <div className="justify-self-center sm:justify-self-end flex flex-row gap-4 py-3">
          <FacebookBox />
          <InstagramBox />
          <LinkedinBox />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
