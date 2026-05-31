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
      gsap.fromTo(
        widget,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        widget.querySelectorAll('.field-item'),
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 50%',
            scrub: 0.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="relative w-full py-12 bg-[#F4F1EA] z-20"
    >
      <div
        ref={widgetRef}
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
