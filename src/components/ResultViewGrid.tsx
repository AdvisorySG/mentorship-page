import { useEffect, useRef, useState } from "react";

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useInView } from "react-intersection-observer";

import MentorModal from "./MentorModal";
import type { DisplayResult } from "./ResultView";
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
      if (window.umami) {
        window.umami.track("Impression", { id, env: process.env.NODE_ENV });
      }
    }
  }, [id, inView]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    window.history.pushState({}, "");
    setIsModalOpen(true);
    if (window.umami) {
      window.umami.track("Click", { id, env: process.env.NODE_ENV });
    }
  };

  const handleClose = () => {
    window.history.back();
  };

  useEffect(() => {
    if (isModalOpen) {
      window.onpopstate = () => {
        setIsModalOpen(false);
      };
    }
  });

  return (
    <>
      <Card
        className="sui-resultgrid"
        onClick={handleOpen}
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          width: "100%",
          height: "auto",
          padding: "0px",
        }}
        ref={ref}
      >
        <CardActionArea
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
        </CardActionArea>
        <CardActions
          style={{ display: "flex", flexGrow: 1, alignItems: "flex-end" }}
        >
          <Button style={{ fontSize: 12 }}>Read More</Button>
        </CardActions>
      </Card>
      <MentorModal
        displayResult={displayResult}
        open={isModalOpen}
        onClose={handleClose}
      />
    </>
  );
};

export default ResultViewGrid;
