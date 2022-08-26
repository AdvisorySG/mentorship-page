import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const style = {
  position: "fixed",
  bottom: "2vh",
  right: "5%",
  zIndex: 2,
  backgroundColor: "#FF9B1F",
  color: "#FF9B1F",
  "&:hover, &.Mui-focusVisible": {
    transition: "0.3s",
    color: "black",
    backgroundColor: "#FF9B1F",
  },
};

const Scroll = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 120) {
          setShow(true);
        } else {
          setShow(false);
        }
      },
      { capture: true }
    );
  }, []);

  const handleClick = () => {
    window["scrollTo"]({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {show && (
        <IconButton onClick={handleClick} sx={style}>
          <KeyboardArrowUpIcon />
        </IconButton>
      )}
    </div>
  );
};

export default Scroll;
