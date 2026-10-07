import { motion } from 'framer-motion'
import { islands } from '../data/islands'
import { islandShapes, viewBoxOf } from '../data/islandShapes'

// Map slug → uploaded silhouette image (no-background PNG)
const NAV_IMAGES = {
  'sumatra':       '/images/islands-nav/sumatra-silhouette.png',
  'jawa':          '/images/islands-nav/jawa-silhouette.png',
  'kalimantan':    '/images/islands-nav/kalimantan-silhouette.png',
  'sulawesi':      '/images/islands-nav/sulawesi-silhouette.png',
  'papua':         '/images/islands-nav/papua-silhouette.png',
  'bali':          '/images/islands-nav/bali-silhouette.png',
  'nusa-tenggara': '/images/islands-nav/nusa-tenggara-silhouette.png',
}

// Tablist: panah kiri/kanan memindah pulau; garis aktif berpindah (layoutId). Di ponsel dapat digeser.
export default function IslandNavigation({ active, onChange }) {
  const onKey = (e) => {
    const i = islands.findIndex(x => x.slug === active)
    const n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? islands.length - 1 : null
    if (n === null) return
    e.preventDefault(); const t = islands[(n + islands.length) % islands.length]; onChange(t.slug)
    requestAnimationFrame(() => document.getElementById('tab-' + t.slug)?.focus())
  }
  return (
    <div className="sticky top-14 z-30 bg-paper/95 border-b border-rule">
      <div role="tablist" aria-label="Pilih pulau" onKeyDown={onKey} className="mx-auto max-w-[1440px] px-3 md:px-9 flex overflow-x-auto snap-x [scrollbar-width:none]">
        {islands.map(i => {
          const on = i.slug === active
          const imgSrc = NAV_IMAGES[i.slug]
          const shape = islandShapes.find(s => s.slug === i.slug)
          return (
            <button key={i.slug} id={'tab-' + i.slug} role="tab" aria-selected={on} aria-controls="island-panel" tabIndex={on ? 0 : -1} onClick={() => onChange(i.slug)}
              className={`relative snap-start flex-1 min-w-[96px] flex flex-col items-center gap-2 py-4 bg-transparent border-0 cursor-pointer border-l border-rule first:border-l-0 transition-colors ${on ? 'text-ink' : 'text-ink-soft hover:text-ink'}`}>
              {imgSrc
                ? <img src={imgSrc} alt={i.name} aria-hidden="true"
                    className={`object-contain transition-transform duration-200 ${
                      i.slug === 'bali' 
                        ? 'h-9 w-auto max-w-[56px] scale-125' 
                        : i.slug === 'nusa-tenggara'
                        ? 'h-8 w-auto max-w-[70px] scale-110'
                        : 'h-8 w-auto max-w-[52px]'
                    }`}
                    style={{ filter: on ? 'none' : 'opacity(0.45) grayscale(0.3)' }} />
                : shape && (
                    <svg viewBox={viewBoxOf(shape.d)} className="h-7 w-auto max-w-[44px]" fill="currentColor" aria-hidden="true">
                      <path d={shape.d} />
                    </svg>
                  )
              }
              <span className={`text-[11px] tracking-wider uppercase ${on ? 'font-normal' : ''}`}>{i.name}</span>
              {on && <motion.span layoutId="islandUnderline" className="absolute left-3 right-3 -bottom-px h-[2px] bg-clay" transition={{ type:'spring', stiffness:380, damping:34 }} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

