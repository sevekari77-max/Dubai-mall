'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isMobileDevice } from '@/lib/isMobile';
import { X, RotateCcw, Shuffle } from 'lucide-react';
import type { UserPath } from '@/lib/types';
import { PATH_CONFIG } from '@/lib/data';

interface FloatingNavProps {
  userPath: UserPath;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onRestart: () => void;
  onChangePath: () => void;
}

const NAV_ITEMS = [
  { id: 'map', label: 'Explore', hint: 'Discover the zones' },
  { id: 'story', label: 'Our Story', hint: 'Why Dubai Mall is different' },
  { id: 'modules', label: 'Figures', hint: 'The numbers that matter' },
  { id: 'venues', label: 'Venues', hint: 'Signature spaces & settings' },
  { id: 'submodules', label: 'Opportunities', hint: 'Retail, events & sponsorship' },
  { id: 'simulator', label: 'Potential', hint: 'Estimate your reach & impact' },
  { id: 'cta', label: 'Contact', hint: 'Start a conversation with us' },
];

export default function FloatingNav({ userPath, activeSection, onSectionChange, onRestart, onChangePath }: FloatingNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathConfig = PATH_CONFIG[userPath];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const activeItem = NAV_ITEMS.find(n => n.id === activeSection);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-600"
        style={{
          padding: scrolled ? '12px 0' : '20px 0',
          background: scrolled ? 'rgba(0,0,0,0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : '1px solid transparent',
          willChange: 'background',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <button
            onClick={onRestart}
            className="flex items-center gap-3 group min-h-[48px]"
            title="Return to start"
          >
            <div
              className="w-4 h-4 border flex items-center justify-center transition-all duration-500 group-hover:border-amber-400/60"
              style={{ borderColor: 'rgba(212,175,55,0.35)' }}
            >
              <div className="w-1 h-1" style={{ background: '#D4AF37' }} />
            </div>
            <span
              className="text-xs tracking-[0.4em] uppercase font-light transition-colors duration-400 group-hover:text-white/60"
              style={{ color: 'rgba(255,255,255,0.38)' }}
            >
              Dubai Mall
            </span>
          </button>

          <div className="hidden md:flex items-center">
            <div
              className="flex items-center gap-0.5 p-1"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              {NAV_ITEMS.map(item => (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => onSectionChange(item.id)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="relative px-4 py-1.5 text-xs tracking-[0.18em] uppercase font-light transition-colors duration-300"
                    style={{
                      color: activeSection === item.id ? '#000' : 'rgba(255,255,255,0.45)',
                    }}
                    aria-label={`Go to ${item.label} — ${item.hint}`}
                  >
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0"
                        style={{ background: pathConfig.color }}
                        transition={{ type: 'spring', bounce: 0.15, duration: 0.45 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>

                  <AnimatePresence>
                    {hoveredItem === item.id && activeSection !== item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 text-xs whitespace-nowrap pointer-events-none"
                        style={{
                          background: 'rgba(10,10,10,0.95)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: 'rgba(255,255,255,0.55)',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {item.hint}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: pathConfig.color }}
                />
                <span
                  className="text-xs tracking-[0.3em] uppercase font-light"
                  style={{ color: pathConfig.color, opacity: 0.75 }}
                >
                  {pathConfig.label}
                </span>
              </div>
              <button
                onClick={onChangePath}
                title="Switch your path"
                className="flex items-center gap-1.5 px-2.5 py-1 transition-all duration-300 group"
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.32)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = `${pathConfig.color}55`;
                  (e.currentTarget as HTMLButtonElement).style.color = pathConfig.color;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.32)';
                }}
              >
                <Shuffle size={10} strokeWidth={1.5} />
                <span className="text-xs tracking-[0.25em] uppercase font-light">Switch Profile</span>
              </button>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 -mr-1"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <motion.div
                className="w-5 h-px bg-white/60"
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 3.5 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="w-5 h-px bg-white/60"
                animate={{ opacity: menuOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="w-5 h-px bg-white/60"
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -3.5 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile bottom section indicator */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
          padding: '16px 20px 12px',
        }}
      >
        <div className="flex items-center justify-center gap-2">
          <div className="w-1 h-1 rounded-full" style={{ background: pathConfig.color }} />
          <AnimatePresence mode="wait">
            <motion.span
              key={activeSection}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="text-xs tracking-[0.35em] uppercase font-light"
              style={{ color: 'rgba(255,255,255,0.38)' }}
            >
              {activeItem?.label ?? ''}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col md:hidden"
            style={{ background: 'rgba(0,0,0,0.98)' }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center text-white/40 active:text-white/70 transition-colors"
              aria-label="Close menu"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <div className="absolute top-5 left-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: pathConfig.color }} />
              <span className="text-xs tracking-widest uppercase font-light" style={{ color: pathConfig.color, opacity: 0.75 }}>
                {pathConfig.label}
              </span>
            </div>

            <p className="absolute top-16 left-0 right-0 text-center text-white/18 text-xs tracking-[0.3em] uppercase">
              Jump to
            </p>

            <div className="flex-1 flex flex-col items-center justify-center gap-1 pt-12">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.055, ease: [0.16, 1, 0.3, 1], duration: 0.45 }}
                  onClick={() => { onSectionChange(item.id); setMenuOpen(false); }}
                  className="flex flex-col items-center py-3 w-full max-w-xs active:opacity-70 transition-opacity"
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="flex items-center gap-5 mb-0.5">
                    <motion.div
                      className="h-px"
                      animate={{ width: activeSection === item.id ? 28 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ background: pathConfig.color }}
                    />
                    <span
                      className="text-2xl font-light tracking-widest uppercase transition-colors duration-300"
                      style={{ color: activeSection === item.id ? '#fff' : 'rgba(255,255,255,0.45)' }}
                    >
                      {item.label}
                    </span>
                  </div>
                  <span className="text-xs tracking-widest uppercase" style={{ color: pathConfig.color, opacity: 0.45 }}>
                    {item.hint}
                  </span>
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="pb-10 flex items-center justify-center gap-6"
            >
              <button
                onClick={() => { setMenuOpen(false); onChangePath(); }}
                className="flex items-center gap-2 text-white/20 active:text-white/45 transition-colors text-xs tracking-[0.3em] uppercase min-h-[48px] px-4"
              >
                <Shuffle size={11} strokeWidth={1.5} />
                <span>Switch Profile</span>
              </button>
              <div className="w-px h-3 bg-white/10" />
              <button
                onClick={() => { setMenuOpen(false); onRestart(); }}
                className="flex items-center gap-2 text-white/20 active:text-white/40 transition-colors text-xs tracking-[0.3em] uppercase min-h-[48px] px-4"
              >
                <RotateCcw size={11} strokeWidth={1.5} />
                <span>Restart</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
