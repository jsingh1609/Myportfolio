import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { dailyFocusConfig } from '../config';
import { Check, ChevronRight, Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Task {
  id: string;
  title: string;
  duration: string;
  subject: string;
  completed: boolean;
}

export function DailyFocus() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tasksRef = useRef<HTMLDivElement>(null);
  
  const [tasks, setTasks] = useState<Task[]>(dailyFocusConfig.tasks);
  
  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = (completedCount / tasks.length) * 100;
  const circumference = 2 * Math.PI * 50;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Image reveal
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)',
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

      // Content reveal
      gsap.fromTo(
        contentRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
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

      // Tasks staggered reveal
      const taskItems = tasksRef.current?.querySelectorAll('.task-item');
      taskItems?.forEach((item, i) => {
        gsap.fromTo(
          item,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.1,
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

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      Math: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      Physics: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      Chemistry: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      Literature: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    };
    return colors[subject] || 'bg-[#B9B9B9]/20 text-[#B9B9B9] border-[#B9B9B9]/30';
  };

  return (
    <section
      ref={sectionRef}
      id="daily-focus"
      className="relative w-full py-32 lg:py-48 bg-[#0B0C10] z-[70] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-transparent to-transparent z-10" />
              <img
                src={dailyFocusConfig.image}
                alt="Student reading"
                className="w-full h-full object-cover grayscale brightness-[0.65] contrast-125"
              />
            </div>
            
            {/* Floating progress card */}
            <div className="absolute -bottom-6 -right-6 z-20 bg-[#14161B] border border-[#B9B9B9]/20 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#14161B" strokeWidth="10" />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#B9B9B9"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-700"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-lg font-bold text-[#F4F4F5]">{Math.round(progress)}%</span>
                  </div>
                </div>
                <div>
                  <span className="font-mono text-xs text-[#A7A7AD] uppercase block mb-1">Progress</span>
                  <span className="text-[#F4F4F5] font-medium">{completedCount}/{tasks.length} done</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div ref={contentRef}>
            <div className="flex items-start justify-between mb-10">
              <div>
                <span className="font-mono text-xs tracking-[0.2em] text-[#B9B9B9] uppercase block mb-4">
                  {dailyFocusConfig.scriptText}
                </span>
                <h2 className="font-display text-[clamp(32px,5vw,56px)] font-bold text-[#F4F4F5] leading-[1] tracking-[-0.02em]">
                  {dailyFocusConfig.dateText}
                </h2>
              </div>
              
              {/* Streak badge */}
              <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-orange-300 font-medium">5 day streak</span>
              </div>
            </div>

            {/* Tasks */}
            <div ref={tasksRef} className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`task-item group flex items-center gap-5 p-5 rounded-2xl border transition-all duration-500 cursor-pointer ${
                    task.completed
                      ? 'bg-[#14161B]/50 border-[#B9B9B9]/5'
                      : 'bg-[#14161B] border-[#B9B9B9]/10 hover:border-[#B9B9B9]/30'
                  }`}
                  onClick={() => toggleTask(task.id)}
                >
                  {/* Checkbox */}
                  <div
                    className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                      task.completed
                        ? 'bg-[#B9B9B9] border-[#B9B9B9] scale-110'
                        : 'border-[#B9B9B9]/30 group-hover:border-[#B9B9B9]/50'
                    }`}
                  >
                    {task.completed && <Check className="w-4 h-4 text-[#0B0C10]" />}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3
                      className={`font-display text-lg font-medium transition-all duration-500 ${
                        task.completed ? 'text-[#A7A7AD] line-through' : 'text-[#F4F4F5]'
                      }`}
                    >
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-[#A7A7AD]">{task.duration}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs border ${getSubjectColor(task.subject)}`}>
                        {task.subject}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View Full Week Link */}
            <a
              href="#schedule"
              className="mt-8 inline-flex items-center gap-2 text-[#B9B9B9] hover:text-[#F4F4F5] transition-colors duration-300 group"
            >
              {dailyFocusConfig.viewFullWeekText}
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Section Number */}
      <div className="absolute bottom-8 right-8 font-display text-[120px] font-bold text-[#B9B9B9]/5 leading-none select-none pointer-events-none">
        07
      </div>
    </section>
  );
}
