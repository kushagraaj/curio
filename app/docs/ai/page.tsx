import { CodeBlock } from '@/components/code-block'
import { DocHeader } from '@/components/doc-header'
import { SITE_URL } from '@/lib/catalog'

export const metadata = { title: 'Use with AI' }

export default function Ai() {
  return (
    <article className="prose-docs">
      <DocHeader eyebrow="Getting started" title="Use with AI" lead="Give your coding agent the whole cabinet as context." />

      <h2>llms.txt</h2>
      <p>
        Curio publishes a plain-text index at <a href="/llms.txt">/llms.txt</a>: every component, what it does, and its install URL. Point your agent
        at it and ask for what you want.
      </p>
      <CodeBlock
        lang="text"
        code={`Read ${SITE_URL}/llms.txt, then add a music player and a map of my city
to the homepage. I live in Lisbon and my Last.fm username is ...`}
      />

      <h2>Registry JSON</h2>
      <p>
        Each component is also available as structured JSON with its full source, in the shadcn registry format. Agents and tools that understand the
        format can install from it directly.
      </p>
      <CodeBlock lang="text" code={`${SITE_URL}/r/registry.json        every item\n${SITE_URL}/r/record-player.json   one item, with code`} />

      <h2>With the shadcn MCP server</h2>
      <p>
        If your editor uses the shadcn MCP server, add curio as a registry in <code>components.json</code> and your agent can browse and install curio
        pieces by name:
      </p>
      <CodeBlock
        lang="json"
        title="components.json"
        code={`{
  "registries": {
    "@curio": "${SITE_URL}/r/{name}.json"
  }
}`}
      />
      <p className="mt-4">
        Then: <code>npx shadcn@latest add @curio/record-player</code>
      </p>
    </article>
  )
}
