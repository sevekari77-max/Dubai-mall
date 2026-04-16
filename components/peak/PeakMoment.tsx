'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { isMobileDevice } from '@/lib/isMobile';
import AnimatedCounter from '@/components/shared/AnimatedCounter';

const STATS = [
  { value: '105M', label: 'Annual visitors', sub: 'More than any other mall on Earth' },
  { value: '2.1B', label: 'Global impressions each year', sub: 'Reaching audiences across 180 countries' },
  { value: 'AED 28B', label: 'Annual retail sales', sub: 'Generated within these walls' },
  { value: '4.2hrs', label: 'Average dwell time per visit', sub: '3× the global industry benchmark' },
];

export default function PeakMoment() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      ref={ref}
      className="relative bg-black overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={inView ? { scale: 1.02, opacity: 1 } : {}}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          filter: 'brightness(0.09) saturate(0.5)',
        }}
      />

      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.065) 0%, transparent 60%)' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.5) 100%)' }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-24 min-h-screen">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-center mb-6"
        >
          <p className="text-xs tracking-[0.7em] uppercase font-light" style={{ color: 'rgba(212,175,55,0.4)' }}>
            The scale of Dubai Mall
          </p>
        </motion.div>

        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
        >
          <h2
            className="text-white font-light leading-none"
            style={{ fontSize: 'clamp(2.6rem, 7vw, 7rem)', letterSpacing: '-0.04em' }}
          >
            Figures that define
          </h2>
          <h2
            className="font-light leading-none italic"
            style={{ fontSize: 'clamp(2.6rem, 7vw, 7rem)', letterSpacing: '-0.04em', color: '#D4AF37' }}
          >
            a category of one.
          </h2>
        </motion.div>

        <motion.div
          className="mb-20"
          initial={{ width: 0, opacity: 0 }}
          animate={inView ? { width: 64, opacity: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          style={{ height: 1, background: 'rgba(212,175,55,0.35)' }}
        />

        <div className="w-full max-w-6xl grid grid-cols-2 lg:grid-cols-4 gap-px">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col px-4 md:px-8 py-8 lg:py-14 group"
              style={{
                background: 'rgba(255,255,255,0.022)',
                borderTop: '1px solid rgba(212,175,55,0.12)',
              }}
            >
              <div
                className="font-light leading-none mb-5"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 6rem)', color: '#D4AF37', letterSpacing: '-0.035em' }}
              >
                {inView ? <AnimatedCounter value={stat.value} duration={2200} /> : <span>{stat.value}</span>}
              </div>
              <div className="text-white/65 text-sm font-light mb-2">{stat.label}</div>
              <div className="text-white/60 text-sm md:text-base leading-relaxed leading-relaxed">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 1.4 }}
          className="text-white/12 text-xs tracking-[0.4em] uppercase mt-16 text-center"
        >
          Emaar Properties &nbsp;&middot;&nbsp; Annual Report 2023 / 2024
        </motion.p>
      </div>
    </section>
  );
}
