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

const querySearch = (query) => {
  if (query.field) {
    const queryResults = idx.query(function () {
      // TODO: Idk why this doesn't work, but I think it's worth
      // implementing a very basic filter here instead of trying to wrestle
      // with Lunr.js
      // query.field refers to the field of mentor (e.g. "name")
      // query.value is the exact value of that field (e.g. "John Cena")
      // so it's sufficient to just filter through mentors for any matching
      // fields e.g. mentors.filter((mentor) =>
      // mentor[query.field] == query.value).map((mentor) => mentor.id)
      // but ofc rmb to use the `index` added above in `mentor`
      console.log(query.term);
      console.log(new lunr.Token(query.term));
      console.log(idx.pipeline.run(new lunr.Token(query.term)));
      this.term(query.term, {
        fields: [query.field],
        presence: lunr.Query.presence.REQUIRED,
        usePipeline: true,
        wildcard: lunr.Query.wildcard.NONE,
      });
    });
    console.log(queryResults);
    return queryResults.map((result) => result.ref);
  } else {
    // free search to be implemented
    return mentors.forEach((mentor, index) => index);
  }
};

export { querySearch };
