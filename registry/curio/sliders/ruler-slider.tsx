'use client'

import { useEffect, useRef, useState } from 'react'
import { clampTo, sliderAria, sliderKeys, type SliderProps } from '../lib/slider'

// drag a strip of tick marks under a fixed marker; tap either side to step
export function RulerSlider(props: SliderProps & { gap?: number; width?: number }) {
  const { options, value, onChange, gap = 44, width = 150 } = props
  const count = options.length
  const [drag, setDrag] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [settled, setSettled] = useState(false) // no slide-in on first render
  const startX = useRef(0)
  const startValue = useRef(0)

  useEffect(() => {
    const id = requestAnimationFrame(() => setSettled(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const offset = width / 2 - value * gap + drag
  const fade = 'linear-gradient(90deg, transparent, black 25%, black 75%, transparent)'

  return (
    <div
      {...sliderAria(props)}
      onKeyDown={sliderKeys(value, count, onChange)}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        startX.current = e.clientX
        startValue.current = value
        setDragging(true)
      }}
      onPointerMove={(e) => {
        if (!dragging) return
        const dx = e.clientX - startX.current
        const next = clampTo(startValue.current - Math.round(dx / gap), count)
        setDrag(dx + (next - startValue.current) * gap)
        if (next !== value) onChange(next)
      }}
      onPointerUp={(e) => {
        if (Math.abs(e.clientX - startX.current) < 4) {
          const rect = e.currentTarget.getBoundingClientRect()
          onChange(clampTo(value + (e.clientX - rect.left < width / 2 ? -1 : 1), count))
        }
        setDragging(false)
        setDrag(0)
      }}
      onPointerCancel={() => {
        setDragging(false)
        setDrag(0)
      }}
      className="relative h-10 shrink-0 cursor-grab touch-none select-none overflow-hidden outline-none active:cursor-grabbing"
      style={{ width, maskImage: fade, WebkitMaskImage: fade }}
    >
      <div
        className="absolute top-0 h-full"
        style={{ transform: `translateX(${offset}px)`, transition: dragging || !settled ? 'none' : 'transform 350ms cubic-bezier(.23,1,.32,1)' }}
      >
        {Array.from({ length: (count - 1) * 4 + 1 }, (_, i) => {
          const major = i % 4 === 0
          return (
            <span
              key={i}
              className="absolute top-1.5 w-px -translate-x-1/2"
              style={{ left: (i * gap) / 4, height: major ? 11 : 5, background: 'var(--curio-muted)', opacity: major ? 0.9 : 0.45 }}
            />
          )
        })}
        {options.map((o, i) => (
          <span
            key={o.label}
            className="absolute top-[22px] -translate-x-1/2 text-[11px] transition-colors"
            style={{ left: i * gap, color: i === value ? 'var(--curio-fg)' : 'var(--curio-muted)' }}
          >
            {o.label}
          </span>
        ))}
      </div>
      <span className="absolute left-1/2 top-0 h-[22px] w-[2px] -translate-x-1/2 rounded-full" style={{ background: 'var(--curio-accent)' }} />
    </div>
  )
}
