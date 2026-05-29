# AdvisorySG Mentorship Page

Next.js 16 (App Router, static export) + React 19 + TypeScript + Tailwind 3.4 + MUI v7.

## Conventions

- Tailwind for styling; `preflight` is disabled (no CSS reset)
- Use `@iconify/react` `<Icon>` for icons
- No global state manager — local state only
- Components in `src/components/`, pages in `src/app/`

## Development

- Both pi and the app run inside the devcontainer — work entirely within it
- The dev server starts automatically at container launch (`npm run dev` via `postAttachCommand`)
- To run pi, open another terminal in the same container: `pi`
- Production build (static export): `npm run build`
- Lint runs as part of build via `eslint-config-next`
- Two Elasticsearch clusters: mentors search + query suggestions
