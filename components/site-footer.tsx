'use client'

import { usePathname } from 'next/navigation'

export function SiteFooter() {
  if (usePathname() === '/') return null
  return (
    <footer className="mt-24 border-t" style={{ borderColor: 'var(--site-border)' }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-xs sm:flex-row sm:justify-between" style={{ color: 'var(--site-muted)' }}>
        <span>Curio · a cabinet of small things for the web</span>
        <span>Made by Kushagra · map tiles © Esri</span>
      </div>
    </footer>
  )
}
