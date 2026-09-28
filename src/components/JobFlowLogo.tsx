import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Copy, Check } from 'lucide-react';
import brandLogoLightImg from '../assets/images/jobflow_brand_logo_1790580621472.jpg';
import brandLogoBlackImg from '../assets/images/jobflow_logo_black_bg_1790581013885.jpg';

export const JOBFLOW_BLACK_BG_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <defs>
    <linearGradient id="jfGlow" x1="8" y1="56" x2="56" y2="8" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#6366F1" />
      <stop offset="52%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#06B6D4" />
    </linearGradient>
    <linearGradient id="jfBorder" x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#6366F1" stop-opacity="0.75" />
      <stop offset="100%" stop-color="#06B6D4" stop-opacity="0.45" />
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="16" fill="#05060A" />
  <rect x="2" y="2" width="60" height="60" rx="14" fill="#05060A" stroke="url(#jfBorder)" stroke-width="2" />
  <path d="M16 44C23 44 28 39 31 33C34 27 39 22 47 22" stroke="url(#jfGlow)" stroke-width="5.5" stroke-linecap="round" />
  <path d="M38 15L47 22L38 29" stroke="url(#jfGlow)" stroke-width="4.8" stroke-linecap="round" stroke-linejoin="round" />
  <circle cx="19" cy="22" r="4" fill="#8B5CF6" />
  <circle cx="45" cy="42" r="4" fill="#06B6D4" />
</svg>`;

export const JOBFLOW_GRADIENT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <defs>
    <linearGradient id="jfPrimary" x1="6" y1="58" x2="58" y2="6" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#6366F1" />
      <stop offset="55%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#06B6D4" />
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="16" fill="#05060A" />
  <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#jfPrimary)" />
  <path d="M18 44C24.5 44 29 39.5 31.5 34C34 28.5 38.5 24 46 24" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" />
  <path d="M38 18L46 24L38 30" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
  <circle cx="20" cy="22" r="4" fill="#FFFFFF" fill-opacity="0.92" />
  <circle cx="44" cy="42" r="3.5" fill="#06B6D4" stroke="#FFFFFF" stroke-width="2" />
</svg>`;

interface JobFlowLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  variant?: 'black' | 'gradient';
  className?: string;
}

export const JobFlowLogo: React.FC<JobFlowLogoProps> = ({
  size = 'md',
  showWordmark = true,
  variant = 'black',
  className = '',
}) => {
  const iconDimensions =
    size === 'sm'
      ? 'w-7 h-7'
      : size === 'lg'
      ? 'w-11 h-11'
      : size === 'xl'
      ? 'w-16 h-16'
      : 'w-8 h-8';

  const textSize =
    size === 'sm'
      ? 'text-lg'
      : size === 'lg'
      ? 'text-2xl'
      : size === 'xl'
      ? 'text-3xl'
      : 'text-xl';

  return (
    <span className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {variant === 'black' ? (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          className={`${iconDimensions} shrink-0 drop-shadow-xs`}
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="jfBlackGlow"
              x1="8"
              y1="56"
              x2="56"
              y2="8"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="52%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient
              id="jfBlackBorder"
              x1="4"
              y1="4"
              x2="60"
              y2="60"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.45" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="16" fill="#05060A" />
          <rect
            x="2"
            y="2"
            width="60"
            height="60"
            rx="14"
            fill="#05060A"
            stroke="url(#jfBlackBorder)"
            strokeWidth="2"
          />
          <path
            d="M16 44C23 44 28 39 31 33C34 27 39 22 47 22"
            stroke="url(#jfBlackGlow)"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <path
            d="M38 15L47 22L38 29"
            stroke="url(#jfBlackGlow)"
            strokeWidth="4.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="19" cy="22" r="4" fill="#8B5CF6" />
          <circle cx="45" cy="42" r="4" fill="#06B6D4" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          className={`${iconDimensions} shrink-0 drop-shadow-xs`}
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="jfLogoGrad"
              x1="6"
              y1="58"
              x2="58"
              y2="6"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="55%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="16" fill="#05060A" />
          <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#jfLogoGrad)" />
          <path
            d="M18 44C24.5 44 29 39.5 31.5 34C34 28.5 38.5 24 46 24"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M38 18L46 24L38 30"
            stroke="#FFFFFF"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="22" r="4" fill="#FFFFFF" fillOpacity="0.92" />
          <circle
            cx="44"
            cy="42"
            r="3.5"
            fill="#06B6D4"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
        </svg>
      )}
      {showWordmark && (
        <span className={`${textSize} font-extrabold tracking-tight text-white`}>
          Job
          <span className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
            Flow
          </span>
        </span>
      )}
    </span>
  );
};

interface BrandLogoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandLogoModal: React.FC<BrandLogoModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedMode, setCopiedMode] = useState<'black' | 'gradient' | null>(
    null
  );
  const [blackImgError, setBlackImgError] = useState(false);
  const [lightImgError, setLightImgError] = useState(false);

  const handleCopySvg = (mode: 'black' | 'gradient') => {
    const code =
      mode === 'black' ? JOBFLOW_BLACK_BG_SVG : JOBFLOW_GRADIENT_SVG;
    navigator.clipboard?.writeText(code);
    setCopiedMode(mode);
    setTimeout(() => setCopiedMode(null), 2200);
  };

  const handleDownloadSvg = (mode: 'black' | 'gradient') => {
    const code =
      mode === 'black' ? JOBFLOW_BLACK_BG_SVG : JOBFLOW_GRADIENT_SVG;
    const blob = new Blob([code], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download =
      mode === 'black'
        ? 'jobflow-logo-black-bg.svg'
        : 'jobflow-logo-gradient.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-3xl bg-[#0D0F17] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto text-white"
          >
            <div className="flex items-start justify-between gap-4 pb-4 mb-6 border-b border-white/10">
              <div>
                <p className="text-xs font-semibold text-[#8B5CF6]">
                  Official Brand Identity & Asset Kit
                </p>
                <h2 className="text-xl font-extrabold text-white mt-0.5">
                  JobFlow — Black Background Brand Mark & SVG
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close logo modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* 1. BLACK BACKGROUND LOGO EDITION */}
              <div className="p-6 rounded-2xl bg-[#05060A] text-white border border-white/10 flex flex-col items-center justify-between text-center">
                <span className="text-xs font-semibold text-slate-400">
                  Pure Black Background Logo (#05060A)
                </span>

                <div className="my-5 flex items-center justify-center gap-4">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center bg-[#05060A]">
                    {!blackImgError ? (
                      <img
                        src={brandLogoBlackImg}
                        alt="JobFlow Black Background Logo"
                        referrerPolicy="no-referrer"
                        onError={() => setBlackImgError(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <JobFlowLogo size="xl" variant="black" showWordmark={false} />
                    )}
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <JobFlowLogo size="xl" variant="black" showWordmark={false} />
                    <span className="text-[11px] font-mono text-slate-400">
                      Vector SVG
                    </span>
                  </div>
                </div>

                <div className="w-full flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownloadSvg('black')}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Black-BG Vector (.SVG)</span>
                  </button>
                  <a
                    href={brandLogoBlackImg}
                    download="jobflow-logo-black-bg.jpg"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-200 bg-[#131622] hover:bg-[#1A1E2E] border border-white/10 rounded-xl transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-[#06B6D4]" />
                    <span>Download Black-BG 8K Icon (.JPG)</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopySvg('black')}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-transparent border border-white/10 rounded-xl transition-colors cursor-pointer"
                  >
                    {copiedMode === 'black' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#10B981]" />
                        <span className="text-[#10B981]">Copied Black SVG!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Black-BG SVG Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 2. GRADIENT EMBLEM ON BLACK CANVAS */}
              <div className="p-6 rounded-2xl bg-[#05060A] border border-white/10 flex flex-col items-center justify-between text-center">
                <span className="text-xs font-semibold text-slate-400">
                  Indigo-Violet Emblem on Black Canvas
                </span>

                <div className="my-5 flex items-center justify-center gap-4">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#05060A] border border-white/10 shadow-xs flex items-center justify-center">
                    {!lightImgError ? (
                      <img
                        src={brandLogoLightImg}
                        alt="JobFlow Emblem"
                        referrerPolicy="no-referrer"
                        onError={() => setLightImgError(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <JobFlowLogo size="xl" variant="gradient" showWordmark={false} />
                    )}
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <JobFlowLogo size="xl" variant="gradient" showWordmark={false} />
                    <span className="text-[11px] font-mono text-slate-400">
                      Gradient SVG
                    </span>
                  </div>
                </div>

                <div className="w-full flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownloadSvg('gradient')}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#131622] hover:bg-[#1A1E2E] border border-white/10 rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Gradient Vector (.SVG)</span>
                  </button>
                  <a
                    href={brandLogoLightImg}
                    download="jobflow-logo-emblem.jpg"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-200 bg-[#131622] hover:bg-[#1A1E2E] border border-white/10 rounded-xl transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-[#6366F1]" />
                    <span>Download 8K Emblem (.JPG)</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopySvg('gradient')}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-transparent border border-white/10 rounded-xl transition-colors cursor-pointer"
                  >
                    {copiedMode === 'gradient' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#10B981]" />
                        <span className="text-[#10B981]">Copied SVG!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Gradient SVG Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
