var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'keyAOJiy5cPLwI9Oz' }).base('appDfSlmYKDyuAj51');
var mentors = [];
var i = 1;

base('ProNet Masterlist').select({

  sort: [{field: 'First Name', direction: 'asc'}]

}).eachPage((records, fetchNextPage) => {
    
  console.log(`Page ${i}: ${records.length} records`);
  i++;
  mentors = mentors.concat(records);
  fetchNextPage();

}, function done(err) {

  if (err) {
      console.error(err);
      return;
  }

  console.log(`Total records: ${mentors.length}`);

  var mentorsJson = JSON.stringify(mentors);
  console.log("----------------JSON START----------------");
  console.log(mentorsJson);
  console.log("----------------JSON END----------------");

});
