import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, ArrowRight, Tag } from 'lucide-react';

export const PromoBanners: React.FC = () => {
  const { setActiveView, setFilterState, siteDesign } = useStore();

  const banners = siteDesign?.promoBanners || [];
  if (banners.length === 0) return null;

  return (
    <section id="promo-banners-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map(banner => (
          <div 
            key={banner.id}
            className="relative rounded-3xl overflow-hidden bg-[#0c0c0c] border border-white/10 p-6 sm:p-10 flex flex-col justify-between min-h-[300px] group shadow-2xl text-white"
          >
            <div className="absolute inset-0 z-0 opacity-35 group-hover:scale-105 transition-transform duration-700">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover filter grayscale mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            </div>

            <div className="relative z-10 space-y-3 max-w-sm">
              <span className="inline-flex items-center gap-1.5 text-[#059669] text-xs font-black uppercase tracking-[0.25em]">
                <Sparkles className="w-3.5 h-3.5" />
                {banner.badge}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white italic leading-tight">
                {banner.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {banner.subtitle}
              </p>
            </div>

            <div className="relative z-10 pt-6 flex items-center justify-between border-t border-white/10 mt-6">
              <button
                onClick={() => {
                  if (banner.category) {
                    setFilterState(prev => ({ ...prev, category: banner.category }));
                  }
                  setActiveView('catalog');
                }}
                className="bg-white hover:bg-[#059669] text-black hover:text-white text-xs font-black uppercase tracking-widest px-5 py-3 rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-lg"
              >
                <span>{banner.ctaText || 'EXPLORE NOW'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              {banner.discountLabel && (
                <span className="text-slate-300 font-mono text-xs font-bold flex items-center gap-1.5 uppercase">
                  <Tag className="w-3.5 h-3.5 text-[#059669]" />
                  {banner.discountLabel}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
