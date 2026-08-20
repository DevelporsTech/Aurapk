import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { AuraLogo } from '../common/AuraLogo';

export const Footer: React.FC = () => {
  const { setActiveView, setFilterState, addToast, user, openLegalModal } = useStore();
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.includes('@')) return;
    setIsSubscribed(true);
    addToast('success', 'Subscribed to AuraPK VIP Club!', 'Use coupon code WELCOMEPK on your first checkout.');
    setEmailInput('');
  };

  return (
    <footer className="bg-[#050505] text-slate-300 pt-16 pb-24 lg:pb-12 border-t border-white/10">
      
      {/* Top CTA: Newsletter & VIP Club */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="bg-[#0c0c0c] p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.25em] text-[#059669] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              PAKISTAN VIP INSIDER ACCESS
            </span>
            <h3 className="font-display text-2xl sm:text-4xl font-black text-white uppercase italic tracking-tighter">
              GET ₨ 500 OFF <span className="text-transparent stroke-text-white">FIRST ORDER</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Subscribe for flash deal alerts, Eid collection drops, and exclusive WhatsApp voucher codes across Pakistan.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-1 max-w-md flex flex-col sm:flex-row gap-2">
            {isSubscribed ? (
              <div className="w-full bg-[#059669]/20 border border-[#059669] text-[#059669] px-4 py-3 rounded-2xl flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5 text-[#059669]" />
                VOUCHER SENT! USE CODE WELCOMEPK
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  required
                  placeholder="Enter your email or phone number"
                  className="bg-[#141414] border border-white/15 text-white text-xs px-4 py-3.5 rounded-full flex-1 outline-none focus:border-[#059669] transition-colors placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  className="bg-white hover:bg-[#059669] text-black hover:text-white font-black text-xs uppercase tracking-widest px-7 py-3.5 rounded-full transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg cursor-pointer active:scale-95"
                >
                  <span>CLAIM ₨500</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Col 1: Brand & Contact */}
        <div className="lg:col-span-2 space-y-4">
          <AuraLogo size="md" />
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
            Pakistan’s premier multi-category digital shopping destination. Offering 100% authentic designer apparel, audio tech, fragrances, and genuine leather goods with Cash on Delivery nationwide.
          </p>

          <div className="space-y-2 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#059669] shrink-0" />
              <span>Helpline: +92 300 1234567 / 021-111-287-275</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#059669] shrink-0" />
              <span>Support: care@aurapk.com</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#059669] shrink-0" />
              <span>Hubs: Clifton Block 4, Karachi & Main Blvd Gulberg, Lahore</span>
            </div>
          </div>
        </div>

        {/* Col 2: Categories */}
        <div className="space-y-3">
          <h4 className="text-white font-black text-xs uppercase tracking-[0.25em]">Departments</h4>
          <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
            {[
              { name: "Women's Pret & Lawn", slug: 'womens-fashion' },
              { name: "Men's Wash & Wear Kurtas", slug: 'mens-fashion' },
              { name: 'Smart Audio & ANC Earbuds', slug: 'smart-audio' },
              { name: 'AMOLED Smartwatches', slug: 'smartwatches' },
              { name: 'Pure Dehn Al Oud & Attar', slug: 'fragrances' },
              { name: 'Charsadda Leather Chappals', slug: 'leather-goods' },
              { name: 'Granite Cookware Sets', slug: 'home-kitchen' }
            ].map(cat => (
              <li key={cat.slug}>
                <button
                  onClick={() => {
                    setFilterState(prev => ({ ...prev, category: cat.slug }));
                    setActiveView('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#059669] transition-colors text-left"
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Customer Care & Policy */}
        <div className="space-y-3">
          <h4 className="text-white font-black text-xs uppercase tracking-[0.25em]">Customer Care</h4>
          <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
            <li>
              <button onClick={() => setActiveView('tracking')} className="hover:text-[#059669] transition-colors">
                Track TCS Courier Order
              </button>
            </li>
            <li>
              <button onClick={() => openLegalModal('returns')} className="hover:text-[#059669] transition-colors text-left">
                Cash on Delivery (COD) Policy
              </button>
            </li>
            <li>
              <button onClick={() => openLegalModal('returns')} className="hover:text-[#059669] transition-colors text-left">
                7-Day Easy Return & Refund
              </button>
            </li>
            <li>
              <button onClick={() => openLegalModal('data-safety')} className="hover:text-[#059669] transition-colors text-left">
                Data Safety & Account Erasure
              </button>
            </li>
            <li>
              <button onClick={() => setActiveView('playstore-guide')} className="text-emerald-400 hover:underline font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
                <span>Google Play App Hub</span>
              </button>
            </li>
            {user?.isAdmin && (
              <li>
                <button onClick={() => setActiveView('admin')} className="text-[#059669] hover:underline font-bold uppercase tracking-wider text-[11px]">
                  Merchant / Admin Portal
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Col 4: Pakistan Trust & Payment Badges */}
        <div className="space-y-4">
          <h4 className="text-white font-black text-xs uppercase tracking-[0.25em]">Payments & Security</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-[#111] border border-white/10 p-2.5 rounded-xl text-center">
              <span className="font-black text-amber-400 block text-[13px] tracking-wider">COD</span>
              <span className="text-[9px] text-slate-400 uppercase font-bold">Cash on Delivery</span>
            </div>
            <div className="bg-[#111] border border-white/10 p-2.5 rounded-xl text-center">
              <span className="font-black text-rose-500 block text-[13px] tracking-wider">JazzCash</span>
              <span className="text-[9px] text-slate-400 uppercase font-bold">Mobile Wallet</span>
            </div>
            <div className="bg-[#111] border border-white/10 p-2.5 rounded-xl text-center">
              <span className="font-black text-[#059669] block text-[13px] tracking-wider">Easypaisa</span>
              <span className="text-[9px] text-slate-400 uppercase font-bold">Account & QR</span>
            </div>
            <div className="bg-[#111] border border-white/10 p-2.5 rounded-xl text-center">
              <span className="font-black text-teal-400 block text-[13px] tracking-wider">1Link / Raast</span>
              <span className="text-[9px] text-slate-400 uppercase font-bold">Instant IBAN</span>
            </div>
          </div>

          <div className="pt-1 text-[11px] text-slate-400 space-y-1">
            <p className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
              256-Bit SSL Encrypted Checkout
            </p>
            <p className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <Truck className="w-3.5 h-3.5 text-[#059669]" />
              Dispatched via TCS, Leopards & Trax
            </p>
          </div>
        </div>

      </div>

      {/* Nationwide Cities Served Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/10">
        <p className="text-[11px] text-[#059669] font-black uppercase tracking-[0.2em] mb-2">
          Doorstep Delivery Across All Cities & Tehsils in Pakistan:
        </p>
        <p className="text-xs text-slate-500 leading-relaxed font-medium">
          Karachi • Lahore • Islamabad • Rawalpindi • Faisalabad • Multan • Peshawar • Quetta • Sialkot • Gujranwala • Hyderabad • Bahawalpur • Sargodha • Abbottabad • Sukkur • Mirpur AJK • Muzaffarabad • Gilgit • Skardu • Gwadar • Rahim Yar Khan • Sheikhupura • Jhelum • Mardan • Larkana • Okara • Sahiwal • Wah Cantt • Kasur and all 250+ nationwide areas.
        </p>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <p>© 2026 AuraPK Technologies Ltd. All Rights Reserved. Built for Pakistan.</p>
        <div className="flex items-center gap-4 text-slate-400 font-medium">
          <button onClick={() => openLegalModal('privacy')} className="hover:text-[#059669] transition-colors cursor-pointer">
            Privacy Policy
          </button>
          <span>•</span>
          <button onClick={() => openLegalModal('terms')} className="hover:text-[#059669] transition-colors cursor-pointer">
            Terms of Service
          </button>
          <span>•</span>
          <button onClick={() => openLegalModal('data-safety')} className="hover:text-[#059669] transition-colors cursor-pointer">
            Data Safety
          </button>
          <span>•</span>
          <span className="text-[#059669] font-black uppercase tracking-widest">100% Halal Verified</span>
        </div>
      </div>

    </footer>
  );
};
