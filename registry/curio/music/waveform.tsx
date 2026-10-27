'use client'

import { useState } from 'react'
import { trackStatus, type Track } from '../lib/types'

// bar heights are derived from the title so the same song always has the same shape
function bars(seedText: string, count: number) {
  let seed = 0
  for (const c of seedText) seed = (seed * 31 + c.charCodeAt(0)) >>> 0
  return Array.from({ length: count }, (_, i) => {
    seed = (seed * 1103515245 + 12345) >>> 0
    const envelope = Math.sin((i / (count - 1)) * Math.PI) * 0.6 + 0.4
    return Math.round((0.18 + ((seed % 1000) / 1000) * 0.82 * envelope) * 1000) / 10
  })
}

export function Waveform({ track: t, bars: count = 56 }: { track: Track; bars?: number }) {
  const [hover, setHover] = useState(false)
  const heights = bars(t.title + t.artist, count)
  return (
    <a
      href={t.url}
      target="_blank"
      rel="noopener noreferrer"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className="block border-y py-3"
      style={{ borderColor: 'var(--curio-border)' }}
    >
      <div className="flex items-center gap-3">
        {t.art ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={t.art} alt="" width={40} height={40} className="h-10 w-10 shrink-0 object-cover" />
        ) : (
          <span className="h-10 w-10 shrink-0" style={{ background: 'var(--curio-chip)' }} />
        )}
        <div className="min-w-0 flex-1">
          <div className="truncate text-[15px] transition-colors" style={{ color: hover ? 'var(--curio-accent)' : 'var(--curio-fg)' }}>
            {t.title}
          </div>
          <div className="truncate text-[13px]" style={{ color: 'var(--curio-muted)' }}>
            {t.artist}
          </div>
        </div>
        <span className="shrink-0 text-xs" style={{ color: 'var(--curio-muted)' }}>
          <span suppressHydrationWarning>{trackStatus(t)}</span>
        </span>
      </div>
      <div className="mt-3 flex h-[34px] items-center gap-[3px]">
        {heights.map((h, i) => (
          <span
            key={i}
            className="curio-wave-bar flex-1 transition-colors duration-300"
            style={{
              height: `${h}%`,
              background: hover ? 'var(--curio-accent)' : 'color-mix(in srgb, var(--curio-fg) 18%, transparent)',
              animationDelay: `${(i % 9) * -0.13}s`,
              animationPlayState: t.isPlaying || hover ? 'running' : 'paused',
            }}
          />
        ))}
      </div>
    </a>
  )
}
