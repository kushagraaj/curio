import Link from 'next/link'
import { DocHeader } from '@/components/doc-header'
import { CATEGORIES, byCategory, ITEMS } from '@/lib/catalog'

export const metadata = { title: 'Introduction' }

export default function Intro() {
  return (
    <article className="prose-docs">
      <DocHeader eyebrow="Getting started" title="Introduction" lead="Curio is a cabinet of small, delightful React components for personal sites." />

      <p>
        Most component libraries give you buttons and dialogs. Curio gives you the other things: a record that spins while you’re listening, a map of
        your city, a slider that moves the sun across the sky, a timeline of what you’ve built. The details that make a page feel like someone’s.
      </p>

      <h2>How it works</h2>
      <p>
        Curio isn’t a package you import from. Each component is copied into your project with one command, so the code is yours to read and change. It
        uses the same registry format as shadcn/ui, so the shadcn CLI does the copying.
      </p>
      <ul>
        <li>React 18 or 19, with Tailwind CSS v4</li>
        <li>No runtime dependencies beyond React</li>
        <li>
          A neutral default look, restyled with eight <code>--curio-*</code> CSS variables
        </li>
        <li>Works in light and dark, and respects reduced motion</li>
      </ul>

      <h2>What’s in the cabinet</h2>
      <ul>
        {CATEGORIES.map((c) => (
          <li key={c.id}>
            <strong>{c.title}</strong> ({byCategory(c.id).length}): {byCategory(c.id).map((i) => i.title).join(', ')}
          </li>
        ))}
      </ul>
      <p>
        {ITEMS.length} pieces so far. Start with <Link href="/docs/installation">installation</Link>, or <Link href="/#catalogue">browse them all</Link>.
      </p>
    </article>
  )
}
