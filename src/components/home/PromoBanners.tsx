import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, ArrowRight, Tag } from 'lucide-react';

export const PromoBanners: React.FC = () => {
  const { setActiveView, setFilterState } = useStore();

  return (
    <section id="promo-banners-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Banner 1: Fashion & Lawn */}
        <div className="relative rounded-3xl overflow-hidden bg-[#0c0c0c] border border-white/10 p-6 sm:p-10 flex flex-col justify-between min-h-[300px] group shadow-2xl text-white">
          <div className="absolute inset-0 z-0 opacity-35 group-hover:scale-105 transition-transform duration-700">
            <img
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
              alt="Women Lawn Collection"
              className="w-full h-full object-cover filter grayscale mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          </div>

          <div className="relative z-10 space-y-3 max-w-sm">
            <span className="inline-flex items-center gap-1.5 text-[#059669] text-xs font-black uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5" />
              FESTIVE LAWN PRET 2026
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white italic leading-tight">
              EMBROIDERED <span className="text-transparent stroke-text-white">3-PIECE</span> & SILK
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Discover lightweight summer lawn with intricate zari embroidery and digital silk dupattas from Faisalabad mills.
            </p>
          </div>

          <div className="relative z-10 pt-6 flex items-center justify-between border-t border-white/10 mt-6">
            <button
              onClick={() => {
                setFilterState(prev => ({ ...prev, category: 'womens-fashion' }));
                setActiveView('catalog');
              }}
              className="bg-white hover:bg-[#059669] text-black hover:text-white text-xs font-black uppercase tracking-widest px-5 py-3 rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              <span>SHOP COLLECTION</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-slate-300 font-mono text-xs font-bold flex items-center gap-1.5 uppercase">
              <Tag className="w-3.5 h-3.5 text-[#059669]" />
              EXTRA 15% OFF
            </span>
          </div>
        </div>

        {/* Banner 2: Oud & Heritage */}
        <div className="relative rounded-3xl overflow-hidden bg-[#0c0c0c] border border-white/10 p-6 sm:p-10 flex flex-col justify-between min-h-[300px] group shadow-2xl text-white">
          <div className="absolute inset-0 z-0 opacity-35 group-hover:scale-105 transition-transform duration-700">
            <img
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
              alt="Oud & Fragrances"
              className="w-full h-full object-cover filter grayscale mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          </div>

          <div className="relative z-10 space-y-3 max-w-sm">
            <span className="inline-flex items-center gap-1.5 text-[#059669] text-xs font-black uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5" />
              ROYAL AROMAS & HERITAGE
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white italic leading-tight">
              PURE DEHN AL OUD & <span className="text-transparent stroke-text-white">ATTAR</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              24-hour long projection. Pure non-alcoholic Cambodian agarwood and Taif rose oils in velvet collector boxes.
            </p>
          </div>

          <div className="relative z-10 pt-6 flex items-center justify-between border-t border-white/10 mt-6">
            <button
              onClick={() => {
                setFilterState(prev => ({ ...prev, category: 'fragrances' }));
                setActiveView('catalog');
              }}
              className="bg-white hover:bg-[#059669] text-black hover:text-white text-xs font-black uppercase tracking-widest px-5 py-3 rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              <span>EXPLORE OUD</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-slate-300 font-mono text-xs font-bold flex items-center gap-1.5 uppercase">
              <Tag className="w-3.5 h-3.5 text-[#059669]" />
              CODE: WELCOMEPK
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
