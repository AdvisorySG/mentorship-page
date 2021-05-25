export const fetchMentors = async (setMentors, setMentorIds) => {
  const mentors = {};
  const mentorIds = [];

  const mentorsData = await fetch(
    "https://d21fj0gildolug.cloudfront.net/load_mentors"
  )
    .then((response) => response.json())
    .then((data) => data.mentors);

  const mentorIdsMap = new Map();

  mentorsData.forEach(
    ({
      Photo: images,
      Name: name,
      Biography: fullBio,
      "Job Title": role,
      "Industry 1": industry,
      Organisation: organisation,
      School: school,
      "Course of Study": courseOfStudy,
    }) => {
      const fullImageUrl = images ? images[0].url : undefined;
      const thumbnailImageUrl = images
        ? images[0].thumbnails.large.url
        : undefined;

      // The regex below serves to omit non-alphanumeric characters from name variable
      let mentorId = name.replace(/\W/g, "");
      let count = mentorIdsMap.get(mentorId);
      if (count === undefined) {
        mentorIdsMap.set(mentorId, 1);
      } else {
        count++;
        mentorIdsMap.set(mentorId, count);
        mentorId = mentorId + count;
      }

      mentors[mentorId] = {
        courseOfStudy,
        fullBio,
        fullImageUrl,
        industry,
        name,
        organisation,
        role,
        school,
        thumbnailImageUrl,
      };
      mentorIds.push(mentorId);
    }
  );

  setMentors(mentors);
  setMentorIds(mentorIds);
};
