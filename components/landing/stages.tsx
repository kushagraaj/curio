'use client'

import { useState } from 'react'
import { DEMO_TRACK } from '@/lib/demo-data'
import { RecordPlayer } from '@/registry/curio/music/record'

const STAGES = [
  { name: 'Command', clause: ['First, run', 'one command'] },
  { name: 'Files', clause: ['Files land', 'in your app'] },
  { name: 'Tokens', clause: ['Then import', 'the tokens'] },
  { name: 'Restyle', clause: ['Last, make', 'it yours'] },
]

const panel = 'w-[min(440px,100%)] rounded-[10px] p-5 text-[13px] leading-[1.7]'

function Fragment({ stage, url, files }: { stage: number; url: string; files: string[] }) {
  if (stage === 0)
    return (
      <pre data-ui className={`${panel} overflow-x-auto whitespace-pre-wrap break-all`} style={{ background: '#0a0a0a', color: '#e4e4e7' }}>
        <code>
          <span style={{ color: '#a1a1aa' }}>$ </span>npx shadcn@latest add {url}/r/record-player.json{'\n'}
          <span style={{ color: '#4ade80' }}>Checking registry.</span>{'\n'}
          <span style={{ color: '#4ade80' }}>Created {files.length} files:</span>{'\n'}
          {files.map((f) => `  - ${f}\n`)}
        </code>
      </pre>
    )
  if (stage === 1)
    return (
      <div data-ui className={panel} style={{ background: '#ffffff', color: '#09090b' }}>
        <div className="font-medium">my-site</div>
        <ul className="mt-1">
          {[
            ['app/', 0, false],
            ['curio.css', 1, true],
            ['globals.css', 1, false],
            ['page.tsx', 1, false],
            ['components/curio/', 0, false],
            ['lib/types.ts', 1, true],
            ['music/record.tsx', 1, true],
          ].map(([name, depth, isNew]) => (
            <li key={name as string} className="flex justify-between" style={{ paddingLeft: (depth as number) * 18 }}>
              <span>{name as string}</span>
              {isNew ? <span style={{ color: '#b11226' }}>new</span> : null}
            </li>
          ))}
        </ul>
      </div>
    )
  if (stage === 2)
    return (
      <pre data-ui className={panel} style={{ background: '#ffffff', color: '#09090b' }}>
        <code>
          <span style={{ color: '#71717a' }}>/* app/globals.css */</span>
          {'\n'}@import "tailwindcss";{'\n'}
          <span style={{ background: '#fde8eb', color: '#b11226' }}>@import "./curio.css";</span>
        </code>
      </pre>
    )
  return (
    <div data-ui className={`${panel} flex flex-col gap-5`} style={{ background: '#fff7ed', color: '#431407' }}>
      <pre className="text-[13px]">
        <code>
          {':root {\n  --curio-bg: #fff7ed;\n  --curio-accent: #c2410c;\n}'}
        </code>
      </pre>
      <div
        style={
          {
            '--curio-bg': '#fff7ed',
            '--curio-fg': '#431407',
            '--curio-muted': '#9a3412',
            '--curio-accent': '#c2410c',
            '--curio-chip': '#ffedd5',
            '--curio-surface': '#ffffff',
            '--curio-border': '#fed7aa',
          } as React.CSSProperties
        }
      >
        <RecordPlayer track={DEMO_TRACK} />
      </div>
    </div>
  )
}

export function Stages({ url, files }: { url: string; files: string[] }) {
  const [stage, setStage] = useState(0)
  const s = STAGES[stage]
  const pct = (stage / (STAGES.length - 1)) * 100

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2" aria-labelledby="stages-title">
      <div className="order-3 flex flex-col p-[var(--gutter)] pb-10 pt-10 lg:order-1 lg:min-h-[72svh] lg:pt-[var(--gutter)]" style={{ background: 'var(--l-surface)' }}>
        <h2 id="stages-title" key={stage} className="l-head l-xfade" aria-live="polite">
          {s.clause[0]}
          <br />
          {s.clause[1]}
        </h2>
        <p className="mt-6 max-w-[38ch]">Installing a piece takes about a minute. Drag the slider to walk through it.</p>
      </div>
      <div className="order-1 flex min-h-[46svh] items-center justify-center overflow-hidden p-[var(--gutter)] lg:order-2 lg:min-h-[72svh]" style={{ background: 'var(--l-stage)' }}>
        <div key={stage} className="l-xfade flex w-full justify-center">
          <Fragment stage={stage} url={url} files={files} />
        </div>
      </div>

      {/* one slider across both fields */}
      <div className="order-2 px-[var(--gutter)] py-7 lg:order-3 lg:col-span-2 lg:py-9" style={{ background: 'var(--l-surface)' }}>
        <div className="relative h-8">
          <input
            type="range"
            min={0}
            max={STAGES.length - 1}
            step={1}
            value={stage}
            onChange={(e) => setStage(Number(e.target.value))}
            aria-label="Install stage"
            aria-valuetext={s.name}
            className="l-range"
          />
          <div className="l-thumb-row pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2">
            <div className="h-2 w-full" style={{ background: 'color-mix(in srgb, var(--l-muted) 45%, transparent)' }} />
            <div className="absolute left-0 top-0 h-2 transition-[width] duration-200" style={{ width: `${pct}%`, background: 'var(--l-ink)' }} />
            <div
              className="l-thumb absolute top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-200 md:h-8 md:w-8"
              style={{ left: `${pct}%`, background: 'var(--l-accent)' }}
            />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-4">
          {STAGES.map((st, i) => (
            <button
              key={st.name}
              type="button"
              onClick={() => setStage(i)}
              className={`transition-colors ${i === 0 ? 'text-left' : i === STAGES.length - 1 ? 'text-right' : 'text-center'}`}
              style={{ color: i === stage ? 'var(--l-ink)' : 'var(--l-muted)' }}
            >
              {st.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
