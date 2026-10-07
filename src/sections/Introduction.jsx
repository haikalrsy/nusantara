import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Landmark, Sparkles } from 'lucide-react'
import Ornament from '../components/Ornament'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const Line = ({ children }) => (
  <span className="block overflow-hidden">
    <span data-line className="block">{children}</span>
  </span>
)

export default function Introduction() {
  const root = useRef(null)
  const statueRef = useRef(null)
  const textBgLeftRef = useRef(null)
  const textBgRightRef = useRef(null)
  const cardRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      // 1. Text reveal tajam & bertenaga
      gsap.from('[data-line]', {
        yPercent: 125,
        rotateX: -25,
        opacity: 0,
        duration: 1.4,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
        }
      })

      // 2. ANIMASI PATUNG RAKSASA LENIS SCRUB:
      // Skala masif, rotasi 3D dan mengambang tembus layar mengikuti scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1, // Sinkronisasi super buttery dengan Lenis
        }
      })

      tl.fromTo(statueRef.current, 
        {
          yPercent: 28,
          scale: 0.85,
          rotationY: -16,
          filter: 'brightness(0.85) contrast(1.1)',
        },
        {
          yPercent: -26,
          scale: 1.22, // Patung membesar super megah
          rotationY: 10,
          filter: 'brightness(1.1) contrast(1.05)',
          ease: 'none',
        }
      )

      // 3. Parallax horizontal untuk tipografi watermark
      gsap.fromTo(textBgLeftRef.current,
        { xPercent: -20 },
        {
          xPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      )
      gsap.fromTo(textBgRightRef.current,
        { xPercent: 20 },
        {
          xPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      )

      // 4. Plakat Artefak melayang
      gsap.from(cardRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 60%',
        }
      })
    }, root)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="about" ref={root} className="relative bg-paper-deep/75 border-y border-rule overflow-hidden py-20 md:py-32">
      
      {/* Watermark Raksasa yang Bergerak Horisontal saat Scroll Lenis */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-between opacity-[0.05] z-0">
        <span ref={textBgLeftRef} className="font-serif text-[22vw] font-bold leading-none tracking-tighter text-clay will-change-transform">
          NUSANTARA
        </span>
        <span ref={textBgRightRef} className="font-serif text-[22vw] font-bold leading-none tracking-tighter text-clay will-change-transform">
          SINGHASARI
        </span>
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-9 grid lg:grid-cols-[1fr_1.35fr] gap-12 lg:gap-14 items-center z-10">
        
        {/* Kolom Kiri: Teks & Cerita Kebudayaan */}
        <div className="z-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-clay/10 text-clay text-xs font-serif tracking-wider mb-6 border border-clay/20 shadow-sm">
            <Landmark size={14} />
            <span>Mahakarya Peradaban Jawa Kuno Abad XIII</span>
          </div>

          <h2 className="text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[1.05] tracking-tight text-clay">
            <Line>INDONESIA IS MORE</Line>
            <Line>THAN AN ARCHIPELAGO.</Line>
          </h2>

          <p className="font-text text-base md:text-lg leading-[1.85] text-ink-soft mt-6 mb-0 max-w-[44ch]">
            Setiap jengkal pulau menyimpan filosofi adiluhung cara manusia membangun rumah adat, meracik bumbu rempah, melantunkan nada gamelan, dan mewariskan karya seni abadi yang melintasi zaman.
          </p>

          <div className="w-16 h-px bg-clay/50 my-8" />

          {/* Statistik Elegan */}
          <div className="grid grid-cols-2 gap-6 max-w-sm mb-8">
            <div className="border-l-2 border-clay/50 pl-4">
              <div className="font-serif text-3xl md:text-4xl text-clay font-medium leading-none">8</div>
              <div className="text-xs uppercase tracking-wider text-ink-soft mt-1.5">Gugus Wilayah Besar</div>
            </div>
            <div className="border-l-2 border-clay/50 pl-4">
              <div className="font-serif text-3xl md:text-4xl text-clay font-medium leading-none">1.340+</div>
              <div className="text-xs uppercase tracking-wider text-ink-soft mt-1.5">Suku & Etnis Bangsa</div>
            </div>
          </div>

          {/* Kutipan Kakawin Sutasoma */}
          <div className="p-4 md:p-5 rounded-2xl bg-paper/90 border border-rule/80 backdrop-blur-md shadow-sm max-w-md">
            <p className="font-serif italic text-xs md:text-sm text-clay m-0 leading-relaxed">
              &ldquo;Bhinneka Tunggal Ika tan hana dharma mangrwa — Berbeda-beda tetapi tetap satu jua, tiada kebenaran yang terbelah.&rdquo;
            </p>
            <span className="block text-[10px] uppercase tracking-wider text-ink-soft mt-2.5 font-medium">
              — Kakawin Sutasoma, Mpu Tantular
            </span>
          </div>
        </div>

        {/* Kolom Kanan: Patung Raksasa Ganesha & Cincin Teks Berputar Otomatis (Continuous Auto Spin) */}
        <div className="relative flex items-center justify-center min-h-[580px] md:min-h-[740px] select-none [perspective:1400px]">
          
          {/* Latar Belakang Pendaran Cahaya Suci Emas Besar */}
          <div className="absolute w-[450px] h-[450px] md:w-[640px] md:h-[640px] rounded-full bg-gradient-to-tr from-amber-600/20 via-orange-500/15 to-transparent blur-3xl pointer-events-none" />

          {/* Cincin Teks 1 (Luar): Diameter Besar 680px - AUTO SPIN OTOMATIS BERPUTAR SEARAH JARUM JAM */}
          <div className="absolute w-[560px] h-[560px] md:w-[680px] md:h-[680px] pointer-events-none select-none z-0 flex items-center justify-center animate-[spin_32s_linear_infinite] will-change-transform">
            <svg viewBox="0 0 680 680" className="w-full h-full overflow-visible">
              <defs>
                <path
                  id="circleGrandOuter"
                  d="M 340, 340 m -300, 0 a 300,300 0 1,1 600,0 a 300,300 0 1,1 -600,0"
                />
              </defs>
              <text className="font-serif text-[14px] tracking-[0.42em] uppercase fill-clay font-medium">
                <textPath href="#circleGrandOuter" startOffset="0%">
                  ★ INDONESIA ★ WARISAN TRADISIONAL ★ PERADABAN NUSANTARA ★ NILAI ADILUHUNG ★
                </textPath>
              </text>
            </svg>
          </div>

          {/* Cincin Teks 2 (Dalam): Diameter 540px - AUTO SPIN BERPUTAR BERLAWANAN ARAH */}
          <div className="absolute w-[440px] h-[440px] md:w-[540px] md:h-[540px] pointer-events-none select-none z-0 flex items-center justify-center animate-[spin_40s_linear_infinite_reverse] will-change-transform">
            <svg viewBox="0 0 540 540" className="w-full h-full overflow-visible">
              <defs>
                <path
                  id="circleGrandInner"
                  d="M 270, 270 m -235, 0 a 235,235 0 1,1 470,0 a 235,235 0 1,1 -470,0"
                />
              </defs>
              <text className="font-serif text-[11.5px] tracking-[0.46em] uppercase fill-ink-soft/80 font-semibold">
                <textPath href="#circleGrandInner" startOffset="0%">
                  ✦ SEJARAH ✦ FILOSOFI KUNO ✦ SIMBOL KEBIJAKSANAAN ✦ CANDI NUSANTARA ✦
                </textPath>
              </text>
            </svg>
          </div>

          {/* Cincin Orbit Astrologi Putus-putus */}
          <div className="absolute w-[360px] h-[360px] md:w-[440px] md:h-[440px] rounded-full border border-clay/20 pointer-events-none z-0" />
          <div className="absolute w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-full border border-dashed border-clay/30 pointer-events-none z-0" />

          <Ornament className="hidden lg:block absolute -left-12 bottom-6 h-56 z-10 opacity-70" />

          {/* PATUNG RAKSASA GANESHA: Ukuran Extra Large (Maksimal 650px), Melayang 3D Parallax Lenis Scrub */}
          <div
            ref={statueRef}
            className="relative z-20 max-w-[500px] md:max-w-[640px] w-full flex items-center justify-center will-change-transform"
          >
            <img
              src="/images/arca-ganesha.png"
              alt="Arca Batu Ganesha Nusantara Super Besar"
              className="w-full h-auto max-h-[650px] object-contain drop-shadow-[0_45px_65px_rgba(42,26,18,0.5)] select-none pointer-events-none"
            />
          </div>

          {/* Floating Museum Plakat Kuratorial */}
          <div
            ref={cardRef}
            className="absolute bottom-2 right-2 md:right-4 z-30 bg-paper/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-rule shadow-xl text-left max-w-[240px]"
          >
            <div className="flex items-center gap-1.5 text-clay text-[10px] font-serif uppercase tracking-wider font-semibold">
              <Sparkles size={12} /> Koleksi Mahakarya
            </div>
            <div className="font-serif text-sm text-ink font-medium mt-1">
              Arca Ganesha Singhasari
            </div>
            <div className="text-[10.5px] text-ink-soft/85 mt-0.5 leading-snug">
              Batu Andesit Pahatan Halus Abad XIII • Candi Singhasari, Malang
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
