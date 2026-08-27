import React, { useState, useMemo } from 'react';
import { Search, LayoutGrid, List, RotateCcw } from 'lucide-react';
import { SNEAKERS_DATA } from './data/sneakers';
import { SneakerCard } from './components/SneakerCard';
import { ImageModal } from './components/ImageModal';
import { SneakerItem } from './types';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [previewSneaker, setPreviewSneaker] = useState<SneakerItem | null>(null);


  const navBrands = useMemo(() => {
    return [
      { id: 'All', label: 'Overview' },
      { id: 'Adidas', label: 'Adidas' },
      { id: 'On', label: 'On Running' },
      { id: 'Nike', label: 'Nike' },
    ];
  }, []);

  const filteredSneakers = useMemo(() => {
    return SNEAKERS_DATA.filter((sneaker) => {
      const matchesBrand = selectedBrand === 'All' || sneaker.brand === selectedBrand;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        sneaker.title.toLowerCase().includes(query) ||
        sneaker.brand.toLowerCase().includes(query) ||
        sneaker.category.toLowerCase().includes(query) ||
        sneaker.colorway.toLowerCase().includes(query);

      return matchesBrand && matchesSearch;
    });
  }, [searchQuery, selectedBrand]);

  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = { All: SNEAKERS_DATA.length };
    SNEAKERS_DATA.forEach((item) => {
      counts[item.brand] = (counts[item.brand] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-sans flex flex-col selection:bg-black selection:text-white">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col flex-1">
        {/* Header matching Clean Minimalism design */}
        <header className="px-6 sm:px-12 py-8 sm:py-10 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-gray-100">
          <div>
            <h1 className="text-3xl sm:text-4xl font-light tracking-tighter uppercase">
              Sneaker Archive
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mt-2 font-semibold">
              Curated Footwear Selection &bull; Edition 01
            </p>
          </div>

          {/* Navigation / Filter Tabs */}
          <nav
            aria-label="Brand category filters"
            className="flex flex-wrap items-center gap-6 sm:gap-8 text-[11px] uppercase tracking-widest font-bold"
          >
            {navBrands.map((item) => {
              const isSelected = selectedBrand === item.id;
              const count = brandCounts[item.id] || 0;
              return (
                <button
                  key={item.id}
                  id={`nav-filter-${item.id.toLowerCase()}`}
                  type="button"
                  onClick={() => setSelectedBrand(item.id)}
                  className={`pb-1 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'text-black border-b-2 border-black'
                      : 'text-gray-400 hover:text-black'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-[9px] font-normal text-gray-400">({count})</span>
                </button>
              );
            })}
          </nav>
        </header>

        {/* Minimal Search & Control Bar */}
        <section
          aria-label="Catalog controls"
          className="px-6 sm:px-12 py-4 border-b border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white"
        >
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              id="sneaker-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH CATALOG (MODEL, COLORWAY, SPEC)..."
              className="w-full pl-6 pr-14 py-1.5 bg-transparent border-b border-gray-200 focus:border-black text-[11px] uppercase tracking-widest outline-none transition-colors placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[9px] uppercase tracking-widest text-gray-400 hover:text-black"
              >
                Clear
              </button>
            )}
          </div>

          {/* Stats & View Switch */}
          <div className="flex items-center justify-between sm:justify-end gap-6 text-[10px] uppercase tracking-widest text-gray-400">
            <div className="hidden sm:block">
              <span className="font-semibold text-black">{filteredSneakers.length}</span> of{' '}
              <span>{SNEAKERS_DATA.length} Models</span>
            </div>

            <div className="flex items-center gap-1 border-l border-gray-100 pl-4 sm:pl-6">
              <button
                type="button"
                id="view-mode-grid"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'text-black' : 'text-gray-300 hover:text-gray-600'
                }`}
                title="Grid View"
                aria-pressed={viewMode === 'grid'}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="sr-only">Grid View</span>
              </button>

              <button
                type="button"
                id="view-mode-list"
                onClick={() => setViewMode('list')}
                className={`p-1.5 transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'text-black' : 'text-gray-300 hover:text-gray-600'
                }`}
                title="List View"
                aria-pressed={viewMode === 'list'}
              >
                <List className="w-4 h-4" />
                <span className="sr-only">List View</span>
              </button>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <main className="flex-1 bg-white">
          {filteredSneakers.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-l border-t border-[#f0f0f0]">
                {filteredSneakers.map((sneaker, idx) => (
                  <SneakerCard
                    key={sneaker.id}
                    sneaker={sneaker}
                    viewMode="grid"
                    index={idx}
                    onPreviewImage={setPreviewSneaker}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col border-t border-[#f0f0f0]">
                {filteredSneakers.map((sneaker, idx) => (
                  <SneakerCard
                    key={sneaker.id}
                    sneaker={sneaker}
                    viewMode="list"
                    index={idx}
                    onPreviewImage={setPreviewSneaker}
                  />
                ))}
              </div>
            )
          ) : (
            <div className="py-24 px-6 text-center max-w-sm mx-auto">
              <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-black mb-2">
                No items matched query
              </p>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-6">
                Adjust the brand filter or reset search term.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedBrand('All');
                }}
                className="text-[10px] uppercase tracking-widest border-b border-black pb-0.5 font-bold hover:opacity-50 inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Archive</span>
              </button>
            </div>
          )}
        </main>

        {/* Sneaker Image Modal */}
        <ImageModal
          sneaker={previewSneaker}
          allSneakers={filteredSneakers}
          onClose={() => setPreviewSneaker(null)}
          onSelectSneaker={setPreviewSneaker}
        />

        {/* Footer matching Clean Minimalism design */}
        <footer className="py-6 sm:py-8 px-6 sm:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] uppercase tracking-[0.25em] text-gray-400 border-t border-gray-100 mt-auto">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span>Ref. #9283-00</span>
            <span>Stock Status: Curated (10 Models)</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
            <span>All Systems Operational</span>
          </div>

          <div>© Archive Catalog {new Date().getFullYear()}</div>
        </footer>
      </div>
    </div>
  );
}
