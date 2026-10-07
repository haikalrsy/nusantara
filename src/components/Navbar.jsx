import { useEffect, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Search, Menu } from 'lucide-react'
import { scrollToId } from '../lib/lenis'
import MobileMenu from './MobileMenu'
import SearchDialog from './SearchDialog'
export const navItems = [
  { label:'Home', id:'home' }, { label:'Islands', id:'islands' },
  { label:'Cultures', id:'cultures' }, { label:'About', id:'about' },
]
export default function Navbar() {
  const path = useRouterState({ select: (st) => st.location.pathname })
  const [active, setActive] = useState('home'), [menu, setMenu] = useState(false), [search, setSearch] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin:'-45% 0px -50% 0px' })
    navItems.forEach(n => { const el = document.getElementById(n.id); el && io.observe(el) })
    return () => io.disconnect()
  }, [path])
  const go = (id) => (e) => { e.preventDefault(); history.replaceState(null, '', '#' + id); scrollToId(id) }
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-paper/85 backdrop-blur-[2px]">
      <div className="mx-auto max-w-[1440px] h-14 px-6 md:px-9 grid grid-cols-[1fr_auto_1fr] items-center">
        <Link to="/" className="font-serif text-lg tracking-wide no-underline">NUSANTARA</Link>
        <nav aria-label="Utama" className="hidden md:flex gap-10 text-[13px]">
          {navItems.map(n => (
            <a key={n.id} href={'#' + n.id} onClick={go(n.id)} aria-current={active === n.id ? 'true' : undefined}
              className={`no-underline pb-1 border-b ${active === n.id ? 'border-ink font-normal' : 'border-transparent text-ink-soft'} transition-colors`}>{n.label}</a>
          ))}
        </nav>
        <div className="flex justify-end gap-5">
          <button aria-label="Cari budaya" onClick={() => setSearch(true)} className="bg-transparent border-0 p-1 cursor-pointer"><Search size={16} strokeWidth={1.5} /></button>
          <button aria-label="Buka menu" onClick={() => setMenu(true)} className="md:hidden bg-transparent border-0 p-1 cursor-pointer"><Menu size={18} strokeWidth={1.5} /></button>
        </div>
      </div>
      <div className="h-px bg-rule" />
      <MobileMenu open={menu} onClose={() => setMenu(false)} onGo={(id) => { setMenu(false); setTimeout(() => scrollToId(id), 350) }} />
      <SearchDialog open={search} onClose={() => setSearch(false)} />
    </header>
  )
}
