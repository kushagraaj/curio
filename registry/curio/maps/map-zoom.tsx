import { MAP_CREDIT, ThemedTiles } from '../lib/map-tiles'
import { Credit, MapPin, type MapProps } from './map-pin'

// starts zoomed out on the region, dives into the city on hover
export function MapZoom({
  lat,
  lon,
  label,
  href,
  size = 260,
  zoom = 12,
  regionZoom = 4,
  regionLabel = 'Region',
}: MapProps & { regionZoom?: number; regionLabel?: string }) {
  const ease = 'ease-[cubic-bezier(.65,0,.35,1)]'
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ? `map of ${label}` : 'map'}
      className="group relative block shrink-0 overflow-hidden border"
      style={{ width: size, height: size, borderColor: 'var(--curio-border)' }}
    >
      <div className={`absolute inset-0 transition-all duration-700 ${ease} group-hover:scale-[3] group-hover:opacity-0`}>
        <ThemedTiles lat={lat} lon={lon} zoom={regionZoom} size={size} light="light" dark="dark" />
      </div>
      <div className={`absolute inset-0 scale-[0.35] opacity-0 transition-all duration-700 ${ease} group-hover:scale-100 group-hover:opacity-100`}>
        <ThemedTiles lat={lat} lon={lon} zoom={zoom} size={size} light="light" dark="dark" />
      </div>
      <MapPin />
      <span className="absolute bottom-2 right-2 z-10 px-1.5 py-1 text-xs" style={{ background: 'var(--curio-accent)', color: 'var(--curio-on-accent)' }}>
        <span className="group-hover:hidden">{regionLabel}</span>
        <span className="hidden group-hover:inline">{label}</span>
      </span>
      <Credit text={MAP_CREDIT} />
    </a>
  )
}
