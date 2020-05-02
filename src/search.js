import { mentors, mentorIds } from "./mentors";

const fieldSearch = ({ field, value }, waveIndex) =>
  mentorIds[waveIndex].filter((mentorId) => mentors[mentorId][field] === value);

export { fieldSearch };
