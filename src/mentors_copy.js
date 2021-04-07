import { body } from "./mentors_new.json";

// Construct a 2-dimensional array of mentors in ascending order of `First Name`

const mentors = []

body.forEach(({ 
    Biography: fullBio,
    Photo: images,
    Organisation: organization, 
    Schools: school, 
    "Course of Study": courseOfStudy, 
    Name: name,
    "Job Title": role }) => {
    
    var fullImageUrl, thumbnailImageUrl;

    if (images) {
        fullImageUrl = images[0].url;
        thumbnailImageUrl = images[0].thumbnails.large.url;
    } else if  (images === undefined) {
        fullImageUrl = "AaqibAlvi.jpg";
        thumbnailImageUrl = "AaqibAlvi.jpg";
    }

    var mentor = { courseOfStudy, fullBio, fullImageUrl, name, organization, role, school, thumbnailImageUrl }

    mentors.push(mentor);
});

export { mentors, body };
