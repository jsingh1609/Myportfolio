import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featuresConfig } from '../config';
import { Brain, Clock, Target } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Clock,
  Target,
};

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Headline reveal on scroll
      gsap.fromTo(
        headlineRef.current,
        { y: 80, opacity: 0 },
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

      // Cards staggered reveal
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 100, opacity: 0, rotateY: i === 0 ? -15 : i === 2 ? 15 : 0 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Quote reveal
      gsap.fromTo(
        quoteRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Parallax effect on cards while scrolling through section
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.to(card, {
          y: (i - 1) * -30,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative w-full py-32 lg:py-48 bg-[#0B0C10] z-20 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#B9B9B9]/[0.02] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#B9B9B9]/[0.02] blur-3xl pointer-events-none" />

      {/* Section Number - Vertical */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <span className="font-mono text-xs tracking-[0.3em] text-[#B9B9B9]/20 uppercase writing-mode-vertical">
          Features
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Headline */}
        <div ref={headlineRef} className="mb-20 lg:mb-32">
          <span className="font-mono text-xs tracking-[0.2em] text-[#B9B9B9] uppercase block mb-4">
            {featuresConfig.scriptText}
          </span>
          <h2 className="font-display text-[clamp(36px,6vw,72px)] font-bold text-[#F4F4F5] leading-[1] tracking-[-0.02em] max-w-3xl">
            {featuresConfig.mainTitle}
          </h2>
        </div>

        {/* Cards Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          style={{ perspective: '1500px' }}
        >
          {featuresConfig.features.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Brain;
            
            return (
              <div
                key={feature.id}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="group relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative bg-[#14161B] rounded-3xl p-8 lg:p-10 border border-[#B9B9B9]/10 transition-all duration-700 hover:border-[#B9B9B9]/30 hover:shadow-[0_0_60px_rgba(185,185,185,0.1)] overflow-hidden">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B9B9B9]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Glow orb */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#B9B9B9]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Icon */}
                  <div className="relative mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-[#B9B9B9]/5 flex items-center justify-center border border-[#B9B9B9]/20 group-hover:border-[#B9B9B9]/40 group-hover:bg-[#B9B9B9]/10 transition-all duration-500">
                      <Icon className="w-7 h-7 text-[#B9B9B9] group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <span className="font-mono text-xs tracking-[0.15em] text-[#A7A7AD] uppercase block mb-3">
                      {feature.subtitle}
                    </span>
                    <h3 className="font-display text-2xl lg:text-3xl font-semibold text-[#F4F4F5] mb-4 group-hover:text-[#B9B9B9] transition-colors duration-500">
                      {feature.name}
                    </h3>
                    <p className="text-[#A7A7AD] leading-relaxed text-base lg:text-lg">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom line animation */}
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#B9B9B9] via-[#B9B9B9] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quote */}
        <div ref={quoteRef} className="mt-20 lg:mt-32 pt-12 border-t border-[#B9B9B9]/10">
          <blockquote className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            <span className="font-mono text-sm text-[#B9B9B9] uppercase tracking-wider">{featuresConfig.quote.prefix}</span>
            <p className="text-xl lg:text-2xl text-[#F4F4F5] font-display italic">"{featuresConfig.quote.text}"</p>
            <span className="text-[#A7A7AD]/60 text-sm lg:ml-auto">— {featuresConfig.quote.attribution}</span>
          </blockquote>
        </div>
      </div>

      {/* Section Number */}
      <div className="absolute bottom-8 right-8 font-display text-[120px] font-bold text-[#B9B9B9]/5 leading-none select-none pointer-events-none">
        02
      </div>

      <style>{`
        .writing-mode-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
      `}</style>
    </section>
  );
}
