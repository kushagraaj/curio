import Link from 'next/link'
import { pad, type CatalogItem } from '@/lib/catalog'
import { Preview } from './previews'

export function SpecimenCard({ item }: { item: CatalogItem }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border transition-colors hover:border-[color-mix(in_srgb,var(--site-accent)_45%,transparent)]" style={{ borderColor: 'var(--site-border)', background: 'var(--site-surface)' }}>
      <div className="flex items-center justify-between px-4 pt-3 font-mono text-[10px] uppercase tracking-[0.08em]" style={{ color: 'var(--site-muted)' }}>
        <span>no. {pad(item.number)}</span>
        <span>{item.category}</span>
      </div>
      <div className="relative mx-3 mt-3 flex min-h-[250px] items-center justify-center overflow-visible rounded-xl border px-5 py-6" style={{ background: 'var(--curio-bg)', borderColor: 'var(--site-border)', color: 'var(--curio-fg)' }}>
        <div className="w-full">
          <Preview name={item.name} />
        </div>
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5">
        <Link href={`/docs/${item.name}`} className="font-serif text-[24px] leading-none transition-colors hover:text-[var(--site-accent)]">
          {item.title}
        </Link>
        <p className="mt-1.5 text-[13px] leading-snug" style={{ color: 'var(--site-muted)' }}>
          {item.description}
        </p>
        <Link href={`/docs/${item.name}`} className="mt-auto pt-3 font-mono text-[11px] transition-colors hover:text-[var(--site-accent)]" style={{ color: 'var(--site-muted)' }}>
          Install &amp; docs →
        </Link>
      </div>
    </article>
  )
}
