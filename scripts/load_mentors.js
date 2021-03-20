var Airtable = require("airtable");
var AWS = require("aws-sdk"),
  region = "ap-southeast-1",
  secretName = "airtable_api_key",
  secret,
  decodedBinarySecret;
var client = new AWS.SecretsManager({ region: region });

exports.handler = (event, context, callback) => {
  var mentors = [];

  client.getSecretValue({ SecretId: secretName }, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    var apiKey = data.SecretString["APIKey"];
    var base = new Airtable({ apiKey }).base("appDfSlmYKDyuAj51");

    base("ProNet Masterlist")
      .select({
        sort: [{ field: "First Name", direction: "asc" }],
      })
      .eachPage(
        (records, fetchNextPage) => {
          mentors = mentors.concat(records);
          fetchNextPage();
        },
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  });

  return JSON.stringify(mentors);
};
