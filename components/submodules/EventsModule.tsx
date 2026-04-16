'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isMobileDevice } from '@/lib/isMobile';
import { ArrowRight, Calendar, Users, Globe, Zap } from 'lucide-react';

const EVENT_TYPES = [
  {
    id: 'concerts',
    label: 'Concerts & Live Music',
    icon: '♪',
    capacity: '120,000',
    description: 'From global superstars to regional icons — our outdoor and indoor stages host the most watched concerts in the Middle East.',
    highlights: ['AC/DC', 'Coldplay', 'Beyoncé', 'DJ Khaled'],
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1400',
    stat: { value: '500K+', label: 'Annual concert attendees' },
  },
  {
    id: 'fashion',
    label: 'Fashion & Runway',
    icon: '◇',
    capacity: '5,000',
    description: 'The region\'s most prestigious catwalk destination. Global fashion weeks have made Dubai Mall an essential stop.',
    highlights: ['Dubai Fashion Week', 'Chanel Private Show', 'Valentino Fall', 'Dior Resort'],
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1400',
    stat: { value: '48', label: 'Fashion weeks hosted' },
  },
  {
    id: 'launches',
    label: 'Brand & Product Launches',
    icon: '◉',
    capacity: '20,000',
    description: 'High-anticipation launches with a guaranteed global media moment. Real-time amplification to 180+ countries.',
    highlights: ['iPhone 15 MENA Premiere', 'Ferrari Roma Launch', 'Louis Vuitton SS25'],
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1400',
    stat: { value: '2.1B', label: 'Impressions per major launch' },
  },
  {
    id: 'corporate',
    label: 'Corporate & Conventions',
    icon: '▣',
    capacity: '15,000',
    description: 'Convention-grade facilities with world-class hospitality. Multi-day corporate events with seamless logistics.',
    highlights: ['WEF MENA Summit', 'Bloomberg New Economy', 'Forbes Global CEO'],
    image: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=1400',
    stat: { value: '120+', label: 'Corporate events annually' },
  },
];

const CAPABILITIES = [
  { icon: <Users size={16} />, label: 'Capacity', value: 'Up to 120,000' },
  { icon: <Calendar size={16} />, label: 'Events/Year', value: '500+' },
  { icon: <Globe size={16} />, label: 'Countries Reached', value: '180+' },
  { icon: <Zap size={16} />, label: 'Live Crew', value: '24/7' },
];

export default function EventsModule() {
  const [activeType, setActiveType] = useState(0);
  const event = EVENT_TYPES[activeType];

  return (
    <div className="relative">
      <div className="mb-12">
        <p className="text-xs tracking-[0.6em] uppercase mb-4 font-light" style={{ color: '#EF4444', opacity: 0.7 }}>
          Events Platform
        </p>
        <h2
          className="text-white font-light mb-4"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
        >
          The world's stage.<br />
          <span style={{ color: '#EF4444' }}>Any event. Any scale.</span>
        </h2>
        <p className="text-white/35 text-sm max-w-xl" style={{ lineHeight: 1.9 }}>
          Dubai Mall is not just a venue — it is a global media platform. Every event held here is broadcast, amplified, and remembered across 180 countries.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        {CAPABILITIES.map(cap => (
          <div
            key={cap.label}
            className="flex flex-col gap-2 p-5 border"
            style={{ borderColor: 'rgba(239,68,68,0.15)', background: 'rgba(239,68,68,0.04)' }}
          >
            <div style={{ color: '#EF4444', opacity: 0.6 }}>{cap.icon}</div>
            <div className="text-white font-light" style={{ fontSize: '1.1rem' }}>{cap.value}</div>
            <div className="text-white/30 text-xs tracking-widest uppercase">{cap.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {EVENT_TYPES.map((type, i) => (
          <button
            key={type.id}
            onClick={() => setActiveType(i)}
            className="px-5 py-2.5 text-xs tracking-[0.18em] uppercase font-light transition-all duration-400"
            style={{
              background: activeType === i ? '#EF4444' : 'transparent',
              color: activeType === i ? '#000' : 'rgba(255,255,255,0.35)',
              border: `1px solid ${activeType === i ? '#EF4444' : 'rgba(255,255,255,0.08)'}`,
            }}
          >
            {type.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeType}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div
            className="relative min-h-64 lg:min-h-80"
            style={{
              backgroundImage: `url(${event.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)' }} />
            <div className="absolute bottom-0 left-0 p-8">
              <div className="text-3xl font-light mb-1" style={{ color: '#EF4444' }}>{event.stat.value}</div>
              <div className="text-white/40 text-xs tracking-widest uppercase">{event.stat.label}</div>
            </div>
          </div>

          <div className="p-8 md:p-10" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="text-2xl mb-6" style={{ color: 'rgba(239,68,68,0.4)' }}>{event.icon}</div>
            <h3 className="text-white font-light mb-3" style={{ fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
              {event.label}
            </h3>
            <p className="text-white/40 text-sm leading-relaxed mb-8">{event.description}</p>

            <div className="mb-8">
              <p className="text-white/60 text-sm md:text-base leading-relaxed tracking-widest uppercase mb-4">Recent Highlights</p>
              <div className="flex flex-wrap gap-2">
                {event.highlights.map(h => (
                  <span
                    key={h}
                    className="px-3 py-1.5 text-xs"
                    style={{ background: 'rgba(239,68,68,0.08)', color: 'rgba(239,68,68,0.7)', border: '1px solid rgba(239,68,68,0.15)' }}
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm" style={{ color: '#EF4444', opacity: 0.7 }}>
              <span className="text-xs tracking-widest uppercase font-light">Capacity up to {event.capacity}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div
        className="mt-12 p-8 border"
        style={{ borderColor: 'rgba(239,68,68,0.15)', background: 'rgba(239,68,68,0.03)' }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h4 className="text-white font-light mb-2" style={{ fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
              Ready to produce your next event?
            </h4>
            <p className="text-white/35 text-sm">Our events team works with producers globally. Let's design your moment together.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
            <button
              className="flex items-center justify-center gap-2 px-6 py-3 text-xs tracking-[0.2em] uppercase font-medium"
              style={{ background: '#EF4444', color: '#000' }}
            >
              <span>Submit a Proposal</span>
              <ArrowRight size={12} />
            </button>
            <button
              className="px-6 py-3 border text-white/40 text-xs tracking-[0.2em] uppercase font-light transition-all duration-300"
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
            >
              View Spaces
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
