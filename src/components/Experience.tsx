import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Calendar, MapPin, Award, Sparkles, Terminal, Activity, ChevronRight, CheckCircle2 } from 'lucide-react';
import { workExperience } from '../data';
import { workExperienceEN, uiTranslations } from '../translations';

interface ExperienceProps {
  lang: 'zh' | 'en';
}

export default function Experience({ lang }: ExperienceProps) {
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(0);

  const t = uiTranslations[lang];
  const list = lang === 'en' ? workExperienceEN : workExperience;

  // Elite Standard GTM Product Launch Workflow modeled on her 70mai & TVC experiences
  const launchWorkflow = [
    {
      step: "01",
      title: t.launchWorkflow0,
      role: t.launchWorkflowRole0,
      description: t.launchWorkflowDesc0,
      deliverables: [t.launchWorkflowDeli0_0, t.launchWorkflowDeli0_1, t.launchWorkflowDeli0_2]
    },
    {
      step: "02",
      title: t.launchWorkflow1,
      role: t.launchWorkflowRole1,
      description: t.launchWorkflowDesc1,
      deliverables: [t.launchWorkflowDeli1_0, t.launchWorkflowDeli1_1, t.launchWorkflowDeli1_2]
    },
    {
      step: "03",
      title: t.launchWorkflow2,
      role: t.launchWorkflowRole2,
      description: t.launchWorkflowDesc2,
      deliverables: [t.launchWorkflowDeli2_0, t.launchWorkflowDeli2_1, t.launchWorkflowDeli2_2]
    },
    {
      step: "04",
      title: t.launchWorkflow3,
      role: t.launchWorkflowRole3,
      description: t.launchWorkflowDesc3,
      deliverables: [t.launchWorkflowDeli3_0, t.launchWorkflowDeli3_1, t.launchWorkflowDeli3_2]
    }
  ];

  return (
    <section id="experience" className="relative py-24 bg-[#050505] text-white border-t border-white/5">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-mask-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 glow-orb-purple opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-80 h-80 glow-orb-blue opacity-20 pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-blue-400 font-mono text-xs uppercase tracking-widest mb-3 animate-pulse">
              <Activity size={14} />
              <span>{t.expSub}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">
              {t.expTitle}
            </h2>
          </div>
          <p className="max-w-md text-sm text-gray-400 font-sans font-light leading-relaxed">
            {t.expDesc}
          </p>
        </div>

        {/* 1. Timeline Layout */}
        <div className="relative border-l border-white/5 ml-4 md:ml-8 pl-8 md:pl-12 space-y-16 py-4 max-w-4xl">
          {list.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Chronological Circle Indicator */}
              <div className="absolute -left-[45px] md:-left-[61px] top-1.5 w-6 h-6 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center group-hover:border-blue-500 transition-colors duration-300 z-10 shadow-lg">
                <Briefcase size={10} className="text-neutral-500 group-hover:text-blue-400 transition-colors" />
              </div>

              {/* Layout Content */}
              <div className="p-6 md:p-8 rounded-2xl glass-morphic bg-white/5 hover:border-white/10 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    <span className="font-mono text-xs text-blue-400 font-bold bg-blue-950/30 border border-blue-800/10 px-2.5 py-1 rounded">
                      {exp.logoText}
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-extrabold text-white tracking-tight mt-3">
                      {exp.company}
                    </h3>
                    <p className="text-neutral-400 text-sm font-medium mt-1 font-sans">
                      {exp.title}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-3 text-xs text-neutral-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} /> {exp.period}
                    </span>
                    <span className="hidden md:inline text-neutral-800">|</span>
                    <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                      <MapPin size={13} /> {exp.location}
                    </span>
                  </div>
                </div>

                {/* Duty Bullet Points */}
                <div className="space-y-3 font-sans">
                  <p className="text-xs font-mono tracking-widest text-[#88888b] uppercase border-b border-white/5 pb-1.5 mb-2.5 font-semibold">
                    {t.expCoreDuties}
                  </p>
                  {exp.description.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2 text-xs md:text-sm text-gray-400 font-sans font-light leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500/40 mt-2 flex-shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Work Highlights */}
                <div className="mt-6 pt-6 border-t border-white/5 font-sans">
                  <p className="text-xs font-mono tracking-widest text-blue-400 uppercase font-bold mb-3 flex items-center gap-1">
                    <Sparkles size={11} /> {t.expAchievements}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {exp.highlights.map((high, hIdx) => (
                      <div key={hIdx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 font-sans font-light leading-relaxed">
                        <span className="text-blue-400 font-bold block mb-1">
                          {lang === 'en' ? `Impact #${hIdx+1}` : `成效 #${hIdx+1}`}
                        </span>
                        {high}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 2. Interactive Campaign Workflow Simulator Area */}
        <div className="mt-32">
          <div className="p-6 md:p-10 rounded-3xl glass-morphic bg-gradient-to-tr from-blue-950/10 via-neutral-900/10 to-purple-950/10 border border-white/10">
            
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="px-3 py-1 rounded bg-blue-950 text-blue-400 border border-blue-800/25 font-mono text-xs uppercase tracking-widest font-semibold">
                GTM & CAMPAIGN FLOW SIMULATOR
              </span>
              <h3 className="text-2xl md:text-3xl font-display font-black text-white mt-4">
                {t.workflowTitle}
              </h3>
              <p className="text-xs text-gray-400 mt-2 font-sans font-light">
                {t.workflowDesc}
              </p>
            </div>

            {/* Steps bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {launchWorkflow.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveWorkflowStep(idx)}
                  className={`p-4 rounded-xl text-left border transition-all duration-300 relative cursor-pointer ${
                    activeWorkflowStep === idx
                      ? 'bg-[#111115] border-blue-500 shadow-md shadow-blue-500/10'
                      : 'bg-[#050505] border-white/5 hover:border-white/10 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono font-black ${
                      activeWorkflowStep === idx ? 'text-blue-400' : 'text-neutral-500'
                    }`}>
                      PHASE {step.step}
                    </span>
                    {activeWorkflowStep === idx && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    )}
                  </div>
                  <h4 className={`text-xs md:text-sm font-bold tracking-tight line-clamp-1 font-sans ${
                    activeWorkflowStep === idx ? 'text-white' : 'text-neutral-400'
                  }`}>
                    {step.role}
                  </h4>
                  <p className="text-[10px] text-neutral-500 font-mono tracking-wide mt-1 font-sans">
                    {lang === 'en' ? 'Click to inspect' : '点击解析'}
                  </p>
                </button>
              ))}
            </div>

            {/* Step Detail Content Panel */}
            <div className="min-h-[220px] p-6 rounded-2xl bg-black border border-white/5 flex flex-col md:flex-row justify-between items-start gap-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeWorkflowStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex-grow max-w-xl text-left"
                >
                  <span className="text-[10px] sm:text-xs font-mono tracking-widest text-blue-400 font-bold block mb-1 uppercase">
                    — {launchWorkflow[activeWorkflowStep].role} —
                  </span>
                  <h4 className="text-lg md:text-xl font-display font-extrabold text-white tracking-tight">
                    {launchWorkflow[activeWorkflowStep].title}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-400 font-sans font-light leading-relaxed mt-4">
                    {launchWorkflow[activeWorkflowStep].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Deliverables checklist */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`check-${activeWorkflowStep}`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full md:w-80 flex-shrink-0 text-left font-sans"
                >
                  <p className="text-[10px] font-mono tracking-widest text-[#888] uppercase border-b border-white/5 pb-2 mb-3 font-semibold">
                    {t.workflowDeliverables}
                  </p>
                  <div className="space-y-2.5">
                    {launchWorkflow[activeWorkflowStep].deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-gray-300">
                        <CheckCircle2 size={14} className="text-blue-400 flex-shrink-0" />
                        <span className="font-sans font-light">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
