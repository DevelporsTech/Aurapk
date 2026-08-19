import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Palette, 
  Image as ImageIcon, 
  Sparkles, 
  Edit3, 
  Plus, 
  Trash2, 
  Save, 
  RefreshCw, 
  Layers, 
  Sliders, 
  Eye, 
  Check, 
  Tag, 
  ArrowRight,
  Monitor,
  ExternalLink
} from 'lucide-react';
import { HeroSlideConfig, PromoBannerConfig } from '../../types';

export const DesignStudioManager: React.FC = () => {
  const { 
    siteDesign, 
    updateSiteDesign, 
    updateHeroSlide, 
    updatePromoBanner, 
    resetDesignToDefault, 
    addToast,
    setActiveView
  } = useStore();

  // Announcement & Global Header local form state
  const [announcementBadge, setAnnouncementBadge] = useState(siteDesign.announcementBadge);
  const [announcementText, setAnnouncementText] = useState(siteDesign.announcementText);
  const [announcementCouponCode, setAnnouncementCouponCode] = useState(siteDesign.announcementCouponCode);
  const [announcementCouponDiscount, setAnnouncementCouponDiscount] = useState(siteDesign.announcementCouponDiscount);
  const [headerSlogan, setHeaderSlogan] = useState(siteDesign.headerSlogan);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(siteDesign.freeShippingThreshold);

  // Edit Slide Modal
  const [editingSlide, setEditingSlide] = useState<HeroSlideConfig | null>(null);
  const [isAddSlideModal, setIsAddSlideModal] = useState(false);
  const [slideTitle, setSlideTitle] = useState('');
  const [slideSubtitle, setSlideSubtitle] = useState('');
  const [slideBadge, setSlideBadge] = useState('');
  const [slideCtaText, setSlideCtaText] = useState('');
  const [slideCtaCategory, setSlideCtaCategory] = useState('smart-audio');
  const [slideImage, setSlideImage] = useState('');
  const [slideHighlightCode, setSlideHighlightCode] = useState('');

  // Edit Promo Banner Modal
  const [editingPromo, setEditingPromo] = useState<PromoBannerConfig | null>(null);
  const [promoBadge, setPromoBadge] = useState('');
  const [promoTitle, setPromoTitle] = useState('');
  const [promoSubtitle, setPromoSubtitle] = useState('');
  const [promoCategory, setPromoCategory] = useState('womens-fashion');
  const [promoCtaText, setPromoCtaText] = useState('');
  const [promoDiscountLabel, setPromoDiscountLabel] = useState('');
  const [promoImage, setPromoImage] = useState('');

  const handleSaveGlobalDesign = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteDesign({
      announcementBadge,
      announcementText,
      announcementCouponCode,
      announcementCouponDiscount,
      headerSlogan,
      freeShippingThreshold: Number(freeShippingThreshold)
    });
  };

  const openEditSlideModal = (slide: HeroSlideConfig) => {
    setEditingSlide(slide);
    setIsAddSlideModal(false);
    setSlideTitle(slide.title);
    setSlideSubtitle(slide.subtitle);
    setSlideBadge(slide.badge);
    setSlideCtaText(slide.ctaText);
    setSlideCtaCategory(slide.ctaCategory);
    setSlideImage(slide.image);
    setSlideHighlightCode(slide.highlightCode);
  };

  const openAddSlideModal = () => {
    setEditingSlide(null);
    setIsAddSlideModal(true);
    setSlideTitle('Festive Summer Lawn & Pret 2026');
    setSlideSubtitle('Explore 100% pure Swiss voile and embroidered lawn suits with rapid nationwide TCS delivery.');
    setSlideBadge('FESTIVE DROPS');
    setSlideCtaText('SHOP FESTIVE LAWN');
    setSlideCtaCategory('womens-fashion');
    setSlideImage('https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80');
    setSlideHighlightCode('USE CODE: EIDSALE');
  };

  const handleSaveSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSlide) {
      updateHeroSlide(editingSlide.id, {
        title: slideTitle,
        subtitle: slideSubtitle,
        badge: slideBadge,
        ctaText: slideCtaText,
        ctaCategory: slideCtaCategory,
        image: slideImage,
        highlightCode: slideHighlightCode
      });
      setEditingSlide(null);
    } else if (isAddSlideModal) {
      const newSlide: HeroSlideConfig = {
        id: `slide-${Date.now()}`,
        title: slideTitle,
        subtitle: slideSubtitle,
        badge: slideBadge,
        ctaText: slideCtaText,
        ctaCategory: slideCtaCategory,
        image: slideImage,
        highlightCode: slideHighlightCode
      };
      updateSiteDesign({
        heroSlides: [...siteDesign.heroSlides, newSlide]
      });
      setIsAddSlideModal(false);
      addToast('success', 'Slide Created', 'New hero showcase slide added.');
    }
  };

  const handleDeleteSlide = (slideId: string) => {
    if (siteDesign.heroSlides.length <= 1) {
      addToast('error', 'Action Restricted', 'You must have at least one active hero slide.');
      return;
    }
    updateSiteDesign({
      heroSlides: siteDesign.heroSlides.filter(s => s.id !== slideId)
    });
    addToast('info', 'Slide Removed', 'Hero slide removed from slideshow.');
  };

  const openEditPromoModal = (banner: PromoBannerConfig) => {
    setEditingPromo(banner);
    setPromoBadge(banner.badge);
    setPromoTitle(banner.title);
    setPromoSubtitle(banner.subtitle);
    setPromoCategory(banner.category || 'womens-fashion');
    setPromoCtaText(banner.ctaText || 'SHOP COLLECTION');
    setPromoDiscountLabel(banner.discountLabel || '');
    setPromoImage(banner.image);
  };

  const handleSavePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPromo) return;
    updatePromoBanner(editingPromo.id, {
      badge: promoBadge,
      title: promoTitle,
      subtitle: promoSubtitle,
      category: promoCategory,
      ctaText: promoCtaText,
      discountLabel: promoDiscountLabel,
      image: promoImage
    });
    setEditingPromo(null);
  };

  return (
    <div id="design-studio-manager-section" className="space-y-6 text-white">
      
      {/* Top Banner Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0e0e0e] border border-white/10 p-6 rounded-3xl shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Palette className="w-5 h-5 text-[#059669]" />
            <h2 className="text-xl font-display font-black text-white uppercase italic tracking-tight">
              STOREFRONT DESIGN & THEME STUDIO
            </h2>
            <span className="bg-[#059669]/20 border border-[#059669]/30 text-[#059669] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              REAL-TIME VISUALS
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Customize top announcement bar copy, banner photography, hero slides, and promotional lookbooks in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('home')}
            className="bg-[#141414] hover:bg-white/10 border border-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#059669]" />
            <span>VIEW LIVE STORE</span>
          </button>

          <button
            onClick={resetDesignToDefault}
            className="bg-rose-950/40 hover:bg-rose-900 border border-rose-500/30 text-rose-300 text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>RESET TO DEFAULT</span>
          </button>
        </div>
      </div>

      {/* Global Header & Announcement Bar Settings */}
      <div className="bg-[#0e0e0e] border border-white/10 p-6 rounded-3xl space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-white/10">
          <Sliders className="w-4 h-4 text-[#059669]" />
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-200">
            TOP ANNOUNCEMENT BAR & GLOBAL STORE MESSAGING
          </h3>
        </div>

        <form onSubmit={handleSaveGlobalDesign} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            <div className="md:col-span-3">
              <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                ANNOUNCEMENT BADGE
              </label>
              <input
                type="text"
                value={announcementBadge}
                onChange={e => setAnnouncementBadge(e.target.value)}
                placeholder="e.g. PAKISTAN DROP, EID SPECIAL"
                className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white outline-none focus:border-[#059669]"
              />
            </div>

            <div className="md:col-span-9">
              <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                TOP BAR BANNER TEXT
              </label>
              <input
                type="text"
                value={announcementText}
                onChange={e => setAnnouncementText(e.target.value)}
                placeholder="e.g. Free Nationwide TCS Shipping on Orders Over ₨ 2,999 — Shop 2026 Collection"
                className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white outline-none focus:border-[#059669]"
              />
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                FEATURED COUPON CODE (TOP BAR)
              </label>
              <input
                type="text"
                value={announcementCouponCode}
                onChange={e => setAnnouncementCouponCode(e.target.value.toUpperCase())}
                placeholder="e.g. WELCOMEPK"
                className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white font-mono font-bold uppercase outline-none focus:border-[#059669]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                COUPON DISCOUNT BADGE
              </label>
              <input
                type="text"
                value={announcementCouponDiscount}
                onChange={e => setAnnouncementCouponDiscount(e.target.value)}
                placeholder="e.g. 15% OFF"
                className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white outline-none focus:border-[#059669]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                FREE SHIPPING MIN SPEND (PKR ₨)
              </label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={e => setFreeShippingThreshold(Number(e.target.value))}
                placeholder="2999"
                className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white font-mono outline-none focus:border-[#059669]"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="bg-[#059669] hover:bg-[#047857] text-white font-black px-6 py-2.5 rounded-full uppercase tracking-wider text-xs flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Save className="w-3.5 h-3.5" />
              <span>SAVE HEADER SETTINGS</span>
            </button>
          </div>
        </form>
      </div>

      {/* Hero Slides Management */}
      <div className="bg-[#0e0e0e] border border-white/10 p-6 rounded-3xl space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#059669]" />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-200">
                HERO BANNER SLIDES ({siteDesign.heroSlides.length} ACTIVE)
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              These large bold typography cards rotate on the homepage hero section.
            </p>
          </div>

          <button
            onClick={openAddSlideModal}
            className="bg-[#059669] hover:bg-[#047857] text-white text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-full flex items-center gap-1.5 cursor-pointer shadow-md self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>ADD NEW HERO SLIDE</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {siteDesign.heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-[#059669]/50 transition-all shadow-md"
            >
              <div className="relative h-40 overflow-hidden bg-black">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 bg-[#059669] text-black font-black text-[9px] px-2 py-0.5 rounded tracking-widest uppercase">
                  SLIDE 0{index + 1} • {slide.badge}
                </div>
                <div className="absolute bottom-2 left-3 right-3 font-mono text-[10px] text-slate-300 truncate">
                  {slide.highlightCode}
                </div>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-black text-sm text-white uppercase italic tracking-tight line-clamp-2">
                    {slide.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                    {slide.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono text-[#059669] uppercase font-bold">
                    CTA: {slide.ctaText}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditSlideModal(slide)}
                      className="p-1.5 bg-[#1e1e1e] hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Edit Slide"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteSlide(slide.id)}
                      className="p-1.5 bg-[#1e1e1e] hover:bg-rose-950/50 rounded-lg text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Delete Slide"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Promo Banners Studio */}
      <div className="bg-[#0e0e0e] border border-white/10 p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#059669]" />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-200">
                PROMOTIONAL SPLIT CARDS (HOMEPAGE 2-GRID)
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Edit the two editorial lookbook cards featured below the categories navigation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {siteDesign.promoBanners.map((banner, index) => (
            <div
              key={banner.id}
              className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden p-5 flex flex-col justify-between space-y-4"
            >
              <div className="flex gap-4">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-24 h-24 rounded-xl object-cover border border-white/10 shrink-0"
                />
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-[#059669] uppercase tracking-wider">
                    {banner.badge}
                  </span>
                  <h4 className="font-display font-black text-sm text-white uppercase italic tracking-tight">
                    {banner.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {banner.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                <span className="font-mono font-bold text-slate-300 text-[11px]">
                  {banner.discountLabel || banner.category}
                </span>

                <button
                  onClick={() => openEditPromoModal(banner)}
                  className="bg-[#059669] hover:bg-[#047857] text-white font-black text-[10px] uppercase tracking-wider px-4 py-2 rounded-full flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>EDIT CARD</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Edit Hero Slide */}
      {(editingSlide || isAddSlideModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={() => { setEditingSlide(null); setIsAddSlideModal(false); }} />
          <div className="relative w-full max-w-lg bg-[#080808] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 z-10 space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-display font-black text-white uppercase italic tracking-tight">
                {editingSlide ? 'EDIT HERO SLIDE' : 'CREATE NEW HERO SLIDE'}
              </h3>
              <button 
                onClick={() => { setEditingSlide(null); setIsAddSlideModal(false); }}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSlide} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                  MAIN HEADLINE *
                </label>
                <input
                  type="text"
                  required
                  value={slideTitle}
                  onChange={e => setSlideTitle(e.target.value)}
                  placeholder="e.g. Up to 60% Off Across Pakistan"
                  className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                  SUBTITLE / VALUE PROPOSITION
                </label>
                <textarea
                  rows={2}
                  value={slideSubtitle}
                  onChange={e => setSlideSubtitle(e.target.value)}
                  placeholder="e.g. From Designer Lawn Pret to High-End Wireless ANC Earbuds."
                  className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white outline-none focus:border-[#059669]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                    BADGE LABEL
                  </label>
                  <input
                    type="text"
                    value={slideBadge}
                    onChange={e => setSlideBadge(e.target.value)}
                    placeholder="e.g. MEGA GALA 2026"
                    className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white outline-none focus:border-[#059669]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                    VOUCHER TAG
                  </label>
                  <input
                    type="text"
                    value={slideHighlightCode}
                    onChange={e => setSlideHighlightCode(e.target.value)}
                    placeholder="e.g. USE CODE: AZADI500"
                    className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white font-mono outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                    BUTTON CTA TEXT
                  </label>
                  <input
                    type="text"
                    value={slideCtaText}
                    onChange={e => setSlideCtaText(e.target.value)}
                    placeholder="e.g. EXPLORE GALA DEALS"
                    className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white outline-none focus:border-[#059669]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                    CTA TARGET CATEGORY
                  </label>
                  <select
                    value={slideCtaCategory}
                    onChange={e => setSlideCtaCategory(e.target.value)}
                    className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white outline-none focus:border-[#059669]"
                  >
                    <option value="smart-audio">Smart Audio</option>
                    <option value="womens-fashion">Women's Fashion</option>
                    <option value="mens-wear">Men's Wear</option>
                    <option value="footwear">Footwear</option>
                    <option value="fragrances">Fragrances</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                  BACKGROUND IMAGE URL
                </label>
                <input
                  type="text"
                  required
                  value={slideImage}
                  onChange={e => setSlideImage(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white font-mono text-[11px] outline-none focus:border-[#059669]"
                />
              </div>

              {/* Preset Image Options */}
              <div className="space-y-1 pt-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Preset HD Pakistani Photo Themes:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSlideImage('https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80')}
                    className="text-[10px] bg-[#1a1a1a] hover:bg-white/10 text-slate-300 px-2.5 py-1 rounded-lg border border-white/10"
                  >
                    🎧 ANC Earbuds
                  </button>
                  <button
                    type="button"
                    onClick={() => setSlideImage('https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80')}
                    className="text-[10px] bg-[#1a1a1a] hover:bg-white/10 text-slate-300 px-2.5 py-1 rounded-lg border border-white/10"
                  >
                    👗 Festive Lawn Pret
                  </button>
                  <button
                    type="button"
                    onClick={() => setSlideImage('https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=80')}
                    className="text-[10px] bg-[#1a1a1a] hover:bg-white/10 text-slate-300 px-2.5 py-1 rounded-lg border border-white/10"
                  >
                    🌸 Oud & Fragrances
                  </button>
                  <button
                    type="button"
                    onClick={() => setSlideImage('https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=1200&q=80')}
                    className="text-[10px] bg-[#1a1a1a] hover:bg-white/10 text-slate-300 px-2.5 py-1 rounded-lg border border-white/10"
                  >
                    👞 Leather Chappals
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => { setEditingSlide(null); setIsAddSlideModal(false); }}
                  className="px-5 py-2.5 rounded-full text-slate-400 hover:text-white uppercase font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#059669] hover:bg-[#047857] text-white font-black px-6 py-2.5 rounded-full uppercase tracking-wider text-xs cursor-pointer shadow-md"
                >
                  Save Hero Slide
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Promo Banner */}
      {editingPromo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={() => setEditingPromo(null)} />
          <div className="relative w-full max-w-lg bg-[#080808] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 z-10 space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-display font-black text-white uppercase italic tracking-tight">
                EDIT PROMOTIONAL CARD
              </h3>
              <button 
                onClick={() => setEditingPromo(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePromo} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                  MAIN HEADLINE *
                </label>
                <input
                  type="text"
                  required
                  value={promoTitle}
                  onChange={e => setPromoTitle(e.target.value)}
                  placeholder="e.g. EMBROIDERED 3-PIECE & SILK"
                  className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                  DESCRIPTION
                </label>
                <textarea
                  rows={2}
                  value={promoSubtitle}
                  onChange={e => setPromoSubtitle(e.target.value)}
                  placeholder="e.g. Discover lightweight summer lawn with intricate zari embroidery..."
                  className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white outline-none focus:border-[#059669]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                    BADGE LABEL
                  </label>
                  <input
                    type="text"
                    value={promoBadge}
                    onChange={e => setPromoBadge(e.target.value)}
                    placeholder="e.g. FESTIVE LAWN PRET 2026"
                    className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white outline-none focus:border-[#059669]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                    DISCOUNT BADGE
                  </label>
                  <input
                    type="text"
                    value={promoDiscountLabel}
                    onChange={e => setPromoDiscountLabel(e.target.value)}
                    placeholder="e.g. EXTRA 15% OFF"
                    className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                    BUTTON CTA
                  </label>
                  <input
                    type="text"
                    value={promoCtaText}
                    onChange={e => setPromoCtaText(e.target.value)}
                    placeholder="e.g. SHOP COLLECTION"
                    className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white outline-none focus:border-[#059669]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                    CATEGORY LINK
                  </label>
                  <select
                    value={promoCategory}
                    onChange={e => setPromoCategory(e.target.value)}
                    className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white outline-none focus:border-[#059669]"
                  >
                    <option value="womens-fashion">Women's Fashion</option>
                    <option value="mens-wear">Men's Wear</option>
                    <option value="smart-audio">Smart Audio</option>
                    <option value="fragrances">Fragrances</option>
                    <option value="footwear">Footwear</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                  IMAGE URL
                </label>
                <input
                  type="text"
                  required
                  value={promoImage}
                  onChange={e => setPromoImage(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white font-mono text-[11px] outline-none focus:border-[#059669]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingPromo(null)}
                  className="px-5 py-2.5 rounded-full text-slate-400 hover:text-white uppercase font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#059669] hover:bg-[#047857] text-white font-black px-6 py-2.5 rounded-full uppercase tracking-wider text-xs cursor-pointer shadow-md"
                >
                  Save Card
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
