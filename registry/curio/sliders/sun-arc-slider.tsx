'use client'

import { useId, useRef, useState } from 'react'
import { clampTo, sliderAria, sliderKeys, type SliderProps } from '../lib/slider'

// drag the sun across the sky; it turns into a moon from `nightFrom` onwards
export function SunArcSlider(props: SliderProps & { nightFrom?: number }) {
  const { options, value, onChange } = props
  const count = options.length
  const nightFrom = props.nightFrom ?? Math.ceil(count / 2)
  const ref = useRef<SVGSVGElement>(null)
  const maskId = useId().replace(/:/g, '')
  const [dragging, setDragging] = useState(false)

  const W = 132
  const H = 66
  const cx = W / 2
  const cy = H - 8
  const r = 54
  const angleOf = (i: number) => Math.PI - (i / (count - 1)) * Math.PI
  const a = angleOf(value)
  const sx = cx + r * Math.cos(a)
  const sy = cy - r * Math.sin(a)
  const moon = value >= nightFrom

  const update = (e: React.PointerEvent) => {
    const rect = ref.current!.getBoundingClientRect()
    const x = e.clientX - rect.left - cx
    const y = cy - (e.clientY - rect.top)
    const ang = Math.atan2(Math.max(y, 0), x)
    onChange(clampTo(Math.round(((Math.PI - ang) / Math.PI) * (count - 1)), count))
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <svg
        ref={ref}
        width={W}
        height={H}
        {...sliderAria(props)}
        onKeyDown={sliderKeys(value, count, onChange)}
        onPointerDown={(e) => {
          ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
          setDragging(true)
          update(e)
        }}
        onPointerMove={(e) => dragging && update(e)}
        onPointerUp={() => setDragging(false)}
        className="cursor-grab touch-none select-none overflow-visible outline-none active:cursor-grabbing"
      >
        <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="var(--curio-border)" strokeDasharray="2 4" />
        <line x1={4} x2={W - 4} y1={cy} y2={cy} stroke="var(--curio-border)" />
        {options.map((_, i) => (
          <circle key={i} cx={cx + r * Math.cos(angleOf(i))} cy={cy - r * Math.sin(angleOf(i))} r={1.6} fill="var(--curio-muted)" />
        ))}
        <g style={{ transform: `translate(${sx}px, ${sy}px)`, transition: 'transform 380ms cubic-bezier(.23,1,.32,1)' }}>
          <mask id={maskId}>
            <rect x={-12} y={-12} width={24} height={24} fill="white" />
            <circle r={7} fill="black" style={{ transform: moon ? 'translate(4px,-3px)' : 'translate(14px,-12px)', transition: 'transform 380ms ease' }} />
          </mask>
          {!moon && (
            <g stroke="var(--curio-accent)" strokeWidth={1.6} strokeLinecap="round">
              {Array.from({ length: 8 }, (_, i) => {
                const t = (i / 8) * Math.PI * 2
                return <line key={i} x1={Math.cos(t) * 10} y1={Math.sin(t) * 10} x2={Math.cos(t) * 13} y2={Math.sin(t) * 13} />
              })}
            </g>
          )}
          <circle r={moon ? 8 : 6.5} fill="var(--curio-accent)" mask={`url(#${maskId})`} />
        </g>
      </svg>
      <span className="text-xs" style={{ color: 'var(--curio-muted)' }}>
        {options[value]?.label}
      </span>
    </div>
  )
}
