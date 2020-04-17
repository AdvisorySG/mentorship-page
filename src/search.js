import { mentors } from "./mentors.json";

const fieldSearch = ({ field, value }) =>
  mentors
    .map((mentor, index) => index)
    .filter((index) => mentors[index][field] === value);

export { fieldSearch };
