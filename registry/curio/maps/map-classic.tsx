import { MAP_CREDIT, ThemedTiles } from '../lib/map-tiles'
import { Credit, MapPin, type MapProps } from './map-pin'

// soft grey street map, pulsing pin, a little label. zooms in slightly on hover.
export function MapClassic({ lat, lon, label, href, size = 260, zoom = 12 }: MapProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ? `map of ${label}` : 'map'}
      className="group relative block shrink-0 overflow-hidden rounded-2xl border"
      style={{ width: size, height: size, borderColor: 'var(--curio-border)' }}
    >
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
        <ThemedTiles lat={lat} lon={lon} zoom={zoom} size={size} light="light" dark="dark" />
      </div>
      <MapPin />
      {label && (
        <span
          className="absolute bottom-2 right-2 z-10 rounded-md border px-1.5 py-1 text-[12px]"
          style={{ background: 'var(--curio-surface)', borderColor: 'var(--curio-border)', color: 'var(--curio-fg)' }}
        >
          {label}
        </span>
      )}
      <Credit text={MAP_CREDIT} />
    </a>
  )
}
