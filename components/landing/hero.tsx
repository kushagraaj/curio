'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ThemeToggle } from '@/registry/curio/extras/theme-toggle'
import { KnobSlider } from '@/registry/curio/sliders/knob-slider'
import { PillSlider } from '@/registry/curio/sliders/pill-slider'
import { RulerSlider } from '@/registry/curio/sliders/ruler-slider'
import { SwatchSlider } from '@/registry/curio/sliders/swatch-slider'
import { useSiteDark } from './use-site-dark'

const WEIGHTS = [300, 400, 500, 700, 900].map((w) => ({ label: String(w), w }))
const SPACING = [
  { label: 'Tight', em: -0.05 },
  { label: 'Snug', em: -0.03 },
  { label: 'Even', em: 0 },
  { label: 'Airy', em: 0.03 },
]

const TEXT = [
  { label: 'Small', px: 16 },
  { label: 'Body', px: 19 },
  { label: 'Large', px: 23 },
]
const ACCENTS = [
  { label: 'Crimson', swatch: '#b11226', accent: '#b11226' },
  { label: 'Ember', swatch: '#c2410c', accent: '#c2410c' },
  { label: 'Forest', swatch: '#166534', accent: '#166534' },
  { label: 'Cobalt', swatch: '#1d4ed8', accent: '#1d4ed8' },
]

// curio's own controls, tuned to sit on the page's dark or light ground
const chipVars = {
  '--curio-chip': 'color-mix(in srgb, var(--l-ink) 14%, transparent)',
  '--curio-fg': 'var(--l-ink)',
  '--curio-muted': 'var(--l-muted)',
  '--curio-accent': 'var(--l-accent)',
  '--curio-on-accent': 'var(--l-accent-ink)',
  '--curio-bg': 'var(--l-step)',
  background: 'var(--l-step)',
  color: 'var(--l-ink)',
} as React.CSSProperties

function Chip({ label, readout, tilt, className = '', children }: { label: string; readout: string; tilt: number; className?: string; children: React.ReactNode }) {
  return (
    <div
      data-ui
      className={`flex h-[64px] w-[min(100%,300px)] items-center justify-between gap-4 rounded-xl px-4 md:h-[80px] md:rotate-[var(--tilt)] md:px-5 ${className}`}
      style={{ ...chipVars, '--tilt': `${tilt}deg` } as React.CSSProperties}
    >
      <div className="leading-tight">
        <div className="text-[13px]" style={{ color: 'var(--l-muted)' }}>
          {label}
        </div>
        <div className="text-[15px] font-medium tabular-nums">{readout}</div>
      </div>
      {children}
    </div>
  )
}

export function Hero() {
  const [weight, setWeight] = useState(3)
  const [spacing, setSpacing] = useState(1)
  const [dark, setDark] = useSiteDark()
  const [text, setText] = useState(1)
  const [accent, setAccent] = useState(0)

  // the accent swatch re-colours the whole landing page, not just the hero
  useEffect(() => {
    const el = document.querySelector<HTMLElement>('.landing')
    el?.style.setProperty('--l-accent', ACCENTS[accent].swatch)
  }, [accent])

  const chips = {
    weight: (
      <Chip label="Headline weight" readout={WEIGHTS[weight].label} tilt={-3}>
        <PillSlider options={WEIGHTS} value={weight} onChange={setWeight} width={120} label="Headline weight" />
      </Chip>
    ),
    spacing: (
      <Chip label="Letter spacing" readout={`${SPACING[spacing].em}em`} tilt={2.5}>
        <RulerSlider options={SPACING} value={spacing} onChange={setSpacing} width={130} gap={38} label="Letter spacing" />
      </Chip>
    ),
    text: (
      <Chip label="Description size" readout={`${TEXT[text].px}px`} tilt={3}>
        <KnobSlider options={TEXT} value={text} onChange={setText} label="Description size" />
      </Chip>
    ),
    accent: (
      <Chip label="Accent" readout={ACCENTS[accent].swatch} tilt={-2.5}>
        <SwatchSlider options={ACCENTS} value={accent} onChange={setAccent} label="Accent colour" />
      </Chip>
    ),
    theme: (
      <Chip label="Page theme" readout={dark ? 'Dark' : 'Light'} tilt={-2}>
        <ThemeToggle dark={dark} onChange={setDark} />
      </Chip>
    ),
  }

  return (
    <header className="l-wrap relative flex min-h-[100svh] flex-col pb-16">
      <nav className="flex items-center justify-between gap-6 py-6" aria-label="Main">
        <Link href="/" className="l-lead font-semibold tracking-[-0.02em]">
          curio.
        </Link>
        <div className="flex items-center gap-5 sm:gap-7">
          <a href="#catalogue" className="hidden sm:inline">
            Catalogue
          </a>
          <Link href="/docs">Docs</Link>
          <a href="/llms.txt" className="hidden sm:inline">
            llms.txt
          </a>
          <a
            href="https://github.com/kushagraaj/curio"
            aria-label="Curio on GitHub"
            className="inline-flex h-11 w-11 items-center justify-center transition-transform active:scale-[0.94]"
            style={{ background: 'var(--l-ink)', color: 'var(--l-bg)' }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>
          </a>
        </div>
      </nav>

      <div className="relative flex flex-1 flex-col items-center justify-center pt-10 text-center md:pt-0">
        {/* desktop: the controls sit around the headline, tilted */}
        <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="false">
          <div className="pointer-events-auto absolute left-[5%] top-[2%]">{chips.weight}</div>
          <div className="pointer-events-auto absolute right-[5%] top-[5%]">{chips.spacing}</div>
          <div className="pointer-events-auto absolute left-[3%] top-[57%]">{chips.text}</div>
          <div className="pointer-events-auto absolute bottom-[3%] left-[14%]">{chips.accent}</div>
          <div className="pointer-events-auto absolute bottom-[4%] right-[4%]">{chips.theme}</div>
        </div>

        <div className="mb-8 flex w-full justify-center md:hidden">{chips.weight}</div>

        <h1
          className="lines mx-auto max-w-full uppercase leading-[0.95] transition-[font-weight,letter-spacing] duration-300"
          style={{ fontSize: 'var(--step-display)', fontWeight: WEIGHTS[weight].w, letterSpacing: `${SPACING[spacing].em}em` }}
        >
          <span className="line">
            <span data-line style={{ '--i': 0 } as React.CSSProperties}>
              Small delights
            </span>
          </span>
          <span className="line">
            <span data-line style={{ '--i': 1 } as React.CSSProperties}>
              for your site
            </span>
          </span>
        </h1>

        <div data-after-lines className="mt-8 flex flex-col items-center md:mt-[72px]">
          <p className="max-w-[44ch] transition-[font-size] duration-300" style={{ fontSize: TEXT[text].px }}>
            Curio is a cabinet of 29 React components for personal sites: spinning records, real maps, theme sliders and project layouts, each
            copied into your project with one command.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
            <Link href="/docs/installation" className="l-btn">
              Install your first piece
            </Link>
            <a href="#catalogue" className="l-link">
              Browse all 29
            </a>
          </div>
        </div>

        <div className="mt-10 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center md:hidden">
          {chips.spacing}
          {chips.accent}
          {chips.theme}
        </div>
      </div>
    </header>
  )
}
