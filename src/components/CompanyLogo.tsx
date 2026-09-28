import React from 'react';

interface CompanyLogoProps {
  company: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({ company, size = 'md' }) => {
  const normalized = company.trim().toLowerCase();

  const dimensions =
    size === 'sm'
      ? 'w-8 h-8 text-xs rounded-lg'
      : size === 'lg'
      ? 'w-12 h-12 text-base rounded-xl'
      : 'w-10 h-10 text-sm rounded-xl';

  if (normalized.includes('google')) {
    return (
      <div
        className={`${dimensions} bg-[#131622] border border-white/10 flex items-center justify-center shrink-0 shadow-2xs`}
        aria-label="Google logo"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <path
            d="M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.5c-.2 1.2-1 2.3-2.1 3v2.5h3.4c2-1.8 3-4.5 3-7.3z"
            fill="#4285F4"
          />
          <path
            d="M12 22c2.7 0 5-.9 6.7-2.4l-3.4-2.5c-.9.6-2 .9-3.3.9-2.5 0-4.7-1.7-5.5-4H3v2.6C4.7 19.9 8.1 22 12 22z"
            fill="#34A853"
          />
          <path
            d="M6.5 14c-.2-.6-.3-1.3-.3-2s.1-1.4-.3-2V7.4H3C2.4 8.8 2 10.3 2 12s.4 3.2 1 4.6L6.5 14z"
            fill="#FBBC05"
          />
          <path
            d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9C16.9 3 14.7 2 12 2 8.1 2 4.7 4.1 3 7.4L6.5 10c.8-2.3 3-4 5.5-4z"
            fill="#EA4335"
          />
        </svg>
      </div>
    );
  }

  if (normalized.includes('microsoft')) {
    return (
      <div
        className={`${dimensions} bg-[#131622] border border-white/10 flex items-center justify-center shrink-0 shadow-2xs`}
        aria-label="Microsoft logo"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5">
          <rect x="3" y="3" width="8.5" height="8.5" fill="#F25022" rx="1" />
          <rect x="12.5" y="3" width="8.5" height="8.5" fill="#7FBA00" rx="1" />
          <rect x="3" y="12.5" width="8.5" height="8.5" fill="#00A4EF" rx="1" />
          <rect x="12.5" y="12.5" width="8.5" height="8.5" fill="#FFB900" rx="1" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('stripe')) {
    return (
      <div
        className={`${dimensions} bg-[#635BFF] text-white flex items-center justify-center shrink-0 font-bold tracking-tight`}
        aria-label="Stripe logo"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M13.9 10.3c0-1.1-.9-1.6-2.3-1.6-1.5 0-3.3.6-4.7 1.5V6.6c1.5-.7 3.2-1.1 4.9-1.1 3.8 0 6.1 1.9 6.1 5.3 0 5.2-7.1 4.3-7.1 6.6 0 .9.8 1.4 2.1 1.4 1.7 0 3.7-.7 5.2-1.7v3.7c-1.7.8-3.6 1.2-5.4 1.2-3.9 0-6.3-2-6.3-5.3 0-5.5 7.5-4.5 7.5-6.4z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('linear')) {
    return (
      <div
        className={`${dimensions} bg-[#090A10] border border-white/15 text-white flex items-center justify-center shrink-0`}
        aria-label="Linear logo"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" />
          <path d="M6 16L16 6M9 19L19 9M4.5 12.5L12.5 4.5" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('vercel')) {
    return (
      <div
        className={`${dimensions} bg-[#090A10] border border-white/15 text-white flex items-center justify-center shrink-0`}
        aria-label="Vercel logo"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M12 4L21 19.5H3L12 4Z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('razorpay')) {
    return (
      <div
        className={`${dimensions} bg-[#072654] border border-white/10 text-[#3395FF] flex items-center justify-center shrink-0`}
        aria-label="Razorpay logo"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M14.8 4L8.2 14.2H12.5L9.5 20L17.8 9.8H13.2L14.8 4Z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('atlassian')) {
    return (
      <div
        className={`${dimensions} bg-[#0052CC] text-white flex items-center justify-center shrink-0`}
        aria-label="Atlassian logo"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M8.7 11.4c-.4-.5-1-.4-1.3.1L4.1 18c-.3.6.1 1.3.8 1.3h4.6c.4 0 .8-.2.9-.6 1-2.2.4-5.4-1.7-7.3zm4.5-6.6c-.4-.7-1.3-.7-1.7 0L6.8 14l3.5 4.7c.2.4.6.6 1 .6h5.5c.7 0 1.1-.7.8-1.3L13.2 4.8z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('figma')) {
    return (
      <div
        className={`${dimensions} bg-[#131622] border border-white/10 text-white flex items-center justify-center shrink-0`}
        aria-label="Figma logo"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5">
          <path d="M8.5 5A2.5 2.5 0 0111 2.5h1v5h-1A2.5 2.5 0 018.5 5z" fill="#F24E1E" />
          <path d="M12 2.5h1A2.5 2.5 0 0115.5 5 2.5 2.5 0 0113 7.5h-1v-5z" fill="#FF7262" />
          <circle cx="13.7" cy="10" r="2.5" fill="#1ABCFE" />
          <path d="M8.5 10A2.5 2.5 0 0111 7.5h1v5h-1A2.5 2.5 0 018.5 10z" fill="#A259FF" />
          <path d="M8.5 15A2.5 2.5 0 0111 12.5h1V15a2.5 2.5 0 01-5 0z" fill="#0ACF83" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('notion')) {
    return (
      <div
        className={`${dimensions} bg-[#131622] border border-white/15 text-white flex items-center justify-center shrink-0 font-mono font-bold`}
        aria-label="Notion logo"
      >
        N
      </div>
    );
  }

  if (normalized.includes('cred')) {
    return (
      <div
        className={`${dimensions} bg-[#090A10] text-amber-400 border border-white/15 flex items-center justify-center shrink-0 font-bold tracking-wider`}
        aria-label="CRED logo"
      >
        C
      </div>
    );
  }

  const initials = company
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`${dimensions} bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-white font-semibold flex items-center justify-center shrink-0`}
      aria-label={`${company} logo`}
    >
      {initials || 'JF'}
    </div>
  );
};
