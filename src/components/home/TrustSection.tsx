import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Smartphone, CheckCircle, Clock, Zap } from 'lucide-react';

export const TrustSection: React.FC = () => {
  return (
    <section id="trust-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white">
      
      <div className="bg-[#0c0c0c] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#059669] mb-2 block">
            100% RELIABLE & VERIFIED NATIONWIDE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white italic mt-1">
            WHY PAKISTAN TRUSTS <span className="text-transparent stroke-text-white">AURA.PK</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Built specifically for Pakistani shoppers, ensuring zero friction from cart to your doorstep.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="bg-[#121212] p-6 rounded-2xl border border-white/10 hover:border-[#059669]/50 transition-colors flex flex-col items-center text-center space-y-3 group">
            <div className="bg-[#059669]/10 text-[#059669] font-black text-sm w-12 h-12 rounded-xl flex items-center justify-center border border-[#059669]/30 group-hover:scale-110 transition-transform">
              COD
            </div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-white">
              Cash on Delivery (COD)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pay in cash only when the parcel arrives at your home across 250+ Pakistani cities & tehsils.
            </p>
          </div>

          <div className="bg-[#121212] p-6 rounded-2xl border border-white/10 hover:border-[#059669]/50 transition-colors flex flex-col items-center text-center space-y-3 group">
            <div className="bg-[#059669]/10 text-[#059669] font-black text-sm w-12 h-12 rounded-xl flex items-center justify-center border border-[#059669]/30 group-hover:scale-110 transition-transform">
              100%
            </div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-white">
              Authentic Products
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Official brand warranties with verified support hubs in Karachi, Lahore, Rawalpindi, and Islamabad.
            </p>
          </div>

          <div className="bg-[#121212] p-6 rounded-2xl border border-white/10 hover:border-[#059669]/50 transition-colors flex flex-col items-center text-center space-y-3 group">
            <div className="bg-[#059669]/10 text-[#059669] font-black text-sm w-12 h-12 rounded-xl flex items-center justify-center border border-[#059669]/30 group-hover:scale-110 transition-transform">
              7D
            </div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-white">
              Doorstep Returns
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Wrong size or not as described? Our courier rider collects it directly from your doorstep with instant refund.
            </p>
          </div>

          <div className="bg-[#121212] p-6 rounded-2xl border border-white/10 hover:border-[#059669]/50 transition-colors flex flex-col items-center text-center space-y-3 group">
            <div className="bg-[#059669]/10 text-[#059669] font-black text-sm w-12 h-12 rounded-xl flex items-center justify-center border border-[#059669]/30 group-hover:scale-110 transition-transform">
              24H
            </div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-white">
              Express Shipping
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dispatched within 24 hours via TCS, Leopards, and Trax couriers with live tracking SMS updates.
            </p>
          </div>

        </div>

        {/* Live Courier SLA Banner */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-around gap-4 text-xs font-bold uppercase tracking-wider text-slate-400">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#059669]" />
            <span>KHI, LHR, ISB: <strong>24-48 HOURS DELIVERY</strong></span>
          </span>
          <span className="hidden md:inline text-white/20">•</span>
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#059669]" />
            <span>REAL-TIME SMS & WHATSAPP DISPATCH ALERTS</span>
          </span>
          <span className="hidden md:inline text-white/20">•</span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#059669]" />
            <span>ZERO HIDDEN COD SURCHARGES</span>
          </span>
        </div>

      </div>

    </section>
  );
};
