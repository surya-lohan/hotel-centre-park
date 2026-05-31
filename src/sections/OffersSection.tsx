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

      // Card entrance
      scrollTl.fromTo(
        cardRef.current,
        { y: 18, opacity: 0, scale: 0.99 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
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
        cardRef.current,
        { y: 0, opacity: 1 },
        { y: -12, opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="offers"
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#F4F1EA] pt-16 scroll-mt-24 lg:block lg:h-screen lg:w-screen lg:pt-0 lg:scroll-mt-0 z-[20]"
    >
      {/* Left food photo */}
      <div
        ref={leftImageRef}
        className="relative h-[42vh] w-full lg:absolute lg:left-0 lg:top-0 lg:h-full lg:w-[65vw]"
      >
        <img
          src="/images/food_plate.jpg"
          alt="Food plate"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right offer card panel */}
      <div
        ref={rightPanelRef}
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
