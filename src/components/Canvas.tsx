import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import PrivacyModal from "./PrivacyNote";

const Canvas = ({ children }: { children: React.ReactNode }) => (
  <>
    <PrivacyModal />
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: "calc(1130px + 8vw)",
        paddingLeft: "4vw",
        paddingRight: "4vw",
      }}
    >
      <div style={{ maxHeight: "var(--navbar-height)" }}>
        <Header />
      </div>
      <div
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
