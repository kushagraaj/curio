import Image from 'next/image'
import imperato from '@/public/img/imperato.jpg'
import worm from '@/public/img/museum-wormianum.jpg'
import drawer from '@/public/img/specimen-drawer.jpg'

export function Origin() {
  return (
    <section className="l-wrap grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6" aria-labelledby="origin-title">
      <div className="flex flex-col lg:col-span-4">
        <h2 id="origin-title" data-reveal className="l-head">
          Rooms full
          <br />
          of curios
        </h2>
        <p data-reveal className="mt-6 max-w-[34ch]" style={{ '--d': 1 } as React.CSSProperties}>
          Collectors in the 1600s kept shells, antlers and minerals in cabinets of curiosities, every object on a labelled shelf. Curio keeps small
          things for the web the same way: each in its drawer, each with its label.
        </p>
        <div data-reveal className="mt-8 grid max-w-[560px] grid-cols-2 gap-3 lg:mt-auto" style={{ '--d': 2 } as React.CSSProperties}>
          <figure>
            <div className="aspect-square overflow-hidden" style={{ background: 'var(--l-surface)' }}>
              <Image src={imperato} alt="Engraving of Ferrante Imperato’s museum in Naples: a vaulted room with a crocodile and fish on the ceiling and visitors pointing at the shelves" sizes="(min-width: 768px) 16vw, 50vw" className="h-full w-full object-cover" />
            </div>
            <figcaption className="l-small mt-2" style={{ color: 'var(--l-muted)' }}>
              Imperato’s museum, Naples, 1599
            </figcaption>
          </figure>
          <figure>
            <div className="aspect-square overflow-hidden" style={{ background: 'var(--l-surface)' }}>
              <Image src={drawer} alt="A museum drawer of pinned hawkmoths in rows, with small typed labels for where each was found" sizes="(min-width: 768px) 16vw, 50vw" className="h-full w-full object-cover object-top grayscale" />
            </div>
            <figcaption className="l-small mt-2" style={{ color: 'var(--l-muted)' }}>
              A labelled specimen drawer
            </figcaption>
          </figure>
        </div>
      </div>
      <figure data-reveal className="lg:col-span-8" style={{ '--d': 1 } as React.CSSProperties}>
        <div className="overflow-hidden" style={{ background: 'var(--l-surface)' }}>
          <Image
            src={worm}
            alt="Engraving of Ole Worm’s museum: a long room with stuffed animals hanging from the ceiling and shelves of labelled boxes of shells and minerals"
            sizes="(min-width: 768px) 66vw, 100vw"
            loading="eager"
            className="l-drift h-auto w-full"
          />
        </div>
        <figcaption className="l-small mt-3" style={{ color: 'var(--l-muted)' }}>
          Ole Worm’s cabinet, Copenhagen, 1655
        </figcaption>
      </figure>
    </section>
  )
}
