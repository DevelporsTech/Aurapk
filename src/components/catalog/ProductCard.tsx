import React from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, Eye, ShoppingBag, Star, Zap } from 'lucide-react';
import { formatPKR } from '../../data/pakistanLocations';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'grid' }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct 
  } = useStore();

  const isWish = isInWishlist(product.id);

  if (layout === 'list') {
    return (
      <div className="group bg-[#0c0c0c] rounded-3xl overflow-hidden border border-white/10 hover:border-[#059669]/60 shadow-xl transition-all duration-300 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-center text-white">
        {/* Image */}
        <div className="relative w-full sm:w-48 aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden bg-black shrink-0">
          <img
            src={product.featuredImage}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
          />
          {product.discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-[#059669] text-black font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
              -{product.discountPercentage}%
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0 space-y-2 text-left w-full">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-black uppercase tracking-widest text-[#059669] text-[11px]">{product.brand}</span>
            <div className="flex items-center gap-1 text-amber-400 font-mono text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold text-white">{product.rating}</span>
              <span className="text-slate-500">({product.reviewCount})</span>
            </div>
          </div>

          <h3
            onClick={() => setQuickViewProduct(product)}
            className="font-bold text-base text-white uppercase tracking-tight hover:text-[#059669] transition-colors cursor-pointer line-clamp-1"
          >
            {product.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2">
            {product.shortDescription}
          </p>

          <div className="flex items-center gap-2 pt-1">
            <span className="text-[10px] font-black uppercase tracking-wider bg-[#161616] text-slate-300 border border-white/10 px-2 py-0.5 rounded">
              {product.warranty}
            </span>
            <span className="text-xs text-[#059669] font-bold uppercase tracking-wider">
              • Cash on Delivery
            </span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="sm:border-l sm:border-white/10 sm:pl-6 flex sm:flex-col items-center justify-between w-full sm:w-auto gap-3 shrink-0">
          <div className="text-left sm:text-right">
            <div className="text-lg font-black text-white font-mono">
              {formatPKR(product.price)}
            </div>
            {product.originalPrice > product.price && (
              <div className="text-xs text-slate-500 line-through font-mono">
                {formatPKR(product.originalPrice)}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-2.5 rounded-full border transition-colors ${
                isWish ? 'bg-rose-500 text-white border-rose-500' : 'bg-black/80 text-white border-white/10 hover:bg-rose-500'
              }`}
              title="Save to Wishlist"
            >
              <Heart className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={() => addToCart(product, 1)}
              className="bg-white hover:bg-[#059669] text-black hover:text-white font-black text-xs uppercase tracking-widest px-4 py-2.5 rounded-full shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>ADD TO BAG</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-[#0c0c0c] rounded-3xl overflow-hidden border border-white/10 hover:border-[#059669]/60 shadow-xl transition-all duration-300 flex flex-col justify-between text-white relative">
      
      {/* Top Image & Floating Badges */}
      <div className="relative aspect-square overflow-hidden bg-black">
        <img
          src={product.featuredImage}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.discountPercentage > 0 && (
            <span className="bg-[#059669] text-black font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider shadow-md">
              -{product.discountPercentage}%
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-white text-black font-black text-[9px] px-2 py-0.5 rounded shadow-md uppercase tracking-wider">
              BEST SELLER
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-slate-800 text-white font-black text-[9px] px-2 py-0.5 rounded shadow-md uppercase tracking-wider border border-white/20">
              NEW DROP
            </span>
          )}
        </div>

        {/* Fast Dispatch Badge */}
        <div className="absolute bottom-2.5 left-2.5 bg-black/80 backdrop-blur-xs text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1 border border-white/10">
          <Zap className="w-3 h-3 text-amber-400" />
          <span>TCS COD</span>
        </div>

        {/* Actions Floating (Wishlist & Quickview) */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
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
            aria-label="Quick View Product"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Info Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-black uppercase tracking-widest text-[#059669] text-[11px]">{product.brand}</span>
            <div className="flex items-center gap-1 text-amber-400 font-mono text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold text-white">{product.rating}</span>
              <span className="text-slate-500">({product.reviewCount})</span>
            </div>
          </div>

          <h3
            onClick={() => setQuickViewProduct(product)}
            className="font-bold text-sm sm:text-base text-white uppercase tracking-tight line-clamp-2 hover:text-[#059669] transition-colors cursor-pointer min-h-[40px]"
          >
            {product.title}
          </h3>

          {/* Color variants preview if available */}
          {product.variants && product.variants.some(v => v.color) && (
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-[10px] font-black uppercase text-slate-400">COLORS:</span>
              <div className="flex items-center gap-1">
                {product.variants.filter(v => v.color).map(v => (
                  <span
                    key={v.id}
                    className="w-3 h-3 rounded-full border border-white/30 inline-block shadow-2xs"
                    style={{ backgroundColor: v.color }}
                    title={v.name}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <div>
            <div className="text-base sm:text-lg font-black text-white font-mono">
              {formatPKR(product.price)}
            </div>
            {product.originalPrice > product.price && (
              <div className="text-[11px] text-slate-500 line-through font-mono">
                {formatPKR(product.originalPrice)}
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="bg-white hover:bg-[#059669] text-black hover:text-white font-black text-xs uppercase tracking-widest px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-md transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
            aria-label="Add to Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ADD</span>
          </button>
        </div>

      </div>

    </div>
  );
};
