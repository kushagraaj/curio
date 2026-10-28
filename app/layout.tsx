import type { Metadata } from 'next'
import { Geist, Geist_Mono, Instrument_Serif, Jost } from 'next/font/google'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { themeScript } from '@/components/site-theme'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })
const instrument = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-instrument', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })
const jost = Jost({ subsets: ['latin'], variable: '--font-jost', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Curio: small, delightful components', template: '%s · Curio' },
  description: 'A cabinet of small, delightful React components for personal sites: music players, maps, theme sliders, project layouts and more.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${instrument.variable} ${geistMono.variable} ${jost.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript + ";document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
