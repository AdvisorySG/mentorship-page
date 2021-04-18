import { mentors } from "./mentors";

const fieldSearch = ({ field, value }) =>
  mentors.filter((mentor) => mentor[field] === value);

export { fieldSearch };
