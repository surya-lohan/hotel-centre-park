import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const cardARef = useRef<HTMLDivElement>(null);
  const cardBRef = useRef<HTMLDivElement>(null);
  const cardCRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ----------------------------------------------------
      // 1. DESKTOP VIEW (Min-width: 769px)
      // ----------------------------------------------------
      mm.add("(min-width: 769px)", () => {
        // [CRITICAL FIX]: Timeline chalne se PEHLE hi initial states lock kar di
        gsap.set(leftPanelRef.current, { x: '-35vw', opacity: 0 });
        gsap.set(cardARef.current, { x: '40vw', opacity: 0, scale: 0.96 });
        gsap.set(cardBRef.current, { x: '40vw', opacity: 0, scale: 0.96 });
        gsap.set(cardCRef.current, { x: '40vw', opacity: 0, scale: 0.96 });
        gsap.set(listRef.current?.children || [], { y: 14, opacity: 0 });

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=40%',
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        // Desktop Entrance (Refactored using clean .to())
        scrollTl.to(leftPanelRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(cardARef.current, { x: 0, opacity: 1, scale: 1, ease: 'none' }, 0);
        scrollTl.to(cardBRef.current, { x: 0, opacity: 1, scale: 1, ease: 'none' }, 0.05);
        scrollTl.to(cardCRef.current, { x: 0, opacity: 1, scale: 1, ease: 'none' }, 0.1);
        scrollTl.to(listRef.current?.children || [], { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.08);

        // Desktop Exit
        scrollTl.to(leftPanelRef.current, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to([cardARef.current, cardBRef.current, cardCRef.current], { x: '-10vw', opacity: 0, stagger: 0.02, ease: 'power2.in' }, 0.6);
        scrollTl.to(listRef.current?.children || [], { opacity: 0, stagger: 0.01, ease: 'power2.in' }, 0.6);
      });

      // ----------------------------------------------------
      // 2. MOBILE VIEW (Max-width: 768px) 📱
      // ----------------------------------------------------
      mm.add("(max-width: 768px)", () => {
        // [CRITICAL FIX]: Mobile coordinates ke liye scroll se pehle state set ki
        gsap.set(leftPanelRef.current, { x: '-15vw', opacity: 0 });
        gsap.set(cardARef.current, { x: '15vw', opacity: 0, scale: 0.94 });
        gsap.set(cardBRef.current, { x: '15vw', opacity: 0, scale: 0.94 });
        gsap.set(cardCRef.current, { x: '15vw', opacity: 0, scale: 0.94 });
        gsap.set(listRef.current?.children || [], { y: 10, opacity: 0 });

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 30%',  // Smooth responsive screen padding entry
            end: '+=50%',
            pin: false,
            scrub: 1,
          },
        });

        // Mobile Entrance
        scrollTl.to(leftPanelRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(cardARef.current, { x: 0, opacity: 1, scale: 1, ease: 'none' }, 0);
        scrollTl.to(cardBRef.current, { x: 0, opacity: 1, scale: 1, ease: 'none' }, 0.05);
        scrollTl.to(cardCRef.current, { x: 0, opacity: 1, scale: 1, ease: 'none' }, 0.1);
        scrollTl.to(listRef.current?.children || [], { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.08);

        // Mobile Exit
        scrollTl.to(leftPanelRef.current, { x: '-8vw', opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to([cardARef.current, cardBRef.current, cardCRef.current], { x: '-6vw', opacity: 0, stagger: 0.02, ease: 'power2.in' }, 0.6);
        scrollTl.to(listRef.current?.children || [], { opacity: 0, stagger: 0.01, ease: 'power2.in' }, 0.6);
      });

    }, section);

    return () => ctx.revert();
  }, []);

  const galleryItems = ['Rooms', 'Suites', 'Dining', 'Courtyard', 'Neighborhood'];

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#F4F1EA] pt-16 lg:block lg:h-screen lg:w-screen lg:pt-0 z-[21]"
    >
      {/* Left gallery list panel (Added hydration overlay protection style) */}
      <div
        ref={leftPanelRef}
        style={{ opacity: 0 }}
        className="relative w-full bg-[#F4F1EA] px-6 py-8 lg:absolute lg:left-0 lg:top-0 lg:flex lg:h-full lg:w-[35vw] lg:flex-col lg:justify-center lg:px-[3.2vw] lg:py-0"
      >
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#6A6560] block mb-4">
          Gallery
        </span>
        <h2 className="font-display text-[clamp(34px,3.8vw,52px)] leading-[1.06] text-[#111111] mb-6 pb-1">
          Explore the hotel.
        </h2>

        <div ref={listRef} className="flex flex-col gap-3 mb-6">
          {galleryItems.map((item, i) => (
            <button
              key={i}
              className="font-body text-sm text-[#111111] text-left py-2 border-b border-[rgba(17,17,17,0.12)] hover:text-[#D4A05D] hover:border-[#D4A05D] transition-colors duration-300 flex items-center justify-between group"
            >
              {item}
              <span className="text-[#6A6560] group-hover:text-[#D4A05D] transition-colors">&rarr;</span>
            </button>
          ))}
        </div>

        <button className="font-body text-sm px-6 py-3 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-300 self-start">
          View all photos
        </button>
      </div>

      {/* Right stacked images area */}
      <div className="relative flex w-full flex-col gap-4 px-6 pb-8 lg:absolute lg:left-[35vw] lg:top-0 lg:block lg:h-full lg:w-[65vw] lg:gap-0 lg:px-0 lg:pb-0">
        {/* Card A (back) */}
        <div
          ref={cardARef}
          style={{ zIndex: 1, opacity: 0 }}
          className="relative h-[24vh] w-full overflow-hidden border border-[rgba(17,17,17,0.18)] lg:absolute lg:left-[7vw] lg:top-[18vh] lg:h-[64vh] lg:w-[22vw]"
        >
          <img
            src="/images/gallery_room.jpg"
            alt="Room detail"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card B (middle) */}
        <div
          ref={cardBRef}
          style={{ zIndex: 2, opacity: 0 }}
          className="relative h-[24vh] w-full overflow-hidden border border-[rgba(17,17,17,0.18)] lg:absolute lg:left-[15vw] lg:top-[14vh] lg:h-[64vh] lg:w-[22vw]"
        >
          <img
            src="/images/gallery_shelf.jpg"
            alt="Decor detail"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card C (front) */}
        <div
          ref={cardCRef}
          style={{ zIndex: 3, opacity: 0 }}
          className="relative h-[24vh] w-full overflow-hidden border border-[rgba(17,17,17,0.18)] lg:absolute lg:left-[23vw] lg:top-[10vh] lg:h-[64vh] lg:w-[22vw]"
        >
          <img
            src="/images/hero_portrait.jpg"
            alt="Hotel portrait"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}