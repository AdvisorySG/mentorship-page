import lunr from "lunr";

import { mentors } from "./mentors.json";

const idx = lunr(function () {
  this.ref("id");
  [
    "name",
    "role",
    "organization",
    "school",
    "courseOfStudy",
    "fullBio",
  ].map((field) => this.field(field));
  mentors.forEach((mentor, index) =>
    this.add({
      // By enclosing values in an array, Lunr.js assumes they are already
      // tokenised. This allows us to do field-specific search.
      id: index,
      name: [mentor.name],
      role: [mentor.role],
      organization: [mentor.organization],
      school: [mentor.school],
      courseOfStudy: [mentor.courseOfStudy],
      fullBio: mentor.fullBio,
    })
  );
});

const fieldSearch = ({ field, value }) => {
  // TODO: Idk why this doesn't work, but I think it's worth
  // implementing a very basic filter here instead of trying to wrestle
  // with Lunr.js
  //
  // field refers to the field of mentor (e.g. "name")
  // value is the exact value of that field (e.g. "John Cena")
  // so it's sufficient to just filter through mentors for any matching
  // fields e.g. mentors.filter((mentor) =>
  // mentor[field] === value).map((mentor) => mentor.id)
  //
  // but ofc rmb to use the `index` added above in `mentor`
  const queryResults = idx.query(function () {
    this.term(value, {
      fields: [field],
      presence: lunr.Query.presence.REQUIRED,
      usePipeline: true,
      wildcard: lunr.Query.wildcard.NONE,
    });
  });
  console.log(queryResults);
  return queryResults.map((result) => result.ref);
};

export { fieldSearch };
