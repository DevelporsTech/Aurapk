import React, { useState } from 'react';

interface AuraLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showBadge?: boolean;
  className?: string;
  variant?: 'emerald' | 'gold' | 'white';
}

export const AuraLogoIcon: React.FC<{ sizeClass?: string; className?: string }> = ({ 
  sizeClass = "w-7 h-7 sm:w-8 sm:h-8", 
  className = "" 
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${sizeClass} ${className}`}>
      {!imgError ? (
        <img
          src="/app-logo.jpg"
          alt="AuraPK"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover rounded-lg sm:rounded-xl shadow-md ring-1 ring-[#059669]/50"
        />
      ) : (
        /* Rich Vector SVG Fallback with Pakistan Emerald Emblem */
        <div className="w-full h-full rounded-lg sm:rounded-xl bg-gradient-to-br from-[#064e3b] via-[#059669] to-[#047857] p-0.5 sm:p-1 flex items-center justify-center shadow-lg shadow-[#059669]/25 ring-1 ring-[#10b981]/50">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-white"
          >
            {/* Hexagonal Shield Background */}
            <path
              d="M50 5 L88 24 V68 L50 95 L12 68 V24 Z"
              fill="url(#emeraldGrad)"
              stroke="#34d399"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Inner Emerald Shading */}
            <path
              d="M50 15 L78 30 V62 L50 82 L22 62 V30 Z"
              fill="#064e3b"
              fillOpacity="0.7"
              stroke="#10b981"
              strokeWidth="2"
            />
            {/* Stylized A Monogram */}
            <path
              d="M50 24 L68 70 H56 L51.5 57 H48.5 L44 70 H32 L50 24Z"
              fill="#ffffff"
            />
            {/* Crossbar Star/Diamond */}
            <path
              d="M50 40 L53.5 49 H46.5 Z"
              fill="#059669"
            />
            {/* Crescent Moon Accent */}
            <path
              d="M62 26 C64 29 64 34 60 37 C58 35 58 31 60 28 Z"
              fill="#fbbf24"
            />
            <defs>
              <linearGradient id="emeraldGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#059669" />
                <stop offset="0.5" stopColor="#047857" />
                <stop offset="1" stopColor="#064e3b" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
    </div>
  );
};

export const AuraLogo: React.FC<AuraLogoProps> = ({
  size = 'md',
  showText = true,
  showBadge = true,
  className = '',
}) => {
  const sizeMap = {
    xs: { icon: 'w-5 h-5 sm:w-6 sm:h-6', text: 'text-sm sm:text-base', badge: 'text-[7px]' },
    sm: { icon: 'w-6 h-6 sm:w-7 sm:h-7', text: 'text-base sm:text-lg md:text-xl', badge: 'text-[7px] sm:text-[8px]' },
    md: { icon: 'w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9', text: 'text-lg sm:text-2xl md:text-3xl', badge: 'text-[8px]' },
    lg: { icon: 'w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12', text: 'text-2xl sm:text-3xl md:text-4xl', badge: 'text-[9px]' },
    xl: { icon: 'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16', text: 'text-3xl sm:text-4xl md:text-5xl', badge: 'text-[10px]' }
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-1.5 sm:gap-2.5 md:gap-3 group shrink-0 min-w-0 ${className}`}>
      <AuraLogoIcon sizeClass={currentSize.icon} />

      {showText && (
        <div className="flex items-baseline tracking-tight whitespace-nowrap min-w-0">
          <span className={`font-display font-black tracking-tighter text-white uppercase group-hover:text-slate-200 transition-colors ${currentSize.text}`}>
            AURA<span className="text-[#059669]">.</span>PK
          </span>
          {showBadge && (
            <span className={`ml-1 hidden sm:inline-block font-black uppercase tracking-[0.2em] text-[#059669] bg-[#059669]/10 border border-[#059669]/40 px-1.5 py-0.5 rounded ${currentSize.badge}`}>
              OFFICIAL
            </span>
          )}
        </div>
      )}
    </div>
  );
};
