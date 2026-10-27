import { trackStatus, type Track } from '../lib/types'

// the cover pinned like a photo; straightens up on hover
export function Polaroid({ track: t, caption }: { track: Track; caption?: string }) {
  return (
    <a href={t.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-6">
      <div
        className="w-[132px] shrink-0 -rotate-3 p-2 pb-7 shadow-[0_12px_28px_-10px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-0"
        style={{ background: '#fbfbf8' }}
      >
        {t.art ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={t.art} alt={`${t.title} by ${t.artist}`} className="block aspect-square w-full object-cover" />
        ) : (
          <span className="block aspect-square w-full bg-neutral-200" />
        )}
        <div className="mt-2 truncate text-center text-[11px] text-neutral-500">
          {caption ?? (t.isPlaying ? 'Now playing' : 'On repeat')}
        </div>
      </div>
      <div className="min-w-0">
        <div className="text-xs" style={{ color: 'var(--curio-muted)' }}>
          <span suppressHydrationWarning>{trackStatus(t)}</span>
        </div>
        <div className="mt-1 text-[22px] font-medium leading-tight tracking-[-0.03em] transition-colors group-hover:text-[var(--curio-accent)]" style={{ color: 'var(--curio-fg)' }}>
          {t.title}
        </div>
        <div className="mt-0.5 text-[14px]" style={{ color: 'var(--curio-muted)' }}>
          {t.artist}
        </div>
      </div>
    </a>
  )
}
