# AdvisorySG Mentorship Page

Next.js 16 (App Router, static export) + React 19 + TypeScript + Tailwind 3.4 + MUI v7.

## Conventions

- Tailwind for styling; `preflight` is disabled (no CSS reset)
- Use `@iconify/react` `<Icon>` for icons
- No global state manager — local state only
- Components in `src/components/`, pages in `src/app/`
- TypeScript build errors are currently ignored (`ignoreBuildErrors: true` in next.config — FIXME for launch)

## Styling

- **Multi-layer approach**: Four systems coexist — Tailwind utilities, MUI `sx` prop, per-component global CSS files (not CSS Modules), and CSS custom properties defined in `App.css` that serve as the theme layer
- Brand color (`#f49200`) and other design tokens are `:root` CSS custom properties consumed across all stylesheets and inline styles

## Component Architecture

- **Canvas shell**: All pages wrap content in `<Canvas>`, which composes Header + children + Footer. No layout inheritance — pure component composition.
- **Code-splitting cascade**: `ResultView` lazy-loads `ResultViewGrid`, which lazy-loads `ResultViewList`. Creates a three-level bundle split: cards load first, modal detail loads on click.
- **Modal routing hack**: `ResultViewGrid` uses `window.history.pushState()` on modal open and `window.history.back()` on close, enabling browser back-button support for modals on the static site.

## Development

- The app runs inside the devcontainer — work entirely within it
- Dev server launches automatically on attach via `postAttachCommand` (`npm run dev`)
- Production build (static export): `npm run build`
- Lint runs as part of build via `eslint-config-next`
- One Elasticsearch index for mentors search

## Architecture

### Data pipeline

Mentor data originates in Airtable. A Node.js Lambda (`scripts/load_mentors.js`) pulls records from Airtable, uploads profile images to S3, and indexes them into Elasticsearch (`mentorship-page.{waveId}`). Only modified records are re-indexed; deleted Airtable records are removed from ES and S3.

### Wave-based indexing

Each mentorship cohort is a "wave" (e.g., `2025`). Each wave has its own Elasticsearch index. The Lambda expects a JSON event specifying wave → Airtable table ID mappings. An ES index template handles shared index settings across all `mentorship-page.*` indices.

### Search Architecture

- **SearchProvider + withSearch HOC**: Elasticsearch Search UI's `<SearchProvider>` is the only shared state mechanism beyond local `useState`. Components access it via `withSearch()` (used by `ResetButton`).
- **CustomSortFacetView**: Reusable facet sorting pattern — selected items first, then by count descending, then alphabetical fallback.

### Client-side Elasticsearch

A read-only ES API key is embedded in source in `mentors/page.tsx` for mentor search. This is a deliberate trade-off for static export with no backend proxy.

### Deployment

- **Web**: Static export to `out/` via `next build`
- **Lambda**: GitHub Actions workflow (`deploy-lambda.yml`) bundles only `load_mentors.js` + its dependencies (airtable, aws-sdk, @elastic/elasticsearch), deploys on push to `main`. Uses exact versions extracted from `package-lock.json`.
- **CI**: Prettier format check runs on all pushes/PRs. Husky pre-commit hook runs `npx pretty-quick --staged`.
- **Dependabot**: Monitors npm, GitHub Actions, and devcontainers; weekly schedule with grouped PRs.

## Routing

- Navigation links in the drawer use plain `<a href>` tags, causing full page reloads. Only the landing page's "Apply" button uses Next.js `<Link>` for a client-side transition.
- The search result modal simulates route state via `window.history.pushState()` / `window.history.back()` rather than actual URL-based routing, enabling browser back-button support.

## Analytics

- **Umami (self-hosted)**: Analytics calls are independently guarded with `if (window.umami)` in each component — no abstraction or wrapper. `process.env.NODE_ENV` is passed as metadata.
- **Tracked events**: `Impression` (mentor card scrolls into view via `react-intersection-observer`) and `Click` (mentor card clicked).
