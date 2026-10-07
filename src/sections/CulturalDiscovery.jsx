import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import ImageSlot from '../components/ImageSlot'
import SectionLabel from '../components/SectionLabel'
import { cultures } from '../data/cultures'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const tiles = [
  { slug:'batik', cls:'col-span-2 row-span-2 md:col-span-6', color:true, speed: 0.15 },
  { slug:'candi-borobudur', cls:'col-span-2 md:col-span-8', speed: -0.12 },
  { slug:'sate-lilit', cls:'md:col-span-6', color:true, speed: 0.18 },
  { slug:'tari-piring', cls:'md:col-span-4', speed: -0.1 },
  { slug:'raja-ampat', cls:'md:col-span-5', color:true, speed: 0.22 },
  { slug:'angklung', cls:'md:col-span-5', speed: -0.15 },
]

export default function CulturalDiscovery() {
  const root = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      // 1. Reveal bertahap dengan skew dan scale saat scroll
      gsap.fromTo('[data-tile]',
        { y: 80, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 80%',
          }
        }
      )

      // 2. Powerful Lenis Parallax per tile gambar: gambar bergerak di dalam kotaknya secara kinetik
      gsap.utils.toArray('[data-tile-img]').forEach((img, i) => {
        const factor = (i % 2 === 0 ? 1 : -1) * 16
        gsap.fromTo(img,
          { yPercent: -factor, scale: 1.15 },
          {
            yPercent: factor,
            scale: 1.15,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('[data-tile]'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1, // Kinetik Lenis scrub murni
            }
          }
        )
      })
    }, root)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="cultures" ref={root} className="mx-auto max-w-[1440px] px-6 md:px-9 py-20 md:py-32 overflow-hidden">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-12">
        <div>
          <SectionLabel>Cultural Discovery</SectionLabel>
          <h2 className="text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.05] text-clay">
            Jelajahi<br />Setiap Keunikan
          </h2>
        </div>
        <div className="md:max-w-[280px]">
          <p className="font-text text-sm leading-relaxed text-ink-soft m-0">
            Setiap budaya memiliki cerita, setiap cerita adalah denyut peradaban yang membentuk identitas bangsa.
          </p>
          <div className="w-8 h-px bg-clay/50 mt-4" />
        </div>
      </div>

      <div className="gallery grid grid-cols-2 auto-rows-[46vw] gap-2 md:grid-cols-[repeat(20,minmax(0,1fr))] md:grid-rows-2 md:auto-rows-auto md:h-[min(48vw,680px)]">
        {tiles.map(t => {
          const c = cultures.find(x => x.slug === t.slug)
          return (
            <div key={t.slug} data-tile className={`${t.cls} rounded-2xl overflow-hidden shadow-sm`}>
              <Link to="/culture/$slug" params={{ slug:c.slug }} className="tile group relative block w-full h-full overflow-hidden no-underline text-paper">
                <div data-tile-img className="absolute inset-0 w-full h-full will-change-transform">
                  <ImageSlot src={c.src} alt={c.title} color={t.color} className="w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute left-5 bottom-5 right-14 z-10">
                  <p className="text-base font-serif font-normal m-0 tracking-wide text-paper">{c.title}</p>
                  <p className="text-xs opacity-85 m-0 text-amber-200/90 mt-0.5">{c.category}, {c.place}</p>
                </div>
                <span className="absolute right-5 bottom-5 size-9 rounded-full border border-paper/60 backdrop-blur-sm grid place-items-center transition-colors duration-300 group-hover:bg-paper group-hover:text-ink z-10">
                  <ArrowUpRight size={15} strokeWidth={1.6} className="transition-transform duration-300 group-hover:rotate-12" />
                </span>
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
