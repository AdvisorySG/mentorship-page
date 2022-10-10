const Airtable = require("airtable");
const { Client } = require("@elastic/elasticsearch");
const AWS = require("aws-sdk");

const AIRTABLE_BASE = "appDfSlmYKDyuAj51";
const AWS_REGION = "ap-southeast-1";
const AWS_SECRET_AIRTABLE_NAME = "airtable_api_key";
const AWS_SECRET_ELASTIC_NAME = "elasticsearch_api_key";
const ELASTIC_ENDPOINT =
  "https://advisorysg.es.ap-southeast-1.aws.found.io:9243";
const ELASTIC_INDEX = ".ent-search-engine-documents-mentorship-page";
const ELASTIC_CHUNK_SIZE = 200;

const PLACEHOLDER_THUMBNAIL_URL = "/mentor-thumbnail.png";

const WAVES_INFO = new Map([
  [0, { tableId: "4 Tech", waveName: "2021 Wave 1" }],
  [1, { tableId: "5 Tech", waveName: "2021 Wave 2" }],
  [2, { tableId: "2022 Mentorship [Complete]", waveName: "2022 Wave" }],
  [
    3,
    {
      tableId: "Institution-Specific Mentorship",
      waveName: "Institution-Specific Wave",
    },
  ],
]);

function* chunks(arr, n) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

const formatMentor = (id, waveId, fields) => ({
  id,
  course_of_study: fields["Course of Study"],
  full_bio: fields.Biography,
  full_image_url:
    Array.isArray(fields.Photo) && fields.Photo.length > 0
      ? fields.Photo[0].url
      : PLACEHOLDER_THUMBNAIL_URL,
  industries: [
    ...new Set(
      [
        fields["Industry 1"] ?? [],
        fields["Industry 2"] ?? [],
        fields["Industry 3"] ?? [],
      ].flat()
    ),
  ],
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
  wave_name: WAVES_INFO.get(waveId).waveName,
  last_modified_time: fields["Last Modified Time"],
});

exports.handler = async (event) => {
  const mentors = [];

  const awsClient = new AWS.SecretsManager({ region: AWS_REGION });
  const airtableApiKey = await awsClient
    .getSecretValue({ SecretId: AWS_SECRET_AIRTABLE_NAME })
    .promise()
    .then((data) => JSON.parse(data.SecretString)["APIKey"]);

  const base = new Airtable({ apiKey: airtableApiKey }).base(AIRTABLE_BASE);

  const elasticApiKey = await awsClient
    .getSecretValue({ SecretId: AWS_SECRET_ELASTIC_NAME })
    .promise()
    .then((data) => JSON.parse(data.SecretString)["APIKey"]);
  const elasticClient = new Client({
    node: ELASTIC_ENDPOINT,
    auth: { apiKey: elasticApiKey },
  });

  await Promise.all(
    [...WAVES_INFO.entries()].map(async ([waveId, { tableId }]) =>
      base(tableId)
        .select({ sort: [{ field: "First Name", direction: "asc" }] })
        .eachPage((records, fetchNextPage) => {
          mentors.push(
            ...records.map(({ id, fields }) => formatMentor(id, waveId, fields))
          );
          fetchNextPage();
        })
    )
  );

  const mentorMap = new Map(mentors.map((mentor) => [mentor.id, mentor]));
  const deletedMentorIds = [];
  const modifiedMentorIds = [];
  const unmodifiedMentorIds = new Set();

  console.log(`No. of Airtable mentors: ${mentorMap.size}`);

  let count = 0;
  const scrollSearch = await elasticClient.helpers.scrollDocuments({
    index: ELASTIC_INDEX,
    query: { match_all: {} },
  });
  for await (const result of scrollSearch) {
    count += 1;
    const { id: mentorId } = result;
    if (mentorMap.get(mentorId) === undefined) {
      deletedMentorIds.push(mentorId);
    } else if (
      mentorMap.get(mentorId).last_modified_time !== result.last_modified_time
    ) {
      modifiedMentorIds.push(mentorId);
    } else {
      unmodifiedMentorIds.add(mentorId);
    }
  }

  const indexMentors = [...mentorMap.entries()].filter(
    ([mentorId, mentor]) => !unmodifiedMentorIds.has(mentorId) && mentor.name
  );

  console.log(`No. of Elasticsearch mentors: ${count}`);
  console.log(`No. of deleted mentors: ${deletedMentorIds.length}`);
  console.log(`No. of modified mentors: ${modifiedMentorIds.length}`);
  console.log(`No. of index mentors: ${indexMentors.length}`);

  if (deletedMentorIds.length > 0) {
    console.log("Deleting old mentors...");
    const deleteBody = [...deletedMentorIds].map((mentorId) => ({
      delete: { _index: ELASTIC_INDEX, _id: mentorId },
    }));
    await elasticClient.bulk({ refresh: true, body: deleteBody });
  }

  let i = 0;
  for (const mentorsChunk of chunks(indexMentors, ELASTIC_CHUNK_SIZE)) {
    i += 1;
    console.log(`Indexing mentors (chunk ${i})...`);
    const indexBody = mentorsChunk.flatMap(([id, mentor]) => [
      { index: { _index: ELASTIC_INDEX, _id: id } },
      mentor,
    ]);
    await elasticClient.bulk({ refresh: true, body: indexBody });
  }
};
