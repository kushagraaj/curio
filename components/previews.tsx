'use client'

import { useState } from 'react'
import { DEMO_CITY, DEMO_PROJECTS, DEMO_THEMES, DEMO_TRACK, DEMO_TRACKS, DEMO_WEEKS } from '@/lib/demo-data'
import { ContributionGrid } from '@/registry/curio/extras/contribution-grid'
import { HoverCards } from '@/registry/curio/extras/hover-cards'
import { LiveClock } from '@/registry/curio/extras/live-clock'
import { PronounceButton } from '@/registry/curio/extras/pronounce-button'
import { ThemeToggle } from '@/registry/curio/extras/theme-toggle'
import { MapBlueprint } from '@/registry/curio/maps/map-blueprint'
import { MapClassic } from '@/registry/curio/maps/map-classic'
import { MapMono } from '@/registry/curio/maps/map-mono'
import { MapRadar } from '@/registry/curio/maps/map-radar'
import { MapSatellite } from '@/registry/curio/maps/map-satellite'
import { MapZoom } from '@/registry/curio/maps/map-zoom'
import { Cassette } from '@/registry/curio/music/cassette'
import { InlineTrack } from '@/registry/curio/music/inline-track'
import { Polaroid } from '@/registry/curio/music/polaroid'
import { RecordPlayer } from '@/registry/curio/music/record'
import { TerminalTrack } from '@/registry/curio/music/terminal-track'
import { Waveform } from '@/registry/curio/music/waveform'
import { ProjectAccordion } from '@/registry/curio/projects/project-accordion'
import { ProjectHoverPreview } from '@/registry/curio/projects/project-hover-preview'
import { ProjectSentence } from '@/registry/curio/projects/project-sentence'
import { ProjectStatusRows } from '@/registry/curio/projects/project-status-rows'
import { ProjectTiles } from '@/registry/curio/projects/project-tiles'
import { ProjectTimeline } from '@/registry/curio/projects/project-timeline'
import { GradientSlider } from '@/registry/curio/sliders/gradient-slider'
import { KnobSlider } from '@/registry/curio/sliders/knob-slider'
import { PillSlider } from '@/registry/curio/sliders/pill-slider'
import { RulerSlider } from '@/registry/curio/sliders/ruler-slider'
import { SunArcSlider } from '@/registry/curio/sliders/sun-arc-slider'
import { SwatchSlider } from '@/registry/curio/sliders/swatch-slider'
import type { SliderProps } from '@/registry/curio/lib/slider'

function Slider({ Component }: { Component: (p: SliderProps) => React.ReactNode }) {
  const [value, setValue] = useState(1)
  return <Component options={DEMO_THEMES} value={value} onChange={setValue} />
}

function Toggle() {
  const [dark, setDark] = useState(false)
  return (
    <div className="flex items-center gap-3">
      <ThemeToggle dark={dark} onChange={setDark} reveal={false} />
      <span className="font-mono text-[11px]" style={{ color: 'var(--curio-muted)' }}>
        {dark ? 'Dark' : 'Light'}
      </span>
    </div>
  )
}

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
    <path d={d} />
  </svg>
)
const GH =
  'M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z'
const LI =
  'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z'

function Cards() {
  return (
    <HoverCards
      items={[
        {
          id: 'github',
          label: 'github',
          href: 'https://github.com',
          trigger: icon(GH),
          content: <ContributionGrid weeks={DEMO_WEEKS} total={612} title="@adalovelace" />,
        },
        {
          id: 'linkedin',
          label: 'linkedin',
          href: 'https://linkedin.com',
          trigger: icon(LI),
          content: (
            <div className="w-[240px] p-3.5">
              <div className="text-[13px] font-medium">Ada Lovelace</div>
              <div className="font-mono text-[11px]" style={{ color: 'var(--curio-muted)' }}>
                in/adalovelace
              </div>
              <p className="mt-2 text-[13px] leading-snug">Engineer · writing about analytical engines.</p>
            </div>
          ),
        },
      ]}
    />
  )
}

export const PREVIEWS: Record<string, () => React.ReactNode> = {
  'record-player': () => <RecordPlayer track={DEMO_TRACK} />,
  'inline-track': () => <InlineTrack track={DEMO_TRACKS[1]} />,
  cassette: () => <Cassette track={DEMO_TRACKS[2]} />,
  'terminal-track': () => <TerminalTrack track={DEMO_TRACK} />,
  waveform: () => <Waveform track={DEMO_TRACKS[1]} />,
  polaroid: () => <Polaroid track={DEMO_TRACKS[2]} />,

  'map-classic': () => <MapClassic lat={DEMO_CITY.lat} lon={DEMO_CITY.lon} label={DEMO_CITY.label} href={DEMO_CITY.href} size={220} />,
  'map-mono': () => <MapMono lat={DEMO_CITY.lat} lon={DEMO_CITY.lon} label={DEMO_CITY.label} href={DEMO_CITY.href} size={220} timeZone={DEMO_CITY.timeZone} />,
  'map-satellite': () => <MapSatellite lat={DEMO_CITY.lat} lon={DEMO_CITY.lon} label={DEMO_CITY.label} href={DEMO_CITY.href} size={220} />,
  'map-blueprint': () => <MapBlueprint lat={DEMO_CITY.lat} lon={DEMO_CITY.lon} label={DEMO_CITY.label} href={DEMO_CITY.href} size={220} />,
  'map-zoom': () => <MapZoom lat={DEMO_CITY.lat} lon={DEMO_CITY.lon} label={DEMO_CITY.label} href={DEMO_CITY.href} size={220} regionLabel={DEMO_CITY.region} />,
  'map-radar': () => <MapRadar lat={DEMO_CITY.lat} lon={DEMO_CITY.lon} label={DEMO_CITY.label} href={DEMO_CITY.href} size={220} />,

  'pill-slider': () => <Slider Component={PillSlider} />,
  'sun-arc-slider': () => <Slider Component={SunArcSlider} />,
  'knob-slider': () => <Slider Component={KnobSlider} />,
  'swatch-slider': () => <Slider Component={SwatchSlider} />,
  'ruler-slider': () => <Slider Component={RulerSlider} />,
  'gradient-slider': () => <Slider Component={GradientSlider} />,

  'project-timeline': () => <ProjectTimeline items={DEMO_PROJECTS.slice(0, 3)} />,
  'project-sentence': () => <ProjectSentence items={DEMO_PROJECTS} />,
  'project-hover-preview': () => <ProjectHoverPreview items={DEMO_PROJECTS} />,
  'project-accordion': () => <ProjectAccordion items={DEMO_PROJECTS.slice(0, 3)} />,
  'project-tiles': () => <ProjectTiles items={DEMO_PROJECTS} />,
  'project-status-rows': () => <ProjectStatusRows items={DEMO_PROJECTS} />,

  'hover-cards': () => <Cards />,
  'contribution-grid': () => <ContributionGrid weeks={DEMO_WEEKS} total={612} title="@adalovelace" />,
  'pronounce-button': () => (
    <div className="flex items-center gap-2 text-[22px] font-medium tracking-[-0.02em]">
      Ada Lovelace <PronounceButton text="Ada Lovelace" lang="en-GB" />
    </div>
  ),
  'theme-toggle': () => <Toggle />,
  'live-clock': () => <LiveClock timeZone={DEMO_CITY.timeZone} place="Lisbon" zoneLabel="WET" />,
}

// components that should fill the preview width instead of sitting centred at their natural size
export const WIDE = new Set([
  'terminal-track',
  'waveform',
  'project-timeline',
  'project-sentence',
  'project-hover-preview',
  'project-accordion',
  'project-tiles',
  'project-status-rows',
])

export function Preview({ name }: { name: string }) {
  const P = PREVIEWS[name]
  if (!P) return null
  if (WIDE.has(name)) return <div className="w-full"><P /></div>
  return (
    <div className="flex justify-center">
      <div className="max-w-full">
        <P />
      </div>
    </div>
  )
}
