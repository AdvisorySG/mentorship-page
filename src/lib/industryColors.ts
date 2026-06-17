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

// Module-level so colors stay consistent across every result/modal on the page.
const industryColors = new Map<string, string>();

// Assigns a stable color to each industry (first-seen order) and returns the
// shared map. Idempotent for industries already assigned.
export function assignIndustryColors(
  industries: Array<string>,
): Map<string, string> {
  industries.forEach((industry) => {
    if (!industryColors.has(industry)) {
      industryColors.set(industry, COLORS[industryColors.size % COLORS.length]);
    }
  });
  return industryColors;
}
