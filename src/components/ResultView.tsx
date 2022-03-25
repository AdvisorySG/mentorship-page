import React from "react";

import { Chip } from "@mui/material";

import "./ResultView.css";

// This function is needed as ElasticSearch trims off closed brackets at the
// end of snippets. Please refer to the following issue:
// https://github.com/AdvisorySG/mentorship-page/issues/440
const fillMissing = (snippet: any) => {
  const str = String(snippet);
  let open = 0;
  let close = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === "(") {
      open += 1;
    } else if (str.charAt(i) === ")") {
      close += 1;
    }
  }
  if (open - close === 1) {
    snippet = snippet + ")";
  }
  return snippet;
};

const ResultView = ({ result }: { result: any }) => {
  const {
    course_of_study: courseOfStudy,
    full_bio: fullBio,
    industries,
    name,
    organisation,
    role,
    school,
  } = result;

  const displayCourseOfStudy =
    courseOfStudy && courseOfStudy.snippet
      ? fillMissing(courseOfStudy.snippet)
      : "NA";
  const displayFullBio =
    fullBio && fullBio.snippet ? fullBio.snippet + "..." : "NA";
  const displayIndustries =
    industries && Array.isArray(industries.raw) ? industries.raw : [];
  const displayName = name && name.snippet ? name.snippet : "NA";
  const displayOrganisation =
    organisation && organisation.snippet ? organisation.snippet : "NA";
  const displayRole = role && role.snippet ? fillMissing(role.snippet) : "NA";
  const displaySchool = school && school.snippet ? school.snippet : "NA";

  return (
    <div>
      <li className="sui-result">
        <div className="sui-result__header">
          <span
            className="sui-result__title"
            dangerouslySetInnerHTML={{ __html: displayName }}
          />
        </div>
        <div className="sui-result__body">
          <div className="sui-result__image">
            <img src={result.thumbnail_image_url.raw} alt={displayName} />
          </div>
          <ul className="sui-result__details">
            <li>
              {displayIndustries.map((industry: any) => (
                <Chip
                  style={{ marginRight: 10, marginBottom: 7 }}
                  label={industry}
                />
              ))}
            </li>
            <li>
              <span className="sui-result__label">Role: </span>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{ __html: displayRole }}
              />
            </li>
            <li>
              <span className="sui-result__label">Organisation: </span>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{ __html: displayOrganisation }}
              />
            </li>
            <li>
              <span className="sui-result__label">School graduated from: </span>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{ __html: displaySchool }}
              />
            </li>
            <li>
              <span className="sui-result__label">Course of study: </span>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{ __html: displayCourseOfStudy }}
              />
            </li>
            <li>
              <span className="sui-result__label">Biography: </span>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{ __html: displayFullBio }}
              />
            </li>
          </ul>
        </div>
      </li>
    </div>
  );
};

export default ResultView;
