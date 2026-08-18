import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Search, 
  Truck, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Calendar, 
  Package,
  Headphones,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import { formatPKR } from '../../data/pakistanLocations';
import { Order } from '../../types';

export const OrderTrackingView: React.FC = () => {
  const { orders, courierSettings } = useStore();
  const [searchQuery, setSearchQuery] = useState(orders[0]?.trackingNumber || 'TCS-PK-9824103');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);
  const [searched, setSearched] = useState(true);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = searchQuery.trim().toLowerCase();
    const match = orders.find(
      o => o.trackingNumber.toLowerCase() === cleanQuery || o.orderNumber.toLowerCase() === cleanQuery || o.customer.phone.includes(cleanQuery)
    );
    setSelectedOrder(match || null);
    setSearched(true);
  };

  const isRiderPhoneActive = selectedOrder
    ? courierSettings.isRiderPhoneEnabled && (selectedOrder.showRiderPhone !== false)
    : courierSettings.isRiderPhoneEnabled;

  const assignedRiderName = selectedOrder?.riderName || courierSettings.defaultRiderName;
  const assignedRiderPhone = selectedOrder?.riderPhone || courierSettings.defaultRiderPhone;
  const riderInitials = assignedRiderName
    ? assignedRiderName
        .split(' ')
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'MT';

  const formatMilestoneDesc = (desc: string) => {
    if (!isRiderPhoneActive && desc.includes('+92')) {
      return desc.replace(/\(\+92[^)]+\)/g, '(Direct number masked by admin)');
    }
    return desc;
  };

  return (
    <div id="tracking-page" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-white">
      
      {/* Header & Search Bar */}
      <div className="bg-[#0e0e0e] rounded-3xl p-6 sm:p-10 text-white border border-white/10 shadow-2xl space-y-6 text-center">
        <div className="max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-[#059669]/20 text-[#059669] font-black text-[10px] px-3 py-1 rounded-full border border-[#059669]/40 uppercase tracking-widest">
            <Truck className="w-3.5 h-3.5" />
            PAKISTAN COURIER LOGISTICS PORTAL
          </div>
          <h1 className="text-2xl sm:text-4xl font-display font-black tracking-tight uppercase italic">
            TRACK YOUR CONSIGNMENT
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Enter your TCS, Leopards, or Trax tracking ID (e.g. <code className="text-[#059669] font-mono font-bold">TCS-PK-9824103</code>) or mobile number.
          </p>
        </div>

        {/* Input */}
        <form onSubmit={handleTrackSubmit} className="max-w-lg mx-auto flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="e.g. TCS-PK-9824103"
              className="w-full bg-[#161616] border border-white/15 text-white text-xs sm:text-sm px-4 py-3 pl-10 rounded-full outline-none focus:border-[#059669] font-mono uppercase"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          <button
            type="submit"
            className="bg-[#059669] hover:bg-[#047857] text-white font-black text-xs uppercase tracking-widest px-6 py-3 rounded-full transition-all shadow-lg whitespace-nowrap cursor-pointer"
          >
            TRACK PARCEL
          </button>
        </form>

        {/* Quick Suggestion Chips */}
        {orders.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">Recent Bookings:</span>
            {orders.map(o => (
              <button
                key={o.id}
                onClick={() => {
                  setSearchQuery(o.trackingNumber);
                  setSelectedOrder(o);
                }}
                className="bg-[#161616] border border-white/15 hover:border-[#059669] text-slate-300 hover:text-white px-3 py-1 rounded-full font-mono text-[11px] transition-colors cursor-pointer"
              >
                {o.trackingNumber} ({o.customer.city})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tracking Result View */}
      {selectedOrder ? (
        <div className="space-y-6">
          
          {/* Order Summary Overview Bar */}
          <div className="bg-[#0e0e0e] border border-white/10 rounded-3xl p-6 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block font-bold uppercase tracking-wider text-[10px]">Tracking Number:</span>
              <span className="font-mono font-black text-sm text-[#059669]">
                {selectedOrder.trackingNumber}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-bold uppercase tracking-wider text-[10px]">Courier Partner:</span>
              <span className="font-display font-black text-sm text-white uppercase">
                {selectedOrder.courier}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-bold uppercase tracking-wider text-[10px]">Destination:</span>
              <span className="font-bold text-sm text-white uppercase">
                {selectedOrder.customer.city} ({selectedOrder.customer.area})
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-bold uppercase tracking-wider text-[10px]">Expected Delivery:</span>
              <span className="font-black text-sm text-[#059669] flex items-center gap-1 uppercase">
                <Calendar className="w-3.5 h-3.5" />
                {selectedOrder.estimatedDeliveryDate}
              </span>
            </div>
          </div>

          {/* Milestone Step Timeline */}
          <div className="bg-[#0e0e0e] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
            <h3 className="font-display font-black text-base sm:text-lg text-white uppercase tracking-tight flex items-center gap-2">
              <Package className="w-5 h-5 text-[#059669]" />
              <span>SHIPMENT MILESTONES & LIVE STATUS</span>
            </h3>

            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
              {selectedOrder.trackingTimeline.map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Circle Indicator */}
                  <div
                    className={`absolute -left-6 sm:-left-8 top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      step.completed
                        ? 'bg-[#059669] border-[#059669] text-black'
                        : 'bg-[#161616] border-white/20 text-slate-500'
                    }`}
                  >
                    {step.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>

                  {/* Step Card */}
                  <div className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4
                        className={`font-black text-xs sm:text-sm uppercase tracking-wider ${
                          step.completed
                            ? 'text-white'
                            : 'text-slate-500'
                        }`}
                      >
                        {step.title}
                      </h4>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {step.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300">
                      {formatMilestoneDesc(step.description)}
                    </p>

                    <div className="flex items-center gap-1 text-[11px] text-[#059669] pt-0.5 font-bold uppercase tracking-wider">
                      <MapPin className="w-3 h-3" />
                      <span>{step.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Local Courier Rider Banner */}
            {isRiderPhoneActive ? (
              <div className="bg-[#141414] p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#059669] text-black font-black flex items-center justify-center text-sm shadow-xs shrink-0">
                    {riderInitials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white block text-xs sm:text-sm uppercase tracking-tight">
                        Assigned Courier Rider: {assignedRiderName}
                      </span>
                      <span className="bg-[#059669]/20 text-[#059669] text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-[#059669]/30">
                        DIRECT CALL ACTIVE
                      </span>
                    </div>
                    <span className="text-slate-400 text-[11px]">
                      Route: {selectedOrder.customer.city} Central Hub • Doorstep Cash on Delivery
                    </span>
                  </div>
                </div>

                <a
                  href={`tel:${assignedRiderPhone}`}
                  className="bg-[#059669] hover:bg-[#047857] text-white font-black text-[11px] uppercase tracking-wider px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer shadow-md active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>CALL DELIVERY RIDER</span>
                </a>
              </div>
            ) : (
              <div className="bg-[#141414] p-4 rounded-2xl border border-amber-500/25 bg-amber-950/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 font-black flex items-center justify-center text-sm shrink-0">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white block text-xs sm:text-sm uppercase tracking-tight">
                        Assigned Courier Rider: {assignedRiderName}
                      </span>
                      <span className="bg-amber-500/20 text-amber-400 text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-amber-500/30">
                        RIDER NUMBER DISABLED BY ADMIN
                      </span>
                    </div>
                    <span className="text-slate-400 text-[11px]">
                      {courierSettings.privacyModeMessage}
                    </span>
                  </div>
                </div>

                <a
                  href={`tel:${courierSettings.supportContactPhone}`}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-black text-[11px] uppercase tracking-wider px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer active:scale-95"
                >
                  <Headphones className="w-3.5 h-3.5 text-[#059669]" />
                  <span>CALL CENTRAL SUPPORT</span>
                </a>
              </div>
            )}

          </div>

          {/* Order Items Breakdown */}
          <div className="bg-[#0e0e0e] border border-white/10 rounded-3xl p-6 shadow-md space-y-4">
            <h3 className="font-display font-black text-sm uppercase tracking-wider text-white">
              ITEMS IN THIS PARCEL ({selectedOrder.items.length})
            </h3>
            <div className="divide-y divide-white/10">
              {selectedOrder.items.map((it, i) => (
                <div key={i} className="py-3 first:pt-0 last:pb-0 flex items-center gap-3">
                  <img src={it.image} alt={it.title} className="w-14 h-14 rounded-xl object-cover bg-slate-800" />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-xs sm:text-sm text-white truncate uppercase">{it.title}</h5>
                    <p className="text-xs text-slate-400 font-mono">Qty: {it.quantity} • {formatPKR(it.price)} each</p>
                  </div>
                  <div className="font-mono font-black text-xs sm:text-sm text-[#059669]">
                    {formatPKR(it.price * it.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : searched ? (
        <div className="bg-[#0e0e0e] border border-white/10 rounded-3xl p-12 text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-rose-950/40 text-rose-500 flex items-center justify-center mx-auto border border-rose-500/20">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-display font-black text-white uppercase tracking-tight">
            NO CONSIGNMENT FOUND WITH ID "{searchQuery}"
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Please check the tracking number sent to your Pakistani mobile phone or verify the digits.
          </p>
        </div>
      ) : null}

    </div>
  );
};
