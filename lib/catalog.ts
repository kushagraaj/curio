import registry from '@/registry.json'

export type CatalogItem = {
  name: string
  title: string
  description: string
  category: string
  files: { path: string; target: string }[]
  number: number
}

export const CATEGORIES = [
  { id: 'music', title: 'Music', blurb: 'What you’re listening to, six ways.' },
  { id: 'maps', title: 'Maps', blurb: 'Where you are, on real map tiles.' },
  { id: 'sliders', title: 'Theme sliders', blurb: 'Pick between themes, or any set of steps.' },
  { id: 'projects', title: 'Projects', blurb: 'Ways to lay out the things you’ve made.' },
  { id: 'extras', title: 'Extras', blurb: 'Small touches that make a page yours.' },
] as const

export const ITEMS: CatalogItem[] = registry.items
  .filter((i) => i.name !== 'curio-base')
  .map((i, n) => ({
    name: i.name,
    title: i.title,
    description: i.description,
    category: i.categories[0],
    files: i.files.map((f) => ({ path: f.path, target: f.target })),
    number: n + 1,
  }))

export const byCategory = (id: string) => ITEMS.filter((i) => i.category === id)
export const findItem = (name: string) => ITEMS.find((i) => i.name === name)

const vercelHost = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
export const SITE_URL = (process.env.NEXT_PUBLIC_CURIO_URL || (vercelHost && `https://${vercelHost}`) || 'https://curio-components.vercel.app').replace(/\/$/, '')
export const installCommand = (name: string) => `npx shadcn@latest add ${SITE_URL}/r/${name}.json`
export const pad = (n: number) => String(n).padStart(2, '0')
