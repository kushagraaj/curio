'use client'

import { useEffect, useRef, useState } from 'react'

// lays a piece out at its design width, then scales it to fit the tile
export function Scaled({ width, children }: { width: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const el = ref.current!
    const ro = new ResizeObserver(([e]) => setScale(Math.min(1, e.contentRect.width / width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])
  return (
    <div ref={ref} className="flex h-full w-full items-center justify-center overflow-hidden">
      <div className="shrink-0" style={{ width, transform: `scale(${scale})`, transformOrigin: 'center' }}>
        {children}
      </div>
    </div>
  )
}
