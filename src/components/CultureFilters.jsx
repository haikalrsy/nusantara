import { categories } from '../data/categories'
export default function CultureFilters({ value, onChange }) {
  return (
    <div role="group" aria-label="Jenis budaya">
      <p className="text-[13px] font-normal m-0 mb-3">Jenis Budaya</p>
      <div className="flex flex-wrap gap-2">
        {categories.map(c => (
          <button key={c} type="button" aria-pressed={value === c} onClick={() => onChange(c)}
            className={`px-4 py-1.5 rounded-full text-[11px] cursor-pointer border transition-colors ${value === c ? 'bg-clay text-paper border-clay' : 'bg-transparent text-ink-soft border-rule hover:border-ink hover:text-ink'}`}>{c}</button>
        ))}
      </div>
    </div>
  )
}
