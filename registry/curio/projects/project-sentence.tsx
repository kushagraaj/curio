import { Fragment } from 'react'
import type { Project } from '../lib/types'
import { external, ProjectThumb } from './project-parts'

// projects written into a sentence; hover a name for a card with the details
export function ProjectSentence({ items, lead = 'Things I’ve built:' }: { items: Project[]; lead?: string }) {
  return (
    <p className="text-[15px] leading-[2]" style={{ color: 'var(--curio-fg)' }}>
      {lead}{' '}
      {items.map((p, i) => (
        <Fragment key={p.name}>
          <a {...external(p)} className="curio-chip group relative">
            {p.name}
            <span
              className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-30 w-[240px] -translate-x-1/2 translate-y-1 rounded-lg border p-2 text-left opacity-0 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.3)] transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
              style={{ background: 'var(--curio-surface)', borderColor: 'var(--curio-border)', color: 'var(--curio-fg)', whiteSpace: 'normal' }}
            >
              <ProjectThumb project={p} className="block h-[120px] w-full" />
              <span className="mt-2 block text-[13px] leading-snug">{p.description}</span>
              <span className="mt-1.5 block text-[11px]" style={{ color: 'var(--curio-muted)' }}>
                {[p.year, ...(p.tags ?? [])].join(' · ')}
              </span>
            </span>
          </a>
          {i < items.length - 2 ? ', ' : i === items.length - 2 ? ' and ' : '.'}
        </Fragment>
      ))}
    </p>
  )
}
