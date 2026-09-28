import React, { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  decimals = 0,
  suffix = '',
  prefix = '',
  duration = 950,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const previousValueRef = useRef<number>(0);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      previousValueRef.current = value;
      return;
    }

    const startValue = previousValueRef.current;
    const delta = value - startValue;
    const startTime = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth cubic-bezier style easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = startValue + delta * eased;
      setDisplayValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setDisplayValue(value);
        previousValueRef.current = value;
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [value, duration]);

  return (
    <span className={`font-mono tabular-nums ${className}`}>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
};
