import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface QuoteItem {
  text: string;
  author: string;
  role: string;
}

const quotes: QuoteItem[] = [
  {
    text: "The best study plan is the one you actually follow.",
    author: "SmartStudy Team",
    role: "Creators"
  },
  {
    text: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier",
    role: "Author"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    role: "Former First Lady"
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
    role: "Humorist"
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
    role: "Writer"
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
    role: "Former President"
  }
];

export function Quotes() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-rotate quotes
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      goToQuote((activeIndex + 1) % quotes.length);
    }, 6000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeIndex]);

  // Scroll entrance animation
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const goToQuote = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    
    setIsAnimating(true);
    
    // Animate out current quote
    const currentQuote = document.querySelector('.quote-active');
    if (currentQuote) {
      gsap.to(currentQuote, {
        y: -30,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          setActiveIndex(index);
          // Reset interval
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          intervalRef.current = setInterval(() => {
            goToQuote((index + 1) % quotes.length);
          }, 6000);
        }
      });
    } else {
      setActiveIndex(index);
    }
  };

  // Animate in new quote
  useEffect(() => {
    const newQuote = document.querySelector('.quote-entering');
    if (newQuote) {
      gsap.fromTo(
        newQuote,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          onComplete: () => setIsAnimating(false),
        }
      );
    }
  }, [activeIndex]);

  const nextQuote = () => goToQuote((activeIndex + 1) % quotes.length);
  const prevQuote = () => goToQuote((activeIndex - 1 + quotes.length) % quotes.length);

  return (
    <section
      ref={sectionRef}
      id="quotes"
      className="relative w-full py-32 lg:py-48 bg-[#0B0C10] z-[80] overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#B9B9B9]/[0.03] blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#B9B9B9]/[0.03] blur-3xl" />

      <div ref={containerRef} className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.2em] text-[#B9B9B9] uppercase block mb-4">
            Inspiration
          </span>
          <h2 className="font-display text-[clamp(32px,5vw,56px)] font-bold text-[#F4F4F5] leading-[1] tracking-[-0.02em]">
            Words to Study By
          </h2>
        </div>

        {/* Quotes Container */}
        <div className="relative min-h-[300px] flex items-center justify-center">
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
            <div className="w-16 h-16 rounded-2xl bg-[#14161B] border border-[#B9B9B9]/20 flex items-center justify-center">
              <Quote className="w-7 h-7 text-[#B9B9B9]" />
            </div>
          </div>

          {/* Quote Content */}
          <div className="relative w-full text-center pt-12">
            {quotes.map((quote, index) => (
              <div
                key={index}
                className={`${
                  index === activeIndex ? 'quote-entering' : 'hidden'
                }`}
              >
                <blockquote className="text-[clamp(24px,4vw,42px)] text-[#F4F4F5] leading-[1.3] font-display font-medium mb-10 px-4">
                  "{quote.text}"
                </blockquote>
                <div className="flex flex-col items-center">
                  <span className="text-[#B9B9B9] font-medium text-lg">{quote.author}</span>
                  <span className="text-[#A7A7AD] text-sm">{quote.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={prevQuote}
            className="w-12 h-12 rounded-full bg-[#14161B] border border-[#B9B9B9]/20 flex items-center justify-center text-[#B9B9B9] hover:border-[#B9B9B9]/50 hover:bg-[#B9B9B9]/10 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Dots */}
          <div className="flex gap-3">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => goToQuote(index)}
                className={`relative w-3 h-3 rounded-full transition-all duration-500 ${
                  index === activeIndex
                    ? 'bg-[#B9B9B9] scale-125'
                    : 'bg-[#B9B9B9]/20 hover:bg-[#B9B9B9]/40'
                }`}
                aria-label={`Go to quote ${index + 1}`}
              >
                {index === activeIndex && (
                  <span className="absolute inset-0 rounded-full bg-[#B9B9B9] animate-ping opacity-30" />
                )}
              </button>
            ))}
          </div>
          
          <button
            onClick={nextQuote}
            className="w-12 h-12 rounded-full bg-[#14161B] border border-[#B9B9B9]/20 flex items-center justify-center text-[#B9B9B9] hover:border-[#B9B9B9]/50 hover:bg-[#B9B9B9]/10 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="max-w-xs mx-auto mt-10">
          <div className="h-1 bg-[#14161B] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#B9B9B9]/50 to-[#B9B9B9] rounded-full transition-all duration-700"
              style={{ width: `${((activeIndex + 1) / quotes.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-3">
            <span className="font-mono text-xs text-[#A7A7AD]">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="font-mono text-xs text-[#A7A7AD]">
              {String(quotes.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Section Number */}
      <div className="absolute bottom-8 right-8 font-display text-[120px] font-bold text-[#B9B9B9]/5 leading-none select-none pointer-events-none">
        08
      </div>
    </section>
  );
}
