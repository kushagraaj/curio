import Link from 'next/link'
import { CopyButton } from '@/components/copy-button'
import { HeroShelf } from '@/components/hero-shelf'
import { SpecimenCard } from '@/components/specimen-card'
import { byCategory, CATEGORIES, installCommand, ITEMS } from '@/lib/catalog'

export default function Home() {
  const cmd = installCommand('record-player')
  return (
    <main className="mx-auto max-w-6xl px-5">
      <section className="grid grid-cols-1 gap-10 pb-16 pt-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:pt-20">
        <div className="min-w-0">
          <div className="font-mono text-[11px] uppercase tracking-[0.1em]" style={{ color: 'var(--site-muted)' }}>
            a cabinet of {ITEMS.length} curiosities
          </div>
          <h1 className="mt-4 font-serif text-[clamp(44px,6.4vw,78px)] leading-[0.98] tracking-[-0.01em]">
            Small, delightful things <em className="text-[var(--site-accent)]">for your website.</em>
          </h1>
          <p className="mt-5 max-w-[46ch] text-[16px] leading-relaxed" style={{ color: 'var(--site-muted)' }}>
            Spinning records, real maps, theme sliders and project layouts. Copy them into your React project with one command, then make them yours.
          </p>
          <div className="mt-7 flex max-w-full items-center gap-2 overflow-hidden rounded-xl border py-1.5 pl-3.5 pr-1.5" style={{ borderColor: 'var(--site-border)', background: 'var(--site-surface)' }}>
            <code className="min-w-0 flex-1 truncate font-mono text-[12px]">
              <span style={{ color: 'var(--site-muted)' }}>$ </span>
              {cmd}
            </code>
            <CopyButton text={cmd} />
          </div>
          <div className="mt-5 flex gap-2 text-[13px]">
            <Link href="#catalogue" className="rounded-lg px-4 py-2 font-medium transition-opacity hover:opacity-90" style={{ background: 'var(--site-fg)', color: 'var(--site-bg)' }}>
              Browse the cabinet
            </Link>
            <Link href="/docs" className="rounded-lg border px-4 py-2 transition-colors hover:bg-[var(--site-chip)]" style={{ borderColor: 'var(--site-border)' }}>
              Read the docs
            </Link>
          </div>
        </div>
        <HeroShelf />
      </section>

      <div id="catalogue" className="scroll-mt-20" />
      {CATEGORIES.map((c) => {
        const items = byCategory(c.id)
        return (
          <section key={c.id} id={c.id} className="scroll-mt-20 border-t pb-6 pt-12" style={{ borderColor: 'var(--site-border)' }}>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 className="font-serif text-[40px] leading-none">{c.title}</h2>
                <p className="mt-2 text-[14px]" style={{ color: 'var(--site-muted)' }}>
                  {c.blurb}
                </p>
              </div>
              <span className="font-mono text-[11px]" style={{ color: 'var(--site-muted)' }}>
                {items.length} pieces
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <SpecimenCard key={item.name} item={item} />
              ))}
            </div>
          </section>
        )
      })}
    </main>
  )
}
