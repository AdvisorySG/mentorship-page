exports.handler = async (event) => {
  const waveTables = ["4 Tech", "5 Tech"];
  const waves = Array.from(waveTables, () => []);

  const client = new AWS.SecretsManager({ region: region });
  const apiKey = await client
    .getSecretValue({ SecretId: secretName })
    .promise()
    .then((data) => JSON.parse(data.SecretString)["APIKey"]);
  const base = new Airtable({ apiKey }).base("appDfSlmYKDyuAj51");

  await Promise.all(
    waveTables.map(async (table, i) =>
      base(table)
        .select({ sort: [{ field: "First Name", direction: "asc" }] })
        .eachPage((records, fetchNextPage) => {
          waves[i].push(
            ...records.map(({ id, fields }) => ({ id, ...fields }))
          );
          fetchNextPage();
        })
    )
  );

  return JSON.stringify({ waves });
};
