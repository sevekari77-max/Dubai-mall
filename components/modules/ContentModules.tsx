'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { CONTENT_MODULES, PATH_CONFIG } from '@/lib/data';
import type { UserPath } from '@/lib/types';
import AnimatedCounter from '@/components/shared/AnimatedCounter';

interface ContentModulesProps {
  userPath: UserPath;
}

export default function ContentModules({ userPath }: ContentModulesProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const modules =
    userPath === 'explore'
      ? CONTENT_MODULES
      : CONTENT_MODULES.filter((m) => m.relevantFor.includes(userPath));

  const [activeIndex, setActiveIndex] = useState(0);
  const pathConfig = PATH_CONFIG[userPath];
  const active = modules[activeIndex];

  if (!active) return null;

  return (
    <section className="relative bg-black overflow-hidden" id="modules" style={{ minHeight: '100vh' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          className="absolute inset-0"
          {...(!isMobile && {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: { duration: 0.6, ease: 'easeInOut' },
          })}
          style={{
            backgroundImage: `url(${active.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.12) saturate(0.45)',
          }}
        />
      </AnimatePresence>

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(0,0,0,0.98) 30%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.25) 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-16 md:pb-28 flex flex-col" style={{ minHeight: '100vh' }}>
        
        {/* HEADER */}
        <motion.div
          className="mb-14"
          {...(!isMobile && {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          })}
        >
          <p className="text-xs tracking-[0.6em] uppercase mb-5 font-light" style={{ color: pathConfig.color, opacity: 0.7 }}>
            The Opportunity
          </p>
          <h2
            className="text-white font-light"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 6rem)', letterSpacing: '-0.03em' }}
          >
            Why here. Why now.
          </h2>
          <p className="text-white/30 mt-3 text-sm">
            {modules.length} insight{modules.length !== 1 ? 's' : ''} tailored to your path — select any to explore
          </p>
        </motion.div>

        {/* MOBILE TABS */}
        <div className="flex gap-2 flex-wrap mb-8 lg:hidden">
          {modules.map((mod, i) => (
            <button
              key={mod.id}
              onClick={() => setActiveIndex(i)}
              className="px-4 text-xs tracking-widest uppercase font-light transition-all duration-300 min-h-[44px]"
              style={{
                background: i === activeIndex ? pathConfig.color : 'rgba(255,255,255,0.05)',
                color: i === activeIndex ? '#000' : 'rgba(255,255,255,0.45)',
                border: `1px solid ${i === activeIndex ? pathConfig.color : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              {mod.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 flex-1">
          
          {/* SIDEBAR */}
          <div className="hidden lg:block lg:col-span-3 border-r" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            {modules.map((mod, i) => (
              <button
                key={mod.id}
                onClick={() => setActiveIndex(i)}
                className={`w-full text-left px-6 py-5 border-b ${
                  i === activeIndex ? 'bg-white/[0.045]' : 'hover:bg-white/[0.02]'
                }`}
                style={{ borderColor: 'rgba(255,255,255,0.05)' }}
              >
                <motion.div
                  className="h-px mb-3"
                  {...(!isMobile && {
                    animate: { width: i === activeIndex ? 36 : 14, background: pathConfig.color },
                    transition: { duration: 0.4 },
                  })}
                />
                <div className="text-xs tracking-widest uppercase mb-1.5 font-light">
                  0{i + 1}
                </div>
                <div className="flex justify-between">
                  <span>{mod.title}</span>
                  {i === activeIndex && <ChevronRight size={12} />}
                </div>
              </button>
            ))}
          </div>

          {/* MAIN PANEL */}
          <motion.div
            className="lg:col-span-9"
            {...(!isMobile && {
              drag: 'x',
              dragConstraints: { left: 0, right: 0 },
              dragElastic: 0.1,
              onDragEnd: (_: any, info: any) => {
                if (info.offset.x < -55 && activeIndex < modules.length - 1) setActiveIndex((i) => i + 1);
                else if (info.offset.x > 55 && activeIndex > 0) setActiveIndex((i) => i - 1);
              },
            })}
          >
            <AnimatePresence mode="wait">
              <ModulePanel module={active} accentColor={pathConfig.color} isMobile={isMobile} />
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ModulePanel({
  module: mod,
  accentColor,
  isMobile,
}: {
  module: (typeof CONTENT_MODULES)[0];
  accentColor: string;
  isMobile: boolean;
}) {
  return (
    <motion.div
      className="flex flex-col h-full p-6 md:p-14"
      style={{ minHeight: '480px' }}
      {...(!isMobile && {
        initial: { opacity: 0, x: 14 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -14 },
        transition: { duration: 0.55 },
      })}
    >
      <div className="flex-1">
        <h3 className="text-white font-light mb-6">{mod.headline}</h3>
        <p className="text-white/50">{mod.subtext}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 mt-10 border-t">
        {mod.stats.map((stat) => (
          <div key={stat.label}>
            <div style={{ color: accentColor }}>
              <AnimatedCounter value={stat.value} prefix={stat.prefix} />
            </div>
            <div className="text-white/30 text-xs">{stat.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}