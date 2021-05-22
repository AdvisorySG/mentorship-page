export const fetchMentors = async (setMentors, setMentorIds) => {
  const mentors = {};
  const mentorIds = [];

  const mentorsData = await fetch(
    "https://d21fj0gildolug.cloudfront.net/load_mentors"
  )
    .then((response) => response.json())
    .then((data) => data.mentors);

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
      var fullImageUrl, thumbnailImageUrl;

      fullImageUrl = images ? images[0].url : undefined;
      thumbnailImageUrl = images ? images[0].thumbnails.large.url : undefined;

      // The regex below serves to omit non-alphanumeric characters from name variable
      var mentorId = name.replace(/\W/g, "");

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
