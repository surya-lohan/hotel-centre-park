import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const scrollCue = scrollCueRef.current;
    if (!section || !image || !content || !scrollCue) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ----------------------------------------------------
      // 1. DESKTOP VIEW (Min-width: 769px) - Full Loaded & Pinned Flow
      // ----------------------------------------------------
      mm.add("(min-width: 769px)", () => {
        // Set initial states for desktop
        gsap.set(image, { opacity: 0, scale: 1.06, x: '-6vw' });
        gsap.set(content.children, { opacity: 0, y: 24 });
        gsap.set(scrollCue, { opacity: 0, y: 10 });

        // Load animation
        const loadTl = gsap.timeline({ delay: 0.2 });
        loadTl.to(image, { opacity: 1, scale: 1, x: 0, duration: 0.9, ease: 'power2.out' });
        loadTl.to(content.children, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out' }, '-=0.5');
        loadTl.to(scrollCue, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');

        // Scroll-driven exit animation
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=60%',
            pin: true,
            scrub: 0.6,
            onLeaveBack: () => {
              gsap.set(image, { opacity: 1, scale: 1, x: 0 });
              gsap.set(content.children, { opacity: 1, y: 0 });
              gsap.set(scrollCue, { opacity: 1, y: 0 });
            },
          },
        });

        scrollTl.fromTo(image, { x: 0, scale: 1, opacity: 1 }, { x: '-10vw', scale: 1.04, opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.fromTo(content.children, { x: 0, opacity: 1 }, { x: '8vw', opacity: 0, ease: 'power2.in', stagger: 0.02 }, 0.6);
        scrollTl.fromTo(scrollCue, { y: 0, opacity: 1 }, { y: 18, opacity: 0, ease: 'power2.in' }, 0.6);
      });

      // ----------------------------------------------------
      // 2. MOBILE VIEW (Max-width: 768px) - Clean & Glitch-Free 📱
      // ----------------------------------------------------
      mm.add("(max-width: 768px)", () => {
        // Mobile Initial States: X offsets ko kam rakha hai overflow se bachne ke liye
        gsap.set(image, { opacity: 0, scale: 1.03, x: '-3vw' });
        gsap.set(content.children, { opacity: 0, y: 15 });
        gsap.set(scrollCue, { opacity: 0, y: 8 });

        // Mobile Load animation
        const loadTl = gsap.timeline({ delay: 0.2 });
        loadTl.to(image, { opacity: 1, scale: 1, x: 0, duration: 0.8, ease: 'power2.out' });
        loadTl.to(content.children, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power2.out' }, '-=0.4');
        loadTl.to(scrollCue, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2');

        // Mobile Scroll-driven exit animation
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=40%',     // Mobile par exit animation thodi jaldi khatam hogi
            pin: false,       // Mobile pinning turned off (no address bar jumpers)
            scrub: 1,         // Smooth touch tracking
            onLeaveBack: () => {
              gsap.set(image, { opacity: 1, scale: 1, x: 0 });
              gsap.set(content.children, { opacity: 1, y: 0 });
              gsap.set(scrollCue, { opacity: 1, y: 0 });
            },
          },
        });

        // Mobile Exit: Subtly pushing elements out
        scrollTl.fromTo(image, { x: 0, opacity: 1 }, { x: '-5vw', opacity: 0, ease: 'power2.in' }, 0.6);
        scrollTl.fromTo(content.children, { x: 0, opacity: 1 }, { x: '4vw', opacity: 0, ease: 'power2.in', stagger: 0.01 }, 0.6);
        scrollTl.fromTo(scrollCue, { y: 0, opacity: 1 }, { y: 10, opacity: 0, ease: 'power2.in' }, 0.6);
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen md:h-screen h-auto overflow-hidden bg-[#F4F1EA] z-10"
    >
      <div className="stack-mobile">
        {/* Left portrait image */}
        <div
          ref={imageRef}
          className="md:absolute md:left-0 md:top-0 md:w-[52vw] md:h-full w-full h-[48vh]"
        >
          <img
            src="/images/hero_portrait.jpg"
            alt="Hotel room"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right content cluster */}
        <div
          ref={contentRef}
          className="md:absolute md:left-[58vw] md:top-1/2 md:-translate-y-1/2 md:w-[36vw] w-full relative p-6 md:p-0 mt-4 md:mt-0 flex flex-col gap-5"
        >
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#6A6560]">
            Hotel Centre Park
          </span>

          <h1 className="font-display text-[clamp(44px,5vw,72px)] leading-[1.02] tracking-[-0.02em] text-[#111111] pb-1">
            A quiet stay
            <br />
            in the heart
            <br />
            of Bhopal.
          </h1>

          <p className="font-body text-base text-[#6A6560] max-w-[28vw] leading-relaxed">
            Boutique rooms, courtyard calm, and dining near Upper Lake.
          </p>

          <div className="flex items-center gap-5 mt-2">
            <button className="font-body text-sm px-6 py-3 bg-[#111111] text-white hover:bg-[#D4A05D] transition-colors duration-300">
              Reserve a room
            </button>
            <button className="font-body text-sm text-[#111111] underline underline-offset-4 hover:text-[#D4A05D] transition-colors">
              View suites
            </button>
          </div>
        </div>

      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-cue"
      >
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#6A6560]">
          Scroll
        </span>
        <div className="w-px h-6 bg-[#6A6560]/40" />
      </div>
    </section>
  );
}