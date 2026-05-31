import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import BookingWidget from './sections/BookingWidget';
import RoomsSection from './sections/RoomsSection';
import SuitesSection from './sections/SuitesSection';
import WhyStaySection from './sections/WhyStaySection';
import DiningSection from './sections/DiningSection';
import HeritageSection from './sections/HeritageSection';
import AmenitiesSection from './sections/AmenitiesSection';
import LocationSection from './sections/LocationSection';
import OffersSection from './sections/OffersSection';
import GallerySection from './sections/GallerySection';
import ReviewsSection from './sections/ReviewsSection';
import FooterSection from './sections/FooterSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', () => ScrollTrigger.update());

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);

    gsap.ticker.lagSmoothing(0);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener('resize', onResize);

    // Global snap configuration for pinned sections
    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    };

    // Delay snap setup to ensure all ScrollTriggers are created
    ScrollTrigger.addEventListener('refresh', setupGlobalSnap);
    ScrollTrigger.refresh();
    setupGlobalSnap();

    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.ticker.remove(onTick);
    };
  }, []);

  return (
    <div className="relative">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Sections */}
      <main className="relative">
        <HeroSection />
        <BookingWidget />
        <RoomsSection />
        <SuitesSection />
        <WhyStaySection />
        <DiningSection />
        <HeritageSection />
        <AmenitiesSection />
        <LocationSection />
        <OffersSection />
        <GallerySection />
        <ReviewsSection />
        <FooterSection />
      </main>
    </div>
  );
}

export default App;
