import { trackStatus, type Track } from '../lib/types'

function Reel({ spinning }: { spinning: boolean }) {
  return (
    <span
      className="curio-spin relative block h-[26px] w-[26px] rounded-full border-[3px]"
      style={{ borderColor: 'var(--curio-fg)', animationDuration: '2.4s', animationPlayState: spinning ? 'running' : 'paused' }}
    >
      <span className="absolute inset-[5px] rounded-full border-2 border-dashed" style={{ borderColor: 'var(--curio-fg)' }} />
    </span>
  )
}

// a little tape whose reels turn while something is playing
export function Cassette({ track: t }: { track: Track }) {
  const spinning = !!t.isPlaying
  return (
    <a href={t.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5">
      <div
        className="relative w-[190px] shrink-0 border-2 p-2 transition-transform duration-300 group-hover:-rotate-2"
        style={{ borderColor: 'var(--curio-fg)', background: 'var(--curio-surface)' }}
      >
        <div className="flex items-center gap-2 px-1.5 py-1" style={{ background: 'var(--curio-accent)', color: 'var(--curio-on-accent)' }}>
          <span className="text-[11px]">A</span>
          <span className="truncate text-[11px] font-medium">{t.title}</span>
        </div>
        <div className="mx-auto mt-2 flex w-[120px] items-center justify-between border px-2.5 py-1.5" style={{ borderColor: 'var(--curio-border)' }}>
          <Reel spinning={spinning} />
          <span className="mx-1 h-[10px] flex-1" style={{ background: 'var(--curio-chip)' }} />
          <Reel spinning={spinning} />
        </div>
        <div className="mx-auto mt-2 h-[6px] w-[90px] border-x border-t" style={{ borderColor: 'var(--curio-border)' }} />
      </div>
      <div className="min-w-0">
        <div className="text-xs" style={{ color: 'var(--curio-muted)' }}>
          <span suppressHydrationWarning>{trackStatus(t)}</span>
        </div>
        <div className="mt-1 truncate text-[15px] transition-colors group-hover:text-[var(--curio-accent)]" style={{ color: 'var(--curio-fg)' }}>
          {t.title}
        </div>
        <div className="truncate text-[13px]" style={{ color: 'var(--curio-muted)' }}>
          {t.artist}
        </div>
      </div>
    </a>
  )
}
