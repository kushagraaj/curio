'use client'

import { useRef, useState } from 'react'
import type { ThemeOption } from './types'

export type SliderProps = {
  options: ThemeOption[]
  value: number
  onChange: (index: number) => void
  /** accessible name */
  label?: string
}

export const clampTo = (n: number, count: number) => Math.max(0, Math.min(count - 1, n))

// arrow keys / home / end
export function sliderKeys(value: number, count: number, onChange: (i: number) => void) {
  return (e: React.KeyboardEvent) => {
    const next =
      e.key === 'ArrowRight' || e.key === 'ArrowUp'
        ? value + 1
        : e.key === 'ArrowLeft' || e.key === 'ArrowDown'
          ? value - 1
          : e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? count - 1
              : null
    if (next === null) return
    e.preventDefault()
    onChange(clampTo(next, count))
  }
}

export function sliderAria({ options, value, label = 'Theme' }: SliderProps) {
  return {
    role: 'slider' as const,
    tabIndex: 0,
    'aria-label': label,
    'aria-valuemin': 0,
    'aria-valuemax': options.length - 1,
    'aria-valuenow': value,
    'aria-valuetext': options[value]?.label,
  }
}

// drag along x; reports the nearest step and how far past either end you pulled
export function useTrackDrag(width: number, count: number, onStep: (i: number) => void) {
  const ref = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const [overshoot, setOvershoot] = useState(0)

  const update = (clientX: number) => {
    const rect = ref.current!.getBoundingClientRect()
    const x = clientX - rect.left
    setOvershoot(x < 0 ? x : x > width ? x - width : 0)
    onStep(clampTo(Math.round((x / width) * (count - 1)), count))
  }
  const stop = () => {
    setDragging(false)
    setOvershoot(0)
  }
  return {
    ref,
    dragging,
    overshoot,
    handlers: {
      onPointerDown: (e: React.PointerEvent) => {
        ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
        setDragging(true)
        update(e.clientX)
      },
      onPointerMove: (e: React.PointerEvent) => dragging && update(e.clientX),
      onPointerUp: stop,
      onPointerCancel: stop,
    },
  }
}
