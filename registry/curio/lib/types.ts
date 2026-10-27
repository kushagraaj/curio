export type Track = {
  title: string
  artist: string
  album?: string
  /** album art url */
  art?: string
  /** where clicking the track goes */
  url?: string
  isPlaying?: boolean
  /** ms timestamp of when it was last played */
  playedAt?: number | null
}

export type Project = {
  name: string
  description: string
  url: string
  year: string
  tags?: string[]
  /** screenshot url, used by the visual layouts */
  image?: string
  status?: 'live' | 'archived'
}

export type ThemeOption = {
  /** shown as the step's label */
  label: string
  /** a colour that represents the option (swatches, gradient) */
  swatch?: string
  /** an accent colour for the option (swatches) */
  accent?: string
}

export function timeAgo(ms: number) {
  const s = Math.max(1, Math.round((Date.now() - ms) / 1000))
  if (s < 60) return `${s}s ago`
  const m = Math.round(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.round(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.round(h / 24)}d ago`
}

export function trackStatus(t: Track) {
  if (t.isPlaying) return 'Listening now'
  return `Last played${t.playedAt ? ` ${timeAgo(t.playedAt)}` : ''}`
}
