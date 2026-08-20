import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  Truck, 
  LayoutDashboard, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { formatPKR } from '../../data/pakistanLocations';
import { AuraLogo } from '../common/AuraLogo';

export const Navbar: React.FC = () => {
  const { 
    cartTotalCount, 
    cartSubtotal,
    setIsCartOpen, 
    wishlist, 
    activeView, 
    setActiveView, 
    filterState,
    setFilterState,
    categories,
    user,
    setIsAuthModalOpen,
    openAuthModal
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full max-w-full bg-[#080808]/95 backdrop-blur-md border-b border-white/10 shadow-lg text-white transition-colors duration-200 overflow-x-clip">
      
      {/* Main Header Bar */}
      <div className="w-full max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-20 gap-2 sm:gap-6 min-w-0">
          
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 min-w-0">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 -ml-1 rounded-xl text-slate-300 hover:bg-white/10 lg:hidden cursor-pointer shrink-0"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo with Responsive Sizing */}
            <button
              id="brand-logo-btn"
              onClick={() => {
                setActiveView('home');
                setFilterState(prev => ({ ...prev, category: 'all', searchQuery: '' }));
              }}
              className="text-left group cursor-pointer shrink-0 min-w-0"
            >
              <AuraLogo size="md" />
            </button>
          </div>

          {/* Center (Desktop/Tablet): Quick Category Links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => {
                setActiveView('catalog');
                setFilterState(prev => ({ ...prev, category: 'all', searchQuery: '' }));
              }}
              className={`text-xs font-black uppercase tracking-wider transition-colors hover:text-[#059669] cursor-pointer whitespace-nowrap ${
                activeView === 'catalog' && filterState.category === 'all'
                  ? 'text-[#059669]'
                  : 'text-slate-300'
              }`}
            >
              Shop All
            </button>
            {categories.slice(0, 5).map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setFilterState(prev => ({ ...prev, category: cat.slug, searchQuery: '' }));
                  setActiveView('catalog');
                }}
                className={`text-xs font-bold uppercase tracking-wider transition-colors hover:text-[#059669] cursor-pointer whitespace-nowrap ${
                  activeView === 'catalog' && filterState.category === cat.slug
                    ? 'text-[#059669] font-black'
                    : 'text-slate-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Right: Actions (Tracking, Admin, Favourite, Bag/Cart, Me/User) */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 shrink-0 ml-auto min-w-0">
            
            {/* Order Tracking Button (Desktop/Tablet) */}
            <button
              id="nav-tracking-btn"
              onClick={() => setActiveView('tracking')}
              className={`hidden sm:flex p-2 rounded-xl transition-colors relative items-center gap-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer shrink-0 ${
                activeView === 'tracking' 
                  ? 'bg-[#059669] text-black' 
                  : 'text-slate-300 hover:bg-white/10 hover:text-[#059669]'
              }`}
              title="Track your order delivery"
            >
              <Truck className="w-4 h-4" />
              <span className="hidden lg:inline text-[11px]">TRACK</span>
            </button>

            {/* Admin Dashboard (Desktop) - Visible only to Admins */}
            {user?.isAdmin && (
              <button
                id="nav-admin-btn"
                onClick={() => setActiveView('admin')}
                className={`hidden md:flex p-2 rounded-xl transition-colors cursor-pointer shrink-0 ${
                  activeView === 'admin'
                    ? 'bg-[#059669] text-black'
                    : 'text-slate-300 hover:bg-white/10 hover:text-[#059669]'
                }`}
                title="Admin & Merchant Management Dashboard"
              >
                <LayoutDashboard className="w-4 h-4" />
              </button>
            )}

            {/* Favourite / Wishlist Button */}
            <button
              id="nav-wishlist-btn"
              onClick={() => {
                setActiveView('account');
              }}
              className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-slate-300 hover:text-rose-400 hover:bg-white/10 active:scale-95 transition-all cursor-pointer shrink-0"
              title="View Favourites & Wishlist"
              aria-label="View Favourites"
            >
              <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 min-w-[14px] h-[14px] px-0.5 bg-rose-500 text-white text-[8px] sm:text-[9px] font-black rounded-full flex items-center justify-center pointer-events-none shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Bag / Shopping Cart Button */}
            <button
              id="nav-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative w-8 h-8 sm:w-auto sm:px-3 sm:py-1.5 md:px-3.5 md:py-2 rounded-full bg-white text-black hover:bg-[#059669] hover:text-white active:scale-95 transition-all flex items-center justify-center gap-1.5 md:gap-2 font-black text-xs uppercase tracking-wider shadow-md cursor-pointer shrink-0"
              aria-label="Open Shopping Bag"
              title="Open Shopping Bag"
            >
              <div className="relative flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                {cartTotalCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#059669] text-black text-[8px] font-black min-w-[14px] h-[14px] px-0.5 rounded-full flex items-center justify-center ring-1 ring-[#080808] sm:hidden">
                    {cartTotalCount}
                  </span>
                )}
              </div>
              {cartTotalCount > 0 && (
                <span className="hidden sm:inline-flex bg-[#059669] text-black text-[9px] font-black px-1.5 py-0.5 rounded-full">
                  {cartTotalCount}
                </span>
              )}
              <span className="text-[11px] font-black hidden md:inline whitespace-nowrap">
                {formatPKR(cartSubtotal)}
              </span>
            </button>

            {/* Me / User Account / Authentication */}
            {user ? (
              <button
                id="nav-user-btn"
                onClick={() => setActiveView('account')}
                className="w-8 h-8 sm:w-auto sm:px-2.5 sm:py-1 rounded-full border border-white/20 text-white hover:border-[#059669] hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                title={`Account: ${user.name}`}
                aria-label="User Account"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#059669] text-black flex items-center justify-center font-black text-[10px] sm:text-[11px] shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider hidden lg:inline truncate max-w-[70px]">
                  {user.name.split(' ')[0]}
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                <button
                  id="nav-signin-btn"
                  onClick={() => openAuthModal('login')}
                  className="w-8 h-8 sm:w-auto sm:px-2.5 sm:py-1.5 rounded-full border border-white/20 text-white hover:border-[#059669] hover:text-[#059669] hover:bg-white/5 active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer shrink-0"
                  title="Sign In / User Profile"
                  aria-label="Sign In"
                >
                  <User className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#059669]" />
                  <span className="hidden sm:inline text-[11px] font-black uppercase tracking-wider">ME</span>
                </button>
                <button
                  id="nav-register-btn"
                  onClick={() => openAuthModal('register')}
                  className="hidden xl:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#059669] text-black hover:bg-[#047857] hover:text-white text-[11px] font-black uppercase tracking-wider transition-colors cursor-pointer shadow-sm shrink-0"
                >
                  <span>JOIN FREE</span>
                </button>
              </div>
            )}

          </div>

        </div>

        {/* Category Navigation Bar (Desktop & Large screens) */}
        <nav className="hidden lg:flex items-center justify-between border-t border-white/10 py-2.5 text-xs font-bold uppercase tracking-widest min-w-0">
          <div className="flex items-center gap-6 xl:gap-8 overflow-x-auto no-scrollbar">
            <button
              onClick={() => {
                setActiveView('catalog');
                setFilterState(prev => ({ ...prev, category: 'all' }));
              }}
              className={`hover:text-[#059669] transition-colors whitespace-nowrap cursor-pointer ${
                activeView === 'catalog' && filterState.category === 'all'
                  ? 'text-[#059669] font-black'
                  : 'text-slate-300'
              }`}
            >
              All Collections
            </button>

            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setFilterState(prev => ({ ...prev, category: cat.slug }));
                  setActiveView('catalog');
                }}
                className={`hover:text-[#059669] transition-colors whitespace-nowrap cursor-pointer ${
                  activeView === 'catalog' && filterState.category === cat.slug
                    ? 'text-[#059669] font-black border-b border-[#059669] pb-0.5'
                    : 'text-slate-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Flash Deals Tab */}
          <button
            onClick={() => {
              setFilterState(prev => ({ ...prev, onSaleOnly: true }));
              setActiveView('catalog');
            }}
            className="flex items-center gap-1.5 text-amber-400 font-black tracking-widest uppercase hover:text-amber-300 whitespace-nowrap pl-4 text-xs cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            FLASH DEALS ⚡
          </button>
        </nav>

      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex overflow-hidden">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          
          <div className="relative w-4/5 max-w-xs sm:max-w-sm bg-[#0c120f] border-r border-emerald-500/20 text-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto animate-in slide-in-from-left duration-200">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
              <AuraLogo size="sm" />
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu items */}
            <div className="p-4 space-y-4 flex-1">
              
              <div className="space-y-1">
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Shop by Category
                </p>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setFilterState(prev => ({ ...prev, category: cat.slug }));
                      setActiveView('catalog');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/10 text-xs font-bold text-slate-200 hover:text-emerald-300 transition-colors text-left cursor-pointer"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400/80 bg-black/40 px-2 py-0.5 rounded-full">
                      {cat.itemCount} items
                    </span>
                  </button>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2">
                <button
                  onClick={() => {
                    setActiveView('tracking');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-200 transition-colors cursor-pointer"
                >
                  <Truck className="w-4 h-4 text-emerald-400" />
                  <span>Track TCS & Leopards Order</span>
                </button>

                {user?.isAdmin && (
                  <button
                    onClick={() => {
                      setActiveView('admin');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 hover:border-emerald-500/60 text-xs font-bold text-emerald-300 transition-colors cursor-pointer"
                  >
                    <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                    <span>Merchant Admin Dashboard</span>
                  </button>
                )}

                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-[11px] text-emerald-200 space-y-1">
                  <div className="font-black text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    100% Cash On Delivery
                  </div>
                  <p className="text-[10px] text-slate-300">
                    Pay at your doorstep anywhere in Pakistan. 7-day easy exchange guarantee.
                  </p>
                </div>
              </div>

            </div>

            {/* Footer user info */}
            <div className="p-4 border-t border-white/10 bg-black/50">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-black text-white truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{user.phone}</p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveView('account');
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-xs font-black text-emerald-400 hover:text-emerald-300 underline shrink-0 cursor-pointer"
                  >
                    Account
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-[#059669] hover:bg-emerald-500 text-black font-black rounded-xl text-xs uppercase tracking-wider text-center cursor-pointer transition-colors shadow-md"
                >
                  Sign In / Register
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </header>
  );
};
