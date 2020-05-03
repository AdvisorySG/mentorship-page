import { waves } from "./waves.json";
import { mentors } from "./mentors.json";

// Construct a 2-dimensional array where `mentorIds[0]` is the list of mentors
// in the first wave.
const mentorIds = waves.map((_, waveIndex) =>
  Object.keys(mentors)
    // Construct a new object to preserve the index before filtering.
    .map((mentorId) => ({ mentorId, mentor: mentors[mentorId] }))
    .filter(({ mentor }) => mentor.wave === waveIndex)
    .map(({ mentorId }) => mentorId)
);

export { mentors, mentorIds };
