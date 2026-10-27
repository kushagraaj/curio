'use client'

import { useEffect, useState } from 'react'

// ticking clock for a place, e.g. "pune · 21:04:12 ist"
export function LiveClock({ timeZone, place, zoneLabel, seconds = true }: { timeZone: string; place?: string; zoneLabel?: string; seconds?: boolean }) {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: seconds ? '2-digit' : undefined, timeZone })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [timeZone, seconds])

  return (
    <span className="text-xs tabular-nums" style={{ color: 'var(--curio-muted)' }}>
      {place && <>{place} · </>}
      <span style={{ color: 'var(--curio-fg)' }}>{time ?? (seconds ? '--:--:--' : '--:--')}</span>
      {zoneLabel && <> {zoneLabel}</>}
    </span>
  )
}
