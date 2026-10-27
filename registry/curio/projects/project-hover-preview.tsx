'use client'

import { useState } from 'react'
import type { Project } from '../lib/types'
import { external, ProjectThumb } from './project-parts'

// plain rows; a screenshot follows the cursor while you hover one
export function ProjectHoverPreview({ items }: { items: Project[] }) {
  const [active, setActive] = useState<Project | null>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  return (
    <div onPointerMove={(e) => setPos({ x: e.clientX, y: e.clientY })} onPointerLeave={() => setActive(null)}>
      {items.map((p) => (
        <a
          key={p.name}
          {...external(p)}
          onPointerEnter={() => setActive(p)}
          className="flex items-baseline gap-3 border-b py-2.5 text-[15px] transition-colors hover:text-[var(--curio-accent)]"
          style={{ borderColor: 'var(--curio-border)', color: 'var(--curio-fg)' }}
        >
          <span className="shrink-0">{p.name}</span>
          <span className="min-w-0 truncate text-[13px]" style={{ color: 'var(--curio-muted)' }}>
            {p.tags?.join(', ')}
          </span>
          <span className="ml-auto shrink-0 text-xs" style={{ color: 'var(--curio-muted)' }}>
            {p.year}
          </span>
        </a>
      ))}
      <div
        className="pointer-events-none fixed z-50 h-[150px] w-[240px] overflow-hidden rounded-lg border shadow-[0_20px_40px_-12px_rgba(0,0,0,0.35)] transition-[opacity,transform] duration-200"
        style={{
          left: pos.x + 18,
          top: pos.y + 18,
          opacity: active ? 1 : 0,
          transform: active ? 'scale(1) rotate(-2deg)' : 'scale(0.9) rotate(-2deg)',
          borderColor: 'var(--curio-border)',
          background: 'var(--curio-surface)',
        }}
      >
        {active && <ProjectThumb project={active} className="h-full w-full" />}
      </div>
    </div>
  )
}
