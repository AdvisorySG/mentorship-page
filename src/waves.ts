import { Mentor, RawData } from "./interfaces";

const mentorsUrl = "https://d21fj0gildolug.cloudfront.net/load_mentors";

export const fetchWaves = async (
  setWaves: (
    waves: {
      [key: string]: Mentor;
    }[]
  ) => void,
  setActiveWaveIndex: (index: number) => void
) => {
  const mentorsData: RawData[] = await fetch(mentorsUrl)
    .then((response) => response.json())
    .then(({ mentors }) => mentors);

  const createMentor = (mentor: RawData): Mentor => ({
    courseOfStudy: mentor.course_of_study,
    fullBio: mentor.full_bio,
    fullImageUrl: mentor.full_image_url,
    industries: mentor.industries,
    name: mentor.name,
    organisation: mentor.organisation,
    role: mentor.role,
    school: mentor.school,
    thumbnailImageUrl: mentor.thumbnail_image_url,
  });

  const numWaves = Math.max(...mentorsData.map(({ wave_id }) => wave_id)) + 1;
  const waves: { [key: string]: Mentor }[] = [];

  Array(numWaves)
    .fill(0)
    .forEach((_, i) => {
      const newObj: { [key: string]: Mentor } = {};
      mentorsData
        .filter(({ wave_id }) => wave_id === i)
        .forEach((mentorData) => {
          newObj[mentorData.id] = createMentor(mentorData);
        });
      waves.push(newObj);
    });

  setWaves(waves);
  setActiveWaveIndex(waves.length - 1);
};
