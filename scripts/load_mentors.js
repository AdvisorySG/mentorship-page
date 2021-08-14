const Airtable = require("airtable");
const AWS = require("aws-sdk"),
  region = "ap-southeast-1",
  secretName = "airtable_api_key";

exports.handler = async (event) => {
  const waves = [];
  const waveTables = ["4 Tech", "5 Tech"];

  const client = new AWS.SecretsManager({ region: region });
  const apiKey = await client
    .getSecretValue({ SecretId: secretName })
    .promise()
    .then((data) => JSON.parse(data.SecretString)["APIKey"]);
  const base = new Airtable({ apiKey }).base("appDfSlmYKDyuAj51");

  waveTables.forEach(
    (table, i) =>
      await base(table)
        .select({ sort: [{ field: "First Name", direction: "asc" }] })
        .eachPage((records, fetchNextPage) => {
          waves[i].push(
            ...records.map(({ id, fields }) => ({ id, ...fields }))
          );
          fetchNextPage();
        })
  );

  return JSON.stringify({ waves });
};
