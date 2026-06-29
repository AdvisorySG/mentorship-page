import { useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, Tooltip } from "@mui/material";

// Floating button (top-right of the modal) that copies a shareable
// `#mentor=<id>` link to the clipboard. Builds the URL from the id directly,
// so it does not depend on the current URL already containing the hash.
const CopyLinkButton = ({ mentorId }: { mentorId: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const url = `${window.location.origin}${window.location.pathname}#mentor=${mentorId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Could not copy link: ", err);
      });
  };

  return (
    <Tooltip
      title={copied ? "Copied!" : "Copy link to this mentor"}
      placement="top"
    >
      <IconButton
        onClick={handleCopy}
        size="medium"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "var(--brand-color)",
          color: "white",
          boxShadow: "2px 2px 8px rgba(0,0,0,0.2)",
          zIndex: 1,
        }}
        aria-label="copy link to this mentor"
      >
        {copied ? <CheckIcon /> : <ContentCopyIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default CopyLinkButton;
