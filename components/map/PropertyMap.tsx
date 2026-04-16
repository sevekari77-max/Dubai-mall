'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isMobileDevice } from '@/lib/isMobile';
import { ChevronDown } from 'lucide-react';
import { ZONES } from '@/lib/data';
import type { Zone } from '@/lib/types';
import AnimatedCounter from '@/components/shared/AnimatedCounter';

export default function PropertyMap() {
  const [activeZone, setActiveZone] = useState<Zone>(ZONES[0]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isMobile = isMobileDevice();

  const handlePanelSwipe = (_: any, info: any) => {
    const threshold = 55;
    const currentIndex = ZONES.findIndex(z => z.id === activeZone.id);
    if (info.offset.x < -threshold && currentIndex < ZONES.length - 1) {
      setActiveZone(ZONES[currentIndex + 1]);
    } else if (info.offset.x > threshold && currentIndex > 0) {
      setActiveZone(ZONES[currentIndex - 1]);
    }
  };

  return (
    <section className="relative bg-black overflow-hidden" id="map" style={{ minHeight: '100vh' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-16 md:pb-28 relative z-10">
        {isMobile ? (
          <div className="mb-16">
            <p className="text-amber-400/40 text-xs tracking-[0.6em] uppercase mb-5">
              Explore the Destination
            </p>
            <h2
              className="text-white font-light"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 6rem)', letterSpacing: '-0.03em' }}
            >
              The world in one address.
            </h2>
            <p className="text-white/35 mt-4 max-w-md text-base md:text-lg" style={{ lineHeight: 1.85 }}>
              5.9 million square feet. Five distinct worlds. Select a zone to explore.
            </p>
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mb-16"
            >
              <p className="text-amber-400/40 text-xs tracking-[0.6em] uppercase mb-5">
                Explore the Destination
              </p>
              <h2
                className="text-white font-light"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 6rem)', letterSpacing: '-0.03em' }}
              >
                The world in one address.
              </h2>
              <p className="text-white/35 mt-4 max-w-md text-base md:text-lg" style={{ lineHeight: 1.85 }}>
                5.9 million square feet. Five distinct worlds. Select a zone to explore.
              </p>
            </motion.div>

            <div className="block lg:hidden mb-4">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-full flex items-center justify-between px-5 border text-left min-h-[52px]"
                style={{
                  borderColor: `${activeZone.accentColor}40`,
                  background: 'rgba(255,255,255,0.03)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-0.5 h-5 flex-shrink-0" style={{ background: activeZone.accentColor }} />
                  <span className="text-white/75 text-sm font-light">{activeZone.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/30 text-xs tracking-widest uppercase">Change zone</span>
                  <motion.div animate={{ rotate: mobileOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={14} className="text-white/30" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {mobileOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                    style={{ border: '1px solid rgba(255,255,255,0.05)', borderTop: 'none' }}
                  >
                    {ZONES.map((zone, i) => (
                      <button
                        key={zone.id}
                        onClick={() => {
                          setActiveZone(zone);
                          setMobileOpen(false);
                        }}
                        className={`w-full text-left px-5 border-b flex items-center gap-3 transition-all duration-300 min-h-[52px] ${
                          activeZone.id === zone.id ? 'bg-white/[0.04]' : 'active:bg-white/[0.03]'
                        }`}
                        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                      >
                        <div
                          className="w-0.5 h-5 flex-shrink-0"
                          style={{
                            background: activeZone.id === zone.id ? zone.accentColor : 'transparent',
                          }}
                        />
                        <div className="flex-1">
                          <div
                            className="text-sm font-light transition-colors duration-300"
                            style={{
                              color:
                                activeZone.id === zone.id ? '#fff' : 'rgba(255,255,255,0.45)',
                            }}
                          >
                            {zone.name}
                          </div>
                          <div className="text-white/60 text-sm md:text-base leading-relaxed mt-0.5">{zone.area}</div>
                        </div>
                        {activeZone.id === zone.id && (
                          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                            <path d="M0 4.5H8M4 1L8 4.5L4 8" stroke={zone.accentColor} strokeWidth="1.2" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-px">
              <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
                {ZONES.map((zone, i) => (
                  <motion.button
                    key={zone.id}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setActiveZone(zone)}
                    className={`w-full text-left px-6 py-5 border-b transition-all duration-300 flex items-center gap-4 ${
                      activeZone.id === zone.id ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'
                    }`}
                    style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                  >
                    <motion.div
                      className="w-0.5 self-stretch flex-shrink-0"
                      animate={{
                        background: activeZone.id === zone.id ? zone.accentColor : 'transparent',
                      }}
                      transition={{ duration: 0.4 }}
                      style={{ minHeight: 38 }}
                    />
                    <div className="flex-1">
                      <div
                        className="text-xs tracking-widest uppercase mb-1 font-light transition-colors duration-400"
                        style={{
                          color:
                            activeZone.id === zone.id
                              ? zone.accentColor
                              : 'rgba(255,255,255,0.18)',
                        }}
                      >
                        0{i + 1}
                      </div>
                      <div
                        className="text-sm font-light transition-colors duration-400 mb-0.5"
                        style={{
                          color:
                            activeZone.id === zone.id
                              ? '#fff'
                              : 'rgba(255,255,255,0.55)',
                        }}
                      >
                        {zone.name}
                      </div>
                      <div className="text-white/25 text-xs">{zone.area}</div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <motion.div
                className="lg:col-span-8 xl:col-span-9 relative overflow-hidden"
                style={{ minHeight: '520px' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={handlePanelSwipe}
              >
                <AnimatePresence mode="wait">
                  <ZonePanel key={activeZone.id} zone={activeZone} />
                </AnimatePresence>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function ZonePanel({ zone }: { zone: Zone }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${zone.image})`,
          filter: 'brightness(0.18) saturate(0.65)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(0,0,0,0.99) 0%, rgba(0,0,0,0.72) 50%, rgba(0,0,0,0.15) 100%)',
        }}
      />

      <div
        className="relative z-10 p-6 md:p-10 lg:p-14 flex flex-col h-full justify-between"
        style={{ minHeight: '480px' }}
      >
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.8 }}
            className="text-white font-light leading-tight mb-5"
          >
            {zone.tagline}
          </motion.h3>
        </div>
      </div>
    </motion.div>
  );
}