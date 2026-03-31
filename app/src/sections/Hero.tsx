import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroConfig } from '../config';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  isReady: boolean;
}

export function Hero({ isReady }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const microLabelRef = useRef<HTMLSpanElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation
  useEffect(() => {
    if (!isReady) return;

    const tl = gsap.timeline({ 
      defaults: { ease: 'power3.out' },
      delay: 0.3
    });

    // Image panel entrance
    tl.fromTo(
      imageRef.current,
      { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
      { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.4 },
      0
    );

    // Micro label
    tl.fromTo(
      microLabelRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      0.4
    );

    // Headline lines stagger with character animation
    const headlineLines = headlineRef.current?.querySelectorAll('.headline-line');
    if (headlineLines) {
      headlineLines.forEach((line, lineIndex) => {
        tl.fromTo(
          line,
          { y: 100, opacity: 0, rotateX: 45 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1, ease: 'power3.out' },
          0.5 + lineIndex * 0.15
        );
      });
    }

    // Subheadline
    tl.fromTo(
      subheadlineRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      1.0
    );

    // CTA
    tl.fromTo(
      ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      1.1
    );

    // Stats
    tl.fromTo(
      statsRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      1.2
    );

    // Scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      1.5
    );
  }, [isReady]);

  // Scroll-driven parallax - smooth continuous animation
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax for image
      gsap.to(imageRef.current, {
        y: '20%',
        scale: 1.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Content fades out as you scroll
      gsap.to(contentRef.current, {
        y: '-15%',
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 1,
        },
      });

      // Scroll indicator fades out quickly
      gsap.to(scrollIndicatorRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '20% top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleLines = heroConfig.mainTitle.split('\n');

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen overflow-hidden bg-[#0B0C10] z-10"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10]/50 via-transparent to-[#0B0C10] z-20 pointer-events-none" />

      {/* Left Image Panel */}
      <div
        ref={imageRef}
        className="absolute left-0 top-0 w-full lg:w-[55%] h-full overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0B0C10] z-10" />
        <img
          src={heroConfig.backgroundImage}
          alt="Study workspace"
          className="w-full h-full object-cover grayscale brightness-[0.6] contrast-125 scale-110"
        />
        {/* Animated grain overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Right Content Area */}
      <div
        ref={contentRef}
        className="relative z-30 min-h-screen flex flex-col justify-center px-6 lg:px-0 lg:pl-[55%] py-24"
      >
        <div className="max-w-xl">
          {/* Micro Label */}
          <span
            ref={microLabelRef}
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-[#B9B9B9] uppercase mb-8"
          >
            <span className="w-2 h-2 bg-[#B9B9B9] rounded-full animate-pulse" />
            {heroConfig.scriptText}
          </span>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-display text-[clamp(48px,8vw,96px)] font-bold text-[#F4F4F5] leading-[0.9] tracking-[-0.03em] mb-8"
            style={{ perspective: '1000px' }}
          >
            {titleLines.map((line, i) => (
              <span 
                key={i} 
                className="headline-line block overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <span className="block">{line}</span>
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="text-lg lg:text-xl text-[#A7A7AD] leading-relaxed mb-10 max-w-md"
          >
            Enter your subjects and exam dates. We generate a daily plan that balances prep, review, and rest.
          </p>

          {/* CTA */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-16">
            <a
              href={heroConfig.ctaTarget}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#B9B9B9] text-[#0B0C10] rounded-full font-semibold overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(185,185,185,0.3)]"
            >
              <span className="relative z-10">{heroConfig.ctaButtonText}</span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-[#F4F4F5] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#B9B9B9]/30 text-[#F4F4F5] rounded-full font-medium hover:border-[#B9B9B9]/60 hover:bg-[#B9B9B9]/5 transition-all duration-300"
            >
              See how it works
            </a>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="flex gap-8 lg:gap-12 pt-8 border-t border-[#B9B9B9]/10"
          >
            {heroConfig.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-display text-4xl lg:text-5xl font-bold text-[#F4F4F5]">
                  {stat.value}
                  <span className="text-[#B9B9B9]">{stat.suffix}</span>
                </span>
                <span className="text-sm text-[#A7A7AD] mt-1 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-[#A7A7AD] uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 rounded-full border border-[#B9B9B9]/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-[#B9B9B9] rounded-full animate-bounce" />
        </div>
      </div>

      {/* Section Number */}
      <div className="absolute bottom-8 right-8 z-30 font-display text-[120px] font-bold text-[#B9B9B9]/5 leading-none select-none pointer-events-none">
        01
      </div>
    </section>
  );
}
