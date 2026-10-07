import { useEffect } from 'react'
import { Outlet, useNavigate } from '@tanstack/react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useLenis } from '../hooks/useLenis'
import { scrollToId } from '../lib/lenis'
export default function Layout() {
  useLenis()
  const navigate = useNavigate()
  useEffect(() => {
    const h = (e) => { navigate({ to:'/' }); setTimeout(() => scrollToId(e.detail), 500) }
    addEventListener('go-home', h); return () => removeEventListener('go-home', h)
  }, [navigate])
  return (<><a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:bg-paper focus:p-2">Lewati ke konten</a>
    <Navbar /><main id="main" className="pt-14"><Outlet /></main><Footer /></>)
}
