import type { Project } from '../lib/types'
import { Arrow, external, ProjectTags } from './project-parts'

// grouped by year with a line and a dot per project, like a changelog
export function ProjectTimeline({ items }: { items: Project[] }) {
  const years = [...new Set(items.map((p) => p.year))]
  return (
    <div className="flex flex-col">
      {years.map((year) => (
        <div key={year} className="grid grid-cols-[48px_1fr] gap-3 sm:grid-cols-[56px_1fr] sm:gap-4">
          <div className="pt-[3px] text-xs" style={{ color: 'var(--curio-muted)' }}>
            {year}
          </div>
          <div className="relative border-l pb-6 pl-5" style={{ borderColor: 'var(--curio-border)' }}>
            {items
              .filter((p) => p.year === year)
              .map((p) => (
                <a key={p.name} {...external(p)} className="group relative mb-4 block last:mb-0">
                  <span
                    className="absolute -left-[25px] top-[7px] h-[9px] w-[9px] rounded-full border-2 transition-colors group-hover:bg-[var(--curio-accent)]"
                    style={{ borderColor: 'var(--curio-accent)', background: 'var(--curio-bg)' }}
                  />
                  <span className="flex items-center gap-1.5 text-[15px] transition-colors group-hover:text-[var(--curio-accent)]" style={{ color: 'var(--curio-fg)' }}>
                    {p.name} <Arrow />
                  </span>
                  <span className="mt-0.5 block text-[14px] leading-snug" style={{ color: 'var(--curio-muted)' }}>
                    {p.description}
                  </span>
                  <ProjectTags project={p} className="mt-2" />
                </a>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
