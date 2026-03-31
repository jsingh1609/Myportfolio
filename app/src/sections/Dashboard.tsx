import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { dashboardConfig } from '../config';
import { Sparkles, BookOpen, Clock, Calendar, Check, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Subject {
  name: string;
  hours: number;
  color: string;
}

interface DaySchedule {
  day: string;
  tasks: { subject: string; duration: string }[];
}

export function Dashboard() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const subjects: Subject[] = [
    { name: 'Calculus', hours: 20, color: 'bg-blue-500/20 border-blue-500/30 text-blue-300' },
    { name: 'Physics', hours: 15, color: 'bg-purple-500/20 border-purple-500/30 text-purple-300' },
    { name: 'Chemistry', hours: 18, color: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300' },
    { name: 'Literature', hours: 12, color: 'bg-amber-500/20 border-amber-500/30 text-amber-300' },
  ];

  const weekSchedule: DaySchedule[] = [
    { day: 'Mon', tasks: [{ subject: 'Calculus', duration: '2h' }, { subject: 'Physics', duration: '1h' }] },
    { day: 'Tue', tasks: [{ subject: 'Chemistry', duration: '2h' }, { subject: 'Literature', duration: '1h' }] },
    { day: 'Wed', tasks: [{ subject: 'Calculus', duration: '1.5h' }, { subject: 'Physics', duration: '1.5h' }] },
    { day: 'Thu', tasks: [{ subject: 'Chemistry', duration: '2h' }, { subject: 'Review', duration: '1h' }] },
    { day: 'Fri', tasks: [{ subject: 'Literature', duration: '2h' }, { subject: 'Calculus', duration: '1h' }] },
    { day: 'Sat', tasks: [{ subject: 'Review All', duration: '3h' }] },
    { day: 'Sun', tasks: [{ subject: 'Rest', duration: '-' }] },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Card reveal with 3D effect
      gsap.fromTo(
        cardRef.current,
        { y: 100, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="schedule"
      className="relative w-full py-32 lg:py-48 bg-[#0B0C10] z-[60] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10] via-[#14161B]/80 to-[#0B0C10]" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${dashboardConfig.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%) brightness(0.3)',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs tracking-[0.2em] text-[#B9B9B9] uppercase block mb-4">
            {dashboardConfig.scriptText}
          </span>
          <h2 className="font-display text-[clamp(36px,6vw,72px)] font-bold text-[#F4F4F5] leading-[1] tracking-[-0.02em]">
            {dashboardConfig.mainTitle}
          </h2>
        </div>

        {/* Dashboard Card */}
        <div
          ref={cardRef}
          className="relative bg-[#14161B]/90 backdrop-blur-xl rounded-3xl border border-[#B9B9B9]/10 overflow-hidden"
          style={{ perspective: '1000px' }}
        >
          {/* Glow effect */}
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#B9B9B9]/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#B9B9B9]/5 blur-3xl" />

          {/* Card Header */}
          <div className="relative flex items-center justify-between px-8 py-6 border-b border-[#B9B9B9]/10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#B9B9B9]/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#B9B9B9]" />
              </div>
              <div>
                <span className="font-mono text-xs text-[#A7A7AD] uppercase tracking-wider block">AI Schedule</span>
                <span className="text-[#F4F4F5] font-medium">Personalized for you</span>
              </div>
            </div>
            <button
              onClick={handleGenerate}
              disabled={isGenerating || isGenerated}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-500 ${
                isGenerated
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-[#B9B9B9] text-[#0B0C10] hover:bg-[#F4F4F5] hover:shadow-[0_0_30px_rgba(185,185,185,0.3)]'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : isGenerated ? (
                <>
                  <Check className="w-4 h-4" />
                  Generated
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {dashboardConfig.generateButtonText}
                </>
              )}
            </button>
          </div>

          {/* Card Content */}
          <div className="relative flex flex-col lg:flex-row">
            {/* Left: Subjects */}
            <div className="w-full lg:w-2/5 p-8 border-b lg:border-b-0 lg:border-r border-[#B9B9B9]/10">
              <h3 className="font-mono text-xs tracking-[0.15em] text-[#A7A7AD] uppercase mb-6 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Subjects
              </h3>
              <div className="space-y-3">
                {subjects.map((subject, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${subject.color}`}
                  >
                    <span className="font-medium">{subject.name}</span>
                    <div className="flex items-center gap-2 text-sm opacity-80">
                      <Clock className="w-4 h-4" />
                      {subject.hours}h
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm text-[#A7A7AD]/70">
                {dashboardConfig.microcopy}
              </p>
            </div>

            {/* Right: Weekly Preview */}
            <div className="flex-1 p-8">
              <h3 className="font-mono text-xs tracking-[0.15em] text-[#A7A7AD] uppercase mb-6 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Weekly Preview
              </h3>
              
              <div className="grid grid-cols-7 gap-2">
                {weekSchedule.map((day, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border transition-all duration-500 ${
                      isGenerated
                        ? 'bg-[#0B0C10]/80 border-[#B9B9B9]/20'
                        : 'bg-[#0B0C10]/40 border-[#B9B9B9]/10 opacity-50'
                    }`}
                  >
                    <span className="font-mono text-xs text-[#B9B9B9] block mb-2">
                      {day.day}
                    </span>
                    <div className="space-y-1">
                      {day.tasks.map((task, j) => (
                        <div key={j} className="text-xs text-[#A7A7AD] truncate">
                          {task.duration !== '-' && (
                            <span className="text-[#B9B9B9]">{task.duration}</span>
                          )}{' '}
                          {task.subject}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              {isGenerated && (
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[#0B0C10]/80 border border-[#B9B9B9]/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-[#B9B9B9]" />
                      <span className="font-display text-2xl font-bold text-[#F4F4F5]">65h</span>
                    </div>
                    <span className="text-xs text-[#A7A7AD]">Total study time</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0B0C10]/80 border border-[#B9B9B9]/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-[#B9B9B9]" />
                      <span className="font-display text-2xl font-bold text-[#F4F4F5]">14</span>
                    </div>
                    <span className="text-xs text-[#A7A7AD]">Days until exam</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0B0C10]/80 border border-[#B9B9B9]/10">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-[#B9B9B9]" />
                      <span className="font-display text-2xl font-bold text-[#F4F4F5]">4.5h</span>
                    </div>
                    <span className="text-xs text-[#A7A7AD]">Daily average</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* AI Badge */}
        <div className="flex justify-center mt-8">
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-[#14161B] border border-[#B9B9B9]/20 rounded-full">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-[#B9B9B9]" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#B9B9B9] animate-ping" />
            </div>
            <span className="font-mono text-sm text-[#B9B9B9]">{dashboardConfig.badgeText}</span>
          </div>
        </div>
      </div>

      {/* Section Number */}
      <div className="absolute bottom-8 right-8 font-display text-[120px] font-bold text-[#B9B9B9]/5 leading-none select-none pointer-events-none">
        06
      </div>
    </section>
  );
}
