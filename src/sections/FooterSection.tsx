import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.children,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-[#111111] z-[23]"
    >
      {/* Grain overlay for footer */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        ref={contentRef}
        className="relative max-w-[920px] mx-auto px-[6vw] py-[10vh]"
      >
        <h2 className="font-display text-3xl text-white mb-10">
          Hotel Centre Park
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Contact */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-[#6A6560] mb-4">
              Contact
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+91755XXXXXXX"
                className="font-body text-sm text-white/80 hover:text-[#D4A05D] transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                +91-755-XXXXXXX
              </a>
              <a
                href="mailto:stay@hotelcentrepark.in"
                className="font-body text-sm text-white/80 hover:text-[#D4A05D] transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" strokeWidth={1.5} />
                stay@hotelcentrepark.in
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-[#6A6560] mb-4">
              Quick Links
            </h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => scrollToSection('rooms')}
                className="font-body text-sm text-white/80 hover:text-[#D4A05D] transition-colors text-left"
              >
                Rooms
              </button>
              <button
                onClick={() => scrollToSection('suites')}
                className="font-body text-sm text-white/80 hover:text-[#D4A05D] transition-colors text-left"
              >
                Suites
              </button>
              <button
                onClick={() => scrollToSection('dining')}
                className="font-body text-sm text-white/80 hover:text-[#D4A05D] transition-colors text-left"
              >
                Dining
              </button>
              <button
                onClick={() => scrollToSection('offers')}
                className="font-body text-sm text-white/80 hover:text-[#D4A05D] transition-colors text-left"
              >
                Offers
              </button>
            </div>
          </div>

          {/* Reserve */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-[#6A6560] mb-4">
              Reserve
            </h3>
            <button
              onClick={() => scrollToSection('booking')}
              className="font-body text-sm px-6 py-3 border border-[#D4A05D] text-white hover:bg-[#D4A05D] transition-all duration-300 mb-3"
            >
              Reserve a room
            </button>
            <p className="font-mono text-[10px] text-[#6A6560] tracking-wide">
              Best rates when you book direct.
            </p>
          </div>
        </div>

        {/* Footer links */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollToSection('rooms')}
              className="font-body text-xs text-white/50 hover:text-white/80 transition-colors"
            >
              Rooms
            </button>
            <button
              onClick={() => scrollToSection('suites')}
              className="font-body text-xs text-white/50 hover:text-white/80 transition-colors"
            >
              Suites
            </button>
            <button
              onClick={() => scrollToSection('dining')}
              className="font-body text-xs text-white/50 hover:text-white/80 transition-colors"
            >
              Dining
            </button>
            <button
              onClick={() => scrollToSection('offers')}
              className="font-body text-xs text-white/50 hover:text-white/80 transition-colors"
            >
              Offers
            </button>
            <span className="font-body text-xs text-white/50 hover:text-white/80 transition-colors cursor-pointer">
              Accessibility
            </span>
            <span className="font-body text-xs text-white/50 hover:text-white/80 transition-colors cursor-pointer">
              Privacy
            </span>
          </div>
          <p className="font-mono text-[10px] text-white/30 tracking-wide">
            &copy; 2025 Hotel Centre Park. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
