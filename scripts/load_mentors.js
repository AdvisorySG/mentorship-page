const Airtable = require("airtable");
const { Client } = require("@elastic/elasticsearch");
const AWS = require("aws-sdk");

const AWS_REGION = "ap-southeast-1";
const AWS_SECRET_AIRTABLE_NAME = "airtable_api_key";
const AWS_SECRET_ELASTIC_NAME = "elasticsearch_api_key";
const ELASTIC_ENDPOINT =
  "https://advisorysg.es.ap-southeast-1.aws.found.io:9243";

const PLACEHOLDER_THUMBNAIL_URL = "/mentor-thumbnail.png";
const WAVE_INFO = [
  { tableId: "4 Tech", name: "2021 Wave 1" },
  { tableId: "5 Tech", name: "2021 Wave 2" },
];

const formatMentor = (id, waveId, fields) => ({
  id,
  course_of_study: fields["Course of Study"],
  full_bio: fields.Biography,
  full_image_url:
    Array.isArray(fields.Photo) && fields.Photo.length > 0
      ? fields.Photo[0].url
      : PLACEHOLDER_THUMBNAIL_URL,
  industries: [
    fields["Industry 1"] ?? [],
    fields["Industry 2"] ?? [],
    fields["Industry 3"] ?? [],
  ].flat(),
  name: fields.Name,
  organisation: fields.Organisation,
  role: fields["Job Title"],
  school: fields.School,
  thumbnail_image_url:
    Array.isArray(fields.Photo) &&
    fields.Photo.length > 0 &&
    fields.Photo[0].thumbnails
      ? fields.Photo[0].thumbnails.large.url
      : PLACEHOLDER_THUMBNAIL_URL,
  wave_id: waveId,
  wave_name: WAVE_INFO[waveId].name,
});

exports.handler = async (event) => {
  const mentors = [];

  const client = new AWS.SecretsManager({ region: AWS_REGION });
  const apiKey = await client
    .getSecretValue({ SecretId: AWS_SECRET_NAME })
    .promise()
    .then((data) => JSON.parse(data.SecretString)["APIKey"]);
  const base = new Airtable({ apiKey }).base("appDfSlmYKDyuAj51");

  const elasticApiKey = await client
    .getSecretValue({ SecretId: AWS_SECRET_ELASTIC_NAME })
    .promise()
    .then((data) => JSON.parse(data.SecretString)["APIKey"]);
  const elasticClient = new Client({
    node: ELASTIC_ENDPOINT,
    auth: {
      apiKey: elasticApiKey,
    },
  });

  await Promise.all(
    WAVE_INFO.map(async ({ tableId }, i) =>
      base(tableId)
        .select({ sort: [{ field: "First Name", direction: "asc" }] })
        .eachPage((records, fetchNextPage) => {
          mentors.push(
            ...records.map(({ id, fields }) => formatMentor(id, i, fields))
          );
          fetchNextPage();
        })
    )
  );

  elasticClient.deleteByQuery({
    index: ".ent-search-engine-documents-mentorship-page",
    type: "",
    body: {
      query: {
        match_all: {},
      },
    },
  });

  const body = mentors.flatMap((mentor) => [
    { index: { _index: ".ent-search-engine-documents-mentorship-page" } },
    mentor,
  ]);
  elasticClient.bulk({ refresh: true, body });
};
