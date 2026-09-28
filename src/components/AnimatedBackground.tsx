import React from 'react';

export const AnimatedBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#05060A]"
      aria-hidden="true"
    >
      {/* Pure Obsidian Black Canvas */}
      <div className="absolute inset-0 bg-[#05060A]" />

      {/* Subtle architectural dot grid mesh on black */}
      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(139, 92, 246, 0.22) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Slowly moving Indigo/Violet top-left gradient orb */}
      <div className="animate-orb-slow absolute -top-36 -left-28 w-[560px] h-[560px] rounded-full bg-gradient-to-br from-[#6366F1]/[0.16] via-[#8B5CF6]/[0.11] to-transparent blur-3xl" />

      {/* Slowly moving Cyan/Pink bottom-right gradient orb */}
      <div className="animate-orb-reverse absolute top-[32%] -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-[#06B6D4]/[0.13] via-[#EC4899]/[0.09] to-transparent blur-3xl" />

      {/* Soft bottom-left Violet/Emerald ambient glow */}
      <div className="animate-orb-slow absolute -bottom-40 left-[18%] w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-[#A855F7]/[0.12] via-[#10B981]/[0.08] to-transparent blur-3xl" />
    </div>
  );
};
