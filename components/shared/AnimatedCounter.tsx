'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { isMobileDevice } from '@/lib/isMobile';

interface AnimatedCounterProps {
  value: string;
  prefix?: string;
  className?: string;
  duration?: number;
}

export default function AnimatedCounter({ value, prefix = '', className = '', duration = 2000 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const el = ref.current;
    if (!el) return;

    const numeric = parseFloat(value.replace(/[^0-9.]/g, ''));
    const suffix = value.replace(/[0-9.,]/g, '');
    if (isNaN(numeric)) { el.textContent = prefix + value; return; }

    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numeric * eased;
      const formatted = current >= 1000
        ? (current / 1000).toFixed(1).replace(/\.0$/, '') + (suffix.includes('M') || suffix.includes('B') ? suffix : 'K')
        : current.toFixed(suffix.includes('%') || suffix.includes('x') ? 1 : 0) + suffix;
      el.textContent = prefix + formatted;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + value;
    };
    requestAnimationFrame(tick);
  }, [isInView, value, duration, prefix]);

  return (
    <span ref={ref} className={className}>
      {prefix}{value}
    </span>
  );
}
