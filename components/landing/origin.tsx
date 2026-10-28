import Image, { type StaticImageData } from 'next/image'
import imperato from '@/public/img/imperato.jpg'
import worm from '@/public/img/museum-wormianum.jpg'
import drawer from '@/public/img/specimen-drawer.jpg'

const PICTURES: { src: StaticImageData; alt: string; caption: string; wide?: boolean; className?: string }[] = [
  {
    src: worm,
    alt: 'Engraving of Ole Worm’s museum: a long room with stuffed animals hanging from the ceiling and shelves of labelled boxes',
    caption: 'Copenhagen, 1655',
    wide: true,
  },
  {
    src: imperato,
    alt: 'Engraving of Ferrante Imperato’s museum in Naples: a vaulted room with a crocodile on the ceiling and visitors at the shelves',
    caption: 'Naples, 1599',
  },
  {
    src: drawer,
    alt: 'A museum drawer of pinned hawkmoths in rows, with small typed labels',
    caption: 'A specimen drawer',
    className: 'object-top grayscale',
  },
]

export function Origin() {
  return (
    <section className="l-wrap grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-6" aria-labelledby="origin-title">
      <div className="lg:col-span-4">
        <h2 id="origin-title" data-reveal className="l-head">
          Rooms full
          <br />
          of curios
        </h2>
        <p data-reveal className="mt-5 max-w-[32ch]" style={{ '--d': 1 } as React.CSSProperties}>
          Named after the cabinets of curiosities of the 1600s, where every small, strange thing had a labelled shelf.
        </p>
      </div>
      <div data-reveal className="grid grid-cols-3 gap-2 lg:col-span-8 lg:grid-cols-[2fr_1fr_1fr] lg:gap-3" style={{ '--d': 2 } as React.CSSProperties}>
        {PICTURES.map((p) => (
          <figure key={p.caption} className="min-w-0">
            <div className="aspect-square overflow-hidden lg:aspect-auto lg:h-[340px]" style={{ background: 'var(--l-surface)' }}>
              <Image
                src={p.src}
                alt={p.alt}
                sizes={p.wide ? '(min-width: 1024px) 34vw, 33vw' : '(min-width: 1024px) 17vw, 33vw'}
                className={`h-full w-full object-cover ${p.wide ? 'l-drift' : ''} ${p.className ?? ''}`}
              />
            </div>
            <figcaption className="l-small mt-2 truncate" style={{ color: 'var(--l-muted)' }}>
              {p.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
