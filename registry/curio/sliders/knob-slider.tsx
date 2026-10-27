'use client'

import { useRef } from 'react'
import { clampTo, sliderAria, sliderKeys, type SliderProps } from '../lib/slider'

// a small dial: drag up/down, scroll, or click to turn
export function KnobSlider(props: SliderProps) {
  const { options, value, onChange } = props
  const count = options.length
  const startY = useRef<number | null>(null)
  const startValue = useRef(value)
  const moved = useRef(false)
  const deg = (i: number) => -100 + (i / (count - 1)) * 200

  return (
    <div className="flex items-center gap-3">
      <div
        {...sliderAria(props)}
        onKeyDown={sliderKeys(value, count, onChange)}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId)
          startY.current = e.clientY
          startValue.current = value
          moved.current = false
        }}
        onPointerMove={(e) => {
          if (startY.current === null) return
          const d = Math.round((startY.current - e.clientY) / 18)
          if (d !== 0) moved.current = true
          onChange(clampTo(startValue.current + d, count))
        }}
        onPointerUp={() => {
          if (!moved.current) onChange((value + 1) % count)
          startY.current = null
        }}
        onWheel={(e) => onChange(clampTo(value + (e.deltaY < 0 ? 1 : -1), count))}
        className="relative h-11 w-11 cursor-ns-resize touch-none select-none rounded-full outline-none"
      >
        {options.map((_, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 w-px"
            style={{
              transformOrigin: '50% 22px',
              transform: `translate(-50%, -22px) rotate(${deg(i)}deg)`,
              background: i === value ? 'var(--curio-accent)' : 'var(--curio-muted)',
              height: i === value ? 6 : 4,
            }}
          />
        ))}
        <span
          className="absolute inset-[7px] rounded-full border shadow-[inset_0_-2px_4px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.12)]"
          style={{
            background: 'var(--curio-surface)',
            borderColor: 'var(--curio-border)',
            transform: `rotate(${deg(value)}deg)`,
            transition: 'transform 320ms cubic-bezier(.34,1.56,.64,1)',
          }}
        >
          <span className="absolute left-1/2 top-[3px] h-[9px] w-[2px] -translate-x-1/2 rounded-full" style={{ background: 'var(--curio-accent)' }} />
        </span>
      </div>
      <span className="text-xs" style={{ color: 'var(--curio-muted)' }}>
        {options[value]?.label}
      </span>
    </div>
  )
}
