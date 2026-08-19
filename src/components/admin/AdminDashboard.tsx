import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  TrendingUp, 
  Package, 
  Truck, 
  DollarSign, 
  Clock, 
  Plus,
  ShieldCheck,
  ShieldAlert,
  Lock,
  KeyRound,
  ArrowRight,
  Eye,
  EyeOff,
  Phone,
  PhoneOff,
  Settings,
  Headphones,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Ticket,
  Flame,
  Palette,
  Building2,
  Sparkles
} from 'lucide-react';
import { formatPKR } from '../../data/pakistanLocations';
import { CouponsManager } from './CouponsManager';
import { SalesCampaignManager } from './SalesCampaignManager';
import { DesignStudioManager } from './DesignStudioManager';
import { BankPaymentManager } from './BankPaymentManager';
import { Product, Order } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { 
    user, 
    grantAdminAccess, 
    products, 
    orders, 
    updateOrderStatus, 
    addProduct, 
    addToast,
    courierSettings,
    updateCourierSettings,
    toggleGlobalRiderPhone,
    toggleOrderRiderPhone,
    updateOrderRiderDetails,
    coupons,
    salesSettings,
    siteDesign,
    bankSettings
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'courier-rider' | 'coupons' | 'sales' | 'design' | 'bank-payments' | 'inventory'>('overview');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [showAdminPass, setShowAdminPass] = useState(false);
  const [adminPassError, setAdminPassError] = useState('');

  // Courier settings local form state
  const [riderFormName, setRiderFormName] = useState(courierSettings.defaultRiderName);
  const [riderFormPhone, setRiderFormPhone] = useState(courierSettings.defaultRiderPhone);
  const [supportFormPhone, setSupportFormPhone] = useState(courierSettings.supportContactPhone);
  const [privacyMessage, setPrivacyMessage] = useState(courierSettings.privacyModeMessage);

  // Edit rider for single order modal
  const [editingOrderRider, setEditingOrderRider] = useState<Order | null>(null);
  const [customRiderName, setCustomRiderName] = useState('');
  const [customRiderPhone, setCustomRiderPhone] = useState('');
  const [customRiderVisible, setCustomRiderVisible] = useState(true);

  // Calculate live stats
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'processing');
  const outForDelivery = orders.filter(o => o.status === 'out_for_delivery' || o.status === 'shipped');

  // New product state
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState(2500);
  const [newCategory, setNewCategory] = useState('mens-wear');
  const [newBrand, setNewBrand] = useState('J. Junaid Jamshed');

  const handleAdminGateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPasswordInput) {
      setAdminPassError('Please enter the Admin Master Password.');
      return;
    }
    const success = grantAdminAccess(adminPasswordInput.trim());
    if (!success) {
      setAdminPassError('Invalid admin master password. Access denied.');
    } else {
      setAdminPassError('');
      setAdminPasswordInput('');
    }
  };

  const handleSaveCourierSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateCourierSettings({
      defaultRiderName: riderFormName.trim(),
      defaultRiderPhone: riderFormPhone.trim(),
      supportContactPhone: supportFormPhone.trim(),
      privacyModeMessage: privacyMessage.trim()
    });
  };

  const openEditRiderModal = (order: Order) => {
    setEditingOrderRider(order);
    setCustomRiderName(order.riderName || courierSettings.defaultRiderName);
    setCustomRiderPhone(order.riderPhone || courierSettings.defaultRiderPhone);
    setCustomRiderVisible(order.showRiderPhone !== false);
  };

  const handleSaveOrderRider = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrderRider) return;
    updateOrderRiderDetails(
      editingOrderRider.id,
      customRiderName.trim(),
      customRiderPhone.trim(),
      customRiderVisible
    );
    setEditingOrderRider(null);
  };

  // If user is not an admin, render the Admin Gate
  if (!user?.isAdmin) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-white space-y-6">
        <div className="bg-[#0e0e0e] border border-purple-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center mx-auto text-purple-400">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-[10px] font-black uppercase tracking-widest text-purple-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>AuraPK Merchant Command Center</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-white">
              ADMIN MASTER AUTHENTICATION
            </h1>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Enter the master administrator passcode to unlock live sales metrics, inventory adjustments, and courier booking operations.
            </p>
          </div>

          <form onSubmit={handleAdminGateSubmit} className="space-y-4 text-left pt-2">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-300 mb-1.5">
                MASTER ADMIN PASSCODE *
              </label>
              <div className="relative">
                <input
                  id="admin-master-password"
                  type={showAdminPass ? 'text' : 'password'}
                  required
                  value={adminPasswordInput}
                  onChange={e => {
                    setAdminPasswordInput(e.target.value);
                    setAdminPassError('');
                  }}
                  placeholder="Enter master password"
                  className={`w-full bg-[#141414] border ${adminPassError ? 'border-rose-500' : 'border-white/15'} text-sm text-white p-3.5 pl-10 pr-10 rounded-2xl outline-none focus:border-purple-500`}
                />
                <KeyRound className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowAdminPass(!showAdminPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showAdminPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {adminPassError && (
                <p className="text-xs text-rose-400 font-medium mt-1.5">{adminPassError}</p>
              )}
            </div>

            <button
              id="admin-unlock-btn"
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black text-xs sm:text-sm uppercase tracking-widest py-4 rounded-full shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>UNLOCK COMMAND CENTER</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-[10px] text-slate-500 font-mono">
            Authorized store staff and administrative managers only.
          </p>
        </div>
      </div>
    );
  }

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: Product = {
      id: `p-${Date.now()}`,
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/\s+/g, '-'),
      brand: newBrand,
      category: newCategory,
      subcategory: 'general',
      price: newPrice,
      originalPrice: Math.round(newPrice * 1.3),
      discountPercentage: 23,
      rating: 4.8,
      reviewCount: 1,
      stockCount: 50,
      inStock: true,
      featuredImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
      images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80'],
      shortDescription: 'Premium Pakistani fabric designed for contemporary style.',
      description: 'Crafted with premium materials to guarantee comfort and longevity across all weather conditions.',
      features: ['Pure combed cotton', 'Authentic Pakistani stitch', 'Fade-resistant dye'],
      specifications: { 'Origin': 'Pakistan', 'Fabric': 'Lawn Cotton' },
      isBestSeller: true,
      warranty: 'Official 1-Year Store Warranty',
      returnPolicy: '7-Day Easy Doorstep Return',
      tags: ['trending', 'pakistan', 'new'],
      reviews: []
    };

    addProduct(created);
    setIsAddingProduct(false);
    setNewTitle('');
    addToast('success', 'Product Added', 'New product is now live on the AuraPK store!');
  };

  return (
    <div id="admin-portal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white uppercase italic tracking-tight">
              PAKISTAN STORE COMMAND CENTER
            </h1>
            <span className="bg-[#059669] text-black font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-widest">
              LIVE OPS
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time COD transactions, courier booking APIs (TCS, Leopards, Trax), and stock inventory.
          </p>
        </div>

        <button
          onClick={() => setIsAddingProduct(true)}
          className="bg-[#059669] hover:bg-[#047857] text-white text-xs font-black uppercase tracking-wider px-5 py-3 rounded-full shadow-md flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>ADD NEW PRODUCT</span>
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-[#0e0e0e] border border-white/10 p-5 rounded-3xl shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-black uppercase tracking-wider">TOTAL STORE SALES (PKR)</span>
            <DollarSign className="w-4 h-4 text-[#059669]" />
          </div>
          <div className="text-2xl font-mono font-black text-white">
            {formatPKR(totalRevenue)}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-[#059669] font-bold">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% across Karachi & Lahore</span>
          </div>
        </div>

        <div className="bg-[#0e0e0e] border border-white/10 p-5 rounded-3xl shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-black uppercase tracking-wider">PENDING COD DISPATCH</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-display font-black text-amber-400">
            {pendingOrders.length} ORDERS
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            TCS courier pickup scheduled 4:30 PM
          </div>
        </div>

        <div className="bg-[#0e0e0e] border border-white/10 p-5 rounded-3xl shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-black uppercase tracking-wider">OUT FOR DELIVERY</span>
            <Truck className="w-4 h-4 text-[#059669]" />
          </div>
          <div className="text-2xl font-display font-black text-[#059669]">
            {outForDelivery.length} PARCELS
          </div>
          <div className="text-[11px] text-slate-400">
            En route with doorstep riders
          </div>
        </div>

        <div className="bg-[#0e0e0e] border border-white/10 p-5 rounded-3xl shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-black uppercase tracking-wider">ACTIVE PRODUCTS</span>
            <Package className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-display font-black text-purple-400">
            {products.length} ITEMS
          </div>
          <div className="text-[11px] text-slate-400">
            Across 6 Pakistani categories
          </div>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 gap-6 font-black text-xs uppercase tracking-widest overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'overview'
              ? 'border-b-2 border-[#059669] text-[#059669]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          ORDERS ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('courier-rider')}
          className={`pb-3 transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            activeTab === 'courier-rider'
              ? 'border-b-2 border-[#059669] text-[#059669]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>COURIER & RIDER</span>
          <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase ${
            courierSettings.isRiderPhoneEnabled 
              ? 'bg-[#059669]/20 text-[#059669] border border-[#059669]/30' 
              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
          }`}>
            {courierSettings.isRiderPhoneEnabled ? 'PHONE ON' : 'PHONE OFF'}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('coupons')}
          className={`pb-3 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'coupons'
              ? 'border-b-2 border-[#059669] text-[#059669]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Ticket className="w-3.5 h-3.5" />
          <span>COUPONS ({coupons.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('sales')}
          className={`pb-3 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'sales'
              ? 'border-b-2 border-[#059669] text-[#059669]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>SALES & FLASH DEALS</span>
          {salesSettings.campaignActive && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('design')}
          className={`pb-3 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'design'
              ? 'border-b-2 border-[#059669] text-[#059669]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>STORE DESIGN</span>
        </button>

        <button
          onClick={() => setActiveTab('bank-payments')}
          className={`pb-3 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'bank-payments'
              ? 'border-b-2 border-teal-500 text-teal-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>BANKS & RAAST</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full font-black bg-teal-500/20 text-teal-300 border border-teal-500/30">
            {bankSettings.accounts.filter(a => a.isActive).length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`pb-3 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'inventory'
              ? 'border-b-2 border-[#059669] text-[#059669]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          INVENTORY ({products.length})
        </button>
      </div>

      {/* Tab: Orders Management */}
      {activeTab === 'overview' && (
        <div className="bg-[#0e0e0e] border border-white/10 rounded-3xl overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#141414] text-slate-400 uppercase font-black tracking-wider text-[10px] border-b border-white/10">
                <tr>
                  <th className="p-4">Order #</th>
                  <th className="p-4">Customer & City</th>
                  <th className="p-4">Items</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Courier Status</th>
                  <th className="p-4">Rider Contact</th>
                  <th className="p-4">Status Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-slate-300">
                {orders.map(order => {
                  const isVisible = courierSettings.isRiderPhoneEnabled && (order.showRiderPhone !== false);
                  const riderName = order.riderName || courierSettings.defaultRiderName;
                  const riderPhone = order.riderPhone || courierSettings.defaultRiderPhone;

                  return (
                    <tr key={order.id} className="hover:bg-white/5">
                      <td className="p-4 font-mono font-bold text-white">
                        <div>{order.orderNumber}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{order.trackingNumber}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-white uppercase">{order.customer.fullName}</div>
                        <div className="text-slate-400">{order.customer.city} • {order.customer.phone}</div>
                      </td>
                      <td className="p-4 font-mono">
                        {order.items.length} items
                      </td>
                      <td className="p-4 font-mono font-black text-[#059669]">
                        {formatPKR(order.total)}
                      </td>
                      <td className="p-4 uppercase font-bold text-[11px]">
                        {order.paymentMethod}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full font-black text-[9px] uppercase tracking-wider ${
                          order.status === 'delivered'
                            ? 'bg-[#059669]/20 text-[#059669] border border-[#059669]/40'
                            : order.status === 'out_for_delivery'
                            ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/30'
                            : 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-white uppercase text-[11px]">{riderName}</span>
                            <button
                              type="button"
                              onClick={() => openEditRiderModal(order)}
                              title="Edit Rider Details"
                              className="text-slate-400 hover:text-white cursor-pointer p-0.5"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => toggleOrderRiderPhone(order.id)}
                              className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer ${
                                isVisible
                                  ? 'bg-[#059669]/20 text-[#059669] border border-[#059669]/40 hover:bg-[#059669]/30'
                                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30'
                              }`}
                            >
                              {isVisible ? <Phone className="w-2.5 h-2.5" /> : <PhoneOff className="w-2.5 h-2.5" />}
                              <span>{isVisible ? 'Phone: Enabled' : 'Phone: Disabled'}</span>
                            </button>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {isVisible ? riderPhone : 'Masked (Privacy Mode)'}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <select
                          value={order.status}
                          onChange={e => updateOrderStatus(order.id, e.target.value as any)}
                          className="bg-[#181818] border border-white/15 text-white rounded-lg p-1.5 text-xs outline-none focus:border-[#059669]"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Handed to Courier</option>
                          <option value="out_for_delivery">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Courier & Rider Dispatch Management */}
      {activeTab === 'courier-rider' && (
        <div className="space-y-8">
          
          {/* Master Rider Phone Visibility Toggle Card */}
          <div className="bg-[#0e0e0e] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 bg-purple-500/20 text-purple-400 font-black text-[10px] px-3 py-1 rounded-full border border-purple-500/30 uppercase tracking-widest">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  ADMIN COURIER PRIVACY CONTROLS
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase italic tracking-tight">
                  COURIER RIDER PHONE NUMBER VISIBILITY
                </h3>
                <p className="text-xs text-slate-400 max-w-2xl">
                  Toggle whether customer order tracking pages display the delivery rider's direct mobile number or redirect customer inquiries to central helpline.
                </p>
              </div>

              {/* Big Interactive Master Toggle Switch */}
              <div className="flex items-center gap-3 bg-[#161616] border border-white/15 p-2.5 px-4 rounded-2xl">
                <div className="text-right">
                  <span className="block font-black text-xs uppercase text-white tracking-wider">
                    {courierSettings.isRiderPhoneEnabled ? 'Rider Direct Calling ACTIVE' : 'Rider Direct Calling DISABLED'}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {courierSettings.isRiderPhoneEnabled ? 'Phone numbers visible to customers' : 'Phone numbers hidden from tracking'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={toggleGlobalRiderPhone}
                  className={`w-16 h-9 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
                    courierSettings.isRiderPhoneEnabled ? 'bg-[#059669] justify-end' : 'bg-rose-600 justify-start'
                  }`}
                >
                  <div className="w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center text-slate-900">
                    {courierSettings.isRiderPhoneEnabled ? (
                      <Phone className="w-3.5 h-3.5 text-[#059669]" />
                    ) : (
                      <PhoneOff className="w-3.5 h-3.5 text-rose-600" />
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Status Information Box */}
            {courierSettings.isRiderPhoneEnabled ? (
              <div className="bg-[#059669]/10 border border-[#059669]/30 p-4 rounded-2xl flex items-start gap-3 text-xs text-[#059669]">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-[#059669]" />
                <div>
                  <h5 className="font-black uppercase tracking-wider text-xs text-[#059669]">
                    DIRECT RIDER CALLING IS CURRENTLY ENABLED
                  </h5>
                  <p className="text-slate-300 text-xs mt-1">
                    When customers open their consignment tracking URL or the Order Success page, they will see a green "CALL DELIVERY RIDER" button with the driver's phone number (<code className="text-[#059669] font-mono font-bold">{courierSettings.defaultRiderPhone}</code>).
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex items-start gap-3 text-xs text-amber-400">
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
                <div>
                  <h5 className="font-black uppercase tracking-wider text-xs text-amber-300">
                    DIRECT RIDER NUMBERS ARE DISABLED (PROTECTED PRIVACY MODE)
                  </h5>
                  <p className="text-slate-300 text-xs mt-1">
                    Delivery rider mobile numbers are concealed across all tracking views. Customers attempting to call will be routed to the Central Support Hotline (<code className="text-amber-300 font-mono font-bold">{courierSettings.supportContactPhone}</code>) to prevent harassment and driver distraction during transit.
                  </p>
                </div>
              </div>
            )}

            {/* Courier Dispatch Settings Form */}
            <form onSubmit={handleSaveCourierSettings} className="space-y-4 pt-2">
              <h4 className="font-display font-black text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#059669]" />
                <span>DEFAULT LOGISTICS & RIDER PARAMETERS</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                    Default Rider Name
                  </label>
                  <input
                    type="text"
                    required
                    value={riderFormName}
                    onChange={e => setRiderFormName(e.target.value)}
                    placeholder="e.g. Muhammad Tariq"
                    className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white outline-none focus:border-[#059669]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                    Default Rider Mobile (+92)
                  </label>
                  <input
                    type="text"
                    required
                    value={riderFormPhone}
                    onChange={e => setRiderFormPhone(e.target.value)}
                    placeholder="e.g. +92 321 4455667"
                    className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white font-mono outline-none focus:border-[#059669]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                    Central Support Hotline (Fallback)
                  </label>
                  <input
                    type="text"
                    required
                    value={supportFormPhone}
                    onChange={e => setSupportFormPhone(e.target.value)}
                    placeholder="e.g. +92 21 111 287 275"
                    className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white font-mono outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                  Customer Privacy Mode Notice (Displayed when phone is disabled)
                </label>
                <textarea
                  rows={2}
                  value={privacyMessage}
                  onChange={e => setPrivacyMessage(e.target.value)}
                  className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white text-xs outline-none focus:border-[#059669]"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#059669] hover:bg-[#047857] text-white font-black text-xs uppercase tracking-widest px-6 py-3 rounded-full transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>SAVE COURIER & RIDER SETTINGS</span>
                </button>
              </div>
            </form>

          </div>

          {/* Consignments & Rider Control Table */}
          <div className="bg-[#0e0e0e] border border-white/10 rounded-3xl overflow-hidden shadow-md space-y-4 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-display font-black text-base text-white uppercase tracking-tight">
                  LIVE CONSIGNMENTS & RIDER ASSIGNMENT DIRECTORY
                </h4>
                <p className="text-xs text-slate-400">
                  Manage individual rider contact permissions and assignments for each Pakistani booking.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto -mx-6">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#141414] text-slate-400 uppercase font-black tracking-wider text-[10px] border-b border-white/10">
                  <tr>
                    <th className="p-4">Tracking & Order #</th>
                    <th className="p-4">Delivery Route</th>
                    <th className="p-4">Courier Partner</th>
                    <th className="p-4">Assigned Rider</th>
                    <th className="p-4">Rider Phone</th>
                    <th className="p-4">Rider Phone Access</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-slate-300">
                  {orders.map(order => {
                    const isVisible = courierSettings.isRiderPhoneEnabled && (order.showRiderPhone !== false);
                    const riderName = order.riderName || courierSettings.defaultRiderName;
                    const riderPhone = order.riderPhone || courierSettings.defaultRiderPhone;

                    return (
                      <tr key={order.id} className="hover:bg-white/5">
                        <td className="p-4 font-mono font-bold text-white">
                          <div className="text-[#059669]">{order.trackingNumber}</div>
                          <div className="text-[10px] text-slate-400">{order.orderNumber}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-white uppercase">{order.customer.city}</div>
                          <div className="text-slate-400 text-[11px]">{order.customer.area}</div>
                        </td>
                        <td className="p-4 uppercase font-bold text-white text-[11px]">
                          {order.courier}
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-white uppercase">{riderName}</span>
                        </td>
                        <td className="p-4 font-mono text-[11px]">
                          {riderPhone}
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full font-black text-[9px] uppercase tracking-wider inline-flex items-center gap-1 ${
                            isVisible
                              ? 'bg-[#059669]/20 text-[#059669] border border-[#059669]/40'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                          }`}>
                            {isVisible ? <Phone className="w-2.5 h-2.5" /> : <PhoneOff className="w-2.5 h-2.5" />}
                            {isVisible ? 'CUSTOMER VISIBLE' : 'DISABLED / MASKED'}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => toggleOrderRiderPhone(order.id)}
                              className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                                isVisible
                                  ? 'bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30'
                                  : 'bg-[#059669]/20 hover:bg-[#059669] text-[#059669] hover:text-white border border-[#059669]/30'
                              }`}
                            >
                              {isVisible ? 'Disable Phone' : 'Enable Phone'}
                            </button>
                            <button
                              type="button"
                              onClick={() => openEditRiderModal(order)}
                              className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-white/15 transition-all cursor-pointer"
                            >
                              Edit Rider
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* Tab: Coupons */}
      {activeTab === 'coupons' && <CouponsManager />}

      {/* Tab: Sales Campaigns */}
      {activeTab === 'sales' && <SalesCampaignManager />}

      {/* Tab: Design Studio */}
      {activeTab === 'design' && <DesignStudioManager />}

      {/* Tab: Pakistani Bank Accounts & Raast */}
      {activeTab === 'bank-payments' && <BankPaymentManager />}

      {/* Tab: Inventory */}
      {activeTab === 'inventory' && (
        <div className="bg-[#0e0e0e] border border-white/10 rounded-3xl overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#141414] text-slate-400 uppercase font-black tracking-wider text-[10px] border-b border-white/10">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Brand</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price (PKR)</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-slate-300">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-white/5">
                    <td className="p-4 flex items-center gap-3">
                      <img src={p.featuredImage} alt={p.title} className="w-10 h-10 rounded-xl object-cover bg-slate-800" />
                      <span className="font-bold text-white max-w-xs truncate uppercase">{p.title}</span>
                    </td>
                    <td className="p-4 font-semibold text-slate-300">{p.brand}</td>
                    <td className="p-4 capitalize">{p.category.replace('-', ' ')}</td>
                    <td className="p-4 font-mono font-black text-[#059669]">{formatPKR(p.price)}</td>
                    <td className="p-4 font-mono font-bold">{p.stockCount} units</td>
                    <td className="p-4">
                      <span className="bg-[#059669]/20 text-[#059669] border border-[#059669]/30 px-2 py-0.5 rounded-full font-black text-[9px] uppercase tracking-wider">
                        ACTIVE
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Edit Consignment Rider */}
      {editingOrderRider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={() => setEditingOrderRider(null)} />
          <div className="relative w-full max-w-md bg-[#0e0e0e] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/15 z-10 space-y-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-[#059669]/20 text-[#059669] font-black text-[9px] px-2.5 py-0.5 rounded-full border border-[#059669]/30 uppercase tracking-widest">
                <Truck className="w-3 h-3" />
                CONSIGNMENT RIDER DISPATCH
              </div>
              <h3 className="text-lg font-display font-black text-white uppercase italic tracking-tight">
                EDIT RIDER FOR {editingOrderRider.orderNumber}
              </h3>
              <p className="text-xs text-slate-400">
                Destination: {editingOrderRider.customer.city} ({editingOrderRider.customer.area})
              </p>
            </div>

            <form onSubmit={handleSaveOrderRider} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                  Rider Full Name
                </label>
                <input
                  type="text"
                  required
                  value={customRiderName}
                  onChange={e => setCustomRiderName(e.target.value)}
                  placeholder="e.g. Muhammad Tariq"
                  className="w-full bg-[#161616] border border-white/15 p-3 rounded-2xl text-white outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                  Rider Contact Number
                </label>
                <input
                  type="text"
                  required
                  value={customRiderPhone}
                  onChange={e => setCustomRiderPhone(e.target.value)}
                  placeholder="e.g. +92 321 4455667"
                  className="w-full bg-[#161616] border border-white/15 p-3 rounded-2xl text-white font-mono outline-none focus:border-[#059669]"
                />
              </div>

              <div className="bg-[#161616] border border-white/10 p-3 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block text-xs uppercase">
                    Customer Rider Phone Access
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {customRiderVisible ? 'Visible on order tracking' : 'Concealed / Redirect to hotline'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCustomRiderVisible(!customRiderVisible)}
                  className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
                    customRiderVisible ? 'bg-[#059669] justify-end' : 'bg-rose-600 justify-start'
                  }`}
                >
                  <div className="w-5 h-5 bg-white rounded-full shadow-xs" />
                </button>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingOrderRider(null)}
                  className="px-5 py-2.5 rounded-full text-slate-400 hover:text-white uppercase font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#059669] hover:bg-[#047857] text-white font-black px-6 py-2.5 rounded-full uppercase tracking-wider text-xs cursor-pointer shadow-md"
                >
                  Save Rider Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Product */}
      {isAddingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={() => setIsAddingProduct(false)} />
          <div className="relative w-full max-w-lg bg-[#080808] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 z-10 space-y-4">
            <h3 className="text-lg font-display font-black text-white uppercase italic tracking-tight">ADD NEW PRODUCT TO CATALOG</h3>
            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Sapphire Men's Summer Kurta"
                  className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white outline-none focus:border-[#059669]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">Price in PKR</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={e => setNewPrice(Number(e.target.value))}
                    className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white outline-none font-mono focus:border-[#059669]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    value={newBrand}
                    onChange={e => setNewBrand(e.target.value)}
                    className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddingProduct(false)}
                  className="px-5 py-2.5 rounded-full text-slate-400 hover:text-white uppercase font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#059669] hover:bg-[#047857] text-white font-black px-6 py-2.5 rounded-full uppercase tracking-wider text-xs cursor-pointer"
                >
                  Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
