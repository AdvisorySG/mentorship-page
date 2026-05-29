# AdvisorySG Mentorship Page

Next.js 16 (App Router, static export) + React 19 + TypeScript + Tailwind 3.4 + MUI v7.

## Conventions

- Tailwind for styling; `preflight` is disabled (no CSS reset)
- Use `@iconify/react` `<Icon>` for icons
- No global state manager — local state only
- Components in `src/components/`, pages in `src/app/`
- TypeScript build errors are currently ignored (`ignoreBuildErrors: true` in next.config — FIXME for launch)

## Development

- Both pi and the app run inside the devcontainer — work entirely within it
- The dev server starts automatically at container launch (`npm run dev` via `postAttachCommand`)
- To run pi, open another terminal in the same container: `pi`
- Production build (static export): `npm run build`
- Lint runs as part of build via `eslint-config-next`
- Two Elasticsearch clusters: mentors search + query suggestions

## Architecture

### Data pipeline

Mentor data originates in Airtable. A Node.js Lambda (`scripts/load_mentors.js`) pulls records from Airtable, uploads profile images to S3, and indexes them into Elasticsearch (`mentorship-page.{waveId}`). Only modified records are re-indexed; deleted Airtable records are removed from ES and S3.

### Wave-based indexing

Each mentorship cohort is a "wave" (e.g., `2025`). Each wave has its own Elasticsearch index. The Lambda expects a JSON event specifying wave → Airtable table ID mappings. An ES index template handles shared index settings across all `mentorship-page.*` indices.

### Query suggestions (AI-powered)

Suggestions are built offline by a Python script (`scripts/build_query_suggestions/main.py`) that:

1. Reads a curated list of suggestion terms with synonym mappings (`suggestions.txt`)
2. Indexes synonym rules into an Elasticsearch synonym set
3. Generates embeddings for each term using `Xenova/paraphrase-MiniLM-L6-v2` (ONNX runtime)
4. Indexes only terms that match current-wave mentors into the `query-suggestions` index

At runtime, a web worker (`src/components/pipeline_worker.js`) runs the **same model** client-side via Transformers.js to embed the user's query. The embedding is sent to the suggestions ES index via KNN to retrieve the top 8 semantically related terms. The feature is **disabled by default** (commented out in the mentors page) and requires user opt-in via a toggle.

### Deployment

- **Web**: Static export to `out/` via `next build`
- **Lambda**: GitHub Actions workflow (`deploy-lambda.yml`) bundles only `load_mentors.js` + its dependencies (airtable, aws-sdk, @elastic/elasticsearch), deploys on push to `main`
- **CI**: Prettier format check runs on all pushes/PRs
