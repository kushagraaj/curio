'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

function YourTime() {
  const [now, setNow] = useState<{ time: string; zone: string } | null>(null)
  useEffect(() => {
    const tick = () => {
      const d = new Date()
      setNow({
        time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        zone: Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, ' '),
      })
    }
    tick()
    const id = setInterval(tick, 15000)
    return () => clearInterval(id)
  }, [])
  return (
    <>
      <div style={{ color: 'var(--l-muted)' }}>Your time</div>
      <div>
        <div className="l-lead tabular-nums">{now?.time ?? '--:--'}</div>
        <div className="l-small" style={{ color: 'var(--l-muted)' }}>
          {now?.zone ?? ' '}
        </div>
      </div>
    </>
  )
}

const tile = 'flex flex-col justify-between p-5'
const small = 'flex min-w-0 flex-col justify-between p-3 md:p-5'

export function TileFooter() {
  return (
    <footer className="grid grid-cols-3 gap-1.5 p-2 md:grid-cols-12 md:gap-2 md:p-3">
      <div className={`${tile} order-6 col-span-3 gap-6 md:order-1 md:col-span-4 md:min-h-[220px]`} style={{ background: 'var(--l-surface)' }}>
        <p className="l-lead">Small, strange and lovely things for the web, kept in one cabinet.</p>
        <p className="l-small" style={{ color: 'var(--l-muted)' }}>
          Open source. Made by Kushagra. Map tiles © Esri. Pictures via Wikimedia Commons: Musei Wormiani Historia (1655, public domain), Ritratto
          del Museo di Ferrante Imperato (1599, public domain), Acherontia atropos drawer, CMNH (CC0).
        </p>
      </div>
      <nav className={`${small} order-3 md:order-2 md:col-span-3 md:aspect-auto md:h-[220px]`} style={{ background: 'var(--l-step)' }} aria-label="Footer">
        <ul className="flex flex-col gap-0.5 text-[14px] md:gap-1.5 md:text-[length:var(--step-body)]">
          <li><Link className="hover:underline" href="/docs">Introduction</Link></li>
          <li><Link className="hover:underline" href="/docs/installation">Installation</Link></li>
          <li><Link className="hover:underline" href="/docs/theming">Theming</Link></li>
          <li><Link className="hover:underline" href="/docs/ai">Use with AI</Link></li>
          <li><a className="hover:underline" href="/llms.txt">llms.txt</a></li>
        </ul>
      </nav>
      <div className={`${small} order-5 aspect-square md:order-3 md:col-span-2 md:aspect-auto md:h-[220px]`} style={{ background: 'var(--l-surface)' }}>
        <YourTime />
      </div>
      <a href="https://github.com/kushagraaj/curio" className={`${small} group order-4 aspect-square md:order-4 md:col-span-3 md:aspect-auto md:h-[220px]`} style={{ background: 'var(--l-surface)' }}>
        <span style={{ color: 'var(--l-muted)' }}>Source</span>
        <span className="font-medium group-hover:underline md:hidden">GitHub</span>
        <span className="hidden break-words font-medium group-hover:underline md:inline">github.com/<wbr />kushagraaj/curio</span>
      </a>
      <div className={`${tile} order-1 col-span-3 h-[140px] items-center justify-center md:order-5 md:col-span-8 md:h-[320px]`} style={{ background: 'var(--l-ink)', color: 'var(--l-bg)' }}>
        <h2 className="text-[length:var(--step-display)] font-bold leading-none tracking-[-0.04em]">curio.</h2>
      </div>
      <a
        href="#catalogue"
        className={`${tile} group order-2 col-span-3 h-[120px] md:order-6 md:col-span-4 md:h-[320px]`}
        style={{ background: 'var(--l-accent)', color: 'var(--l-accent-ink)' }}
      >
        <span className="l-lead">Browse all 29</span>
        <svg viewBox="0 0 48 48" width="56" height="56" className="self-end transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true">
          <path d="M10 38 38 10M16 10h22v22" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" />
        </svg>
      </a>
    </footer>
  )
}
