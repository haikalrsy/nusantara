import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import ImageSlot from '../components/ImageSlot'
import SectionLabel from '../components/SectionLabel'
import Ornament from '../components/Ornament'
import { livingCulture } from '../data/livingCulture'
import { cultures } from '../data/cultures'
export default function LivingCulture() {
  return (
    <section id="living" className="relative mx-auto max-w-[1440px] px-6 md:px-9 py-16 md:py-20">
      <Ornament className="hidden xl:block absolute -left-2 bottom-24 h-32 w-16" />
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
        <div><SectionLabel>Living Culture</SectionLabel><h2 className="text-[clamp(1.8rem,3.6vw,2.7rem)] text-clay">Budaya yang Masih Hidup</h2></div>
        <p className="font-text text-[13px] leading-relaxed text-ink-soft m-0 md:max-w-[220px]">Bukan hanya untuk dilihat, tetapi untuk dirasakan dan dilestarikan.</p>
      </div>
      <ul className="list-none p-0 m-0 flex gap-1 overflow-x-auto snap-x [scrollbar-width:none] md:overflow-visible md:h-[230px]">
        {livingCulture.map((l, k) => {
          const c = cultures.find(x => x.slug === l.slug)
          return (
            <li key={l.slug} className="living-item max-md:min-w-[72%] max-md:snap-start h-[220px] md:h-auto">
              <Link to="/culture/$slug" params={{ slug:l.slug }} className="group relative block w-full h-full overflow-hidden no-underline text-paper">
                <ImageSlot src={c?.src} alt={l.title} className="absolute inset-0 w-full h-full transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-black/10" />
                <div className="absolute left-4 bottom-4 right-14">
                  <p className="text-[11px] opacity-80 m-0">{String(k + 1).padStart(2, '0')}</p>
                  <p className="text-sm font-normal m-0">{l.title}</p>
                  <p className="text-[11px] opacity-80 m-0">{l.type}</p>
                </div>
                <span className="absolute right-4 bottom-4 size-8 rounded-full border border-paper/70 grid place-items-center transition-colors group-hover:bg-paper group-hover:text-ink"><ArrowUpRight size={14} strokeWidth={1.5} /></span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
