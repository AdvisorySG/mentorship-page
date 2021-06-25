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
        images.length > 0
          ? images[0].url
          : "https://dl.airtable.com/.attachmentThumbnails/3157ebe39c8653ac4e530235a70d83e7/2d3f0493";
      const thumbnailImageUrl =
        images.length > 0 && images[0].thumbnails
          ? images[0].thumbnails.large.url
          : "https://dl.airtable.com/.attachmentThumbnails/3157ebe39c8653ac4e530235a70d83e7/2d3f0493";

      mentors[mentorId] = {
        courseOfStudy,
        fullBio,
        fullImageUrl,
        industries: [industry1, industry2, industry3].filter(Boolean),
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
