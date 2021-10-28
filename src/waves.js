export const fetchWaves = async (setWaves, setMentors, setActiveWaveIndex) => {
  const wavesData = await fetch(
    "https://d21fj0gildolug.cloudfront.net/load_mentors"
  )
    .then((response) => response.json())
    .then(({ waves }) => waves);

  const waves = Array.from(wavesData, () => []);
  const mentors = {};

  wavesData.forEach((wave, i) => {
    wave.forEach(
      ({
        id: mentorId,
        Photo: images,
        Name: name,
        Biography: fullBio,
        "Job Title": role,
        "Industry 1": industry1,
        "Industry 2": industry2,
        "Industry 3": industry3,
        Organisation: organisation,
        School: school,
        "Course of Study": courseOfStudy,
      }) => {
        const fullImageUrl =
          Array.isArray(images) && images.length > 0
            ? images[0].url
            : "/mentor-thumbnail.png";
        const thumbnailImageUrl =
          Array.isArray(images) && images.length > 0 && images[0].thumbnails
            ? images[0].thumbnails.large.url
            : "/mentor-thumbnail.png";

        waves[i].push(mentorId);
        mentors[mentorId] = {
          courseOfStudy,
          fullBio,
          fullImageUrl,
          industries: [industry1, industry2, industry3].filter(Boolean).flat(),
          name,
          organisation,
          role,
          school,
          thumbnailImageUrl,
        };
      }
    );
  });

  setWaves(waves);
  setMentors(mentors);
  setActiveWaveIndex(waves.length - 1);
};
