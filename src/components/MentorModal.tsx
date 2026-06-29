import { Suspense, lazy } from "react";

import { Modal } from "@mui/material";

import CopyLinkButton from "./CopyLinkButton";
import type { DisplayResult } from "./ResultView";

const LazyResultViewList = lazy(() => import("./ResultViewList"));

// The mentor detail modal, shared by the per-card (in-memory) path and the
// shared-link (fetched) path. The Modal's direct child must be a DOM element
// so MUI can attach its ref — hence the wrapping <div>.
const MentorModal = ({
  displayResult,
  open,
  onClose,
}: {
  displayResult: DisplayResult;
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal
      className="sui-result__modal"
      open={open}
      onClose={onClose}
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
        <CopyLinkButton mentorId={displayResult.id} />
      </div>
    </Modal>
  );
};

export default MentorModal;
