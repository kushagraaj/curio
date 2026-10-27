// github-style activity grid. weeks[w][d] = level 0..4, or -1 for "no day"
// colours are mixed from --curio-accent so it follows your theme.

const level = (l: number) =>
  l < 0
    ? 'transparent'
    : l === 0
      ? 'color-mix(in srgb, var(--curio-fg) 8%, transparent)'
      : l === 4
        ? 'var(--curio-accent)'
        : `color-mix(in srgb, var(--curio-accent) ${[0, 28, 52, 76][l]}%, var(--curio-bg))`

export function ContributionGrid({
  weeks,
  total,
  title,
  href,
  cell = 11,
}: {
  weeks: number[][]
  total?: number
  title?: string
  href?: string
  cell?: number
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block w-fit p-3.5" style={{ color: 'var(--curio-fg)' }}>
      {(title || total !== undefined) && (
        <div className="mb-3 flex items-baseline justify-between gap-6 text-[13px]">
          <span className="font-medium">{title}</span>
          {total !== undefined && (
            <span className="text-xs" style={{ color: 'var(--curio-muted)' }}>
              {total.toLocaleString()} contributions
            </span>
          )}
        </div>
      )}
      <div className="flex gap-[3px]">
        {weeks.map((week, w) => (
          <div key={w} className="flex flex-col gap-[3px]">
            {week.map((l, d) => (
              <span key={d} className="block" style={{ width: cell, height: cell, background: level(l) }} />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-2.5 flex items-center justify-end gap-[3px] text-[11px]" style={{ color: 'var(--curio-muted)' }}>
        Less
        {[0, 1, 2, 3, 4].map((l) => (
          <span key={l} className="block h-[8px] w-[8px]" style={{ background: level(l) }} />
        ))}
        More
      </div>
    </a>
  )
}
