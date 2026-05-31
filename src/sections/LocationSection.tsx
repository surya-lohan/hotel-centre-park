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

      // Map entrance
      scrollTl.fromTo(
        mapRef.current,
        { scale: 0.98, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0.08
      );

      // Text entrance
      scrollTl.fromTo(
        textRef.current?.children || [],
        { y: 18, opacity: 0 },
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
        mapRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        textRef.current?.children || [],
        { y: 0, opacity: 1 },
        { y: -12, opacity: 0, stagger: 0.01, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="location"
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#F4F1EA] pt-16 scroll-mt-24 lg:block lg:h-screen lg:w-screen lg:pt-0 lg:scroll-mt-0 z-[19]"
    >
      {/* Left map/info panel */}
      <div
        ref={leftPanelRef}
        className="relative w-full bg-[#F4F1EA] px-6 py-8 lg:absolute lg:left-0 lg:top-0 lg:flex lg:h-full lg:w-[35vw] lg:flex-col lg:justify-center lg:px-[3.2vw] lg:py-0"
      >
        <div ref={textRef}>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#6A6560] block mb-4">
            Location
          </span>
          <h2 className="font-display text-[clamp(34px,3.8vw,52px)] leading-[1.0] text-[#111111] mb-4">
            TT Nagar,
            <br />
            Bhopal.
          </h2>
          <p className="font-body text-sm text-[#6A6560] leading-relaxed mb-6">
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
          className="mt-8 w-full aspect-square border border-[rgba(17,17,17,0.18)] bg-[#F4F1EA] relative overflow-hidden"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Streets */}
            <line x1="0" y1="60" x2="200" y2="60" stroke="rgba(17,17,17,0.15)" strokeWidth="1" />
            <line x1="0" y1="120" x2="200" y2="120" stroke="rgba(17,17,17,0.15)" strokeWidth="1" />
            <line x1="60" y1="0" x2="60" y2="200" stroke="rgba(17,17,17,0.15)" strokeWidth="1" />
            <line x1="140" y1="0" x2="140" y2="200" stroke="rgba(17,17,17,0.15)" strokeWidth="1" />
            <line x1="0" y1="0" x2="200" y2="200" stroke="rgba(17,17,17,0.08)" strokeWidth="1" />
            <line x1="200" y1="0" x2="0" y2="200" stroke="rgba(17,17,17,0.08)" strokeWidth="1" />
            {/* Labels */}
            <text x="70" y="55" fontSize="6" fill="#6A6560" fontFamily="IBM Plex Mono">TT Nagar</text>
            <text x="70" y="115" fontSize="6" fill="#6A6560" fontFamily="IBM Plex Mono">Polytechnic</text>
            <text x="145" y="55" fontSize="6" fill="#6A6560" fontFamily="IBM Plex Mono">Lake</text>
            {/* Location dot */}
            <circle cx="100" cy="90" r="4" fill="#D4A05D" />
            <circle cx="100" cy="90" r="8" fill="none" stroke="#D4A05D" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Right street photo */}
      <div
        ref={rightImageRef}
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
