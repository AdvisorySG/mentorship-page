import { body } from "./mentors.json";

const mentors = {};
const mentorIds = [];

body.forEach(
  ({
    Biography: fullBio,
    Photo: images,
    Organisation: organization,
    Schools: school,
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

export { mentors, mentorIds };
