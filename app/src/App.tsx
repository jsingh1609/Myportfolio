import { useState, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { Features } from './sections/Features';
import { HowItWorks } from './sections/HowItWorks';
import { SubjectInput } from './sections/SubjectInput';
import { ExamTimeline } from './sections/ExamTimeline';
import { Dashboard } from './sections/Dashboard';
import { DailyFocus } from './sections/DailyFocus';
import { Quotes } from './sections/Quotes';
import { FooterCTA } from './sections/FooterCTA';
import { Preloader } from './components/Preloader';
import { ScrollToTop } from './components/ScrollToTop';
import { CustomCursor } from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Initialize smooth scroll behavior - NO SNAP
  useEffect(() => {
    if (isLoading) return;

    // Refresh ScrollTrigger after all components mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [isLoading]);

  // Cleanup all ScrollTriggers on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <div
        className={`min-h-screen bg-[#0B0C10] ${
          isLoading ? 'overflow-hidden max-h-screen' : ''
        }`}
      >
        <CustomCursor />
        <Navigation />

        <main className="relative">
          <Hero isReady={!isLoading} />
          <Features />
          <HowItWorks />
          <SubjectInput />
          <ExamTimeline />
          <Dashboard />
          <DailyFocus />
          <Quotes />
          <FooterCTA />
        </main>

        <ScrollToTop />
      </div>
    </>
  );
}

export default App;
