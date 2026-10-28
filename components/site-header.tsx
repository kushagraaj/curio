'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { SiteTheme } from './site-theme'

export function SiteHeader() {
  // the landing page draws its own bar
  if (usePathname() === '/') return null
  return (
    <header className="sticky top-0 z-40 border-b backdrop-blur-md" style={{ borderColor: 'var(--site-border)', background: 'color-mix(in srgb, var(--site-bg) 82%, transparent)' }}>
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-serif text-[26px] leading-none">curio.</span>
          <span className="hidden font-mono text-[10px] sm:inline" style={{ color: 'var(--site-muted)' }}>
            v0.1
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-[13px]">
          <Link href="/#catalogue" className="rounded-md px-2.5 py-1.5 transition-colors hover:bg-[var(--site-chip)]">
            Catalogue
          </Link>
          <Link href="/docs" className="rounded-md px-2.5 py-1.5 transition-colors hover:bg-[var(--site-chip)]">
            Docs
          </Link>
          <a href="/llms.txt" className="hidden rounded-md px-2.5 py-1.5 transition-colors hover:bg-[var(--site-chip)] sm:inline">
            llms.txt
          </a>
          <span className="ml-1">
            <SiteTheme />
          </span>
        </nav>
      </div>
    </header>
  )
}
