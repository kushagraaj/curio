'use client'

import { useEffect, useState } from 'react'
import { ThemeToggle } from '@/registry/curio/extras/theme-toggle'

export const themeScript = `try{var t=localStorage.getItem('curio-theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}`

export function SiteTheme() {
  const [dark, setDark] = useState<boolean | null>(null)
  useEffect(() => setDark(document.documentElement.dataset.theme === 'dark'), [])
  if (dark === null) return <span className="h-8 w-8" />
  return (
    <ThemeToggle
      dark={dark}
      onChange={(next) => {
        setDark(next)
        document.documentElement.dataset.theme = next ? 'dark' : 'light'
        try {
          localStorage.setItem('curio-theme', next ? 'dark' : 'light')
        } catch {}
      }}
    />
  )
}
