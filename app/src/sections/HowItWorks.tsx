import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { howItWorksConfig } from '../config';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

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

      // Image reveal with clip-path
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(0 0 0 100%)', opacity: 0 },
        {
          clipPath: 'inset(0 0 0 0%)',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Steps staggered reveal
      const stepItems = stepsRef.current?.querySelectorAll('.step-item');
      stepItems?.forEach((item, i) => {
        gsap.fromTo(
          item,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Parallax on image
      const imgEl = imageRef.current?.querySelector('img');
      if (imgEl) {
        gsap.to(imgEl, {
          y: '-15%',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-advance steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % howItWorksConfig.slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % howItWorksConfig.slides.length);
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev - 1 + howItWorksConfig.slides.length) % howItWorksConfig.slides.length);
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative w-full py-32 lg:py-48 bg-[#0B0C10] z-30 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10] via-[#14161B]/30 to-[#0B0C10] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div ref={contentRef} className="order-2 lg:order-1">
            <span className="font-mono text-xs tracking-[0.2em] text-[#B9B9B9] uppercase block mb-4">
              {howItWorksConfig.scriptText}
            </span>
            <h2 className="font-display text-[clamp(36px,6vw,72px)] font-bold text-[#F4F4F5] leading-[1] tracking-[-0.02em] mb-12">
              {howItWorksConfig.mainTitle}
            </h2>

            {/* Steps */}
            <div ref={stepsRef} className="space-y-6">
              {howItWorksConfig.slides.map((slide, i) => (
                <div
                  key={i}
                  className={`step-item group flex items-start gap-6 p-6 rounded-2xl transition-all duration-500 cursor-pointer ${
                    activeStep === i
                      ? 'bg-[#14161B] border border-[#B9B9B9]/20'
                      : 'hover:bg-[#14161B]/50'
                  }`}
                  onClick={() => setActiveStep(i)}
                >
                  {/* Number */}
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center font-display font-bold text-xl transition-all duration-500 ${
                      activeStep === i
                        ? 'bg-[#B9B9B9] text-[#0B0C10]'
                        : 'bg-[#14161B] border border-[#B9B9B9]/20 text-[#B9B9B9] group-hover:border-[#B9B9B9]/40'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <span className="font-mono text-xs tracking-[0.15em] text-[#A7A7AD] uppercase block mb-1">
                      {slide.stepNumber}
                    </span>
                    <h3 className="font-display text-xl lg:text-2xl font-semibold text-[#F4F4F5] mb-2 group-hover:text-[#B9B9B9] transition-colors">
                      {slide.title}
                    </h3>
                    <p className="text-[#A7A7AD] leading-relaxed">
                      {slide.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className={`flex-shrink-0 self-center transition-all duration-500 ${
                    activeStep === i ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}>
                    <ArrowRight className="w-5 h-5 text-[#B9B9B9]" />
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-10">
              <button
                onClick={prevStep}
                className="w-12 h-12 rounded-full bg-[#14161B] border border-[#B9B9B9]/20 flex items-center justify-center text-[#B9B9B9] hover:border-[#B9B9B9]/50 hover:bg-[#B9B9B9]/10 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextStep}
                className="w-12 h-12 rounded-full bg-[#14161B] border border-[#B9B9B9]/20 flex items-center justify-center text-[#B9B9B9] hover:border-[#B9B9B9]/50 hover:bg-[#B9B9B9]/10 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="flex gap-2 ml-4">
                {howItWorksConfig.slides.map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-1 rounded-full transition-all duration-500 ${
                      activeStep === i ? 'bg-[#B9B9B9]' : 'bg-[#B9B9B9]/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div ref={imageRef} className="order-1 lg:order-2 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-transparent to-transparent z-10" />
              {howItWorksConfig.slides.map((slide, i) => (
                <img
                  key={i}
                  src={slide.image}
                  alt={slide.title}
                  className={`absolute inset-0 w-full h-full object-cover grayscale brightness-75 contrast-125 transition-all duration-700 ${
                    activeStep === i ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                />
              ))}
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 z-20 bg-[#14161B] border border-[#B9B9B9]/20 rounded-2xl px-6 py-4">
              <span className="font-mono text-xs text-[#A7A7AD] uppercase tracking-wider block mb-1">Step</span>
              <span className="font-display text-3xl font-bold text-[#F4F4F5]">
                {String(activeStep + 1).padStart(2, '0')}
                <span className="text-[#A7A7AD] text-lg">/{String(howItWorksConfig.slides.length).padStart(2, '0')}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section Number */}
      <div className="absolute bottom-8 right-8 font-display text-[120px] font-bold text-[#B9B9B9]/5 leading-none select-none pointer-events-none">
        03
      </div>
    </section>
  );
}
