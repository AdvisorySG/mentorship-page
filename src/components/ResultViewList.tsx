import React, { Fragment, useState } from "react";
import { Chip } from "@mui/material";

import type { DisplayResult } from "./ResultView";

const ResultViewList = ({
  displayResult,
  isShowReadMore,
}: {
  displayResult: DisplayResult;
  isShowReadMore?: boolean;
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
  } = displayResult;

  const [isReadMore, setIsReadMore] = useState(isShowReadMore ? false : true);

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
              dangerouslySetInnerHTML={{ __html: displayName }}
            />
          )}
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
                  dangerouslySetInnerHTML={{ __html: displayRole }}
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
                  dangerouslySetInnerHTML={{ __html: displayOrganisation }}
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
                dangerouslySetInnerHTML={{ __html: displayCourseOfStudy }}
              />
            </li>
          )}
          {displaySchool && (
            <li>
              <span className="sui-result__label">Graduated from </span>
              <span
                className="sui-result__value"
                style={{ fontSize: 16, fontWeight: 600 }}
                dangerouslySetInnerHTML={{ __html: displaySchool }}
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
                  __html: isReadMore ? displayFullBio : displayShortBio,
                }}
              />
              {isShowReadMore && (
                <a
                  className="sui-result__isReadMore"
                  style={{ fontSize: 14 }}
                  href="#isReadMore"
                  onClick={(e: any) => {
                    e.preventDefault();
                    setIsReadMore(!isReadMore);
                  }}
                >
                  {isReadMore ? "Read Less" : "Read More"}
                </a>
              )}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ResultViewList;
