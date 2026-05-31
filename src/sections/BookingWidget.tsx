import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function BookingWidget() {
  const sectionRef = useRef<HTMLElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const widget = widgetRef.current;
    if (!section || !widget) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ----------------------------------------------------
      // 1. DESKTOP VIEW (Min-width: 769px) - Clean Pinned Timeline
      // ----------------------------------------------------
      mm.add("(min-width: 769px)", () => {
        // [CRITICAL FIX]: Scroll hone se pehle hi hidden aur down state set kar di
        gsap.set(widget, { opacity: 0, y: 24 });
        gsap.set(widget.querySelectorAll('.field-item'), { opacity: 0, y: 14 });

        // [OPTIMIZATION]: Alag independent triggers ke bajaye merged into a single timeline
        const desktopTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });

        desktopTl.to(widget, { opacity: 1, y: 0, ease: 'power2.out' })
          .to(widget.querySelectorAll('.field-item'), {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            ease: 'power2.out'
          }, "-=0.2");
      });

      // ----------------------------------------------------
      // 2. MOBILE VIEW (Max-width: 768px) - Auto Reveal Trigger 📱
      // ----------------------------------------------------
      mm.add("(max-width: 768px)", () => {
        // [CRITICAL FIX]: Mobile elements state backup layout flash prevention
        gsap.set(widget, { opacity: 0, y: 20 });
        gsap.set(widget.querySelectorAll('.field-item'), { opacity: 0, y: 10 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        });

        tl.to(widget, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
          .to(widget.querySelectorAll('.field-item'), {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.4,
            ease: 'power2.out'
          }, "-=0.3");
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="relative w-full py-12 bg-[#F4F1EA] z-20"
    >
      {/* Widget Container (Added style={{ opacity: 0 }} to lock client flash) */}
      <div
        ref={widgetRef}
        style={{ opacity: 0 }}
        className="max-w-[980px] mx-auto px-6 py-7 border border-[rgba(17,17,17,0.18)] bg-[#F4F1EA]"
      >
        <h3 className="font-display text-2xl text-[#111111] mb-6 field-item">
          Plan your stay
        </h3>

        <div className="flex flex-col md:flex-row items-stretch gap-4">
          <div className="field-item flex-1 flex items-center gap-3 px-4 py-3 border border-[rgba(17,17,17,0.18)]">
            <Calendar className="w-4 h-4 text-[#6A6560]" strokeWidth={1.5} />
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6A6560] block">
                Check-in
              </label>
              <span className="font-body text-sm text-[#111111]">Select date</span>
            </div>
          </div>

          <div className="field-item flex-1 flex items-center gap-3 px-4 py-3 border border-[rgba(17,17,17,0.18)]">
            <Calendar className="w-4 h-4 text-[#6A6560]" strokeWidth={1.5} />
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6A6560] block">
                Check-out
              </label>
              <span className="font-body text-sm text-[#111111]">Select date</span>
            </div>
          </div>

          <div className="field-item flex-1 flex items-center gap-3 px-4 py-3 border border-[rgba(17,17,17,0.18)]">
            <Users className="w-4 h-4 text-[#6A6560]" strokeWidth={1.5} />
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6A6560] block">
                Guests
              </label>
              <span className="font-body text-sm text-[#111111]">2 Adults</span>
            </div>
          </div>

          <button className="field-item font-body text-sm px-8 py-3 bg-[#111111] text-white hover:bg-[#D4A05D] transition-colors duration-300">
            Check availability
          </button>
        </div>
      </div>
    </section>
  );
}