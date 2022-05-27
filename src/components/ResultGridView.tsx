import React, { useState } from "react";
import { Modal, Button, CardActionArea } from "@mui/material";

import type { DisplayResult } from "./ResultView";
import ResultListView from "./ResultListView";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const ResultGridView = ({
  displayResult,
}: {
  displayResult: DisplayResult;
}) => {
  // Remove displayRole
  const { displayName, displayOrganisation, thumbnailImageUrl } = displayResult;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card className="flex-item">
      <CardActionArea onClick={handleOpen}>
        <CardMedia
          component="img"
          image={thumbnailImageUrl}
          className="card-image-region"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="card-name"
          >
            {displayName}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="card-desc"
          >
            {displayOrganisation && (
              <div className="card-desc">{displayOrganisation}</div>
            )}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleOpen}>Read More</Button>
        </CardActions>
      </CardActionArea>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ResultListView displayResult={displayResult} defaultReadMore={true} />
      </Modal>
    </Card>
  );
};

export default ResultGridView;
