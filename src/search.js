import lunr from "lunr";

import { mentors } from "./mentors.json";

const mentorIds = mentors.map((mentor, index) => index);

const idx = lunr(function () {
  this.ref("id");
  [
    "name",
    "role",
    "organization",
    "school",
    "courseOfStudy",
    "fullBio",
  ].map((field) => this.field(field));
  mentors.forEach((mentor, index) => this.add({ id: index, ...mentor }));
});

function searchOverall(input) {
  const processedInput = input.trim();
  if (processedInput.length <= 0) {
    return mentorIds;
  }
  const searchResults = idx.search(processedInput);
  return searchResults.map((result) => result.ref);
}

export default searchOverall;
