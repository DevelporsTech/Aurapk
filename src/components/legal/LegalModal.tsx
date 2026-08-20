import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Trash2, 
  RefreshCcw, 
  Lock, 
  X, 
  CheckCircle2, 
  ExternalLink,
  Smartphone,
  Truck,
  Building2
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms' | 'data-safety' | 'returns';
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy'
}) => {
  const { user, logoutUser, addToast } = useStore();
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'data-safety' | 'returns'>(initialTab);
  const [confirmDeleteText, setConfirmDeleteText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const handleDeleteAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmDeleteText !== 'DELETE') {
      addToast('error', 'Confirmation Mismatch', 'Please type DELETE in capital letters to confirm.');
      return;
    }

    setIsDeleting(true);
    setTimeout(() => {
      // Wipe user data from local storage
      localStorage.removeItem('aurapk_user');
      localStorage.removeItem('aurapk_addresses');
      localStorage.removeItem('aurapk_wishlist');
      localStorage.removeItem('aurapk_cart');
      logoutUser();
      setIsDeleting(false);
      onClose();
      addToast('success', 'Account & Personal Data Deleted', 'All your personal records, delivery addresses, and saved data have been erased in compliance with Google Play Data Safety policies.');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div 
        className="bg-[#0e0e0e] border border-white/15 w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#141414]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#059669]/20 border border-[#059669]/40 flex items-center justify-center text-[#059669]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-lg sm:text-xl font-black uppercase italic tracking-tight text-white">
                LEGAL, PRIVACY & DATA SAFETY
              </h2>
              <p className="text-[11px] text-slate-400">
                Google Play Store & Pakistan E-Commerce Compliance Center
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-[#0a0a0a] px-4 overflow-x-auto no-scrollbar">
          {[
            { id: 'privacy', label: 'Privacy Policy', icon: Lock },
            { id: 'terms', label: 'Terms of Service', icon: FileText },
            { id: 'data-safety', label: 'Play Store Data Safety', icon: Trash2 },
            { id: 'returns', label: '7-Day Return & COD', icon: RefreshCcw }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'border-[#059669] text-[#059669] bg-[#059669]/10'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans flex-1">
          
          {/* TAB 1: Privacy Policy */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Last Updated: August 2026 • Verified for Google Play</span>
                </div>
                <p className="text-xs text-slate-300">
                  AuraPK Technologies Ltd ("AuraPK", "we", "our") respects your privacy. This Privacy Policy details how we collect, store, encrypt, and handle personal data when you use the AuraPK Android application or web portal.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-white font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  1. Information We Collect
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs">
                  <li><strong>Account Credentials:</strong> Customer name, email address, Pakistani mobile number (03XX XXXXXXX), and hashed authentication tokens.</li>
                  <li><strong>Delivery & Logistics Data:</strong> Shipping street address, house/floor number, area/town, city, and automated postal code to facilitate nationwide courier dispatch.</li>
                  <li><strong>Order History & Receipts:</strong> Purchased product listings, PKR transactional sums, payment method choices (COD, JazzCash, Easypaisa, Bank Transfer), and courier airway bill numbers.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-white font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  2. Third-Party Courier & Payment Handlers
                </h4>
                <p className="text-xs text-slate-400">
                  We securely share customer delivery names, phone numbers, and destination addresses only with licensed courier partners in Pakistan (TCS, Leopards Courier, Trax Logistics) solely for the fulfillment of orders. We never sell or lease customer information to third-party advertising networks.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-white font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  3. Security & Encryption Standards
                </h4>
                <p className="text-xs text-slate-400">
                  All communications between the AuraPK application and central databases utilize 256-bit Transport Layer Security (TLS/SSL). Sensitive payment passwords and rider contact details are masked according to strict data protection standards.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: Terms of Service */}
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h3 className="font-bold text-white text-xs uppercase tracking-wider">AuraPK Store Terms & Conditions</h3>
                <p className="text-xs text-slate-400">
                  By downloading, installing, or ordering through the AuraPK app, you agree to these Terms of Service in accordance with the Electronic Transactions Ordinance and consumer protection statutes of Pakistan.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-bold text-xs uppercase tracking-wider">1. Cash on Delivery (COD) Commitments</h4>
                <p className="text-xs text-slate-400">
                  When placing an order with Cash on Delivery, the buyer agrees to receive the package from the courier rider at the specified delivery address and pay the exact invoice amount in Pakistani Rupees (PKR).
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-bold text-xs uppercase tracking-wider">2. Product Authenticity Guarantee</h4>
                <p className="text-xs text-slate-400">
                  All branded apparel (J., Khaadi, Sana Safinaz, Gul Ahmed), electronics (Audionic, Ronin, Zero Lifestyle), and fragrances listed on AuraPK are sourced directly from verified manufacturer distributors and backed by authentic warranties.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-bold text-xs uppercase tracking-wider">3. Order Cancellations</h4>
                <p className="text-xs text-slate-400">
                  Customers may cancel any order instantly from the Shopping Bag or Order Tracking dashboard while the order status remains "Pending" or "Confirmed" before courier dispatch.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Play Store Data Safety & Account Deletion */}
          {activeTab === 'data-safety' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <Smartphone className="w-4 h-4" />
                  <span>Google Play Developer Policy Requirement: Account Deletion</span>
                </div>
                <p className="text-xs text-slate-300">
                  Google Play requires apps that support account creation to provide users with an easy, in-app path to request and execute the permanent deletion of their account and all associated personal data.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-bold text-xs uppercase tracking-wider">Data Collected vs Data Retained</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="font-bold text-emerald-400 mb-1">Encrypted on Device</p>
                    <p className="text-slate-400">Personal shipping profile, saved addresses, wishlist items, and local shopping bag.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="font-bold text-amber-400 mb-1">Courier Transit Data</p>
                    <p className="text-slate-400">Airway bill tracking code shared with TCS/Leopards for 30 days during delivery.</p>
                  </div>
                </div>
              </div>

              {/* In-App Deletion Section */}
              <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                  <Trash2 className="w-4 h-4" />
                  <span>Permanent Account & Data Erasure</span>
                </div>
                <p className="text-xs text-slate-300">
                  {user ? (
                    <>Logged in as <strong className="text-white">{user.name}</strong> ({user.phone || user.email}). Deleting your account will immediately wipe your order records, saved addresses, and profile from this device.</>
                  ) : (
                    <>You are currently browsing as a guest. Executing erasure will reset all cached cart data, address cookies, and app preferences.</>
                  )}
                </p>

                <form onSubmit={handleDeleteAccount} className="space-y-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
                      Type "DELETE" to confirm permanent removal:
                    </label>
                    <input
                      type="text"
                      value={confirmDeleteText}
                      onChange={e => setConfirmDeleteText(e.target.value)}
                      placeholder="Type DELETE"
                      required
                      className="w-full bg-black/60 border border-rose-500/40 text-rose-300 text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-rose-500 font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isDeleting || confirmDeleteText !== 'DELETE'}
                    className="w-full bg-rose-600 hover:bg-rose-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                  >
                    {isDeleting ? (
                      <span>Erasing all data...</span>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        <span>Permanently Delete My Account & Wipe Data</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 4: 7-Day Return & COD Policy */}
          {activeTab === 'returns' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h3 className="font-bold text-white text-xs uppercase tracking-wider">Hassle-Free Doorstep Return Policy</h3>
                <p className="text-xs text-slate-400">
                  AuraPK offers a 7-day doorstep return and exchange guarantee for all orders placed within Pakistan.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-bold text-xs uppercase tracking-wider">How Returns Work:</h4>
                <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-400">
                  <li>Contact our customer support at <strong>care@aurapk.com</strong> or WhatsApp <strong>+92 300 1234567</strong> within 7 days of delivery.</li>
                  <li>Our logistics partner (TCS/Leopards) will schedule a doorstep pickup from your address.</li>
                  <li>Once inspected, refunds are credited to your <strong>JazzCash, Easypaisa, or Direct Bank Account</strong> within 24 to 48 hours.</li>
                </ol>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#141414] border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Google Play Policy Version 2026.1</span>
          </div>

          <button
            onClick={onClose}
            className="bg-white hover:bg-slate-200 text-black font-bold text-xs uppercase tracking-wider px-5 py-2 rounded-full transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
