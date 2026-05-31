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
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=80%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Left panel entrance
      scrollTl.fromTo(
        leftPanelRef.current,
        { x: '-35vw', opacity: 0.9 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Right image entrance
      scrollTl.fromTo(
        rightImageRef.current,
        { x: '65vw', opacity: 0.9 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Text entrance
      scrollTl.fromTo(
        textContentRef.current?.children || [],
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.05
      );

      // Exit
      scrollTl.fromTo(
        leftPanelRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        rightImageRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: '18vw', scale: 1.03, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        textContentRef.current?.children || [],
        { y: 0, opacity: 1 },
        { y: -14, opacity: 0, stagger: 0.01, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#F4F1EA] pt-16 lg:block lg:h-screen lg:w-screen lg:pt-0 z-[17]"
    >
      {/* Left typography panel */}
      <div
        ref={leftPanelRef}
        className="relative w-full bg-[#F4F1EA] px-6 py-8 lg:absolute lg:left-0 lg:top-0 lg:flex lg:h-full lg:w-[35vw] lg:items-center lg:px-0 lg:py-0"
      >
        <div
          ref={textContentRef}
          className="w-full lg:px-[3.2vw] lg:py-[6vh] lg:-translate-y-[6vh]"
        >
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#6A6560] block mb-4">
            Heritage
          </span>
          <h2 className="font-display text-[clamp(34px,3.8vw,52px)] leading-[1.0] text-[#111111] mb-5">
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

      {/* Right corridor image */}
      <div
        ref={rightImageRef}
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
