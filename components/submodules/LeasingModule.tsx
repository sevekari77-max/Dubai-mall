'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isMobileDevice } from '@/lib/isMobile';
import { ArrowRight } from 'lucide-react';

const LEASING_CATEGORIES = [
  {
    id: 'luxury',
    label: 'Luxury & Flagship',
    color: '#D4AF37',
    icon: '◆',
    tagline: 'Claim the most prestigious retail address on Earth.',
    description: 'Fashion Avenue and the Luxury Spine represent the highest concentration of ultra-premium retail in the Middle East. Positioned alongside Chanel, Louis Vuitton, and Hermès — your brand enters a different league.',
    audience: 'Ultra-HNW visitors averaging AED 4,800 per trip',
    zones: ['Fashion Avenue', 'Luxury Spine', 'Level 2 Boutiques'],
    minSize: '500 sq ft',
    highlights: [
      { v: '42K', l: 'Monthly ultra-HNW visitors' },
      { v: 'AED 4,800', l: 'Average luxury spend/trip' },
      { v: '98/100', l: 'Brand prestige index' },
    ],
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1400',
  },
  {
    id: 'retail',
    label: 'Premium Retail',
    color: '#D4AF37',
    icon: '◇',
    tagline: 'Access the world\'s most diverse and valuable shopper base.',
    description: 'From emerging brands to established mid-market players — Dubai Mall\'s core retail floors give you access to 105 million annual visitors with an 82% international profile.',
    audience: '82% international visitors across 180 nationalities',
    zones: ['Ground Floor Mall', 'Level 1 Boulevard', 'West Wing'],
    minSize: '300 sq ft',
    highlights: [
      { v: '105M', l: 'Annual footfall' },
      { v: '82%', l: 'International visitors' },
      { v: '+14%', l: 'YoY sales growth' },
    ],
    image: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=1400',
  },
  {
    id: 'fb',
    label: 'Food & Beverage',
    color: '#EF4444',
    icon: '◉',
    tagline: 'Join a culinary ecosystem engineered for dwell and spend.',
    description: 'Dining Boulevard and the Waterfront Promenade form a culinary destination in their own right. With 4.2-hour average dwell time and 85,000 daily covers, this is the most productive F&B real estate in the region.',
    audience: '85,000 daily restaurant covers',
    zones: ['Dining Boulevard', 'Waterfront Promenade', 'Food Court', 'Level 1 F&B Strip'],
    minSize: '200 sq ft',
    highlights: [
      { v: '4.2 hrs', l: 'Average dwell time' },
      { v: '85K', l: 'Daily covers' },
      { v: '3.8×', l: 'Spend uplift vs standalone' },
    ],
    image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1400',
  },
  {
    id: 'popup',
    label: 'Pop-Up & Kiosk',
    color: '#A3E635',
    icon: '▷',
    tagline: 'Test, activate, validate — at global scale.',
    description: 'Short-term pop-up formats for brand moments, collection drops, and concept testing. From 1-week activations to 3-month seasonal installations — build brand equity at the speed of culture.',
    audience: 'Curated for brand launches, seasonal campaigns, and new market entry',
    zones: ['Grand Atrium', 'Fashion Avenue Pop-Up Lane', 'Waterfront Stage', 'Level 1 Activation Zones'],
    minSize: '50 sq ft',
    highlights: [
      { v: '1 week+', l: 'Minimum terms' },
      { v: '150+', l: 'Successful pop-ups/year' },
      { v: '4.2M', l: 'Average campaign exposure' },
    ],
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1400',
  },
];

export default function LeasingModule() {
  const [activeCategory, setActiveCategory] = useState(0);
  const cat = LEASING_CATEGORIES[activeCategory];

  return (
    <div className="relative">
      <div className="mb-12">
        <p className="text-xs tracking-[0.6em] uppercase mb-4 font-light" style={{ color: '#D4AF37', opacity: 0.7 }}>
          Leasing Opportunities
        </p>
        <h2
          className="text-white font-light mb-4"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
        >
          Your space.<br />
          <span style={{ color: '#D4AF37' }}>The world's audience.</span>
        </h2>
        <p className="text-white/35 text-sm max-w-xl" style={{ lineHeight: 1.9 }}>
          Selective leasing across four distinct categories. Each tailored to different brand objectives, growth stages, and budget profiles. All backed by 105 million annual visitors.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {LEASING_CATEGORIES.map((cat, i) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(i)}
            className="px-5 text-xs tracking-[0.18em] uppercase font-light transition-all duration-400 min-h-[44px]"
            style={{
              background: activeCategory === i ? cat.color : 'transparent',
              color: activeCategory === i ? '#000' : 'rgba(255,255,255,0.35)',
              border: `1px solid ${activeCategory === i ? cat.color : 'rgba(255,255,255,0.08)'}`,
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
            <div
              className="lg:col-span-2 relative min-h-56"
              style={{
                backgroundImage: `url(${cat.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 40%, rgba(0,0,0,0.7) 100%)' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }} />
              <div className="absolute bottom-0 left-0 p-8">
                <div className="text-2xl mb-3" style={{ color: cat.color, opacity: 0.7 }}>{cat.icon}</div>
                <div className="text-white/35 text-xs tracking-widest uppercase">Starting from</div>
                <div className="text-white font-light" style={{ fontSize: '1.1rem' }}>{cat.minSize} available</div>
              </div>
            </div>

            <div className="lg:col-span-3 p-6 md:p-10" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <p
                className="text-sm font-light mb-4 italic"
                style={{ color: cat.color }}
              >
                {cat.tagline}
              </p>
              <p className="text-white/40 text-sm leading-relaxed mb-8">{cat.description}</p>

              <div className="grid grid-cols-3 gap-3 md:gap-6 mb-8 pt-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                {cat.highlights.map(h => (
                  <div key={h.l}>
                    <div className="font-light mb-1" style={{ color: cat.color, fontSize: '1.2rem' }}>{h.v}</div>
                    <div className="text-white/50 text-sm tracking-widest uppercase leading-snug">{h.l}</div>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <p className="text-white/60 text-sm md:text-base leading-relaxed tracking-widest uppercase mb-3">Available Zones</p>
                <div className="flex flex-wrap gap-2">
                  {cat.zones.map(z => (
                    <span
                      key={z}
                      className="px-3 py-1.5 text-xs"
                      style={{ background: `${cat.color}10`, color: `${cat.color}90`, border: `1px solid ${cat.color}25` }}
                    >
                      {z}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="flex items-center justify-center gap-2 px-6 py-3 text-xs tracking-[0.2em] uppercase font-medium"
                  style={{ background: cat.color, color: '#000' }}
                >
                  <span>Request Proposal</span>
                  <ArrowRight size={12} />
                </button>
                <button
                  className="px-6 py-3 border text-white/35 text-xs tracking-[0.2em] uppercase font-light"
                  style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                >
                  View Floor Plans
                </button>
              </div>
            </div>
          </div>

          <div
            className="mt-6 p-5"
            style={{ background: `${cat.color}08`, border: `1px solid ${cat.color}18` }}
          >
            <p className="text-white/30 text-sm">
              <span style={{ color: cat.color, opacity: 0.8 }}>Audience insight:</span>{' '}
              {cat.audience}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
