export function DocHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <header className="mb-8">
      <div className="font-mono text-[11px] uppercase tracking-[0.08em]" style={{ color: 'var(--site-muted)' }}>
        {eyebrow}
      </div>
      <h1 className="mt-2 font-serif text-[52px] leading-none">{title}</h1>
      <p className="mt-3 text-[16px] leading-relaxed" style={{ color: 'var(--site-muted)' }}>
        {lead}
      </p>
    </header>
  )
}
