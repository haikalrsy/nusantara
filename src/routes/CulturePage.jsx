import { Link, useParams } from '@tanstack/react-router'
import { cultures } from '../data/cultures'
export default function CulturePage() {
  const { slug } = useParams({ from: '/culture/$slug' })
  const c = cultures.find(x => x.slug === slug)
  return (
    <section className="mx-auto max-w-[1100px] px-6 py-24">
      <Link to="/" className="text-xs no-underline text-ink-soft">Kembali</Link>
      <h1 className="text-5xl mt-6">{c ? c.title : 'Budaya tidak ditemukan'}</h1>
      {c && <p className="text-sm text-ink-soft mt-2">{c.place}, {c.category}</p>}
    </section>
  )
}
