import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ProductFilterSidebar } from './ProductFilterSidebar';
import { SlidersHorizontal, Grid3X3, List, X, Search, RotateCcw } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const { products, filterState, setFilterState, resetFilters } = useStore();
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        // Category
        if (filterState.category !== 'all' && product.category !== filterState.category) {
          return false;
        }
        // Subcategory
        if (filterState.subcategory !== 'all' && product.subcategory !== filterState.subcategory) {
          return false;
        }
        // Brand
        if (filterState.brand !== 'all' && product.brand !== filterState.brand) {
          return false;
        }
        // Price
        if (product.price > filterState.maxPrice) {
          return false;
        }
        // Rating
        if (filterState.minRating > 0 && product.rating < filterState.minRating) {
          return false;
        }
        // Stock
        if (filterState.inStockOnly && !product.inStock) {
          return false;
        }
        // On Sale
        if (filterState.onSaleOnly && product.discountPercentage <= 0) {
          return false;
        }
        // Search
        if (filterState.searchQuery.trim()) {
          const q = filterState.searchQuery.toLowerCase();
          const matchTitle = product.title.toLowerCase().includes(q);
          const matchBrand = product.brand.toLowerCase().includes(q);
          const matchTag = product.tags.some(t => t.toLowerCase().includes(q));
          const matchDesc = product.description.toLowerCase().includes(q);
          if (!matchTitle && !matchBrand && !matchTag && !matchDesc) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (filterState.sortBy === 'price-low') return a.price - b.price;
        if (filterState.sortBy === 'price-high') return b.price - a.price;
        if (filterState.sortBy === 'rating') return b.rating - a.rating;
        if (filterState.sortBy === 'discount') return b.discountPercentage - a.discountPercentage;
        if (filterState.sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return 0; // default featured
      });
  }, [products, filterState]);

  // Active filter count
  const hasActiveFilters = 
    filterState.category !== 'all' || 
    filterState.brand !== 'all' || 
    filterState.maxPrice < 30000 || 
    filterState.minRating > 0 || 
    filterState.onSaleOnly || 
    filterState.inStockOnly ||
    Boolean(filterState.searchQuery);

  return (
    <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white">
      
      {/* Top Header & Search Indicator */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#059669] mb-1 block">
            VERIFIED PAKISTAN DROPS
          </span>
          <h1 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-white italic">
            {filterState.searchQuery
              ? `RESULTS FOR "${filterState.searchQuery.toUpperCase()}"`
              : filterState.category !== 'all'
              ? `${filterState.category.toUpperCase().replace('-', ' ')} COLLECTION`
              : 'BROWSE ALL COLLECTIONS'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Showing <strong className="text-white font-mono">{filteredProducts.length}</strong> items with Cash on Delivery nationwide
          </p>
        </div>

        {/* Controls: Layout toggle, Sort dropdown, Mobile filter button */}
        <div className="flex items-center gap-3">
          
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-[#121212] text-white text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-full border border-white/15"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#059669]" />
            <span>FILTERS {hasActiveFilters && '•'}</span>
          </button>

          {/* Sort Dropdown */}
          <select
            value={filterState.sortBy}
            onChange={e => setFilterState(prev => ({ ...prev, sortBy: e.target.value as any }))}
            className="bg-[#121212] text-white text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-full border border-white/15 outline-none focus:border-[#059669] cursor-pointer"
          >
            <option value="featured">FEATURED / CURATED</option>
            <option value="price-low">PRICE: LOW TO HIGH</option>
            <option value="price-high">PRICE: HIGH TO LOW</option>
            <option value="rating">TOP RATED</option>
            <option value="discount">BIGGEST DISCOUNTS %</option>
            <option value="newest">NEWEST ARRIVALS</option>
          </select>

          {/* Grid vs List View */}
          <div className="hidden sm:flex items-center bg-[#121212] p-1 rounded-full border border-white/15">
            <button
              onClick={() => setLayoutMode('grid')}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                layoutMode === 'grid'
                  ? 'bg-white text-black font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setLayoutMode('list')}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                layoutMode === 'list'
                  ? 'bg-white text-black font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs text-slate-400 font-black uppercase tracking-wider">ACTIVE:</span>

          {filterState.searchQuery && (
            <span className="inline-flex items-center gap-1.5 bg-[#141414] text-white text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/15">
              <Search className="w-3 h-3 text-slate-400" />
              "{filterState.searchQuery}"
              <button onClick={() => setFilterState(prev => ({ ...prev, searchQuery: '' }))}>
                <X className="w-3 h-3 text-slate-400 hover:text-rose-500" />
              </button>
            </span>
          )}

          {filterState.category !== 'all' && (
            <span className="inline-flex items-center gap-1.5 bg-[#059669]/15 text-[#059669] text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full border border-[#059669]/40">
              CATEGORY: {filterState.category}
              <button onClick={() => setFilterState(prev => ({ ...prev, category: 'all' }))}>
                <X className="w-3 h-3 text-[#059669] hover:text-rose-500" />
              </button>
            </span>
          )}

          {filterState.brand !== 'all' && (
            <span className="inline-flex items-center gap-1.5 bg-[#141414] text-white text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/15">
              BRAND: {filterState.brand}
              <button onClick={() => setFilterState(prev => ({ ...prev, brand: 'all' }))}>
                <X className="w-3 h-3 text-slate-400 hover:text-rose-500" />
              </button>
            </span>
          )}

          {filterState.onSaleOnly && (
            <span className="inline-flex items-center gap-1.5 bg-rose-950/60 text-rose-300 text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full border border-rose-800">
              FLASH DEALS ⚡
              <button onClick={() => setFilterState(prev => ({ ...prev, onSaleOnly: false }))}>
                <X className="w-3 h-3 hover:text-rose-500" />
              </button>
            </span>
          )}

          <button
            onClick={resetFilters}
            className="text-xs text-[#059669] hover:underline font-black uppercase tracking-wider ml-2"
          >
            CLEAR ALL
          </button>
        </div>
      )}

      {/* Main Grid Content with Desktop Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Desktop Sidebar */}
        <div className="hidden lg:block bg-[#0c0c0c] border border-white/10 p-6 rounded-3xl sticky top-24 shadow-2xl">
          <ProductFilterSidebar />
        </div>

        {/* Product Cards Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div
              className={
                layoutMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6'
                  : 'space-y-4'
              }
            >
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} layout={layoutMode} />
              ))}
            </div>
          ) : (
            <div className="bg-[#0c0c0c] border border-white/10 rounded-3xl p-12 text-center space-y-4 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-[#141414] flex items-center justify-center mx-auto text-slate-400 border border-white/10">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-white">
                NO PRODUCTS MATCH YOUR CRITERIA
              </h3>
              <p className="text-slate-400 text-xs max-w-md mx-auto">
                Try widening your price range, choosing another category, or clearing the search keyword.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 bg-white hover:bg-[#059669] text-black hover:text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-full shadow-lg transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>RESET ALL FILTERS</span>
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Mobile Slide-Over Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#0c0c0c] h-full shadow-2xl z-10 flex flex-col overflow-y-auto p-6 border-l border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <h3 className="font-display font-black text-lg uppercase tracking-tight text-white">FILTERS</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1">
              <ProductFilterSidebar onCloseMobile={() => setIsMobileFilterOpen(false)} />
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-[#059669] text-black font-black uppercase tracking-widest py-3.5 rounded-full text-xs text-center shadow-lg"
              >
                SHOW {filteredProducts.length} RESULTS
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
