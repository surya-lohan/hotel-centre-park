import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteMarkRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ----------------------------------------------------
      // 1. DESKTOP VIEW (Min-width: 769px)
      // ----------------------------------------------------
      mm.add("(min-width: 769px)", () => {
        // [CRITICAL FIX]: Initial desktop states set before timeline compiles
        gsap.set(leftImageRef.current, { x: '-65vw', opacity: 0 });
        gsap.set(rightPanelRef.current, { x: '35vw', opacity: 0 });
        gsap.set(quoteRef.current?.children || [], { y: 20, opacity: 0 });
        gsap.set(quoteMarkRef.current, { scale: 0.9, opacity: 0 });

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
        scrollTl.to(quoteRef.current?.children || [], { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.08);
        scrollTl.to(quoteMarkRef.current, { scale: 1, opacity: 0.7, ease: 'none' }, 0.12);

        // Desktop Exit
        scrollTl.to(leftImageRef.current, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to(rightPanelRef.current, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to(quoteRef.current?.children || [], { y: -12, opacity: 0, stagger: 0.01, ease: 'power2.in' }, 0.6);
        scrollTl.to(quoteMarkRef.current, { opacity: 0, ease: 'power2.in' }, 0.6);
      });

      // ----------------------------------------------------
      // 2. MOBILE VIEW (Max-width: 768px) 📱
      // ----------------------------------------------------
      mm.add("(max-width: 768px)", () => {
        // [CRITICAL FIX]: Initial mobile positions set before scroll tracking runs
        gsap.set(leftImageRef.current, { x: '-20vw', opacity: 0 });
        gsap.set(rightPanelRef.current, { x: '20vw', opacity: 0 });
        gsap.set(quoteRef.current?.children || [], { y: 12, opacity: 0 });
        gsap.set(quoteMarkRef.current, { scale: 0.94, opacity: 0 });

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 30%',  // Smooth layout entry boundaries
            end: '+=45%',
            pin: false,
            scrub: 1,
          },
        });

        // Mobile Entrance
        scrollTl.to(leftImageRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(rightPanelRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(quoteRef.current?.children || [], { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.08);
        scrollTl.to(quoteMarkRef.current, { scale: 1, opacity: 0.5, ease: 'none' }, 0.12);

        // Mobile Exit
        scrollTl.to(leftImageRef.current, { x: '-10vw', opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to(rightPanelRef.current, { x: '10vw', opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to(quoteRef.current?.children || [], { y: -10, opacity: 0, stagger: 0.01, ease: 'power2.in' }, 0.6);
        scrollTl.to(quoteMarkRef.current, { opacity: 0, ease: 'power2.in' }, 0.6);
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#F4F1EA] pt-16 lg:block lg:h-screen lg:w-screen lg:pt-0 z-[22]"
    >
      {/* Left portraits photo (Added hydration flash guard style) */}
      <div
        ref={leftImageRef}
        style={{ opacity: 0 }}
        className="relative h-[48vh] w-full lg:absolute lg:left-0 lg:top-0 lg:h-full lg:w-[65vw]"
      >
        <img
          src="/images/guests_portraits.jpg"
          alt="Happy guests"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gold quote mark (Added hydration flash guard style) */}
      <div
        ref={quoteMarkRef}
        style={{ opacity: 0 }}
        className="hidden lg:absolute lg:left-[18vw] lg:top-[52vh] lg:block lg:-translate-x-1/2 lg:-translate-y-1/2"
      >
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <path
            d="M20 40H12V24H28V40C28 48 22 54 14 56L10 50C16 48 20 44 20 40Z"
            fill="#D4A05D"
            opacity="0.7"
          />
          <path
            d="M48 40H40V24H56V40C56 48 50 54 42 56L38 50C44 48 48 44 48 40Z"
            fill="#D4A05D"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Right quote panel (Added hydration flash guard style) */}
      <div
        ref={rightPanelRef}
        style={{ opacity: 0 }}
        className="relative flex w-full items-center bg-[#F4F1EA] px-6 py-8 lg:absolute lg:left-[65vw] lg:top-0 lg:h-full lg:w-[35vw] lg:px-[3.2vw] lg:py-0"
      >
        <div ref={quoteRef} className="w-full">
          <blockquote className="font-display text-[clamp(22px,2.2vw,32px)] leading-[1.2] text-[#111111] mb-6">
            &ldquo;We stayed three nights. The bed was perfect, the courtyard was peaceful, and the team made everything easy.&rdquo;
          </blockquote>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#6A6560] mb-6">
            Guest review
          </p>
          <button className="font-body text-sm px-6 py-3 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-300">
            Read more reviews
          </button>
        </div>
      </div>
    </section>
  );
}