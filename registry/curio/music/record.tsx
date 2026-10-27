import { trackStatus, type Track } from '../lib/types'

type Props = {
  track: Track
  /** disc diameter in px */
  size?: number
  /** keep spinning when nothing is playing */
  alwaysSpin?: boolean
}

// tonearm drawn in units of a 100-wide disc so it scales with `size`
function Tonearm({ playing }: { playing: boolean }) {
  const px = 108
  const py = 4
  return (
    <svg viewBox="0 0 120 100" aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[120%] overflow-visible">
      <g
        style={{
          transformOrigin: `${px}px ${py}px`,
          transform: `rotate(${playing ? 26 : 2}deg)`,
          transition: 'transform 900ms cubic-bezier(.45,0,.2,1)',
        }}
      >
        <rect x={px - 4.5} y={py - 13} width={9} height={8} rx={1.5} fill="var(--curio-muted)" />
        {[
          { stroke: 'var(--curio-bg)', width: 5.5 },
          { stroke: 'var(--curio-fg)', width: 3 },
        ].map((s) => (
          <path
            key={s.width}
            d={`M ${px} ${py} L ${px} ${py + 62} L ${px - 6} ${py + 80}`}
            fill="none"
            stroke={s.stroke}
            strokeWidth={s.width}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        <rect
          x={px - 11}
          y={py + 77}
          width={10}
          height={13}
          rx={2}
          fill="var(--curio-fg)"
          stroke="var(--curio-bg)"
          strokeWidth={1.4}
          transform={`rotate(18 ${px - 6} ${py + 83})`}
        />
        <circle cx={px - 7.5} cy={py + 90} r={1.6} fill="var(--curio-accent)" />
      </g>
      <circle cx={px} cy={py} r={7} fill="var(--curio-surface)" stroke="var(--curio-muted)" strokeWidth={1.5} />
      <circle cx={px} cy={py} r={2.5} fill="var(--curio-muted)" />
    </svg>
  )
}

export function RecordPlayer({ track: t, size = 84, alwaysSpin = true }: Props) {
  const spinning = alwaysSpin || t.isPlaying
  const hole = Math.round(size * 0.21)
  return (
    <a href={t.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <div
          className="curio-spin relative h-full w-full overflow-hidden rounded-full shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)]"
          style={{ animationPlayState: spinning ? 'running' : 'paused' }}
        >
          {t.art ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={t.art} alt={`${t.title} by ${t.artist}`} className="h-full w-full object-cover" />
          ) : (
            <span className="block h-full w-full" style={{ background: 'var(--curio-chip)' }} />
          )}
          <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.25),transparent_30%,rgba(255,255,255,0.15),transparent_60%)]" />
        </div>
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4"
          style={{ width: hole, height: hole, background: 'var(--curio-bg)', borderColor: 'rgba(0,0,0,0.25)' }}
        />
        <Tonearm playing={!!t.isPlaying} />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--curio-muted)' }}>
          {t.isPlaying && (
            <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
              <span className="curio-eq-bar" style={{ animationDuration: '0.8s' }} />
              <span className="curio-eq-bar" style={{ animationDuration: '1.15s' }} />
              <span className="curio-eq-bar" style={{ animationDuration: '0.65s' }} />
            </span>
          )}
          <span suppressHydrationWarning>{trackStatus(t)}</span>
        </div>
        <div className="mt-1 truncate text-[17px] font-medium tracking-[-0.02em] transition-colors group-hover:text-[var(--curio-accent)]" style={{ color: 'var(--curio-fg)' }}>
          {t.title}
        </div>
        <div className="truncate text-[13px]" style={{ color: 'var(--curio-muted)' }}>
          {t.artist}
          {t.album ? ` · ${t.album}` : ''}
        </div>
      </div>
    </a>
  )
}
