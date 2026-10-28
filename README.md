# curio

a cabinet of small, delightful react components for personal sites: music players, maps, theme sliders, project layouts and a few extras.

components aren't imported from a package. each one is copied into your project with the shadcn cli, so the code is yours.

```bash
npx shadcn@latest add https://curio-components.vercel.app/r/record-player.json
```

then add `@import "./curio.css";` to your global css once.

## this repo

```
registry/curio/     the components (what gets copied into people's projects)
registry.json       the catalogue: names, descriptions, files
scripts/            builds public/r/*.json and public/llms.txt from the catalogue
app/                the showcase + docs site
lib/docs-meta.ts    usage snippets and props shown on each docs page
components/previews.tsx   live demos used on the site
```

```bash
npm install
npm run dev        # site on localhost:3200
npm run build      # builds the registry, then the site
```

set `CURIO_URL` (registry links) and `NEXT_PUBLIC_CURIO_URL` (install commands on the site) to the deployed domain; on Vercel both fall back to the project's production domain automatically.

## adding a component

1. write it in `registry/curio/<category>/`, using the `--curio-*` tokens for colour
2. add an entry to `registry.json`
3. add a demo in `components/previews.tsx` and usage/props in `lib/docs-meta.ts`
4. `npm run registry`
