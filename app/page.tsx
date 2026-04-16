'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ExperienceStage, UserPath } from '@/lib/types';
import CinematicIntro from '@/components/intro/CinematicIntro';
import PathSelector from '@/components/onboarding/PathSelector';
import FloatingNav from '@/components/navigation/FloatingNav';
import FinalCTA from '@/components/cta/FinalCTA';
import StoryBenefits from '@/components/story/StoryBenefits';
const SubModuleHub = dynamic(() => import('@/components/submodules/SubModuleHub'), { ssr: false });
const VenueShowcase = dynamic(() => import('@/components/venues/VenueShowcase'), {ssr: false,});
const OpportunitySimulator = dynamic(() => import('@/components/simulator/OpportunitySimulator'), {ssr: false,});
const PropertyMap = dynamic(() => import('@/components/map/PropertyMap'), {ssr: false,});
const ContentModules = dynamic(() => import('@/components/modules/ContentModules'), { ssr: false,});

export default function Home() {
  const [stage, setStage] = useState<ExperienceStage>('intro');
  const [userPath, setUserPath] = useState<UserPath>('retail');
  const [activeSection, setActiveSection] = useState('map');

  const mapRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<HTMLDivElement>(null);
  const venuesRef = useRef<HTMLDivElement>(null);
  const submodulesRef = useRef<HTMLDivElement>(null);
  const simulatorRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const handleIntroComplete = () => setStage('pathSelect');

  const handlePathSelect = (path: UserPath) => {
    setUserPath(path);
    setStage('experience');
    if (path !== 'explore') {
      setTimeout(() => {
        submodulesRef.current?.scrollIntoView({ behavior: 'smooth' });
        setActiveSection('submodules');
      }, 400);
    }
  };

  const handleChangePath = () => {
    setStage('pathSelect');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleRestart = () => {
    setStage('intro');
    setUserPath('retail');
    setActiveSection('map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    const refMap: Record<string, React.RefObject<HTMLDivElement>> = {
      map: mapRef,
      story: storyRef,
      modules: modulesRef,
      venues: venuesRef,
      submodules: submodulesRef,
      simulator: simulatorRef,
      cta: ctaRef,
    };
    refMap[section]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (stage !== 'experience') return;
    const sections = [
      { id: 'map', ref: mapRef },
      { id: 'story', ref: storyRef },
      { id: 'modules', ref: modulesRef },
      { id: 'venues', ref: venuesRef },
      { id: 'submodules', ref: submodulesRef },
      { id: 'simulator', ref: simulatorRef },
      { id: 'cta', ref: ctaRef },
    ];
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const match = sections.find(s => s.ref.current === entry.target);
            if (match) setActiveSection(match.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach(s => { if (s.ref.current) observer.observe(s.ref.current); });
    return () => observer.disconnect();
  }, [stage]);

  return (
    <main className="relative bg-black min-h-screen">
      <AnimatePresence mode="wait">
        {stage === 'intro' && (
          <CinematicIntro key="intro" onComplete={handleIntroComplete} />
        )}
        {stage === 'pathSelect' && (
          <PathSelector key="pathSelect" onSelect={handlePathSelect} />
        )}
      </AnimatePresence>

      {stage === 'experience' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <FloatingNav
            userPath={userPath}
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            onRestart={handleRestart}
            onChangePath={handleChangePath}
          />
          <div ref={mapRef}>
            <PropertyMap />
          </div>
          <div ref={storyRef}>
            <StoryBenefits userPath={userPath} />
          </div>
          <div ref={modulesRef}>
            <ContentModules userPath={userPath} />
          </div>
          <div ref={venuesRef}>
            <VenueShowcase />
          </div>
          <div ref={submodulesRef}>
            <SubModuleHub userPath={userPath} />
          </div>
          <div ref={simulatorRef}>
            <OpportunitySimulator userPath={userPath} />
          </div>
          <div ref={ctaRef}>
            <FinalCTA userPath={userPath} />
          </div>
        </motion.div>
      )}
    </main>
  );
}
