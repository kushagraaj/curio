import { CodeBlock } from '@/components/code-block'
import { DocHeader } from '@/components/doc-header'
import { installCommand, SITE_URL } from '@/lib/catalog'

export const metadata = { title: 'Installation' }

export default function Installation() {
  return (
    <article className="prose-docs">
      <DocHeader eyebrow="Getting started" title="Installation" lead="Three steps: have Tailwind, add a component, import the tokens once." />

      <h2>1. A React project with Tailwind</h2>
      <p>Any Next.js, Vite or Remix app with Tailwind CSS v4 works. If you don’t have one yet:</p>
      <CodeBlock lang="bash" code="npx create-next-app@latest my-site" />
      <p className="mt-4">
        The shadcn CLI needs a <code>components.json</code>. If your project doesn’t have one, it asks a couple of questions and creates it the first
        time you add something.
      </p>

      <h2>2. Add a component</h2>
      <p>Pick anything from the cabinet and run its command. For example, the record player:</p>
      <CodeBlock lang="bash" code={installCommand('record-player')} />
      <p className="mt-4">
        This copies the component into <code>components/curio/</code> and, the first time, also adds <code>app/curio.css</code> and a small types file.
      </p>

      <h2>3. Import the tokens once</h2>
      <p>Add this line to your global stylesheet, right after Tailwind:</p>
      <CodeBlock
        lang="css"
        title="app/globals.css"
        code={`@import "tailwindcss";
@import "./curio.css";`}
      />

      <h2>Use it</h2>
      <CodeBlock
        title="app/page.tsx"
        code={`import { RecordPlayer } from '@/components/curio/music/record'

export default function Page() {
  return (
    <RecordPlayer
      track={{ title: 'Slow Tides', artist: 'The Quiet Hours', art: '/cover.jpg', isPlaying: true }}
    />
  )
}`}
      />

      <h2>Prefer copy and paste?</h2>
      <p>
        Every component page shows its full source. Copy the files into the paths shown above each block, and add <code>curio.css</code> from{' '}
        <a href={`${SITE_URL}/r/curio-base.json`}>the base item</a>.
      </p>
    </article>
  )
}
