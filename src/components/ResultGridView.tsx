import React, { useState } from "react";
import { Modal, Button } from "@mui/material";
import LazyLoad from "react-lazyload";

import type { DisplayResult } from "./ResultView";
import ResultListView from "./ResultListView";

const ResultGridView = ({
  displayResult,
}: {
  displayResult: DisplayResult;
}) => {
  const { displayName, displayRole, displayOrganisation, thumbnailImageUrl } =
    displayResult;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="card">
      <div className="card-image-region">
        <LazyLoad height={160} offset={480} once>
          <img src={thumbnailImageUrl} alt={displayName ?? ""} />
        </LazyLoad>
      </div>
      <div className="card-descriptors">
        <div className="card-name">{displayName}</div>
        <div className="card-desc">{displayRole}</div>
        {displayOrganisation && (
          <div className="card-desc">{displayOrganisation}</div>
        )}
      </div>
      <Button onClick={handleOpen}>Read More</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ResultListView displayResult={displayResult} defaultReadMore={true} />
      </Modal>
    </div>
  );
};

export default ResultGridView;
