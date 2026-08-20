import React, { useState, useEffect, useRef } from 'react';
import { 
  Smartphone, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Copy, 
  Check,
  Edit3
} from 'lucide-react';

interface OtpVerificationCardProps {
  generatedOtp: string;
  targetPhoneOrEmail: string;
  onVerify: (code: string) => void;
  onResend: () => void;
  onChangeTarget: () => void;
  isLoading?: boolean;
  errorMessage?: string;
  purposeLabel?: string;
}

export const OtpVerificationCard: React.FC<OtpVerificationCardProps> = ({
  generatedOtp,
  targetPhoneOrEmail,
  onVerify,
  onResend,
  onChangeTarget,
  isLoading = false,
  errorMessage = '',
  purposeLabel = 'Account Verification'
}) => {
  const [digits, setDigits] = useState<string[]>(['', '', '', '']);
  const [resendCountdown, setResendCountdown] = useState<number>(30);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string>('');

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  // Sync external error message
  useEffect(() => {
    if (errorMessage) {
      setLocalError(errorMessage);
    }
  }, [errorMessage]);

  // Focus the first empty digit on mount
  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

  // 30-Second Resend Countdown Timer
  useEffect(() => {
    setResendCountdown(30);
    setCanResend(false);
    
    const timer = setInterval(() => {
      setResendCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [generatedOtp]);

  const handleDigitChange = (index: number, val: string) => {
    setLocalError('');
    // Handle paste or multi-character input
    const cleanVal = val.replace(/\D/g, '');
    
    if (cleanVal.length > 1) {
      // User pasted full OTP code
      const pastedDigits = cleanVal.slice(0, 4).split('');
      const newDigits = ['', '', '', ''];
      pastedDigits.forEach((d, i) => {
        if (i < 4) newDigits[i] = d;
      });
      setDigits(newDigits);
      
      const lastIndex = Math.min(pastedDigits.length - 1, 3);
      inputRefs[lastIndex].current?.focus();

      if (newDigits.every(d => d !== '')) {
        onVerify(newDigits.join(''));
      }
      return;
    }

    const newDigits = [...digits];
    newDigits[index] = cleanVal;
    setDigits(newDigits);

    // Auto-advance to next box
    if (cleanVal && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // If all 4 digits are completed, auto-trigger verification
    if (cleanVal && index === 3) {
      const fullCode = newDigits.join('');
      if (fullCode.length === 4) {
        onVerify(fullCode);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        inputRefs[index - 1].current?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (e.key === 'ArrowRight' && index < 3) {
      inputRefs[index + 1].current?.focus();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const code = digits.join('');
      if (code.length === 4) {
        onVerify(code);
      } else {
        setLocalError('Please fill in all 4 digits.');
      }
    }
  };

  const handleAutoFill = () => {
    if (!generatedOtp) return;
    const otpArray = generatedOtp.split('');
    setDigits(otpArray);
    setLocalError('');
    inputRefs[3].current?.focus();
    
    // Auto-trigger verification with a smooth 150ms delay for feedback
    setTimeout(() => {
      onVerify(generatedOtp);
    }, 150);
  };

  const handleResendClick = () => {
    if (!canResend) return;
    setDigits(['', '', '', '']);
    setLocalError('');
    onResend();
    inputRefs[0].current?.focus();
  };

  const currentEnteredCode = digits.join('');
  const isMatch = currentEnteredCode.length === 4 && currentEnteredCode === generatedOtp;

  return (
    <div id="otp-verification-card" className="space-y-5 animate-in fade-in duration-300">
      
      {/* Top Dispatched Info Bar */}
      <div className="bg-[#059669]/10 p-4 rounded-2xl border border-[#059669]/30 text-xs text-white flex items-center justify-between font-medium">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 font-bold text-[#059669] uppercase tracking-wide text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{purposeLabel} Code Dispatched</span>
          </div>
          <p className="text-slate-300 text-xs font-mono">
            Sent to: <strong className="text-white">{targetPhoneOrEmail}</strong>
          </p>
        </div>
        
        <button
          type="button"
          onClick={onChangeTarget}
          className="text-xs text-slate-300 hover:text-white font-bold underline flex items-center gap-1 cursor-pointer transition-colors"
        >
          <Edit3 className="w-3 h-3" />
          <span>Change</span>
        </button>
      </div>

      {/* Simulated SMS Notification Banner with 1-Tap Auto-Fill */}
      <div className="p-3.5 bg-white/5 border border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
        <div className="flex items-center gap-2.5 text-xs">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Incoming SMS Notification</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-black text-emerald-400 tracking-widest">
                {generatedOtp}
              </span>
              <span className="text-[10px] text-slate-400 bg-white/10 px-2 py-0.5 rounded-full">
                Valid for 10 mins
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAutoFill}
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black text-xs uppercase tracking-wider px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>1-Tap Auto-Fill</span>
        </button>
      </div>

      {/* 4-Box Segmented OTP Input */}
      <div>
        <label className="block text-[11px] font-black uppercase tracking-wider text-slate-300 mb-2.5 text-center">
          ENTER 4-DIGIT VERIFICATION CODE
        </label>

        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-xs mx-auto">
          {digits.map((digit, idx) => (
            <input
              key={idx}
              ref={inputRefs[idx]}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              value={digit}
              onChange={e => handleDigitChange(idx, e.target.value)}
              onKeyDown={e => handleKeyDown(idx, e)}
              className={`w-full aspect-square text-center font-mono text-2xl sm:text-3xl font-black rounded-2xl border transition-all outline-none ${
                isMatch
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 ring-2 ring-emerald-500/50'
                  : localError
                  ? 'border-rose-500 bg-rose-950/30 text-rose-300 ring-2 ring-rose-500/40'
                  : digit
                  ? 'border-emerald-500/60 bg-[#141414] text-white'
                  : 'border-white/20 bg-[#0e0e0e] text-white hover:border-white/40 focus:border-emerald-500 focus:bg-[#161616]'
              }`}
            />
          ))}
        </div>

        {/* Error Feedback */}
        {localError && (
          <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400 mt-3 font-medium animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{localError}</span>
          </div>
        )}

        {/* Match Feedback */}
        {isMatch && !localError && (
          <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 mt-3 font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Code Verified! Completing sign-in...</span>
          </div>
        )}

        {/* Resend & Timer Controls */}
        <div className="flex items-center justify-between text-xs text-slate-400 mt-4 px-1">
          <span className="text-[11px]">Didn't receive SMS?</span>
          
          {canResend ? (
            <button
              type="button"
              onClick={handleResendClick}
              className="text-emerald-400 hover:text-emerald-300 font-bold uppercase tracking-wider text-xs flex items-center gap-1 cursor-pointer underline"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Resend Code Now</span>
            </button>
          ) : (
            <span className="text-slate-400 text-xs font-mono">
              Resend in <strong className="text-emerald-400">{resendCountdown}s</strong>
            </span>
          )}
        </div>
      </div>

      {/* Primary Submit Button */}
      <button
        type="button"
        onClick={() => {
          const full = digits.join('');
          if (full.length !== 4) {
            setLocalError('Please enter the 4-digit code.');
          } else {
            onVerify(full);
          }
        }}
        disabled={isLoading || digits.join('').length !== 4}
        className="w-full bg-[#059669] hover:bg-[#047857] disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-xs sm:text-sm uppercase tracking-widest py-4 rounded-full shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <span>VERIFY & COMPLETE</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      {/* Network Carrier Compatibility Tags */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-center gap-2 text-[10px] text-slate-400">
        <span>Supported Networks:</span>
        <span className="bg-white/5 px-2 py-0.5 rounded text-slate-300 font-bold">Jazz</span>
        <span className="bg-white/5 px-2 py-0.5 rounded text-slate-300 font-bold">Telenor</span>
        <span className="bg-white/5 px-2 py-0.5 rounded text-slate-300 font-bold">Zong</span>
        <span className="bg-white/5 px-2 py-0.5 rounded text-slate-300 font-bold">Ufone</span>
      </div>

    </div>
  );
};
