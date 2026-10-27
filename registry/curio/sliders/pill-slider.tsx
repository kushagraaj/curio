'use client'

import { useState } from 'react'
import { sliderAria, sliderKeys, useTrackDrag, type SliderProps } from '../lib/slider'

// a tiny bar that swells on hover, fills as you drag and stretches past the ends
export function PillSlider(props: SliderProps & { width?: number }) {
  const { options, value, onChange, width = 72 } = props
  const count = options.length
  const [hover, setHover] = useState(false)
  const { ref, dragging, overshoot, handlers } = useTrackDrag(width, count, onChange)
  const open = hover || dragging
  const stretch = 1 + Math.min(Math.abs(overshoot), 40) / 260

  return (
    <div
      ref={ref}
      {...sliderAria(props)}
      onKeyDown={sliderKeys(value, count, onChange)}
      {...handlers}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className="relative flex h-7 cursor-grab touch-none select-none items-center outline-none active:cursor-grabbing"
      style={{ width }}
    >
      <div
        className="relative w-full overflow-hidden rounded-full"
        style={{
          height: open ? 18 : 6,
          background: 'var(--curio-chip)',
          transform: `scaleX(${stretch}) scaleY(${2 - stretch})`,
          transformOrigin: overshoot < 0 ? 'right' : 'left',
          transition: dragging && overshoot ? 'height 200ms ease' : 'height 220ms cubic-bezier(.23,1,.32,1), transform 400ms cubic-bezier(.34,1.56,.64,1)',
        }}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${(value / (count - 1)) * 100}%`,
            minWidth: open ? 18 : 6,
            background: open ? 'var(--curio-accent)' : 'var(--curio-fg)',
            transition: 'width 280ms cubic-bezier(.23,1,.32,1), background-color 150ms',
          }}
        />
        {options.slice(1, -1).map((_, j) => {
          const i = j + 1
          return (
            <span
              key={i}
              className="absolute top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity"
              style={{ left: `${(i / (count - 1)) * 100}%`, background: 'var(--curio-muted)', opacity: open && i !== value ? 0.6 : 0 }}
            />
          )
        })}
      </div>
    </div>
  )
}
