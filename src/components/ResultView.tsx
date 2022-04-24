import React, { useState } from "react";

import { Chip } from "@mui/material";
import {
  red,
  pink,
  deepPurple,
  indigo,
  blue,
  cyan,
  teal,
  lightGreen,
  yellow,
  deepOrange,
  brown,
  blueGrey,
} from "@mui/material/colors";

import { htmlToText } from "html-to-text";

import "./ResultView.css";

// This function is needed as ElasticSearch trims off closed brackets at the
// end of snippets. Please refer to the following issue:
// https://github.com/AdvisorySG/mentorship-page/issues/440
const fillMissing = (snippet: string) => {
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

// Performs intelligent snippet truncation by removing leading/trailing periods and
// whitespace, and filling with ellipsis accordingly.
const fillEllipsis = (snippet: string, full: string) => {
  const snippetRaw = htmlToText(snippet, { wordwrap: false });

  const startRegex = /^[\s.!?]+/g;
  const endRegex = /[\s.!?]+$/g;

  const snippetRawTrimmedStart = snippetRaw.replace(startRegex, "");
  const snippetRawTrimmedEnd = snippetRaw.replace(endRegex, "");

  const fullTrimmedStart = full.replace(startRegex, "");
  const fullTrimmedEnd = full.replace(endRegex, "");

  if (snippetRaw.trim() === full.trim()) {
    return snippet;
  } else if (fullTrimmedStart.indexOf(snippetRawTrimmedStart) === 0) {
    return snippet.replace(endRegex, "") + "...";
  } else if (
    fullTrimmedEnd.indexOf(snippetRawTrimmedEnd) +
      snippetRawTrimmedEnd.length ===
    fullTrimmedEnd.length
  ) {
    return "..." + snippet.replace(startRegex, "");
  } else {
    return (
      "..." + snippet.replace(startRegex, "").replace(endRegex, "") + "..."
    );
  }
};

// Fills in highlights from snippet text.
const fillHighlights = (snippet: string, full: string) => {
  const snippetRaw = htmlToText(snippet, { wordwrap: false });
  return full.replace(snippetRaw, snippet);
};

const COLORS = [
  red,
  pink,
  deepPurple,
  indigo,
  blue,
  cyan,
  teal,
  lightGreen,
  yellow,
  deepOrange,
  brown,
  blueGrey,
].map((color) => color[200]);

const industryColors = new Map();

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
  const displayShortBio =
    fullBio && fullBio.snippet && fullBio.raw
      ? fillEllipsis(fullBio.snippet, fullBio.raw)
      : "NA";
  const displayFullBio =
    fullBio && fullBio.snippet && fullBio.raw
      ? fillHighlights(fullBio.snippet, fullBio.raw)
      : "NA";
  const displayIndustries =
    industries && Array.isArray(industries.raw) ? industries.raw : [];
  const displayName = name && name.snippet ? name.snippet : "NA";
  const displayOrganisation =
    organisation && organisation.snippet ? organisation.snippet : "NA";
  const displayRole = role && role.snippet ? fillMissing(role.snippet) : "NA";
  const displaySchool = school && school.snippet ? school.snippet : "NA";

  displayIndustries.forEach((industry: string) => {
    if (!industryColors.has(industry)) {
      industryColors.set(industry, COLORS[industryColors.size % COLORS.length]);
    }
  });

  const [readMore, setReadMore] = useState(false);

  return (
    <div>
      <li className="sui-result">
        <div className="sui-result__image">
          <img src={result.thumbnail_image_url.raw} alt={displayName} />
        </div>
        <div className="sui-result__body">
          <div className="sui-result__header">
            <span
              className="sui-result__title"
              dangerouslySetInnerHTML={{ __html: displayName }}
            />
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
            <li>
              <span
                className="sui-result__value"
                style={{ fontSize: 16, fontWeight: 600 }}
                dangerouslySetInnerHTML={{ __html: displayRole }}
              />
              <span> at </span>
              <span
                className="sui-result__value"
                style={{ fontSize: 16, fontWeight: 600 }}
                dangerouslySetInnerHTML={{ __html: displayOrganisation }}
              />
            </li>
            <li>
              <span className="sui-result__label">Studied </span>
              <span
                className="sui-result__value"
                style={{ fontSize: 16, fontWeight: 600 }}
                dangerouslySetInnerHTML={{ __html: displayCourseOfStudy }}
              />
            </li>
            <li>
              <span className="sui-result__label">Graduated from </span>
              <span
                className="sui-result__value"
                style={{ fontSize: 16, fontWeight: 600 }}
                dangerouslySetInnerHTML={{ __html: displaySchool }}
              />
            </li>
            <hr />
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
          </ul>
        </div>
      </li>
    </div>
  );
};

export default ResultView;
