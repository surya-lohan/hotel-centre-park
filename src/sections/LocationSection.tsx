import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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
        gsap.set(leftPanelRef.current, { x: '-35vw', opacity: 0 });
        gsap.set(rightImageRef.current, { x: '65vw', opacity: 0 });
        gsap.set(mapRef.current, { scale: 0.98, opacity: 0 });
        gsap.set(textRef.current?.children || [], { y: 18, opacity: 0 });

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

        // Desktop Entrance (Refactored using clean .to())
        scrollTl.to(leftPanelRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(rightImageRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(mapRef.current, { scale: 1, opacity: 1, ease: 'none' }, 0.08);
        scrollTl.to(textRef.current?.children || [], { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.05);

        // Desktop Exit
        scrollTl.to(leftPanelRef.current, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to(rightImageRef.current, { x: '18vw', scale: 1.03, opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to(mapRef.current, { opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to(textRef.current?.children || [], { y: -12, opacity: 0, stagger: 0.01, ease: 'power2.in' }, 0.6);
      });

      // ----------------------------------------------------
      // 2. MOBILE VIEW (Max-width: 768px) 📱
      // ----------------------------------------------------
      mm.add("(max-width: 768px)", () => {
        // [CRITICAL FIX]: Initial mobile positions configured before scroll triggers
        gsap.set(leftPanelRef.current, { x: '-20vw', opacity: 0 });
        gsap.set(rightImageRef.current, { x: '25vw', opacity: 0 });
        gsap.set(mapRef.current, { scale: 0.95, opacity: 0 });
        gsap.set(textRef.current?.children || [], { y: 12, opacity: 0 });

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 30%',  // Smooth responsive screen layout tracking
            end: '+=50%',
            pin: false,
            scrub: 1,
          },
        });

        // Mobile Entrance
        scrollTl.to(leftPanelRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(rightImageRef.current, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.to(mapRef.current, { scale: 1, opacity: 1, ease: 'none' }, 0.08);
        scrollTl.to(textRef.current?.children || [], { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.05);

        // Mobile Exit
        scrollTl.to(leftPanelRef.current, { x: '-10vw', opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to(rightImageRef.current, { x: '10vw', opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to(mapRef.current, { opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.to(textRef.current?.children || [], { y: -10, opacity: 0, stagger: 0.01, ease: 'power2.in' }, 0.6);
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="location"
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#F4F1EA] pt-16 scroll-mt-24 lg:block lg:h-screen lg:w-screen lg:pt-0 lg:scroll-mt-0 z-[19]"
    >
      {/* Left map/info panel (Added hydration flash guard style) */}
      <div
        ref={leftPanelRef}
        style={{ opacity: 0 }}
        className="relative w-full bg-[#F4F1EA] px-6 py-8 lg:absolute lg:left-0 lg:top-0 lg:flex lg:h-full lg:w-[35vw] lg:flex-col lg:justify-center lg:px-[3.2vw] lg:py-0"
      >
        <div ref={textRef}>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#6A6560] block">
            Location
          </span>
          <h2 className="font-display text-[clamp(34px,3.8vw,52px)] leading-[1.06] text-[#111111] mb-4">
            TT Nagar,
            <br />
            Bhopal.
          </h2>
          <p className="font-body text-sm text-[#6A6560] leading-relaxed mb-4 max-w-full lg:max-w-[24vw]">
            Near Polytechnic Square, TT Nagar, Bhopal, Madhya Pradesh 462003
          </p>
          <button className="font-body text-sm px-6 py-3 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-300 flex items-center gap-2">
            <MapPin className="w-4 h-4" strokeWidth={1.5} />
            Get directions
          </button>
        </div>

        {/* Map illustration */}
        <div
          ref={mapRef}
          className="mt-4 border border-[rgba(17,17,17,0.18)] bg-[#F4F1EA] relative overflow-hidden"
        >
          {/* Map frames content can safely mount inside */}
        </div>
      </div>

      {/* Right street photo (Added hydration flash guard style) */}
      <div
        ref={rightImageRef}
        style={{ opacity: 0 }}
        className="relative h-[42vh] w-full lg:absolute lg:left-[35vw] lg:top-0 lg:h-full lg:w-[65vw]"
      >
        <img
          src="/images/street_scene.jpg"
          alt="Bhopal street"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}