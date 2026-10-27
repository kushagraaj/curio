import { MapTiles, SATELLITE_CREDIT } from '../lib/map-tiles'
import { coords, Credit, type MapProps } from './map-pin'

// real satellite imagery with crosshairs; brightens on hover
export function MapSatellite({ lat, lon, label, href, size = 260, zoom = 13 }: MapProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ? `map of ${label}` : 'map'}
      className="group relative block shrink-0 overflow-hidden"
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-0 transition-[filter] duration-500 [filter:saturate(0.6)_brightness(0.75)] group-hover:[filter:saturate(1)_brightness(0.95)]">
        <MapTiles lat={lat} lon={lon} zoom={zoom} size={size} style="satellite" />
      </div>
      <span className="absolute inset-x-0 top-1/2 z-10 h-px bg-white/40" />
      <span className="absolute inset-y-0 left-1/2 z-10 w-px bg-white/40" />
      <span className="absolute left-1/2 top-1/2 z-10 h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 border border-white" />
      <span className="absolute bottom-2.5 right-2.5 z-10 text-right font-mono text-[11px] uppercase leading-tight text-white">
        {label}
        <br />
        <span className="text-white/70">{coords(lat, lon)}</span>
      </span>
      <Credit text={SATELLITE_CREDIT} light />
    </a>
  )
}
