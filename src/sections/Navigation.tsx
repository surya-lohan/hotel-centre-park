import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and close on Escape when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', onKey);

      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener('keydown', onKey);
      };
    }
    return;
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* [Z-INDEX OPTIMIZATION]: Upgraded to z-[999] so it stays on top of GSAP pinned frames */}
      <nav
        className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500 ${scrolled || mobileMenuOpen
          ? 'bg-[#F4F1EA]/95 backdrop-blur-md border-b border-[rgba(17,17,17,0.1)]'
          : 'bg-transparent'
          }`}
      >
        <div className="flex items-center justify-between px-6 md:px-[6vw] lg:px-[4vw] py-5">
          <div
            className="font-display text-xl tracking-tight text-[#111111] cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            role="button"
            tabIndex={0}
          >
            Hotel Centre Park
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['rooms', 'dining', 'offers', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="font-body text-sm text-[#111111] hover:text-[#D4A05D] transition-colors capitalize"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection('booking')}
              className="hidden md:block font-body text-sm px-5 py-2 border border-[#D4A05D] text-[#111111] hover:bg-[#D4A05D] hover:text-white transition-all duration-300"
            >
              Reserve
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-[#111111] p-2"
              onClick={() => setMobileMenuOpen((s) => !s)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {/* [Z-INDEX OPTIMIZATION]: Upgraded to z-[1000] layer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal={mobileMenuOpen}
        aria-hidden={!mobileMenuOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMobileMenuOpen(false);
        }}
        className={`fixed inset-0 bg-[#F4F1EA] z-[1000] transition-transform duration-500 ease-in-out flex flex-col items-center justify-center gap-8 ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        {/* [UX FIX]: Top right close button inside mobile overlay view */}
        <button
          className="absolute top-5 right-6 text-[#111111] p-2 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        {['rooms', 'dining', 'offers', 'contact'].map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item)}
            className="font-display text-4xl text-[#111111] hover:text-[#D4A05D] capitalize transition-colors"
          >
            {item}
          </button>
        ))}

        <button
          onClick={() => scrollToSection('booking')}
          className="mt-8 font-body text-base px-8 py-4 bg-[#111111] text-white w-[80%] max-w-sm hover:bg-[#D4A05D] transition-colors duration-300"
        >
          Reserve a Room
        </button>
      </div>
    </>
  );
}