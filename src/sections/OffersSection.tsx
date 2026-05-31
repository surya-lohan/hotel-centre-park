import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function OffersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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
        gsap.set(cardRef.current, { y: 18, opacity: 0, scale: 0.99 });

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
        scrollTl.to(leftImageRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(rightPanelRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(cardRef.current, { y: 0, opacity: 1, scale: 1, ease: 'none' }, 0.1);

        // Desktop Exit
        scrollTl.to(leftImageRef.current, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to(rightPanelRef.current, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to(cardRef.current, { y: -12, opacity: 0, ease: 'power2.in' }, 0.6);
      });

      // ----------------------------------------------------
      // 2. MOBILE VIEW (Max-width: 768px) 📱
      // ----------------------------------------------------
      mm.add("(max-width: 768px)", () => {
        // [CRITICAL FIX]: Initial mobile layout block configuration
        gsap.set(leftImageRef.current, { x: '-20vw', opacity: 0 });
        gsap.set(rightPanelRef.current, { x: '20vw', opacity: 0 });
        gsap.set(cardRef.current, { y: 10, opacity: 0, scale: 0.97 });

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 30%',  // Smooth viewport tracking entry
            end: '+=40%',
            pin: false,
            scrub: 1,
          },
        });

        // Mobile Entrance
        scrollTl.to(leftImageRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(rightPanelRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(cardRef.current, { y: 0, opacity: 1, scale: 1, ease: 'none' }, 0.1);

        // Mobile Exit
        scrollTl.to(leftImageRef.current, { x: '-10vw', opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to(rightPanelRef.current, { x: '10vw', opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to(cardRef.current, { y: -8, opacity: 0, ease: 'power2.in' }, 0.6);
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="offers"
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#F4F1EA] pt-16 scroll-mt-24 lg:block lg:h-screen lg:w-screen lg:pt-0 lg:scroll-mt-0 z-[20]"
    >
      {/* Left food photo (Added hydration flash guard style) */}
      <div
        ref={leftImageRef}
        style={{ opacity: 0 }}
        className="relative h-[42vh] w-full lg:absolute lg:left-0 lg:top-0 lg:h-full lg:w-[65vw]"
      >
        <img
          src="/images/food_plate.jpg"
          alt="Food plate"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right offer card panel (Added hydration flash guard style) */}
      <div
        ref={rightPanelRef}
        style={{ opacity: 0 }}
        className="relative flex w-full items-center justify-center bg-[#F4F1EA] px-6 py-8 lg:absolute lg:left-[65vw] lg:top-0 lg:h-full lg:w-[35vw] lg:px-[3.2vw] lg:py-0"
      >
        <div
          ref={cardRef}
          className="w-full border border-[rgba(17,17,17,0.18)] bg-white p-6 lg:p-[3.2vw]"
          style={{ boxShadow: '0 18px 60px rgba(0,0,0,0.10)' }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#D4A05D] block mb-3">
            Special Offer
          </span>
          <h3 className="font-display text-2xl text-[#111111] mb-3">
            Weekend Stay Offer
          </h3>
          <p className="font-body text-sm text-[#6A6560] leading-relaxed mb-5">
            Book two nights and save 15%. Includes breakfast and late checkout.
          </p>
          <button className="font-body text-sm px-6 py-3 bg-[#111111] text-white hover:bg-[#D4A05D] transition-colors duration-300 mb-3">
            Claim offer
          </button>
          <p className="font-mono text-[10px] text-[#6A6560] tracking-wide">
            Valid Thu–Sun. Subject to availability.
          </p>
        </div>
      </div>
    </section>
  );
}