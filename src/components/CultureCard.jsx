import { forwardRef } from 'react'
import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import ImageSlot from './ImageSlot'
const CultureCard = forwardRef(function CultureCard({ culture: c }, ref) {
  return (
    <motion.li ref={ref} layout initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} transition={{ duration:.45, ease:[.22,1,.36,1] }}
      className="snap-start shrink-0 w-[44%] sm:w-[31%] list-none">
      <Link to="/culture/$slug" params={{ slug:c.slug }} className="group block no-underline">
        <div className="aspect-[4/3] overflow-hidden"><ImageSlot src={c.src} alt={c.title} className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.06]" /></div>
        <p className="text-xs font-normal mt-2 mb-0 transition-transform duration-300 group-hover:translate-x-1">{c.title}</p>
        <p className="text-[11px] text-ink-soft m-0">{c.category}</p>
      </Link>
    </motion.li>
  )
})
export default CultureCard
