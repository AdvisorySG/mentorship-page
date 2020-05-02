import { mentors } from "./mentors.json";

const fieldSearch = ({ field, value }) =>
  Object.keys(mentors).filter((mentorId) => mentors[mentorId][field] === value);

export { fieldSearch };
