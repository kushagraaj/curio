'use client'

import { useState } from 'react'
import { DEMO_CITY, DEMO_THEMES, DEMO_TRACK } from '@/lib/demo-data'
import { MapClassic } from '@/registry/curio/maps/map-classic'
import { RecordPlayer } from '@/registry/curio/music/record'
import { SunArcSlider } from '@/registry/curio/sliders/sun-arc-slider'

// three live pieces on a shelf; the slider re-themes just this shelf
export function HeroShelf() {
  const [step, setStep] = useState(1)
  const t = DEMO_THEMES[step]
  const dark = step >= 3
  const vars = {
    '--curio-bg': t.swatch,
    '--curio-surface': dark ? '#18181b' : '#ffffff',
    '--curio-chip': dark ? '#27272a' : '#f4f4f5',
    '--curio-fg': dark ? '#fafafa' : '#09090b',
    '--curio-muted': dark ? '#a1a1aa' : '#71717a',
    '--curio-border': dark ? '#3f3f46' : '#e4e4e7',
    '--curio-accent': t.accent,
    '--curio-on-accent': dark ? '#09090b' : '#fafafa',
  } as React.CSSProperties

  return (
    <div
      data-theme={dark ? 'dark' : 'light'}
      className="relative overflow-hidden rounded-3xl border p-5 transition-colors duration-500 sm:p-8"
      style={{ ...vars, background: 'var(--curio-bg)', borderColor: 'var(--curio-border)', color: 'var(--curio-fg)' }}
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <MapClassic lat={DEMO_CITY.lat} lon={DEMO_CITY.lon} label={DEMO_CITY.label} size={200} />
        <div className="flex flex-1 flex-col items-start gap-8 md:items-center">
          <RecordPlayer track={DEMO_TRACK} />
          <SunArcSlider options={DEMO_THEMES} value={step} onChange={setStep} />
        </div>
      </div>
      <div className="mt-6 border-t pt-3 font-mono text-[10px] uppercase tracking-[0.08em]" style={{ borderColor: 'var(--curio-border)', color: 'var(--curio-muted)' }}>
        Drag the sun across the sky · it re-themes this shelf
      </div>
    </div>
  )
}
