import React, { useState, useEffect } from 'react';
import { HERO_SLIDES } from '../../data/mockProducts';
import { useStore } from '../../context/StoreContext';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Tag, ShieldCheck, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setActiveView, setFilterState, products, setQuickViewProduct } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];
  const featuredQuickItems = products.slice(0, 3);

  return (
    <div id="hero-banner-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
      
      {/* Editorial Master Container */}
      <div className="rounded-3xl overflow-hidden bg-[#080808] border border-white/10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0 text-white">
        
        {/* Left 7 Columns: Giant Bold Typography & Interactive Slideshow */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden min-h-[440px] sm:min-h-[500px]">
          
          {/* Background Ambient Imagery for the slide */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.25, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-0 pointer-events-none"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center filter grayscale mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Top Tag */}
          <div className="relative z-10">
            <motion.div
              key={`badge-${slide.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="text-[#059669] font-black text-xs uppercase tracking-[0.3em]">
                PAKISTAN EDITION • {slide.badge.toUpperCase()}
              </span>
            </motion.div>

            {/* Massive Bold Headline with Stroke Outline */}
            <motion.h1
              key={`title-${slide.id}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-6xl lg:text-[76px] xl:text-[84px] leading-[0.88] font-black italic tracking-tighter uppercase mb-6"
            >
              {slide.title.split(' ')[0]} <br />
              <span className="text-white">
                {slide.title.split(' ').slice(1, 3).join(' ')}
              </span> <br />
              <span className="text-transparent stroke-text-white">
                {slide.title.split(' ').slice(3).join(' ') || 'COLLECTION'}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              key={`sub-${slide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md mb-6"
            >
              {slide.subtitle}
            </motion.p>
          </div>

          {/* CTAs & Slide Controls */}
          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setFilterState(prev => ({ ...prev, category: slide.ctaCategory }));
                  setActiveView('catalog');
                }}
                className="bg-white text-black hover:bg-[#059669] hover:text-white px-8 sm:px-10 py-3.5 sm:py-4 font-black uppercase text-xs tracking-widest transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                {slide.ctaText}
              </button>

              <button
                onClick={() => {
                  setActiveView('catalog');
                }}
                className="border border-white/20 hover:border-white text-white px-7 sm:px-8 py-3.5 sm:py-4 font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all cursor-pointer"
              >
                LOOKBOOK 2026
              </button>

              <div className="bg-[#121212] border border-white/10 text-slate-300 text-xs font-mono font-bold px-3.5 py-3.5 flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-[#059669]" />
                <span className="tracking-wider">{slide.highlightCode}</span>
              </div>
            </div>

            {/* Slide Indicators & Arrows */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-400 font-bold uppercase tracking-widest">
              <div className="flex items-center gap-2">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 transition-all duration-300 ${
                      currentSlide === idx ? 'w-8 bg-[#059669]' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
                <span className="text-[10px] text-slate-400 font-mono ml-2">
                  0{currentSlide + 1} / 0{HERO_SLIDES.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                  className="w-8 h-8 rounded-full border border-white/20 hover:border-white hover:text-[#059669] flex items-center justify-center transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length)}
                  className="w-8 h-8 rounded-full border border-white/20 hover:border-white hover:text-[#059669] flex items-center justify-center transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right 5 Columns: Editorial Featured Cards Grid (Bold Typography theme signature) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          
          {/* Top Featured Hero Card */}
          <div 
            onClick={() => featuredQuickItems[0] && setQuickViewProduct(featuredQuickItems[0])}
            className="flex-1 border-b border-white/10 relative overflow-hidden group min-h-[240px] p-6 flex flex-col justify-between cursor-pointer bg-[#0e0e0e]"
          >
            {featuredQuickItems[0] && (
              <img
                src={featuredQuickItems[0].featuredImage}
                alt={featuredQuickItems[0].title}
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700 filter brightness-90"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
            
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-black bg-[#059669] px-2.5 py-1 rounded">
                FEATURED DROP
              </span>
              <span className="font-mono text-xs font-black text-white/80">₨ {featuredQuickItems[0]?.price.toLocaleString()}</span>
            </div>

            <div className="relative z-10">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#059669] mb-1">
                {featuredQuickItems[0]?.brand || 'Aura Signature'}
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-white line-clamp-1">
                {featuredQuickItems[0]?.title || 'Lahore Velvet Kurta'}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                Cash on Delivery & 24h Express Delivery across Pakistan
              </p>
            </div>
          </div>

          {/* Bottom Split 2 Editorial Cards */}
          <div className="grid grid-cols-2 min-h-[220px]">
            
            {/* Card 01 */}
            <div 
              onClick={() => featuredQuickItems[1] && setQuickViewProduct(featuredQuickItems[1])}
              className="border-r border-white/10 p-6 flex flex-col justify-between bg-[#0b0b0b] hover:bg-[#121212] transition-colors cursor-pointer relative group"
            >
              <div className="text-4xl sm:text-5xl font-black text-white/10 italic font-display group-hover:text-[#059669]/30 transition-colors">
                01
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#059669] mb-1">
                  {featuredQuickItems[1]?.category || 'Fragrance'}
                </div>
                <h4 className="font-bold text-sm text-white line-clamp-1 uppercase">
                  {featuredQuickItems[1]?.title || 'Cambodian Dehn Al Oud'}
                </h4>
                <div className="text-xs font-black text-[#059669] mt-1">
                  ₨ {featuredQuickItems[1]?.price.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Card 02 */}
            <div 
              onClick={() => featuredQuickItems[2] && setQuickViewProduct(featuredQuickItems[2])}
              className="p-6 flex flex-col justify-between bg-[#080808] hover:bg-[#121212] transition-colors cursor-pointer relative group"
            >
              <div className="text-4xl sm:text-5xl font-black text-white/10 italic font-display group-hover:text-[#059669]/30 transition-colors">
                02
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#059669] mb-1">
                  {featuredQuickItems[2]?.category || 'Footwear'}
                </div>
                <h4 className="font-bold text-sm text-white line-clamp-1 uppercase">
                  {featuredQuickItems[2]?.title || 'Peshawari Leather Chappal'}
                </h4>
                <div className="text-xs font-black text-[#059669] mt-1">
                  ₨ {featuredQuickItems[2]?.price.toLocaleString()}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
