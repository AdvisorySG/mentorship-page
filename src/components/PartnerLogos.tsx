import React from "react";

import { partnerLogos } from "../assets";
import "../styles/Logo.css";

const Logo: React.FC = () => {
  return (
    <div className="partners">
      <div className="partners-slide">
        {partnerLogos.map(([altText, logo], index) => (
          <img key={index} src={logo} alt={altText} />
        ))}
      </div>

      <div className="partners-slide">
        {partnerLogos.map(([altText, logo], index) => (
          <img key={index + partnerLogos.length} src={logo} alt={altText} />
        ))}
      </div>
    </div>
  );
};

export default Logo;
