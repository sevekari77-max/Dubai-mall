'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isMobileDevice } from '@/lib/isMobile';
import { ArrowRight, Compass } from 'lucide-react';
import type { UserPath } from '@/lib/types';

const PATHS: {
  id: UserPath;
  num: string;
  label: string;
  kicker: string;
  description: string;
  stat: string;
  statLabel: string;
  image: string;
  color: string;
}[] = [
  {
    id: 'retail',
    num: '01',
    label: 'Opening a Retail Space',
    kicker: 'Your flagship, at the world\'s most visited address.',
    description: 'Discover the available spaces, understand who shops here, and see what a presence at Dubai Mall means for your brand.',
    stat: '105M',
    statLabel: 'Visitors each year',
    image: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: '#D4AF37',
  },
  {
    id: 'sponsor',
    num: '02',
    label: 'Promoting a Brand',
    kicker: 'Reach millions — in this building and beyond.',
    description: 'Explore sponsorship formats, advertising platforms and brand activations that connect you with a truly global audience.',
    stat: '2.1B',
    statLabel: 'Global impressions each year',
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: '#60A5FA',
  },
  {
    id: 'event',
    num: '03',
    label: 'Hosting an Event',
    kicker: 'Every scale. Every format. One exceptional venue.',
    description: 'From intimate gatherings to landmark spectacles — explore how Dubai Mall can bring your vision to life.',
    stat: '500+',
    statLabel: 'Events staged every year',
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: '#F87171',
  },
];

interface PathSelectorProps {
  onSelect: (path: UserPath) => void;
}

export default function PathSelector({ onSelect }: PathSelectorProps) {
  const [hovered, setHovered] = useState<UserPath | null>(null);
  const [selected, setSelected] = useState<UserPath | null>(null);

  const handleSelect = (id: UserPath) => {
    setSelected(id);
    setTimeout(() => onSelect(id), 700);
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 bg-black flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.985 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="relative z-10 text-center pt-14 pb-8 px-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-amber-400/40 text-xs tracking-[0.65em] uppercase mb-4">Welcome to Dubai Mall</p>
        <h2
          className="text-white font-light mb-2"
          style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)', letterSpacing: '-0.025em' }}
        >
          What brings you here?
        </h2>
        <p className="text-white/60 text-sm md:text-base font-normal leading-relaxed">
          Select what describes you best — your experience will be tailored accordingly
        </p>
      </motion.div>

      <div className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-3 gap-px min-h-0 overflow-y-auto md:overflow-visible">
        {PATHS.map((path, i) => {
          const isActive = hovered === path.id || selected === path.id;
          const isDimmed = (selected !== null && selected !== path.id) ||
                           (hovered !== null && hovered !== path.id && selected === null);

          return (
            <motion.button
              key={path.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{
                opacity: isDimmed ? 0.28 : 1,
                y: 0,
              }}
              transition={{
                opacity: { duration: 0.45 },
                y: { delay: 0.35 + i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              }}
              onHoverStart={() => setHovered(path.id)}
              onHoverEnd={() => setHovered(null)}
              onTapStart={() => setHovered(path.id)}
              onClick={() => handleSelect(path.id)}
              whileTap={{ scale: 0.99 }}
              className="relative overflow-hidden text-left flex flex-col cursor-pointer select-none"
              aria-label={`Select ${path.label}`}
            >
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${path.image})` }}
                animate={{
                  filter: isActive ? 'brightness(0.38) saturate(1.1)' : 'brightness(0.1) saturate(0.5)',
                  scale: isActive ? 1.04 : 1,
                }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />

              <div
                className="absolute inset-0"
                style={{
                  background: isActive
                    ? 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.1) 100%)'
                    : 'linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.65) 100%)',
                  transition: 'background 0.6s ease',
                }}
              />

              <motion.div
                className="absolute bottom-0 left-0 right-0"
                animate={{ height: isActive ? 2 : 0 }}
                transition={{ duration: 0.4 }}
                style={{ background: path.color }}
              />

              {selected === path.id && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="w-12 h-12 border-2 flex items-center justify-center"
                    style={{ borderColor: path.color }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3 9L7.5 13.5L15 5" stroke={path.color} strokeWidth="1.8" />
                    </svg>
                  </div>
                </motion.div>
              )}

              <div
                className="relative z-10 flex flex-col justify-between flex-1 p-6 md:p-10 lg:p-12"
                style={{ minHeight: 'clamp(200px, 28vh, 38vh)' }}
              >
                <div>
                  <span
                    className="text-xs tracking-[0.5em] uppercase font-light transition-colors duration-500"
                    style={{ color: isActive ? path.color : 'rgba(255,255,255,0.18)' }}
                  >
                    {path.num}
                  </span>

                  <motion.div
                    className="mt-5 mb-6"
                    animate={{ width: isActive ? 44 : 20 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ height: 1, background: path.color }}
                  />

                  <h3
                    className="text-white font-light leading-none mb-3"
                    style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', letterSpacing: '-0.02em' }}
                  >
                    {path.label}
                  </h3>

                  <p
                    className="text-white/40 text-xs leading-relaxed mb-2"
                    style={{ maxWidth: '28ch' }}
                  >
                    {path.description}
                  </p>

                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 0.6, y: 0 }}
                        exit={{ opacity: 0, y: 3 }}
                        transition={{ duration: 0.4 }}
                        className="text-white text-sm leading-relaxed italic"
                        style={{ maxWidth: '28ch', color: path.color }}
                      >
                        {path.kicker}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex items-end justify-between mt-10">
                  <div>
                    <div
                      className="font-light leading-none"
                      style={{ fontSize: 'clamp(2.8rem, 6vw, 6rem)', color: path.color }}
                    >
                      {path.stat}
                    </div>
                    <div className="text-white/30 text-xs tracking-widest uppercase mt-2">{path.statLabel}</div>
                  </div>

                  <motion.div
                    className="flex items-center gap-2 text-xs tracking-widest uppercase font-light"
                    animate={{ color: isActive ? path.color : 'rgba(255,255,255,0.22)' }}
                    transition={{ duration: 0.4 }}
                  >
                    <span>This is me</span>
                    <ArrowRight size={12} strokeWidth={1.5} />
                  </motion.div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        className="relative z-10 border-t py-4 px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <p className="text-white/15 text-xs tracking-[0.3em] uppercase order-2 sm:order-1">
          Select one above &nbsp;&bull;&nbsp; You can change this at any time
        </p>
        <motion.button
          onClick={() => handleSelect('explore')}
          whileTap={{ scale: 0.97 }}
          className="order-1 sm:order-2 flex items-center gap-3 px-5 py-3 group transition-all duration-300 min-h-[48px]"
          style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)' }}
          whileHover={{ borderColor: 'rgba(163,163,163,0.4)', color: 'rgba(255,255,255,0.65)' } as any}
          animate={selected === 'explore' ? { borderColor: '#A3A3A3', color: '#A3A3A3' } as any : {}}
        >
          <Compass size={13} strokeWidth={1.5} />
          <span className="text-xs tracking-[0.3em] uppercase font-light">I&apos;d prefer to explore everything first</span>
          <ArrowRight size={11} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform duration-300" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
