'use client'

import { useState } from 'react'
import { sliderAria, sliderKeys, useTrackDrag, type SliderProps } from '../lib/slider'

// a thin bar painted with every option's colour; the thumb shows a label
export function GradientSlider(props: SliderProps & { width?: number }) {
  const { options, value, onChange, width = 120 } = props
  const count = options.length
  const { ref, dragging, handlers } = useTrackDrag(width, count, onChange)
  const [hover, setHover] = useState(false)
  const stops = options.map((o, i) => `${o.swatch ?? 'var(--curio-chip)'} ${(i / (count - 1)) * 100}%`).join(', ')
  const left = `${(value / (count - 1)) * 100}%`
  const ease = 'cubic-bezier(.23,1,.32,1)'

  return (
    <div
      ref={ref}
      {...sliderAria(props)}
      onKeyDown={sliderKeys(value, count, onChange)}
      {...handlers}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className="relative flex h-8 cursor-pointer touch-none select-none items-center outline-none"
      style={{ width }}
    >
      <div className="h-[6px] w-full rounded-full border" style={{ background: `linear-gradient(90deg, ${stops})`, borderColor: 'var(--curio-border)' }} />
      <span
        className="absolute top-1/2 h-[14px] w-[14px] rounded-full border-2 shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
        style={{
          left,
          background: options[value]?.swatch ?? 'var(--curio-surface)',
          borderColor: 'var(--curio-accent)',
          transform: `translate(-50%, -50%) scale(${dragging ? 1.25 : 1})`,
          transition: `left 280ms ${ease}, transform 200ms`,
        }}
      />
      <span
        className="pointer-events-none absolute -top-5 -translate-x-1/2 px-1.5 py-0.5 text-[11px]"
        style={{
          left,
          background: 'var(--curio-fg)',
          color: 'var(--curio-bg)',
          opacity: dragging || hover ? 1 : 0,
          transition: `left 280ms ${ease}, opacity 150ms`,
        }}
      >
        {options[value]?.label}
      </span>
    </div>
  )
}
