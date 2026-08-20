import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  searchPakistanCities, 
  PAKISTAN_PROVINCES,
  PAKISTAN_CITIES,
  formatPKR,
  CityInfo
} from '../../data/pakistanLocations';
import { 
  MapPin, 
  ChevronDown, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  Tag, 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  MessageCircle,
  Search,
  X,
  Building
} from 'lucide-react';

interface PromoMessage {
  id: string;
  badge: string;
  text: string;
  highlight?: string;
  icon: React.ReactNode;
}

export const AnnouncementBar: React.FC = () => {
  const { selectedCity, setSelectedCity, siteDesign, setActiveView, addToast } = useStore();
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const [selectedProvinceFilter, setSelectedProvinceFilter] = useState<string>('all');
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [activePromoIndex, setActivePromoIndex] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  const couponCode = siteDesign?.announcementCouponCode || 'WELCOMEPK';
  const couponDiscount = siteDesign?.announcementCouponDiscount || '15% OFF';

  const promoMessages: PromoMessage[] = [
    {
      id: 'shipping',
      badge: siteDesign?.announcementBadge || 'FREE DELIVERY',
      text: siteDesign?.announcementText || 'Nationwide TCS Shipping over ₨ 2,999',
      highlight: 'TCS Express',
      icon: <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
    },
    {
      id: 'coupon',
      badge: 'LIMITED OFFER',
      text: `${couponDiscount} off 1st order with code`,
      highlight: couponCode,
      icon: <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
    },
    {
      id: 'cod',
      badge: 'CASH ON DELIVERY',
      text: 'Doorstep COD across 250+ PK cities',
      highlight: '250+ Cities',
      icon: <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-300 shrink-0" />
    },
    {
      id: 'authentic',
      badge: '100% ORIGINAL',
      text: 'Verified Pakistani originals & 7-day returns',
      highlight: 'Originals',
      icon: <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-300 shrink-0" />
    }
  ];

  // Auto-rotate promo messages
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePromoIndex(prev => (prev + 1) % promoMessages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [promoMessages.length]);

  // Focus input on dropdown open
  useEffect(() => {
    if (isCityDropdownOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isCityDropdownOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false);
      }
    };
    if (isCityDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCityDropdownOpen]);

  const handleCopyCoupon = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(couponCode);
    setCopiedCoupon(true);
    addToast('success', 'Coupon Copied', `Promo code ${couponCode} copied to clipboard!`);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  const filteredCities = searchPakistanCities(citySearch, selectedProvinceFilter);

  // Reset highlight index when query or filter changes
  useEffect(() => {
    setHighlightedIndex(0);
  }, [citySearch, selectedProvinceFilter]);

  // Auto-select on mobile when typing without pressing Enter
  useEffect(() => {
    const clean = citySearch.trim().toLowerCase();
    if (!clean) return;

    // 1. Immediate exact match on city name or common alias (e.g. 'lahore', 'lhr', 'karachi', 'khi', 'isb')
    const exactMatch = PAKISTAN_CITIES.find(
      c => c.name.toLowerCase() === clean || c.aliases?.some(a => a.toLowerCase() === clean)
    );

    if (exactMatch) {
      if (selectedCity.name !== exactMatch.name) {
        setSelectedCity(exactMatch);
      }
      return;
    }

    // 2. Debounced auto-selection as user types 3+ letters on mobile
    if (clean.length >= 3 && filteredCities.length > 0) {
      const timer = setTimeout(() => {
        const topMatch = filteredCities[0];
        if (topMatch && selectedCity.name !== topMatch.name) {
          if (
            topMatch.name.toLowerCase().startsWith(clean) || 
            topMatch.aliases?.some(a => a.toLowerCase().startsWith(clean))
          ) {
            setSelectedCity(topMatch);
          }
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [citySearch, filteredCities, selectedCity.name, setSelectedCity]);

  const currentPromo = promoMessages[activePromoIndex];

  const handleSelectCity = (city: CityInfo) => {
    setSelectedCity(city);
    setIsCityDropdownOpen(false);
    setCitySearch('');
    addToast('info', 'Delivery Hub Updated', `Delivery location set to ${city.name}, ${city.province} (${city.estimatedDeliveryDays} dispatch)`);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredCities.length > 0) {
        setHighlightedIndex(prev => (prev < filteredCities.length - 1 ? prev + 1 : 0));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filteredCities.length > 0) {
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : filteredCities.length - 1));
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCities.length > 0) {
        const targetCity = filteredCities[highlightedIndex] || filteredCities[0];
        if (targetCity) {
          handleSelectCity(targetCity);
        }
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsCityDropdownOpen(false);
    }
  };

  return (
    <div 
      id="announcement-bar" 
      className="relative z-40 w-full max-w-full bg-gradient-to-r from-[#01241c] via-[#064e3b] to-[#022c22] border-b border-emerald-500/25 text-white shadow-xs overflow-hidden"
    >
      {/* Background subtle glowing radial highlights */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/15 via-transparent to-transparent pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-1.5 sm:py-2">
        <div className="flex items-center justify-between gap-2 min-w-0">
          
          {/* Left: Dynamic Rotating Promo Ticker */}
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1 overflow-hidden">
            {/* Prev/Next Mini Controls (desktop only) */}
            <div className="hidden md:flex items-center gap-0.5 shrink-0">
              <button
                onClick={() => setActivePromoIndex(prev => (prev - 1 + promoMessages.length) % promoMessages.length)}
                className="p-1 text-emerald-300/70 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
                title="Previous announcement"
                aria-label="Previous announcement"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActivePromoIndex(prev => (prev + 1) % promoMessages.length)}
                className="p-1 text-emerald-300/70 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
                title="Next announcement"
                aria-label="Next announcement"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Current Announcement Content */}
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 overflow-hidden">
              {/* Badge */}
              <span className="inline-flex items-center gap-1 bg-black/40 text-emerald-300 border border-emerald-400/30 text-[8px] sm:text-[10px] font-black px-1.5 sm:px-2 py-0.5 rounded-full tracking-wider uppercase shadow-xs shrink-0">
                {currentPromo.icon}
                <span className="truncate max-w-[85px] sm:max-w-none">{currentPromo.badge}</span>
              </span>

              {/* Text */}
              <span className="text-[10px] sm:text-xs font-semibold text-slate-100 tracking-wide truncate min-w-0">
                {currentPromo.text}
              </span>
            </div>
          </div>

          {/* Right: Interactive Controls (Voucher & City Dropdown) */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 text-[11px] font-bold">
            
            {/* Quick 1-Click Voucher Copy */}
            {couponCode && (
              <button
                onClick={handleCopyCoupon}
                className="group flex items-center gap-1 bg-gradient-to-r from-amber-500/20 to-emerald-500/20 hover:from-amber-500/30 hover:to-emerald-500/30 border border-amber-400/40 text-amber-200 hover:text-amber-100 px-2 sm:px-2.5 py-0.5 rounded-full transition-all duration-200 cursor-pointer shadow-xs shrink-0"
                title="Click to copy voucher code"
              >
                <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-300 group-hover:rotate-12 transition-transform shrink-0" />
                <span className="text-[9px] sm:text-[10px] uppercase font-black tracking-widest text-amber-300 hidden xs:inline">CODE:</span>
                <span className="font-mono font-black tracking-wider text-white text-[10px] sm:text-[11px] underline decoration-amber-400/50 underline-offset-2">
                  {couponCode}
                </span>
                {copiedCoupon ? (
                  <span className="flex items-center gap-0.5 text-emerald-300 text-[9px] sm:text-[10px] font-black pl-0.5">
                    <Check className="w-2.5 h-2.5 text-emerald-400" />
                    <span className="hidden xs:inline">COPIED</span>
                  </span>
                ) : (
                  <Copy className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-60 group-hover:opacity-100 transition-opacity hidden xs:block" />
                )}
              </button>
            )}

            {/* Quick Track Order Link (Tablet/Desktop) */}
            <button
              onClick={() => setActiveView('tracking')}
              className="hidden lg:flex items-center gap-1 text-emerald-200/90 hover:text-white transition-colors tracking-wider uppercase text-[10px] font-black bg-white/5 hover:bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10 cursor-pointer shrink-0"
              title="Track order status"
            >
              <Truck className="w-3 h-3 text-emerald-400" />
              <span>Track Order</span>
            </button>

            {/* City Selector Dropdown */}
            <div ref={dropdownRef} className="relative shrink-0">
              <button
                id="city-selector-btn"
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center gap-1 text-emerald-100 hover:text-white bg-black/30 hover:bg-black/50 border border-emerald-500/30 hover:border-emerald-400/60 transition-all py-0.5 px-2 sm:px-2.5 rounded-full tracking-wider font-bold text-[10px] sm:text-[11px] cursor-pointer shrink-0"
                title="Select your delivery destination across Pakistan"
              >
                <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400 shrink-0" />
                <span className="truncate max-w-[65px] xs:max-w-[90px] sm:max-w-[120px]">
                  {selectedCity.name}
                </span>
                <ChevronDown className={`w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-300 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Floating City Dropdown with Accurate Pakistan Search */}
              {isCityDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-80 sm:w-96 max-w-[calc(100vw-20px)] bg-[#0c1310] border border-emerald-500/30 rounded-2xl shadow-2xl z-50 p-3 text-white backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                  
                  {/* Top Bar: Title, Current Selected & Close */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-[11px] text-emerald-300 font-black uppercase tracking-wider truncate">
                        Deliver To: {selectedCity.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCityDropdownOpen(false)}
                      className="text-[10px] font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-lg border border-emerald-500/30 cursor-pointer"
                    >
                      Done ✓
                    </button>
                  </div>

                  {/* Real-time Search Box */}
                  <div className="py-2 relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={citySearch}
                      onChange={e => setCitySearch(e.target.value)}
                      onKeyDown={handleSearchKeyDown}
                      placeholder="Type city (e.g. Lahore, Karachi, Rawalpindi)..."
                      className="w-full bg-[#15201a] text-white text-xs pl-8 pr-8 py-2.5 rounded-xl border border-emerald-500/40 focus:border-emerald-400 outline-none placeholder:text-slate-500 shadow-inner"
                    />
                    <Search className="w-3.5 h-3.5 text-emerald-400/70 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    
                    {citySearch && (
                      <button
                        onClick={() => setCitySearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 cursor-pointer"
                        title="Clear search"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Quick Popular Metro Chips (1-Tap Selection for Mobile) */}
                  <div className="pb-2">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
                      <span>Popular Cities (1-Tap Select)</span>
                      <span className="text-emerald-400 font-mono text-[8px]">Auto-Syncs</span>
                    </div>
                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                      {[
                        { name: 'Lahore', code: 'LHR' },
                        { name: 'Karachi', code: 'KHI' },
                        { name: 'Islamabad', code: 'ISB' },
                        { name: 'Rawalpindi', code: 'RWP' },
                        { name: 'Faisalabad', code: 'FSD' },
                        { name: 'Multan', code: 'MUX' },
                        { name: 'Peshawar', code: 'PEW' },
                        { name: 'Quetta', code: 'UET' },
                        { name: 'Sialkot', code: 'SKT' }
                      ].map(pop => {
                        const isCurrent = selectedCity.name.toLowerCase() === pop.name.toLowerCase();
                        return (
                          <button
                            key={pop.name}
                            type="button"
                            onClick={() => {
                              const found = PAKISTAN_CITIES.find(c => c.name.toLowerCase() === pop.name.toLowerCase());
                              if (found) handleSelectCity(found);
                            }}
                            className={`text-[10px] font-bold px-2 py-1 rounded-lg shrink-0 transition-all cursor-pointer flex items-center gap-1 ${
                              isCurrent
                                ? 'bg-emerald-500 text-black font-black shadow-xs ring-1 ring-emerald-300'
                                : 'bg-[#18261f] text-slate-300 hover:bg-emerald-500/20 hover:text-emerald-200 border border-white/5'
                            }`}
                          >
                            <span>{pop.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Province Quick Filters */}
                  <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-2 pt-0.5 border-t border-white/5">
                    <button
                      onClick={() => setSelectedProvinceFilter('all')}
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                        selectedProvinceFilter === 'all'
                          ? 'bg-emerald-500 text-black font-black'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      All
                    </button>
                    {['Punjab', 'Sindh', 'KPK', 'Balochistan', 'ICT', 'AJK', 'GB'].map(prov => (
                      <button
                        key={prov}
                        onClick={() => setSelectedProvinceFilter(prov)}
                        className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                          selectedProvinceFilter.toLowerCase() === prov.toLowerCase()
                            ? 'bg-emerald-500 text-black font-black'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {prov}
                      </button>
                    ))}
                  </div>

                  {/* Search Matches Info */}
                  <div className="text-[10px] text-slate-400 font-semibold px-1 py-1 flex items-center justify-between border-t border-white/5">
                    <span>
                      {citySearch ? `Matches for "${citySearch}"` : 'All Available Delivery Hubs'}
                    </span>
                    <span className="font-mono text-emerald-400/90 text-[9px]">
                      {filteredCities.length} cities
                    </span>
                  </div>

                  {/* Filtered Cities List */}
                  <div ref={listContainerRef} className="max-h-52 overflow-y-auto space-y-1 pr-1 custom-scrollbar pt-1">
                    {filteredCities.map((city, index) => {
                      const isSelected = selectedCity.name === city.name;
                      const isHighlighted = index === highlightedIndex;
                      return (
                        <button
                          key={`${city.name}-${city.province}`}
                          onClick={() => handleSelectCity(city)}
                          onMouseEnter={() => setHighlightedIndex(index)}
                          className={`w-full text-left px-3 py-2.5 min-h-[44px] rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer group ${
                            isSelected
                              ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-black shadow-md border border-emerald-400/40 ring-1 ring-emerald-400/30'
                              : isHighlighted
                              ? 'bg-white/15 text-emerald-200 border border-emerald-500/40 ring-1 ring-emerald-500/20'
                              : 'text-slate-200 hover:bg-white/10 hover:text-emerald-300 border border-transparent active:bg-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0 pr-2">
                            <Building className={`w-3.5 h-3.5 shrink-0 ${isSelected || isHighlighted ? 'text-emerald-300' : 'text-emerald-400/70 group-hover:text-emerald-400'}`} />
                            <div className="flex flex-col min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold truncate text-xs">{city.name}</span>
                                {city.isMajorHub && (
                                  <span className="text-[8px] uppercase tracking-wider bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-black px-1.5 rounded">
                                    METRO
                                  </span>
                                )}
                                {isSelected && (
                                  <span className="text-[8px] uppercase tracking-wider bg-black/40 text-emerald-300 font-bold px-1 rounded">
                                    ✓ Active
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400 truncate">
                                {city.province} • Postal {city.postalCode}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col items-end shrink-0 pl-1">
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wide ${
                              isSelected 
                                ? 'bg-black/30 text-emerald-200' 
                                : isHighlighted 
                                ? 'bg-emerald-500/30 text-emerald-200' 
                                : 'bg-white/5 text-emerald-300 group-hover:bg-emerald-500/20'
                            }`}>
                              ⚡ {city.estimatedDeliveryDays}
                            </span>
                            <span className="text-[9px] font-mono text-slate-400 mt-0.5">
                              Shipping {formatPKR(city.deliveryFee)}
                            </span>
                          </div>
                        </button>
                      );
                    })}

                    {filteredCities.length === 0 && (
                      <div className="text-center py-6 text-xs text-slate-400 space-y-1">
                        <p className="font-bold text-slate-300">No matching Pakistani city found for "{citySearch}"</p>
                        <p className="text-[10px] text-slate-500">
                          Try searching by district, province, or nearby major hub (e.g. Lahore, Karachi, Rawalpindi).
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer note */}
                  <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-slate-400 px-1">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3 h-3 text-emerald-400" />
                      Free shipping on orders above ₨ 2,999
                    </span>
                    <span className="font-black text-emerald-400">TCS / Leopards</span>
                  </div>

                </div>
              )}
            </div>

            {/* WhatsApp Live Support Badge (Desktop/Tablet) */}
            <a
              href="https://wa.me/923001234567?text=Hello%20AuraPK%20Support%20I%20have%20an%20inquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-emerald-200 hover:text-white transition-colors bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 px-2 py-0.5 rounded-full text-[10px] tracking-wider uppercase font-bold shrink-0"
              title="Chat with WhatsApp Support"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <MessageCircle className="w-3 h-3 text-emerald-300" />
              <span>HELP</span>
            </a>

          </div>

        </div>
      </div>
    </div>
  );
};
