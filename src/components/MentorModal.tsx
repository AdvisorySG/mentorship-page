import { Suspense, lazy } from "react";

import { CircularProgress, Modal } from "@mui/material";

import CopyLinkButton from "./CopyLinkButton";
import type { DisplayResult } from "./ResultView";

const LazyResultViewList = lazy(() => import("./ResultViewList"));

// The mentor detail modal, shared by the per-card (in-memory) path and the
// shared-link (fetched) path. The Modal's direct child must be a DOM element
// so MUI can attach its ref — hence the wrapping <div>. MUI focuses that <div>
// on open, so its outline is hidden to avoid a focus ring around the modal.
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
      <div style={{ position: "relative", width: "100%", outline: "none" }}>
        {/* The copy button sits inside Suspense so it appears together with
            the details rather than floating in an empty modal while the
            ResultViewList chunk loads. */}
        <Suspense
          fallback={
            <div
              style={{
                background: "white",
                padding: "2rem",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <CircularProgress />
            </div>
          }
        >
          <LazyResultViewList displayResult={displayResult} />
          <CopyLinkButton mentorId={displayResult.id} />
        </Suspense>
      </div>
    </Modal>
  );
};

export default MentorModal;
