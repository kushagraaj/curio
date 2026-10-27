'use client'

import { useEffect, useState } from 'react'
import { Preview } from './previews'

// live preview with its own light/dark switch, independent of the site theme
export function PreviewFrame({ name }: { name: string }) {
  const [mode, setMode] = useState<'light' | 'dark' | null>(null)
  useEffect(() => setMode(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'), [])
  const m = mode ?? 'light'

  return (
    <div className="not-prose overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--site-border)' }}>
      <div className="flex items-center justify-between border-b px-3 py-2" style={{ borderColor: 'var(--site-border)', background: 'var(--site-surface)' }}>
        <span className="font-mono text-[10px] uppercase tracking-[0.08em]" style={{ color: 'var(--site-muted)' }}>
          Preview
        </span>
        <div className="flex gap-1 rounded-md p-0.5" style={{ background: 'var(--site-chip)' }}>
          {(['light', 'dark'] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setMode(v)}
              className="cursor-pointer rounded px-2 py-0.5 font-mono text-[10px] transition-colors"
              style={{ background: m === v ? 'var(--site-surface)' : 'transparent', color: m === v ? 'var(--site-fg)' : 'var(--site-muted)' }}
            >
              {v === 'light' ? 'Light' : 'Dark'}
            </button>
          ))}
        </div>
      </div>
      <div
        data-theme={m}
        className="flex min-h-[320px] items-center justify-center px-6 py-12 transition-colors duration-300"
        style={{ background: 'var(--curio-bg)', color: 'var(--curio-fg)' }}
      >
        <div className="w-full max-w-[560px]">
          <Preview name={name} />
        </div>
      </div>
    </div>
  )
}
