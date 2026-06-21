import { Search } from 'lucide-react';
import { CATEGORY_LABELS, type Category } from '../../types';

interface FilterBarProps {
  active: Category | 'all';
  onChange: (category: Category | 'all') => void;
  search: string;
  onSearchChange: (value: string) => void;
}

const CATEGORIES: (Category | 'all')[] = [
  'all',
  'weddings',
  'portraits',
  'events',
  'street',
  'landscape',
  'commercial',
];

export default function FilterBar({ active, onChange, search, onSearchChange }: FilterBarProps) {
  return (
    <div className="sticky top-20 z-30 bg-bg/95 backdrop-blur-md border-b border-line">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onChange(cat)}
              aria-pressed={active === cat}
              className={`text-[12px] tracking-[0.06em] uppercase px-4 py-2 border transition-colors ${
                active === cat
                  ? 'bg-ink text-bg border-ink'
                  : 'border-line text-ink-dim hover:text-ink hover:border-line-strong'
              }`}
            >
              {cat === 'all' ? 'All work' : CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64 shrink-0">
          <Search size={15} strokeWidth={1.6} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-dim" />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search galleries…"
            aria-label="Search galleries"
            className="w-full bg-surface border border-line pl-9 pr-3 py-2.5 text-sm placeholder:text-ink-dim focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
