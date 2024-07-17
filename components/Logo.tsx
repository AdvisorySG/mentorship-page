import React from "react";
import "../styles/Logo.css";

import * as logos from "../src/assets";

const Logo: React.FC = () => {
  const logoArray = [
    logos.aisp,
    logos.avanade,
    logos.basf,
    logos.bcg,
    logos.bigIdea,
    logos.bloomberg,
    logos.citi,
    logos.csa,
    logos.dbs,
    logos.deloitte,
    logos.edb,
    logos.edelman,
    logos.ey,
    logos.gic,
    logos.govtech,
    logos.ipr,
    logos.kearney,
    logos.maxeon,
    logos.mha,
    logos.nac,
    logos.nvpc,
    logos.one,
    logos.sap,
    logos.sc,
    logos.sgtech,
    logos.ttsh,
    logos.we,
    logos.google,
  ];

  return (
    <div className="logos">
      <div className="logos-slide">
        {logoArray.map((logo, index) => (
          <img key={index} src={logo} alt={`Logo ${index + 1}`} />
        ))}
      </div>

      <div className="logos-slide">
        {logoArray.map((logo, index) => (
          <img
            key={index + logoArray.length}
            src={logo}
            alt={`Logo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Logo;
