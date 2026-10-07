import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, BookOpen, ChevronDown, ChevronUp, Layers, MapPin } from 'lucide-react'
import ImageSlot from '../components/ImageSlot'
import Ornament from '../components/Ornament'
import { featured as f } from '../data/featured'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { scrollToId } from '../lib/lenis'
import { parallax, staggerIn } from '../animations/reveal'
import { wipeDown } from '../animations/paperTransition'
gsap.registerPlugin(ScrollTrigger)
const icons = { origin:MapPin, material:Layers, meaning:BookOpen }
export default function CultureDetail() {
  const [i, setI] = useState(0), root = useRef(null), reduced = useReducedMotion(), n = f.gallery.length
  const go = (k) => setI((k + n) % n)
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      parallax('[data-detail-img]', root.current, 5)
      staggerIn('[data-detail-info] > *', root.current)
    }, root)
    return () => ctx.revert()
  }, [reduced])
  const onKey = (e) => { if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); go(i + 1) } if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1) } }
  return (
    <section ref={root} aria-label={`${f.title}, sorotan budaya`} className="bg-paper-deep/60 border-y border-rule">
      <div className="mx-auto max-w-[1440px] px-6 md:px-9 py-14 md:py-20 grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_auto] gap-8 lg:gap-10 items-start">
        <div className="relative lg:pl-12 order-1">
          <div className="hidden lg:block absolute left-0 top-0 w-7 h-[80%] bg-clay" />
          <Ornament className="hidden lg:block absolute left-0 bottom-0 w-7 h-[18%]" />
          <div className="relative aspect-[4/3] overflow-hidden bg-ink">
            <div data-detail-img className="absolute inset-x-0 -top-[6%] h-[112%]">
              <AnimatePresence initial={false}>
                <motion.div key={i} className="absolute inset-0" {...wipeDown(reduced ? 0 : .9)}>
                  <ImageSlot src={f.gallery[i].src} alt={f.gallery[i].alt} className="w-full h-full" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div data-detail-info className="order-3 lg:order-2 min-w-0">
          <button type="button" onClick={() => scrollToId('cultures')} className="inline-flex items-center gap-2 bg-transparent border-0 p-0 text-xs text-ink-soft cursor-pointer hover:text-ink"><ArrowLeft size={13} strokeWidth={1.5} /> Kembali</button>
          <h3 className="text-2xl md:text-3xl tracking-[.06em] mt-4">{f.title}</h3>
          <p className="text-xs text-ink-soft mt-1 mb-4">{f.place}, {f.kind}</p>
          <p className="font-text text-[13px] leading-[1.8] text-ink-soft m-0">{f.description}</p>
          <dl className="m-0 mt-5 grid gap-3">
            {f.meta.map(m => { const Icon = icons[m.icon]; return (
              <div key={m.label} className="grid grid-cols-[1.25rem_5.5rem_1fr] items-start gap-2 text-xs">
                <Icon size={14} strokeWidth={1.4} className="mt-px text-clay" /><dt className="font-normal">{m.label}</dt><dd className="m-0 text-ink-soft">{m.value}</dd>
              </div>) })}
          </dl>
          <button type="button" onClick={() => scrollToId('islands')} className="mt-7 inline-flex items-center gap-2 bg-clay text-paper rounded-full border-0 px-5 py-2.5 text-xs cursor-pointer">Jelajahi Budaya Lainnya <ArrowRight size={13} strokeWidth={1.5} /></button>
        </div>
        <div className="order-2 lg:order-3 flex lg:flex-col items-center gap-2">
          <p className="hidden lg:block text-[11px] text-ink-soft m-0 mb-1" aria-live="polite">{i + 1} / {n}</p>
          <button type="button" aria-label="Foto sebelumnya" onClick={() => go(i - 1)} className="hidden lg:grid size-6 place-items-center bg-transparent border-0 cursor-pointer text-ink-soft hover:text-ink"><ChevronUp size={15} strokeWidth={1.5} /></button>
          <div role="tablist" aria-label="Galeri foto" aria-orientation="vertical" onKeyDown={onKey} className="flex lg:flex-col gap-2 overflow-x-auto">
            {f.gallery.map((g, k) => (
              <button key={k} role="tab" aria-selected={k === i} aria-label={`Foto ${k + 1}: ${g.alt}`} tabIndex={k === i ? 0 : -1} onClick={() => setI(k)}
                className={`shrink-0 w-16 h-12 lg:w-14 lg:h-11 p-0 border cursor-pointer overflow-hidden transition-opacity ${k === i ? 'border-clay opacity-100' : 'border-transparent opacity-55 hover:opacity-90'}`}>
                <ImageSlot src={g.src} alt="" className="w-full h-full" />
              </button>
            ))}
          </div>
          <button type="button" aria-label="Foto berikutnya" onClick={() => go(i + 1)} className="hidden lg:grid size-6 place-items-center bg-transparent border-0 cursor-pointer text-ink-soft hover:text-ink"><ChevronDown size={15} strokeWidth={1.5} /></button>
        </div>
      </div>
    </section>
  )
}
