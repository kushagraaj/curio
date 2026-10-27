// builds public/r/*.json (installable with the shadcn cli) and public/llms.txt
// usage: CURIO_URL=https://your-domain node scripts/build-registry.mjs

import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL
const origin = (process.env.CURIO_URL || (vercelHost && `https://${vercelHost}`) || 'https://curio-ui.vercel.app').replace(/\/$/, '')
const fill = (s) => s.replaceAll('{{origin}}', origin)

const registry = JSON.parse(fill(fs.readFileSync(path.join(root, 'registry.json'), 'utf8')))
const outDir = path.join(root, 'public', 'r')
fs.mkdirSync(outDir, { recursive: true })

for (const item of registry.items) {
  const files = item.files.map((file) => ({
    ...file,
    content: fs.readFileSync(path.join(root, file.path), 'utf8'),
  }))
  const out = { $schema: 'https://ui.shadcn.com/schema/registry-item.json', ...item, files }
  fs.writeFileSync(path.join(outDir, `${item.name}.json`), JSON.stringify(out, null, 2))
}
fs.writeFileSync(path.join(outDir, 'registry.json'), JSON.stringify(registry, null, 2))

// llms.txt: a plain index an ai agent can read to pick and install components
const byCategory = {}
for (const item of registry.items) {
  const cat = item.categories?.[0] ?? 'other'
  ;(byCategory[cat] ??= []).push(item)
}
const lines = [
  '# curio',
  '',
  '> Small, delightful React components for personal sites: music players, maps, theme sliders, project layouts and more. Built with React + Tailwind CSS v4, with a neutral default look themed through --curio-* CSS variables.',
  '',
  'Install any component with the shadcn CLI:',
  `npx shadcn@latest add ${origin}/r/<name>.json`,
  '',
  `After the first install, import the tokens once in your global CSS: @import "./curio.css";`,
  '',
]
for (const [cat, items] of Object.entries(byCategory)) {
  lines.push(`## ${cat[0].toUpperCase()}${cat.slice(1)}`, '')
  for (const it of items) lines.push(`- [${it.title}](${origin}/docs/${it.name}): ${it.description} Install: ${origin}/r/${it.name}.json`)
  lines.push('')
}
fs.writeFileSync(path.join(root, 'public', 'llms.txt'), lines.join('\n'))

console.log(`registry: ${registry.items.length} items -> public/r (origin ${origin})`)
