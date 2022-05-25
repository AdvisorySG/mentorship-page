import React, { Fragment, useState } from "react";
import { Chip } from "@mui/material";

import type { DisplayResult } from "./ResultView";

const ResultListView = ({
  displayResult,
  defaultReadMore,
}: {
  displayResult: DisplayResult;
  defaultReadMore?: boolean;
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

  const [readMore, setReadMore] = useState(defaultReadMore ?? false);

  return (
    <div>
      <li className="sui-result">
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
            {displayName && (
              <li>
                {displayRole && (
                  <span
                    className="sui-result__value"
                    style={{ fontSize: 16, fontWeight: 600 }}
                    dangerouslySetInnerHTML={{ __html: displayRole }}
                  />
                )}
                {displayOrganisation && (
                  <Fragment>
                    {" "}
                    <span> at </span>
                    <span
                      className="sui-result__value"
                      style={{ fontSize: 16, fontWeight: 600 }}
                      dangerouslySetInnerHTML={{ __html: displayOrganisation }}
                    />
                  </Fragment>
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
                    __html: readMore ? displayFullBio : displayShortBio,
                  }}
                />
                <a
                  className="sui-result__readMore"
                  style={{ fontSize: 14 }}
                  href="#readMore"
                  onClick={(e: any) => {
                    e.preventDefault();
                    setReadMore(!readMore);
                  }}
                >
                  {readMore ? "Read Less" : "Read More"}
                </a>
              </li>
            )}
          </ul>
        </div>
      </li>
    </div>
  );
};

export default ResultListView;
