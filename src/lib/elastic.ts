// Shared Elasticsearch connection config + REST endpoint derivation.
// The API key is read-only and is already exposed to the client.

export const ELASTIC_CLOUD_ID =
  "advisorysg-mentorship:YXAtc291dGhlYXN0LTEuYXdzLmZvdW5kLmlvOjQ0MyQ2ZmEzOTc4MzA5YWE0ZjNjOTkyMDZlOWZkZjI0Y2MwYSRmYTMwNDgzZDk4Mjk0YjNkYjQ2M2QzMTNiZWM2ZmZlZA==";
export const ELASTIC_APIKEY =
  "SXR2d3RwZ0JTU3k1WVE3YzFFTzM6T2pCbEFlNFJyUXNHbTNUTkxCV3lyQQ=="; // exposed to client! should be read-only
export const ELASTIC_INDEX = "mentorship-page-current";

// Derive the Elasticsearch REST endpoint from the Cloud ID.
// Cloud ID format: "<name>:<base64>"; the base64 decodes to
// "<host:port>$<esNodeId>$<kibanaId>". Endpoint = https://<esNodeId>.<host:port>.
export function getElasticEndpoint(): string {
  const base64 = ELASTIC_CLOUD_ID.split(":")[1];
  const decoded = atob(base64);
  const [hostPort, esNodeId] = decoded.split("$");
  return `https://${esNodeId}.${hostPort}`;
}
