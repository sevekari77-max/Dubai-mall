'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isMobileDevice } from '@/lib/isMobile';
import { ArrowRight } from 'lucide-react';
import type { UserPath } from '@/lib/types';
import EventsModule from './EventsModule';
import SponsorshipModule from './SponsorshipModule';
import LeasingModule from './LeasingModule';

interface SubModuleHubProps {
  userPath: UserPath;
}

const MODULES = {
  retail: [
    { id: 'leasing', label: 'Leasing Paths', hint: 'Luxury, Retail, F&B, Pop-Up', color: '#D4AF37' },
    { id: 'events', label: 'Events Platform', hint: 'Concerts, Fashion, Launches', color: '#EF4444' },
  ],
  sponsor: [
    { id: 'sponsorship', label: 'Sponsorship Tiers', hint: 'Digital to Full Takeover', color: '#3B82F6' },
    { id: 'events', label: 'Events Platform', hint: 'Concerts, Fashion, Launches', color: '#EF4444' },
  ],
  event: [
    { id: 'events', label: 'Events Platform', hint: 'Concerts, Fashion, Launches', color: '#EF4444' },
    { id: 'leasing', label: 'Space & Venues', hint: 'Pop-up & activation spaces', color: '#D4AF37' },
  ],
  explore: [
    { id: 'leasing', label: 'Leasing Paths', hint: 'Luxury, Retail, F&B, Pop-Up', color: '#D4AF37' },
    { id: 'sponsorship', label: 'Sponsorship Tiers', hint: 'Digital to Full Takeover', color: '#3B82F6' },
    { id: 'events', label: 'Events Platform', hint: 'Concerts, Fashion, Launches', color: '#EF4444' },
  ],
};

function ModuleContent({ moduleId }: { moduleId: string }) {
  if (moduleId === 'events') return <EventsModule />;
  if (moduleId === 'sponsorship') return <SponsorshipModule />;
  if (moduleId === 'leasing') return <LeasingModule />;
  return null;
}

export default function SubModuleHub({ userPath }: SubModuleHubProps) {
  const modules = MODULES[userPath];
  const [activeModule, setActiveModule] = useState<string | null>(null);

  return (
    <section className="relative bg-black pt-16 pb-16 md:py-24 px-6 md:px-10 overflow-hidden" id="submodules">
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.04) 0%, transparent 55%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {!activeModule ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs tracking-[0.6em] uppercase mb-5 font-light" style={{ color: 'rgba(212,175,55,0.5)' }}>
              Deep Dives
            </p>
            <h2
              className="text-white font-light mb-4"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 6rem)', letterSpacing: '-0.03em' }}
            >
              Explore in depth.
            </h2>
            <p className="text-white/30 mt-2 max-w-md text-sm mb-14" style={{ lineHeight: 1.85 }}>
              Select a module to explore the full capabilities built for your path.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {modules.map((mod, i) => (
                <motion.button
                  key={mod.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setActiveModule(mod.id)}
                  whileTap={{ scale: 0.98 }}
                  className="group relative text-left flex flex-col justify-between p-8 md:p-10 border overflow-hidden"
                  style={{ borderColor: 'rgba(255,255,255,0.06)', minHeight: 180 }}
                >
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    whileTap={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ background: `${mod.color}09` }}
                  />

                  <div>
                    <motion.div
                      className="h-px mb-6"
                      initial={{ width: 24 }}
                      whileHover={{ width: 48 }}
                      transition={{ duration: 0.4 }}
                      style={{ background: mod.color }}
                    />
                    <div className="text-xs tracking-widest uppercase mb-3 font-light" style={{ color: mod.color, opacity: 0.6 }}>
                      0{i + 1}
                    </div>
                    <h3
                      className="text-white font-light mb-3"
                      style={{ fontSize: '1.4rem', letterSpacing: '-0.02em' }}
                    >
                      {mod.label}
                    </h3>
                    <p className="text-white/30 text-sm">{mod.hint}</p>
                  </div>

                  <div className="flex items-center justify-between mt-8">
                    <div className="text-xs tracking-widest uppercase font-light group-hover:opacity-80 transition-opacity" style={{ color: mod.color, opacity: 0.5 }}>
                      Explore
                    </div>
                    <motion.div
                      className="w-8 h-8 flex items-center justify-center border"
                      style={{ borderColor: `${mod.color}30` }}
                      whileHover={{ borderColor: mod.color, x: 2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight size={12} style={{ color: mod.color }} />
                    </motion.div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-10">
              <button
                onClick={() => setActiveModule(null)}
                className="flex items-center gap-2 text-white/30 active:text-white/55 transition-colors text-xs tracking-widest uppercase group min-h-[48px]"
              >
                <svg width="20" height="8" viewBox="0 0 20 8" fill="none" className="transition-transform duration-300 group-hover:-translate-x-1">
                  <path d="M20 4H1M6 1L1 4L6 7" stroke="currentColor" strokeWidth="1" />
                </svg>
                <span>All Modules</span>
              </button>
              <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ModuleContent moduleId={activeModule} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
