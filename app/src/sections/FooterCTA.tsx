import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { footerConfig } from '../config';
import { ArrowRight, Mail, Twitter, Instagram, Linkedin, Brain } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function FooterCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form reveal
      gsap.fromTo(
        formRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Footer items reveal
      const footerItems = footerRef.current?.querySelectorAll('.footer-item');
      footerItems?.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="footer"
      className="relative w-full bg-[#0B0C10] z-[90] overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10] via-[#14161B]/50 to-[#0B0C10] pointer-events-none" />

      {/* CTA Section */}
      <div className="relative py-32 lg:py-48 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <div ref={headlineRef} className="mb-10">
            <span className="font-mono text-xs tracking-[0.2em] text-[#B9B9B9] uppercase block mb-4">
              {footerConfig.scriptText}
            </span>
            <h2 className="font-display text-[clamp(40px,7vw,80px)] font-bold text-[#F4F4F5] leading-[0.95] tracking-[-0.02em] mb-6">
              {footerConfig.mainTitle}
            </h2>
            <p className="text-xl text-[#A7A7AD]">{footerConfig.introText}</p>
          </div>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
          >
            <div className="flex-1 relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A7A7AD]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={footerConfig.inputPlaceholder}
                className="w-full pl-14 pr-5 py-4 bg-[#14161B] border border-[#B9B9B9]/20 rounded-xl text-[#F4F4F5] placeholder-[#A7A7AD]/40 focus:border-[#B9B9B9]/50 focus:outline-none transition-all duration-300"
                disabled={isSubmitted}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitted}
              className={`px-8 py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-500 ${
                isSubmitted
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-[#B9B9B9] text-[#0B0C10] hover:bg-[#F4F4F5] hover:shadow-[0_0_30px_rgba(185,185,185,0.3)]'
              }`}
            >
              {isSubmitted ? (
                'Thanks for joining!'
              ) : (
                <>
                  {footerConfig.buttonText}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer ref={footerRef} className="relative border-t border-[#B9B9B9]/10 py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="footer-item md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#14161B] border border-[#B9B9B9]/20 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-[#B9B9B9]" />
                </div>
                <div>
                  <span className="font-display text-2xl font-bold text-[#F4F4F5]">SmartStudy</span>
                  <span className="font-mono text-xs text-[#B9B9B9] uppercase tracking-wider ml-2">Planner</span>
                </div>
              </div>
              <p className="text-[#A7A7AD] max-w-sm text-lg leading-relaxed">
                AI-powered study scheduling that helps you plan smarter, study calmer, and ace your exams.
              </p>
            </div>

            {/* Links */}
            <div className="footer-item">
              <h4 className="font-mono text-xs tracking-[0.15em] text-[#B9B9B9] uppercase mb-6">
                Product
              </h4>
              <ul className="space-y-4">
                <li>
                  <a href="#features" className="text-[#A7A7AD] hover:text-[#F4F4F5] transition-colors duration-300">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-[#A7A7AD] hover:text-[#F4F4F5] transition-colors duration-300">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#schedule" className="text-[#A7A7AD] hover:text-[#F4F4F5] transition-colors duration-300">
                    Build schedule
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div className="footer-item">
              <h4 className="font-mono text-xs tracking-[0.15em] text-[#B9B9B9] uppercase mb-6">
                Connect
              </h4>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-11 h-11 rounded-xl bg-[#14161B] border border-[#B9B9B9]/20 flex items-center justify-center text-[#A7A7AD] hover:text-[#F4F4F5] hover:border-[#B9B9B9]/40 hover:bg-[#B9B9B9]/5 transition-all duration-300"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-11 h-11 rounded-xl bg-[#14161B] border border-[#B9B9B9]/20 flex items-center justify-center text-[#A7A7AD] hover:text-[#F4F4F5] hover:border-[#B9B9B9]/40 hover:bg-[#B9B9B9]/5 transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-11 h-11 rounded-xl bg-[#14161B] border border-[#B9B9B9]/20 flex items-center justify-center text-[#A7A7AD] hover:text-[#F4F4F5] hover:border-[#B9B9B9]/40 hover:bg-[#B9B9B9]/5 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="footer-item pt-8 border-t border-[#B9B9B9]/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#A7A7AD]/60">
              {footerConfig.footerText}
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-sm text-[#A7A7AD]/60 hover:text-[#A7A7AD] transition-colors">
                {footerConfig.privacyText}
              </a>
              <a href="#" className="text-sm text-[#A7A7AD]/60 hover:text-[#A7A7AD] transition-colors">
                {footerConfig.termsText}
              </a>
              <a href="#" className="text-sm text-[#A7A7AD]/60 hover:text-[#A7A7AD] transition-colors">
                {footerConfig.supportText}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Section Number */}
      <div className="absolute bottom-8 right-8 font-display text-[120px] font-bold text-[#B9B9B9]/5 leading-none select-none pointer-events-none">
        09
      </div>
    </section>
  );
}
