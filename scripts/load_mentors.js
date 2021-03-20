const Airtable = require("airtable");
const AWS = require("aws-sdk"),
  region = "ap-southeast-1",
  secretName = "airtable_api_key";

exports.handler = async (event) => {
  const mentors = [];

  const client = new AWS.SecretsManager({ region: region });
  const apiKey = await client
    .getSecretValue({ SecretId: secretName })
    .promise()
    .then((data) => JSON.parse(data.SecretString)["APIKey"]);
  const base = new Airtable({ apiKey }).base("appDfSlmYKDyuAj51");

  await base("4 Tech")
    .select({ sort: [{ field: "First Name", direction: "asc" }] })
    .eachPage((records, fetchNextPage) => {
      mentors.push(...records.map((record) => record.fields));
      fetchNextPage();
    });

  return {
    statusCode: 200,
    body: mentors,
  };
};
