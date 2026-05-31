import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function RoomsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const thumbnailRef = useRef<HTMLDivElement>(null);

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

      // Left image entrance (0-30%)
      scrollTl.fromTo(
        leftImageRef.current,
        { x: '-65vw', opacity: 0.9 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Right panel entrance (0-30%)
      scrollTl.fromTo(
        rightPanelRef.current,
        { x: '35vw', opacity: 0.9 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Text content entrance (5-30%)
      scrollTl.fromTo(
        textContentRef.current?.children || [],
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.05
      );

      // Thumbnail entrance (10-30%)
      scrollTl.fromTo(
        thumbnailRef.current,
        { y: '12vh', opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
        0.1
      );

      // Exit animations (70-100%)
      scrollTl.fromTo(
        leftImageRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: '-18vw', scale: 1.03, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        rightPanelRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        textContentRef.current?.children || [],
        { y: 0, opacity: 1 },
        { y: -16, opacity: 0, stagger: 0.01, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        thumbnailRef.current,
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="rooms"
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#F4F1EA] pt-16 scroll-mt-24 lg:block lg:h-screen lg:w-screen lg:pt-0 lg:scroll-mt-0 z-[13]"
    >
      {/* Left room photo */}
      <div
        ref={leftImageRef}
        className="relative h-[44vh] w-full lg:absolute lg:left-0 lg:top-0 lg:h-full lg:w-[65vw]"
      >
        <img
          src="/images/room_interior.jpg"
          alt="Hotel room interior"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right typographic panel */}
      <div
        ref={rightPanelRef}
        className="relative w-full bg-[#F4F1EA] px-6 py-8 lg:absolute lg:left-[65vw] lg:top-0 lg:flex lg:h-full lg:w-[35vw] lg:items-center lg:px-[3.2vw] lg:py-0"
      >
        <div ref={textContentRef} className="w-full">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#6A6560] block mb-4">
            Rooms
          </span>
          <h2 className="font-display text-[clamp(34px,3.8vw,52px)] leading-[1.0] text-[#111111] mb-5">
            A room that
            <br />
            feels like home.
          </h2>
          <p className="font-body text-base text-[#6A6560] leading-relaxed mb-6 max-w-full lg:max-w-[24vw]">
            Soft linens, warm wood tones, and daylight through sheer curtains. Rest without noise.
          </p>
          <button className="font-body text-sm px-6 py-3 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-300">
            Explore rooms
          </button>
        </div>
      </div>

      {/* Bottom-left thumbnail */}
      <div
        ref={thumbnailRef}
        className="hidden overflow-hidden border border-[rgba(17,17,17,0.18)] lg:absolute lg:left-[3vw] lg:bottom-[7vh] lg:block lg:h-[22vh] lg:w-[18vw]"
      >
        <img
          src="/images/window_seat.jpg"
          alt="Window seat detail"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
