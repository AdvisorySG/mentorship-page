import { body } from "./mentors.json";

const mentors = {};
const mentorIds = [];

body.forEach(({ 
    Biography: fullBio,
    Photo: images,
    Organisation: organization, 
    Schools: school, 
    "Course of Study": courseOfStudy, 
    Name: name,
    "Job Title": role 
}) => {
    var fullImageUrl, thumbnailImageUrl;
    
    fullImageUrl = images ? images[0].url : undefined;
    thumbnailImageUrl = images ? images[0].thumbnails.large.url : undefined;

    var mentor = { courseOfStudy, fullBio, fullImageUrl, name, organization, role, school, thumbnailImageUrl }

    // The regex below serves to omit non-alphanumeric characters from name variable
    mentors[mentor.name.replace(/\W/g, '')] = mentor;
    mentorIds.push(name.replace(/\W/g, ''));
});

export { mentors, mentorIds };
