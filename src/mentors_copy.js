import { body } from "./mentors_new.json";

const mentors = []

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

    mentors.push(mentor);
});

export { mentors, body };
