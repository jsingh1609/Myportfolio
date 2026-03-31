import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Brain } from 'lucide-react';
import { preloaderConfig } from '../config';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete,
        });
      },
    });

    // Icon animation
    tl.fromTo(
      iconRef.current,
      { scale: 0.5, opacity: 0, rotateY: -90 },
      { scale: 1, opacity: 1, rotateY: 0, duration: 0.8, ease: 'back.out(1.7)' },
      0
    );

    // Text animation
    tl.fromTo(
      textRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      0.3
    );

    // Line animation
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, ease: 'power2.inOut' },
      0.5
    );

    // Hold then fade out
    tl.to({}, { duration: 0.5 });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#0B0C10] flex flex-col items-center justify-center"
    >
      {/* Icon */}
      <div
        ref={iconRef}
        className="mb-8"
        style={{ perspective: '1000px' }}
      >
        <div className="w-20 h-20 rounded-2xl bg-[#14161B] border border-[#B9B9B9]/20 flex items-center justify-center">
          <Brain className="w-10 h-10 text-[#B9B9B9]" />
        </div>
      </div>

      {/* Text */}
      <div ref={textRef} className="text-center">
        <h1 className="font-display text-4xl md:text-5xl text-[#F4F4F5] tracking-tight mb-2">
          {preloaderConfig.brandName}
        </h1>
        <p className="font-mono text-lg text-[#B9B9B9] tracking-[0.2em] uppercase">
          {preloaderConfig.brandSubname}
        </p>
      </div>

      {/* Loading line */}
      <div className="mt-12 w-48 h-[2px] bg-[#B9B9B9]/10 rounded-full overflow-hidden">
        <div
          ref={lineRef}
          className="h-full bg-gradient-to-r from-transparent via-[#B9B9B9] to-transparent origin-left"
        />
      </div>

      {/* Year text */}
      <p className="mt-8 font-mono text-xs text-[#A7A7AD]/40 uppercase tracking-[0.3em]">
        {preloaderConfig.yearText}
      </p>
    </div>
  );
}
