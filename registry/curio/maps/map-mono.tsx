'use client'

import { useEffect, useState } from 'react'
import { MAP_CREDIT, MapTiles } from '../lib/map-tiles'
import { coords, Credit, MapPin, type MapProps } from './map-pin'

// black-and-white street map with coordinates and a live local clock
export function MapMono({ lat, lon, label, href, size = 260, zoom = 13, timeZone }: MapProps & { timeZone?: string }) {
  const [time, setTime] = useState<string | null>(null)
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [timeZone])

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ? `map of ${label}` : 'map'}
      className="relative block shrink-0 overflow-hidden border"
      style={{ width: size, height: size, borderColor: 'var(--curio-border)' }}
    >
      <div className="absolute inset-0 [filter:grayscale(1)_contrast(1.25)_brightness(1.08)] [:is(.dark,[data-theme=dark])_&]:[filter:grayscale(1)_invert(1)_contrast(1.2)_brightness(0.85)]">
        <MapTiles lat={lat} lon={lon} zoom={zoom} size={size} style="street" />
      </div>
      <MapPin />
      <span className="absolute left-2 top-2 z-10 px-1.5 py-0.5 font-mono text-[11px]" style={{ background: 'var(--curio-fg)', color: 'var(--curio-bg)' }}>
        {coords(lat, lon)}
      </span>
      <span className="absolute bottom-2 right-2 z-10 px-1.5 py-0.5 font-mono text-[11px]" style={{ background: 'var(--curio-bg)', color: 'var(--curio-fg)' }}>
        {label ? `${label} · ` : ''}
        {time ?? '--:--:--'}
      </span>
      <Credit text={MAP_CREDIT} />
    </a>
  )
}
