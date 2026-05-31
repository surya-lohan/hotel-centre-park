import { useEffect, useState } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled
          ? 'bg-[#F4F1EA]/90 backdrop-blur-sm border-b border-[rgba(17,17,17,0.1)]'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-[4vw] py-5">
        <div
          className="font-display text-xl tracking-tight text-[#111111] cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Hotel Centre Park
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('rooms')}
            className="font-body text-sm text-[#111111] hover:text-[#D4A05D] transition-colors"
          >
            Rooms
          </button>
          <button
            onClick={() => scrollToSection('dining')}
            className="font-body text-sm text-[#111111] hover:text-[#D4A05D] transition-colors"
          >
            Dining
          </button>
          <button
            onClick={() => scrollToSection('offers')}
            className="font-body text-sm text-[#111111] hover:text-[#D4A05D] transition-colors"
          >
            Offers
          </button>
          <button
            onClick={() => scrollToSection('location')}
            className="font-body text-sm text-[#111111] hover:text-[#D4A05D] transition-colors"
          >
            Location
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="font-body text-sm text-[#111111] hover:text-[#D4A05D] transition-colors"
          >
            Contact
          </button>
        </div>

        <button
          onClick={() => scrollToSection('booking')}
          className="font-body text-sm px-5 py-2 border border-[#D4A05D] text-[#111111] hover:bg-[#D4A05D] hover:text-white transition-all duration-300"
        >
          Reserve
        </button>
      </div>
    </nav>
  );
}
