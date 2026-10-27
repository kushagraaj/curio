'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { byCategory, CATEGORIES } from '@/lib/catalog'

const GUIDES = [
  { href: '/docs', label: 'Introduction' },
  { href: '/docs/installation', label: 'Installation' },
  { href: '/docs/theming', label: 'Theming' },
  { href: '/docs/ai', label: 'Use with AI' },
]

export function DocsNav() {
  const path = usePathname()
  const link = (href: string, label: string) => {
    const active = path === href
    return (
      <Link
        key={href}
        href={href}
        className="block rounded-md px-2.5 py-1 text-[13px] transition-colors hover:text-[var(--site-fg)]"
        style={{ color: active ? 'var(--site-fg)' : 'var(--site-muted)', background: active ? 'var(--site-chip)' : 'transparent' }}
      >
        {label}
      </Link>
    )
  }
  return (
    <nav className="flex flex-col gap-5">
      <div>
        <div className="mb-1.5 px-2.5 font-mono text-[10px] uppercase tracking-[0.08em]" style={{ color: 'var(--site-muted)' }}>
          Getting started
        </div>
        {GUIDES.map((g) => link(g.href, g.label))}
      </div>
      {CATEGORIES.map((c) => (
        <div key={c.id}>
          <div className="mb-1.5 px-2.5 font-mono text-[10px] uppercase tracking-[0.08em]" style={{ color: 'var(--site-muted)' }}>
            {c.title}
          </div>
          {byCategory(c.id).map((i) => link(`/docs/${i.name}`, i.title))}
        </div>
      ))}
    </nav>
  )
}
