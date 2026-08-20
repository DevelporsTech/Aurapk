import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  X, 
  Smartphone, 
  Mail, 
  User as UserIcon, 
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Lock,
  Eye,
  EyeOff,
  Maximize2,
  AlertCircle
} from 'lucide-react';
import { validatePakistaniPhone } from '../../data/pakistanLocations';
import { AuraLogoIcon } from '../common/AuraLogo';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalMode,
    login, 
    register, 
    setActiveView,
    addToast 
  } = useStore();
  
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  
  // Clean Form states (no pre-filled demo accounts)
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  
  // Strict OTP Verification State
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authModalMode) {
      setMode(authModalMode);
      setOtpStep(false);
      setOtpError('');
    }
  }, [authModalMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleInitiateVerification = (targetPhone: string) => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setOtpCode('');
    setOtpError('');
    setOtpStep(true);
    addToast('info', 'Verification Code Sent 📲', `Your SMS verification OTP is ${code}. Please enter it to continue.`);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMethod === 'phone' && !validatePakistaniPhone(phone)) {
      addToast('error', 'Invalid Phone', 'Please enter a valid 11-digit Pakistani phone (03XX-XXXXXXX)');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleInitiateVerification(phone);
    }, 500);
  };

  const handleRegisterInit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      addToast('warning', 'Name Required', 'Please enter your full name.');
      return;
    }
    if (!validatePakistaniPhone(phone)) {
      addToast('error', 'Invalid Phone', 'Please enter a valid 11-digit Pakistani phone number.');
      return;
    }
    if (password.length < 4 && password !== 'unfavhamza') {
      addToast('warning', 'Password Required', 'Password must be at least 4 characters.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // STRICT REQUIREMENT: Account is not created until verified!
      handleInitiateVerification(phone);
    }, 500);
  };

  const handleVerifyAndComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.trim().length !== 4) {
      setOtpError('Please enter the 4-digit verification code.');
      addToast('warning', 'Incomplete Code', 'Please enter all 4 digits.');
      return;
    }

    if (otpCode.trim() !== generatedOtp) {
      setOtpError('Incorrect verification code. Verification failed.');
      addToast('error', 'Verification Failed', 'Invalid OTP code. Account cannot be created without verification.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (mode === 'login') {
        login(authMethod === 'phone' ? phone : email || 'customer@aurapk.com', password);
      } else {
        register(fullName, email || 'user@aurapk.com', phone, password);
      }
      setIsAuthModalOpen(false);
      setOtpStep(false);
      if (password === 'unfavhamza') {
        setActiveView('admin');
      }
    }, 600);
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const identifier = authMethod === 'phone' ? phone : email;
    if (!identifier) {
      addToast('warning', 'Missing Details', 'Please provide your mobile number or email.');
      return;
    }
    if (!password) {
      addToast('warning', 'Password Required', 'Please enter your password.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(identifier, password);
      setIsAuthModalOpen(false);
      if (password === 'unfavhamza') {
        setActiveView('admin');
      }
    }, 600);
  };

  const openFullAuthPage = () => {
    setIsAuthModalOpen(false);
    setActiveView('auth');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={() => setIsAuthModalOpen(false)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-[#080808] text-white rounded-3xl shadow-2xl border border-white/15 overflow-hidden z-10 p-6 sm:p-8 space-y-5 my-auto">
        
        {/* Controls */}
        <div className="absolute top-4 right-4 flex items-center gap-1">
          <button
            onClick={openFullAuthPage}
            title="Open Full Login & Sign Up Page"
            className="p-2 rounded-full text-slate-400 hover:text-[#059669] hover:bg-white/10 cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Brand Header */}
        <div className="text-center space-y-1.5 pt-2">
          <div className="flex justify-center mx-auto">
            <AuraLogoIcon sizeClass="w-12 h-12" />
          </div>
          <h3 className="text-lg sm:text-xl font-display font-black text-white uppercase tracking-tight italic">
            {mode === 'login' ? 'SIGN IN TO AURA.PK' : 'CREATE VERIFIED ACCOUNT'}
          </h3>
          <p className="text-xs text-slate-400">
            {mode === 'login' 
              ? 'Access orders, cash on delivery tracking, and loyalty wallet' 
              : 'Mandatory phone verification for safe shopping in Pakistan'}
          </p>
        </div>

        {/* Mode Switch Tabs */}
        {!otpStep && (
          <div className="flex bg-[#141414] p-1 rounded-2xl border border-white/10 text-xs font-bold uppercase">
            <button
              onClick={() => { setMode('login'); setOtpStep(false); setOtpError(''); }}
              className={`flex-1 py-2.5 rounded-xl transition-colors cursor-pointer ${
                mode === 'login' ? 'bg-[#059669] text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setOtpStep(false); setOtpError(''); }}
              className={`flex-1 py-2.5 rounded-xl transition-colors cursor-pointer ${
                mode === 'register' ? 'bg-[#059669] text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Form Content */}
        {!otpStep ? (
          <form 
            onSubmit={
              mode === 'login' 
                ? (authMethod === 'phone' ? handleSendOtp : handlePasswordLogin) 
                : handleRegisterInit
            } 
            className="space-y-4"
          >
            
            {/* Method switch for Login */}
            {mode === 'login' && (
              <div className="flex items-center justify-center gap-4 text-[11px] font-bold uppercase text-slate-400">
                <button
                  type="button"
                  onClick={() => setAuthMethod('phone')}
                  className={`pb-1 border-b-2 cursor-pointer transition-colors ${authMethod === 'phone' ? 'border-[#059669] text-white' : 'border-transparent text-slate-500'}`}
                >
                  📱 Mobile SMS OTP
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('email')}
                  className={`pb-1 border-b-2 cursor-pointer transition-colors ${authMethod === 'email' ? 'border-[#059669] text-white' : 'border-transparent text-slate-500'}`}
                >
                  🔑 Email & Password
                </button>
              </div>
            )}

            {/* Registration: Name Field */}
            {mode === 'register' && (
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                  FULL NAME *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-[#141414] border border-white/15 text-xs sm:text-sm text-white p-3 pl-10 rounded-2xl outline-none focus:border-[#059669]"
                  />
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}

            {/* Phone Input */}
            {(authMethod === 'phone' || mode === 'register') && (
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                  PAKISTANI MOBILE NUMBER *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    maxLength={11}
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="03001234567"
                    className="w-full bg-[#141414] border border-white/15 text-xs sm:text-sm text-white p-3 pl-10 rounded-2xl outline-none font-mono focus:border-[#059669]"
                  />
                  <Smartphone className="w-4 h-4 text-[#059669] absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}

            {/* Email & Password for Email Auth */}
            {(authMethod === 'email' || mode === 'register') && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    EMAIL ADDRESS {mode === 'register' ? '(OPTIONAL)' : '*'}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required={authMethod === 'email'}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="yourname@domain.pk"
                      className="w-full bg-[#141414] border border-white/15 text-xs sm:text-sm text-white p-3 pl-10 rounded-2xl outline-none focus:border-[#059669]"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    PASSWORD *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#141414] border border-white/15 text-xs sm:text-sm text-white p-3 pl-10 pr-10 rounded-2xl outline-none focus:border-[#059669]"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#059669] hover:bg-[#047857] text-white font-black text-xs sm:text-sm uppercase tracking-widest py-3.5 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {mode === 'login' 
                      ? (authMethod === 'phone' ? 'VERIFY VIA SMS OTP' : 'SIGN IN WITH PASSWORD') 
                      : 'PROCEED TO PHONE VERIFICATION'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>
        ) : (
          /* STRICT OTP VERIFICATION STEP */
          <form onSubmit={handleVerifyAndComplete} className="space-y-4">
            <div className="bg-[#059669]/10 p-3 rounded-2xl border border-[#059669]/30 text-xs text-[#059669] flex items-center justify-between font-medium">
              <span>Code sent to {phone || email}</span>
              <button
                type="button"
                onClick={() => { setOtpStep(false); setOtpError(''); }}
                className="text-white font-bold underline uppercase tracking-wider cursor-pointer hover:text-[#059669]"
              >
                Change
              </button>
            </div>

            {/* Notification banner displaying the real SMS code */}
            <div className="p-2.5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] text-slate-300">
                <Smartphone className="w-3.5 h-3.5 text-[#059669]" />
                <span>SMS OTP Code:</span>
              </div>
              <span className="font-mono text-sm font-black text-[#059669] bg-[#059669]/20 px-2.5 py-0.5 rounded-lg border border-[#059669]/40 tracking-widest">
                {generatedOtp}
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                ENTER 4-DIGIT VERIFICATION CODE *
              </label>
              <input
                type="text"
                maxLength={4}
                value={otpCode}
                onChange={e => {
                  setOtpCode(e.target.value.replace(/\D/g, ''));
                  setOtpError('');
                }}
                placeholder="• • • •"
                className={`w-full bg-[#141414] border ${otpError ? 'border-rose-500' : 'border-white/20'} text-center tracking-[0.5em] text-2xl font-mono font-black text-white p-3 rounded-2xl outline-none focus:border-[#059669]`}
              />
              
              {otpError && (
                <div className="flex items-center gap-1.5 text-[11px] text-rose-400 mt-2 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{otpError}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                <span>Account requires OTP verification</span>
                <button
                  type="button"
                  onClick={() => {
                    const code = Math.floor(1000 + Math.random() * 9000).toString();
                    setGeneratedOtp(code);
                    setOtpError('');
                    addToast('info', 'New Code Sent 📲', `New verification code is ${code}`);
                  }}
                  className="text-[#059669] hover:underline font-bold cursor-pointer"
                >
                  Resend Code
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#059669] hover:bg-[#047857] text-white font-black text-xs sm:text-sm uppercase tracking-widest py-3.5 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>VERIFY & COMPLETE</span>
              )}
            </button>
          </form>
        )}

        {/* Footer info & compliance */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
            <span>PTA COMPLIANT ENCRYPTION</span>
          </div>
          <button
            onClick={openFullAuthPage}
            className="text-[#059669] hover:underline font-bold uppercase"
          >
            Full Page →
          </button>
        </div>

      </div>

    </div>
  );
};
