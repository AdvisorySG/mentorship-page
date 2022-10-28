import React, { useState } from "react";
import { Modal, Button, CardActionArea } from "@mui/material";

import type { DisplayResult } from "./ResultView";
import ResultViewList from "./ResultViewList";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const ResultViewGrid = ({
  displayResult,
}: {
  displayResult: DisplayResult;
}) => {
  const { displayName, displayOrganisation, displayRole, thumbnailImageUrl } =
    displayResult;

  const [isModalOpen, setIsModalOpen] = useState(false);

  React.useEffect(() => {
    if (isModalOpen) {
      window.onpopstate = () => {
        setIsModalOpen(false);
      };
    }
  });

  return (
    <Card
      className="sui-result"
      style={{
        maxWidth: "165px",
        padding: "0px",
      }}
    >
      <CardActionArea
        onClick={() => setIsModalOpen(true)}
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
            height: "163px",
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
          <Button onClick={() => setIsModalOpen(true)} style={{ fontSize: 12 }}>
            Read More
          </Button>
        </CardActions>
      </CardActionArea>
      <Modal
        className="sui-result__modal"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
        <ResultViewList displayResult={displayResult} isShowReadMore={false} />
      </Modal>
    </Card>
  );
};

export default ResultViewGrid;
