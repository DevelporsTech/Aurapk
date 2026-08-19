import React from 'react';
import { useStore } from '../../context/StoreContext';
import { PAKISTAN_CITIES } from '../../data/pakistanLocations';
import { MapPin, Phone, ChevronDown, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { selectedCity, setSelectedCity, siteDesign } = useStore();
  const [isCityDropdownOpen, setIsCityDropdownOpen] = React.useState(false);

  const announcementBadge = siteDesign?.announcementBadge || 'PAKISTAN DROP';
  const announcementText = siteDesign?.announcementText || 'Free Nationwide TCS Shipping on Orders Over ₨ 2,999 — Shop 2026 Collection';
  const couponCode = siteDesign?.announcementCouponCode || 'WELCOMEPK';
  const couponDiscount = siteDesign?.announcementCouponDiscount || '15% OFF';

  return (
    <div id="announcement-bar" className="bg-[#059669] text-black text-[11px] font-black uppercase tracking-[0.18em] py-2 px-3 sm:px-6 border-b border-black/20 relative z-40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        
        {/* Left: Shipping & Promo Highlight */}
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="bg-black text-white text-[9px] font-black px-2 py-0.5 rounded tracking-widest uppercase">
            {announcementBadge}
          </span>
          <span className="text-black/90">
            {announcementText}
          </span>
        </div>

        {/* Center: Live Voucher Badge */}
        {couponCode && (
          <div className="hidden lg:flex items-center gap-2 bg-black/15 px-3 py-0.5 rounded text-[11px]">
            <span className="text-black font-extrabold">CODE:</span>
            <span className="font-mono font-black text-black underline tracking-widest">{couponCode}</span>
            {couponDiscount && <span className="text-black/80 font-bold">• {couponDiscount}</span>}
          </div>
        )}

        {/* Right: City Selector & WhatsApp Support */}
        <div className="flex items-center gap-4">
          
          {/* City Selector Dropdown */}
          <div className="relative">
            <button
              id="city-selector-btn"
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="flex items-center gap-1.5 text-black hover:text-white transition-colors py-0.5 px-1.5 rounded hover:bg-black/10 tracking-widest font-black text-[10px]"
              title="Select your delivery city in Pakistan"
            >
              <MapPin className="w-3.5 h-3.5 text-black" />
              <span>DELIVER TO: <strong>{selectedCity.name.toUpperCase()}</strong></span>
              <ChevronDown className="w-3 h-3 text-black" />
            </button>

            {isCityDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsCityDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1 w-56 max-h-64 overflow-y-auto bg-[#0e0e0e] border border-white/20 rounded-xl shadow-2xl z-50 p-1.5 divide-y divide-white/10 text-white">
                  <div className="px-2 py-1 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                    Select Your City
                  </div>
                  <div className="py-1 space-y-0.5">
                    {PAKISTAN_CITIES.map(city => (
                      <button
                        key={city.name}
                        onClick={() => {
                          setSelectedCity(city);
                          setIsCityDropdownOpen(false);
                        }}
                        className={`w-full text-left px-2 py-1.5 rounded text-xs flex items-center justify-between transition-colors tracking-wider uppercase font-bold ${
                          selectedCity.name === city.name
                            ? 'bg-[#059669] text-black font-black'
                            : 'text-slate-300 hover:bg-white/10 hover:text-[#059669]'
                        }`}
                      >
                        <span>{city.name}</span>
                        <span className="text-[10px] opacity-75">{city.estimatedDeliveryDays}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* WhatsApp Direct Help */}
          <a
            href="https://wa.me/923001234567?text=Hello%20AuraPK%20Support%20I%20have%20an%20inquiry"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-black hover:text-white transition-colors font-black tracking-widest text-[10px]"
            title="Chat with AuraPK Support on WhatsApp"
          >
            <Phone className="w-3 h-3" />
            <span className="hidden sm:inline">WHATSAPP</span>
          </a>

          {/* Currency Indicator */}
          <span className="text-black border-l border-black/30 pl-3 font-black text-[10px] tracking-widest">
            PKR (₨)
          </span>

        </div>

      </div>
    </div>
  );
};
