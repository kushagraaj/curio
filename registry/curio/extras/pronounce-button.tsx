'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  /** a recording of the name; preferred when available */
  src?: string
  /** spoken with the browser's voice when there's no recording */
  text?: string
  /** language for the spoken fallback, e.g. "en-US" */
  lang?: string
  label?: string
  size?: number
}

// speaker that plays how a name is said: a recording, or the browser's voice
export function PronounceButton({ src, text, lang, label = 'How to say my name', size = 15 }: Props) {
  const audio = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(
    () => () => {
      audio.current?.pause()
      if (typeof window !== 'undefined') window.speechSynthesis?.cancel()
    },
    [],
  )

  function play() {
    if (src) {
      if (!audio.current) {
        audio.current = new Audio(src)
        audio.current.addEventListener('ended', () => setPlaying(false))
        audio.current.addEventListener('pause', () => setPlaying(false))
      }
      audio.current.currentTime = 0
      audio.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false))
      return
    }
    if (text && window.speechSynthesis) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      if (lang) u.lang = lang
      u.rate = 0.9
      u.onend = () => setPlaying(false)
      u.onerror = () => setPlaying(false)
      setPlaying(true)
      window.speechSynthesis.speak(u)
    }
  }

  return (
    <button
      type="button"
      onClick={play}
      aria-label={label}
      className="inline-flex h-6 w-6 cursor-pointer items-center justify-center transition-colors hover:text-[var(--curio-accent)]"
      style={{ color: playing ? 'var(--curio-accent)' : 'var(--curio-muted)' }}
    >
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" />
        <path d="M15.5 8.5a5 5 0 0 1 0 7" className={playing ? 'curio-fade' : ''} />
        <path d="M18.5 5.5a9 9 0 0 1 0 13" className={playing ? 'curio-fade' : ''} style={{ animationDelay: '0.15s' }} />
      </svg>
    </button>
  )
}
