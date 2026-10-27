'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export type HoverCardItem = {
  id: string
  /** accessible name of the trigger */
  label: string
  /** what the trigger shows, usually an icon */
  trigger: React.ReactNode
  /** the card that opens */
  content: React.ReactNode
  href?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

type Box = { left: number; top: number; width: number; height: number }
const EASE = 'cubic-bezier(.23,1,.32,1)'

// a row of triggers sharing one card that slides and resizes between them
export function HoverCards({ items, className = '' }: { items: HoverCardItem[]; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const panels = useRef<Record<string, HTMLDivElement | null>>({})
  const closeTimer = useRef<number>(undefined)
  const resetTimer = useRef<number>(undefined)
  const [active, setActive] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [morph, setMorph] = useState(false)
  const [box, setBox] = useState<Box>({ left: 0, top: 0, width: 0, height: 0 })

  const show = useCallback(
    (id: string, trigger: HTMLElement) => {
      window.clearTimeout(closeTimer.current)
      window.clearTimeout(resetTimer.current)
      const wrap = wrapRef.current
      const panel = panels.current[id]
      if (!wrap || !panel) return
      const w = wrap.getBoundingClientRect()
      const t = trigger.getBoundingClientRect()
      const width = panel.offsetWidth
      const center = t.left - w.left + t.width / 2
      setMorph(active !== null)
      setBox({ left: Math.max(-8, center - width / 2), top: t.bottom - w.top + 8, width, height: panel.offsetHeight })
      setActive(id)
      setOpen(true)
    },
    [active],
  )

  const close = useCallback(() => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => {
      setOpen(false)
      resetTimer.current = window.setTimeout(() => setActive(null), 220)
    }, 90)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(closeTimer.current)
      window.clearTimeout(resetTimer.current)
    }
  }, [close])

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <div className="flex items-center gap-1">
        {items.map((it) => (
          <a
            key={it.id}
            href={it.href}
            target={it.href?.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            aria-label={it.label}
            onClick={it.onClick}
            onPointerEnter={(e) => e.pointerType !== 'touch' && show(it.id, e.currentTarget)}
            onPointerLeave={close}
            onFocus={(e) => show(it.id, e.currentTarget)}
            onBlur={close}
            className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-lg transition-colors"
            style={{
              color: open && active === it.id ? 'var(--curio-fg)' : 'var(--curio-muted)',
              background: open && active === it.id ? 'var(--curio-chip)' : 'transparent',
            }}
          >
            {it.trigger}
          </a>
        ))}
      </div>

      <div
        role="dialog"
        aria-hidden={!open}
        onPointerEnter={() => window.clearTimeout(closeTimer.current)}
        onPointerLeave={close}
        className="absolute z-30 overflow-hidden rounded-lg border shadow-[0_18px_40px_-12px_rgba(0,0,0,0.25)]"
        style={{
          ...box,
          background: 'var(--curio-surface)',
          borderColor: 'var(--curio-border)',
          color: 'var(--curio-fg)',
          opacity: open ? 1 : 0,
          filter: open ? 'blur(0px)' : 'blur(4px)',
          transform: open ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.97)',
          pointerEvents: open ? 'auto' : 'none',
          transition: morph
            ? `left 240ms ${EASE}, top 240ms ${EASE}, width 240ms ${EASE}, height 240ms ${EASE}, opacity 180ms ease, transform 200ms ${EASE}, filter 200ms ease`
            : `opacity 180ms ease, transform 200ms ${EASE}, filter 200ms ease`,
        }}
      >
        {items.map((it) => (
          <div
            key={it.id}
            ref={(el) => {
              panels.current[it.id] = el
            }}
            className="absolute left-0 top-0 transition-[opacity,filter] duration-200"
            style={{ opacity: active === it.id ? 1 : 0, filter: active === it.id ? 'blur(0px)' : 'blur(4px)', pointerEvents: active === it.id ? 'auto' : 'none' }}
          >
            {it.content}
          </div>
        ))}
      </div>
    </div>
  )
}
