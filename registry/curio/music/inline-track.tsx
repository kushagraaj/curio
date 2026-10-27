import { timeAgo, type Track } from '../lib/types'

// reads like part of a sentence; hover the chip to see the cover
export function InlineTrack({ track: t }: { track: Track }) {
  return (
    <p className="text-[15px] leading-[1.7]" style={{ color: 'var(--curio-fg)' }}>
      {t.isPlaying ? 'Right now I’m listening to' : 'The last thing I listened to was'}{' '}
      <a href={t.url} target="_blank" rel="noopener noreferrer" className="curio-chip group relative">
        {t.art ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={t.art} alt="" width={14} height={14} className="h-3.5 w-3.5 object-cover" />
        ) : null}
        {t.title}
        <span
          className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-20 w-[180px] -translate-x-1/2 translate-y-1 rounded-lg border p-2 opacity-0 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.3)] transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
          style={{ background: 'var(--curio-surface)', borderColor: 'var(--curio-border)', color: 'var(--curio-fg)', whiteSpace: 'normal' }}
        >
          {t.art ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={t.art} alt="" className="block aspect-square w-full object-cover" />
          ) : (
            <span className="block aspect-square w-full" style={{ background: 'var(--curio-chip)' }} />
          )}
          <span className="mt-2 block truncate text-xs" style={{ color: 'var(--curio-muted)' }}>
            {t.album || t.artist}
          </span>
        </span>
      </a>{' '}
      by <span className="whitespace-nowrap">{t.artist}</span>
      <span suppressHydrationWarning className="ml-2 text-xs" style={{ color: 'var(--curio-muted)' }}>
        {t.isPlaying ? '● Live' : t.playedAt ? timeAgo(t.playedAt) : ''}
      </span>
    </p>
  )
}
