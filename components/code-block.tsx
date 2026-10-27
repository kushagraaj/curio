import { codeToHtml } from 'shiki'
import { CopyButton } from './copy-button'

export async function CodeBlock({ code, lang = 'tsx', title }: { code: string; lang?: string; title?: string }) {
  const html = await codeToHtml(code.trimEnd(), {
    lang,
    themes: { light: 'github-light', dark: 'github-dark-dimmed' },
    defaultColor: 'light',
  })
  return (
    <div className="code-block relative overflow-hidden rounded-xl border" style={{ borderColor: 'var(--site-border)', background: 'var(--site-surface)' }}>
      {title && (
        <div className="border-b px-4 py-2 font-mono text-[11px]" style={{ borderColor: 'var(--site-border)', color: 'var(--site-muted)' }}>
          {title}
        </div>
      )}
      <div className="absolute right-2 top-2 z-10">
        <CopyButton text={code.trimEnd()} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
