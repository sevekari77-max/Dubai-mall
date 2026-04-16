'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface CinematicIntroProps {
  onComplete: () => void;
}

const SCENES = [
  { image: 'https://images.pexels.com/photos/1534560/pexels-photo-1534560.jpeg?auto=compress&cs=tinysrgb&w=1200', caption: 'Downtown Dubai' },
  { image: 'https://images.pexels.com/photos/5214413/pexels-photo-5214413.jpeg?auto=compress&cs=tinysrgb&w=1200', caption: 'Fashion Avenue' },
  { image: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=1200', caption: 'Retail World' },
  { image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1200', caption: 'Entertainment District' },
  { image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1200', caption: 'Events Plaza' },
];

const STATS = [
  { value: '105M', label: 'Annual visitors' },
  { value: '5.9M', label: 'Square feet' },
  { value: '1,200+', label: 'Resident brands' },
  { value: '180', label: 'Countries represented' },
];

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [ctaReady, setCtaReady] = useState(false);
  const eyebrowCtrl = useAnimation();
  const headline1Ctrl = useAnimation();
  const headline2Ctrl = useAnimation();
  const ctaCtrl = useAnimation();
  const statsCtrl = useAnimation();

  useEffect(() => {
    setMounted(true);
    const ease = [0.16, 1, 0.3, 1] as const;

    async function sequence() {
      await new Promise(r => setTimeout(r, 50));
      eyebrowCtrl.start({ opacity: 1, transition: { duration: 1.1, ease } });
      headline1Ctrl.start({ y: '0%', opacity: 1, transition: { duration: 1.3, ease } });

      await new Promise(r => setTimeout(r, 120));
      headline2Ctrl.start({ y: '0%', opacity: 1, transition: { duration: 1.3, ease } });

      await new Promise(r => setTimeout(r, 300));
      ctaCtrl.start({ opacity: 1, transition: { duration: 1.2, ease: 'easeOut' } });
      setCtaReady(true);

      await new Promise(r => setTimeout(r, 400));
      statsCtrl.start({ opacity: 1, y: 0, transition: { duration: 1, ease } });
    }

    sequence();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
        setSceneIndex(i => (i + 1) % SCENES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (ctaReady && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [ctaReady, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black overflow-hidden gpu"
      exit={{ opacity: 0 }}
      transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={sceneIndex}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1.02 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 2.2, ease: 'easeInOut' },
            scale: { duration: 12, ease: 'linear' },
          }}
        >
          <div
            className="absolute inset-0"
            style={{ filter: 'brightness(0.22) saturate(0.6)' }}
          >
            <Image
              src={SCENES[0].image}
              alt=""
              fill
              sizes="100vw"
              quality={50}
              priority
              className="object-cover"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.6) 70%, black 100%)' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.98) 0%, transparent 30%, transparent 80%, rgba(0,0,0,0.5) 100%)' }}
      />

      <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.15), transparent)' }} />

      <div
        className="absolute inset-0 flex items-center justify-center px-8"
      >
        <div className="flex flex-col items-center" style={{ maxWidth: '900px', width: '100%' }}>

          <motion.div
            className="flex items-center gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={eyebrowCtrl}
          >
            <div className="h-px w-8" style={{ background: 'rgba(212,175,55,0.35)' }} />
            <p className="text-xs tracking-[0.7em] uppercase font-light" style={{ color: 'rgba(212,175,55,0.5)' }}>
              Emaar Properties &nbsp;&middot;&nbsp; Downtown Dubai
            </p>
            <div className="h-px w-8" style={{ background: 'rgba(212,175,55,0.35)' }} />
          </motion.div>

          <div style={{ overflow: 'clip', marginBottom: '0.4rem' }}>
            <motion.h1
              className="font-light text-white text-center"
              style={{ fontSize: 'clamp(2.8rem, 11vw, 10rem)', letterSpacing: '-0.035em', lineHeight: 0.88 }}
              initial={{ y: '20%', opacity: 0.9 }}
              animate={headline1Ctrl}
            >
              More than
            </motion.h1>
          </div>

          <div style={{ overflow: 'clip', marginBottom: '3rem' }}>
            <motion.h1
              className="font-light text-center italic"
              style={{ fontSize: 'clamp(2.8rem, 11vw, 10rem)', letterSpacing: '-0.035em', lineHeight: 0.88, color: '#D4AF37' }}
              initial={{ y: '20%', opacity: 0.9 }}
              animate={headline2Ctrl}
            >
              a mall.
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={ctaCtrl}
            className="flex flex-col items-center gap-5 mb-16"
          >
            <motion.button
              onClick={onComplete}
              className="group relative inline-flex items-center gap-4 px-10 py-4 md:px-12 md:py-5 text-sm font-light uppercase tracking-[0.35em] transition-all duration-500 min-h-[52px]"
              style={{
                background: 'rgba(212,175,55,0.1)',
                border: '1px solid rgba(212,175,55,0.45)',
                color: 'rgba(212,175,55,0.9)',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96, background: 'rgba(212,175,55,0.2)' }}
              onHoverStart={e => {
                (e.target as HTMLElement).style.background = 'rgba(212,175,55,0.18)';
                (e.target as HTMLElement).style.borderColor = 'rgba(212,175,55,0.7)';
                (e.target as HTMLElement).style.color = '#D4AF37';
              }}
              onHoverEnd={e => {
                (e.target as HTMLElement).style.background = 'rgba(212,175,55,0.1)';
                (e.target as HTMLElement).style.borderColor = 'rgba(212,175,55,0.45)';
                (e.target as HTMLElement).style.color = 'rgba(212,175,56,0.9)';
              }}
            >
              <span>Enter Dubai Mall</span>
              <ArrowRight size={14} strokeWidth={1.5} />
            </motion.button>

            <p className="hidden md:block text-white/60 text-sm md:text-base leading-relaxed tracking-[0.3em] uppercase">
              Or press <kbd className="text-white/35">Space</kbd> to continue
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-16 pt-10 border-t w-full"
            initial={{ opacity: 0, y: 16 }}
            animate={statsCtrl}
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="font-light mb-1.5"
                  style={{ color: '#D4AF37', fontSize: 'clamp(1.1rem, 2.2vw, 1.8rem)', letterSpacing: '-0.02em' }}
                >
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm tracking-widest uppercase">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 right-4 md:right-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
      >
        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait">
            <motion.span
              key={sceneIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.5 }}
              className="text-white/15 text-xs tracking-[0.4em] uppercase"
            >
              {SCENES[sceneIndex].caption}
            </motion.span>
          </AnimatePresence>
          <div className="flex items-center gap-1">
            {SCENES.map((_, i) => (
              <div
                key={i}
                className="transition-all duration-500"
                style={{
                  width: i === sceneIndex ? 16 : 4,
                  height: 1,
                  background: i === sceneIndex ? 'rgba(212,175,55,0.55)' : 'rgba(255,255,255,0.15)',
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}