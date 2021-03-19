export const loadData = async () => {
  
  var Airtable = require('airtable');
  var base = new Airtable({ apiKey: 'keyAOJiy5cPLwI9Oz' }).base('appREFfUG2Z5A1bDz');
  var mentors = [];

  base('Furniture').select({
    // Selecting the first 3 records in All furniture:
    view: "All furniture"
  }).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function (record) {
      console.log('Retrieved', record.get('Name'));
    });

    mentors.concat(records);

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

  }, function done(err) {
    if (err) { console.error(err); return; }
  });

  var mentorsJson = JSON.stringify(mentors);
  console.log(mentorsJson);
};