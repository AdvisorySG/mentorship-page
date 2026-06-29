import { ELASTIC_APIKEY, ELASTIC_INDEX, getElasticEndpoint } from "./elastic";
import { assignIndustryColors } from "./industryColors";
import type { DisplayResult } from "../components/ResultView";

// The raw `_source` fields the modal needs.
export interface MentorSource {
  name?: string;
  organisation?: string;
  role?: string;
  course_of_study?: string;
  full_bio?: string;
  school?: string;
  industries?: Array<string>;
  competencies?: Array<string>;
  thumbnail_image_url?: string;
  full_image_url?: string;
}

// Fetches a single mentor document by its Elasticsearch _id.
// Returns the _source, or null on 404 / network error.
export async function fetchMentorById(
  id: string,
): Promise<MentorSource | null> {
  try {
    const res = await fetch(
      `${getElasticEndpoint()}/${ELASTIC_INDEX}/_doc/${encodeURIComponent(id)}`,
      { headers: { Authorization: `ApiKey ${ELASTIC_APIKEY}` } },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?._source ?? null;
  } catch {
    return null;
  }
}

// Maps a raw _source (no search snippets/highlights) into the DisplayResult
// shape the modal renders.
export function displayResultFromSource(
  id: string,
  source: MentorSource,
): DisplayResult {
  const displayIndustries = Array.isArray(source.industries)
    ? source.industries
    : [];
  const displayCompetencies = Array.isArray(source.competencies)
    ? source.competencies
    : [];
  const fullBio = source.full_bio ?? null;

  return {
    id,
    displayName: source.name ?? null,
    displayIndustries,
    displayCompetencies,
    displayRole: source.role ?? null,
    displayOrganisation: source.organisation ?? null,
    displayCourseOfStudy: source.course_of_study ?? null,
    displayFullBio: fullBio,
    displayShortBio: fullBio,
    displaySchool: source.school ?? null,
    industryColors: assignIndustryColors(displayIndustries),
    thumbnailImageUrl: source.thumbnail_image_url ?? undefined,
  };
}
