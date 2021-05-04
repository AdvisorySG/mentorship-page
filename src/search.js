// import { mentors } from "./mentors";

// temporarily added mentors field here to get rid of the error in this PR
const fieldSearch = ({ mentors, field, value }) =>
  mentors.filter((mentor) => mentor[field] === value);

export { fieldSearch };
