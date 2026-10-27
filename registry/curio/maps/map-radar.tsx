import { MAP_CREDIT, MapTiles } from '../lib/map-tiles'
import { coords, Credit, MapPin, type MapProps } from './map-pin'

// dark map with a sweeping scanner and range rings
export function MapRadar({ lat, lon, label, href, size = 260, zoom = 12, color = '#5dff9e' }: MapProps & { color?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ? `map of ${label}` : 'map'}
      className="relative block shrink-0 overflow-hidden"
      style={{ width: size, height: size, background: '#0b0f0c' }}
    >
      <div className="absolute inset-0 opacity-80">
        <MapTiles lat={lat} lon={lon} zoom={zoom} size={size} style="dark_nolabels" />
      </div>
      {[0.35, 0.7, 1.05].map((r) => (
        <span
          key={r}
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{ width: size * r, height: size * r, borderColor: `${color}33` }}
        />
      ))}
      <span
        className="curio-spin absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ width: size * 1.6, height: size * 1.6, animationDuration: '4s', background: `conic-gradient(from 0deg, ${color}59, transparent 22%)` }}
      />
      <MapPin color={color} />
      <span className="absolute left-2.5 top-2 z-10 font-mono text-[10px] uppercase tracking-[0.08em]" style={{ color }}>
        ● Tracking
      </span>
      <span className="absolute bottom-2 right-2.5 z-10 text-right font-mono text-[10px] uppercase" style={{ color }}>
        {label}
        <br />
        {coords(lat, lon)}
      </span>
      <Credit text={MAP_CREDIT} light />
    </a>
  )
}
