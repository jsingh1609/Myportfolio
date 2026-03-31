import { useState, useEffect } from 'react';
import { Menu, X, Brain, Sparkles } from 'lucide-react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How it works', href: '#how-it-works' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Quotes', href: '#quotes' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'bg-[#0B0C10]/90 backdrop-blur-xl py-4 border-b border-[#B9B9B9]/10'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('#hero')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#14161B] border border-[#B9B9B9]/20 flex items-center justify-center transition-all duration-500 group-hover:border-[#B9B9B9]/50 group-hover:bg-[#B9B9B9]/5">
              <Brain className="w-5 h-5 text-[#B9B9B9] group-hover:text-[#F4F4F5] transition-colors" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-display text-lg text-[#F4F4F5] tracking-wide">SmartStudy</span>
              <span className="text-[10px] text-[#B9B9B9] tracking-[0.2em] uppercase">AI Powered</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="relative px-4 py-2 text-sm text-[#A7A7AD] hover:text-[#F4F4F5] transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#B9B9B9] group-hover:w-1/2 transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => scrollToSection('#schedule')}
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-[#B9B9B9] text-[#0B0C10] rounded-full text-sm font-medium hover:bg-[#F4F4F5] hover:shadow-[0_0_20px_rgba(185,185,185,0.3)] transition-all duration-500"
          >
            <Sparkles className="w-4 h-4" />
            Get Started
          </button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-[#F4F4F5]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-[#0B0C10]/98 backdrop-blur-xl transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-3xl font-display text-[#F4F4F5] hover:text-[#B9B9B9] transition-colors"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: isMobileMenuOpen ? 'fadeInUp 0.5s ease-out forwards' : 'none',
                opacity: isMobileMenuOpen ? 1 : 0
              }}
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('#schedule')}
            className="mt-8 px-8 py-4 bg-[#B9B9B9] text-[#0B0C10] rounded-full font-medium flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Get Started
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
