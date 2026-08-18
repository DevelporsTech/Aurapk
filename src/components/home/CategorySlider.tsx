import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export const CategorySlider: React.FC = () => {
  const { categories, setActiveView, setFilterState } = useStore();

  return (
    <section id="categories-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header with Bold Typography */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-[#059669] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CURATED DEPARTMENTS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white italic">
            SHOP BY <span className="text-transparent stroke-text-white">CATEGORY</span>
          </h2>
        </div>
        <button
          onClick={() => {
            setFilterState(prev => ({ ...prev, category: 'all' }));
            setActiveView('catalog');
          }}
          className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-[#059669] flex items-center gap-2 transition-colors self-start sm:self-auto"
        >
          <span>EXPLORE ALL (250+)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of Categories with Bold Index Numbers */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
        {categories.map((cat, idx) => (
          <button
            key={cat.id}
            onClick={() => {
              setFilterState(prev => ({ ...prev, category: cat.slug }));
              setActiveView('catalog');
            }}
            className="group relative rounded-2xl overflow-hidden bg-[#0c0c0c] border border-white/10 p-3 sm:p-4 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:border-[#059669]/60 hover:-translate-y-1 text-white"
          >
            {/* Watermark Index */}
            <span className="absolute top-2 right-2 text-xs font-mono font-black text-white/10 group-hover:text-[#059669]/40 transition-colors">
              0{idx + 1}
            </span>

            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden mb-3.5 ring-1 ring-white/10 group-hover:ring-[#059669] transition-all bg-black">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <h3 className="text-xs font-bold uppercase tracking-tight text-slate-200 group-hover:text-[#059669] line-clamp-2 leading-tight min-h-[32px] transition-colors">
              {cat.name}
            </h3>
            
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-1">
              {cat.itemCount} ITEMS
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
