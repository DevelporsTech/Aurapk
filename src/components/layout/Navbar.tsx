import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Truck, 
  LayoutDashboard, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  History
} from 'lucide-react';
import { formatPKR } from '../../data/pakistanLocations';

export const Navbar: React.FC = () => {
  const { 
    cartTotalCount, 
    cartSubtotal,
    setIsCartOpen, 
    wishlist, 
    activeView, 
    setActiveView, 
    darkMode, 
    setDarkMode,
    filterState,
    setFilterState,
    products,
    categories,
    user,
    setIsAuthModalOpen,
    openAuthModal,
    setSelectedProduct,
    searchHistory,
    addSearchQuery
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    addSearchQuery(searchQuery);
    setFilterState(prev => ({ ...prev, searchQuery, category: 'all' }));
    setActiveView('catalog');
    setIsSearchFocused(false);
  };

  // Real-time matched products
  const matchingProducts = searchQuery.trim()
    ? products.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 4)
    : [];

  return (
    <header className="sticky top-0 z-30 bg-[#080808]/95 backdrop-blur-md border-b border-white/10 shadow-lg text-white transition-colors duration-200">
      
      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-20 gap-2 sm:gap-4 md:gap-6">
          
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 sm:p-2 -ml-1 sm:-ml-2 rounded-xl text-slate-300 hover:bg-white/10 lg:hidden cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>

            {/* Logo with Bold Typography */}
            <button
              id="brand-logo-btn"
              onClick={() => {
                setActiveView('home');
                setFilterState(prev => ({ ...prev, category: 'all', searchQuery: '' }));
              }}
              className="flex items-center gap-1.5 sm:gap-2 text-left group cursor-pointer"
            >
              <div className="flex items-baseline">
                <span className="font-display font-black text-xl sm:text-2xl md:text-3xl tracking-tighter text-white uppercase group-hover:text-slate-200 transition-colors">
                  AURA<span className="text-[#059669]">.</span>PK
                </span>
                <span className="ml-1.5 hidden md:inline-block text-[8px] font-black uppercase tracking-[0.25em] text-[#059669] border border-[#059669]/40 px-1.5 py-0.5 rounded">
                  OFFICIAL
                </span>
              </div>
            </button>
          </div>

          {/* Center: Search Bar with Autocomplete dropdown (Desktop) */}
          <div ref={searchContainerRef} className="flex-1 max-w-xl relative hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                id="main-search-input"
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search Lawn, Earbuds, Attar, Leather, Kurtas..."
                className="w-full bg-[#161616] text-white text-xs pl-11 pr-24 py-2.5 rounded-full border border-white/10 focus:border-[#059669] focus:bg-[#1f1f1f] outline-none transition-all placeholder:text-slate-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#059669] hover:bg-emerald-500 text-black text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full transition-colors cursor-pointer"
              >
                SEARCH
              </button>
            </form>

            {/* Live Autocomplete Dropdown */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#0e0e0e] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-50 p-4 text-white">
                
                {/* Search query match results */}
                {searchQuery.trim() ? (
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-[#059669]" />
                      Matching Items in Pakistan
                    </div>
                    {matchingProducts.length > 0 ? (
                      <div className="space-y-1.5">
                        {matchingProducts.map(p => (
                          <button
                            key={p.id}
                            onClick={() => {
                              setSelectedProduct(p);
                              setIsSearchFocused(false);
                            }}
                            className="w-full text-left p-2 rounded-xl hover:bg-white/10 flex items-center gap-3 transition-colors cursor-pointer"
                          >
                            <img src={p.featuredImage} alt={p.title} className="w-11 h-11 rounded-lg object-cover bg-slate-800" />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-white truncate uppercase tracking-tight">{p.title}</h4>
                              <div className="flex items-center gap-2 text-xs">
                                <span className="font-black text-[#059669]">{formatPKR(p.price)}</span>
                                <span className="text-slate-500 line-through text-[11px]">{formatPKR(p.originalPrice)}</span>
                                <span className="text-slate-400 text-[10px] uppercase font-bold">• {p.brand}</span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 py-3 text-center">
                        No direct product matches for "{searchQuery}". Press Enter to search entire catalog.
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Trending searches */}
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-[#059669]" />
                        Trending Across Pakistan
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {['Lawn 3-Piece', 'ANC Earbuds', 'Shalwar Kameez', 'Dehn Al Oud', 'Peshawari Chappal', 'Smartwatch'].map(term => (
                          <button
                            key={term}
                            onClick={() => {
                              setSearchQuery(term);
                              addSearchQuery(term);
                              setFilterState(prev => ({ ...prev, searchQuery: term, category: 'all' }));
                              setActiveView('catalog');
                              setIsSearchFocused(false);
                            }}
                            className="text-[11px] font-bold uppercase tracking-wider bg-white/5 hover:bg-[#059669] hover:text-black text-slate-300 px-3 py-1.5 rounded-full transition-colors border border-white/10 cursor-pointer"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Recent Search History */}
                    {searchHistory.length > 0 && (
                      <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5">
                          <History className="w-3.5 h-3.5 text-slate-400" />
                          Recent Searches
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {searchHistory.map(term => (
                            <button
                              key={term}
                              onClick={() => {
                                setSearchQuery(term);
                                setFilterState(prev => ({ ...prev, searchQuery: term, category: 'all' }));
                                setActiveView('catalog');
                                setIsSearchFocused(false);
                              }}
                              className="text-[11px] font-semibold text-slate-400 hover:text-[#059669] bg-white/5 px-2.5 py-1 rounded border border-white/10 cursor-pointer"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Actions (Favourite, Bag/Cart, Me/User, with Desktop Track & Admin) */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 shrink-0">
            
            {/* Order Tracking Button (Desktop/Tablet) */}
            <button
              id="nav-tracking-btn"
              onClick={() => setActiveView('tracking')}
              className={`hidden sm:flex p-2 rounded-xl transition-colors relative items-center gap-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer ${
                activeView === 'tracking' 
                  ? 'bg-[#059669] text-black' 
                  : 'text-slate-300 hover:bg-white/10 hover:text-[#059669]'
              }`}
              title="Track your order delivery"
            >
              <Truck className="w-4 h-4" />
              <span className="hidden lg:inline text-[11px]">TRACK</span>
            </button>

            {/* Admin Dashboard (Desktop) */}
            <button
              id="nav-admin-btn"
              onClick={() => setActiveView('admin')}
              className={`hidden md:flex p-2 rounded-xl transition-colors cursor-pointer ${
                activeView === 'admin'
                  ? 'bg-[#059669] text-black'
                  : 'text-slate-300 hover:bg-white/10 hover:text-[#059669]'
              }`}
              title="Admin & Merchant Management Dashboard"
            >
              <LayoutDashboard className="w-4 h-4" />
            </button>

            {/* Favourite / Wishlist Button */}
            <button
              id="nav-wishlist-btn"
              onClick={() => {
                setActiveView('account');
              }}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-300 hover:text-rose-400 hover:bg-white/10 active:scale-95 transition-all cursor-pointer shrink-0"
              title="View Favourites & Wishlist"
              aria-label="View Favourites"
            >
              <Heart className="w-[18px] h-[18px]" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 min-w-[15px] h-[15px] px-1 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center pointer-events-none shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Bag / Shopping Cart Button */}
            <button
              id="nav-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative w-9 h-9 sm:w-auto sm:px-3.5 sm:py-2 rounded-full bg-white text-black hover:bg-[#059669] hover:text-white active:scale-95 transition-all flex items-center justify-center gap-2 font-black text-xs uppercase tracking-wider shadow-md cursor-pointer shrink-0"
              aria-label="Open Shopping Bag"
              title="Open Shopping Bag"
            >
              <div className="relative flex items-center justify-center">
                <ShoppingBag className="w-[18px] h-[18px]" />
                {cartTotalCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#059669] text-black text-[9px] font-black min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center ring-2 ring-[#080808] sm:hidden">
                    {cartTotalCount}
                  </span>
                )}
              </div>
              {cartTotalCount > 0 && (
                <span className="hidden sm:inline-flex bg-[#059669] text-black text-[9px] font-black px-1.5 py-0.5 rounded-full">
                  {cartTotalCount}
                </span>
              )}
              <span className="text-[11px] font-black hidden sm:inline whitespace-nowrap">
                {formatPKR(cartSubtotal)}
              </span>
            </button>

            {/* Me / User Account / Authentication */}
            {user ? (
              <button
                id="nav-user-btn"
                onClick={() => setActiveView('account')}
                className="w-9 h-9 sm:w-auto sm:px-3 sm:py-1.5 rounded-full border border-white/20 text-white hover:border-[#059669] hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                title={`Account: ${user.name}`}
                aria-label="User Account"
              >
                <div className="w-6 h-6 sm:w-6 sm:h-6 rounded-full bg-[#059669] text-black flex items-center justify-center font-black text-[11px] shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider hidden md:inline truncate max-w-[80px]">
                  {user.name.split(' ')[0]}
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  id="nav-signin-btn"
                  onClick={() => openAuthModal('login')}
                  className="w-9 h-9 sm:w-auto sm:px-3.5 sm:py-2 rounded-full border border-white/20 text-white hover:border-[#059669] hover:text-[#059669] hover:bg-white/5 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                  title="Sign In / User Profile"
                  aria-label="Sign In"
                >
                  <User className="w-[18px] h-[18px] text-[#059669]" />
                  <span className="hidden sm:inline text-[11px] font-black uppercase tracking-wider">SIGN IN</span>
                </button>
                <button
                  id="nav-register-btn"
                  onClick={() => openAuthModal('register')}
                  className="hidden xl:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#059669] text-black hover:bg-[#047857] hover:text-white text-[11px] font-black uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                >
                  <span>JOIN FREE</span>
                </button>
              </div>
            )}

          </div>

        </div>

        {/* Mobile Search Bar (Visible on mobile) */}
        <div className="pb-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search Pakistani items..."
              className="w-full bg-[#161616] text-white text-xs pl-10 pr-20 py-2.5 rounded-full border border-white/15 outline-none placeholder:text-slate-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#059669] text-black text-[10px] font-black uppercase px-3 py-1 rounded-full"
            >
              GO
            </button>
          </form>
        </div>

        {/* Category Navigation Bar (Desktop) */}
        <nav className="hidden lg:flex items-center justify-between border-t border-white/10 py-3 text-xs font-bold uppercase tracking-widest">
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
            <button
              onClick={() => {
                setActiveView('catalog');
                setFilterState(prev => ({ ...prev, category: 'all' }));
              }}
              className={`hover:text-[#059669] transition-colors whitespace-nowrap ${
                activeView === 'catalog' && filterState.category === 'all'
                  ? 'text-[#059669] font-black'
                  : 'text-slate-300'
              }`}
            >
              All Items
            </button>

            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setFilterState(prev => ({ ...prev, category: cat.slug }));
                  setActiveView('catalog');
                }}
                className={`hover:text-[#059669] transition-colors whitespace-nowrap ${
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
            className="flex items-center gap-1.5 text-amber-400 font-black tracking-widest uppercase hover:text-amber-300 whitespace-nowrap pl-4 text-xs"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            FLASH DEALS ⚡
          </button>
        </nav>

      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsMobileMenuOpen(false)} />
          
          <div className="relative w-4/5 max-w-sm bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                  A
                </div>
                <span className="font-bold text-lg text-slate-800 dark:text-white">AuraPK Navigation</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu items */}
            <div className="p-4 space-y-4 flex-1">
              
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Shop by Category</p>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setFilterState(prev => ({ ...prev, category: cat.slug }));
                      setActiveView('catalog');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-sm text-slate-700 dark:text-slate-200"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-slate-400">({cat.itemCount})</span>
                  </button>
                ))}
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-2">
                <button
                  onClick={() => {
                    setActiveView('tracking');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-800 dark:text-slate-200"
                >
                  <Truck className="w-4 h-4 text-emerald-500" />
                  <span>Track TCS / Courier Order</span>
                </button>

                <button
                  onClick={() => {
                    setActiveView('admin');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300"
                >
                  <LayoutDashboard className="w-4 h-4 text-slate-500" />
                  <span>Merchant Admin Dashboard</span>
                </button>
              </div>

            </div>

            {/* Footer user info */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              {user ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.phone}</p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveView('account');
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 underline"
                  >
                    View Account
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2 bg-slate-900 dark:bg-emerald-600 text-white rounded-xl text-xs font-bold text-center"
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
