'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isMobileDevice } from '@/lib/isMobile';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import type { UserPath } from '@/lib/types';
import { PATH_CONFIG } from '@/lib/data';

interface OpportunitySimulatorProps {
  userPath: UserPath;
}

const TIERS: Record<UserPath, { label: string; short: string; interpretation: string; badge: string }[]> = {
  retail: [
    { label: 'Emerging Label', short: 'Emerging', interpretation: 'Strong local presence with growing regional reach.', badge: 'Solid Opportunity' },
    { label: 'Established Brand', short: 'Established', interpretation: 'Multi-market penetration with premium audience access.', badge: 'High Value' },
    { label: 'Global Flagship', short: 'Flagship', interpretation: 'Category-defining position in the world\'s top retail destination.', badge: 'Premium Opportunity' },
    { label: 'Luxury House', short: 'Luxury', interpretation: 'Ultra-HNW clientele with exceptional brand elevation.', badge: 'Elite Tier' },
    { label: 'Heritage Maison', short: 'Heritage', interpretation: 'Unrivalled prestige. Maximum global visibility. Historic impact.', badge: 'Iconic Status' },
  ],
  sponsor: [
    { label: 'Digital Activation', short: 'Digital', interpretation: 'Targeted digital reach across high-traffic zones.', badge: 'Good Exposure' },
    { label: 'Event Naming Rights', short: 'Naming', interpretation: 'Prominent naming association with world-class events.', badge: 'Strong Impact' },
    { label: 'Fashion Week Tier', short: 'Fashion', interpretation: 'Global media coverage and elite audience association.', badge: 'Premium Exposure' },
    { label: 'Premium Zone', short: 'Premium', interpretation: 'Dominant brand presence across premium retail zones.', badge: 'High Impact' },
    { label: 'Full Mall Takeover', short: 'Takeover', interpretation: 'Total brand ownership. 2.1B impressions. Unmissable.', badge: 'Maximum Impact' },
  ],
  event: [
    { label: 'Pop-Up Experience', short: 'Pop-Up', interpretation: 'Concentrated brand moment for targeted audiences.', badge: 'Brand Moment' },
    { label: 'Brand Activation', short: 'Activation', interpretation: 'Immersive experience with significant footfall exposure.', badge: 'Strong Reach' },
    { label: 'Product Launch', short: 'Launch', interpretation: 'High-anticipation launch with global media amplification.', badge: 'High Impact' },
    { label: 'Live Performance', short: 'Live', interpretation: 'Mass audience event with real-time social amplification.', badge: 'Mass Reach' },
    { label: 'International Show', short: 'Show', interpretation: 'Defining cultural moment. Broadcast to 180+ countries.', badge: 'World Stage' },
  ],
  explore: [
    { label: 'Brand Discovery', short: 'Discovery', interpretation: 'Initial presence — sampling the full opportunity landscape.', badge: 'First Look' },
    { label: 'Retail Presence', short: 'Retail', interpretation: 'Established footprint across premium retail zones.', badge: 'Growing Reach' },
    { label: 'Event Activation', short: 'Events', interpretation: 'High-impact activations with significant audience engagement.', badge: 'Strong Impact' },
    { label: 'Multi-Format Partner', short: 'Multi', interpretation: 'Combined retail, events and sponsorship delivering compounded ROI.', badge: 'High Value' },
    { label: 'Strategic Alliance', short: 'Alliance', interpretation: 'Full ecosystem integration — retail, media, events, and culture.', badge: 'Premium Tier' },
  ],
};

type SimResult = {
  dailyReach: number;
  annualImpressions: number;
  roiMultiple: number;
  exposureScore: number;
  audienceScore: number;
  chart: { month: string; value: number }[];
};

function seededNoise(seed: number): number {
  const x = Math.sin(seed) * 43758.5453123;
  return x - Math.floor(x);
}

function calcResults(path: UserPath, tierIndex: number): SimResult {
  const t = tierIndex / 4;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const pathSeed = path === 'retail' ? 1 : path === 'sponsor' ? 2 : path === 'event' ? 3 : 4;

  if (path === 'retail') {
    const daily = Math.round(12000 + t * 168000);
    return {
      exposureScore: Math.round(22 + t * 76),
      audienceScore: Math.round(30 + t * 68),
      dailyReach: daily,
      annualImpressions: Math.round(daily * 365 * 2.4),
      roiMultiple: parseFloat((2.1 + t * 9.4).toFixed(1)),
      chart: months.map((m, i) => ({
        month: m,
        value: Math.round(daily * 28 * (0.7 + 0.55 * Math.sin((i / 11) * Math.PI) + seededNoise(pathSeed * 100 + tierIndex * 12 + i) * 0.15)),
      })),
    };
  } else if (path === 'sponsor') {
    return {
      exposureScore: Math.round(25 + t * 73),
      audienceScore: Math.round(20 + t * 78),
      dailyReach: Math.round(50000 + t * 550000),
      annualImpressions: Math.round(80000000 + t * 2020000000),
      roiMultiple: parseFloat((3.2 + t * 14).toFixed(1)),
      chart: months.map((m, i) => ({
        month: m,
        value: Math.round((20000000 + t * 160000000) * (0.7 + 0.5 * Math.sin((i / 6) * Math.PI) + seededNoise(pathSeed * 100 + tierIndex * 12 + i) * 0.25)),
      })),
    };
  } else if (path === 'event') {
    return {
      exposureScore: Math.round(18 + t * 80),
      audienceScore: Math.round(22 + t * 76),
      dailyReach: Math.round(5000 + t * 115000),
      annualImpressions: Math.round(10000000 + t * 2090000000),
      roiMultiple: parseFloat((4.5 + t * 18).toFixed(1)),
      chart: months.map((m, i) => ({
        month: m,
        value: Math.round((5000000 + t * 120000000) * (0.6 + seededNoise(pathSeed * 100 + tierIndex * 12 + i) * 0.8)),
      })),
    };
  } else {
    const daily = Math.round(20000 + t * 280000);
    return {
      exposureScore: Math.round(30 + t * 68),
      audienceScore: Math.round(28 + t * 70),
      dailyReach: daily,
      annualImpressions: Math.round(daily * 365 * 3.2),
      roiMultiple: parseFloat((3.0 + t * 12).toFixed(1)),
      chart: months.map((m, i) => ({
        month: m,
        value: Math.round(daily * 28 * (0.72 + 0.48 * Math.sin((i / 10) * Math.PI) + seededNoise(pathSeed * 100 + tierIndex * 12 + i) * 0.2)),
      })),
    };
  }
}

function fmt(n: number): string {
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
  return n.toString();
}

function ImpactBar({ score, color, label }: { score: number; color: string; label: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-white/35 text-xs tracking-widest uppercase">{label}</span>
        <span className="text-xs font-light" style={{ color }}>{score}/100</span>
      </div>
      <div className="h-px w-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
        <motion.div
          className="h-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        />
      </div>
    </div>
  );
}

export default function OpportunitySimulator({ userPath }: OpportunitySimulatorProps) {
  const [tierIndex, setTierIndex] = useState(2);
  const [results, setResults] = useState<SimResult>(() => calcResults(userPath, 2));
  const pathConfig = PATH_CONFIG[userPath];
  const tiers = TIERS[userPath];
  const prevPath = useRef(userPath);

  useEffect(() => {
    if (prevPath.current !== userPath) {
      prevPath.current = userPath;
      setTierIndex(2);
      setResults(calcResults(userPath, 2));
      return;
    }
    setResults(calcResults(userPath, tierIndex));
  }, [tierIndex, userPath]);

  const currentTier = tiers[tierIndex];

  return (
    <section className="relative bg-black py-28 px-6 md:px-10 overflow-hidden" id="simulator">
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 65% 35%, ${pathConfig.color}07 0%, transparent 55%)` }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.6em] uppercase mb-5" style={{ color: pathConfig.color, opacity: 0.6 }}>
            Opportunity Simulator
          </p>
          <h2
            className="text-white font-light"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 6rem)', letterSpacing: '-0.03em' }}
          >
            Model your impact.
          </h2>
          <p className="text-white/30 mt-4 max-w-md text-sm" style={{ lineHeight: 1.85 }}>
            Select an investment profile. See exactly what it delivers.
          </p>
        </motion.div>

        <div className="mb-12">
          <p className="text-white/60 text-sm md:text-base leading-relaxed tracking-widest uppercase mb-5">
            {userPath === 'retail' ? 'Brand Tier' : userPath === 'sponsor' ? 'Sponsorship Level' : 'Event Scale'}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {tiers.map((tier, i) => (
              <button
                key={tier.short}
                onClick={() => setTierIndex(i)}
                className="px-5 py-2.5 text-xs tracking-[0.2em] uppercase font-light transition-all duration-400"
                style={{
                  background: tierIndex === i ? pathConfig.color : 'transparent',
                  color: tierIndex === i ? '#000' : 'rgba(255,255,255,0.3)',
                  border: `1px solid ${tierIndex === i ? pathConfig.color : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                {tier.short}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`badge-${tierIndex}-${userPath}`}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-4"
            >
              <span
                className="inline-flex items-center px-3 py-1 text-xs tracking-widest uppercase font-light"
                style={{
                  background: `${pathConfig.color}18`,
                  color: pathConfig.color,
                  border: `1px solid ${pathConfig.color}30`,
                }}
              >
                {currentTier.badge}
              </span>
              <span className="text-white/40 text-sm">{currentTier.label}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 md:p-12 flex flex-col gap-10"
            style={{ background: 'rgba(255,255,255,0.022)' }}
          >
            <div>
              <p className="text-white/60 text-sm md:text-base leading-relaxedtracking-widest uppercase mb-8">Performance Metrics</p>

              <div className="space-y-5 mb-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`bars-${tierIndex}-${userPath}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <ImpactBar score={results.exposureScore} color={pathConfig.color} label="Exposure Score" />
                    <ImpactBar score={results.audienceScore} color={pathConfig.color} label="Audience Quality" />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="space-y-0 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                {[
                  {
                    label: userPath === 'retail' ? 'Daily Store Footfall' : userPath === 'sponsor' ? 'Daily Brand Touchpoints' : 'Event Attendance',
                    value: fmt(results.dailyReach),
                    unit: 'per day',
                  },
                  { label: 'Annual Impressions', value: fmt(results.annualImpressions), unit: 'total reach' },
                  { label: 'Est. ROI Multiple', value: `${results.roiMultiple}×`, unit: 'projected return' },
                ].map(item => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-4 border-b"
                    style={{ borderColor: 'rgba(255,255,255,0.045)' }}
                  >
                    <span className="text-white/35 text-sm">{item.label}</span>
                    <div className="text-right">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${item.label}-${tierIndex}-${userPath}`}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{ duration: 0.22 }}
                          className="font-light"
                          style={{ color: pathConfig.color, fontSize: '1.25rem', letterSpacing: '-0.01em' }}
                        >
                          {item.value}
                        </motion.div>
                      </AnimatePresence>
                      <div className="text-white/18 text-xs mt-0.5">{item.unit}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 md:p-12 flex flex-col gap-10"
            style={{ background: 'rgba(255,255,255,0.022)' }}
          >
            <div>
              <p className="text-white/60 text-sm md:text-base leading-relaxed tracking-widest uppercase mb-6">Monthly Reach Projection</p>
              <div style={{ height: 160 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={results.chart} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id="simGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={pathConfig.color} stopOpacity={0.22} />
                        <stop offset="95%" stopColor={pathConfig.color} stopOpacity={0.01} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="month"
                      tick={{ fill: 'rgba(255,255,255,0.18)', fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{ background: '#0a0a0a', border: 'none', fontSize: 11, color: 'rgba(255,255,255,0.65)' }}
                      formatter={(v: number) => [fmt(v), 'Reach']}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={pathConfig.color}
                      strokeWidth={1.5}
                      fill="url(#simGrad)"
                      dot={false}
                      animationDuration={900}
                      animationEasing="ease-in-out"
                      isAnimationActive={true}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div
              className="border p-7 mt-auto"
              style={{ borderColor: `${pathConfig.color}22`, background: `${pathConfig.color}05` }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`summary-${tierIndex}-${userPath}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-4" style={{ background: pathConfig.color }} />
                    <p className="text-xs tracking-widest uppercase" style={{ color: pathConfig.color, opacity: 0.75 }}>
                      What this means
                    </p>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">
                    {currentTier.interpretation}
                  </p>
                  <p className="text-white/30 text-sm leading-relaxed">
                    Projected{' '}
                    <span className="text-white/65">{fmt(results.annualImpressions)} annual impressions</span>
                    {' '}with an 82% international audience, delivering an estimated{' '}
                    <span style={{ color: pathConfig.color }}>{results.roiMultiple}× return</span>.
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
