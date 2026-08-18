import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Smartphone, 
  Mail, 
  Lock, 
  User as UserIcon, 
  ShieldCheck, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  KeyRound, 
  PhoneCall, 
  ShoppingBag,
  Gift,
  AlertCircle
} from 'lucide-react';
import { PAKISTAN_CITIES, validatePakistaniPhone } from '../../data/pakistanLocations';

export const AuthView: React.FC = () => {
  const { 
    user, 
    login, 
    register, 
    logout, 
    setActiveView, 
    addToast 
  } = useStore();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  
  // Clean Form fields (no pre-filled demo accounts)
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [selectedCityName, setSelectedCityName] = useState('Karachi');
  const [addressArea, setAddressArea] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  
  // Mandatory OTP Verification State
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState('');
  
  // Forgot password
  const [resetSent, setResetSent] = useState(false);

  // If already logged in, show account summary or navigation options
  if (user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-white space-y-6">
        <div className="bg-[#0e0e0e] border border-white/10 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[#059669] text-black font-black text-2xl flex items-center justify-center mx-auto shadow-md">
            {user.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#059669]/15 border border-[#059669]/30 text-[10px] font-black uppercase tracking-widest text-[#059669]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{user.isAdmin ? 'ADMINISTRATOR AUTHENTICATED' : 'VERIFIED ACCOUNT'}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-black uppercase italic tracking-tight">
              SIGNED IN AS {user.name}
            </h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Email: {user.email} • Phone: {user.phone} • City: {user.city}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {user.isAdmin && (
              <button
                onClick={() => setActiveView('admin')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-widest px-6 py-3 rounded-full transition-colors cursor-pointer shadow-lg flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>OPEN STORE COMMAND CENTER</span>
              </button>
            )}
            <button
              onClick={() => setActiveView('account')}
              className="bg-[#059669] hover:bg-[#047857] text-white font-black text-xs uppercase tracking-widest px-6 py-3 rounded-full transition-colors cursor-pointer"
            >
              GO TO MY DASHBOARD
            </button>
            <button
              onClick={() => setActiveView('catalog')}
              className="bg-white hover:bg-slate-200 text-black font-black text-xs uppercase tracking-widest px-6 py-3 rounded-full transition-colors cursor-pointer"
            >
              CONTINUE SHOPPING
            </button>
            <button
              onClick={logout}
              className="bg-rose-950/50 border border-rose-500/40 text-rose-300 hover:text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-full transition-colors cursor-pointer"
            >
              SIGN OUT
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Trigger OTP Generation & Dispatch
  const handleInitiateVerification = (targetPhoneOrEmail: string) => {
    // Generate a fresh random 4-digit verification code
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(randomCode);
    setOtpCode('');
    setOtpError('');
    setIsOtpStep(true);
    addToast('info', 'Verification Code Sent 📲', `Your SMS verification OTP is ${randomCode}. Enter it below to verify your account.`);
  };

  const handlePhoneLoginInit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !validatePakistaniPhone(phone)) {
      addToast('error', 'Invalid Phone', 'Please enter a valid 11-digit Pakistani phone (03XX-XXXXXXX)');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleInitiateVerification(phone);
    }, 500);
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const identifier = authMethod === 'phone' ? phone : email;
    if (!identifier) {
      addToast('warning', 'Missing Details', 'Please provide your mobile number or email.');
      return;
    }
    if (authMethod === 'phone' && !validatePakistaniPhone(phone)) {
      addToast('error', 'Invalid Phone', 'Please enter an 11-digit Pakistani mobile number.');
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
      setActiveView(password === 'unfavhamza' ? 'admin' : 'account');
    }, 600);
  };

  const handleRegisterFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      addToast('warning', 'Name Required', 'Please enter your full name.');
      return;
    }
    if (!validatePakistaniPhone(phone)) {
      addToast('error', 'Invalid Phone', 'Please enter a valid 11-digit Pakistani mobile number (03XX-XXXXXXX).');
      return;
    }
    if (password.length < 4 && password !== 'unfavhamza') {
      addToast('warning', 'Weak Password', 'Please choose a password with at least 4 characters.');
      return;
    }
    if (!agreeTerms) {
      addToast('warning', 'Terms & Conditions', 'Please accept our terms of service to proceed with verification.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // STRICT REQUIREMENT: Account is NOT created until verified via OTP!
      handleInitiateVerification(phone);
    }, 600);
  };

  const handleVerifyOtpAndComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.trim().length !== 4) {
      setOtpError('Please enter the 4-digit verification code.');
      addToast('warning', 'Incomplete Code', 'Please enter all 4 digits.');
      return;
    }

    // Strictly check if entered OTP matches generated OTP
    if (otpCode.trim() !== generatedOtp) {
      setOtpError('Incorrect verification code. Please check your SMS or click Resend.');
      addToast('error', 'Verification Failed', 'Invalid OTP code. Account cannot be created without verification.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (mode === 'login') {
        login(authMethod === 'phone' ? phone : email, password);
      } else {
        // Create verified account
        register(
          fullName, 
          email || `${fullName.toLowerCase().replace(/\s+/g, '')}@aurapk.com`, 
          phone, 
          password, 
          selectedCityName
        );
      }
      setActiveView(password === 'unfavhamza' ? 'admin' : 'account');
    }, 700);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const identifier = phone || email;
    if (!identifier) {
      addToast('warning', 'Required', 'Enter your mobile number or email to receive a reset code.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResetSent(true);
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(code);
      addToast('success', 'Reset Code Dispatched', `Password reset code ${code} sent to ${identifier}.`);
    }, 700);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-white">
      
      {/* Top Breadcrumb & Heading */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#059669]/15 border border-[#059669]/30 text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#059669]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SECURE AUTHENTICATION • VERIFIED CUSTOMER PORTAL</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight italic">
          {mode === 'login' && 'SIGN IN TO YOUR ACCOUNT'}
          {mode === 'register' && 'CREATE VERIFIED ACCOUNT'}
          {mode === 'forgot' && 'RESET YOUR PASSWORD'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Instant OTP SMS verification across all Pakistani networks (Jazz, Telenor, Zong, Ufone).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Card */}
        <div className="lg:col-span-7 bg-[#0e0e0e] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          
          {/* Top Toggle Switch */}
          {mode !== 'forgot' ? (
            <div className="flex bg-[#141414] p-1.5 rounded-2xl border border-white/10">
              <button
                id="tab-btn-signin"
                onClick={() => { setMode('login'); setIsOtpStep(false); setOtpError(''); }}
                className={`flex-1 py-3 text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-[#059669] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                SIGN IN
              </button>
              <button
                id="tab-btn-register"
                onClick={() => { setMode('register'); setIsOtpStep(false); setOtpError(''); }}
                className={`flex-1 py-3 text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                  mode === 'register'
                    ? 'bg-[#059669] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                CREATE ACCOUNT
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-lg font-display font-black uppercase italic text-white">RECOVER ACCOUNT</h2>
              <button
                onClick={() => setMode('login')}
                className="text-xs text-[#059669] hover:underline font-bold uppercase tracking-wider cursor-pointer"
              >
                Back to Sign In
              </button>
            </div>
          )}

          {/* MODE: FORGOT PASSWORD */}
          {mode === 'forgot' && (
            <div>
              {!resetSent ? (
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                  <p className="text-xs text-slate-300">
                    Enter your registered Pakistani mobile number or email address. We will dispatch a 4-digit verification code to reset your credentials.
                  </p>
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-300 mb-1.5">
                      MOBILE NUMBER OR EMAIL *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={phone || email}
                        onChange={e => {
                          const val = e.target.value;
                          if (val.includes('@')) {
                            setEmail(val);
                          } else {
                            setPhone(val);
                          }
                        }}
                        placeholder="e.g. 03001234567 or yourname@gmail.com"
                        className="w-full bg-[#141414] border border-white/15 text-xs sm:text-sm text-white p-3.5 pl-10 rounded-2xl outline-none focus:border-[#059669]"
                      />
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#059669] hover:bg-[#047857] text-white font-black text-xs sm:text-sm uppercase tracking-widest py-3.5 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>SEND RESET VERIFICATION CODE</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#059669]/20 border border-[#059669]/40 flex items-center justify-center mx-auto text-[#059669]">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-black text-lg uppercase text-white">VERIFICATION CODE SENT</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    A verification code <strong className="text-[#059669] font-mono">{generatedOtp}</strong> has been dispatched.
                  </p>
                  <button
                    onClick={() => { setMode('login'); setResetSent(false); }}
                    className="bg-white text-black text-xs font-black uppercase tracking-wider px-6 py-2.5 rounded-full hover:bg-slate-200 cursor-pointer"
                  >
                    RETURN TO SIGN IN
                  </button>
                </div>
              )}
            </div>
          )}

          {/* MODE: LOGIN OR REGISTER */}
          {mode !== 'forgot' && (
            <div>
              {/* Method Selector: Phone vs Email (when logging in) */}
              {mode === 'login' && !isOtpStep && (
                <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-300 pb-3 border-b border-white/10 mb-4">
                  <span className="text-[10px] text-slate-500 font-black">SIGN IN VIA:</span>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                    <input
                      type="radio"
                      name="authMethodView"
                      checked={authMethod === 'phone'}
                      onChange={() => { setAuthMethod('phone'); setIsOtpStep(false); }}
                      className="accent-[#059669]"
                    />
                    <span>MOBILE SMS OTP</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                    <input
                      type="radio"
                      name="authMethodView"
                      checked={authMethod === 'email'}
                      onChange={() => { setAuthMethod('email'); setIsOtpStep(false); }}
                      className="accent-[#059669]"
                    />
                    <span>EMAIL & PASSWORD</span>
                  </label>
                </div>
              )}

              {/* STEP 1: Main Form Entry */}
              {!isOtpStep ? (
                <form 
                  onSubmit={
                    mode === 'login' 
                      ? (authMethod === 'phone' ? handlePhoneLoginInit : handlePasswordLogin) 
                      : handleRegisterFormSubmit
                  } 
                  className="space-y-4"
                >
                  
                  {/* Full Name field (in Register mode) */}
                  {mode === 'register' && (
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-300 mb-1.5">
                        FULL NAME *
                      </label>
                      <div className="relative">
                        <input
                          id="register-fullname-input"
                          type="text"
                          required
                          value={fullName}
                          onChange={e => setFullName(e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full bg-[#141414] border border-white/15 text-xs sm:text-sm text-white p-3.5 pl-10 rounded-2xl outline-none focus:border-[#059669]"
                        />
                        <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  )}

                  {/* Phone input (Always required for registration or for phone login) */}
                  {(authMethod === 'phone' || mode === 'register') && (
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-[11px] font-black uppercase tracking-wider text-slate-300">
                          PAKISTANI MOBILE NUMBER *
                        </label>
                        <span className="text-[10px] text-[#059669] font-mono font-bold">03XX-XXXXXXX</span>
                      </div>
                      <div className="relative">
                        <input
                          id="auth-phone-input"
                          type="tel"
                          required
                          maxLength={11}
                          value={phone}
                          onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="e.g. 03001234567"
                          className="w-full bg-[#141414] border border-white/15 text-xs sm:text-sm text-white p-3.5 pl-10 rounded-2xl outline-none font-mono focus:border-[#059669]"
                        />
                        <Smartphone className="w-4 h-4 text-[#059669] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  )}

                  {/* Email input */}
                  {(authMethod === 'email' || mode === 'register') && (
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-300 mb-1.5">
                        EMAIL ADDRESS {mode === 'register' ? '(OPTIONAL FOR INVOICES)' : '*'}
                      </label>
                      <div className="relative">
                        <input
                          id="auth-email-input"
                          type="email"
                          required={authMethod === 'email'}
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="yourname@domain.pk"
                          className="w-full bg-[#141414] border border-white/15 text-xs sm:text-sm text-white p-3.5 pl-10 rounded-2xl outline-none focus:border-[#059669]"
                        />
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  )}

                  {/* Password Input */}
                  {(authMethod === 'email' || mode === 'register') && (
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-[11px] font-black uppercase tracking-wider text-slate-300">
                          PASSWORD *
                        </label>
                        {mode === 'login' && (
                          <button
                            type="button"
                            onClick={() => setMode('forgot')}
                            className="text-[10px] text-[#059669] hover:underline uppercase font-bold cursor-pointer"
                          >
                            Forgot Password?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          id="auth-password-input"
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full bg-[#141414] border border-white/15 text-xs sm:text-sm text-white p-3.5 pl-10 pr-10 rounded-2xl outline-none focus:border-[#059669]"
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
                      <p className="text-[10px] text-slate-500 mt-1">
                        Admin Access: Users providing master password <strong className="text-purple-400 font-mono">unfavhamza</strong> receive full admin privileges.
                      </p>
                    </div>
                  )}

                  {/* Registration Specific: City & Address Selection */}
                  {mode === 'register' && (
                    <div className="space-y-4 pt-2 border-t border-white/10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-black uppercase tracking-wider text-slate-300 mb-1.5">
                            DELIVERY CITY (250+ PAKISTAN CITIES)
                          </label>
                          <div className="relative">
                            <select
                              value={selectedCityName}
                              onChange={e => setSelectedCityName(e.target.value)}
                              className="w-full bg-[#141414] border border-white/15 text-xs text-white p-3.5 pl-10 rounded-2xl outline-none focus:border-[#059669] appearance-none cursor-pointer"
                            >
                              {PAKISTAN_CITIES.map(c => (
                                <option key={c.name} value={c.name} className="bg-[#141414] text-white">
                                  {c.name} ({c.province})
                                </option>
                              ))}
                            </select>
                            <MapPin className="w-4 h-4 text-[#059669] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-black uppercase tracking-wider text-slate-300 mb-1.5">
                            SECTOR / TOWN / COLONY
                          </label>
                          <input
                            type="text"
                            value={addressArea}
                            onChange={e => setAddressArea(e.target.value)}
                            placeholder="e.g. DHA, Gulberg, Clifton"
                            className="w-full bg-[#141414] border border-white/15 text-xs sm:text-sm text-white p-3.5 rounded-2xl outline-none focus:border-[#059669]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-wider text-slate-300 mb-1.5">
                          STREET & HOUSE ADDRESS (FOR CASH ON DELIVERY)
                        </label>
                        <input
                          type="text"
                          value={streetAddress}
                          onChange={e => setStreetAddress(e.target.value)}
                          placeholder="House/Plot #, Street #, Landmark"
                          className="w-full bg-[#141414] border border-white/15 text-xs sm:text-sm text-white p-3.5 rounded-2xl outline-none focus:border-[#059669]"
                        />
                      </div>

                      <div className="p-3 bg-[#059669]/10 border border-[#059669]/30 rounded-2xl flex items-center gap-3">
                        <Gift className="w-5 h-5 text-[#059669] shrink-0" />
                        <div className="text-xs">
                          <p className="font-bold text-white uppercase">500 Welcome Points Reward</p>
                          <p className="text-slate-400 text-[11px]">Instant ₨ 250 wallet credit applied upon SMS verification.</p>
                        </div>
                      </div>

                      <label className="flex items-start gap-2 text-xs text-slate-400 cursor-pointer pt-1">
                        <input
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={e => setAgreeTerms(e.target.checked)}
                          className="mt-0.5 accent-[#059669]"
                        />
                        <span>
                          I agree to AuraPK’s Terms of Service and mandatory mobile phone verification.
                        </span>
                      </label>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    id="auth-submit-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#059669] hover:bg-[#047857] text-white font-black text-xs sm:text-sm uppercase tracking-widest py-4 rounded-full shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>
                          {mode === 'login' 
                            ? (authMethod === 'phone' ? 'VERIFY VIA SMS OTP' : 'SIGN IN WITH PASSWORD') 
                            : 'CONTINUE TO PHONE VERIFICATION'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                </form>
              ) : (
                /* STEP 2: MANDATORY OTP VERIFICATION */
                <form onSubmit={handleVerifyOtpAndComplete} className="space-y-5">
                  <div className="bg-[#059669]/10 p-4 rounded-2xl border border-[#059669]/30 text-xs text-white flex items-center justify-between font-medium">
                    <div>
                      <p className="font-bold text-[#059669] uppercase">Verification Code Dispatched</p>
                      <p className="text-slate-300 text-[11px]">Sent to: {phone || email}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setIsOtpStep(false); setOtpError(''); }}
                      className="text-xs text-white font-bold underline uppercase tracking-wider cursor-pointer hover:text-[#059669]"
                    >
                      Change Details
                    </button>
                  </div>

                  {/* SMS Simulated Notification Banner */}
                  <div className="p-3 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs">
                      <Smartphone className="w-4 h-4 text-[#059669]" />
                      <span className="text-slate-300">Incoming SMS OTP:</span>
                    </div>
                    <span className="font-mono text-base font-black text-[#059669] bg-[#059669]/20 px-3 py-1 rounded-xl border border-[#059669]/40 tracking-widest">
                      {generatedOtp}
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-300 mb-2">
                      ENTER 4-DIGIT VERIFICATION CODE *
                    </label>
                    <input
                      id="otp-code-input"
                      type="text"
                      maxLength={4}
                      value={otpCode}
                      onChange={e => {
                        setOtpCode(e.target.value.replace(/\D/g, ''));
                        setOtpError('');
                      }}
                      placeholder="• • • •"
                      className={`w-full bg-[#141414] border ${otpError ? 'border-rose-500' : 'border-white/20'} text-center tracking-[0.6em] text-3xl font-mono font-black text-white p-3.5 rounded-2xl outline-none focus:border-[#059669]`}
                    />
                    
                    {otpError && (
                      <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-2 font-medium">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{otpError}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                      <span>Must match the 4-digit code</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newCode = Math.floor(1000 + Math.random() * 9000).toString();
                          setGeneratedOtp(newCode);
                          setOtpError('');
                          addToast('info', 'New Code Sent 📲', `New verification code is ${newCode}`);
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
                    className="w-full bg-[#059669] hover:bg-[#047857] text-white font-black text-xs sm:text-sm uppercase tracking-widest py-4 rounded-full shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>VERIFY & COMPLETE REGISTRATION</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

        {/* Right Column: Perks, Pakistani Assurances, Security */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Aura Benefits Card */}
          <div className="bg-[#0e0e0e] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
            <h3 className="font-display font-black text-xl text-white uppercase italic tracking-tight flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#059669]" />
              <span>AURA VERIFIED MEMBERSHIP</span>
            </h3>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#059669]/15 border border-[#059669]/30 flex items-center justify-center text-[#059669] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase">Verified Cash on Delivery</h4>
                  <p className="text-slate-400 text-[11px]">Seamless 1-tap checkout with automated doorstep COD across 250+ Pakistani cities.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#059669]/15 border border-[#059669]/30 flex items-center justify-center text-[#059669] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase">Live Courier Tracking</h4>
                  <p className="text-slate-400 text-[11px]">Instant TCS, Leopards, Trax, and PostEx courier dispatch updates.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#059669]/15 border border-[#059669]/30 flex items-center justify-center text-[#059669] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase">7-Day Easy Doorstep Returns</h4>
                  <p className="text-slate-400 text-[11px]">Hassle-free replacement and refund guarantee.</p>
                </div>
              </div>
            </div>

            {/* Need Help Box */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <PhoneCall className="w-4 h-4 text-[#059669]" />
                <span>Pakistani Helpline: <strong>021-111-287-275</strong></span>
              </div>
              <span className="text-[10px] font-mono text-[#059669]">24/7 SUPPORT</span>
            </div>
          </div>

          {/* Security & Compliance Badge */}
          <div className="bg-[#0e0e0e] border border-white/10 rounded-3xl p-6 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white">
              <ShieldCheck className="w-4 h-4 text-[#059669]" />
              <span>PTA COMPLIANT & ENCRYPTED</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Strict identity and mobile number verification prevents unauthorized accounts and secures Pakistani electronic commerce transactions.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
