import React, { lazy, Suspense } from "react";

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
import { SearchResult } from "@elastic/search-ui";
import { htmlToText } from "html-to-text";

const LazyResultViewGrid = lazy(() => import("./ResultViewGrid"));

// Performs intelligent snippet truncation by removing leading/trailing periods and
// whitespace, and filling with ellipsis accordingly.
const fillEllipsis = (snippet: string | null, full: string) => {
  if (!snippet) {
    return full;
  }

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
const fillHighlights = (snippet: string | null, full: string): string => {
  if (!snippet) {
    return full;
  }

  const snippetRaw = htmlToText(snippet, { wordwrap: false });
  const styledSnippet = snippet.replace(
    /<em>/g,
    '<em style= "font-weight: bold; color: #375ae6; font-style: normal; background-color: #edf6fe; ">',
  );
  return full.replace(snippetRaw, styledSnippet);
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

type DisplayResult = {
  id: string;
  displayName: string | null;
  displayIndustries: Array<string>;
  displayRole: string | null;
  displayOrganisation: string | null;
  displayCourseOfStudy: string | null;
  displayFullBio: string | null;
  displayShortBio: string | null;
  displaySchool: string | null;
  industryColors: Map<string, string>;
  thumbnailImageUrl?: string;
};

const ResultView = ({
  result,
  onClick,
}: {
  result: SearchResult;
  onClick: (resultId: string, query: string) => void;
}) => {
  const {
    id: idObj,
    course_of_study: courseOfStudy,
    full_bio: fullBio,
    industries,
    name,
    organisation,
    role,
    school,
    thumbnail_image_url,
  } = result;

  const id = idObj.raw;

  const fillEllipsisIfPossible = (txt: {
    raw: string;
    snippet?: string[];
  }): string | null => {
    if (!txt) {
      return null;
    }
    return txt.snippet ? fillEllipsis(txt.snippet[0], txt.raw) : txt.raw;
  };

  const fillHighlightsIfPossible = (txt: {
    raw: string;
    snippet?: string[];
  }): string | null => {
    if (!txt) {
      return null;
    }
    return txt.snippet ? fillHighlights(txt.snippet[0], txt.raw) : txt.raw;
  };

  const displayName = fillHighlightsIfPossible(name);

  const thumbnailImageUrl =
    thumbnail_image_url && thumbnail_image_url.raw
      ? thumbnail_image_url.raw
      : null;

  const displayIndustries =
    industries && Array.isArray(industries.raw) ? industries.raw : [];
  displayIndustries.forEach((industry: string) => {
    if (!industryColors.has(industry)) {
      industryColors.set(industry, COLORS[industryColors.size % COLORS.length]);
    }
  });

  const displayRole = fillHighlightsIfPossible(role);
  const displayOrganisation = fillHighlightsIfPossible(organisation);
  const displayCourseOfStudy = fillHighlightsIfPossible(courseOfStudy);
  const displaySchool = fillHighlightsIfPossible(school);
  const displayShortBio = fillEllipsisIfPossible(fullBio);
  const displayFullBio = fillHighlightsIfPossible(fullBio);

  const displayResult: DisplayResult = {
    id,
    displayCourseOfStudy,
    displayFullBio,
    displayIndustries,
    displayName,
    displayOrganisation,
    displayRole,
    displaySchool,
    displayShortBio,
    industryColors,
    thumbnailImageUrl,
  };

  const handleClick = () => {
    onClick(id, name);
  };

  return (
    <Suspense fallback={null}>
      <div onClick={handleClick}>
        <LazyResultViewGrid displayResult={displayResult} />
      </div>
    </Suspense>
  );
};

export default ResultView;
export type { DisplayResult };
