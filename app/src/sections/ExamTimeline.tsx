import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { examTimelineConfig } from '../config';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function ExamTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Content reveal
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Rail draw animation
      gsap.fromTo(
        railRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: railRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Nodes staggered reveal
      nodesRef.current.forEach((node, i) => {
        if (!node) return;
        gsap.fromTo(
          node,
          { y: 60, scale: 0.8, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: node,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative w-full py-32 lg:py-48 bg-[#0B0C10] z-50 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10] via-[#14161B]/50 to-[#0B0C10] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={contentRef} className="mb-20">
          <span className="font-mono text-xs tracking-[0.2em] text-[#B9B9B9] uppercase block mb-4">
            {examTimelineConfig.scriptText}
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-display text-[clamp(36px,6vw,72px)] font-bold text-[#F4F4F5] leading-[1] tracking-[-0.02em]">
              {examTimelineConfig.mainTitle}
            </h2>
            <p className="text-lg text-[#A7A7AD] leading-relaxed max-w-md">
              {examTimelineConfig.introText}
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Rail */}
          <div className="absolute left-0 right-0 top-[60px] h-[2px] origin-left">
            <div ref={railRef} className="w-full h-full bg-gradient-to-r from-[#B9B9B9] via-[#B9B9B9]/50 to-[#B9B9B9]" />
          </div>

          {/* Nodes */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {examTimelineConfig.events.map((event, i) => (
              <div
                key={i}
                ref={(el) => { nodesRef.current[i] = el; }}
                className="group relative"
              >
                {/* Node */}
                <div className="relative flex flex-col items-center mb-6">
                  {/* Date badge */}
                  <div className="mb-4 px-4 py-2 bg-[#14161B] border border-[#B9B9B9]/20 rounded-full flex items-center gap-2 group-hover:border-[#B9B9B9]/40 transition-colors">
                    <Calendar className="w-4 h-4 text-[#B9B9B9]" />
                    <span className="font-mono text-sm text-[#B9B9B9]">{event.date}</span>
                  </div>
                  
                  {/* Circle */}
                  <div className="relative">
                    <div className="w-5 h-5 rounded-full bg-[#0B0C10] border-2 border-[#B9B9B9] flex items-center justify-center z-10 relative group-hover:scale-125 transition-transform duration-500">
                      <div className="w-2 h-2 rounded-full bg-[#B9B9B9]" />
                    </div>
                    {/* Glow */}
                    <div className="absolute inset-0 w-5 h-5 rounded-full bg-[#B9B9B9]/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="font-display text-xl font-semibold text-[#F4F4F5] mb-2 group-hover:text-[#B9B9B9] transition-colors">
                    {event.title}
                  </h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#14161B] rounded-full">
                    <Clock className="w-3.5 h-3.5 text-[#A7A7AD]" />
                    <span className="text-sm text-[#A7A7AD]">{event.subject}</span>
                  </div>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-5 h-5 text-[#B9B9B9]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Card */}
        <div className="mt-20 flex justify-center">
          <div className="inline-flex items-center gap-4 px-8 py-5 bg-[#14161B] border border-[#B9B9B9]/10 rounded-2xl">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <div>
              <span className="text-[#F4F4F5] font-medium">Schedule looks good!</span>
              <span className="text-[#A7A7AD] ml-2">14 days of prep time available.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section Number */}
      <div className="absolute bottom-8 right-8 font-display text-[120px] font-bold text-[#B9B9B9]/5 leading-none select-none pointer-events-none">
        05
      </div>
    </section>
  );
}
