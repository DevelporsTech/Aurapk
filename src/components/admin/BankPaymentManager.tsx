import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Building2, 
  Plus, 
  Copy, 
  Check, 
  Trash2, 
  Edit3, 
  Power, 
  PowerOff, 
  Sparkles, 
  QrCode, 
  ExternalLink, 
  PhoneCall, 
  MessageSquare,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { BankAccountOption } from '../../types';

export const BankPaymentManager: React.FC = () => {
  const { 
    bankSettings, 
    updateBankSettings, 
    addBankAccount, 
    updateBankAccount, 
    deleteBankAccount, 
    toggleBankAccountStatus,
    addToast 
  } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccountId, setEditingAccountId] = useState<string | null>(null);

  // Bank Form State
  const [formBankName, setFormBankName] = useState('');
  const [formShortName, setFormShortName] = useState('');
  const [formAccountTitle, setFormAccountTitle] = useState('');
  const [formAccountNumber, setFormAccountNumber] = useState('');
  const [formIban, setFormIban] = useState('');
  const [formBranchCode, setFormBranchCode] = useState('');
  const [formBranchName, setFormBranchName] = useState('');
  const [formRaastId, setFormRaastId] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formIsActive, setFormIsActive] = useState(true);
  const [formIsPopular, setFormIsPopular] = useState(false);

  // Settings form state
  const [instructionsText, setInstructionsText] = useState(bankSettings.instructions || '');
  const [whatsappNumber, setWhatsappNumber] = useState(bankSettings.whatsappVerificationNumber || '+92 300 8451992');
  const [isBankTransferEnabled, setIsBankTransferEnabled] = useState(bankSettings.enabled ?? true);

  // Copy indicator state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addToast('success', 'Copied to Clipboard', text);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const openCreateModal = () => {
    setEditingAccountId(null);
    setFormBankName('');
    setFormShortName('');
    setFormAccountTitle('AuraPK Retail (Pvt) Ltd');
    setFormAccountNumber('');
    setFormIban('PK');
    setFormBranchCode('');
    setFormBranchName('');
    setFormRaastId('03008451992');
    setFormNotes('');
    setFormIsActive(true);
    setFormIsPopular(false);
    setIsModalOpen(true);
  };

  const openEditModal = (acc: BankAccountOption) => {
    setEditingAccountId(acc.id);
    setFormBankName(acc.bankName);
    setFormShortName(acc.shortName);
    setFormAccountTitle(acc.accountTitle);
    setFormAccountNumber(acc.accountNumber);
    setFormIban(acc.iban);
    setFormBranchCode(acc.branchCode);
    setFormBranchName(acc.branchName);
    setFormRaastId(acc.raastId || '');
    setFormNotes(acc.notes || '');
    setFormIsActive(acc.isActive);
    setFormIsPopular(acc.isPopular || false);
    setIsModalOpen(true);
  };

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formBankName.trim() || !formAccountNumber.trim()) {
      addToast('error', 'Required Fields Missing', 'Please enter Bank Name and Account Number.');
      return;
    }

    if (editingAccountId) {
      updateBankAccount(editingAccountId, {
        bankName: formBankName.trim(),
        shortName: formShortName.trim() || formBankName.trim(),
        accountTitle: formAccountTitle.trim(),
        accountNumber: formAccountNumber.trim(),
        iban: formIban.trim(),
        branchCode: formBranchCode.trim(),
        branchName: formBranchName.trim(),
        raastId: formRaastId.trim(),
        notes: formNotes.trim(),
        isActive: formIsActive,
        isPopular: formIsPopular
      });
    } else {
      const newAcc: BankAccountOption = {
        id: 'bank-' + Date.now().toString(36),
        bankName: formBankName.trim(),
        shortName: formShortName.trim() || formBankName.trim(),
        accountTitle: formAccountTitle.trim(),
        accountNumber: formAccountNumber.trim(),
        iban: formIban.trim(),
        branchCode: formBranchCode.trim(),
        branchName: formBranchName.trim(),
        raastId: formRaastId.trim(),
        notes: formNotes.trim(),
        isActive: formIsActive,
        isPopular: formIsPopular
      };
      addBankAccount(newAcc);
    }
    setIsModalOpen(false);
  };

  const handleSaveGlobalBankSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateBankSettings({
      enabled: isBankTransferEnabled,
      instructions: instructionsText.trim(),
      whatsappVerificationNumber: whatsappNumber.trim()
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Controls */}
      <div className="bg-[#0e0e0e] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-display font-black text-white uppercase tracking-tight">
                  PAKISTANI BANK ACCOUNTS & RAAST GATEWAY
                </h3>
                <span className="bg-teal-500/20 text-teal-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-teal-500/30">
                  {bankSettings.accounts.filter(a => a.isActive).length} ACTIVE BANKS
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Manage Meezan, HBL, Bank Alfalah, UBL, MCB, and SBP Raast accounts for customer checkout.
              </p>
            </div>
          </div>

          <button
            onClick={openCreateModal}
            className="bg-teal-500 hover:bg-teal-400 text-black font-black text-xs uppercase tracking-widest px-5 py-3 rounded-full flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer shadow-lg shadow-teal-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>ADD NEW BANK ACCOUNT</span>
          </button>
        </div>
      </div>

      {/* Grid of Configured Bank Accounts */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {bankSettings.accounts.map((acc) => (
          <div
            key={acc.id}
            className={`bg-[#0e0e0e] border rounded-3xl p-5 space-y-4 transition-all ${
              acc.isActive ? 'border-white/10 hover:border-teal-500/40' : 'border-white/5 opacity-60'
            }`}
          >
            {/* Header: Bank Title & Status */}
            <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-display font-black text-sm text-white uppercase">
                    {acc.bankName}
                  </span>
                  {acc.isPopular && (
                    <span className="bg-amber-500/20 text-amber-300 text-[9px] font-black uppercase px-1.5 py-0.5 rounded">
                      POPULAR
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-teal-400 font-semibold">{acc.shortName}</p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleBankAccountStatus(acc.id)}
                  title={acc.isActive ? 'Deactivate Bank' : 'Activate Bank'}
                  className={`p-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                    acc.isActive 
                      ? 'bg-teal-500/20 text-teal-300 hover:bg-teal-500/30' 
                      : 'bg-white/5 text-slate-500 hover:bg-white/10'
                  }`}
                >
                  {acc.isActive ? <Power className="w-4 h-4" /> : <PowerOff className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => openEditModal(acc)}
                  title="Edit Bank Details"
                  className="p-1.5 rounded-xl bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => deleteBankAccount(acc.id)}
                  title="Delete Bank Account"
                  className="p-1.5 rounded-xl bg-white/5 text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Account Details Box with 1-Click Copy */}
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-3.5 space-y-2 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-sans font-bold block">Account Title:</span>
                <span className="text-white font-bold">{acc.accountTitle}</span>
              </div>

              <div className="flex items-center justify-between group">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-sans font-bold block">Account Number:</span>
                  <span className="text-teal-300 font-bold tracking-wider">{acc.accountNumber}</span>
                </div>
                <button
                  onClick={() => handleCopy(acc.accountNumber, `acc-${acc.id}`)}
                  className="p-1 rounded text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 cursor-pointer"
                  title="Copy Account Number"
                >
                  {copiedKey === `acc-${acc.id}` ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {acc.iban && (
                <div className="flex items-center justify-between group">
                  <div className="truncate mr-2">
                    <span className="text-[10px] text-slate-500 uppercase font-sans font-bold block">IBAN:</span>
                    <span className="text-slate-300 text-[11px] truncate block">{acc.iban}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(acc.iban, `iban-${acc.id}`)}
                    className="p-1 rounded text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 cursor-pointer shrink-0"
                    title="Copy IBAN"
                  >
                    {copiedKey === `iban-${acc.id}` ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}

              {acc.raastId && (
                <div className="flex items-center justify-between group border-t border-white/10 pt-1.5 mt-1.5">
                  <div>
                    <span className="text-[10px] text-amber-400 uppercase font-sans font-bold block">SBP Raast ID:</span>
                    <span className="text-amber-200 font-bold">{acc.raastId}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(acc.raastId || '', `raast-${acc.id}`)}
                    className="p-1 rounded text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 cursor-pointer"
                    title="Copy Raast ID"
                  >
                    {copiedKey === `raast-${acc.id}` ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}

              {acc.branchName && (
                <div className="text-[10px] text-slate-400 pt-1 font-sans">
                  <span>Branch: {acc.branchName} {acc.branchCode ? `(Code: ${acc.branchCode})` : ''}</span>
                </div>
              )}
            </div>

            {acc.notes && (
              <p className="text-[11px] text-slate-400 italic">
                💡 {acc.notes}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Global Bank Gateway & WhatsApp Verification Settings */}
      <div className="bg-[#0e0e0e] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <ShieldCheck className="w-5 h-5 text-teal-400" />
          <div>
            <h4 className="font-display font-black text-base text-white uppercase">
              BANK TRANSFER SETTINGS & WHATSAPP VERIFICATION
            </h4>
            <p className="text-xs text-slate-400">
              Configure instructions and official WhatsApp line for customer payment receipts.
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveGlobalBankSettings} className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="enableBankTransfer"
              checked={isBankTransferEnabled}
              onChange={e => setIsBankTransferEnabled(e.target.checked)}
              className="w-4 h-4 accent-teal-500 rounded cursor-pointer"
            />
            <label htmlFor="enableBankTransfer" className="text-xs font-bold uppercase text-white cursor-pointer">
              ENABLE DIRECT BANK TRANSFER & RAAST AS CHECKOUT PAYMENT METHOD
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1.5">
                OFFICIAL WHATSAPP PROOF NUMBER (RECEIPT VERIFICATION)
              </label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={e => setWhatsappNumber(e.target.value)}
                placeholder="+92 300 8451992"
                className="w-full bg-[#141414] border border-white/15 text-xs text-white p-3 rounded-2xl outline-none focus:border-teal-500 font-mono"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Customers receive a 1-click WhatsApp link on order confirmation to send deposit screenshots.
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1.5">
                CUSTOMER CHECKOUT INSTRUCTIONS
              </label>
              <textarea
                rows={2}
                value={instructionsText}
                onChange={e => setInstructionsText(e.target.value)}
                placeholder="Transfer order total to any verified account..."
                className="w-full bg-[#141414] border border-white/15 text-xs text-white p-3 rounded-2xl outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-400 text-black font-black text-xs uppercase tracking-widest px-6 py-3 rounded-full cursor-pointer transition-transform active:scale-95"
          >
            SAVE BANK SETTINGS
          </button>
        </form>
      </div>

      {/* Modal for Add / Edit Bank Account */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-[#0e0e0e] border border-white/15 text-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
            <h3 className="font-display font-black text-lg uppercase">
              {editingAccountId ? 'EDIT BANK ACCOUNT' : 'ADD NEW PAKISTANI BANK ACCOUNT'}
            </h3>

            <form onSubmit={handleSaveAccount} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">
                  BANK NAME *
                </label>
                <input
                  type="text"
                  required
                  value={formBankName}
                  onChange={e => setFormBankName(e.target.value)}
                  placeholder="e.g. Meezan Bank Ltd / Faysal Bank Islamic"
                  className="w-full bg-[#161616] border border-white/15 text-white p-3 rounded-2xl outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">
                    SHORT NAME / BRAND
                  </label>
                  <input
                    type="text"
                    value={formShortName}
                    onChange={e => setFormShortName(e.target.value)}
                    placeholder="e.g. Meezan Islamic"
                    className="w-full bg-[#161616] border border-white/15 text-white p-3 rounded-2xl outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">
                    ACCOUNT TITLE *
                  </label>
                  <input
                    type="text"
                    required
                    value={formAccountTitle}
                    onChange={e => setFormAccountTitle(e.target.value)}
                    placeholder="e.g. AuraPK Retail (Pvt) Ltd"
                    className="w-full bg-[#161616] border border-white/15 text-white p-3 rounded-2xl outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">
                    ACCOUNT NUMBER *
                  </label>
                  <input
                    type="text"
                    required
                    value={formAccountNumber}
                    onChange={e => setFormAccountNumber(e.target.value)}
                    placeholder="0109-0104829101"
                    className="w-full bg-[#161616] border border-white/15 text-white p-3 rounded-2xl outline-none font-mono focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">
                    RAAST ID (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    value={formRaastId}
                    onChange={e => setFormRaastId(e.target.value)}
                    placeholder="03008451992"
                    className="w-full bg-[#161616] border border-white/15 text-white p-3 rounded-2xl outline-none font-mono focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">
                  IBAN (24 CHARACTERS)
                </label>
                <input
                  type="text"
                  value={formIban}
                  onChange={e => setFormIban(e.target.value)}
                  placeholder="PK54MEZN0001090104829101"
                  className="w-full bg-[#161616] border border-white/15 text-white p-3 rounded-2xl outline-none font-mono focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">
                    BRANCH CODE
                  </label>
                  <input
                    type="text"
                    value={formBranchCode}
                    onChange={e => setFormBranchCode(e.target.value)}
                    placeholder="0109"
                    className="w-full bg-[#161616] border border-white/15 text-white p-3 rounded-2xl outline-none font-mono focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">
                    BRANCH NAME / CITY
                  </label>
                  <input
                    type="text"
                    value={formBranchName}
                    onChange={e => setFormBranchName(e.target.value)}
                    placeholder="DHA Phase 5, Lahore"
                    className="w-full bg-[#161616] border border-white/15 text-white p-3 rounded-2xl outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">
                  CUSTOMER NOTES / TIPS
                </label>
                <input
                  type="text"
                  value={formNotes}
                  onChange={e => setFormNotes(e.target.value)}
                  placeholder="e.g. 0% fees via mobile banking app 24/7"
                  className="w-full bg-[#161616] border border-white/15 text-white p-3 rounded-2xl outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsActive}
                    onChange={e => setFormIsActive(e.target.checked)}
                    className="w-4 h-4 accent-teal-500"
                  />
                  <span className="font-bold text-slate-300">ACTIVE IN CHECKOUT</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsPopular}
                    onChange={e => setFormIsPopular(e.target.checked)}
                    className="w-4 h-4 accent-amber-500"
                  />
                  <span className="font-bold text-slate-300">MARK AS POPULAR</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 font-bold cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-teal-500 hover:bg-teal-400 text-black font-black uppercase tracking-wider cursor-pointer"
                >
                  {editingAccountId ? 'UPDATE BANK' : 'ADD BANK'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
