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

  return (
    <Card
      className="sui-result"
      style={{
        maxWidth: "220px",
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
          style={{ width: "100%" }}
        />
        <CardContent>
          {displayName && (
            <span
              className="sui-result__title"
              dangerouslySetInnerHTML={{ __html: displayName }}
            />
          )}
          <ul className="sui-result__details" style={{ padding: 0 }}>
            {displayOrganisation && (
              <li>
                <span
                  className="sui-result__value"
                  style={{ fontSize: 16 }}
                  dangerouslySetInnerHTML={{ __html: displayOrganisation }}
                />
              </li>
            )}
            {displayRole && (
              <li>
                <span
                  className="sui-result__value"
                  style={{ fontSize: 16 }}
                  dangerouslySetInnerHTML={{ __html: displayRole }}
                />
              </li>
            )}
          </ul>
        </CardContent>
        <CardActions
          style={{ display: "flex", flexGrow: 1, alignItems: "flex-end" }}
        >
          <Button onClick={() => setIsModalOpen(true)}>Read More</Button>
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
          alignItems: "center",
          margin: "auto",
          maxWidth: "800px",
          maxHeight: "80%",
          overflow: "scroll",
        }}
      >
        <ResultViewList
          displayResult={displayResult}
          defaultIsReadMore={true}
        />
      </Modal>
    </Card>
  );
};

export default ResultViewGrid;
