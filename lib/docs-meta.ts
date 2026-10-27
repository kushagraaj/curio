// usage snippets and props for each component page

export type PropDoc = { name: string; type: string; default?: string; description: string }
type Meta = { usage: string; props: PropDoc[]; notes?: string }

const track: PropDoc = { name: 'track', type: 'Track', description: 'Title, artist, album, art, url, isPlaying, playedAt.' }
const items: PropDoc = { name: 'items', type: 'Project[]', description: 'Name, description, url, year, tags?, image?, status?' }
const sliderProps: PropDoc[] = [
  { name: 'options', type: 'ThemeOption[]', description: 'Each step: label, swatch?, accent?' },
  { name: 'value', type: 'number', description: 'Index of the selected option.' },
  { name: 'onChange', type: '(index: number) => void', description: 'Called with the new index.' },
  { name: 'label', type: 'string', default: '"theme"', description: 'Accessible name.' },
]
const mapProps: PropDoc[] = [
  { name: 'lat / lon', type: 'number', description: 'The centre of the map.' },
  { name: 'label', type: 'string', description: 'Shown on the map, e.g. "Lisbon, PT".' },
  { name: 'href', type: 'string', description: 'Where clicking the map goes.' },
  { name: 'size', type: 'number', default: '260', description: 'Square size in px.' },
  { name: 'zoom', type: 'number', default: '12–13', description: 'Map zoom level.' },
]

const trackUsage = (comp: string, file: string, extra = '') => `import { ${comp} } from '@/components/curio/music/${file}'

const track = {
  title: 'Slow Tides',
  artist: 'The Quiet Hours',
  art: '/cover.jpg',
  url: 'https://open.spotify.com/...',
  isPlaying: true,
}

export function NowPlaying() {
  return <${comp} track={track}${extra} />
}`

const mapUsage = (comp: string, file: string, extra = '') => `import { ${comp} } from '@/components/curio/maps/${file}'

export function Where() {
  return <${comp} lat={38.7223} lon={-9.1393} label="Lisbon, PT"${extra} />
}`

const sliderUsage = (comp: string, file: string) => `'use client'

import { useState } from 'react'
import { ${comp} } from '@/components/curio/sliders/${file}'

const themes = [
  { label: 'Sunrise', swatch: '#fff4e6', accent: '#ea580c' },
  { label: 'Day', swatch: '#ffffff', accent: '#18181b' },
  { label: 'Midnight', swatch: '#09090b', accent: '#fafafa' },
]

export function ThemePicker() {
  const [value, setValue] = useState(0)
  return <${comp} options={themes} value={value} onChange={setValue} />
}`

const projectUsage = (comp: string, file: string) => `import { ${comp} } from '@/components/curio/projects/${file}'

const projects = [
  { name: 'lumen', description: 'A calm reading app.', url: 'https://...', year: '2026', tags: ['next.js'] },
  { name: 'pocketlog', description: 'A cli for daily logs.', url: 'https://...', year: '2025', tags: ['rust'] },
]

export function Work() {
  return <${comp} items={projects} />
}`

export const META: Record<string, Meta> = {
  'record-player': {
    usage: trackUsage('RecordPlayer', 'record'),
    props: [track, { name: 'size', type: 'number', default: '84', description: 'Disc diameter in px.' }, { name: 'alwaysSpin', type: 'boolean', default: 'true', description: 'Keep spinning when nothing is playing.' }],
    notes: 'The tonearm swings onto the record whenever track.isPlaying is true.',
  },
  'inline-track': { usage: trackUsage('InlineTrack', 'inline-track'), props: [track] },
  cassette: { usage: trackUsage('Cassette', 'cassette'), props: [track], notes: 'The reels only turn while track.isPlaying is true.' },
  'terminal-track': {
    usage: trackUsage('TerminalTrack', 'terminal-track', ' command="music --now"'),
    props: [track, { name: 'command', type: 'string', default: '"spotify --now"', description: 'The fake command shown on the first line.' }],
  },
  waveform: { usage: trackUsage('Waveform', 'waveform'), props: [track, { name: 'bars', type: 'number', default: '56', description: 'Number of bars.' }] },
  polaroid: { usage: trackUsage('Polaroid', 'polaroid'), props: [track, { name: 'caption', type: 'string', description: 'Text under the photo.' }] },

  'map-classic': { usage: mapUsage('MapClassic', 'map-classic'), props: mapProps },
  'map-mono': {
    usage: mapUsage('MapMono', 'map-mono', ' timeZone="Europe/Lisbon"'),
    props: [...mapProps, { name: 'timeZone', type: 'string', description: 'Iana time zone for the clock.' }],
  },
  'map-satellite': { usage: mapUsage('MapSatellite', 'map-satellite'), props: mapProps },
  'map-blueprint': { usage: mapUsage('MapBlueprint', 'map-blueprint'), props: mapProps },
  'map-zoom': {
    usage: mapUsage('MapZoom', 'map-zoom', ' regionLabel="Portugal"'),
    props: [...mapProps, { name: 'regionZoom', type: 'number', default: '4', description: 'Zoom before hovering.' }, { name: 'regionLabel', type: 'string', default: '"region"', description: 'Label before hovering.' }],
  },
  'map-radar': { usage: mapUsage('MapRadar', 'map-radar'), props: [...mapProps, { name: 'color', type: 'string', default: '"#5dff9e"', description: 'Scanner colour.' }] },

  'pill-slider': { usage: sliderUsage('PillSlider', 'pill-slider'), props: [...sliderProps, { name: 'width', type: 'number', default: '72', description: 'Track width in px.' }] },
  'sun-arc-slider': {
    usage: sliderUsage('SunArcSlider', 'sun-arc-slider'),
    props: [...sliderProps, { name: 'nightFrom', type: 'number', default: 'half', description: 'Index where the sun becomes a moon.' }],
  },
  'knob-slider': { usage: sliderUsage('KnobSlider', 'knob-slider'), props: sliderProps },
  'swatch-slider': { usage: sliderUsage('SwatchSlider', 'swatch-slider'), props: sliderProps, notes: 'Uses each option’s swatch and accent colours.' },
  'ruler-slider': {
    usage: sliderUsage('RulerSlider', 'ruler-slider'),
    props: [...sliderProps, { name: 'gap', type: 'number', default: '44', description: 'Px between options.' }, { name: 'width', type: 'number', default: '150', description: 'Visible width.' }],
  },
  'gradient-slider': { usage: sliderUsage('GradientSlider', 'gradient-slider'), props: [...sliderProps, { name: 'width', type: 'number', default: '120', description: 'Bar width in px.' }] },

  'project-timeline': { usage: projectUsage('ProjectTimeline', 'project-timeline'), props: [items] },
  'project-sentence': { usage: projectUsage('ProjectSentence', 'project-sentence'), props: [items, { name: 'lead', type: 'string', default: '"things i’ve built:"', description: 'Text before the list.' }] },
  'project-hover-preview': { usage: projectUsage('ProjectHoverPreview', 'project-hover-preview'), props: [items], notes: 'Shows item.image while hovering; without one it shows a lettered tile.' },
  'project-accordion': { usage: projectUsage('ProjectAccordion', 'project-accordion'), props: [items, { name: 'defaultOpen', type: 'number | null', default: '0', description: 'Which item starts open.' }] },
  'project-tiles': { usage: projectUsage('ProjectTiles', 'project-tiles'), props: [items, { name: 'columns', type: 'number', default: '2', description: 'Grid columns.' }] },
  'project-status-rows': { usage: projectUsage('ProjectStatusRows', 'project-status-rows'), props: [items], notes: 'Status: "live" shows a green dot.' },

  'hover-cards': {
    usage: `import { HoverCards } from '@/components/curio/extras/hover-cards'

export function Socials() {
  return (
    <HoverCards
      items={[
        { id: 'github', label: 'github', href: 'https://github.com/you', trigger: <GitHubIcon />, content: <div className="p-4">...</div> },
        { id: 'email', label: 'email', href: 'mailto:hi@you.dev', trigger: <MailIcon />, content: <div className="p-4">hi@you.dev</div> },
      ]}
    />
  )
}`,
    props: [{ name: 'items', type: 'HoverCardItem[]', description: 'Id, label, trigger, content, href?, onClick?' }],
    notes: 'Give each card a fixed width so the shared panel can measure it.',
  },
  'contribution-grid': {
    usage: `import { ContributionGrid } from '@/components/curio/extras/contribution-grid'

// weeks[w][d] is a level from 0 to 4 (or -1 for no day)
export function Activity({ weeks }: { weeks: number[][] }) {
  return <ContributionGrid weeks={weeks} total={612} title="@you" href="https://github.com/you" />
}`,
    props: [
      { name: 'weeks', type: 'number[][]', description: 'Levels 0–4 per day, grouped by week.' },
      { name: 'total', type: 'number', description: 'Shown top-right.' },
      { name: 'title', type: 'string', description: 'Shown top-left.' },
      { name: 'cell', type: 'number', default: '11', description: 'Cell size in px.' },
    ],
    notes: 'Tip: github-contributions-api.jogruber.de returns these levels for any username, no token needed.',
  },
  'pronounce-button': {
    usage: `import { PronounceButton } from '@/components/curio/extras/pronounce-button'

export function Name() {
  return (
    <h1 className="flex items-center gap-2">
      Ada Lovelace <PronounceButton src="/name.mp3" />
      {/* no recording? <PronounceButton text="Ada Lovelace" /> */}
    </h1>
  )
}`,
    props: [
      { name: 'src', type: 'string', description: 'Audio file url. Used when given.' },
      { name: 'text', type: 'string', description: 'Spoken with the browser’s voice when there’s no src.' },
      { name: 'lang', type: 'string', description: 'Voice language for text, e.g. "en-GB".' },
      { name: 'label', type: 'string', default: '"how to say my name"', description: 'Accessible name.' },
    ],
  },
  'theme-toggle': {
    usage: `'use client'

import { useState } from 'react'
import { ThemeToggle } from '@/components/curio/extras/theme-toggle'

export function Toggle() {
  const [dark, setDark] = useState(false)
  return (
    <ThemeToggle
      dark={dark}
      onChange={(next) => {
        setDark(next)
        document.documentElement.dataset.theme = next ? 'dark' : 'light'
      }}
    />
  )
}`,
    props: [
      { name: 'dark', type: 'boolean', description: 'Current state.' },
      { name: 'onChange', type: '(dark: boolean) => void', description: 'Apply the theme here.' },
      { name: 'reveal', type: 'boolean', default: 'true', description: 'Circle reveal via the view transitions api.' },
    ],
    notes: 'For the circle reveal, add ::view-transition-old(root), ::view-transition-new(root) { animation: none; } to your css.',
  },
  'live-clock': {
    usage: `import { LiveClock } from '@/components/curio/extras/live-clock'

export function Clock() {
  return <LiveClock timeZone="Europe/Lisbon" place="Lisbon" zoneLabel="WET" />
}`,
    props: [
      { name: 'timeZone', type: 'string', description: 'Iana time zone.' },
      { name: 'place', type: 'string', description: 'Shown before the time.' },
      { name: 'zoneLabel', type: 'string', description: 'Shown after the time.' },
      { name: 'seconds', type: 'boolean', default: 'true', description: 'Show seconds.' },
    ],
  },
}
