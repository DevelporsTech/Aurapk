import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Home, Grid, Heart, ShoppingBag, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    cartTotalCount, 
    setIsCartOpen, 
    wishlist,
    user,
    openAuthModal,
    setFilterState
  } = useStore();

  return (
    <nav id="mobile-bottom-navigation" className="fixed bottom-0 left-0 right-0 z-40 bg-[#080808]/95 backdrop-blur-lg border-t border-white/10 lg:hidden px-1 py-1.5 shadow-2xl safe-area-inset-bottom">
      <div className="grid grid-cols-5 items-center max-w-md mx-auto">
        
        {/* 1. Home */}
        <button
          id="mob-nav-home"
          onClick={() => {
            setActiveView('home');
            setFilterState(prev => ({ ...prev, category: 'all', searchQuery: '' }));
          }}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors cursor-pointer ${
            activeView === 'home'
              ? 'text-[#059669] font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Home className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-[9px] font-black uppercase tracking-wider mt-1">Home</span>
        </button>

        {/* 2. Catalog */}
        <button
          id="mob-nav-shop"
          onClick={() => {
            setActiveView('catalog');
          }}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors cursor-pointer ${
            activeView === 'catalog'
              ? 'text-[#059669] font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-[9px] font-black uppercase tracking-wider mt-1">Catalog</span>
        </button>

        {/* 3. Favourites */}
        <button
          id="mob-nav-wishlist"
          onClick={() => setActiveView('account')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors relative cursor-pointer ${
            activeView === 'account' && wishlist.length > 0
              ? 'text-rose-400 font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <div className="relative">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[9px] font-black uppercase tracking-wider mt-1">Saved</span>
        </button>

        {/* 4. Bag / Cart */}
        <button
          id="mob-nav-cart"
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center py-1 rounded-xl text-slate-300 hover:text-white relative cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#059669]" />
            {cartTotalCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#059669] text-black text-[8px] font-black px-1 rounded-full min-w-[14px] h-[14px] flex items-center justify-center">
                {cartTotalCount}
              </span>
            )}
          </div>
          <span className="text-[9px] font-black uppercase tracking-wider mt-1 text-[#059669]">Bag</span>
        </button>

        {/* 5. Me / Account */}
        <button
          id="mob-nav-account"
          onClick={() => {
            if (user) {
              setActiveView('account');
            } else {
              openAuthModal('login');
            }
          }}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors cursor-pointer ${
            activeView === 'account'
              ? 'text-[#059669] font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {user ? (
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#059669] text-black flex items-center justify-center font-black text-[9px]">
              {user.name.charAt(0).toUpperCase()}
            </div>
          ) : (
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
          <span className="text-[9px] font-black uppercase tracking-wider mt-1">Me</span>
        </button>

      </div>
    </nav>
  );
};
