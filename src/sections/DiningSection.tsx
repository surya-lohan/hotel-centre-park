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
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=80%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Left image entrance
      scrollTl.fromTo(
        leftImageRef.current,
        { x: '-65vw', opacity: 0.9 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Right panel entrance
      scrollTl.fromTo(
        rightPanelRef.current,
        { x: '35vw', opacity: 0.9 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Text overlay entrance
      scrollTl.fromTo(
        textOverlayRef.current?.children || [],
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.05
      );

      // Menu card entrance
      scrollTl.fromTo(
        menuCardRef.current,
        { y: '12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Exit
      scrollTl.fromTo(
        leftImageRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        rightPanelRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        textOverlayRef.current?.children || [],
        { y: 0, opacity: 1 },
        { y: -12, opacity: 0, stagger: 0.01, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        menuCardRef.current,
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="dining"
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#F4F1EA] pt-16 scroll-mt-24 lg:block lg:h-screen lg:w-screen lg:pt-0 lg:scroll-mt-0 z-[16]"
    >
      {/* Left restaurant photo */}
      <div
        ref={leftImageRef}
        className="relative h-[44vh] w-full lg:absolute lg:left-0 lg:top-0 lg:h-full lg:w-[65vw]"
      >
        <img
          src="/images/dining_table.jpg"
          alt="Restaurant dining"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right panel */}
      <div
        ref={rightPanelRef}
        className="hidden lg:block lg:absolute lg:left-[65vw] lg:top-0 lg:h-full lg:w-[35vw] lg:bg-[#F4F1EA]"
      />

      {/* Text overlay */}
      <div
        ref={textOverlayRef}
        className="relative w-full px-6 py-8 lg:absolute lg:left-[3vw] lg:top-[8vh] lg:w-[44vw] lg:px-0 lg:py-0"
      >
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#6A6560] block mb-4">
          Dining
        </span>
        <h2 className="font-display text-[clamp(34px,3.8vw,52px)] leading-[1.0] text-[#111111]">
          Small plates,
          <br />
          big flavors.
        </h2>
      </div>

      {/* Menu CTA card */}
      <div
        ref={menuCardRef}
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
