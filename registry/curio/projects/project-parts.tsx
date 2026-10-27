import type { Project } from '../lib/types'

export function ProjectThumb({ project: p, className = '' }: { project: Project; className?: string }) {
  if (p.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={p.image} alt="" className={`object-cover object-top ${className}`} />
  }
  return (
    <span
      className={`flex items-center justify-center text-[28px] font-medium ${className}`}
      style={{ background: 'var(--curio-accent)', color: 'var(--curio-on-accent)' }}
    >
      {p.name[0]}
    </span>
  )
}

export function ProjectTags({ project: p, className = '' }: { project: Project; className?: string }) {
  if (!p.tags?.length) return null
  return (
    <span className={`flex flex-wrap gap-1.5 text-[11px] ${className}`} style={{ color: 'var(--curio-muted)' }}>
      {p.tags.map((t) => (
        <span key={t} className="rounded-md border px-1.5 py-px" style={{ borderColor: 'var(--curio-border)' }}>
          {t}
        </span>
      ))}
    </span>
  )
}

export const external = (p: Project) => ({ href: p.url, target: '_blank', rel: 'noopener noreferrer' })

export function Arrow() {
  return (
    <svg viewBox="0 0 10 10" width={10} height={10} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M2.5 7.5 7.5 2.5M3.5 2.5h4v4" />
    </svg>
  )
}
