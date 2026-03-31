import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { subjectInputConfig } from '../config';
import { Plus, X, BookOpen, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Subject {
  id: string;
  name: string;
  priority: 'low' | 'normal' | 'high';
  hours: number;
}

export function SubjectInput() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'Calculus', priority: 'high', hours: 20 },
    { id: '2', name: 'Physics', priority: 'normal', hours: 15 },
  ]);
  const [newSubject, setNewSubject] = useState('');
  const [priority, setPriority] = useState<'low' | 'normal' | 'high'>('normal');
  const [hours, setHours] = useState(10);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Image parallax
      const imgEl = imageRef.current?.querySelector('img');
      if (imgEl) {
        gsap.to(imgEl, {
          y: '-20%',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      // Form reveal
      gsap.fromTo(
        formRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addSubject = () => {
    if (!newSubject.trim()) return;
    const subject: Subject = {
      id: Date.now().toString(),
      name: newSubject,
      priority,
      hours,
    };
    setSubjects([...subjects, subject]);
    setNewSubject('');
    setHours(10);
  };

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'high':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'normal':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'low':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      default:
        return 'bg-[#B9B9B9]/20 text-[#B9B9B9] border-[#B9B9B9]/30';
    }
  };

  return (
    <section
      ref={sectionRef}
      id="subjects"
      className="relative w-full py-32 lg:py-48 bg-[#0B0C10] z-40 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-[#B9B9B9]/[0.02] blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Image */}
          <div ref={imageRef} className="relative lg:sticky lg:top-32">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-transparent to-transparent z-10" />
              <img
                src={subjectInputConfig.image}
                alt="Student studying"
                className="w-full h-full object-cover grayscale brightness-[0.65] contrast-125"
              />
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-8 -right-8 z-20 bg-[#14161B] border border-[#B9B9B9]/20 rounded-2xl p-6 max-w-[200px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#B9B9B9]/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#B9B9B9]" />
                </div>
                <span className="font-mono text-xs text-[#A7A7AD] uppercase">AI Powered</span>
              </div>
              <p className="text-sm text-[#F4F4F5]">Smart priority detection based on your input</p>
            </div>
          </div>

          {/* Right Form */}
          <div ref={formRef}>
            <span className="font-mono text-xs tracking-[0.2em] text-[#B9B9B9] uppercase block mb-4">
              {subjectInputConfig.scriptText}
            </span>
            <h2 className="font-display text-[clamp(36px,6vw,72px)] font-bold text-[#F4F4F5] leading-[1] tracking-[-0.02em] mb-6">
              {subjectInputConfig.mainTitle}
            </h2>
            <p className="text-lg text-[#A7A7AD] leading-relaxed mb-10 max-w-md">
              {subjectInputConfig.introText}
            </p>

            {/* Form Card */}
            <div className="bg-[#14161B] rounded-3xl p-8 border border-[#B9B9B9]/10">
              {/* Input Row */}
              <div className="space-y-6 mb-8">
                {/* Subject Name */}
                <div>
                  <label className="block font-mono text-xs tracking-[0.15em] text-[#A7A7AD] uppercase mb-3">
                    Subject name
                  </label>
                  <input
                    type="text"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="e.g. Biology"
                    className="w-full px-5 py-4 bg-[#0B0C10] border border-[#B9B9B9]/20 rounded-xl text-[#F4F4F5] placeholder-[#A7A7AD]/40 focus:border-[#B9B9B9]/50 focus:outline-none transition-all duration-300"
                    onKeyDown={(e) => e.key === 'Enter' && addSubject()}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Priority */}
                  <div>
                    <label className="block font-mono text-xs tracking-[0.15em] text-[#A7A7AD] uppercase mb-3">
                      Priority
                    </label>
                    <div className="flex gap-2">
                      {(['low', 'normal', 'high'] as const).map((p) => (
                        <button
                          key={p}
                          onClick={() => setPriority(p)}
                          className={`flex-1 py-3 rounded-xl font-medium text-sm capitalize transition-all duration-300 ${
                            priority === p
                              ? 'bg-[#B9B9B9] text-[#0B0C10]'
                              : 'bg-[#0B0C10] border border-[#B9B9B9]/20 text-[#A7A7AD] hover:border-[#B9B9B9]/40'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hours */}
                  <div>
                    <label className="block font-mono text-xs tracking-[0.15em] text-[#A7A7AD] uppercase mb-3">
                      Est. hours
                    </label>
                    <input
                      type="number"
                      value={hours}
                      onChange={(e) => setHours(Number(e.target.value))}
                      min={1}
                      max={100}
                      className="w-full px-5 py-3 bg-[#0B0C10] border border-[#B9B9B9]/20 rounded-xl text-[#F4F4F5] focus:border-[#B9B9B9]/50 focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Add Button */}
              <button
                onClick={addSubject}
                className="w-full py-4 bg-[#0B0C10] border border-[#B9B9B9]/30 rounded-xl text-[#F4F4F5] font-medium flex items-center justify-center gap-2 hover:bg-[#B9B9B9] hover:text-[#0B0C10] hover:border-[#B9B9B9] transition-all duration-500"
              >
                <Plus className="w-5 h-5" />
                Add Subject
              </button>

              {/* Subject Chips */}
              {subjects.length > 0 && (
                <div className="mt-8 pt-8 border-t border-[#B9B9B9]/10">
                  <label className="block font-mono text-xs tracking-[0.15em] text-[#A7A7AD] uppercase mb-4">
                    Your subjects ({subjects.length})
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {subjects.map((subject) => (
                      <div
                        key={subject.id}
                        className="group flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 hover:scale-105"
                      >
                        <BookOpen className="w-4 h-4 text-[#B9B9B9]" />
                        <span className="text-[#F4F4F5] font-medium">{subject.name}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs border ${getPriorityColor(
                            subject.priority
                          )}`}
                        >
                          {subject.priority}
                        </span>
                        <span className="text-[#A7A7AD] text-sm">{subject.hours}h</span>
                        <button
                          onClick={() => removeSubject(subject.id)}
                          className="ml-1 p-1 rounded-full hover:bg-[#B9B9B9]/10 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <X className="w-4 h-4 text-[#A7A7AD] hover:text-[#F4F4F5]" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tip */}
            <p className="mt-6 text-sm text-[#A7A7AD]/70 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#B9B9B9]" />
              Tip: start with the hardest subject first for best results.
            </p>
          </div>
        </div>
      </div>

      {/* Section Number */}
      <div className="absolute bottom-8 right-8 font-display text-[120px] font-bold text-[#B9B9B9]/5 leading-none select-none pointer-events-none">
        04
      </div>
    </section>
  );
}
