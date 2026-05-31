import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AmenitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
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
        // [CRITICAL FIX]: Scroll hone se pehle hi initial states set kar di
        gsap.set(leftImageRef.current, { x: '-65vw', opacity: 0 });
        gsap.set(rightPanelRef.current, { x: '35vw', opacity: 0 });
        gsap.set(listRef.current?.children || [], { y: 16, opacity: 0 });

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

        // Desktop Entrance (Using clean .to())
        scrollTl.to(leftImageRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(rightPanelRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(listRef.current?.children || [], { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.08);

        // Desktop Exit
        scrollTl.to(leftImageRef.current, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to(rightPanelRef.current, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to(listRef.current?.children || [], { y: -10, opacity: 0, stagger: 0.01, ease: 'power2.in' }, 0.6);
      });

      // ----------------------------------------------------
      // 2. MOBILE VIEW (Max-width: 768px) 📱
      // ----------------------------------------------------
      mm.add("(max-width: 768px)", () => {
        // [CRITICAL FIX]: Mobile positions ke liye scroll se pehle state set ki
        gsap.set(leftImageRef.current, { x: '-25vw', opacity: 0 });
        gsap.set(rightPanelRef.current, { x: '20vw', opacity: 0 });
        gsap.set(listRef.current?.children || [], { y: 10, opacity: 0 });

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 30%',  // Thoda upar pahuche tabhi trigger ho seamless feel ke liye
            end: '+=40%',
            pin: false,
            scrub: 1,
          },
        });

        // Mobile Entrance
        scrollTl.to(leftImageRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(rightPanelRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(listRef.current?.children || [], { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.08);

        // Mobile Exit
        scrollTl.to(leftImageRef.current, { x: '-10vw', opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to(rightPanelRef.current, { x: '10vw', opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to(listRef.current?.children || [], { y: -6, opacity: 0, stagger: 0.01, ease: 'power2.in' }, 0.6);
      });

    }, section);

    return () => ctx.revert();
  }, []);

  const amenities = [
    'In-room tea & coffee',
    'Daily breakfast',
    'High-speed Wi-Fi',
    'Laundry service',
    'Courtyard garden',
    '24/7 front desk',
    'Parking',
    'Airport transfers',
  ];

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#F4F1EA] pt-16 lg:block lg:h-screen lg:w-screen lg:pt-0 z-[18]"
    >
      {/* Left courtyard photo (Added pre-hydration safety style) */}
      <div
        ref={leftImageRef}
        style={{ opacity: 0 }}
        className="relative h-[42vh] w-full lg:absolute lg:left-0 lg:top-0 lg:h-full lg:w-[65vw]"
      >
        <img
          src="/images/courtyard.jpg"
          alt="Courtyard garden"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right panel (Added pre-hydration safety style) */}
      <div
        ref={rightPanelRef}
        style={{ opacity: 0 }}
        className="relative w-full bg-[#F4F1EA] px-6 py-8 lg:absolute lg:left-[65vw] lg:top-0 lg:flex lg:h-full lg:w-[35vw] lg:flex-col lg:justify-center lg:px-[3.2vw] lg:py-0"
      >
        <h2 className="font-display text-[clamp(28px,2.8vw,40px)] leading-[1.05] text-[#111111] mb-8">
          Everything you need.
        </h2>

        <div ref={listRef} className="flex flex-col">
          {amenities.map((item, i) => (
            <div
              key={i}
              className="py-3 border-b border-[rgba(17,17,17,0.12)] flex items-center gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4A05D]" />
              <span className="font-body text-sm text-[#111111]">{item}</span>
            </div>
          ))}
        </div>

        <button className="mt-8 font-body text-sm px-6 py-3 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-300 self-start">
          Ask about packages
        </button>
      </div>
    </section>
  );
}