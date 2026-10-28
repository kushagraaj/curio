import { MAP_CREDIT, MapTiles } from '../lib/map-tiles'
import { coords, Credit, type MapProps } from './map-pin'

// the street map redrawn as a blue technical plan on a grid
export function MapBlueprint({ lat, lon, label, href, size = 260, zoom = 13 }: MapProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ? `map of ${label}` : 'map'}
      className="relative block shrink-0 overflow-hidden"
      style={{ width: size, height: size, background: '#0f2a6b' }}
    >
      <div className="absolute inset-0 opacity-90 mix-blend-screen [filter:invert(1)_grayscale(1)_brightness(0.9)]">
        <MapTiles lat={lat} lon={lon} zoom={zoom} size={size} style="street" />
      </div>
      <div className="absolute inset-0" style={{ background: 'rgba(29,43,214,0.55)', mixBlendMode: 'multiply' }} />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />
      <span className="absolute left-1/2 top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 border-white bg-[#ff5a2e]" />
      <span className="absolute left-2.5 top-2 z-10 font-mono text-[10px] uppercase tracking-[0.08em] text-white/80">
        Sheet 01{label ? ` · ${label}` : ''}
      </span>
      <span className="absolute bottom-2 right-2.5 z-10 font-mono text-[10px] text-white/80">{coords(lat, lon)}</span>
      <Credit text={MAP_CREDIT} light />
    </a>
  )
}
