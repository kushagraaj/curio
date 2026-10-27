import { CodeBlock } from '@/components/code-block'
import { DocHeader } from '@/components/doc-header'

export const metadata = { title: 'Theming' }

const TOKENS = [
  ['--curio-bg', 'Page background (used for cut-outs like the record’s hole)'],
  ['--curio-fg', 'Main text'],
  ['--curio-muted', 'Secondary text, labels, ticks'],
  ['--curio-surface', 'Cards, popovers, panels'],
  ['--curio-border', 'Hairlines and outlines'],
  ['--curio-chip', 'Chips and quiet fills'],
  ['--curio-accent', 'The one colour that stands out'],
  ['--curio-on-accent', 'Text on top of the accent'],
]

export default function Theming() {
  return (
    <article className="prose-docs">
      <DocHeader eyebrow="Getting started" title="Theming" lead="Curio ships with a neutral look. Eight CSS variables turn it into yours." />

      <h2>Tokens</h2>
      <p>These are the defaults, shown in the current theme:</p>
      <div className="not-prose overflow-hidden rounded-xl border" style={{ borderColor: 'var(--site-border)' }}>
        {TOKENS.map(([name, desc]) => (
          <div key={name} className="flex items-center gap-3 border-b px-4 py-2.5 last:border-b-0" style={{ borderColor: 'var(--site-border)' }}>
            <span className="h-5 w-5 shrink-0 rounded-md border" style={{ background: `var(${name})`, borderColor: 'var(--site-border)' }} />
            <code className="font-mono text-[12px]">{name}</code>
            <span className="text-[13px]" style={{ color: 'var(--site-muted)' }}>
              {desc}
            </span>
          </div>
        ))}
      </div>

      <h2>Make it match your site</h2>
      <p>
        Override the variables anywhere after <code>curio.css</code>:
      </p>
      <CodeBlock
        lang="css"
        title="app/globals.css"
        code={`:root {
  --curio-bg: #fff8f1;
  --curio-accent: #ea580c;
}`}
      />

      <h2>Dark mode</h2>
      <p>
        Dark values apply inside any element with <code>class=&quot;dark&quot;</code> or <code>data-theme=&quot;dark&quot;</code>, so curio works with
        next-themes and most theme setups out of the box. The maps switch to dark tiles automatically.
      </p>
      <CodeBlock
        lang="css"
        code={`.dark {
  --curio-bg: #0b0b0f;
  --curio-accent: #a78bfa;
}`}
      />

      <h2>Per section</h2>
      <p>
        Tokens are plain CSS variables, so you can scope them. The shelf on the homepage re-themes only itself by setting the variables inline on its
        wrapper.
      </p>

      <h2>Motion</h2>
      <p>
        Every animation lives in <code>curio.css</code> and is turned off for visitors who ask for reduced motion. The one exception is the record’s
        slow spin, which you can stop with <code>alwaysSpin={'{false}'}</code>.
      </p>
    </article>
  )
}
