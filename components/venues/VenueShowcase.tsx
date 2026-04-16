'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isMobileDevice } from '@/lib/isMobile';
import { ArrowRight } from 'lucide-react';

const VENUES = [
  {
    id: 'performing-arts',
    name: 'Performing Arts Centre',
    tagline: 'Where culture meets commerce.',
    description: 'A world-class performing arts venue inside the most visited destination on Earth. With state-of-the-art acoustics, flexible staging, and a built-in audience of 105 million, this is the most uniquely positioned arts platform on the planet.',
    capacity: '3,500 seats',
    type: 'Performing Arts',
    accentColor: '#A78BFA',
    stats: [
      { v: '3,500', l: 'Seat Capacity' },
      { v: '200+', l: 'Annual Performances' },
      { v: '100%', l: 'Sold-Out Rate (Premier)' },
    ],
    features: [
      'Dynamic stage configurations',
      'Dolby Atmos sound system',
      'Live broadcast infrastructure',
      'Green room & artist suites',
      'VIP box programme',
      'Post-show dining integration',
    ],
    highlights: ['Cirque du Soleil Residency', 'Dubai Opera tie-in performances', 'International Ballet seasons', 'Broadway touring productions'],
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 'expo',
    name: 'Exhibition & Expo Centre',
    tagline: 'Convention-grade space. Global destination address.',
    description: 'One of the largest dedicated exhibition spaces in the GCC — built for trade shows, international expositions, and large-scale commercial conventions. Walkable from 500+ hotels within a 5km radius.',
    capacity: '45,000 sq metres',
    type: 'Exhibition Hall',
    accentColor: '#34D399',
    stats: [
      { v: '45,000', l: 'Sq Metre Floorplate' },
      { v: '80+', l: 'Trade Shows Annually' },
      { v: '500+', l: 'Nearby Hotels' },
    ],
    features: [
      'Divisible into 6 independent halls',
      'Full loading dock infrastructure',
      'High-voltage power distribution',
      'Integrated Wi-Fi 6 networking',
      'Dedicated registration concourse',
      'Adjacent media & press centre',
    ],
    highlights: ['GITEX Global Tech Summit', 'Gulf Real Estate Expo', 'Arab Fashion Week', 'Dubai Food Festival HQ'],
    image: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 'grand-atrium',
    name: 'Grand Atrium',
    tagline: 'The most iconic activation space on the planet.',
    description: 'The five-storey Grand Atrium is Dubai Mall\'s beating heart — and the single most photographed interior retail space in the world. When your brand activates here, everyone in the building sees it.',
    capacity: '120,000 standing',
    type: 'Feature Space',
    accentColor: '#D4AF37',
    stats: [
      { v: '120K', l: 'Max Standing Capacity' },
      { v: '5 floors', l: 'Vertical Visibility' },
      { v: '18M+', l: 'Annual Atrium Visitors' },
    ],
    features: [
      '5-storey ceiling height',
      'Full 360° LED canopy',
      'DJ and live performance setup',
      'Waterfall feature as backdrop',
      'Direct entry from Dubai Metro',
      'Global media coordination',
    ],
    highlights: ['New Year\'s Eve Countdown', 'FIFA World Cup screenings', 'Burj Khalifa projection partnerships', 'Samsung Galaxy global launches'],
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 'aquarium',
    name: 'Dubai Aquarium & Underwater Zoo',
    tagline: 'Immersive brand environments. Impossible to replicate.',
    description: 'Home to one of the largest suspended aquariums in the world, the Aquarium offers an entertainment-first brand experience unlike anything available in a commercial setting. Private dining, exclusive hire, and unique activations.',
    capacity: '5,000 per session',
    type: 'Attraction',
    accentColor: '#38BDF8',
    stats: [
      { v: '10M+', l: 'Annual Aquarium Visitors' },
      { v: '33,000', l: 'Aquatic Animals' },
      { v: '4.9/5', l: 'Visitor Rating' },
    ],
    features: [
      'Private underwater tunnel hire',
      'Exclusive after-hours events',
      'Underwater live broadcast capability',
      'Marine scientist partnerships',
      'Children\'s education programmes',
      'Corporate team event packages',
    ],
    highlights: ['Rolex brand dinner', 'HSBC Private Banking event', 'Cartier product reveal', 'National Geographic partnership'],
    image: 'https://images.pexels.com/photos/1534560/pexels-photo-1534560.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
];

export default function VenueShowcase() {
  const [activeVenue, setActiveVenue] = useState(0);
  const venue = VENUES[activeVenue];

  const handleSwipe = (_: any, info: any) => {
    const t = 60;
    if (info.offset.x < -t && activeVenue < VENUES.length - 1) setActiveVenue(v => v + 1);
    else if (info.offset.x > t && activeVenue > 0) setActiveVenue(v => v - 1);
  };

  return (
    <section className="relative bg-black pt-20 pb-16 md:py-28 px-6 md:px-10 overflow-hidden" id="venues">
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(167,139,250,0.04) 0%, transparent 55%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.6em] uppercase mb-5 font-light" style={{ color: 'rgba(212,175,55,0.5)' }}>
            Signature Venues
          </p>
          <h2
            className="text-white font-light"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 6rem)', letterSpacing: '-0.03em' }}
          >
            Beyond retail.<br />
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>Beyond ordinary.</span>
          </h2>
          <p className="text-white/30 mt-4 max-w-lg text-sm" style={{ lineHeight: 1.85 }}>
            Four distinct venue categories — performing arts, exhibitions, feature spaces, and world-class attractions — positioned to support events of every scale.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-10">
          {VENUES.map((v, i) => (
            <button
              key={v.id}
              onClick={() => setActiveVenue(i)}
              className="px-5 text-xs tracking-[0.18em] uppercase font-light transition-all duration-400 min-h-[44px]"
              style={{
                background: activeVenue === i ? v.accentColor : 'transparent',
                color: activeVenue === i ? (v.accentColor === '#D4AF37' ? '#000' : '#000') : 'rgba(255,255,255,0.35)',
                border: `1px solid ${activeVenue === i ? v.accentColor : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              {v.type}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeVenue}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleSwipe}
            className="grid grid-cols-1 lg:grid-cols-12 gap-0"
            style={{ border: '1px solid rgba(255,255,255,0.06)', willChange: 'opacity' }}
          >
            <div
              className="lg:col-span-5 relative min-h-72"
              style={{
                backgroundImage: `url(${venue.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div
                className="absolute inset-0"
                style={{ filter: 'brightness(0.25) saturate(0.5)' }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to right, transparent 40%, rgba(0,0,0,0.7) 100%)' }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 55%)' }}
              />

              <div className="absolute bottom-0 left-0 p-8">
                <div
                  className="text-xs tracking-widest uppercase mb-3 font-light"
                  style={{ color: venue.accentColor, opacity: 0.7 }}
                >
                  {venue.type}
                </div>
                <h3
                  className="text-white font-light mb-2"
                  style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)', letterSpacing: '-0.025em' }}
                >
                  {venue.name}
                </h3>
                <p className="text-white/40 text-sm italic">{venue.tagline}</p>
              </div>

              <div className="absolute top-6 right-6">
                <span
                  className="px-3 py-1.5 text-xs tracking-widest uppercase font-light"
                  style={{ background: `${venue.accentColor}20`, color: venue.accentColor, border: `1px solid ${venue.accentColor}35` }}
                >
                  {venue.capacity}
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 md:p-10 lg:p-12" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-white/40 text-sm leading-relaxed mb-8">{venue.description}</p>

              <div className="grid grid-cols-3 gap-3 md:gap-6 mb-10 pb-10 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                {venue.stats.map(stat => (
                  <div key={stat.l}>
                    <div
                      className="font-light mb-1.5"
                      style={{ color: venue.accentColor, fontSize: 'clamp(1rem, 1.8vw, 1.4rem)', letterSpacing: '-0.02em' }}
                    >
                      {stat.v}
                    </div>
                    <div className="text-white/50 text-sm tracking-widest uppercase leading-snug">{stat.l}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div>
                  <p className="text-white/60 text-sm md:text-base leading-relaxed tracking-widest uppercase mb-4">Venue Features</p>
                  <div className="space-y-2">
                    {venue.features.map(f => (
                      <div key={f} className="flex items-center gap-3">
                        <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: venue.accentColor, opacity: 0.5 }} />
                        <span className="text-white/40 text-xs leading-relaxed">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-white/60 text-sm md:text-base leading-relaxed tracking-widest uppercase mb-4">Notable Events</p>
                  <div className="space-y-2">
                    {venue.highlights.map(h => (
                      <div key={h} className="flex items-center gap-3">
                        <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: venue.accentColor, opacity: 0.5 }} />
                        <span className="text-white/40 text-xs leading-relaxed">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="flex items-center justify-center gap-2 px-6 py-3 text-xs tracking-[0.2em] uppercase font-medium"
                  style={{ background: venue.accentColor, color: '#000' }}
                >
                  <span>Book a Site Visit</span>
                  <ArrowRight size={12} />
                </button>
                <button
                  className="px-6 py-3 border text-white/35 text-xs tracking-[0.2em] uppercase font-light"
                  style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                >
                  Download Specs
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
