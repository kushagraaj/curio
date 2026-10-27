'use client'

import { useState } from 'react'

export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={() =>
        navigator.clipboard?.writeText(text).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 1400)
        })
      }
      className="cursor-pointer rounded-md border px-2 py-1 font-mono text-[10px] transition-colors hover:text-[var(--site-fg)]"
      style={{ borderColor: 'var(--site-border)', background: 'var(--site-surface)', color: copied ? 'var(--site-accent)' : 'var(--site-muted)' }}
    >
      {copied ? 'Copied' : label}
    </button>
  )
}
