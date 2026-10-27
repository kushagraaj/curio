'use client'

import { useState } from 'react'
import { sliderAria, sliderKeys, type SliderProps } from '../lib/slider'

// tiny squares in each option's colours; they spread apart on hover
export function SwatchSlider(props: SliderProps) {
  const { options, value, onChange } = props
  const [hover, setHover] = useState<number | null>(null)
  const [open, setOpen] = useState(false)
  const shown = hover ?? value

  return (
    <div className="flex items-center gap-3">
      <div
        {...sliderAria(props)}
        onKeyDown={sliderKeys(value, options.length, onChange)}
        onPointerEnter={() => setOpen(true)}
        onPointerLeave={() => {
          setOpen(false)
          setHover(null)
        }}
        className="flex items-center outline-none transition-[gap] duration-300"
        style={{ gap: open ? 6 : 2 }}
      >
        {options.map((o, i) => {
          const accent = o.accent ?? 'var(--curio-accent)'
          return (
            <button
              key={o.label}
              type="button"
              tabIndex={-1}
              aria-label={o.label}
              onPointerEnter={() => setHover(i)}
              onClick={() => onChange(i)}
              className="relative h-4 w-4 cursor-pointer border transition-transform duration-200"
              style={{
                background: o.swatch ?? 'var(--curio-chip)',
                borderColor: i === value ? accent : 'var(--curio-border)',
                outline: i === value ? `1.5px solid ${accent}` : 'none',
                outlineOffset: 2,
                transform: hover === i ? 'translateY(-2px)' : 'none',
              }}
            >
              <span className="absolute bottom-[2px] right-[2px] h-[5px] w-[5px]" style={{ background: accent }} />
            </button>
          )
        })}
      </div>
      <span className="w-14 text-xs" style={{ color: 'var(--curio-muted)' }}>
        {options[shown]?.label}
      </span>
    </div>
  )
}
