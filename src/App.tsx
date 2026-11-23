import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import IntroSplash from './components/IntroSplash';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import ProjectShowcaseSlider from './components/ProjectShowcaseSlider';
import Experience from './components/Experience';
import About from './components/About';
import ChatAssistant from './components/ChatAssistant';
import Contact from './components/Contact';
import { Project } from './types';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [preFilledPrompt, setPreFilledPrompt] = useState<string | null>(null);
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showIntro]);

  // Smooth scroll handler targeting HTML IDs
  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pre-fill prompt for the AI assistant and scroll to chat
  const handlePreFillChat = (prompt: string) => {
    setPreFilledPrompt(prompt);
    setTimeout(() => {
      handleScrollToSection('interactive-qa');
    }, 100);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white font-sans selection:bg-[#3b82f6] selection:text-white font-sans antialiased">
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroSplash key="intro" lang={lang} onEnter={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* 1. Immersive Hero Segment with Language Toggle */}
      <Hero lang={lang} setLang={setLang} onScrollToSection={handleScrollToSection} onResetIntro={() => setShowIntro(true)} />

      {/* 2. Portfolio showcasing digital-fashion staggered cards */}
      <Portfolio 
        lang={lang} 
        onPreFillChat={handlePreFillChat} 
        activeProject={activeProject}
        setActiveProject={setActiveProject}
      />

      {/* Accordion launch-vibe showcase slider right below the main portfolio */}
      <ProjectShowcaseSlider 
        lang={lang} 
        onPreFillChat={handlePreFillChat} 
        onViewProject={(project) => setActiveProject(project)}
      />

      {/* 3. Interactive Chronological Career Timeline & Launch Flow Simulator */}
      <Experience lang={lang} />

      {/* 4. About Me Biography Bento - Nanchang University & personal hobbies */}
      <About lang={lang} />

      {/* 5. Conversational AI Double Recruiter Helpdesk */}
      <ChatAssistant 
        lang={lang}
        preFilledPrompt={preFilledPrompt}
        onClearPreFilledPrompt={() => setPreFilledPrompt(null)}
      />

      {/* 6. Footer connect sheet and fast-scroller */}
      <Contact lang={lang} onScrollToTop={() => handleScrollToSection('hero')} />
    </div>
  );
}
