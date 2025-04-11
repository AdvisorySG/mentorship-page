import React, { Suspense, lazy, useEffect, useRef, useState } from "react";

import {
  Button,
  Modal,
  CardActionArea,
  Tooltip,
  IconButton,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useInView } from "react-intersection-observer";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import type { DisplayResult } from "./ResultView";
const LazyResultViewList = lazy(() => import("./ResultViewList"));
import "../styles/ResultView.css";

const ResultViewGrid = ({
  displayResult,
}: {
  displayResult: DisplayResult;
}) => {
  const { ref, inView } = useInView();

  const {
    id,
    displayName,
    displayOrganisation,
    displayRole,
    thumbnailImageUrl,
  } = displayResult;

  const inViewRef = useRef(false);
  useEffect(() => {
    if (!inViewRef.current && inView) {
      inViewRef.current = true;
      window.umami.track("Impression", { id, env: process.env.NODE_ENV });
    }
  }, [id, inView]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal if URL contains "mentor" query parameter (i.e. it was a copied link)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const mentorId = urlParams.get("mentor");
    if (mentorId === id) {
      setIsModalOpen(true);
    }
  }, [id]);

  const handleOpen = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("mentor", id);
    window.history.pushState({}, "", url.toString());
    setIsModalOpen(true);
    window.umami.track("Click", { id, env: process.env.NODE_ENV });
  };

  const handleClose = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("mentor");
    window.history.pushState({}, "", url.toString());
    setIsModalOpen(false);
  };

  const handleCopyLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("mentor", id);
    navigator.clipboard.writeText(url.toString()).catch((err) => {
      console.error("Could not copy text: ", err);
    });
  };

  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const mentorId = urlParams.get("mentor");
      setIsModalOpen(mentorId === id);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [id]);

  return (
    <Card
      className="sui-resultgrid"
      style={{
        width: "100%",
        height: "auto",
        padding: "0px",
      }}
      ref={ref}
    >
      <CardActionArea
        onClick={handleOpen}
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          alignItems: "stretch",
          justifyContent: "flex-start",
          height: "100%",
        }}
      >
        <CardMedia
          component="img"
          image={thumbnailImageUrl}
          style={{
            width: "100%",
            height: "180px",
          }}
        />
        <CardContent>
          {displayName && (
            <span
              className="sui-result__title"
              style={{ fontSize: 18 }}
              dangerouslySetInnerHTML={{ __html: displayName }}
            />
          )}
          <ul className="sui-result__details" style={{ padding: 0 }}>
            {displayOrganisation && (
              <li style={{ margin: "5px 0" }}>
                <span
                  className="sui-result__value"
                  style={{ fontSize: 14 }}
                  dangerouslySetInnerHTML={{ __html: displayOrganisation }}
                />
              </li>
            )}
            {displayRole && (
              <li style={{ margin: "5px 0" }}>
                <span
                  className="sui-result__value"
                  style={{ fontSize: 14 }}
                  dangerouslySetInnerHTML={{ __html: displayRole }}
                />
              </li>
            )}
          </ul>
        </CardContent>
        <CardActions
          style={{ display: "flex", flexGrow: 1, alignItems: "flex-end" }}
        >
          <Button onClick={handleOpen} style={{ fontSize: 12 }}>
            Read More
          </Button>
        </CardActions>
      </CardActionArea>
      <Modal
        className="sui-result__modal"
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        style={{
          display: "flex",
          alignItems: "flex-start",
          margin: "auto",
          maxWidth: "800px",
          maxHeight: "80%",
          overflow: "auto",
        }}
      >
        <div style={{ position: "relative", width: "100%" }}>
          <Suspense fallback={null}>
            <LazyResultViewList displayResult={displayResult} />
          </Suspense>
          <Tooltip title="Copy link to this mentor" placement="top">
            <IconButton
              onClick={handleCopyLink}
              size="medium"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "var(--brand-color)",
                color: "white",
                boxShadow: "2px 2px 8px rgba(0,0,0,0.2)",
              }}
              aria-label="copy link"
            >
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Modal>
    </Card>
  );
};

export default ResultViewGrid;
