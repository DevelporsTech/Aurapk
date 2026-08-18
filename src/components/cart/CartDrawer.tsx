import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag, 
  ArrowRight, 
  ShieldCheck, 
  Truck,
  CheckCircle2
} from 'lucide-react';
import { formatPKR } from '../../data/pakistanLocations';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    cartSubtotal, 
    appliedCoupon, 
    couponDiscount, 
    applyCoupon, 
    removeCoupon,
    setIsCheckoutOpen,
    selectedCity,
    setActiveView
  } = useStore();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  // Free shipping threshold in Pakistan: ₨ 2,999
  const freeShippingThreshold = 2999;
  const progressToFreeShipping = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCodeInput.trim()) return;

    const res = applyCoupon(couponCodeInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponCodeInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Panel */}
      <div className="relative w-full max-w-md bg-[#080808] text-white h-full shadow-2xl z-10 flex flex-col justify-between border-l border-white/10">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-[#059669] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-black text-lg uppercase tracking-tight text-white italic">
                SHOPPING BAG
              </h2>
              <p className="text-[11px] font-mono text-slate-400">
                {cart.length} UNIQUE ITEM{cart.length === 1 ? '' : 'S'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#111] p-4 border-b border-white/10">
          <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-200 mb-2">
            <span className="flex items-center gap-1.5 text-[11px]">
              <Truck className="w-4 h-4 text-[#059669]" />
              {remainingForFreeShipping === 0
                ? '🎉 FREE NATIONWIDE DELIVERY UNLOCKED'
                : `ADD ${formatPKR(remainingForFreeShipping)} FOR FREE SHIPPING`}
            </span>
            <span className="font-mono text-[#059669]">{progressToFreeShipping}%</span>
          </div>

          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#059669] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-white/10">
          {cart.length > 0 ? (
            cart.map(item => (
              <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center gap-3.5">
                {/* Item Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover bg-black shrink-0 border border-white/10 filter brightness-95"
                />

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="font-bold text-xs sm:text-sm text-white uppercase tracking-tight truncate">
                    {item.title}
                  </h4>

                  {item.selectedVariant && (
                    <p className="text-[10px] text-[#059669] font-black uppercase tracking-wider">
                      VARIANT: {item.selectedVariant.name}
                    </p>
                  )}

                  <div className="flex items-center gap-2 font-mono">
                    <span className="font-black text-xs sm:text-sm text-white">
                      {formatPKR(item.price)}
                    </span>
                    {item.originalPrice > item.price && (
                      <span className="text-[10px] text-slate-500 line-through">
                        {formatPKR(item.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-3 pt-1.5">
                    <div className="flex items-center border border-white/20 rounded-full p-0.5 bg-[#141414]">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center font-mono font-black text-xs text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-500 hover:text-rose-500 text-xs p-1 cursor-pointer transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Subtotal for line item */}
                <div className="text-right shrink-0 font-mono font-black text-xs sm:text-sm text-white">
                  {formatPKR(item.price * item.quantity)}
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-display font-black text-lg uppercase tracking-tight text-white">
                YOUR BAG IS EMPTY
              </h3>
              <p className="text-xs text-slate-400 max-w-xs">
                Explore our curated Pakistani streetwear, tech, and beauty drops.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActiveView('catalog');
                }}
                className="bg-white hover:bg-[#059669] text-black hover:text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-full shadow-lg transition-all cursor-pointer"
              >
                START SHOPPING
              </button>
            </div>
          )}
        </div>

        {/* Footer: Coupon Engine, Summary, Checkout Button */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#0c0c0c] space-y-4">
            
            {/* Promo Voucher Code */}
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-[#059669]/15 border border-[#059669]/40 p-3 rounded-2xl text-xs">
                <div className="flex items-center gap-2 text-[#059669] font-black uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    COUPON <strong>{appliedCoupon.code}</strong> (-{formatPKR(couponDiscount)})
                  </span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-rose-400 hover:text-rose-300 font-black text-xs uppercase underline cursor-pointer"
                >
                  REMOVE
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCodeInput}
                    onChange={e => setCouponCodeInput(e.target.value.toUpperCase())}
                    placeholder="TRY: WELCOMEPK / AZADI500"
                    className="flex-1 bg-[#141414] border border-white/15 text-white text-xs px-4 py-2.5 rounded-full uppercase font-mono outline-none focus:border-[#059669]"
                  />
                  <button
                    type="submit"
                    className="bg-white hover:bg-[#059669] text-black hover:text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-full transition-all cursor-pointer"
                  >
                    APPLY
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-rose-400 font-medium">{couponError}</p>}
              </form>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span className="uppercase font-bold tracking-wider">SUBTOTAL</span>
                <span className="font-mono font-black text-white">{formatPKR(cartSubtotal)}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-[#059669] font-bold">
                  <span className="uppercase tracking-wider">COUPON DISCOUNT</span>
                  <span className="font-mono">-{formatPKR(couponDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="uppercase font-bold tracking-wider">SHIPPING ({selectedCity.name.toUpperCase()})</span>
                <span className="font-mono font-bold">
                  {cartSubtotal >= freeShippingThreshold ? (
                    <span className="text-[#059669] font-black uppercase">FREE</span>
                  ) : (
                    <span className="text-white">{formatPKR(selectedCity.deliveryFee)}</span>
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm font-black text-white pt-3 border-t border-white/10 uppercase tracking-tight">
                <span>ESTIMATED TOTAL</span>
                <span className="text-[#059669] font-mono text-base">
                  {formatPKR(
                    Math.max(
                      0,
                      cartSubtotal - couponDiscount + (cartSubtotal >= freeShippingThreshold ? 0 : selectedCity.deliveryFee)
                    )
                  )}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-[#059669] hover:bg-[#047857] text-white font-black text-xs uppercase tracking-widest py-4 px-6 rounded-full shadow-2xl flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <span>PROCEED TO CHECKOUT (COD)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Micro Trust Guarantee */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
              <span>CASH ON DELIVERY NATIONWIDE</span>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
