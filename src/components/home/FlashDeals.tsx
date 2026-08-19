import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { Flame, Clock, ShoppingBag, Eye, Heart, Star, Zap, ArrowRight } from 'lucide-react';
import { formatPKR } from '../../data/pakistanLocations';

export const FlashDeals: React.FC = () => {
  const { products, addToCart, toggleWishlist, isInWishlist, setQuickViewProduct, setActiveView, setFilterState, salesSettings } = useStore();
  
  // Flash deal countdown timer calculated from salesSettings
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 38, seconds: 45 });

  useEffect(() => {
    const updateCountdown = () => {
      const target = salesSettings?.flashDealsTargetTimestamp || (Date.now() + 24 * 60 * 60 * 1000);
      const diff = Math.max(0, target - Date.now());
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [salesSettings?.flashDealsTargetTimestamp]);

  const flashDealProducts = products.filter(p => p.isFlashDeal);

  if (salesSettings?.campaignActive === false || flashDealProducts.length === 0) return null;

  return (
    <section id="flash-deals-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header with Bold Typography & Live Timer */}
      <div className="bg-[#0c0c0c] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#059669] text-black text-[9px] font-black px-2 py-0.5 rounded tracking-widest uppercase">
                {salesSettings?.campaignBadge || 'LIMITED DROP'}
              </span>
              <span className="text-xs text-[#059669] font-black uppercase tracking-[0.25em]">
                {salesSettings?.flashDealsSubtitle || 'PAKISTAN FLASH VAULT'}
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white italic">
              {salesSettings?.flashDealsTitle || 'SUPER DEALS & STEALS'}
            </h2>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-3 bg-black border border-white/15 px-5 py-3 rounded-2xl self-stretch md:self-auto justify-between md:justify-start">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-black uppercase tracking-widest mr-2">
              <Clock className="w-4 h-4 text-[#059669]" />
              <span>CLOSING IN:</span>
            </div>
            <div className="flex items-center gap-1.5 text-white font-mono font-black text-lg sm:text-xl">
              <span className="bg-[#141414] border border-white/10 px-2.5 py-1 rounded-lg">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[#059669]">:</span>
              <span className="bg-[#141414] border border-white/10 px-2.5 py-1 rounded-lg">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[#059669]">:</span>
              <span className="bg-[#141414] border border-white/10 px-2.5 py-1 rounded-lg text-[#059669]">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Flash products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {flashDealProducts.map((product, idx) => {
          const claimed = product.flashDealClaimed || 75;
          const isWish = isInWishlist(product.id);

          return (
            <div
              key={product.id}
              className="group bg-[#0c0c0c] rounded-3xl overflow-hidden border border-white/10 hover:border-[#059669]/60 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col relative text-white"
            >
              {/* Watermark Numeral */}
              <span className="absolute top-4 right-4 text-3xl font-black font-display text-white/5 group-hover:text-[#059669]/20 italic pointer-events-none z-10">
                0{idx + 1}
              </span>

              {/* Product Image & Badges */}
              <div className="relative aspect-4/3 overflow-hidden bg-black">
                <img
                  src={product.featuredImage}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                />

                {/* Discount Badge */}
                <div className="absolute top-3 left-3 bg-[#059669] text-black font-black text-xs px-2.5 py-1 rounded uppercase tracking-wider shadow-md">
                  -{product.discountPercentage}% OFF
                </div>

                {/* Fast Shipping Badge */}
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-xs text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded flex items-center gap-1 border border-white/10">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>TCS 24H EXPRESS</span>
                </div>

                {/* Top Right Actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-20">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-md ${
                      isWish ? 'bg-rose-500 text-white' : 'bg-black/80 text-white hover:bg-rose-500 border border-white/10'
                    }`}
                    aria-label="Save to Wishlist"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="w-9 h-9 rounded-full bg-black/80 text-white hover:bg-[#059669] hover:text-black flex items-center justify-center shadow-md transition-colors border border-white/10"
                    aria-label="Quick View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-black uppercase tracking-widest text-[#059669] text-[11px]">
                      {product.brand}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 font-mono text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold text-white">{product.rating}</span>
                      <span className="text-slate-500">({product.reviewCount})</span>
                    </div>
                  </div>

                  <h3
                    onClick={() => setQuickViewProduct(product)}
                    className="font-bold text-base text-white uppercase tracking-tight line-clamp-2 hover:text-[#059669] transition-colors cursor-pointer"
                  >
                    {product.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {product.shortDescription}
                  </p>
                </div>

                {/* Claimed Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-wider">
                    <span className="text-[#059669] flex items-center gap-1">
                      <Flame className="w-3 h-3 text-[#059669]" />
                      {claimed}% CLAIMED
                    </span>
                    <span className="text-slate-400 font-mono">ONLY {product.stockCount} LEFT</span>
                  </div>
                  <div className="w-full bg-[#1c1c1c] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#059669] h-full rounded-full transition-all"
                      style={{ width: `${claimed}%` }}
                    />
                  </div>
                </div>

                {/* Price & Add to Cart */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-black text-white font-mono">
                      {formatPKR(product.price)}
                    </div>
                    <div className="text-xs text-slate-500 line-through font-mono">
                      {formatPKR(product.originalPrice)}
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(product, 1)}
                    className="bg-white hover:bg-[#059669] text-black hover:text-white font-black text-xs uppercase tracking-widest px-4 py-2.5 rounded-full transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-md"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>ADD TO BAG</span>
                  </button>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
