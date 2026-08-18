import React from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  CheckCircle2, 
  Truck, 
  Calendar, 
  Printer, 
  ArrowRight, 
  Sparkles
} from 'lucide-react';
import { formatPKR } from '../../data/pakistanLocations';

export const OrderSuccessModal: React.FC = () => {
  const { lastPlacedOrder, setLastPlacedOrder, setActiveView } = useStore();

  if (!lastPlacedOrder) return null;

  const handleTrackOrder = () => {
    setLastPlacedOrder(null);
    setActiveView('tracking');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={() => setLastPlacedOrder(null)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#080808] text-white rounded-3xl shadow-2xl border border-white/10 overflow-hidden z-10 p-6 sm:p-8 space-y-6 my-auto">
        
        {/* Success Icon & Heading */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-3xl bg-[#059669] text-black flex items-center justify-center mx-auto shadow-lg shadow-[#059669]/20">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="inline-flex items-center gap-1 bg-[#059669]/20 text-[#059669] font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-widest border border-[#059669]/40">
            <Sparkles className="w-3.5 h-3.5" />
            SHUKRIYA! ORDER CONFIRMED
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight uppercase italic">
            ORDER #{lastPlacedOrder.orderNumber}
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            We have dispatched your invoice & booking details via SMS & WhatsApp to <strong>{lastPlacedOrder.customer.phone}</strong>.
          </p>
        </div>

        {/* Courier & Tracking Details Card */}
        <div className="bg-[#121212] p-4 sm:p-6 rounded-2xl border border-white/10 space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Courier Partner:</span>
              <span className="font-display font-black text-sm text-white uppercase">{lastPlacedOrder.courier}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Consignment Tracking ID:</span>
              <span className="font-mono font-black text-sm text-[#059669] bg-[#059669]/10 px-2 py-0.5 rounded border border-[#059669]/30">
                {lastPlacedOrder.trackingNumber}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Delivery Address:</span>
              <p className="font-medium text-slate-300">
                {lastPlacedOrder.customer.fullName} • {lastPlacedOrder.customer.address}, {lastPlacedOrder.customer.area}, {lastPlacedOrder.customer.city}
              </p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Estimated Arrival:</span>
              <p className="font-black text-[#059669] flex items-center gap-1.5 uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                {lastPlacedOrder.estimatedDeliveryDate}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs sm:text-sm font-black uppercase tracking-wider">
            <span>Total Payable ({lastPlacedOrder.paymentMethod.toUpperCase()}):</span>
            <span className="text-[#059669] font-mono text-base sm:text-lg">
              {formatPKR(lastPlacedOrder.total)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleTrackOrder}
            className="flex-1 bg-[#059669] hover:bg-[#047857] text-white font-black text-xs uppercase tracking-widest py-3.5 rounded-full shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
          >
            <Truck className="w-4 h-4" />
            <span>TRACK SHIPMENT</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handlePrint}
            className="bg-[#141414] hover:bg-white/10 text-white font-black text-xs uppercase tracking-wider px-5 py-3.5 rounded-full border border-white/15 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>PRINT</span>
          </button>

          <button
            onClick={() => setLastPlacedOrder(null)}
            className="bg-[#141414] hover:bg-white/10 text-slate-400 hover:text-white font-black text-xs uppercase tracking-wider px-5 py-3.5 rounded-full border border-white/15 cursor-pointer"
          >
            CONTINUE SHOPPING
          </button>
        </div>

      </div>

    </div>
  );
};
