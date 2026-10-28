import fs from 'node:fs'
import path from 'node:path'
import registry from '@/registry.json'
import { Cabinet, type CabinetItem } from '@/components/landing/cabinet'
import { Drawers } from '@/components/landing/drawers'
import { Hero } from '@/components/landing/hero'
import { OpenCabinet } from '@/components/landing/open-cabinet'
import { Origin } from '@/components/landing/origin'
import { Proofs } from '@/components/landing/proofs'
import { Reveal } from '@/components/landing/reveal'
import { Stages } from '@/components/landing/stages'
import { TileFooter } from '@/components/landing/tile-footer'
import { ITEMS, SITE_URL } from '@/lib/catalog'

const root = process.cwd()
const countLines = (file: string) => fs.readFileSync(path.join(root, file), 'utf8').trimEnd().split('\n').length

export default function Home() {
  const items: CabinetItem[] = ITEMS.map((item) => ({ ...item, lines: item.files.reduce((n, f) => n + countLines(f.path), 0) }))

  // what the cli prints when you add the record player for the first time
  const base = registry.items.find((i) => i.name === 'curio-base')!
  const record = registry.items.find((i) => i.name === 'record-player')!
  const created = [...base.files, ...record.files].map((f) => f.target)

  const llms = fs
    .readFileSync(path.join(root, 'public/llms.txt'), 'utf8')
    .split('\n')
    .filter((l) => l.startsWith('- ['))
    .slice(0, 4)
    .map((l) => l.replace(/^- \[(.+?)\]\(.+?\): /, '$1: ').replace(/ Install: .*/, ''))
    .join('\n')

  return (
    <div className="landing">
      <Reveal />
      <Hero />
      <main className="flex flex-col gap-[clamp(96px,12vw,200px)]">
        <Drawers />
        <Origin />
        <Cabinet items={items} />
        <Stages url={SITE_URL} files={created} />
        <Proofs llms={`# curio\n\n${llms}`} />
        <OpenCabinet />
      </main>
      <TileFooter />
    </div>
  )
}
