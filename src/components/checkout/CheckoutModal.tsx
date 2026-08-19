import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  X, 
  CreditCard, 
  MapPin, 
  Lock,
  Building2,
  Copy,
  Check,
  Smartphone,
  ShieldCheck,
  Upload,
  MessageCircle,
  QrCode,
  Info
} from 'lucide-react';
import { 
  PAKISTAN_CITIES, 
  validatePakistaniPhone, 
  formatPKR 
} from '../../data/pakistanLocations';
import { ShippingAddress, PaymentMethod } from '../../types';
import confetti from 'canvas-confetti';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    appliedCoupon, 
    couponDiscount, 
    selectedCity, 
    setSelectedCity,
    createOrder,
    user,
    bankSettings,
    addToast
  } = useStore();

  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    province: selectedCity.province || 'Punjab',
    city: selectedCity.name || 'Lahore',
    area: user?.addresses[0]?.area || '',
    address: user?.addresses[0]?.address || '',
    postalCode: selectedCity.postalCode || '54000',
    orderNotes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [jazzcashNumber, setJazzcashNumber] = useState('');
  const [easypaisaNumber, setEasypaisaNumber] = useState('');
  
  // Bank Transfer states
  const activeBankAccounts = bankSettings.accounts.filter(acc => acc.isActive);
  const [selectedBankId, setSelectedBankId] = useState<string>(activeBankAccounts[0]?.id || 'meezan');
  const [bankTransactionId, setBankTransactionId] = useState('');
  const [senderAccountName, setSenderAccountName] = useState('');
  const [senderBankName, setSenderBankName] = useState('');
  const [proofFileName, setProofFileName] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isCheckoutOpen) return null;

  const currentSelectedBank = activeBankAccounts.find(b => b.id === selectedBankId) || activeBankAccounts[0];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    addToast('success', 'Copied to Clipboard', `${label}: ${text}`);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const freeShippingThreshold = 2999;
  const shippingFee = cartSubtotal >= freeShippingThreshold ? 0 : selectedCity.deliveryFee;
  const totalAmount = Math.max(0, cartSubtotal - couponDiscount + shippingFee);

  const handleCityChange = (cityName: string) => {
    const matchedCity = PAKISTAN_CITIES.find(c => c.name === cityName);
    if (matchedCity) {
      setSelectedCity(matchedCity);
      setFormData(prev => ({
        ...prev,
        city: matchedCity.name,
        province: matchedCity.province,
        postalCode: matchedCity.postalCode
      }));
    }
  };

  const handleProofFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofFileName(e.target.files[0].name);
      addToast('info', 'Receipt Attached', `${e.target.files[0].name} uploaded.`);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!validatePakistaniPhone(formData.phone)) errors.phone = 'Enter a valid Pakistani phone (e.g. 03001234567 or +92 300 1234567)';
    if (!formData.address.trim()) errors.address = 'Complete street/house address is required';
    if (!formData.area.trim()) errors.area = 'Area/Town/Sector is required';

    if (paymentMethod === 'jazzcash' && !validatePakistaniPhone(jazzcashNumber)) {
      errors.jazzcash = 'Valid 11-digit JazzCash mobile number is required';
    }
    if (paymentMethod === 'easypaisa' && !validatePakistaniPhone(easypaisaNumber)) {
      errors.easypaisa = 'Valid 11-digit Easypaisa mobile number is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate order placement
      await new Promise(resolve => setTimeout(resolve, 1200));

      const bankDetails = paymentMethod === 'bank_transfer' ? {
        bankId: currentSelectedBank?.id,
        bankName: currentSelectedBank?.bankName,
        accountTitle: currentSelectedBank?.accountTitle,
        iban: currentSelectedBank?.iban,
        transactionId: bankTransactionId.trim() || undefined,
        senderAccountName: senderAccountName.trim() || undefined,
        senderBankName: senderBankName.trim() || undefined,
        paymentProofUrl: proofFileName ? `proof-${proofFileName}` : undefined
      } : undefined;

      await createOrder(formData, paymentMethod, bankDetails);

      // Trigger Celebration Fireworks
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe fallback
      }

      setIsCheckoutOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={() => !isSubmitting && setIsCheckoutOpen(false)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-[#080808] text-white rounded-3xl shadow-2xl border border-white/10 overflow-hidden z-10 flex flex-col my-auto max-h-[94vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0e0e0e] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-[#059669] flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-black text-lg sm:text-xl uppercase tracking-tight text-white italic">
                PAKISTAN SECURE CHECKOUT
              </h2>
              <p className="text-[11px] font-mono text-slate-400">
                100% GUARANTEED CASH ON DELIVERY & ENCRYPTED DISPATCH
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            disabled={isSubmitting}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmitOrder} className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
          
          {/* Section 1: Customer Contact & Address */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#059669] border-b border-white/10 pb-2">
              <MapPin className="w-4 h-4" />
              <span>1. DELIVERY DESTINATION IN PAKISTAN</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  FULL RECIPIENT NAME *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Muhammad Farooq"
                  className={`w-full bg-[#121212] border ${formErrors.fullName ? 'border-rose-500' : 'border-white/15'} text-xs sm:text-sm text-white p-3 rounded-2xl outline-none focus:border-[#059669]`}
                />
                {formErrors.fullName && <p className="text-[10px] text-rose-400 mt-1">{formErrors.fullName}</p>}
              </div>

              {/* Phone Number with Pakistan prefix */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  MOBILE NUMBER (COURIER SMS & CALL) *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="03001234567 or +92 300 1234567"
                  className={`w-full bg-[#121212] border ${formErrors.phone ? 'border-rose-500' : 'border-white/15'} text-xs sm:text-sm text-white p-3 rounded-2xl outline-none font-mono focus:border-[#059669]`}
                />
                {formErrors.phone && <p className="text-[10px] text-rose-400 mt-1">{formErrors.phone}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  EMAIL ADDRESS (FOR INVOICE)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@gmail.com"
                  className="w-full bg-[#121212] border border-white/15 text-xs sm:text-sm text-white p-3 rounded-2xl outline-none focus:border-[#059669]"
                />
              </div>

              {/* City Selection */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  CITY (ESTIMATED DISPATCH) *
                </label>
                <select
                  value={formData.city}
                  onChange={e => handleCityChange(e.target.value)}
                  className="w-full bg-[#121212] border border-white/15 text-xs sm:text-sm text-white p-3 rounded-2xl outline-none focus:border-[#059669]"
                >
                  {PAKISTAN_CITIES.map(c => (
                    <option key={c.name} value={c.name} className="bg-[#121212] text-white">
                      {c.name} ({c.province}) — {c.estimatedDeliveryDays}
                    </option>
                  ))}
                </select>
              </div>

              {/* Area / Sector / Town */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  AREA / SECTOR / TOWN *
                </label>
                <input
                  type="text"
                  required
                  value={formData.area}
                  onChange={e => setFormData({ ...formData, area: e.target.value })}
                  placeholder="e.g. DHA Phase 6, Gulshan-e-Iqbal, F-10"
                  className={`w-full bg-[#121212] border ${formErrors.area ? 'border-rose-500' : 'border-white/15'} text-xs sm:text-sm text-white p-3 rounded-2xl outline-none focus:border-[#059669]`}
                />
                {formErrors.area && <p className="text-[10px] text-rose-400 mt-1">{formErrors.area}</p>}
              </div>

              {/* Postal Code */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  POSTAL CODE
                </label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder="e.g. 54000"
                  className="w-full bg-[#121212] border border-white/15 text-xs sm:text-sm text-white p-3 rounded-2xl outline-none font-mono focus:border-[#059669]"
                />
              </div>

              {/* Complete Street Address */}
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  COMPLETE STREET / HOUSE / BUILDING ADDRESS *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. House # 42, Street 8, Sector C, Near Jamia Masjid"
                  className={`w-full bg-[#121212] border ${formErrors.address ? 'border-rose-500' : 'border-white/15'} text-xs sm:text-sm text-white p-3 rounded-2xl outline-none focus:border-[#059669]`}
                />
                {formErrors.address && <p className="text-[10px] text-rose-400 mt-1">{formErrors.address}</p>}
              </div>

              {/* Order Notes */}
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  SPECIAL DELIVERY INSTRUCTIONS (OPTIONAL)
                </label>
                <input
                  type="text"
                  value={formData.orderNotes}
                  onChange={e => setFormData({ ...formData, orderNotes: e.target.value })}
                  placeholder="e.g. Leave package with guard / Call upon arrival"
                  className="w-full bg-[#121212] border border-white/15 text-xs text-white p-3 rounded-2xl outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Pakistan Payment Methods */}
          <div className="space-y-4 border-t border-white/10 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#059669]">
                <CreditCard className="w-4 h-4" />
                <span>2. SELECT PAYMENT METHOD (PAKISTAN)</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                0% EXTRA FEES
              </span>
            </div>

            {/* Payment Method Selector Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Option 1: Cash on Delivery */}
              <label
                className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[#059669] bg-[#059669]/15 ring-1 ring-[#059669]'
                    : 'border-white/10 bg-[#0e0e0e] hover:border-white/20'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 accent-[#059669]"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-white">
                      CASH ON DELIVERY (COD)
                    </span>
                    <span className="bg-[#059669] text-black text-[9px] font-black uppercase px-1.5 py-0.2 rounded">
                      POPULAR
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Pay cash to courier rider upon inspection at your doorstep.
                  </p>
                </div>
              </label>

              {/* Option 2: JazzCash */}
              <label
                className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all ${
                  paymentMethod === 'jazzcash'
                    ? 'border-rose-500 bg-rose-500/15 ring-1 ring-rose-500'
                    : 'border-white/10 bg-[#0e0e0e] hover:border-white/20'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'jazzcash'}
                  onChange={() => setPaymentMethod('jazzcash')}
                  className="mt-1 accent-rose-500"
                />
                <div className="space-y-1">
                  <span className="font-bold text-xs uppercase tracking-wider text-white block">
                    JAZZCASH MOBILE WALLET
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Instant MPIN / OTP prompt on your Jazz mobile account.
                  </p>
                </div>
              </label>

              {/* Option 3: Easypaisa */}
              <label
                className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all ${
                  paymentMethod === 'easypaisa'
                    ? 'border-[#059669] bg-[#059669]/15 ring-1 ring-[#059669]'
                    : 'border-white/10 bg-[#0e0e0e] hover:border-white/20'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'easypaisa'}
                  onChange={() => setPaymentMethod('easypaisa')}
                  className="mt-1 accent-[#059669]"
                />
                <div className="space-y-1">
                  <span className="font-bold text-xs uppercase tracking-wider text-white block">
                    EASYPAISA ACCOUNT / QR
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Pay securely using Telenor Easypaisa in-app approval.
                  </p>
                </div>
              </label>

              {/* Option 4: Bank Transfer / Raast ID */}
              <label
                className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-teal-500 bg-teal-500/15 ring-1 ring-teal-500'
                    : 'border-white/10 bg-[#0e0e0e] hover:border-white/20'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={() => setPaymentMethod('bank_transfer')}
                  className="mt-1 accent-teal-500"
                />
                <div className="space-y-1">
                  <span className="font-bold text-xs uppercase tracking-wider text-white block">
                    1LINK RAAST / IBAN TRANSFER
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Meezan / HBL / SCB instant transfer.
                  </p>
                </div>
              </label>

            </div>

            {/* Sub-inputs for Selected Method */}
            {paymentMethod === 'jazzcash' && (
              <div className="p-4 bg-rose-500/10 rounded-2xl border border-rose-500/30 space-y-2">
                <label className="block text-[11px] font-bold uppercase text-white">
                  JAZZCASH ACCOUNT MOBILE NUMBER:
                </label>
                <input
                  type="tel"
                  value={jazzcashNumber}
                  onChange={e => setJazzcashNumber(e.target.value)}
                  placeholder="03001234567"
                  className="w-full bg-[#121212] border border-white/20 text-xs sm:text-sm text-white p-3 rounded-2xl outline-none font-mono"
                />
                <p className="text-[10px] text-slate-400">
                  You will receive a USSD flash popup or SMS prompt on your phone to enter your 4-digit MPIN.
                </p>
              </div>
            )}

            {paymentMethod === 'easypaisa' && (
              <div className="p-4 bg-[#059669]/10 rounded-2xl border border-[#059669]/30 space-y-2">
                <label className="block text-[11px] font-bold uppercase text-white">
                  EASYPAISA ACCOUNT MOBILE NUMBER:
                </label>
                <input
                  type="tel"
                  value={easypaisaNumber}
                  onChange={e => setEasypaisaNumber(e.target.value)}
                  placeholder="03451234567"
                  className="w-full bg-[#121212] border border-white/20 text-xs sm:text-sm text-white p-3 rounded-2xl outline-none font-mono"
                />
                <p className="text-[10px] text-slate-400">
                  Approve the payment request in your Easypaisa app or enter your 5-digit PIN.
                </p>
              </div>
            )}

            {paymentMethod === 'bank_transfer' && (
              <div className="p-4 sm:p-5 bg-teal-950/20 rounded-2xl border border-teal-500/30 space-y-4 text-xs">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-500/20 pb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-teal-400" />
                    <span className="font-bold text-white uppercase tracking-wider">
                      SELECT VERIFIED PAKISTANI BANK / RAAST
                    </span>
                  </div>
                  <span className="text-[10px] text-teal-400/80 font-mono flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 1LINK & SBP Raast 24/7
                  </span>
                </div>

                {/* Bank Accounts Switcher Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {activeBankAccounts.map(account => (
                    <button
                      key={account.id}
                      type="button"
                      onClick={() => setSelectedBankId(account.id)}
                      className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        selectedBankId === account.id
                          ? 'border-teal-400 bg-teal-500/20 ring-1 ring-teal-400 shadow-md shadow-teal-500/10'
                          : 'border-white/10 bg-[#121212] hover:border-white/20'
                      }`}
                    >
                      <span className="font-black text-[11px] text-white truncate block">
                        {account.shortName}
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono mt-1 flex items-center justify-between">
                        <span>{account.branchCode}</span>
                        {account.isPopular && (
                          <span className="text-[8px] bg-teal-400/20 text-teal-300 font-bold px-1 rounded">
                            FAST
                          </span>
                        )}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Selected Bank Account Full Details Box */}
                {currentSelectedBank && (
                  <div className="bg-[#0e0e0e] border border-teal-500/30 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
                        <span className="font-black text-sm text-white uppercase tracking-tight">
                          {currentSelectedBank.bankName}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-teal-400 bg-teal-400/10 px-2 py-0.5 rounded-full border border-teal-400/20">
                        VERIFIED CORPORATE
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {/* Account Title */}
                      <div className="bg-[#161616] p-2.5 rounded-xl border border-white/5 flex items-center justify-between">
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase">Account Title</p>
                          <p className="text-[11px] font-bold text-white">{currentSelectedBank.accountTitle}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(currentSelectedBank.accountTitle, 'Account Title')}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Copy Account Title"
                        >
                          {copiedField === 'Account Title' ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Account Number */}
                      <div className="bg-[#161616] p-2.5 rounded-xl border border-white/5 flex items-center justify-between">
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase">Account Number</p>
                          <p className="text-[11px] font-mono font-bold text-teal-300">{currentSelectedBank.accountNumber}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(currentSelectedBank.accountNumber, 'Account Number')}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Copy Account Number"
                        >
                          {copiedField === 'Account Number' ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* IBAN Number */}
                      <div className="sm:col-span-2 bg-[#161616] p-2.5 rounded-xl border border-white/5 flex items-center justify-between">
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase">IBAN (International Bank Account Number)</p>
                          <p className="text-xs font-mono font-black text-white tracking-wider">{currentSelectedBank.iban}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(currentSelectedBank.iban, 'IBAN')}
                          className="p-1.5 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 hover:text-white transition-colors flex items-center gap-1 text-[10px] font-bold px-2 cursor-pointer"
                          title="Copy IBAN"
                        >
                          {copiedField === 'IBAN' ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-teal-400" />
                              <span>COPIED!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>COPY IBAN</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Raast ID & Branch */}
                      {currentSelectedBank.raastId && (
                        <div className="bg-[#161616] p-2.5 rounded-xl border border-white/5 flex items-center justify-between">
                          <div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase">Raast Instant ID</p>
                            <p className="text-[11px] font-mono font-bold text-emerald-400">{currentSelectedBank.raastId}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy(currentSelectedBank.raastId!, 'Raast ID')}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title="Copy Raast ID"
                          >
                            {copiedField === 'Raast ID' ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      )}

                      <div className="bg-[#161616] p-2.5 rounded-xl border border-white/5">
                        <p className="text-[9px] font-bold text-slate-400 uppercase">Branch & Location</p>
                        <p className="text-[10px] text-slate-300 truncate">{currentSelectedBank.branchName}</p>
                      </div>
                    </div>

                    {currentSelectedBank.notes && (
                      <p className="text-[10px] text-teal-400/90 font-mono flex items-center gap-1.5 bg-teal-500/10 p-2 rounded-lg">
                        <Info className="w-3.5 h-3.5 shrink-0" />
                        <span>{currentSelectedBank.notes}</span>
                      </p>
                    )}
                  </div>
                )}

                {/* Transfer Verification Fields (Optional / Customer Confidence) */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                    PAYMENT PROOF / TRANSACTION REFERENCE (OPTIONAL):
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={bankTransactionId}
                      onChange={e => setBankTransactionId(e.target.value)}
                      placeholder="Transaction Reference / TID (e.g. 9821804)"
                      className="bg-[#121212] border border-white/15 text-xs text-white p-2.5 rounded-xl outline-none font-mono focus:border-teal-400"
                    />
                    <input
                      type="text"
                      value={senderAccountName}
                      onChange={e => setSenderAccountName(e.target.value)}
                      placeholder="Sender Account Name (e.g. Ali Raza)"
                      className="bg-[#121212] border border-white/15 text-xs text-white p-2.5 rounded-xl outline-none focus:border-teal-400"
                    />
                  </div>

                  {/* Upload receipt proof screenshot */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-2.5 bg-[#121212] border border-dashed border-white/20 rounded-xl">
                    <div className="flex items-center gap-2 text-[11px] text-slate-300">
                      <Upload className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>{proofFileName ? `Attached: ${proofFileName}` : 'Attach Receipt Screenshot (Optional)'}</span>
                    </div>
                    <label className="bg-white/10 hover:bg-white/20 text-white font-bold text-[10px] uppercase px-3 py-1.5 rounded-lg cursor-pointer transition-colors shrink-0">
                      <span>{proofFileName ? 'Change File' : 'Browse Receipt'}</span>
                      <input 
                        type="file" 
                        accept="image/*,.pdf" 
                        onChange={handleProofFileUpload} 
                        className="hidden" 
                      />
                    </label>
                  </div>

                  {/* Direct WhatsApp Verification Shortcut */}
                  <div className="flex items-center justify-between pt-1">
                    <a
                      href={`https://wa.me/923008451992?text=As-salamu+alaykum+AuraPK.+I+am+transferring+PKR+${totalAmount}+via+Bank+Transfer+(${currentSelectedBank?.shortName || 'Direct+Deposit'}).`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Need help? WhatsApp Finance Desk (+92 300 8451992)</span>
                    </a>
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Section 3: Order Breakdown & Final Action */}
          <div className="border-t border-white/10 pt-6 space-y-4">
            <div className="bg-[#121212] border border-white/10 p-4 rounded-2xl space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span className="uppercase font-bold tracking-wider">ITEMS SUBTOTAL ({cart.length} ITEMS)</span>
                <span className="font-mono font-bold text-white">{formatPKR(cartSubtotal)}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-[#059669] font-bold">
                  <span className="uppercase tracking-wider">COUPON DISCOUNT ({appliedCoupon?.code})</span>
                  <span className="font-mono">-{formatPKR(couponDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-400">
                <span className="uppercase font-bold tracking-wider">DOORSTEP COURIER ({selectedCity.name.toUpperCase()})</span>
                <span className="font-mono font-bold">
                  {shippingFee === 0 ? <span className="text-[#059669] uppercase font-black">FREE</span> : <span className="text-white">{formatPKR(shippingFee)}</span>}
                </span>
              </div>

              <div className="flex justify-between text-sm font-black text-white pt-3 border-t border-white/10 uppercase tracking-tight">
                <span>FINAL PAYABLE AMOUNT</span>
                <span className="text-[#059669] font-mono text-lg">
                  {formatPKR(totalAmount)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#059669] hover:bg-[#047857] disabled:bg-slate-700 text-white font-black text-xs sm:text-sm uppercase tracking-widest py-4 rounded-full shadow-2xl flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>CONFIRMING ORDER WITH COURIER...</span>
                </div>
              ) : (
                <span>
                  CONFIRM & PLACE ORDER ({formatPKR(totalAmount)}) 🇵🇰
                </span>
              )}
            </button>

            <p className="text-[10px] text-center text-slate-500 font-mono">
              BY CONFIRMING, YOU AGREE TO AURAPK’S 7-DAY DOORSTEP REPLACEMENT GUARANTEE.
            </p>
          </div>

        </form>

      </div>

    </div>
  );
};
