import { useMemo, useState, useEffect, useRef } from 'react';
import { Search, X, Wine, ChevronDown, Sparkles, Info, GlassWater, Utensils, Check, LayoutGrid, ListFilter, Maximize2 } from 'lucide-react';
import { menu, totalItemCount, type MenuSubItem } from '@/data/menu';
import { venueInfo } from '@/data/venue';
import type { PageId } from '@/components/Navbar';

type MenuPageProps = {
  onNavigate: (page: PageId) => void;
};

export type ViewMode = 'grid' | 'bistro' | 'showcase';

export default function MenuPage({ onNavigate }: MenuPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>('signature');
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<MenuSubItem | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});

  // Collect all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    menu.forEach((s) =>
      s.groups.forEach((g) =>
        g.items.forEach((i) => i.tags?.forEach((t) => set.add(t)))
      )
    );
    return ['All', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menu
      .map((section) => ({
        ...section,
        groups: section.groups
          .map((group) => ({
            ...group,
            items: group.items.filter((item) => {
              const matchQuery =
                !q ||
                item.name.toLowerCase().includes(q) ||
                (item.description && item.description.toLowerCase().includes(q));
              const matchTag =
                selectedTag === 'All' || item.tags?.includes(selectedTag);
              return matchQuery && matchTag;
            }),
          }))
          .filter((group) => group.items.length > 0),
      }))
      .filter((section) => section.groups.length > 0);
  }, [query, selectedTag]);

  // Flatten all categories for quick jump navigation
  const allCategories = useMemo(() => {
    return menu.flatMap((section) =>
      section.groups.map((group) => ({
        id: group.id,
        title: group.title,
        sectionId: section.id,
      }))
    );
  }, []);

  const isSearching = Boolean(query.trim() || selectedTag !== 'All');

  // IntersectionObserver for tracking active category on scroll
  useEffect(() => {
    if (isSearching) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (const cat of allCategories) {
        const el = categoryRefs.current[cat.id];
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveCategory(cat.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [allCategories, isSearching]);

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const el = categoryRefs.current[categoryId];
    if (el) {
      const top = el.offsetTop - 140;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-ink-950 text-ink-100 pb-24 transition-colors duration-300">
      {/* HERO HEADER */}
      <section className="relative pt-28 pb-14 bg-noise overflow-hidden border-b border-ink-700/60">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/80 via-ink-950 to-ink-950 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-400/5 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="section-tag">
                FULL CULINARY & BEVERAGE PROGRAM
              </div>
              <h1 className="section-title">
                The Boulevard Menu
              </h1>
              <p className="section-desc">
                Explore signature craft cocktails, fine wines, imported lagers, and artisanal small plates at {venueInfo.name}.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-ink-300 bg-ink-900/60 p-4 rounded-2xl border border-ink-700/60 shrink-0">
              <div className="text-center px-2">
                <span className="block font-display text-xl text-gold-300 font-bold">{totalItemCount}+</span>
                <span>Offerings</span>
              </div>
              <div className="h-8 w-px bg-ink-700/60" />
              <div className="text-center px-2">
                <span className="block font-display text-xl text-gold-300 font-bold">13</span>
                <span>Categories</span>
              </div>
              <div className="h-8 w-px bg-ink-700/60" />
              <div className="text-center px-2">
                <span className="block font-display text-xl text-gold-300 font-bold">100%</span>
                <span>Fresh & Premium</span>
              </div>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="mt-8 max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" size={18} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search drinks, salads, pasta, mains, beers..."
              className="w-full bg-ink-900/90 text-ink-50 placeholder-ink-400 pl-11 pr-10 py-3.5 rounded-2xl border border-ink-700/70 focus:border-gold-400 focus:outline-none text-sm transition-all shadow-inner"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-100"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* STICKY CATEGORY NAV & DESIGN LAYOUT SWITCHER */}
      {!isSearching && (
        <div className="sticky top-[68px] z-30 glass-panel border-y border-ink-700/60 shadow-lg">
          <div className="mx-auto max-w-7xl px-3 sm:px-8 flex items-center justify-between gap-3">
            {/* CATEGORY TABS (LEFT) */}
            <div className="flex gap-2 overflow-x-auto py-3 no-scrollbar flex-1 min-w-0">
              {allCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-gold-gradient text-ink-950 font-bold shadow-md scale-105'
                      : 'text-ink-200 hover:text-gold-200 hover:bg-ink-800/60 border border-ink-700/50'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            {/* DESIGN / LAYOUT SWITCHER CONTROLS (RIGHT) */}
            <div className="shrink-0 flex items-center gap-1 p-1 bg-ink-950/80 rounded-full border border-gold-500/30">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-gold-gradient text-ink-950 shadow-md font-bold'
                    : 'text-ink-300 hover:text-gold-200'
                }`}
                title="Grid Cards Layout"
              >
                <LayoutGrid size={14} />
                <span className="hidden sm:inline">Grid</span>
              </button>

              <button
                onClick={() => setViewMode('bistro')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  viewMode === 'bistro'
                    ? 'bg-gold-gradient text-ink-950 shadow-md font-bold'
                    : 'text-ink-300 hover:text-gold-200'
                }`}
                title="Classic Bistro Menu Layout"
              >
                <ListFilter size={14} />
                <span className="hidden sm:inline">Bistro</span>
              </button>

              <button
                onClick={() => setViewMode('showcase')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  viewMode === 'showcase'
                    ? 'bg-gold-gradient text-ink-950 shadow-md font-bold'
                    : 'text-ink-300 hover:text-gold-200'
                }`}
                title="Visual Showcase Cards Layout"
              >
                <Maximize2 size={14} />
                <span className="hidden sm:inline">Showcase</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTIONS & ITEMS */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10">
        {filtered.length === 0 && (
          <div className="text-center py-20 glass-panel rounded-3xl border border-ink-700/60">
            <p className="font-display text-2xl text-ink-100">No menu items found</p>
            <p className="text-ink-400 mt-2 text-sm">Try adjusting your search query.</p>
            <button
              onClick={() => setQuery('')}
              className="mt-4 px-5 py-2 rounded-full bg-gold-gradient text-ink-950 font-semibold text-xs"
            >
              Clear Search
            </button>
          </div>
        )}

        <div className="space-y-16">
          {filtered.map((section) => (
            <section
              key={section.id}
              id={section.id}
              ref={(el) => { sectionRefs.current[section.id] = el; }}
            >
              <div className="flex items-end justify-between gap-4 mb-6 border-b border-ink-700/60 pb-4">
                <div>
                  <h2 className="font-display text-3xl sm:text-4xl text-ink-50">{section.label}</h2>
                  <p className="text-ink-400 text-xs sm:text-sm mt-0.5">
                    {section.groups.reduce((acc, g) => acc + g.items.length, 0)} items in {section.groups.length} categories
                  </p>
                </div>
              </div>

              <div className="space-y-12">
                {section.groups.map((group) => (
                  <div
                    key={group.id}
                    id={group.id}
                    ref={(el) => { categoryRefs.current[group.id] = el; }}
                  >
                    {/* LUXURY CATEGORY HEADER BANNER */}
                    <div className="relative overflow-hidden rounded-2xl border border-gold-500/30 bg-gradient-to-r from-ink-900 via-ink-900/90 to-ink-950 p-5 sm:p-6 mb-6 shadow-xl flex items-center justify-between gap-6 glow-gold">
                      <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-gold-500/10 via-gold-500/5 to-transparent pointer-events-none" />
                      <div className="absolute left-0 bottom-0 w-48 h-24 bg-gold-400/5 blur-2xl pointer-events-none" />

                      <div className="relative z-10 flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-6 h-0.5 bg-gold-gradient rounded-full" />
                          <span className="text-[0.65rem] uppercase tracking-[0.25em] text-gold-300 font-semibold">
                            Category Selection
                          </span>
                        </div>
                        <h3 className="font-display text-2xl sm:text-3xl text-ink-50 font-bold">{group.title}</h3>
                        <p className="text-xs sm:text-sm text-ink-300 mt-1 max-w-lg leading-relaxed">{group.blurb}</p>
                      </div>

                      {group.image && (
                        <div className="hidden sm:block shrink-0 relative w-28 h-20 rounded-xl overflow-hidden border border-gold-500/30 shadow-lg">
                          <img
                            src={group.image}
                            alt={group.imageAlt}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
                        </div>
                      )}
                    </div>

                    {/* RENDER LAYOUT 1: GRID MODE */}
                    {viewMode === 'grid' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {group.items.map((item, idx) => (
                          <article
                            key={item.name}
                            onClick={() => setSelectedItem(item)}
                            className="group cursor-pointer relative flex gap-3 p-3.5 rounded-2xl border border-ink-700/50 bg-ink-900/40 hover:border-gold-500/50 hover:bg-ink-800/60 hover:-translate-y-0.5 transition-all animate-fade-up"
                            style={{ animationDelay: `${0.02 * idx}s` }}
                          >
                            {item.image && (
                              <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-ink-900 border border-gold-500/30 relative flex items-center justify-center shadow-sm">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  loading="lazy"
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>
                            )}

                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                              <div>
                                <div className="flex items-start justify-between gap-1.5">
                                  <h4 className="font-display text-base text-ink-50 font-bold leading-tight group-hover:text-gold-200 transition-colors">
                                    {item.name}
                                  </h4>
                                  <span className="font-display text-base text-gold-300 font-bold whitespace-nowrap">
                                    ${item.price}
                                  </span>
                                </div>

                                {item.description && (
                                  <p className="text-xs text-ink-400 mt-1 leading-snug line-clamp-2">
                                    {item.description}
                                  </p>
                                )}
                              </div>

                              {item.tags && item.tags.length > 0 && (
                                <div className="mt-2.5 flex flex-wrap gap-1">
                                  {item.tags.slice(0, 2).map((t) => (
                                    <span
                                      key={t}
                                      className="px-2 py-0.5 rounded-md bg-gold-900 text-gold-200 text-[0.65rem] font-semibold border border-gold-500/30 shadow-2xs"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </article>
                        ))}
                      </div>
                    )}

                    {/* RENDER LAYOUT 2: CLASSIC BISTRO MENU MODE */}
                    {viewMode === 'bistro' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                        {group.items.map((item) => (
                          <article
                            key={item.name}
                            onClick={() => setSelectedItem(item)}
                            className="group cursor-pointer p-4 rounded-2xl bg-ink-900/40 border border-ink-700/50 hover:border-gold-500/50 hover:bg-ink-800/60 transition-all flex items-start gap-4 shadow-sm"
                          >
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 rounded-xl object-cover border border-gold-500/30 shrink-0 group-hover:scale-105 transition-transform"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline gap-2">
                                <h4 className="font-display text-lg font-bold text-ink-50 group-hover:text-gold-200 transition-colors">
                                  {item.name}
                                </h4>
                                <span className="flex-1 border-b border-dotted border-ink-600/60 mx-1.5 opacity-60" />
                                <span className="font-display text-lg font-bold text-gold-300 whitespace-nowrap">
                                  ${item.price}
                                </span>
                              </div>
                              {item.description && (
                                <p className="text-xs text-ink-300 mt-1 leading-relaxed">{item.description}</p>
                              )}
                              {item.tags && item.tags.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1">
                                  {item.tags.map((t) => (
                                    <span
                                      key={t}
                                      className="px-2 py-0.5 rounded bg-gold-900 text-gold-200 text-[0.6rem] font-semibold border border-gold-500/20"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </article>
                        ))}
                      </div>
                    )}

                    {/* RENDER LAYOUT 3: VISUAL SHOWCASE MODE */}
                    {viewMode === 'showcase' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {group.items.map((item) => (
                          <article
                            key={item.name}
                            onClick={() => setSelectedItem(item)}
                            className="group cursor-pointer relative overflow-hidden rounded-3xl border border-ink-700/60 bg-ink-900/60 hover:border-gold-400 hover:shadow-2xl hover:-translate-y-1 transition-all glow-gold flex flex-col justify-between"
                          >
                            <div className="relative h-48 w-full overflow-hidden bg-ink-950">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                              ) : (
                                <div className="w-full h-full bg-ink-900 flex items-center justify-center text-ink-500">
                                  No Image
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-black/30" />
                              <span className="absolute top-3 right-3 bg-gold-gradient text-ink-950 font-bold px-3.5 py-1 rounded-full text-sm shadow-xl">
                                ${item.price}
                              </span>
                            </div>

                            <div className="p-5 flex-1 flex flex-col justify-between">
                              <div>
                                <h4 className="font-display text-xl font-bold text-ink-50 group-hover:text-gold-200 transition-colors">
                                  {item.name}
                                </h4>
                                {item.description && (
                                  <p className="text-xs text-ink-300 mt-2 leading-relaxed line-clamp-2">
                                    {item.description}
                                  </p>
                                )}
                              </div>

                              <div className="mt-4 pt-3 border-t border-ink-800 flex items-center justify-between">
                                <div className="flex flex-wrap gap-1">
                                  {item.tags?.map((t) => (
                                    <span
                                      key={t}
                                      className="px-2 py-0.5 rounded-full bg-gold-900 text-gold-200 text-[0.65rem] font-semibold border border-gold-500/20"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                                <span className="text-xs text-gold-400 font-bold group-hover:underline flex items-center gap-1">
                                  View Item &rarr;
                                </span>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* DETAIL MODAL */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-ink-950/85 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-lg max-h-[88vh] overflow-y-auto glass-panel rounded-3xl border border-gold-500/40 p-5 sm:p-7 shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 grid place-items-center w-9 h-9 rounded-full bg-ink-900/90 text-ink-300 hover:text-gold-200 hover:bg-ink-800 transition-colors border border-gold-500/30 shadow-lg"
            >
              <X size={18} />
            </button>

            {/* ITEM IMAGE HEADER */}
            {selectedItem.image && (
              <div className="relative h-48 sm:h-56 -mx-5 -mt-5 sm:-mx-7 sm:-mt-7 mb-5 overflow-hidden bg-ink-950 flex items-center justify-center border-b border-gold-500/20">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent pointer-events-none" />
                <span className="absolute bottom-3 right-4 font-display text-2xl sm:text-3xl text-gold-200 font-bold drop-shadow-md bg-ink-950/80 px-3.5 py-1 rounded-xl border border-gold-500/30">
                  ${selectedItem.price}
                </span>
              </div>
            )}

            {!selectedItem.image && (
              <div className="flex items-center justify-between border-b border-ink-700/60 pb-3 mb-4">
                <h3 className="font-display text-2xl text-ink-50">{selectedItem.name}</h3>
                <span className="font-display text-2xl text-gold-300 font-bold">${selectedItem.price}</span>
              </div>
            )}

            {selectedItem.image && (
              <h3 className="font-display text-2xl sm:text-3xl text-ink-50 leading-tight">{selectedItem.name}</h3>
            )}

            {selectedItem.description && (
              <p className="mt-2 text-sm text-ink-200 leading-relaxed">{selectedItem.description}</p>
            )}

            {/* TAGS */}
            {selectedItem.tags && selectedItem.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {selectedItem.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md bg-gold-900/50 text-gold-200 text-xs font-semibold border border-gold-500/30"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* TASTING / PREPARATION PROFILE */}
            <div className="mt-6 pt-5 border-t border-ink-700/60 space-y-3 text-xs text-ink-300">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-gold-400" />
                <span>Crafted fresh with house ingredients at {venueInfo.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Info size={14} className="text-gold-400" />
                <span>Allergies or dietary restrictions? Please inform your server or bartender.</span>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-6 pt-4 border-t border-ink-700/60 flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedItem(null);
                  onNavigate('reservations');
                }}
                className="flex-1 bg-gold-gradient text-ink-950 font-bold py-3 rounded-full text-xs sm:text-sm hover:shadow-lg transition-all text-center"
              >
                Reserve Table To Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
