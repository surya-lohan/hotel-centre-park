import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhyStaySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);
  const reasonsRef = useRef<HTMLDivElement>(null);

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
        gsap.set(rightImageRef.current, { x: '35vw', opacity: 0 });
        gsap.set(textOverlayRef.current?.children || [], { y: 18, opacity: 0 });
        gsap.set(reasonsRef.current?.children || [], { y: 18, opacity: 0 });

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=120%',
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        // Desktop Entrance (Refactored using clean .to())
        scrollTl.to(leftImageRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(rightImageRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(textOverlayRef.current?.children || [], { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.05);
        scrollTl.to(reasonsRef.current?.children || [], { y: 0, opacity: 1, stagger: 0.07, ease: 'none' }, 0.08);

        // Desktop Exit
        scrollTl.to(leftImageRef.current, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to(rightImageRef.current, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to([textOverlayRef.current?.children || [], reasonsRef.current?.children || []].flat(), { y: -12, opacity: 0, stagger: 0.01, ease: 'power2.in' }, 0.7);
      });

      // ----------------------------------------------------
      // 2. MOBILE VIEW (Max-width: 768px) 📱
      // ----------------------------------------------------
      mm.add("(max-width: 768px)", () => {
        // [CRITICAL FIX]: Initial mobile positions set before scroll compiling runs
        gsap.set(leftImageRef.current, { x: '-25vw', opacity: 0 });
        gsap.set(rightImageRef.current, { x: '25vw', opacity: 0 });
        gsap.set(textOverlayRef.current?.children || [], { y: 12, opacity: 0 });
        gsap.set(reasonsRef.current?.children || [], { y: 12, opacity: 0 });

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 30%',  // Smooth viewport padding layout boundary
            end: '+=60%',
            pin: false,
            scrub: 1,
          },
        });

        // Mobile Entrance
        scrollTl.to(leftImageRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(rightImageRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(textOverlayRef.current?.children || [], { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.05);
        scrollTl.to(reasonsRef.current?.children || [], { y: 0, opacity: 1, stagger: 0.05, ease: 'none' }, 0.08);

        // Mobile Exit
        scrollTl.to(leftImageRef.current, { x: '-12vw', opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to(rightImageRef.current, { x: '12vw', opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to([textOverlayRef.current?.children || [], reasonsRef.current?.children || []].flat(), { y: -8, opacity: 0, stagger: 0.01, ease: 'power2.in' }, 0.7);
      });

    }, section);

    return () => ctx.revert();
  }, []);

  const reasons = [
    'Daily housekeeping with hypoallergenic linens',
    'Complimentary breakfast + Wi-Fi',
    'Walk to TT Nagar markets, Van Vihar, and the lake',
  ];

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#F4F1EA] pt-16 lg:block lg:h-screen lg:w-screen lg:pt-0 z-[15]"
    >
      {/* Left photo (style={{ opacity: 0 }} is perfectly safe here on direct image wrappers) */}
      <div
        ref={leftImageRef}
        style={{ opacity: 0 }}
        className="relative h-[42vh] w-full lg:absolute lg:left-0 lg:top-0 lg:h-full lg:w-[65vw]"
      >
        <img
          src="/images/person_reading.jpg"
          alt="Guest relaxing"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right interior */}
      <div
        ref={rightImageRef}
        style={{ opacity: 0 }}
        className="relative h-[28vh] w-full lg:absolute lg:left-[65vw] lg:top-0 lg:h-full lg:w-[35vw]"
      >
        <img
          src="/images/window_seat.jpg"
          alt="Window seat"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text overlay on left */}
      {/* [FIXED]: Parent ki opacity 0 hata kar text elements ko hide kiya via CSS children block */}
      <div
        ref={textOverlayRef}
        className="relative w-full px-6 py-8 lg:absolute lg:left-[3vw] lg:top-[8vh] lg:w-[42vw] lg:px-0 lg:py-0 [&>*]:opacity-0"
      >
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#6A6560] block mb-4">
          Why Stay With Us
        </span>
        <h2 className="font-display text-[clamp(34px,3.8vw,52px)] leading-[1.06] text-[#111111] pb-1">
          Quiet, clean, and close to everything.
        </h2>
      </div>

      {/* Reasons */}
      {/* [FIXED]: Same logic applied here to protect nested stagger divs */}
      <div
        ref={reasonsRef}
        className="relative flex w-full flex-col gap-5 px-6 pb-10 lg:absolute lg:left-[3vw] lg:top-[38vh] lg:w-[44vw] lg:px-0 lg:pb-0 [&>*]:opacity-0"
      >
        {reasons.map((reason, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="w-8 h-px bg-[#D4A05D]" />
            <p className="font-body text-sm text-[#111111] leading-relaxed">{reason}</p>
          </div>
        ))}
      </div>
    </section>
  );
}