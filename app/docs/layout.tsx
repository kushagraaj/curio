import { DocsNav } from '@/components/docs-nav'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 pt-10 md:grid-cols-[200px_minmax(0,1fr)]">
      <aside className="md:sticky md:top-20 md:max-h-[calc(100dvh-6rem)] md:self-start md:overflow-y-auto">
        <details className="md:hidden" open={false}>
          <summary className="cursor-pointer rounded-lg border px-3 py-2 text-[13px]" style={{ borderColor: 'var(--site-border)' }}>
            Browse docs
          </summary>
          <div className="mt-3">
            <DocsNav />
          </div>
        </details>
        <div className="hidden md:block">
          <DocsNav />
        </div>
      </aside>
      <div className="min-w-0 max-w-[760px]">{children}</div>
    </div>
  )
}
