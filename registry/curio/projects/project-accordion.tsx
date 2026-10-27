'use client'

import { useState } from 'react'
import type { Project } from '../lib/types'
import { Arrow, external, ProjectTags, ProjectThumb } from './project-parts'

// names only; open one to see the details, tags and a preview
export function ProjectAccordion({ items, defaultOpen = 0 }: { items: Project[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen)
  return (
    <div className="border-t" style={{ borderColor: 'var(--curio-border)' }}>
      {items.map((p, i) => {
        const isOpen = open === i
        return (
          <div key={p.name} className="border-b" style={{ borderColor: 'var(--curio-border)' }}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center gap-3 py-3 text-left text-[15px] transition-colors hover:text-[var(--curio-accent)]"
              style={{ color: 'var(--curio-fg)' }}
            >
              <span className="text-xs" style={{ color: 'var(--curio-muted)' }}>
                {p.year}
              </span>
              <span>{p.name}</span>
              <span className="ml-auto text-base transition-transform duration-300" style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}>
                +
              </span>
            </button>
            <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
              <div className="overflow-hidden">
                <div className="flex flex-col gap-4 pb-5 sm:flex-row">
                  <ProjectThumb project={p} className="h-[110px] w-full shrink-0 rounded-md border sm:w-[42%]" />
                  <div className="min-w-0">
                    <p className="text-[14px] leading-relaxed" style={{ color: 'var(--curio-muted)' }}>
                      {p.description}
                    </p>
                    <ProjectTags project={p} className="mt-3" />
                    <a {...external(p)} className="curio-chip mt-3 text-xs">
                      Open <Arrow />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
