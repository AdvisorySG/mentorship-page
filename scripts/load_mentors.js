const Airtable = require("airtable");
const { Client } = require("@elastic/elasticsearch");
const AWS = require("aws-sdk");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const AIRTABLE_BASE = "appDfSlmYKDyuAj51";
const AWS_REGION = "ap-southeast-1";
const AWS_SECRET_AIRTABLE_NAME = "airtable_api_key";
const AWS_SECRET_ELASTIC_NAME = "elasticsearch_api_key";
const ELASTIC_CLOUD_ID =
  "advisorysg-mentorship:YXAtc291dGhlYXN0LTEuYXdzLmZvdW5kLmlvOjQ0MyQ2ZmEzOTc4MzA5YWE0ZjNjOTkyMDZlOWZkZjI0Y2MwYSRmYTMwNDgzZDk4Mjk0YjNkYjQ2M2QzMTNiZWM2ZmZlZA==";
const ELASTIC_CHUNK_SIZE = 200;
const ELASTIC_INDEX_PREFIX = "mentorship-page.";
const AWS_S3_BUCKET_NAME = "advisorysg-mentorship";
const AWS_S3_IMAGE_FOLDER = "images/";

const PLACEHOLDER_THUMBNAIL_URL = "/mentor-thumbnail.png";

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
      ].flat(),
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
  wave_id: String(waveId),
  last_modified_time: fields["Last Modified Time"],
});

const generateAWSBucketKey = (id, size) => ({
  Bucket: AWS_S3_BUCKET_NAME,
  Key: `${AWS_S3_IMAGE_FOLDER}${id}-${size}`,
});

const indexWave = async (waveId, tableId) => {
  console.log(`=== Wave ${waveId} (Table ${tableId}) ===`);

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
    cloud: { id: ELASTIC_CLOUD_ID },
    auth: { apiKey: elasticApiKey },
  });

  const s3 = new AWS.S3();

  const mentors = [];
  const elasticIndex = `${ELASTIC_INDEX_PREFIX}${waveId}`;

  await base(tableId)
    .select({ sort: [{ field: "First Name", direction: "asc" }] })
    .eachPage((records, fetchNextPage) => {
      mentors.push(
        ...records.map(({ id, fields }) => formatMentor(id, waveId, fields)),
      );
      fetchNextPage();
    });

  const mentorMap = new Map(mentors.map((mentor) => [mentor.id, mentor]));
  const deletedMentorIds = [];
  const unmodifiedMentorIds = new Set();

  console.log(`No. of Airtable mentors: ${mentorMap.size}`);

  let count = 0;
  const scrollSearch = await elasticClient.helpers.scrollDocuments({
    index: elasticIndex,
    query: { match_all: {} },
  });
  for await (const result of scrollSearch) {
    count += 1;
    const { id: mentorId } = result;
    if (
      mentorMap.get(mentorId) === undefined ||
      !mentorMap.get(mentorId).name
    ) {
      deletedMentorIds.push(mentorId);
    } else if (
      mentorMap.get(mentorId).last_modified_time === result.last_modified_time
    ) {
      unmodifiedMentorIds.add(mentorId);
    }
  }

  const indexMentors = [...mentorMap.entries()].filter(
    ([mentorId, mentor]) => !unmodifiedMentorIds.has(mentorId) && mentor.name,
  );

  console.log(`No. of Elasticsearch mentors: ${count}`);
  console.log(`No. of deleted mentors: ${deletedMentorIds.length}`);
  console.log(`No. of index mentors: ${indexMentors.length}`);

  if (deletedMentorIds.length > 0) {
    console.log("Deleting old mentors...");
    [...deletedMentorIds].forEach((mentorId) => {
      ["full", "thumbnail"].map((imageSize) => {
        s3.deleteObject(
          generateAWSBucketKey(mentorId, imageSize),
          function (err, data) {},
        );
      });
    });
    const deleteBody = [...deletedMentorIds].map((mentorId) => ({
      delete: { _index: elasticIndex, _id: mentorId },
    }));
    await elasticClient.bulk({ refresh: true, body: deleteBody });
  }

  let i = 0;
  for (const mentorsChunk of chunks(indexMentors, ELASTIC_CHUNK_SIZE)) {
    i += 1;
    console.log(`Indexing mentors (chunk ${i})...`);
    const indexBody = (
      await Promise.all(
        mentorsChunk.map(async ([id, mentor]) => {
          const newMentorObject = { ...mentor };
          await Promise.all(
            [
              [mentor.full_image_url, "full", "full_image_url"],
              [mentor.thumbnail_image_url, "thumbnail", "thumbnail_image_url"],
            ].map(async ([imageURL, imageSize, objectProperty]) => {
              if (imageURL === PLACEHOLDER_THUMBNAIL_URL) {
                s3.deleteObject(
                  generateAWSBucketKey(id, imageSize),
                  function (err, data) {},
                );
                return [{ index: { _index: elasticIndex, _id: id } }, mentor];
              }
              const res = await fetch(imageURL);
              const contentType = res.headers.get("Content-Type");
              const blob = await res.buffer();

              const uploadedImage = await s3
                .upload({
                  ...generateAWSBucketKey(id, imageSize),
                  ContentType: contentType,
                  Body: blob,
                })
                .promise();
              newMentorObject[objectProperty] = uploadedImage.Location;
            }),
          );
          console.log(newMentorObject);
          return [
            { index: { _index: elasticIndex, _id: id } },
            newMentorObject,
          ];
        }),
      )
    ).flat();
    await elasticClient.bulk({ refresh: true, body: indexBody });
  }
};

/*
 * An index template has been created for `mentorship-page.*` on ElasticSearch.
 * To index a wave, first manually create indexes named with the waveId, e.g.
 * `mentorship-page.2025`.
 * Then pass the list of waves in this form:
 * {
 *   "waves": [
 *     {"waveId": "2025", "tableId": "2025 Mentorship"}
 *   ]
 * }
 * A list of historical waves is available in the test events on AWS Lambda.
 */
exports.handler = async (event) => {
  await Promise.all(
    event.waves.map(({ waveId, tableId }) => indexWave(waveId, tableId)),
  );
};
