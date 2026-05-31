import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DiningSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);
  const menuCardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ----------------------------------------------------
      // 1. DESKTOP VIEW (Min-width: 769px)
      // ----------------------------------------------------
      mm.add("(min-width: 769px)", () => {
        // [CRITICAL FIX]: Initial desktop states set before timeline runs
        gsap.set(leftImageRef.current, { x: '-65vw', opacity: 0 });
        gsap.set(rightPanelRef.current, { x: '35vw', opacity: 0 });
        gsap.set(textOverlayRef.current?.children || [], { y: 18, opacity: 0 });
        gsap.set(menuCardRef.current, { y: '12vh', opacity: 0 });

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=80%',
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        // Desktop Entrance (Cleaned using .to())
        scrollTl.to(leftImageRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(rightPanelRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(textOverlayRef.current?.children || [], { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.05);
        scrollTl.to(menuCardRef.current, { y: 0, opacity: 1, ease: 'none' }, 0.1);

        // Desktop Exit
        scrollTl.to(leftImageRef.current, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7);
        scrollTl.to(rightPanelRef.current, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7);
        scrollTl.to(textOverlayRef.current?.children || [], { y: -12, opacity: 0, stagger: 0.01, ease: 'power2.in' }, 0.7);
        scrollTl.to(menuCardRef.current, { y: '-8vh', opacity: 0, ease: 'power2.in' }, 0.7);
      });

      // ----------------------------------------------------
      // 2. MOBILE VIEW (Max-width: 768px) 📱
      // ----------------------------------------------------
      mm.add("(max-width: 768px)", () => {
        // [CRITICAL FIX]: Initial mobile states set before timeline runs
        gsap.set(leftImageRef.current, { x: '-40vw', opacity: 0 });
        gsap.set(rightPanelRef.current, { x: '20vw', opacity: 0 });
        gsap.set(textOverlayRef.current?.children || [], { y: 12, opacity: 0 });
        gsap.set(menuCardRef.current, { y: '8vh', opacity: 0 });

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 30%', // Screen ke andar aate hi smooth entry shuru
            end: '+=50%',
            pin: false,
            scrub: 1,
          },
        });

        // Mobile Entrance
        scrollTl.to(leftImageRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(rightPanelRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(textOverlayRef.current?.children || [], { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.05);
        scrollTl.to(menuCardRef.current, { y: 0, opacity: 1, ease: 'none' }, 0.1);

        // Mobile Exit
        scrollTl.to(leftImageRef.current, { x: '-12vw', opacity: 0, ease: 'power2.in' }, 0.7);
        scrollTl.to(rightPanelRef.current, { x: '8vw', opacity: 0, ease: 'power2.in' }, 0.7);
        scrollTl.to(textOverlayRef.current?.children || [], { y: 0, opacity: 1 }, { y: -10, opacity: 0, stagger: 0.01, ease: 'power2.in' }, 0.7);
        scrollTl.to(menuCardRef.current, { y: '-6vh', opacity: 0, ease: 'power2.in' }, 0.7);
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="dining"
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#F4F1EA] pt-16 scroll-mt-24 lg:block lg:h-screen lg:w-screen lg:pt-0 lg:scroll-mt-0 z-[16]"
    >
      {/* Left restaurant photo (Added client safety style) */}
      <div
        ref={leftImageRef}
        style={{ opacity: 0 }}
        className="relative h-[44vh] w-full lg:absolute lg:left-0 lg:top-0 lg:h-full lg:w-[65vw]"
      >
        <img
          src="/images/dining_table.jpg"
          alt="Restaurant dining"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right panel (Added client safety style) */}
      <div
        ref={rightPanelRef}
        style={{ opacity: 0 }}
        className="hidden lg:block lg:absolute lg:left-[65vw] lg:top-0 lg:h-full lg:w-[35vw] lg:bg-[#F4F1EA]"
      />

      {/* Text overlay (Added client safety style) */}
      <div
        ref={textOverlayRef}
        style={{ opacity: 0 }}
        className="relative w-full px-6 py-8 lg:absolute lg:left-[3vw] lg:top-[8vh] lg:w-[44vw] lg:px-0 lg:py-0"
      >
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#6A6560] block mb-4">
          Dining
        </span>
        <h2 className="font-display text-[clamp(34px,3.8vw,52px)] leading-[1.06] text-[#111111] pb-1">
          Small plates,
          <br />
          big flavors.
        </h2>
      </div>

      {/* Menu CTA card (Added client safety style) */}
      <div
        ref={menuCardRef}
        style={{ opacity: 0 }}
        className="relative mx-6 mb-10 w-[calc(100%-3rem)] border border-[rgba(17,17,17,0.18)] bg-[rgba(244,241,234,0.92)] p-6 lg:absolute lg:left-[3vw] lg:bottom-[7vh] lg:mx-0 lg:mb-0 lg:w-[34vw]"
      >
        <h3 className="font-display text-xl text-[#111111] mb-2">Evening Menu</h3>
        <p className="font-body text-sm text-[#6A6560] mb-4">
          Seasonal thali &bull; Grilled fish &bull; House dal
        </p>
        <button className="font-body text-sm px-5 py-2 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-300">
          See full menu
        </button>
      </div>
    </section>
  );
}