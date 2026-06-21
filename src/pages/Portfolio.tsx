import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Seo from '../components/shared/Seo';
import FilterBar from '../components/portfolio/FilterBar';
import GalleryGrid from '../components/portfolio/GalleryGrid';
import Lightbox from '../components/portfolio/Lightbox';
import { photos, galleries } from '../data/content';
import { CATEGORY_LABELS, type Category } from '../types';
import PhotoMedia from '../components/shared/PhotoMedia';

export default function Portfolio() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as Category | null;
  const [active, setActive] = useState<Category | 'all'>(categoryParam ?? 'all');
  const [search, setSearch] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleCategoryChange = (cat: Category | 'all') => {
    setActive(cat);
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return photos.filter((photo) => {
      const matchesCategory = active === 'all' || photo.category === active;
      if (!matchesCategory) return false;
      if (!term) return true;
      const gallery = galleries.find((g) => g.id === photo.galleryId);
      return (
        photo.title.toLowerCase().includes(term) ||
        gallery?.title.toLowerCase().includes(term) ||
        gallery?.location.toLowerCase().includes(term)
      );
    });
  }, [active, search]);

  return (
    <>
      <Seo
        title="Portfolio"
        description="Browse the full portfolio across weddings, portraits, events, street, landscape, and commercial photography."
        path="/portfolio"
      />

      <div className="pt-32 pb-12 max-w-7xl mx-auto px-6 lg:px-10">
        <p className="eyebrow mb-4">Portfolio</p>
        <h1 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] text-balance max-w-2xl">
          Every category, one consistent eye.
        </h1>
      </div>

      <FilterBar
        active={active}
        onChange={handleCategoryChange}
        search={search}
        onSearchChange={setSearch}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-10">
        <p className="eyebrow mb-5">Browse by session</p>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1 [scrollbar-width:thin]">
          {galleries
            .filter((g) => active === 'all' || g.category === active)
            .map((gallery) => (
              <Link
                key={gallery.id}
                to={`/portfolio/${gallery.id}`}
                className="group shrink-0 w-56 sm:w-64"
              >
                <div className="aspect-[4/5] mb-3 overflow-hidden">
                  <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                    <PhotoMedia src={gallery.cover} alt={gallery.title} />
                  </div>
                </div>
                <p className="font-display text-base">{gallery.title}</p>
                <p className="text-[11px] tracking-[0.06em] uppercase text-ink-dim mt-1">
                  {CATEGORY_LABELS[gallery.category]} · {gallery.date}
                </p>
              </Link>
            ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <p className="eyebrow mb-5">All photos</p>
        <GalleryGrid photos={filtered} onOpen={(i) => setLightboxIndex(i)} />
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
