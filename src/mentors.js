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
      Biography: fullBio,
      Photo: images,
      Organisation: organization,
      School: school,
      "Course of Study": courseOfStudy,
      Name: name,
      "Job Title": role,
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
        name,
        organization,
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
