import type { Project } from '../lib/types'
import { external, ProjectThumb } from './project-parts'

// square cards with screenshots
export function ProjectTiles({ items, columns = 2 }: { items: Project[]; columns?: number }) {
  return (
    <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {items.map((p) => (
        <a
          key={p.name}
          {...external(p)}
          className="group flex aspect-square flex-col overflow-hidden rounded-xl border transition-transform duration-300 hover:-translate-y-1"
          style={{ borderColor: 'var(--curio-border)', background: 'var(--curio-surface)' }}
        >
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <ProjectThumb project={p} className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="flex items-baseline justify-between gap-2 border-t px-3 py-2.5" style={{ borderColor: 'var(--curio-border)' }}>
            <span className="truncate text-[14px] transition-colors group-hover:text-[var(--curio-accent)]" style={{ color: 'var(--curio-fg)' }}>
              {p.name}
            </span>
            <span className="shrink-0 text-[11px]" style={{ color: 'var(--curio-muted)' }}>
              {p.year}
            </span>
          </div>
        </a>
      ))}
    </div>
  )
}
