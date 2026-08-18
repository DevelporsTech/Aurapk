import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Check, 
  Plus, 
  Minus,
  Share2
} from 'lucide-react';
import { formatPKR } from '../../data/pakistanLocations';
import { ProductVariant } from '../../types';

export const ProductDetailModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    selectedCity,
    addToast
  } = useStore();

  const product = quickViewProduct || selectedProduct;
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews' | 'shipping'>('desc');

  if (!product) return null;

  const closeModal = () => {
    setQuickViewProduct(null);
    setSelectedProduct(null);
    setSelectedVariant(undefined);
    setQuantity(1);
    setSelectedImageIdx(0);
  };

  const isWish = isInWishlist(product.id);
  const images = product.images.length > 0 ? product.images : [product.featuredImage];
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentOriginalPrice = selectedVariant ? selectedVariant.originalPrice : product.originalPrice;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
    closeModal();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('info', 'Link Copied', 'Product link copied to clipboard.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={closeModal}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#080808] text-white rounded-3xl shadow-2xl border border-white/10 overflow-hidden z-10 flex flex-col my-auto max-h-[92vh]">
        
        {/* Header Close & Share Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-[#059669] uppercase tracking-widest">
              {product.brand}
            </span>
            <span className="text-white/20">•</span>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{product.category.replace('-', ' ')}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Share product link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={closeModal}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Gallery Column */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-black border border-white/10">
                <img
                  src={images[selectedImageIdx]}
                  alt={product.title}
                  className="w-full h-full object-cover filter brightness-95"
                />
                {product.discountPercentage > 0 && (
                  <div className="absolute top-3 left-3 bg-[#059669] text-black font-black text-xs px-3 py-1 rounded uppercase tracking-wider shadow-lg">
                    -{product.discountPercentage}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`w-16 h-16 rounded-2xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                        selectedImageIdx === idx
                          ? 'border-[#059669] shadow-md ring-2 ring-[#059669]/20'
                          : 'border-white/10 opacity-50 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Verified Trust Badges */}
              <div className="bg-[#0e0e0e] p-4 rounded-2xl border border-white/10 space-y-2.5 text-xs">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Truck className="w-4 h-4 text-[#059669]" />
                  <span>Delivering to <strong className="text-[#059669]">{selectedCity.name}</strong> ({selectedCity.estimatedDeliveryDays})</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-[#059669]" />
                  <span>{product.warranty}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <RotateCcw className="w-4 h-4 text-[#059669]" />
                  <span>7-Day Return Guarantee via Doorstep Rider Collection</span>
                </div>
              </div>

            </div>

            {/* Product Meta & Actions Column */}
            <div className="space-y-6">
              
              <div>
                {/* Rating & reviews */}
                <div className="flex items-center gap-2 mb-2 font-mono">
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-white">{product.rating}</span>
                  <span className="text-xs text-slate-500">({product.reviewCount} verified reviews)</span>
                </div>

                {/* Title */}
                <h1 className="font-display text-xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight italic">
                  {product.title}
                </h1>

                {/* Price block */}
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-2xl sm:text-4xl font-black font-mono text-[#059669]">
                    {formatPKR(currentPrice)}
                  </span>
                  {currentOriginalPrice > currentPrice && (
                    <span className="text-sm text-slate-500 line-through font-mono">
                      {formatPKR(currentOriginalPrice)}
                    </span>
                  )}
                  <span className="text-xs font-black uppercase tracking-wider text-black bg-[#059669] px-2 py-0.5 rounded">
                    SAVE {formatPKR(currentOriginalPrice - currentPrice)}
                  </span>
                </div>
              </div>

              {/* Stock Indicator */}
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 text-[#059669] font-black uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#059669] animate-ping inline-block" />
                  IN STOCK ({product.stockCount} UNITS AVAILABLE)
                </span>
                <span className="text-slate-500">• Ready for dispatch</span>
              </div>

              {/* Variants Selector (Size / Color) */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-3 border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black uppercase tracking-wider text-slate-400">
                      SELECT OPTION / SIZE:
                    </span>
                    {selectedVariant && (
                      <span className="text-[#059669] font-black uppercase">
                        {selectedVariant.name}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {product.variants.map(v => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`p-3 rounded-2xl text-left border text-xs transition-all cursor-pointer ${
                          selectedVariant?.id === v.id
                            ? 'border-[#059669] bg-[#059669]/15 font-black text-white ring-1 ring-[#059669]'
                            : 'border-white/10 text-slate-300 hover:border-white/30 bg-[#0e0e0e]'
                        }`}
                      >
                        <div className="truncate font-bold uppercase">{v.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">{formatPKR(v.price)}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add to Cart */}
              <div className="space-y-4 border-t border-white/10 pt-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex items-center border border-white/20 rounded-full p-1 bg-[#141414]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center font-mono font-black text-sm text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-white hover:bg-[#059669] text-black hover:text-white font-black text-xs uppercase tracking-widest py-3.5 px-6 rounded-full shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO BAG • {formatPKR(currentPrice * quantity)}</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3.5 rounded-full border transition-colors cursor-pointer ${
                      isWish ? 'bg-rose-500 text-white border-rose-500' : 'text-slate-400 hover:text-white border-white/20 hover:bg-white/10'
                    }`}
                    title="Save to Wishlist"
                  >
                    <Heart className="w-5 h-5 fill-current" />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Tabbed Info (Description, Specs, Customer Reviews, Shipping) */}
          <div className="border-t border-white/10 pt-6">
            
            <div className="flex border-b border-white/10 gap-6 text-xs font-black uppercase tracking-wider overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('desc')}
                className={`pb-3 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'desc'
                    ? 'border-b-2 border-[#059669] text-[#059669]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                DESCRIPTION
              </button>

              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'specs'
                    ? 'border-b-2 border-[#059669] text-[#059669]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                SPECIFICATIONS
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-[#059669] text-[#059669]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                REVIEWS ({product.reviews.length})
              </button>

              <button
                onClick={() => setActiveTab('shipping')}
                className={`pb-3 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'shipping'
                    ? 'border-b-2 border-[#059669] text-[#059669]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                DELIVERY & RETURNS
              </button>
            </div>

            {/* Tab Content */}
            <div className="pt-5 text-xs text-slate-300 leading-relaxed">
              
              {activeTab === 'desc' && (
                <div className="space-y-4">
                  <p>{product.description}</p>
                  
                  {product.features.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <h4 className="font-black text-white text-xs uppercase tracking-wider">
                        KEY FEATURES & HIGHLIGHTS:
                      </h4>
                      <ul className="space-y-2">
                        {product.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="bg-[#121212] border border-white/10 p-3.5 rounded-2xl flex justify-between text-xs">
                      <span className="text-slate-400 font-bold uppercase tracking-wider">{key}</span>
                      <span className="font-bold text-white">{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {product.reviews.map(rev => (
                    <div key={rev.id} className="bg-[#121212] border border-white/10 p-4 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-white uppercase">{rev.userName}</span>
                          <span className="text-slate-400 text-[10px] bg-white/10 px-2 py-0.5 rounded font-mono">
                            {rev.userCity}
                          </span>
                          {rev.verifiedPurchase && (
                            <span className="text-[#059669] font-black text-[10px] flex items-center gap-0.5 uppercase tracking-wider">
                              <Check className="w-3 h-3" />
                              VERIFIED BUYER
                            </span>
                          )}
                        </div>
                        <span className="text-slate-500 font-mono text-[10px]">{rev.date}</span>
                      </div>

                      <div className="flex text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>

                      <p className="text-xs text-slate-300">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-4 text-xs">
                  <div className="bg-[#059669]/15 p-4 rounded-2xl border border-[#059669]/40">
                    <h5 className="font-black text-white text-sm mb-1 uppercase tracking-wider">
                      🚚 CASH ON DELIVERY & DISPATCH TIMELINES
                    </h5>
                    <p className="text-slate-300">
                      Orders placed before 4:00 PM PST are packed and dispatched on the same business day via TCS, Leopards, or Trax Express.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 bg-[#121212] border border-white/10 rounded-2xl">
                      <p className="font-black text-white uppercase tracking-wider">Karachi, Lahore & Islamabad</p>
                      <p className="text-slate-400 mt-1">24-48 Hours Doorstep Delivery (₨ 150 standard / Free above ₨ 2,999)</p>
                    </div>
                    <div className="p-4 bg-[#121212] border border-white/10 rounded-2xl">
                      <p className="font-black text-white uppercase tracking-wider">Other Cities Nationwide</p>
                      <p className="text-slate-400 mt-1">2-4 Business Days with Live SMS & WhatsApp Courier Tracking</p>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
