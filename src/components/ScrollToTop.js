import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useStyle = makeStyles((theme) => ({
  toTop: {
    zIndex: 2,
    position: "fixed",
    bottom: "2vh",
    backgroundColor: "#FF9B1F",
    color: "#FF9B1F",
    "&:hover, &.Mui-focusVisible": {
      transition: "0.3s",
      color: "black",
      backgroundColor: "#FF9B1F",
    },
    right: "5%",
  },
}));

const Scroll = (showBelow) => {
  const classes = useStyle();
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > showBelow.showBelow) {
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
        <IconButton onClick={handleClick} className={classes.toTop}>
          <KeyboardArrowUpIcon />
        </IconButton>
      )}
    </div>
  );
};

export default Scroll;
