'use client'

import { useState } from 'react'
import { ITEMS, SITE_URL } from '@/lib/catalog'

const RUNNERS = { npm: 'npx shadcn@latest add', pnpm: 'pnpm dlx shadcn@latest add' }
type Runner = keyof typeof RUNNERS

export function OpenCabinet() {
  const [name, setName] = useState('record-player')
  const [runner, setRunner] = useState<Runner>('npm')
  const [copied, setCopied] = useState(false)
  const known = ITEMS.some((i) => i.name === name.trim())
  const cmd = `${RUNNERS[runner]} ${SITE_URL}/r/${name.trim() || 'record-player'}.json`

  return (
    <section
      className="l-wrap grid min-h-[90svh] grid-cols-1 content-between gap-12 py-14 lg:grid-cols-12 lg:content-center lg:gap-6 lg:py-20"
      style={{ background: 'var(--l-accent)', color: 'var(--l-accent-ink)' }}
      aria-labelledby="open-title"
    >
      <div className="lg:col-span-6 lg:self-end">
        <h2 id="open-title" data-reveal className="l-display">
          Open the
          <br />
          cabinet
        </h2>
        <p data-reveal className="mt-6 max-w-[36ch]" style={{ '--d': 1 } as React.CSSProperties}>
          Pick a piece and copy its command. It lands in components/curio as plain code you own, ready to change.
        </p>
      </div>

      <form
        data-ui
        data-reveal
        onSubmit={async (e) => {
          e.preventDefault()
          try {
            await navigator.clipboard.writeText(cmd)
            setCopied(true)
            setTimeout(() => setCopied(false), 1600)
          } catch {}
        }}
        className="w-full max-w-[440px] justify-self-start rounded-xl p-6 lg:col-span-5 lg:col-start-8 lg:self-center lg:justify-self-center"
        style={{ '--d': 2, background: '#ffffff', color: '#09090b', boxShadow: '0 24px 60px -12px rgba(0,0,0,.45)' } as React.CSSProperties}
      >
        <div className="text-[17px] font-medium">Add a component</div>
        <label className="mt-5 block text-[13px]" htmlFor="piece" style={{ color: '#52525b' }}>
          Component
        </label>
        <input
          id="piece"
          list="pieces"
          value={name}
          onChange={(e) => setName(e.target.value)}
          spellCheck={false}
          className="mt-1.5 h-11 w-full rounded-md border px-3 text-[15px] outline-none focus:border-[#09090b]"
          style={{ borderColor: '#d4d4d8' }}
        />
        <datalist id="pieces">
          {ITEMS.map((i) => (
            <option key={i.name} value={i.name}>
              {i.title}
            </option>
          ))}
        </datalist>
        {!known && name.trim() ? (
          <div className="mt-1.5 text-[13px]" style={{ color: '#b11226' }}>
            Not in the cabinet yet. Pick one from the list.
          </div>
        ) : null}

        <div className="mt-5 text-[13px]" style={{ color: '#52525b' }}>
          Package manager
        </div>
        <div role="radiogroup" aria-label="Package manager" className="mt-1.5 grid grid-cols-2 rounded-md p-1" style={{ background: '#f4f4f5' }}>
          {(Object.keys(RUNNERS) as Runner[]).map((r) => (
            <button
              key={r}
              type="button"
              role="radio"
              aria-checked={runner === r}
              onClick={() => setRunner(r)}
              className="h-9 rounded text-[14px] transition-colors"
              style={runner === r ? { background: '#ffffff', color: '#09090b' } : { color: '#52525b' }}
            >
              {r}
            </button>
          ))}
        </div>

        <code className="mt-5 block break-all rounded-md p-3 text-[13px] leading-[1.6]" style={{ background: '#f4f4f5' }}>
          {cmd}
        </code>
        <button
          type="submit"
          disabled={!known}
          className="mt-5 h-[52px] w-full rounded-md text-[15px] font-medium transition-transform active:scale-[0.98] disabled:opacity-40"
          style={{ background: '#09090b', color: '#ffffff' }}
        >
          {copied ? 'Copied' : 'Copy command'}
        </button>
      </form>
    </section>
  )
}
