import React, { Fragment, useState } from "react";
import { Chip } from "@mui/material";

import type { DisplayResult } from "./ResultView";
import {
  Snackbar,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";

const ResultViewList = ({
  displayResult,
}: {
  displayResult: DisplayResult;
}) => {
  const {
    displayName,
    displayIndustries,
    displayRole,
    displayOrganisation,
    displayCourseOfStudy,
    displayFullBio,
    displayShortBio,
    displaySchool,
    industryColors,
    thumbnailImageUrl,
    uuid,
    searchName,
  } = displayResult;

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCopyLink = () => {
    const link = `${window.location.origin}${
      window.location.pathname
    }?uid=${uuid}&q=${encodeURIComponent(searchName || "")}`;
    navigator.clipboard.writeText(link).then(() => {
      setSnackbarOpen(true);
      setTimeout(() => setSnackbarOpen(false), 1000);
    });
  };

  return (
    <div className="sui-result">
      <div className="sui-result__image">
        <img src={thumbnailImageUrl} alt={displayName ?? ""} />
      </div>
      <div className="sui-result__body">
        <div className="sui-result__header">
          {displayName && (
            <span
              className="sui-result__title"
              dangerouslySetInnerHTML={{
                __html: displayName.replace(
                  /<em[^>]*>/g,
                  '<em style="background-color: transparent;">'
                ),
              }}
            />
          )}
          <SpeedDial
            ariaLabel="Share options"
            icon={<SpeedDialIcon icon={<ShareIcon />} />}
            direction="left"
          >
            <SpeedDialAction
              key="copyLink"
              icon={<ContentCopyIcon />}
              tooltipTitle="Copy link"
              onClick={handleCopyLink}
            />
          </SpeedDial>
          <Snackbar open={snackbarOpen} message="Link copied to clipboard" />
        </div>
        <ul className="sui-result__details">
          <li className="sui-result__industries">
            {displayIndustries.map((industry: string) => (
              <Chip
                style={{
                  backgroundColor: industryColors.get(industry),
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  marginRight: 10,
                  marginBottom: 7,
                }}
                label={industry}
              />
            ))}
          </li>
          {(displayRole || displayOrganisation) && (
            <li>
              {displayRole && (
                <span
                  className="sui-result__value"
                  style={{ fontSize: 16, fontWeight: 600 }}
                  dangerouslySetInnerHTML={{
                    __html: displayRole.replace(
                      /<em[^>]*>/g,
                      '<em style="background-color: transparent;">'
                    ),
                  }}
                />
              )}
              {displayRole && displayOrganisation && (
                <Fragment>
                  {" "}
                  <span> at </span>
                </Fragment>
              )}
              {displayOrganisation && (
                <span
                  className="sui-result__value"
                  style={{ fontSize: 16, fontWeight: 600 }}
                  dangerouslySetInnerHTML={{
                    __html: displayOrganisation.replace(
                      /<em[^>]*>/g,
                      '<em style="background-color: transparent;">'
                    ),
                  }}
                />
              )}
            </li>
          )}
          {displayCourseOfStudy && (
            <li>
              <span className="sui-result__label">Studied </span>
              <span
                className="sui-result__value"
                style={{ fontSize: 16, fontWeight: 600 }}
                dangerouslySetInnerHTML={{
                  __html: displayCourseOfStudy.replace(
                    /<em[^>]*>/g,
                    '<em style="background-color: transparent;">'
                  ),
                }}
              />
            </li>
          )}
          {displaySchool && (
            <li>
              <span className="sui-result__label">Graduated from </span>
              <span
                className="sui-result__value"
                style={{ fontSize: 16, fontWeight: 600 }}
                dangerouslySetInnerHTML={{
                  __html: displaySchool.replace(
                    /<em[^>]*>/g,
                    '<em style="background-color: transparent;">'
                  ),
                }}
              />
            </li>
          )}
          <hr />
          {displayFullBio && displayShortBio && (
            <li>
              <span
                className="sui-result__biography"
                style={{ fontSize: 14 }}
                dangerouslySetInnerHTML={{
                  __html: displayFullBio.replace(
                    /<em[^>]*>/g,
                    '<em style="background-color: transparent;">'
                  ),
                }}
              />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ResultViewList;
