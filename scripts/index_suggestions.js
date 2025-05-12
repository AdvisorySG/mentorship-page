const { Client } = require("@elastic/elasticsearch");
const { pipeline } = require("@huggingface/transformers");
const AWS = require("aws-sdk");
const fs = require("node:fs");

const AWS_REGION = "ap-southeast-1";
const AWS_SECRET_ELASTIC_NAME = "elasticsearch_index_suggestions-api-key";
const ELASTIC_CLOUD_ID =
  "My_deployment:YXAtc291dGhlYXN0LTEuYXdzLmZvdW5kLmlvJGZmM2E4NzcwZmM2YzRiYTZiMDcwZmZiNzQzM2ExMDk0JDgwZDc3ZGY2NGQxODQwMjNiNDkxOWQ0YWEwNWVjZjRm";
const ELASTIC_INDEX = "query-suggestions";

const PIPELINE_TASK = "feature-extraction";
const PIPELINE_MODEL = "Xenova/paraphrase-MiniLM-L3-v2";
const PIPELINE_CONFIG = { dtype: "q8" };

exports.handler = async (event) => {
  async function* generator() {
    const suggestions = fs
      .readFileSync("./suggestions.txt", {
        encoding: "utf8",
        flag: "r",
      })
      .split(/\n/)
      .map((suggestion) => suggestion.trim())
      .filter((suggestion) => suggestion !== "");
    console.log(suggestions);

    const embedder = await pipeline(
      PIPELINE_TASK,
      PIPELINE_MODEL,
      PIPELINE_CONFIG,
    );
    for (const suggestion of suggestions) {
      const output = await embedder(suggestion, {
        pooling: "mean",
        normalize: true,
      });
      const embedding = output.ort_tensor.cpuData;
      yield {
        suggestion: suggestion,
        embedding: embedding,
      };
    }
  }

  const awsClient = new AWS.SecretsManager({ region: AWS_REGION });

  const elasticApiKey = await awsClient
    .getSecretValue({ SecretId: AWS_SECRET_ELASTIC_NAME })
    .promise()
    .then((data) => JSON.parse(data.SecretString)["APIKey"]);
  const elasticClient = new Client({
    cloud: { id: ELASTIC_CLOUD_ID },
    auth: { apiKey: elasticApiKey },
  });

  await elasticClient.bulk({
    datasource: generator(),
    onDocument(doc) {
      return {
        index: { _index: ELASTIC_INDEX },
      };
    },
    refreshOnCompletion: true,
  });
};
