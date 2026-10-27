// pulsing location pin shared by the map cards
export function MapPin({ color = 'var(--curio-accent)' }: { color?: string }) {
  return (
    <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
      <span className="curio-pulse absolute -inset-[10px] rounded-full opacity-40" style={{ background: color }} />
      <span className="relative block h-[18px] w-[18px] rounded-full border-[3px] border-white shadow-[0_2px_8px_rgba(0,0,0,0.35)]" style={{ background: color }} />
    </span>
  )
}

export function Credit({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <span className="absolute bottom-1 left-1.5 z-10 text-[9px] opacity-60" style={{ color: light ? 'rgba(255,255,255,0.85)' : 'var(--curio-muted)' }}>
      {text}
    </span>
  )
}

export type MapProps = {
  lat: number
  lon: number
  /** e.g. "pune, in" */
  label?: string
  /** where clicking the map goes */
  href?: string
  /** square size in px */
  size?: number
  zoom?: number
}

export function coords(lat: number, lon: number) {
  return `${Math.abs(lat).toFixed(2)}°${lat >= 0 ? 'N' : 'S'} ${Math.abs(lon).toFixed(2)}°${lon >= 0 ? 'E' : 'W'}`
}
