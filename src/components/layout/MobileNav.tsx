import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Home, Grid, Heart, ShoppingBag, Truck } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    cartTotalCount, 
    setIsCartOpen, 
    wishlist,
    setFilterState
  } = useStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#080808]/95 backdrop-blur-lg border-t border-white/10 lg:hidden px-2 py-2 shadow-2xl safe-area-inset-bottom">
      <div className="flex items-center justify-around">
        
        {/* Home */}
        <button
          id="mob-nav-home"
          onClick={() => {
            setActiveView('home');
            setFilterState(prev => ({ ...prev, category: 'all', searchQuery: '' }));
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors ${
            activeView === 'home'
              ? 'text-[#059669] font-black'
              : 'text-slate-400'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[9px] font-black uppercase tracking-widest mt-1">Home</span>
        </button>

        {/* Shop / Catalog */}
        <button
          id="mob-nav-shop"
          onClick={() => {
            setActiveView('catalog');
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors ${
            activeView === 'catalog'
              ? 'text-[#059669] font-black'
              : 'text-slate-400'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span className="text-[9px] font-black uppercase tracking-widest mt-1">Catalog</span>
        </button>

        {/* Live Tracking */}
        <button
          id="mob-nav-tracking"
          onClick={() => setActiveView('tracking')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors ${
            activeView === 'tracking'
              ? 'text-[#059669] font-black'
              : 'text-slate-400'
          }`}
        >
          <Truck className="w-5 h-5" />
          <span className="text-[9px] font-black uppercase tracking-widest mt-1">Track</span>
        </button>

        {/* Wishlist */}
        <button
          id="mob-nav-wishlist"
          onClick={() => setActiveView('account')}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-400 relative"
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest mt-1">Saved</span>
        </button>

        {/* Cart Drawer */}
        <button
          id="mob-nav-cart"
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-white relative font-medium"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-[#059669]" />
            {cartTotalCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-[#059669] text-black text-[9px] font-black px-1.5 py-0.2 rounded-full">
                {cartTotalCount}
              </span>
            )}
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest mt-1 text-[#059669]">Cart</span>
        </button>

      </div>
    </nav>
  );
};
