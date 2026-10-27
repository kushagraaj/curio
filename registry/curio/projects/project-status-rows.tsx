import type { Project } from '../lib/types'
import { external } from './project-parts'

// rows with a live/archived dot and the tech on the right
export function ProjectStatusRows({ items }: { items: Project[] }) {
  return (
    <div>
      {items.map((p) => (
        <a
          key={p.name}
          {...external(p)}
          className="group flex items-center gap-3 border-b py-2.5 text-[15px] transition-colors hover:text-[var(--curio-accent)]"
          style={{ borderColor: 'var(--curio-border)', color: 'var(--curio-fg)' }}
        >
          <span
            className="h-[7px] w-[7px] shrink-0 rounded-full"
            style={{ background: p.status === 'live' ? '#22a55a' : 'var(--curio-muted)' }}
            title={p.status ?? 'archived'}
          />
          <span className="shrink-0">{p.name}</span>
          <span className="hidden text-[11px] capitalize sm:inline" style={{ color: 'var(--curio-muted)' }}>
            {p.status ?? 'archived'}
          </span>
          <span className="ml-auto hidden gap-1 text-[11px] sm:flex" style={{ color: 'var(--curio-muted)' }}>
            {p.tags?.map((t) => (
              <span key={t} className="rounded-md border px-1.5" style={{ borderColor: 'var(--curio-border)' }}>
                {t}
              </span>
            ))}
          </span>
          <span className="ml-auto shrink-0 text-xs sm:ml-2" style={{ color: 'var(--curio-muted)' }}>
            {p.year}
          </span>
        </a>
      ))}
    </div>
  )
}
