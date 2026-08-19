import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Ticket, 
  Plus, 
  Copy, 
  Check, 
  Trash2, 
  Edit3, 
  Power, 
  PowerOff, 
  Sparkles, 
  Tag, 
  Share2, 
  Calendar, 
  DollarSign, 
  Eye, 
  EyeOff, 
  AlertCircle,
  Clock,
  Flame,
  Send
} from 'lucide-react';
import { formatPKR } from '../../data/pakistanLocations';
import { Coupon } from '../../types';

export const CouponsManager: React.FC = () => {
  const { 
    coupons, 
    addCoupon, 
    updateCoupon, 
    deleteCoupon, 
    toggleCouponStatus, 
    giveCouponToUser,
    addToast 
  } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCouponCode, setEditingCouponCode] = useState<string | null>(null);

  // Form state
  const [formCode, setFormCode] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formDiscountType, setFormDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [formDiscountValue, setFormDiscountValue] = useState<number>(15);
  const [formMinSpend, setFormMinSpend] = useState<number>(2500);
  const [formExpiryDate, setFormExpiryDate] = useState('2026-12-31');
  const [formUsageLimit, setFormUsageLimit] = useState<number>(500);
  const [formIsActive, setFormIsActive] = useState(true);
  const [formIsPublic, setFormIsPublic] = useState(true);

  // Quick recipient input for "Give Coupon"
  const [recipientNumber, setRecipientNumber] = useState('');
  const [selectedCouponToGive, setSelectedCouponToGive] = useState<Coupon | null>(null);

  // Copied code feedback
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    addToast('success', 'Voucher Copied!', `Code ${code} copied to clipboard.`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const openCreateModal = () => {
    setEditingCouponCode(null);
    setFormCode('');
    setFormDescription('Exclusive promotional discount code for Pakistani shoppers.');
    setFormDiscountType('percentage');
    setFormDiscountValue(15);
    setFormMinSpend(2500);
    setFormExpiryDate('2026-12-31');
    setFormUsageLimit(500);
    setFormIsActive(true);
    setFormIsPublic(true);
    setIsModalOpen(true);
  };

  const openEditModal = (coupon: Coupon) => {
    setEditingCouponCode(coupon.code);
    setFormCode(coupon.code);
    setFormDescription(coupon.description);
    setFormDiscountType(coupon.discountType);
    setFormDiscountValue(coupon.discountValue);
    setFormMinSpend(coupon.minSpend);
    setFormExpiryDate(coupon.expiryDate);
    setFormUsageLimit(coupon.usageLimit || 500);
    setFormIsActive(coupon.isActive !== false);
    setFormIsPublic(coupon.isPublic !== false);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCode.trim()) {
      addToast('error', 'Error', 'Please enter a coupon code.');
      return;
    }

    const couponData: Coupon = {
      code: formCode.trim().toUpperCase(),
      description: formDescription.trim(),
      discountType: formDiscountType,
      discountValue: Number(formDiscountValue),
      minSpend: Number(formMinSpend),
      expiryDate: formExpiryDate,
      usageLimit: Number(formUsageLimit),
      isActive: formIsActive,
      isPublic: formIsPublic,
      timesUsed: editingCouponCode ? coupons.find(c => c.code === editingCouponCode)?.timesUsed || 0 : 0
    };

    if (editingCouponCode) {
      updateCoupon(editingCouponCode, couponData);
      setIsModalOpen(false);
    } else {
      const success = addCoupon(couponData);
      if (success) {
        setIsModalOpen(false);
      }
    }
  };

  const applyPresetTemplate = (preset: {
    code: string;
    description: string;
    type: 'percentage' | 'fixed';
    value: number;
    minSpend: number;
    days: number;
  }) => {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + preset.days);
    const expStr = expiry.toISOString().split('T')[0];

    addCoupon({
      code: preset.code,
      description: preset.description,
      discountType: preset.type,
      discountValue: preset.value,
      minSpend: preset.minSpend,
      expiryDate: expStr,
      usageLimit: 1000,
      isActive: true,
      isPublic: true,
      timesUsed: 0
    });
  };

  const totalUsed = coupons.reduce((sum, c) => sum + (c.timesUsed || 0), 0);
  const activeCouponsCount = coupons.filter(c => c.isActive !== false).length;

  return (
    <div id="coupons-manager-section" className="space-y-6">
      
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0e0e0e] border border-white/10 p-6 rounded-3xl shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Ticket className="w-5 h-5 text-[#059669]" />
            <h2 className="text-xl font-display font-black text-white uppercase italic tracking-tight">
              COUPONS & PROMO VOUCHERS
            </h2>
            <span className="bg-[#059669]/20 border border-[#059669]/40 text-[#059669] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {activeCouponsCount} ACTIVE
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Create, issue, and pause checkout discount vouchers. Easily distribute via WhatsApp or SMS to customers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openCreateModal}
            className="bg-[#059669] hover:bg-[#047857] text-white text-xs font-black uppercase tracking-wider px-5 py-3 rounded-full flex items-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>CREATE NEW COUPON</span>
          </button>
        </div>
      </div>

      {/* Stats and Preset Templates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0c0c0c] border border-white/10 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400 font-black uppercase tracking-wider">TOTAL REDEMPTIONS</div>
            <div className="text-2xl font-mono font-black text-white mt-1">{totalUsed} VOUCHERS</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Flame className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0c0c0c] border border-white/10 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400 font-black uppercase tracking-wider">ACTIVE STORE CODES</div>
            <div className="text-2xl font-mono font-black text-[#059669] mt-1">{activeCouponsCount} OF {coupons.length}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-[#059669]">
            <Tag className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0c0c0c] border border-white/10 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400 font-black uppercase tracking-wider">DEFAULT PUBLIC CODE</div>
            <div className="text-lg font-mono font-black text-white mt-1">WELCOMEPK (15% OFF)</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-600/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Preset Pakistan Promotion Templates */}
      <div className="bg-[#0e0e0e] border border-white/10 p-5 rounded-3xl">
        <div className="text-xs font-black text-slate-300 uppercase tracking-widest mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#059669]" />
          <span>ONE-CLICK POPULAR PAKISTAN CAMPAIGN PRESETS</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => applyPresetTemplate({
              code: 'AZADI2026',
              description: 'Mega Pakistan Independence Day 25% Off Celebration',
              type: 'percentage',
              value: 25,
              minSpend: 3000,
              days: 14
            })}
            className="text-left bg-[#141414] hover:bg-[#1a1a1a] border border-white/10 hover:border-[#059669]/50 p-3.5 rounded-2xl transition-all group cursor-pointer"
          >
            <div className="text-xs font-mono font-black text-[#059669] flex items-center justify-between">
              <span>🇵🇰 AZADI2026</span>
              <span className="text-[10px] bg-emerald-950/80 px-1.5 py-0.5 rounded">25% OFF</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Min Spend: ₨ 3,000</div>
          </button>

          <button
            onClick={() => applyPresetTemplate({
              code: 'EIDMUBARAK',
              description: 'Eid Festive Shopping ₨ 750 Flat Cash Voucher',
              type: 'fixed',
              value: 750,
              minSpend: 4000,
              days: 30
            })}
            className="text-left bg-[#141414] hover:bg-[#1a1a1a] border border-white/10 hover:border-amber-500/50 p-3.5 rounded-2xl transition-all group cursor-pointer"
          >
            <div className="text-xs font-mono font-black text-amber-400 flex items-center justify-between">
              <span>🌙 EIDMUBARAK</span>
              <span className="text-[10px] bg-amber-950/80 px-1.5 py-0.5 rounded">₨ 750 OFF</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Min Spend: ₨ 4,000</div>
          </button>

          <button
            onClick={() => applyPresetTemplate({
              code: 'FREESHIPPK',
              description: 'Free Nationwide TCS Doorstep Express Delivery',
              type: 'fixed',
              value: 250,
              minSpend: 1500,
              days: 60
            })}
            className="text-left bg-[#141414] hover:bg-[#1a1a1a] border border-white/10 hover:border-blue-500/50 p-3.5 rounded-2xl transition-all group cursor-pointer"
          >
            <div className="text-xs font-mono font-black text-blue-400 flex items-center justify-between">
              <span>🚚 FREESHIPPK</span>
              <span className="text-[10px] bg-blue-950/80 px-1.5 py-0.5 rounded">₨ 250 OFF</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Min Spend: ₨ 1,500</div>
          </button>

          <button
            onClick={() => applyPresetTemplate({
              code: 'VIPKARACHI',
              description: 'Karachi Central VIP Shopper 20% Instant Discount',
              type: 'percentage',
              value: 20,
              minSpend: 5000,
              days: 45
            })}
            className="text-left bg-[#141414] hover:bg-[#1a1a1a] border border-white/10 hover:border-purple-500/50 p-3.5 rounded-2xl transition-all group cursor-pointer"
          >
            <div className="text-xs font-mono font-black text-purple-400 flex items-center justify-between">
              <span>👑 VIPKARACHI</span>
              <span className="text-[10px] bg-purple-950/80 px-1.5 py-0.5 rounded">20% OFF</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Min Spend: ₨ 5,000</div>
          </button>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-[#0e0e0e] border border-white/10 rounded-3xl overflow-hidden shadow-md">
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <span className="text-xs font-black text-white uppercase tracking-wider">ALL STORE COUPONS ({coupons.length})</span>
          <span className="text-[11px] text-slate-400 font-mono">Tip: Click 'Give' or 'Copy' to send to customers</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#141414] text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-white/10">
              <tr>
                <th className="p-4">CODE</th>
                <th className="p-4">DISCOUNT</th>
                <th className="p-4">MIN SPEND</th>
                <th className="p-4">STATUS</th>
                <th className="p-4">USAGE</th>
                <th className="p-4">EXPIRY</th>
                <th className="p-4">VISIBILITY</th>
                <th className="p-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {coupons.map(coupon => {
                const isActive = coupon.isActive !== false;
                const isExpired = coupon.expiryDate ? new Date(coupon.expiryDate) < new Date() : false;

                return (
                  <tr key={coupon.code} className="hover:bg-white/5 transition-colors">
                    
                    {/* Code */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-sm text-white bg-[#181818] border border-white/15 px-2.5 py-1 rounded-lg">
                          {coupon.code}
                        </span>
                        <button
                          onClick={() => handleCopy(coupon.code)}
                          title="Copy Code"
                          className="p-1 text-slate-400 hover:text-[#059669] transition-colors"
                        >
                          {copiedCode === coupon.code ? (
                            <Check className="w-3.5 h-3.5 text-[#059669]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 max-w-xs truncate">
                        {coupon.description}
                      </div>
                    </td>

                    {/* Discount Value */}
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 font-mono font-black px-2.5 py-1 rounded-full text-xs ${
                        coupon.discountType === 'percentage' 
                          ? 'bg-[#059669]/20 text-[#059669] border border-[#059669]/30' 
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {coupon.discountType === 'percentage' ? `${coupon.discountValue}% OFF` : `₨ ${coupon.discountValue} OFF`}
                      </span>
                    </td>

                    {/* Min Spend */}
                    <td className="p-4 font-mono text-slate-300 font-bold">
                      {formatPKR(coupon.minSpend)}
                    </td>

                    {/* Status Active/Paused */}
                    <td className="p-4">
                      <button
                        onClick={() => toggleCouponStatus(coupon.code)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                          isActive && !isExpired
                            ? 'bg-[#059669] text-black hover:bg-[#047857] hover:text-white'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30'
                        }`}
                        title="Click to toggle status"
                      >
                        {isActive && !isExpired ? (
                          <>
                            <Power className="w-3 h-3" />
                            <span>ACTIVE</span>
                          </>
                        ) : (
                          <>
                            <PowerOff className="w-3 h-3" />
                            <span>{isExpired ? 'EXPIRED' : 'PAUSED'}</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Usage Count */}
                    <td className="p-4 font-mono text-slate-300">
                      <div>{coupon.timesUsed || 0} / {coupon.usageLimit || '∞'}</div>
                      <div className="w-20 bg-white/10 h-1.5 rounded-full overflow-hidden mt-1">
                        <div 
                          className="bg-[#059669] h-full"
                          style={{ 
                            width: `${Math.min(100, (((coupon.timesUsed || 0) / (coupon.usageLimit || 100)) * 100))}%` 
                          }}
                        />
                      </div>
                    </td>

                    {/* Expiry */}
                    <td className="p-4 font-mono text-slate-300">
                      <span className={isExpired ? 'text-rose-400 font-bold' : ''}>
                        {coupon.expiryDate || 'No limit'}
                      </span>
                    </td>

                    {/* Visibility */}
                    <td className="p-4">
                      {coupon.isPublic !== false ? (
                        <span className="text-[10px] text-[#059669] font-bold flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          PUBLIC
                        </span>
                      ) : (
                        <span className="text-[10px] text-purple-400 font-bold flex items-center gap-1">
                          <EyeOff className="w-3 h-3" />
                          PRIVATE / VIP
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setSelectedCouponToGive(coupon);
                        }}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full transition-all cursor-pointer inline-flex items-center gap-1"
                        title="Give this voucher to customer / WhatsApp"
                      >
                        <Share2 className="w-3 h-3" />
                        <span>GIVE</span>
                      </button>

                      <button
                        onClick={() => openEditModal(coupon)}
                        className="p-1.5 bg-[#181818] hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Edit Coupon"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete coupon ${coupon.code}?`)) {
                            deleteCoupon(coupon.code);
                          }
                        }}
                        className="p-1.5 bg-[#181818] hover:bg-rose-950/40 rounded-lg text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Delete Coupon"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create or Edit Coupon */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-[#080808] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 z-10 space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-display font-black text-white uppercase italic tracking-tight">
                {editingCouponCode ? `EDIT COUPON ${editingCouponCode}` : 'CREATE NEW DISCOUNT COUPON'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                  COUPON CODE (UPPERCASE) *
                </label>
                <input
                  type="text"
                  required
                  value={formCode}
                  onChange={e => setFormCode(e.target.value.toUpperCase())}
                  placeholder="e.g. AZADI500, EIDSALE, WELCOME20"
                  className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white font-mono font-bold uppercase outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                  DESCRIPTION / CAMPAIGN TITLE
                </label>
                <input
                  type="text"
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  placeholder="e.g. 15% Off Summer Lawn and Pure Attars"
                  className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white outline-none focus:border-[#059669]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                    DISCOUNT TYPE
                  </label>
                  <select
                    value={formDiscountType}
                    onChange={e => setFormDiscountType(e.target.value as 'percentage' | 'fixed')}
                    className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white outline-none focus:border-[#059669]"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Flat PKR (₨)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                    DISCOUNT VALUE {formDiscountType === 'percentage' ? '(%)' : '(PKR ₨)'} *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={formDiscountType === 'percentage' ? 95 : 50000}
                    value={formDiscountValue}
                    onChange={e => setFormDiscountValue(Number(e.target.value))}
                    className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white font-mono outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                    MINIMUM ORDER SPEND (PKR) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formMinSpend}
                    onChange={e => setFormMinSpend(Number(e.target.value))}
                    className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white font-mono outline-none focus:border-[#059669]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                    EXPIRY DATE
                  </label>
                  <input
                    type="date"
                    value={formExpiryDate}
                    onChange={e => setFormExpiryDate(e.target.value)}
                    className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white font-mono outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                    MAX TOTAL USAGE LIMIT
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formUsageLimit}
                    onChange={e => setFormUsageLimit(Number(e.target.value))}
                    className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white font-mono outline-none focus:border-[#059669]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                    VISIBILITY
                  </label>
                  <select
                    value={formIsPublic ? 'public' : 'private'}
                    onChange={e => setFormIsPublic(e.target.value === 'public')}
                    className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white outline-none focus:border-[#059669]"
                  >
                    <option value="public">Public (Shown in Banners & Promos)</option>
                    <option value="private">Private / VIP (Direct link only)</option>
                  </select>
                </div>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center justify-between p-3.5 bg-[#141414] border border-white/10 rounded-2xl">
                <div>
                  <div className="font-bold text-white uppercase tracking-wider">ACTIVE AND REDEEMABLE</div>
                  <div className="text-[10px] text-slate-400">Allow shoppers to redeem this code immediately at checkout</div>
                </div>
                <button
                  type="button"
                  onClick={() => setFormIsActive(!formIsActive)}
                  className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
                    formIsActive ? 'bg-[#059669] justify-end' : 'bg-zinc-700 justify-start'
                  }`}
                >
                  <div className="w-5 h-5 bg-white rounded-full shadow-xs" />
                </button>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-slate-400 hover:text-white uppercase font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#059669] hover:bg-[#047857] text-white font-black px-6 py-2.5 rounded-full uppercase tracking-wider text-xs cursor-pointer shadow-lg"
                >
                  {editingCouponCode ? 'Save Changes' : 'Publish Coupon'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Modal: Give Coupon to User / Direct Dispatch */}
      {selectedCouponToGive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={() => setSelectedCouponToGive(null)} />
          <div className="relative w-full max-w-md bg-[#080808] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-500/30 z-10 space-y-4">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-purple-400">
                <Send className="w-5 h-5" />
                <h3 className="text-base font-display font-black text-white uppercase italic tracking-tight">
                  GIVE VOUCHER TO CUSTOMER
                </h3>
              </div>
              <button 
                onClick={() => setSelectedCouponToGive(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#121212] border border-white/10 p-4 rounded-2xl text-center space-y-2">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">DISCOUNT VOUCHER</span>
              <div className="text-2xl font-mono font-black text-[#059669] tracking-widest">
                {selectedCouponToGive.code}
              </div>
              <div className="text-xs text-white font-bold">
                {selectedCouponToGive.discountType === 'percentage' 
                  ? `${selectedCouponToGive.discountValue}% OFF Storewide` 
                  : `₨ ${selectedCouponToGive.discountValue} Flat Discount`}
              </div>
              <div className="text-[11px] text-slate-400">
                Min Spend: ₨ {selectedCouponToGive.minSpend.toLocaleString()} • Valid till {selectedCouponToGive.expiryDate}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  giveCouponToUser(selectedCouponToGive.code);
                  setSelectedCouponToGive(null);
                }}
                className="w-full bg-[#059669] hover:bg-[#047857] text-white font-black text-xs uppercase tracking-wider py-3.5 rounded-full flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                <span>COPY CODE & ANNOUNCE TOAST</span>
              </button>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `🎉 Exclusive Gift from AuraPK! Use Coupon Code *${selectedCouponToGive.code}* at checkout to get ${
                    selectedCouponToGive.discountType === 'percentage'
                      ? `${selectedCouponToGive.discountValue}% OFF`
                      : `₨ ${selectedCouponToGive.discountValue} OFF`
                  } on your order! Shop now at https://aurapk.com`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-black font-black text-xs uppercase tracking-wider py-3.5 rounded-full flex items-center justify-center gap-2 shadow-lg transition-all text-center block"
              >
                <Share2 className="w-4 h-4 text-black" />
                <span>SHARE DIRECTLY VIA WHATSAPP</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
