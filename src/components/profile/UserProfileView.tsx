import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  User, 
  MapPin, 
  Package, 
  Heart, 
  Phone, 
  Mail, 
  LogOut, 
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  RotateCcw,
  XCircle,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  Building,
  Plus,
  Trash2,
  ShoppingBag,
  Search,
  ArrowRight
} from 'lucide-react';
import { formatPKR, PAKISTAN_CITIES } from '../../data/pakistanLocations';
import { ProductCard } from '../catalog/ProductCard';
import { AuthView } from '../auth/AuthView';
import { Order, OrderStatus, ShippingAddress } from '../../types';

export const UserProfileView: React.FC = () => {
  const { 
    user, 
    logout, 
    orders, 
    wishlist, 
    products, 
    setActiveView, 
    cancelOrder, 
    reorderItems,
    updateUserProfile,
    openLegalModal,
    addToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist'>('orders');
  const [orderFilter, setOrderFilter] = useState<'all' | 'active' | 'delivered' | 'cancelled'>('all');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [trackingModalOrder, setTrackingModalOrder] = useState<Order | null>(null);
  const [cancelModalOrder, setCancelModalOrder] = useState<Order | null>(null);
  const [cancelReason, setCancelReason] = useState('Changed my mind');
  const [copiedTracking, setCopiedTracking] = useState<string | null>(null);

  // Address modal state
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState<ShippingAddress>({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    province: 'Punjab',
    city: 'Lahore',
    area: '',
    address: '',
    postalCode: '54000',
    orderNotes: ''
  });

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  if (!user) {
    return <AuthView />;
  }

  // Filter orders
  const filteredOrders = orders.filter(order => {
    // Status filter
    if (orderFilter === 'active') {
      if (['delivered', 'cancelled'].includes(order.status)) return false;
    } else if (orderFilter === 'delivered') {
      if (order.status !== 'delivered') return false;
    } else if (orderFilter === 'cancelled') {
      if (order.status !== 'cancelled') return false;
    }

    // Search query filter
    if (orderSearchQuery.trim()) {
      const q = orderSearchQuery.toLowerCase();
      const matchesOrderNo = order.orderNumber.toLowerCase().includes(q);
      const matchesTracking = order.trackingNumber.toLowerCase().includes(q);
      const matchesCourier = order.courier.toLowerCase().includes(q);
      const matchesCity = order.customer.city.toLowerCase().includes(q);
      const matchesItem = order.items.some(it => it.title.toLowerCase().includes(q));
      return matchesOrderNo || matchesTracking || matchesCourier || matchesCity || matchesItem;
    }

    return true;
  });

  const handleCopyTracking = (trackingNum: string) => {
    navigator.clipboard.writeText(trackingNum);
    setCopiedTracking(trackingNum);
    addToast('info', 'Tracking Number Copied', `Consignment #${trackingNum} copied to clipboard.`);
    setTimeout(() => setCopiedTracking(null), 2500);
  };

  const handleConfirmCancel = () => {
    if (!cancelModalOrder) return;
    cancelOrder(cancelModalOrder.id, cancelReason);
    setCancelModalOrder(null);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.address.trim() || !newAddress.area.trim()) {
      addToast('error', 'Incomplete Address', 'Please provide complete street address and area/colony.');
      return;
    }

    const updatedAddresses = [...user.addresses, newAddress];
    updateUserProfile({ addresses: updatedAddresses });
    setShowAddressModal(false);
    addToast('success', 'Address Saved', 'New delivery address added to your profile.');
    setNewAddress({
      fullName: user.name,
      phone: user.phone,
      email: user.email,
      province: 'Punjab',
      city: 'Lahore',
      area: '',
      address: '',
      postalCode: '54000'
    });
  };

  const handleDeleteAddress = (index: number) => {
    if (user.addresses.length <= 1) {
      addToast('warning', 'Primary Address Required', 'You must keep at least one primary shipping address.');
      return;
    }
    const updated = user.addresses.filter((_, idx) => idx !== index);
    updateUserProfile({ addresses: updated });
    addToast('info', 'Address Removed', 'Shipping address was removed.');
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Delivered
          </span>
        );
      case 'out_for_delivery':
        return (
          <span className="inline-flex items-center gap-1.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider animate-pulse">
            <Truck className="w-3.5 h-3.5" />
            Out For Delivery
          </span>
        );
      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1.5 bg-sky-500/20 text-sky-300 border border-sky-500/30 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider">
            <Package className="w-3.5 h-3.5" />
            Dispatched via TCS
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            Packing & Inspection
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider">
            <Check className="w-3.5 h-3.5" />
            Order Confirmed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider">
            <XCircle className="w-3.5 h-3.5" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 bg-slate-500/20 text-slate-300 border border-slate-500/30 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            Pending Review
          </span>
        );
    }
  };

  const getStatusStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
      case 'confirmed':
        return 0;
      case 'processing':
        return 1;
      case 'shipped':
        return 2;
      case 'out_for_delivery':
        return 3;
      case 'delivered':
        return 4;
      case 'cancelled':
        return -1;
      default:
        return 0;
    }
  };

  const steps = [
    { title: 'Confirmed', desc: 'Order received' },
    { title: 'Processing', desc: 'Tamper-proof packing' },
    { title: 'Dispatched', desc: 'In courier transit' },
    { title: 'Out for Delivery', desc: 'With local rider' },
    { title: 'Delivered', desc: 'Doorstep completion' }
  ];

  return (
    <div id="profile-page" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      
      {/* Profile Header Card */}
      <div className="bg-[#0e0e0e] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-linear-to-br from-[#059669] to-[#047857] text-white font-display font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg shadow-[#059669]/25 border border-white/20">
            {user.name.charAt(0)}
          </div>
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-display font-black text-white uppercase italic tracking-tight">
                {user.name}
              </h1>
              {user.isAdmin ? (
                <span className="bg-[#059669]/20 text-[#059669] border border-[#059669]/40 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest">
                  STORE ADMIN
                </span>
              ) : (
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest">
                  {user.role === 'vip' ? '👑 VIP MEMBER' : 'VERIFIED SHOPPER'}
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <Phone className="w-3.5 h-3.5 text-[#059669]" />
                {user.phone}
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <Mail className="w-3.5 h-3.5 text-[#059669]" />
                {user.email}
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-[#059669]" />
                {user.city}, {user.province}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {user.isAdmin && (
            <button
              id="admin-dashboard-btn"
              onClick={() => setActiveView('admin')}
              className="bg-white hover:bg-slate-200 text-black text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-full transition-colors cursor-pointer shadow-md"
            >
              ADMIN DASHBOARD
            </button>
          )}
          <button
            onClick={() => openLegalModal('data-safety')}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white font-black uppercase tracking-wider px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Data Safety & Privacy</span>
          </button>
          <button
            id="sign-out-btn"
            onClick={logout}
            className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-black uppercase tracking-wider px-4 py-2.5 rounded-full bg-rose-950/40 border border-rose-500/30 cursor-pointer transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>SIGN OUT</span>
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex border-b border-white/10 gap-8 font-black text-xs uppercase tracking-widest overflow-x-auto no-scrollbar">
        <button
          id="tab-orders-btn"
          onClick={() => setActiveTab('orders')}
          className={`pb-3.5 flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'orders'
              ? 'border-b-2 border-[#059669] text-[#059669]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>ORDER HISTORY & CONSIGNMENTS ({orders.length})</span>
        </button>

        <button
          id="tab-wishlist-btn"
          onClick={() => setActiveTab('wishlist')}
          className={`pb-3.5 flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'wishlist'
              ? 'border-b-2 border-[#059669] text-[#059669]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>SAVED WISHLIST ({wishlist.length})</span>
        </button>

        <button
          id="tab-addresses-btn"
          onClick={() => setActiveTab('addresses')}
          className={`pb-3.5 flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'addresses'
              ? 'border-b-2 border-[#059669] text-[#059669]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>SAVED ADDRESSES ({user.addresses.length})</span>
        </button>
      </div>

      {/* Tab 1: Orders History & Live Tracking */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          
          {/* Sub-Filters and Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#0e0e0e] p-4 rounded-2xl border border-white/10">
            {/* Status Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
              <button
                onClick={() => setOrderFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  orderFilter === 'all'
                    ? 'bg-[#059669] text-white shadow-md'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                All Orders ({orders.length})
              </button>
              <button
                onClick={() => setOrderFilter('active')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  orderFilter === 'active'
                    ? 'bg-[#059669] text-white shadow-md'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                Active / In-Transit ({orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length})
              </button>
              <button
                onClick={() => setOrderFilter('delivered')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  orderFilter === 'delivered'
                    ? 'bg-[#059669] text-white shadow-md'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                Delivered ({orders.filter(o => o.status === 'delivered').length})
              </button>
              <button
                onClick={() => setOrderFilter('cancelled')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  orderFilter === 'cancelled'
                    ? 'bg-[#059669] text-white shadow-md'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                Cancelled ({orders.filter(o => o.status === 'cancelled').length})
              </button>
            </div>

            {/* Search Orders */}
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={orderSearchQuery}
                onChange={(e) => setOrderSearchQuery(e.target.value)}
                placeholder="Search orders or tracking #..."
                className="w-full bg-[#181818] border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-[#059669]"
              />
            </div>
          </div>

          {/* Orders List */}
          {filteredOrders.length > 0 ? (
            <div className="space-y-6">
              {filteredOrders.map((order, oIdx) => {
                const isExpanded = expandedOrderId === order.id;
                const activeStepIdx = getStatusStepIndex(order.status);
                const isCancellable = order.status === 'pending' || order.status === 'confirmed';

                return (
                  <div
                    key={order.id || `user-order-${order.orderNumber || oIdx}`}
                    id={`order-card-${order.orderNumber}`}
                    className="bg-[#0e0e0e] border border-white/10 rounded-3xl p-5 sm:p-7 shadow-xl space-y-5 transition-all hover:border-white/20"
                  >
                    {/* Top Order Meta */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-slate-400 uppercase font-black text-[11px] tracking-wider">ORDER:</span>
                          <span className="font-mono font-black text-white text-base tracking-wider">{order.orderNumber}</span>
                          <span className="text-slate-500 text-xs">• {order.date}</span>
                        </div>
                        <p className="text-xs text-slate-400">
                          Destination: <span className="text-slate-200 font-medium">{order.customer.address}, {order.customer.city}</span>
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        {getStatusBadge(order.status)}

                        <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-slate-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                          <CreditCard className="w-3.5 h-3.5 text-[#059669]" />
                          {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod === 'bank_transfer' ? 'Direct Bank Transfer' : order.paymentMethod.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Consignment Tracking Header Box */}
                    <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-[#059669]/40 flex items-center justify-center text-[#059669] shrink-0">
                          <Truck className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">
                            {order.courier}
                          </p>
                          <div className="flex items-center gap-2 font-mono font-bold text-white text-xs">
                            <span>Airway Bill: {order.trackingNumber}</span>
                            <button
                              onClick={() => handleCopyTracking(order.trackingNumber)}
                              className="text-slate-400 hover:text-emerald-400 transition-colors p-1 cursor-pointer"
                              title="Copy Consignment #"
                            >
                              {copiedTracking === order.trackingNumber ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setTrackingModalOrder(order)}
                          className="bg-[#059669]/20 hover:bg-[#059669]/30 text-emerald-300 border border-[#059669]/40 text-xs font-black uppercase tracking-wider px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>LIVE TRACKING</span>
                        </button>
                      </div>
                    </div>

                    {/* Stepper Progress Bar (only if not cancelled) */}
                    {order.status !== 'cancelled' && (
                      <div className="py-2 hidden md:block">
                        <div className="grid grid-cols-5 gap-2 relative">
                          {steps.map((st, sIdx) => {
                            const isDone = sIdx <= activeStepIdx;
                            const isCurrent = sIdx === activeStepIdx;

                            return (
                              <div key={`step-${sIdx}`} className="flex flex-col items-center text-center space-y-1.5">
                                <div 
                                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                                    isDone 
                                      ? 'bg-[#059669] text-white shadow-md shadow-[#059669]/30' 
                                      : 'bg-white/10 text-slate-500 border border-white/10'
                                  } ${isCurrent ? 'ring-2 ring-white/50 ring-offset-2 ring-offset-[#0e0e0e]' : ''}`}
                                >
                                  {isDone ? <Check className="w-3.5 h-3.5" /> : sIdx + 1}
                                </div>
                                <span className={`text-[11px] font-black uppercase tracking-wider ${isDone ? 'text-emerald-300' : 'text-slate-500'}`}>
                                  {st.title}
                                </span>
                                <span className="text-[9px] text-slate-500 line-clamp-1">{st.desc}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Rider Contact Card (if assigned) */}
                    {order.showRiderPhone && order.riderName && order.status !== 'cancelled' && (
                      <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-bold text-white uppercase">{order.riderName} (Designated Courier Agent)</p>
                            <p className="text-slate-400 text-[11px]">Contact available for doorstep delivery coordination</p>
                          </div>
                        </div>
                        {order.riderPhone && (
                          <div className="flex items-center gap-2">
                            <a
                              href={`tel:${order.riderPhone}`}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                            >
                              <Phone className="w-3 h-3" />
                              <span>CALL {order.riderPhone}</span>
                            </a>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Bank Transfer Details (if applicable) */}
                    {order.paymentMethod === 'bank_transfer' && order.bankTransferDetails && (
                      <div className="bg-[#161616] border border-white/10 rounded-2xl p-3.5 text-xs space-y-1.5">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase text-[11px]">
                          <Building className="w-3.5 h-3.5" />
                          <span>Direct Bank Deposit Verification</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-300 text-[11px]">
                          <div><span className="text-slate-500">Bank:</span> {order.bankTransferDetails.bankName || 'Meezan Bank'}</div>
                          <div><span className="text-slate-500">Sender:</span> {order.bankTransferDetails.senderAccountName || 'Account Holder'}</div>
                          <div><span className="text-slate-500">Txn ID:</span> <span className="font-mono text-white">{order.bankTransferDetails.transactionId || 'Manual Check'}</span></div>
                        </div>
                      </div>
                    )}

                    {/* Items List */}
                    <div className="divide-y divide-white/10 border-t border-b border-white/10 py-2">
                      {order.items.map((item, itemIdx) => (
                        <div 
                          key={item.id ? `${order.id || oIdx}-${item.id}-${itemIdx}` : `${order.id || oIdx}-item-${itemIdx}`} 
                          className="py-3 flex items-center justify-between text-xs gap-4"
                        >
                          <div className="flex items-center gap-3">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-14 h-14 rounded-2xl object-cover bg-slate-800 border border-white/10 shrink-0" 
                            />
                            <div className="space-y-0.5">
                              <p className="font-bold text-white uppercase text-xs">{item.title}</p>
                              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                                <span>Qty: {item.quantity}</span>
                                {item.selectedVariant && <span>• {item.selectedVariant.name}</span>}
                                {item.selectedColor && <span>• Color: {item.selectedColor}</span>}
                                {item.selectedSize && <span>• Size: {item.selectedSize}</span>}
                              </div>
                              <p className="text-[11px] text-slate-500">Unit Price: {formatPKR(item.price)}</p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="font-mono font-black text-emerald-400 text-sm">
                              {formatPKR(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Financial Totals & Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-3 text-slate-400">
                          <span>Subtotal: <strong className="text-white font-mono">{formatPKR(order.subtotal)}</strong></span>
                          {order.discount > 0 && (
                            <span className="text-emerald-400">Voucher: -{formatPKR(order.discount)}</span>
                          )}
                          <span>Delivery: <strong className="text-white font-mono">{order.shippingFee === 0 ? 'FREE' : formatPKR(order.shippingFee)}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 font-bold uppercase text-[11px]">Total Payable:</span>
                          <span className="font-mono font-black text-emerald-400 text-base">
                            {formatPKR(order.total)}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <button
                          onClick={() => reorderItems(order.items)}
                          className="bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                          <span>REORDER ITEMS</span>
                        </button>

                        <button
                          onClick={() => setTrackingModalOrder(order)}
                          className="bg-[#059669] hover:bg-[#047857] text-white font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>TRACK DISPATCH</span>
                        </button>

                        {isCancellable && (
                          <button
                            onClick={() => setCancelModalOrder(order)}
                            className="bg-rose-950/30 hover:bg-rose-900/50 text-rose-300 border border-rose-500/30 text-xs font-black uppercase tracking-wider px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>CANCEL</span>
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-16 text-center bg-[#0e0e0e] rounded-3xl border border-white/10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 mx-auto">
                <Package className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-display font-black text-white uppercase">NO ORDERS FOUND</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  {orderSearchQuery || orderFilter !== 'all' 
                    ? 'No orders match your selected filter or search keyword. Try clearing filters.'
                    : 'You have not placed any orders yet. Explore our luxury collection with Cash on Delivery nationwide.'}
                </p>
              </div>
              <button
                onClick={() => setActiveView('catalog')}
                className="bg-[#059669] hover:bg-[#047857] text-white font-black text-xs uppercase tracking-wider px-6 py-3 rounded-full inline-flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#059669]/20"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>START SHOPPING</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          {wishlistProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistProducts.map((p, pIdx) => (
                <ProductCard key={p.id || `wishlist-prod-${pIdx}`} product={p} />
              ))}
            </div>
          ) : (
            <div className="p-16 text-center bg-[#0e0e0e] rounded-3xl border border-white/10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-rose-500/50 mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-display font-black text-white uppercase">YOUR WISHLIST IS EMPTY</h3>
                <p className="text-xs text-slate-400">Tap the heart icon on any Lawn, Attar, or Footwear piece to save it for later.</p>
              </div>
              <button
                onClick={() => setActiveView('catalog')}
                className="bg-[#059669] hover:bg-[#047857] text-white font-black text-xs uppercase tracking-wider px-6 py-3 rounded-full inline-flex items-center gap-2 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>EXPLORE PRODUCTS</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Saved Addresses */}
      {activeTab === 'addresses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-[#0e0e0e] p-5 rounded-2xl border border-white/10">
            <div>
              <h3 className="font-display font-black text-sm text-white uppercase">SHIPPING ADDRESS BOOK</h3>
              <p className="text-xs text-slate-400">Saved Pakistani addresses for express one-click checkout</p>
            </div>
            <button
              onClick={() => setShowAddressModal(true)}
              className="bg-[#059669] hover:bg-[#047857] text-white text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>ADD ADDRESS</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.addresses.map((addr, addrIdx) => (
              <div
                key={`address-${addrIdx}-${addr.city || 'pk'}`}
                className="bg-[#0e0e0e] border border-white/10 rounded-3xl p-6 shadow-md space-y-3 text-xs relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-black text-sm text-white uppercase">
                      {addr.area ? `${addr.area}, ${addr.city}` : `${addr.city} Address`}
                    </span>
                    {addrIdx === 0 && (
                      <span className="bg-[#059669]/20 text-[#059669] border border-[#059669]/30 font-black px-2 py-0.5 rounded text-[10px] uppercase tracking-widest">
                        PRIMARY
                      </span>
                    )}
                  </div>

                  {user.addresses.length > 1 && (
                    <button
                      onClick={() => handleDeleteAddress(addrIdx)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1 cursor-pointer"
                      title="Delete Address"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="space-y-1 text-slate-300">
                  <p className="font-bold text-white">{addr.fullName} <span className="text-slate-400 font-normal">({addr.phone})</span></p>
                  <p className="text-slate-400 leading-relaxed">
                    {addr.address}, {addr.area}, {addr.city} ({addr.province}) {addr.postalCode ? `- Postal Code: ${addr.postalCode}` : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live Consignment Tracking Modal */}
      {trackingModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0e0e0e] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="space-y-1">
                <h3 className="font-display font-black text-lg text-white uppercase">
                  CONSIGNMENT TRACKING
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {trackingModalOrder.courier} • {trackingModalOrder.trackingNumber}
                </p>
              </div>
              <button
                onClick={() => setTrackingModalOrder(null)}
                className="text-slate-400 hover:text-white p-1 rounded-full cursor-pointer"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Status Summary Banner */}
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Current Status</p>
                <p className="text-sm font-black text-emerald-400 uppercase mt-0.5">
                  {trackingModalOrder.status.replace(/_/g, ' ')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Est. Doorstep Delivery</p>
                <p className="text-xs font-mono font-bold text-white mt-0.5">
                  {trackingModalOrder.estimatedDeliveryDate}
                </p>
              </div>
            </div>

            {/* Step-by-Step Dispatch Timeline */}
            <div className="space-y-4 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
              {trackingModalOrder.trackingTimeline.map((event, eIdx) => (
                <div key={`track-evt-${eIdx}`} className="relative space-y-1 text-xs">
                  <div 
                    className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-[#0e0e0e] ${
                      event.completed ? 'bg-emerald-500 ring-2 ring-emerald-500/30' : 'bg-slate-700'
                    }`}
                  />
                  <div className="flex items-center justify-between">
                    <p className={`font-black uppercase text-xs ${event.completed ? 'text-white' : 'text-slate-500'}`}>
                      {event.title}
                    </p>
                    <span className="text-[10px] font-mono text-slate-400">{event.timestamp}</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">{event.description}</p>
                  <p className="text-[10px] text-emerald-400/80 font-medium">📍 {event.location}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => setTrackingModalOrder(null)}
                className="w-full bg-[#059669] hover:bg-[#047857] text-white font-black text-xs uppercase tracking-wider py-3 rounded-xl transition-colors cursor-pointer"
              >
                CLOSE TRACKING
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Order Modal */}
      {cancelModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0e0e0e] border border-rose-500/30 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <h3 className="font-display font-black text-lg text-white uppercase">
                CANCEL ORDER #{cancelModalOrder.orderNumber}?
              </h3>
            </div>
            <p className="text-xs text-slate-300">
              Are you sure you want to cancel this order? Once cancelled, the courier dispatch process will be stopped immediately.
            </p>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                Reason for cancellation
              </label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full bg-[#181818] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-rose-500"
              >
                <option value="Changed my mind">Changed my mind</option>
                <option value="Need to change shipping address">Need to change shipping address</option>
                <option value="Found a better price / coupon">Found a better price / coupon</option>
                <option value="Ordered by mistake">Ordered by mistake</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setCancelModalOrder(null)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-wider py-3 rounded-xl transition-colors cursor-pointer"
              >
                KEEP ORDER
              </button>
              <button
                onClick={handleConfirmCancel}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider py-3 rounded-xl transition-colors cursor-pointer shadow-lg shadow-rose-600/30"
              >
                CONFIRM CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0e0e0e] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-display font-black text-lg text-white uppercase">
                ADD NEW DELIVERY ADDRESS
              </h3>
              <button
                onClick={() => setShowAddressModal(false)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddAddress} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newAddress.fullName}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full bg-[#181818] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-hidden focus:border-[#059669]"
                  placeholder="e.g. Hamza Tariq"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Mobile Phone (03XX-XXXXXXX)</label>
                  <input
                    type="tel"
                    required
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-[#181818] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-hidden focus:border-[#059669]"
                    placeholder="03001234567"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">City</label>
                  <select
                    value={newAddress.city}
                    onChange={(e) => {
                      const selected = PAKISTAN_CITIES.find(c => c.name === e.target.value);
                      setNewAddress(prev => ({ 
                        ...prev, 
                        city: e.target.value, 
                        province: selected?.province || prev.province,
                        postalCode: selected?.postalCode || prev.postalCode
                      }));
                    }}
                    className="w-full bg-[#181818] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-hidden focus:border-[#059669]"
                  >
                    {PAKISTAN_CITIES.map(c => (
                      <option key={c.name} value={c.name}>{c.name} ({c.province})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Area / Colony / Sector</label>
                <input
                  type="text"
                  required
                  value={newAddress.area}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, area: e.target.value }))}
                  className="w-full bg-[#181818] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-hidden focus:border-[#059669]"
                  placeholder="e.g. DHA Phase 5, Block G"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Street Address / House / Flat No.</label>
                <input
                  type="text"
                  required
                  value={newAddress.address}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full bg-[#181818] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-hidden focus:border-[#059669]"
                  placeholder="e.g. House #14, Street 2"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-wider py-3 rounded-xl transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#059669] hover:bg-[#047857] text-white font-black text-xs uppercase tracking-wider py-3 rounded-xl transition-colors cursor-pointer shadow-lg shadow-[#059669]/25"
                >
                  SAVE ADDRESS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
