import type { Metadata } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { themeScript } from '@/components/site-theme'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })
const instrument = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-instrument', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Curio — small, delightful components', template: '%s · Curio' },
  description: 'A cabinet of small, delightful React components for personal sites: music players, maps, theme sliders, project layouts and more.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${instrument.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">
        <SiteHeader />
        {children}
        <footer className="mt-24 border-t" style={{ borderColor: 'var(--site-border)' }}>
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-xs sm:flex-row sm:justify-between" style={{ color: 'var(--site-muted)' }}>
            <span>Curio · a cabinet of small things for the web</span>
            <span>Made by Kushagra · map tiles © Esri</span>
          </div>
        </footer>
      </body>
    </html>
  )
}
