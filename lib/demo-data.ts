import type { Project, ThemeOption, Track } from '@/registry/curio/lib/types'

export const DEMO_TRACK: Track = {
  title: 'Slow Tides',
  artist: 'The Quiet Hours',
  album: 'Low Season',
  art: '/demo/cover-1.svg',
  url: '#',
  isPlaying: true,
}

export const DEMO_TRACKS: Track[] = [
  DEMO_TRACK,
  { title: 'Night Drive', artist: 'Neon Static', album: 'After Hours', art: '/demo/cover-2.svg', url: '#', isPlaying: false, playedAt: Date.now() - 1000 * 60 * 42 },
  { title: 'Paper Planes', artist: 'Fold & Fly', album: 'Origami', art: '/demo/cover-3.svg', url: '#', isPlaying: true },
]

export const DEMO_CITY = {
  lat: 38.7223,
  lon: -9.1393,
  label: 'Lisbon, PT',
  href: 'https://en.wikipedia.org/wiki/Lisbon',
  timeZone: 'Europe/Lisbon',
  region: 'Portugal',
}

export const DEMO_THEMES: ThemeOption[] = [
  { label: 'Sunrise', swatch: '#fff4e6', accent: '#ea580c' },
  { label: 'Day', swatch: '#ffffff', accent: '#18181b' },
  { label: 'Overcast', swatch: '#e4e4e7', accent: '#52525b' },
  { label: 'Dusk', swatch: '#2e1065', accent: '#c4b5fd' },
  { label: 'Midnight', swatch: '#09090b', accent: '#fafafa' },
]

export const DEMO_PROJECTS: Project[] = [
  { name: 'Lumen', description: 'A reading app that turns long articles into calm, paginated chapters.', url: '#', year: '2026', tags: ['Next.js', 'Postgres'], status: 'live' },
  { name: 'Tidepool', description: 'A realtime collaborative whiteboard built on CRDTs and websockets.', url: '#', year: '2026', tags: ['React', 'Yjs'], status: 'live' },
  { name: 'Pocketlog', description: 'A CLI that logs what you worked on, in ten seconds a day.', url: '#', year: '2025', tags: ['Rust', 'CLI'], status: 'archived' },
  { name: 'Harbor', description: 'A tiny self-hosted status page for side projects.', url: '#', year: '2024', tags: ['Go', 'SQLite'], status: 'archived' },
]

// deterministic fake activity so the grid looks the same on every render
export const DEMO_WEEKS: number[][] = Array.from({ length: 20 }, (_, w) =>
  Array.from({ length: 7 }, (_, d) => {
    const r = Math.abs((Math.sin(w * 12.9898 + d * 78.233) * 43758.5453) % 1)
    return r < 0.45 ? 0 : r < 0.65 ? 1 : r < 0.82 ? 2 : r < 0.93 ? 3 : 4
  }),
)
