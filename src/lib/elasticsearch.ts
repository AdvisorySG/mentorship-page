/**
 * Shared Elasticsearch configuration.
 *
 * All values are sourced from NEXT_PUBLIC_* environment variables and are
 * safely inlined at build time (this app uses static export).
 */

export const MENTORS_ELASTIC_CLOUD_ID =
  process.env.NEXT_PUBLIC_MENTORS_ELASTIC_CLOUD_ID ?? "";

export const MENTORS_ELASTIC_APIKEY =
  process.env.NEXT_PUBLIC_MENTORS_ELASTIC_APIKEY ?? "";

export const MENTORS_ELASTIC_INDEX =
  process.env.NEXT_PUBLIC_MENTORS_ELASTIC_INDEX ?? "";

export const QUERY_SUGGESTIONS_ELASTIC_ENDPOINT =
  process.env.NEXT_PUBLIC_QUERY_SUGGESTIONS_ELASTIC_ENDPOINT ?? "";

export const QUERY_SUGGESTIONS_ELASTIC_APIKEY =
  process.env.NEXT_PUBLIC_QUERY_SUGGESTIONS_ELASTIC_APIKEY ?? "";

export const QUERY_SUGGESTIONS_ELASTIC_INDEX =
  process.env.NEXT_PUBLIC_QUERY_SUGGESTIONS_ELASTIC_INDEX ?? "";
