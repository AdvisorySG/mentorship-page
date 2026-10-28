import { useEffect, useState } from "react";

import { CircularProgress, Modal } from "@mui/material";

import MentorModal from "./MentorModal";
import type { DisplayResult } from "./ResultView";
import { displayResultFromSource, fetchMentorById } from "../lib/mentorApi";

// Set on history entries pushed by opening a card modal, marking that the
// previous entry is this page and `history.back()` is safe.
export const MENTOR_MODAL_HISTORY_KEY = "mentorModal";

// Reads `#mentor=<id>` from the URL hash.
const getMentorIdFromHash = (): string | null => {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.startsWith("#")
    ? window.location.hash.slice(1)
    : window.location.hash;
  return new URLSearchParams(hash).get("mentor");
};

// Page-level modal that handles shared `#mentor=<id>` links. Fetches the one
// mentor by id (so it works even when that mentor is not in the loaded result
// set) and renders it via the shared MentorModal.
const SharedMentorModal = () => {
  const [mentorId, setMentorId] = useState<string | null>(null);
  const [displayResult, setDisplayResult] = useState<DisplayResult | null>(
    null,
  );
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  // Sync the mentor id from the hash on initial load and on back/forward.
  useEffect(() => {
    const sync = () => setMentorId(getMentorIdFromHash());
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  // Fetch the mentor whenever the hash id changes.
  useEffect(() => {
    if (!mentorId) {
      setDisplayResult(null);
      setStatus("idle");
      return;
    }
    let cancelled = false;
    setStatus("loading");
    setDisplayResult(null);
    fetchMentorById(mentorId).then((source) => {
      if (cancelled) return;
      if (!source) {
        setStatus("error");
        return;
      }
      setDisplayResult(displayResultFromSource(mentorId, source));
      setStatus("idle");
    });
    return () => {
      cancelled = true;
    };
  }, [mentorId]);

  // Close without destroying the `#mentor=` history entry, so back/forward can
  // return to it. If a card click pushed this entry, step back over it like the
  // card modal does. Otherwise the page was opened from a shared link and the
  // previous entry may be off-site, so push a hash-free entry instead.
  const handleClose = () => {
    if (window.history.state?.[MENTOR_MODAL_HISTORY_KEY]) {
      window.history.back();
    } else {
      window.history.pushState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
    setMentorId(null);
  };

  if (!mentorId) return null;

  if (displayResult) {
    return (
      <MentorModal
        displayResult={displayResult}
        open={true}
        onClose={handleClose}
      />
    );
  }

  // Loading / not-found states.
  return (
    <Modal
      className="sui-result__modal"
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-title"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        maxWidth: "800px",
        maxHeight: "80%",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
          textAlign: "center",
          outline: "none",
        }}
      >
        {status === "loading" ? <CircularProgress /> : <p>Mentor not found.</p>}
      </div>
    </Modal>
  );
};

export default SharedMentorModal;
