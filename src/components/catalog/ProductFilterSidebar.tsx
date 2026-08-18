import React from 'react';
import { useStore } from '../../context/StoreContext';
import { RotateCcw, Star, Check } from 'lucide-react';
import { formatPKR } from '../../data/pakistanLocations';

interface ProductFilterSidebarProps {
  onCloseMobile?: () => void;
}

export const ProductFilterSidebar: React.FC<ProductFilterSidebarProps> = ({ onCloseMobile }) => {
  const { categories, products, filterState, setFilterState, resetFilters } = useStore();

  // Extract unique brands
  const brands = Array.from(new Set(products.map(p => p.brand)));

  return (
    <aside className="space-y-6 text-sm text-white">
      
      {/* Header & Reset */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <h3 className="font-black text-sm uppercase tracking-wider text-white">
          FILTER PRODUCTS
        </h3>
        <button
          onClick={resetFilters}
          className="text-xs text-[#059669] hover:underline flex items-center gap-1 font-black uppercase tracking-wider cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>RESET</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <h4 className="font-black text-[11px] uppercase tracking-widest text-slate-400">
          CATEGORY
        </h4>
        <div className="space-y-1">
          <button
            onClick={() => setFilterState(prev => ({ ...prev, category: 'all', subcategory: 'all' }))}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
              filterState.category === 'all'
                ? 'bg-white text-black font-black uppercase tracking-wider'
                : 'text-slate-400 hover:text-white hover:bg-white/5 font-semibold'
            }`}
          >
            <span>ALL CATEGORIES</span>
            <span className="text-[10px] opacity-70 font-mono">({products.length})</span>
          </button>

          {categories.map(cat => {
            const count = products.filter(p => p.category === cat.slug).length;
            const isSelected = filterState.category === cat.slug;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setFilterState(prev => ({ ...prev, category: cat.slug, subcategory: 'all' }));
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#059669] text-black font-black uppercase tracking-wider'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 font-semibold uppercase'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-70 font-mono">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider in PKR */}
      <div className="space-y-3 border-t border-white/10 pt-4">
        <div className="flex items-center justify-between">
          <h4 className="font-black text-[11px] uppercase tracking-widest text-slate-400">
            MAX PRICE: <span className="text-[#059669] font-mono">{formatPKR(filterState.maxPrice)}</span>
          </h4>
        </div>
        <input
          type="range"
          min="1000"
          max="30000"
          step="500"
          value={filterState.maxPrice}
          onChange={e => setFilterState(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-[#059669] bg-white/10 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-mono font-bold">
          <span>₨ 1,000</span>
          <span>₨ 30,000+</span>
        </div>
      </div>

      {/* Brand Selection */}
      <div className="space-y-2 border-t border-white/10 pt-4">
        <h4 className="font-black text-[11px] uppercase tracking-widest text-slate-400">
          PAKISTANI & GLOBAL BRANDS
        </h4>
        <div className="space-y-1 max-h-44 overflow-y-auto no-scrollbar">
          <button
            onClick={() => setFilterState(prev => ({ ...prev, brand: 'all' }))}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between cursor-pointer ${
              filterState.brand === 'all'
                ? 'text-[#059669] font-black uppercase'
                : 'text-slate-400 hover:text-white font-medium'
            }`}
          >
            <span>ALL BRANDS</span>
            {filterState.brand === 'all' && <Check className="w-3.5 h-3.5 text-[#059669]" />}
          </button>
          {brands.map(brand => (
            <button
              key={brand}
              onClick={() => setFilterState(prev => ({ ...prev, brand }))}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between cursor-pointer ${
                filterState.brand === brand
                  ? 'text-[#059669] font-black uppercase'
                  : 'text-slate-400 hover:text-white font-medium'
              }`}
            >
              <span>{brand}</span>
              {filterState.brand === brand && <Check className="w-3.5 h-3.5 text-[#059669]" />}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Toggles */}
      <div className="space-y-2.5 border-t border-white/10 pt-4">
        <h4 className="font-black text-[11px] uppercase tracking-widest text-slate-400">
          AVAILABILITY & OFFERS
        </h4>
        <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filterState.onSaleOnly}
            onChange={e => setFilterState(prev => ({ ...prev, onSaleOnly: e.target.checked }))}
            className="rounded accent-[#059669] focus:ring-0"
          />
          <span className="font-bold uppercase text-[11px]">DISCOUNT DEALS ONLY ⚡</span>
        </label>
        <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filterState.inStockOnly}
            onChange={e => setFilterState(prev => ({ ...prev, inStockOnly: e.target.checked }))}
            className="rounded accent-[#059669] focus:ring-0"
          />
          <span className="font-bold uppercase text-[11px]">IN STOCK (FAST TCS DISPATCH)</span>
        </label>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-2 border-t border-white/10 pt-4">
        <h4 className="font-black text-[11px] uppercase tracking-widest text-slate-400">
          CUSTOMER RATING
        </h4>
        <div className="space-y-1">
          {[4, 3, 2].map(star => (
            <button
              key={star}
              onClick={() => setFilterState(prev => ({ ...prev, minRating: prev.minRating === star ? 0 : star }))}
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between cursor-pointer transition-colors ${
                filterState.minRating === star
                  ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center text-amber-400 gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < star ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`}
                  />
                ))}
              </div>
              <span className="font-mono text-[10px]">{star}★ & ABOVE</span>
            </button>
          ))}
        </div>
      </div>

    </aside>
  );
};
