// src: jika ada override di images.js pakai itu; jika tidak pakai gambar default internet terverifikasi
import { images } from './images'

const defaultImages = {
  'rendang': 'https://images.unsplash.com/photo-1685704111590-258e65cde02a?auto=format&fit=crop&w=1200&q=80',
  'rumah-gadang': 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80',
  'gondang': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
  'tari-piring': 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
  'batik': 'https://images.unsplash.com/photo-1761516659497-8478e39d2b26?auto=format&fit=crop&w=1200&q=80',
  'candi-borobudur': 'https://images.unsplash.com/photo-1780748711983-75cb96f1bf76?auto=format&fit=crop&w=1200&q=80',
  'candi-prambanan': 'https://images.unsplash.com/photo-1576233475048-55f08b53a8bd?auto=format&fit=crop&w=1200&q=80',
  'angklung': 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
  'sate-lilit': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
  'tari-kecak': 'https://images.unsplash.com/photo-1773563794845-b56cfaf0532a?auto=format&fit=crop&w=1200&q=80',
  'raja-ampat': 'https://images.unsplash.com/photo-1675377668920-86545643d25c?auto=format&fit=crop&w=1200&q=80',
  'pacu-jalur': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  'danau-toba': 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80',
  'rumah-betang': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
  'tari-hudoq': 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
  'sasando-dayak': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
  'tongkonan': 'https://images.unsplash.com/photo-1578469645742-46cae010e5d4?auto=format&fit=crop&w=1200&q=80',
  'coto-makassar': 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=1200&q=80',
  'tenun-ikat': 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
  'pulau-komodo': 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80',
  'papeda': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
  'tari-cakalele': 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
  'noken': 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
  'ukiran-jepara': 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
}

const base = [
  { slug:'rendang', title:'Rendang', category:'Makanan', island:'sumatra', place:'Sumatra Barat' },
  { slug:'rumah-gadang', title:'Rumah Gadang', category:'Bangunan', island:'sumatra', place:'Sumatra Barat' },
  { slug:'gondang', title:'Gondang', category:'Musik', island:'sumatra', place:'Sumatra Utara' },
  { slug:'tari-piring', title:'Tari Piring', category:'Kesenian', island:'sumatra', place:'Sumatra Barat' },
  { slug:'batik', title:'Batik', category:'Kesenian', island:'jawa', place:'Jawa' },
  { slug:'candi-borobudur', title:'Candi Borobudur', category:'Bangunan', island:'jawa', place:'Jawa Tengah' },
  { slug:'candi-prambanan', title:'Candi Prambanan', category:'Bangunan', island:'jawa', place:'Jawa Tengah' },
  { slug:'angklung', title:'Angklung', category:'Musik', island:'jawa', place:'Jawa Barat' },
  { slug:'sate-lilit', title:'Sate Lilit', category:'Makanan', island:'bali', place:'Bali' },
  { slug:'tari-kecak', title:'Tari Kecak', category:'Tradisi', island:'bali', place:'Bali' },
  { slug:'raja-ampat', title:'Raja Ampat', category:'Wisata', island:'papua', place:'Papua Barat Daya' },
  { slug:'pacu-jalur', title:'Pacu Jalur', category:'Tradisi', island:'sumatra', place:'Riau' },
  { slug:'danau-toba', title:'Danau Toba', category:'Wisata', island:'sumatra', place:'Sumatra Utara' },
  { slug:'rumah-betang', title:'Rumah Betang', category:'Bangunan', island:'kalimantan', place:'Kalimantan Tengah' },
  { slug:'tari-hudoq', title:'Tari Hudoq', category:'Tradisi', island:'kalimantan', place:'Kalimantan Timur' },
  { slug:'sasando-dayak', title:'Sampe', category:'Musik', island:'kalimantan', place:'Kalimantan Timur' },
  { slug:'tongkonan', title:'Rumah Tongkonan', category:'Bangunan', island:'sulawesi', place:'Toraja' },
  { slug:'coto-makassar', title:'Coto Makassar', category:'Makanan', island:'sulawesi', place:'Sulawesi Selatan' },
  { slug:'tenun-ikat', title:'Tenun Ikat', category:'Kesenian', island:'nusa-tenggara', place:'Nusa Tenggara Timur' },
  { slug:'pulau-komodo', title:'Pulau Komodo', category:'Wisata', island:'nusa-tenggara', place:'Nusa Tenggara Timur' },
  { slug:'papeda', title:'Papeda', category:'Makanan', island:'maluku', place:'Maluku' },
  { slug:'tari-cakalele', title:'Tari Cakalele', category:'Tradisi', island:'maluku', place:'Maluku' },
  { slug:'noken', title:'Noken', category:'Kesenian', island:'papua', place:'Papua' },
  { slug:'ukiran-jepara', title:'Ukiran Jepara', category:'Kesenian', island:'jawa', place:'Jawa Tengah' },
]

export const cultures = base.map(c => {
  const custom = images[c.slug] || {}
  const fallback = defaultImages[c.slug] || `/images/${c.slug}.jpg`
  return {
    ...c,
    src: custom.src || fallback,
    credit: custom.credit || 'Dokumentasi Kebudayaan Nusantara'
  }
})
