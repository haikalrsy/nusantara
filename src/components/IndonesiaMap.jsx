import { useState } from 'react'
import { islands } from '../data/islands'
import { useIslandState } from '../hooks/useIslandState'
import { scrollToId } from '../lib/lenis'

// Pemetaan koordinat & ukuran presisi setiap pulau pada gambar peta
const ISLAND_FRAMES = [
  {
    slug: 'sumatra',
    name: 'Sumatra',
    left: '2%',
    top: '12%',
    width: '28%',
    height: '56%',
    img: '/images/islands-3d/sumatra-floating.png',
  },
  {
    slug: 'kalimantan',
    name: 'Kalimantan',
    left: '28%',
    top: '10%',
    width: '24%',
    height: '46%',
    img: '/images/islands-3d/kalimantan-floating.png',
  },
  {
    slug: 'jawa',
    name: 'Jawa',
    left: '22%',
    top: '54%',
    width: '24%',
    height: '28%',
    img: '/images/islands-3d/jawa-floating.png',
  },
  {
    slug: 'bali',
    name: 'Bali',
    left: '43%',
    top: '70%',
    width: '9%',
    height: '18%',
    img: '/images/islands-3d/bali-floating.png',
  },
  {
    slug: 'nusa-tenggara',
    name: 'Nusa Tenggara',
    left: '50%',
    top: '70%',
    width: '18%',
    height: '20%',
    img: '/images/islands-3d/nusa-tenggara-floating.png',
  },
  {
    slug: 'sulawesi',
    name: 'Sulawesi',
    left: '47%',
    top: '26%',
    width: '17%',
    height: '42%',
    img: '/images/islands-3d/sulawesi-floating.png',
  },
  {
    slug: 'maluku',
    name: 'Maluku',
    left: '63%',
    top: '32%',
    width: '19%',
    height: '33%',
    img: '/images/islands-3d/maluku-floating.png',
  },
  {
    slug: 'papua',
    name: 'Papua',
    left: '78%',
    top: '38%',
    width: '20%',
    height: '42%',
    img: '/images/islands-3d/papua-floating.png',
  },
]

export default function IndonesiaMap() {
  const [active, setActive] = useIslandState()
  const [hover, setHover] = useState(null)

  const select = (slug) => {
    setActive(slug)
    scrollToId('islands', -40)
  }

  return (
    <div className="relative w-full select-none">
      {/* PETA FULL EDGE-TO-EDGE SATU SECTION PENUH, TANPA BORDER, TANPA GAP KANAN KIRI */}
      <div className="relative aspect-[16/9] w-full overflow-hidden select-none">
        
        {/* Gambar Latar Peta Utuh yang Menyatu dengan Lembaran Website */}
        <img
          src="/images/indonesia-diorama-hd.jpg"
          alt="Peta Indonesia"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Efek Awan Lembut yang Melayang Halus di Atas Latar */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen opacity-35 z-10">
          <div className="cloud-layer-1 absolute -inset-10 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.7)_0%,transparent_60%)]" />
          <div className="cloud-layer-2 absolute -inset-10 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.6)_0%,transparent_65%)]" />
        </div>

        {/* PER FRAME PULAU: NAIK MURNI KE ATAS SAAT DI-HOVER TANPA GOYANG KIRI KANAN */}
        {ISLAND_FRAMES.map((f) => {
          const isHovered = hover === f.slug
          const isSelected = active === f.slug

          return (
            <div
              key={f.slug}
              onClick={() => select(f.slug)}
              onMouseEnter={() => setHover(f.slug)}
              onMouseLeave={() => setHover(null)}
              style={{
                left: f.left,
                top: f.top,
                width: f.width,
                height: f.height,
              }}
              className={`absolute cursor-pointer select-none ${
                isHovered || isSelected ? 'z-30' : 'z-20'
              }`}
            >
              {/* Efek Mengangkat Murni ke Atas dengan Bayangan Alami */}
              <div
                style={{
                  transform: isSelected
                    ? 'translateY(-18px) scale(1.035)'
                    : isHovered
                    ? 'translateY(-15px) scale(1.03)'
                    : 'translateY(0px) scale(1)',
                  transition: 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease',
                  opacity: (isHovered || isSelected) ? 1 : 0,
                }}
                className="relative w-full h-full will-change-transform"
              >
                <img
                  src={f.img}
                  alt={f.name}
                  className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_24px_20px_rgba(42,26,18,0.45)]"
                />

                {/* Tooltip Nama Pulau Minimalis */}
                <div
                  className={`absolute left-1/2 -bottom-2 -translate-x-1/2 pointer-events-none px-3 py-1 rounded-md shadow-lg backdrop-blur-md transition-all duration-300 bg-ink/90 text-paper text-xs font-serif tracking-wider ${
                    isHovered || isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}
                >
                  {f.name}
                </div>
              </div>
            </div>
          )
        })}

        {/* Indikator Koordinat Pojok Kanan Bawah yang Rapi */}
        <div className="absolute right-6 bottom-4 z-30 text-[11px] text-ink-soft/75 font-serif pointer-events-none">
          0.7893° S • 113.9213° E
        </div>
      </div>
    </div>
  )
}
