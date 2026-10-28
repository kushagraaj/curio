'use client'

import { useState } from 'react'
import { byCategory, CATEGORIES } from '@/lib/catalog'
import { Preview } from '@/components/previews'

// the drawer index: pick a drawer, its pieces lie on the stage as one live sheet
export function Drawers() {
  const [open, setOpen] = useState<string>('music')
  const items = byCategory(open)

  return (
    <section id="drawers" className="l-wrap grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6" aria-labelledby="drawers-title">
      <div className="min-w-0 md:col-span-5 md:pt-6">
        <h2 id="drawers-title" data-reveal className="l-lead" style={{ color: 'var(--l-muted)' }}>
          Open a drawer
        </h2>
        <div role="tablist" aria-label="Drawers" className="l-noscroll -mx-[var(--gutter)] mt-5 flex snap-x scroll-px-[var(--gutter)] gap-6 overflow-x-auto px-[var(--gutter)] md:mx-0 md:mt-8 md:flex-col md:gap-1 md:overflow-visible md:px-0">
          {CATEGORIES.map((c, i) => {
            const on = c.id === open
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={on}
                data-reveal
                style={{ '--d': i + 1, color: on ? 'var(--l-ink)' : 'color-mix(in srgb, var(--l-ink) 38%, transparent)' } as React.CSSProperties}
                onClick={() => setOpen(c.id)}
                className="shrink-0 snap-start whitespace-nowrap text-left text-[22px] font-medium leading-[1.1] tracking-[-0.02em] transition-colors hover:!text-[var(--l-ink)] md:text-[length:var(--step-head)] md:font-bold md:uppercase md:tracking-[-0.03em]"
              >
                {c.title}
                <span className="ml-2 align-top text-[13px] font-normal normal-case tracking-normal md:text-[length:var(--step-small)]">{byCategory(c.id).length}</span>
              </button>
            )
          })}
        </div>
        <p data-reveal className="mt-8 max-w-[36ch]" style={{ '--d': 6 } as React.CSSProperties}>
          {CATEGORIES.find((c) => c.id === open)?.blurb} Everything on the sheet is the real component, running.
        </p>
      </div>

      <div
        className="relative overflow-hidden p-4 md:col-span-7 md:h-[88svh] md:p-0"
        style={{ background: 'var(--l-surface)' }}
      >
        <div
          key={open}
          data-ui
          className="l-xfade relative w-full rounded-[10px] p-5 md:absolute md:left-16 md:top-[72px] md:w-[calc(100%-128px)] md:max-w-[560px] md:p-8 2xl:max-w-[1000px]"
          style={{ background: 'var(--curio-bg)', color: 'var(--curio-fg)' }}
        >
          <div className="flex items-baseline justify-between text-[13px]" style={{ color: 'var(--curio-muted)' }}>
            <span>{CATEGORIES.find((c) => c.id === open)?.title}</span>
            <span>{items.length} pieces</span>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-10 2xl:grid-cols-2 2xl:gap-x-12">
            {items.map((item) => (
              <div key={item.name}>
                <div className="mb-3 text-[13px] font-medium">{item.title}</div>
                <Preview name={item.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
