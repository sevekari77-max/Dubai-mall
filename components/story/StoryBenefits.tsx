'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { isMobileDevice } from '@/lib/isMobile';
import { STORY_BENEFITS, PATH_CONFIG } from '@/lib/data';
import type { UserPath } from '@/lib/types';

interface StoryBenefitsProps {
  userPath: UserPath;
}

export default function StoryBenefits({ userPath }: StoryBenefitsProps) {
  const chapters = STORY_BENEFITS[userPath] ?? [];
  const pathConfig = PATH_CONFIG[userPath];
  const [active, setActive] = useState(0);
  const [prevActive, setPrevActive] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [typedBody, setTypedBody] = useState('');
  const [bodyReady, setBodyReady] = useState(false);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const typeRef = useRef<NodeJS.Timeout | null>(null);
  const CHAPTER_DURATION = 9000;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const chapter = chapters[active];

  const goTo = useCallback((index: number, dir: 'next' | 'prev') => {
    if (isTransitioning || index === active) return;
    if (progressRef.current) clearInterval(progressRef.current);
    if (typeRef.current) clearTimeout(typeRef.current);
    setIsTransitioning(true);
    setDirection(dir);
    setPrevActive(active);
    setActive(index);
    setBodyReady(false);
    setTypedBody('');
    setTimeout(() => { setIsTransitioning(false); }, 900);
  }, [active, isTransitioning]);

  const goNext = useCallback(() => {
    const next = (active + 1) % chapters.length;
    goTo(next, 'next');
  }, [active, chapters.length, goTo]);

  const goPrev = useCallback(() => {
    const prev = (active - 1 + chapters.length) % chapters.length;
    goTo(prev, 'prev');
  }, [active, chapters.length, goTo]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBodyReady(true);
    }, 600);
    return () => clearTimeout(timer);
  }, [active]);

  useEffect(() => {
    if (!bodyReady || !chapter) return;
    const text = chapter.body;
    let i = 0;
    setTypedBody('');
    const tick = () => {
      if (i < text.length) {
        setTypedBody(text.slice(0, i + 1));
        i++;
        const delay = text[i - 1] === '.' || text[i - 1] === ',' ? 45 : 12;
        typeRef.current = setTimeout(tick, delay);
      }
    };
    tick();
    return () => { if (typeRef.current) clearTimeout(typeRef.current); };
  }, [bodyReady, active, chapter]);

  useEffect(() => {
    progressRef.current = setInterval(goNext, CHAPTER_DURATION);
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, [goNext]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  if (!chapter) return null;

  const slideVariants = {
    enterNext: { opacity: 0, x: 60 },
    enterPrev: { opacity: 0, x: -60 },
    center: { opacity: 1, x: 0 },
    exitNext: { opacity: 0, x: -60 },
    exitPrev: { opacity: 0, x: 60 },
  };

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 60;
    if (info.offset.x < -threshold) goNext();
    else if (info.offset.x > threshold) goPrev();
  };

  return (
    <section className="relative bg-black overflow-hidden" id="story" style={{ minHeight: '100vh' }}>
      <AnimatePresence mode="sync">
        <motion.div
          key={chapter.image + active}
          className="absolute inset-0 bg-cover bg-center gpu"
          style={{ backgroundImage: `url(${chapter.image})`, willChange: 'opacity, transform' }}
          {...(!isMobile && {
            initial: { opacity: 0, scale: 1.06 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.97 },
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
          })}
        />
      </AnimatePresence>

      <div className="absolute inset-0" style={{
        background: 'linear-gradient(110deg, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.88) 40%, rgba(0,0,0,0.45) 70%, rgba(0,0,0,0.15) 100%)',
      }} />

      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 45%)',
      }} />

      <div className="relative z-10 flex flex-col min-h-screen max-w-7xl mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-20 md:pb-28">

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <p className="text-xs tracking-[0.65em] uppercase mb-4 font-light" style={{ color: pathConfig.color, opacity: 0.6 }}>
            Here's what makes this place different
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            {chapters.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > active ? 'next' : 'prev')}
                className="flex items-center gap-2 group"
                aria-label={`Go to chapter ${i + 1}`}
              >
                <span
                  className="text-xs tracking-widest uppercase font-light transition-colors duration-400"
                  style={{ color: i === active ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.18)' }}
                >
                  {chapters[i].chapter}
                </span>
                <ChapterDot active={i === active} color={pathConfig.color} duration={CHAPTER_DURATION} />
              </button>
            ))}
          </div>
        </motion.div>

        <div className="flex-1 flex flex-col justify-center max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={slideVariants}
              initial={direction === 'next' ? 'enterNext' : 'enterPrev'}
              animate="center"
              exit={direction === 'next' ? 'exitNext' : 'exitPrev'}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              style={{ cursor: 'grab', willChange: 'transform' }}
            >
              <motion.div
                className="mb-8"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: 1, background: chapter.accentColor }}
              />

              <h2
                className="text-white font-light leading-tight mb-10"
                style={{
                  fontSize: 'clamp(1.9rem, 4.5vw, 4rem)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.12,
                }}
              >
                {chapter.headline}
              </h2>

              <div
                className="text-sm leading-loose mb-10 font-light min-h-[6em]"
                style={{ color: 'rgba(255,255,255,0.58)', maxWidth: '54ch', lineHeight: 2 }}
              >
                {typedBody}
                {bodyReady && typedBody.length < chapter.body.length && (
                  <span className="inline-block w-px h-4 ml-0.5 animate-pulse" style={{ background: chapter.accentColor, verticalAlign: 'text-bottom' }} />
                )}
              </div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="border-l-2 pl-5 mb-12 italic"
                style={{ borderColor: `${chapter.accentColor}50`, color: 'rgba(255,255,255,0.38)' }}
              >
                <p className="text-sm leading-relaxed">{chapter.pull}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex items-center gap-8"
              >
                <div>
                  <div
                    className="font-light leading-none mb-2"
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: chapter.accentColor }}
                  >
                    {chapter.metric.value}
                  </div>
                  <div className="text-white/30 text-xs tracking-widest uppercase">{chapter.metric.label}</div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between pt-8 md:pt-12 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <button
            onClick={goPrev}
            className="flex items-center gap-2 md:gap-3 group min-w-0 min-h-[48px] pr-4"
            aria-label="Previous chapter"
          >
            <svg width="24" height="10" viewBox="0 0 32 10" fill="none" className="flex-shrink-0 transition-transform duration-300 group-hover:-translate-x-1">
              <path d="M32 5H1M7 1L1 5L7 9" stroke="rgba(255,255,255,0.28)" strokeWidth="1.2" />
            </svg>
            <span className="hidden sm:block text-xs tracking-widest uppercase text-white/22 group-hover:text-white/45 transition-colors duration-300 truncate">
              {chapters[(active - 1 + chapters.length) % chapters.length]?.chapter}
            </span>
          </button>

          <div className="flex items-center gap-2 flex-shrink-0">
            {chapters.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > active ? 'next' : 'prev')}
                aria-label={`Chapter ${i + 1}`}
                className="relative w-5 h-1 overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.1)' }}
              >
                {i === active && (
                  <motion.div
                    className="absolute inset-y-0 left-0"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: CHAPTER_DURATION / 1000, ease: 'linear' }}
                    style={{ background: chapter.accentColor }}
                  />
                )}
                {i < active && (
                  <div className="absolute inset-0" style={{ background: chapter.accentColor, opacity: 0.45 }} />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={goNext}
            className="flex items-center gap-2 md:gap-3 group min-w-0 min-h-[48px] pl-4"
            aria-label="Next chapter"
          >
            <span className="hidden sm:block text-xs tracking-widest uppercase text-white/22 group-hover:text-white/45 transition-colors duration-300 truncate">
              {chapters[(active + 1) % chapters.length]?.chapter}
            </span>
            <svg width="24" height="10" viewBox="0 0 32 10" fill="none" className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1">
              <path d="M0 5H31M25 1L31 5L25 9" stroke="rgba(255,255,255,0.28)" strokeWidth="1.2" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className="absolute right-0 top-0 bottom-0 w-24 hidden lg:flex flex-col justify-center items-center gap-6 pointer-events-none"
        style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.4), transparent)' }}
      >
        <span className="text-white/12 text-xs tracking-[0.5em] uppercase" style={{ writingMode: 'vertical-rl' }}>
          Arrow keys to browse
        </span>
      </div>
    </section>
  );
}

function ChapterDot({ active, color, duration }: { active: boolean; color: string; duration: number }) {
  return (
    <div className="relative w-1 h-1">
      <div className="absolute inset-0 rounded-full" style={{ background: active ? color : 'rgba(255,255,255,0.12)' }} />
      {active && (
        <motion.div
          className="absolute -inset-1 rounded-full border"
          style={{ borderColor: `${color}50` }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
      )}
    </div>
  );
}
