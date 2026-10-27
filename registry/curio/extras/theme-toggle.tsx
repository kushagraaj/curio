'use client'

import { useId } from 'react'
import { flushSync } from 'react-dom'

const EASE = 'cubic-bezier(.23,1,.32,1)'

// sun that morphs into a moon. with `reveal`, the new theme grows out of the
// button as a circle (view transitions api; falls back to an instant switch).
export function ThemeToggle({ dark, onChange, reveal = true }: { dark: boolean; onChange: (dark: boolean) => void; reveal?: boolean }) {
  const maskId = useId().replace(/:/g, '')

  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    const next = !dark
    const apply = () => flushSync(() => onChange(next))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reveal || reduced || !document.startViewTransition) return apply()

    const r = e.currentTarget.getBoundingClientRect()
    const x = r.left + r.width / 2
    const y = r.top + r.height / 2
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    document.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 550, easing: 'cubic-bezier(.65,0,.35,1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-colors"
      style={{ background: 'var(--curio-chip)', color: 'var(--curio-fg)' }}
    >
      <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" className="overflow-visible">
        <mask id={maskId}>
          <rect width="24" height="24" fill="white" />
          <circle r="7" fill="black" style={{ transform: dark ? 'translate(17px, 7px)' : 'translate(30px, -6px)', transition: `transform 400ms ${EASE}` }} />
        </mask>
        <circle cx="12" cy="12" fill="currentColor" mask={`url(#${maskId})`} style={{ r: dark ? 8.5 : 4.5, transition: `r 400ms ${EASE}` } as React.CSSProperties} />
        <g
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            opacity: dark ? 0 : 1,
            transform: dark ? 'rotate(-45deg) scale(0.5)' : 'none',
            transformOrigin: '12px 12px',
            transition: `opacity 250ms ease, transform 400ms ${EASE}`,
          }}
        >
          <path d="M12 1.5v2M12 20.5v2M1.5 12h2M20.5 12h2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M4.6 19.4 6 18M18 6l1.4-1.4" />
        </g>
      </svg>
    </button>
  )
}
