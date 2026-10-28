'use client'

import { useEffect, useState } from 'react'

// reads and sets the site theme (data-theme on <html>, remembered in localStorage)
export function useSiteDark() {
  const [dark, setDark] = useState(true)
  useEffect(() => {
    const read = () => setDark(document.documentElement.dataset.theme === 'dark')
    read()
    const mo = new MutationObserver(read)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => mo.disconnect()
  }, [])
  const set = (next: boolean) => {
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
    try {
      localStorage.setItem('curio-theme', next ? 'dark' : 'light')
    } catch {}
    setDark(next)
  }
  return [dark, set] as const
}
