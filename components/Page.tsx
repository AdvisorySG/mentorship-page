import React from "react";

import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

const Canvas = ({ children }) => (
  <>
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: "calc(1130px + 8vw)",
        paddingLeft: "4vw",
        paddingRight: "4vw",
      }}
    >
      <div className="container" style={{ maxHeight: "var(--navbar-height)" }}>
        <Header />
      </div>
      <div
        className="container"
        style={{
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          boxSizing: "border-box",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
    <Footer />
  </>
);

export default Canvas;
