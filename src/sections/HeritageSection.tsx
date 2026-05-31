import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeritageSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

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
        gsap.set(leftPanelRef.current, { x: '-35vw', opacity: 0 });
        gsap.set(rightImageRef.current, { x: '65vw', opacity: 0 });
        gsap.set(textContentRef.current?.children || [], { y: 22, opacity: 0 });

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

        // Desktop Entrance (Cleaned using .to())
        scrollTl.to(leftPanelRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(rightImageRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(textContentRef.current?.children || [], { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.05);

        // Desktop Exit
        scrollTl.to(leftPanelRef.current, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to(rightImageRef.current, { x: '18vw', scale: 1.03, opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to(textContentRef.current?.children || [], { y: -14, opacity: 0, stagger: 0.01, ease: 'power2.in' }, 0.6);
      });

      // ----------------------------------------------------
      // 2. MOBILE VIEW (Max-width: 768px) 📱
      // ----------------------------------------------------
      mm.add("(max-width: 768px)", () => {
        // [CRITICAL FIX]: Mobile positions ke liye scroll se pehle state set ki
        gsap.set(leftPanelRef.current, { x: '-20vw', opacity: 0 });
        gsap.set(rightImageRef.current, { x: '25vw', opacity: 0 });
        gsap.set(textContentRef.current?.children || [], { y: 12, opacity: 0 });

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 30%',  // Soft screen entry padding
            end: '+=40%',
            pin: false,
            scrub: 1,
          },
        });

        // Mobile Entrance
        scrollTl.to(leftPanelRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(rightImageRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(textContentRef.current?.children || [], { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.05);

        // Mobile Exit
        scrollTl.to(leftPanelRef.current, { x: '-10vw', opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to(rightImageRef.current, { x: '10vw', opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to(textContentRef.current?.children || [], { y: -10, opacity: 0, stagger: 0.01, ease: 'power2.in' }, 0.6);
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#F4F1EA] pt-16 lg:block lg:h-screen lg:w-screen lg:pt-0 z-[17]"
    >
      {/* Left typography panel (Added visibility styles) */}
      <div
        ref={leftPanelRef}
        style={{ opacity: 0 }}
        className="relative w-full bg-[#F4F1EA] px-6 py-8 lg:absolute lg:left-0 lg:top-0 lg:flex lg:h-full lg:w-[35vw] lg:items-center lg:px-0 lg:py-0"
      >
        <div
          ref={textContentRef}
          className="w-full lg:px-[3.2vw] lg:py-[6vh] lg:-translate-y-[6vh]"
        >
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#6A6560] block mb-4">
            Heritage
          </span>
          <h2 className="font-display text-[clamp(34px,3.8vw,52px)] leading-[1.06] text-[#111111] mb-5 pb-1">
            Built for comfort.
            <br />
            Rooted in Bhopal.
          </h2>
          <p className="font-body text-base text-[#6A6560] leading-relaxed mb-6 max-w-full lg:max-w-[24vw]">
            Classic details, modern essentials, and a team that remembers your name.
          </p>
          <button className="font-body text-sm px-6 py-3 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-300">
            Read our story
          </button>
        </div>
      </div>

      {/* Right corridor image (Added visibility styles) */}
      <div
        ref={rightImageRef}
        style={{ opacity: 0 }}
        className="relative h-[44vh] w-full lg:absolute lg:left-[35vw] lg:top-0 lg:h-full lg:w-[65vw]"
      >
        <img
          src="/images/corridor.jpg"
          alt="Hotel corridor"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}