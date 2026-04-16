'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isMobileDevice } from '@/lib/isMobile';
import { ArrowRight } from 'lucide-react';

const TIERS = [
  {
    id: 'digital',
    name: 'Digital Activation',
    price: 'From AED 250K',
    description: 'Targeted digital presence across high-traffic zones. Screen networks, app integrations, and QR-linked experiences.',
    reach: '4M+ digital touchpoints/month',
    inclusions: ['Digital screens in 12 prime zones', 'App push notifications', 'Social amplification pack', 'Monthly analytics report'],
    color: '#60A5FA',
    badge: 'Entry',
  },
  {
    id: 'naming',
    name: 'Zone Naming Rights',
    price: 'From AED 1.2M',
    description: 'Own the naming of a specific zone or event series. Category-exclusive rights for 12-month minimum terms.',
    reach: '18M+ zone visitors/year',
    inclusions: ['Exclusive zone naming', 'Architectural signage', 'Hosted brand experiences', 'PR & media package', 'VIP access program'],
    color: '#60A5FA',
    badge: 'Featured',
  },
  {
    id: 'premium',
    name: 'Seasonal Sponsorship',
    price: 'From AED 4M',
    description: 'Dominant presence during peak seasons — Dubai Shopping Festival, Ramadan, Eid, New Year. Maximum footfall, maximum impact.',
    reach: '22M+ seasonal visitors',
    inclusions: ['Multi-zone presence', 'Live event activation', 'VIP hospitality suite', 'Global media package', 'Co-branded campaigns'],
    color: '#3B82F6',
    badge: 'Popular',
  },
  {
    id: 'takeover',
    name: 'Full Mall Takeover',
    price: 'From AED 15M',
    description: 'Total brand ownership. Every surface, every screen, every experience in Dubai Mall carrying your identity for a defined period.',
    reach: '2.1B global impressions',
    inclusions: ['Exclusive mall-wide rights', 'All digital & physical surfaces', 'Celebrity & media coordination', 'Global broadcast package', 'Dedicated brand team', 'Post-campaign analytics'],
    color: '#2563EB',
    badge: 'Flagship',
  },
];

const AUDIENCE_DATA = [
  { label: 'Ultra-HNW', percent: 12, desc: 'Net worth $10M+' },
  { label: 'Affluent', percent: 34, desc: 'Annual income $150K+' },
  { label: 'Premium', percent: 38, desc: 'Annual income $60–150K' },
  { label: 'Aspirational', percent: 16, desc: 'Growth demographic' },
];

export default function SponsorshipModule() {
  const [activeTier, setActiveTier] = useState(1);
  const tier = TIERS[activeTier];

  return (
    <div className="relative">
      <div className="mb-12">
        <p className="text-xs tracking-[0.6em] uppercase mb-4 font-light" style={{ color: '#3B82F6', opacity: 0.7 }}>
          Sponsorship & Partnerships
        </p>
        <h2
          className="text-white font-light mb-4"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
        >
          Own the conversation.<br />
          <span style={{ color: '#3B82F6' }}>At the world's scale.</span>
        </h2>
        <p className="text-white/35 text-sm max-w-xl" style={{ lineHeight: 1.9 }}>
          Category-exclusive partnerships built around your brand objectives. No generic packages — every sponsorship is architectured to deliver maximum business impact.
        </p>
      </div>

      <div className="mb-14">
        <p className="text-white/60 text-sm md:text-base leading-relaxedtracking-widest uppercase mb-6">Audience Composition</p>
        <div className="space-y-4">
          {AUDIENCE_DATA.map((seg, i) => (
            <motion.div
              key={seg.label}
              className="flex items-center gap-5"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-20 text-right text-xs text-white/35 uppercase tracking-wider flex-shrink-0">{seg.label}</div>
              <div className="flex-1 h-px relative" style={{ background: 'rgba(255,255,255,0.07)' }}>
                <motion.div
                  className="absolute inset-y-0 left-0"
                  style={{ height: '1px', background: `#3B82F6`, opacity: 0.6 + i * 0.1 }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${seg.percent * 2.5}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 + 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <div className="w-10 text-xs text-white/50 flex-shrink-0">{seg.percent}%</div>
              <div className="w-32 text-xs text-white/20 flex-shrink-0 hidden md:block">{seg.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {TIERS.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActiveTier(i)}
            className="px-5 text-xs tracking-[0.18em] uppercase font-light transition-all duration-400 min-h-[44px]"
            style={{
              background: activeTier === i ? '#3B82F6' : 'transparent',
              color: activeTier === i ? '#fff' : 'rgba(255,255,255,0.35)',
              border: `1px solid ${activeTier === i ? '#3B82F6' : 'rgba(255,255,255,0.08)'}`,
            }}
          >
            {t.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTier}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-0"
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="lg:col-span-2 p-6 md:p-10" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <span
                  className="inline-flex items-center px-3 py-1 text-xs tracking-widest uppercase font-light mb-3"
                  style={{ background: 'rgba(59,130,246,0.12)', color: '#3B82F6', border: '1px solid rgba(59,130,246,0.25)' }}
                >
                  {tier.badge}
                </span>
                <h3 className="text-white font-light mb-1" style={{ fontSize: '1.4rem', letterSpacing: '-0.02em' }}>
                  {tier.name}
                </h3>
                <p className="font-light" style={{ color: '#3B82F6', fontSize: '1rem' }}>{tier.price}</p>
              </div>
            </div>

            <p className="text-white/40 text-sm leading-relaxed mb-8">{tier.description}</p>

            <div className="mb-8">
              <p className="text-white/60 text-sm md:text-base leading-relaxed tracking-widest uppercase mb-4">What's included</p>
              <div className="space-y-2.5">
                {tier.inclusions.map(inc => (
                  <div key={inc} className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#3B82F6', opacity: 0.6 }} />
                    <span className="text-white/50 text-sm">{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="p-8 border-t lg:border-t-0 lg:border-l flex flex-col justify-between"
            style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(59,130,246,0.04)' }}
          >
            <div>
              <p className="text-white/60 text-sm md:text-base leading-relaxed tracking-widest uppercase mb-5">Projected Reach</p>
              <div className="text-white/80 text-sm leading-relaxed mb-6" style={{ fontStyle: 'italic' }}>
                "{tier.reach}"
              </div>
              <div
                className="p-4 mb-6"
                style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}
              >
                <p className="text-white/30 text-xs leading-relaxed">
                  All partnerships are category-exclusive. We will not sell the same tier to a direct competitor while your agreement is active.
                </p>
              </div>
            </div>
            <button
              className="w-full flex items-center justify-center gap-2 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300"
              style={{ background: '#3B82F6', color: '#fff' }}
            >
              <span>Request Details</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
