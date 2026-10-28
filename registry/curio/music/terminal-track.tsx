import { trackStatus, type Track } from '../lib/types'

// a tiny command-line readout with a blinking cursor
export function TerminalTrack({ track: t, command = 'spotify --now' }: { track: Track; command?: string }) {
  return (
    <a
      href={t.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg border p-4 font-mono text-[12.5px] leading-[1.7] transition-colors hover:border-[var(--curio-accent)]"
      style={{ borderColor: 'var(--curio-border)', background: 'var(--curio-surface)', color: 'var(--curio-fg)' }}
    >
      <div style={{ color: 'var(--curio-muted)' }}>
        <span style={{ color: 'var(--curio-accent)' }}>~</span> $ {command}
      </div>
      <div className="truncate">
        <span style={{ color: 'var(--curio-accent)' }}>{t.isPlaying ? '▶' : '■'}</span> {t.title}
      </div>
      <div className="truncate pl-4" style={{ color: 'var(--curio-muted)' }}>
        {t.artist}
        {t.album ? ` · ${t.album}` : ''}
      </div>
      <div className="pl-4" style={{ color: 'var(--curio-muted)' }}>
        <span suppressHydrationWarning>{trackStatus(t)}</span>
        <span className="curio-blink ml-1 inline-block h-[13px] w-[7px] translate-y-[2px]" style={{ background: 'var(--curio-fg)' }} />
      </div>
    </a>
  )
}
