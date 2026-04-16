'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { UserPath } from '@/lib/types';
import { PATH_CONFIG } from '@/lib/data';

interface FinalCTAProps {
  userPath: UserPath;
}

const CTA_CONFIG = {
  retail: {
    eyebrow: 'Leasing Opportunities',
    closing: '105 Million Visitors.',
    closingAccent: 'One Address.',
    body: 'Selective leasing across Fashion Avenue, the Luxury Spine, and curated brand districts. Our team works directly with brand principals.',
    primaryCTA: 'Request a Proposal',
    secondaryCTA: 'Schedule a Site Tour',
    stats: [
      { v: '99.2%', l: 'Occupancy Rate' },
      { v: 'AED 28B', l: 'Annual Retail Sales' },
      { v: '1,200+', l: 'Current Tenants' },
    ],
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
  sponsor: {
    eyebrow: 'Partnership Opportunities',
    closing: '2.1 Billion Impressions.',
    closingAccent: 'One Platform.',
    body: 'Category-exclusive partnerships for global brands. Our team works with a select group of partners on high-impact commercial activations.',
    primaryCTA: 'Explore Packages',
    secondaryCTA: 'Meet the Team',
    stats: [
      { v: '2.1B', l: 'Annual Impressions' },
      { v: '180+', l: 'Countries Reached' },
      { v: '92%', l: 'Brand Recall Rate' },
    ],
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
  event: {
    eyebrow: 'Event Opportunities',
    closing: 'The World',
    closingAccent: 'Is Watching.',
    body: 'From intimate brand activations to international spectacles. Dubai Mall supports productions of any scale, on the planet\'s largest event canvas.',
    primaryCTA: 'Submit a Proposal',
    secondaryCTA: 'Explore Spaces',
    stats: [
      { v: '500+', l: 'Events Per Year' },
      { v: '120K', l: 'Peak Capacity' },
      { v: '2.1B', l: 'Global Impressions' },
    ],
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
  explore: {
    eyebrow: 'Find Your Opportunity',
    closing: 'Every Ambition.',
    closingAccent: 'One Address.',
    body: 'Whether you\'re a brand, a partner, or a producer — Dubai Mall offers an unmatched platform at every scale. Tell us about your vision and we\'ll find the right fit.',
    primaryCTA: 'Start a Conversation',
    secondaryCTA: 'Download Overview',
    stats: [
      { v: '105M', l: 'Annual Visitors' },
      { v: '500+', l: 'Events Per Year' },
      { v: '2.1B', l: 'Global Impressions' },
    ],
    image: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
};

export default function FinalCTA({ userPath }: FinalCTAProps) {
  const config = CTA_CONFIG[userPath];
  const pathConfig = PATH_CONFIG[userPath];
  const [formData, setFormData] = useState({ name: '', company: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative min-h-screen bg-black flex flex-col justify-center overflow-hidden" id="cta">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${config.image})`, filter: 'brightness(0.07) saturate(0.4)' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 35% 55%, ${pathConfig.color}09 0%, transparent 55%)` }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 100%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-8 md:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-28 items-start">

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-xs tracking-[0.6em] uppercase mb-8 font-light"
              style={{ color: pathConfig.color, opacity: 0.6 }}
            >
              {config.eyebrow}
            </p>

            <h2
              className="text-white font-light leading-none mb-2"
              style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)', letterSpacing: '-0.035em' }}
            >
              {config.closing}
            </h2>
            <h2
              className="font-light leading-none mb-10"
              style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)', letterSpacing: '-0.035em', color: pathConfig.color }}
            >
              {config.closingAccent}
            </h2>

            <p className="text-white/32 text-sm leading-relaxed max-w-sm mb-12">{config.body}</p>

            <div
              className="grid grid-cols-3 gap-6 mb-12 pt-10 border-t"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              {config.stats.map(s => (
                <div key={s.l}>
                  <div
                    className="font-light mb-1.5"
                    style={{ color: pathConfig.color, fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', letterSpacing: '-0.02em' }}
                  >
                    {s.v}
                  </div>
                  <div className="text-white/60 text-sm md:text-base leading-relaxed tracking-widest uppercase leading-snug">{s.l}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="group relative px-8 py-4 overflow-hidden text-xs tracking-[0.25em] uppercase font-medium transition-all duration-500 min-h-[52px] active:opacity-90"
                style={{ background: pathConfig.color, color: '#000' }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: 'rgba(255,255,255,0.1)' }} />
                <span className="relative z-10">{config.primaryCTA}</span>
              </button>
              <button
                className="px-8 py-4 border text-white/38 hover:text-white/65 text-xs tracking-[0.25em] uppercase font-light transition-all duration-400"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
              >
                {config.secondaryCTA}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="border p-8 md:p-10"
              style={{ background: 'rgba(255,255,255,0.018)', borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="confirmed"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-14 text-center"
                  >
                    <motion.div
                      className="w-14 h-14 border-2 flex items-center justify-center mx-auto mb-7"
                      style={{ borderColor: pathConfig.color }}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, type: 'spring', bounce: 0.4 }}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M3 10L8 15L17 5" stroke={pathConfig.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                    <h4 className="text-white font-light text-2xl mb-3" style={{ letterSpacing: '-0.02em' }}>
                      Inquiry Received
                    </h4>
                    <p className="text-white/45 text-sm leading-relaxed max-w-xs mx-auto mb-2">
                      Thank you. Our team will be in touch within 24 hours.
                    </p>
                    <p className="text-white/50 text-sm tracking-widest uppercase">
                      Check your inbox at {formData.email || 'your email'}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between mb-7">
                      <p className="text-white/45 text-xs tracking-widest uppercase">Get in Touch</p>
                      <p className="text-white/60 text-sm md:text-base leading-relaxed">All fields required</p>
                    </div>

                    {[
                      { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
                      { key: 'company', label: 'Brand / Company', type: 'text', placeholder: 'Your organisation' },
                      { key: 'email', label: 'Email Address', type: 'email', placeholder: 'email@brand.com' },
                    ].map(field => (
                      <div key={field.key}>
                        <label
                          className="block text-xs tracking-widest uppercase mb-2 transition-colors duration-300"
                          style={{ color: focused === field.key ? pathConfig.color : 'rgba(255,255,255,0.35)' }}
                        >
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          required
                          placeholder={field.placeholder}
                          value={formData[field.key as keyof typeof formData]}
                          onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                          className="w-full bg-transparent border-b py-3 text-white/75 text-sm placeholder:text-white/20 outline-none transition-colors duration-300"
                          style={{ borderColor: focused === field.key ? `${pathConfig.color}60` : 'rgba(255,255,255,0.1)' }}
                          onFocus={() => setFocused(field.key)}
                          onBlur={() => setFocused(null)}
                        />
                      </div>
                    ))}

                    <div>
                      <label
                        className="block text-xs tracking-widest uppercase mb-2 transition-colors duration-300"
                        style={{ color: focused === 'message' ? pathConfig.color : 'rgba(255,255,255,0.35)' }}
                      >
                        Message <span className="text-white/20 normal-case tracking-normal">(optional)</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Brief overview of your interest"
                        value={formData.message}
                        onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full bg-transparent border-b py-3 text-white/75 text-sm placeholder:text-white/20 outline-none transition-colors duration-300 resize-none"
                        style={{ borderColor: focused === 'message' ? `${pathConfig.color}60` : 'rgba(255,255,255,0.1)' }}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused(null)}
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-4 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 hover:opacity-90 active:scale-[0.99]"
                        style={{ background: pathConfig.color, color: '#000' }}
                      >
                        Send Inquiry
                      </button>
                    </div>

                    <p className="text-white/18 text-xs text-center">
                      Your information is kept strictly confidential.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>

      <div
        className="relative z-10 border-t py-7 px-6 md:px-10"
        style={{ borderColor: 'rgba(255,255,255,0.04)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/15 text-xs tracking-widest uppercase">Dubai Mall &mdash; Emaar Properties</p>
          <p className="text-white/10 text-xs">Downtown Dubai, UAE</p>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full" style={{ background: pathConfig.color }} />
            <span className="text-xs tracking-widest uppercase font-light" style={{ color: pathConfig.color, opacity: 0.45 }}>
              {pathConfig.label}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
