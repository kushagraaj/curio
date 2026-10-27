import fs from 'node:fs/promises'
import path from 'node:path'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CodeBlock } from '@/components/code-block'
import { DocHeader } from '@/components/doc-header'
import { PreviewFrame } from '@/components/preview-frame'
import { findItem, installCommand, ITEMS, pad } from '@/lib/catalog'
import { META } from '@/lib/docs-meta'

type Props = { params: Promise<{ name: string }> }

export function generateStaticParams() {
  return ITEMS.map((i) => ({ name: i.name }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = findItem((await params).name)
  return item ? { title: item.title, description: item.description } : {}
}

export default async function ComponentPage({ params }: Props) {
  const item = findItem((await params).name)
  if (!item) notFound()
  const meta = META[item.name]
  const sources = await Promise.all(
    item.files.map(async (f) => ({ target: f.target, code: await fs.readFile(path.join(process.cwd(), f.path), 'utf8') })),
  )
  const index = ITEMS.indexOf(item)
  const prev = ITEMS[index - 1]
  const next = ITEMS[index + 1]

  return (
    <article className="prose-docs">
      <DocHeader eyebrow={`no. ${pad(item.number)} · ${item.category}`} title={item.title} lead={item.description} />

      <PreviewFrame name={item.name} />

      <h2>Install</h2>
      <CodeBlock lang="bash" code={installCommand(item.name)} />
      <p className="mt-3 text-[13px]" style={{ color: 'var(--site-muted)' }}>
        First curio component? Also add <code>@import &quot;./curio.css&quot;;</code> to your global CSS. See <Link href="/docs/installation">installation</Link>.
      </p>

      {meta && (
        <>
          <h2>Usage</h2>
          <CodeBlock code={meta.usage} />
          {meta.notes && <p className="mt-4">{meta.notes}</p>}

          <h2>Props</h2>
          <div className="overflow-x-auto rounded-xl border" style={{ borderColor: 'var(--site-border)' }}>
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b font-mono text-[10px] uppercase tracking-[0.06em]" style={{ borderColor: 'var(--site-border)', color: 'var(--site-muted)' }}>
                  <th className="px-4 py-2 font-normal">Prop</th>
                  <th className="px-4 py-2 font-normal">Type</th>
                  <th className="px-4 py-2 font-normal">Default</th>
                  <th className="px-4 py-2 font-normal">Description</th>
                </tr>
              </thead>
              <tbody>
                {meta.props.map((p) => (
                  <tr key={p.name} className="border-b last:border-b-0 align-top" style={{ borderColor: 'var(--site-border)' }}>
                    <td className="px-4 py-2.5 font-mono text-[12px]">{p.name}</td>
                    <td className="px-4 py-2.5 font-mono text-[11.5px]" style={{ color: 'var(--site-accent)' }}>
                      {p.type}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-[11.5px]" style={{ color: 'var(--site-muted)' }}>
                      {p.default ?? '—'}
                    </td>
                    <td className="px-4 py-2.5" style={{ color: 'var(--site-muted)' }}>
                      {p.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <h2>Source</h2>
      <p>This is exactly what the command copies into your project.</p>
      <div className="flex flex-col gap-4">
        {sources.map((s) => (
          <CodeBlock key={s.target} title={s.target} code={s.code} />
        ))}
      </div>

      <div className="mt-14 flex justify-between gap-4 border-t pt-5 text-[13px]" style={{ borderColor: 'var(--site-border)' }}>
        {prev ? (
          <Link href={`/docs/${prev.name}`} className="no-underline hover:text-[var(--site-accent)]">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/docs/${next.name}`} className="no-underline hover:text-[var(--site-accent)]">
            {next.title} →
          </Link>
        )}
      </div>
    </article>
  )
}
