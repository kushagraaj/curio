'use client'

import { useState } from 'react'
import { DEMO_CITY, DEMO_THEMES, DEMO_TRACK, DEMO_TRACKS } from '@/lib/demo-data'
import { ThemeToggle } from '@/registry/curio/extras/theme-toggle'
import { MapSatellite } from '@/registry/curio/maps/map-satellite'
import { InlineTrack } from '@/registry/curio/music/inline-track'
import { RecordPlayer } from '@/registry/curio/music/record'
import { Waveform } from '@/registry/curio/music/waveform'
import { SwatchSlider } from '@/registry/curio/sliders/swatch-slider'

function ThemePanel() {
  const [dark, setDark] = useState(true)
  return (
    <div
      data-ui
      data-theme={dark ? 'dark' : 'light'}
      className="flex h-[200px] items-center gap-6 px-6 transition-colors"
      style={{ background: 'var(--curio-bg)', color: 'var(--curio-fg)' }}
    >
      <ThemeToggle dark={dark} onChange={setDark} reveal={false} />
      <RecordPlayer track={DEMO_TRACK} />
    </div>
  )
}

function TokenPanel() {
  const [i, setI] = useState(0)
  const t = DEMO_THEMES[i]
  const dark = i >= 3
  return (
    <div
      data-ui
      data-theme={dark ? 'dark' : 'light'}
      className="flex h-[170px] flex-col justify-center gap-5 px-6 transition-colors duration-300"
      style={{ '--curio-bg': t.swatch, '--curio-accent': t.accent, background: 'var(--curio-bg)', color: 'var(--curio-fg)' } as React.CSSProperties}
    >
      <SwatchSlider options={DEMO_THEMES} value={i} onChange={setI} label="Theme" />
      <InlineTrack track={DEMO_TRACKS[2]} />
    </div>
  )
}

type Proof = { title: string; body: string[]; panel: React.ReactNode }

const PROOFS: Proof[] = [
  {
    title: 'Light and dark, both ways',
    body: [
      'Every piece reads the dark class or data-theme on any parent, so it follows next-themes or your own toggle.',
      'Flip the switch: the record and its label follow.',
    ],
    panel: <ThemePanel />,
  },
  {
    title: 'Real maps, no API key',
    body: ['The maps draw Esri tiles, with the credit already in place.', 'Give one a latitude and longitude and it centres there, in light or dark.'],
    panel: (
      <div data-ui className="flex h-[340px] items-center justify-center overflow-hidden" style={{ background: 'var(--l-surface)' }}>
        <MapSatellite lat={DEMO_CITY.lat} lon={DEMO_CITY.lon} label={DEMO_CITY.label} href={DEMO_CITY.href} size={300} zoom={14} />
      </div>
    ),
  },
  {
    title: 'Eight tokens, one look',
    body: ['--curio-accent, --curio-bg and six more restyle every piece at once.', 'Pick a swatch to re-colour the track beneath it.'],
    panel: <TokenPanel />,
  },
  {
    title: 'Motion that knows when to stop',
    body: ['Every animation lives in one CSS file and switches off for visitors who ask for reduced motion.', 'The bars stop. The song title stays.'],
    panel: (
      <div data-ui className="flex h-[140px] items-center px-6" style={{ background: 'var(--curio-bg)', color: 'var(--curio-fg)' }}>
        <div className="w-full">
          <Waveform track={{ ...DEMO_TRACKS[1], isPlaying: true }} bars={48} />
        </div>
      </div>
    ),
  },
]

export function Proofs({ llms }: { llms: string }) {
  const all: Proof[] = [
    ...PROOFS,
    {
      title: 'Your agent can install it',
      body: ['Curio publishes llms.txt: every piece, what it does and its install URL.', 'Point Claude or Cursor at it and ask for a map of your city.'],
      panel: (
        <pre data-ui className="h-[200px] overflow-hidden whitespace-pre-wrap p-6 text-[13px] leading-[1.7]" style={{ background: '#0a0a0a', color: '#e4e4e7' }}>
          <code>{llms}</code>
        </pre>
      ),
    },
  ]
  return (
    <section className="l-wrap" aria-labelledby="proofs-title">
      <h2 id="proofs-title" data-reveal className="l-head mb-16">
        What comes in the box
      </h2>
      <div className="flex flex-col gap-16 md:gap-[104px]">
        {all.map((p) => (
          <div key={p.title} className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
            <div data-reveal className="min-w-0 overflow-hidden md:col-span-7" style={{ '--curio-bg': 'var(--l-surface)' } as React.CSSProperties}>
              {p.panel}
            </div>
            <div data-reveal className="md:col-span-5 md:pl-6" style={{ '--d': 1 } as React.CSSProperties}>
              <h3 className="l-lead">{p.title}</h3>
              {p.body.map((b) => (
                <p key={b} className="mt-3 max-w-[40ch]">
                  {b}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
