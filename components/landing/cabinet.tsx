import Link from 'next/link'
import { CATEGORIES, type CatalogItem } from '@/lib/catalog'
import { Preview } from '@/components/previews'
import { Scaled } from './scaled'

// strip colours rotate so neighbouring tiles never match
const STRIPS = [
  { bg: 'var(--l-surface)', fg: 'var(--l-ink)', sub: 'var(--l-muted)' },
  { bg: 'var(--l-ink)', fg: 'var(--l-bg)', sub: 'color-mix(in srgb, var(--l-bg) 62%, transparent)' },
  { bg: 'var(--l-step)', fg: 'var(--l-ink)', sub: 'var(--l-muted)' },
]

export type CabinetItem = CatalogItem & { lines: number }

export function Cabinet({ items }: { items: CabinetItem[] }) {
  return (
    <section id="catalogue" className="l-wrap scroll-mt-6" aria-labelledby="cabinet-title">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 id="cabinet-title" data-reveal className="l-head">
          The whole cabinet
        </h2>
        <p data-reveal className="max-w-[40ch]" style={{ '--d': 1 } as React.CSSProperties}>
          All 29 pieces, live. Try them here, then open one for its install command and props.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-5 md:grid-cols-3 md:gap-x-3 md:gap-y-7 xl:grid-cols-4">
        {items.map((item, i) => {
          const s = STRIPS[(i + Math.floor(i / 4)) % STRIPS.length]
          const cat = CATEGORIES.find((c) => c.id === item.category)?.title
          return (
            <article key={item.name} data-reveal style={{ '--d': i % 4 } as React.CSSProperties} className="flex min-w-0 flex-col">
              <div
                data-ui
                className="aspect-square overflow-hidden p-3"
                style={{ '--curio-bg': 'var(--l-tile)', background: 'var(--l-tile)', color: 'var(--curio-fg)' } as React.CSSProperties}
              >
                <Scaled width={300}>
                  <Preview name={item.name} />
                </Scaled>
              </div>
              <div className="l-small flex min-h-[88px] flex-col justify-between gap-2 p-3" style={{ background: s.bg, color: s.fg }}>
                <div className="hidden justify-between tabular-nums sm:flex" style={{ color: s.sub }}>
                  <span>{cat}</span>
                  <span>{item.files.length} {item.files.length === 1 ? 'file' : 'files'}</span>
                  <span>{item.lines} lines</span>
                  <span>No deps</span>
                </div>
                <div className="flex flex-wrap justify-between gap-x-3 tabular-nums sm:hidden" style={{ color: s.sub }}>
                  <span>{cat}</span>
                  <span>{item.lines} lines</span>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <Link href={`/docs/${item.name}`} className="truncate font-medium hover:underline">
                    {item.title}
                  </Link>
                  <Link href={`/docs/${item.name}`} className="shrink-0 hover:underline" aria-label={`Install ${item.title}`}>
                    Install
                  </Link>
                </div>
              </div>
            </article>
          )
        })}
        <a
          href="https://github.com/kushagraaj/curio/issues"
          data-reveal
          className="group flex min-h-[200px] flex-col justify-between p-5 md:col-span-1 xl:col-span-3"
          style={{ background: 'var(--l-step)', color: 'var(--l-ink)' }}
        >
          <span className="l-lead max-w-[30ch]">Missing a piece you want?</span>
          <span className="l-link self-start">Suggest one on GitHub</span>
        </a>
      </div>
    </section>
  )
}
