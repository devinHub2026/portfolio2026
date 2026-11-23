import { motion } from 'motion/react';
import { Award, BookOpen, GraduationCap, Compass, HelpCircle, Sparkles, BrainCircuit, Heart, Trophy, Terminal } from 'lucide-react';
import { education, hobbies } from '../data';
import { educationEN, hobbiesEN, uiTranslations } from '../translations';

interface AboutProps {
  lang: 'zh' | 'en';
}

export default function About({ lang }: AboutProps) {
  const t = uiTranslations[lang];
  const edu = lang === 'en' ? educationEN : education;
  const hob = lang === 'en' ? hobbiesEN : hobbies;

  return (
    <section id="about" className="relative py-24 bg-[#050505] text-white border-t border-white/5">
      {/* Absolute graphic grids and neon gradients */}
      <div className="absolute inset-0 bg-mask-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-[400px] h-[400px] glow-orb-blue opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] glow-orb-purple opacity-20 pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-6">
        
        {/* Module title header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-blue-400 font-mono text-xs uppercase tracking-widest mb-3 animate-pulse">
              <GraduationCap size={14} />
              <span>{t.aboutSub}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">
              {t.aboutTitle}
            </h2>
          </div>
          <p className="max-w-md text-sm text-gray-400 font-sans font-light leading-relaxed">
            {t.aboutDesc}
          </p>
        </div>

        {/* Bento Board Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Education block (span 7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 md:p-8 rounded-2xl glass-morphic bg-white/5 hover:border-white/10 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-950 text-blue-450 border border-blue-800/10">
                    <GraduationCap size={20} className="text-blue-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg md:text-xl font-display font-black text-white">{t.eduTitle}</h3>
                    <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-wide">{t.eduSub}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-blue-950/35 border border-blue-800/20 text-blue-300 px-2.5 py-1 rounded-full text-[10px] font-mono">
                  <span>GPA {edu.gpa.split(' ')[0]}</span>
                </div>
              </div>

              {/* School title */}
              <div className="mb-6 text-left">
                <h4 className="text-lg font-bold text-neutral-100">{edu.school}</h4>
                <p className="text-xs text-neutral-400 font-sans mt-0.5">{edu.period} · {edu.degree} · {edu.major}</p>
              </div>

              {/* Major courses in badge chips */}
              <div className="mb-8 text-left">
                <p className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-3">{t.coursesTitle}</p>
                <div className="flex flex-wrap gap-2">
                  {edu.courses.map((course) => (
                    <span key={course} className="px-3 py-1.5 rounded bg-[#111115] text-xs text-neutral-300 border border-white/5">
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Academic highlights / Awards count */}
              <div className="text-left">
                <p className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-3">{t.awardsTitle}</p>
                <ul className="space-y-3.5 text-xs text-neutral-300 font-sans font-light leading-relaxed">
                  {edu.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom visual academic indicator panel */}
            <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#09090c] border border-white/5 text-center relative overflow-hidden">
                <div className="absolute right-2 bottom-2 text-neutral-900/60 pointer-events-none"><Trophy size={48} /></div>
                <p className="text-2xl sm:text-3xl font-display font-black text-blue-400">{t.awardsCount}</p>
                <p className="text-[10px] text-neutral-500 font-mono mt-1 leading-snug">{t.awardsLabel}</p>
              </div>
              <div className="p-4 rounded-xl bg-[#09090c] border border-white/5 text-center relative overflow-hidden">
                <div className="absolute right-2 bottom-2 text-neutral-900/60 pointer-events-none"><Award size={48} /></div>
                <p className="text-2xl sm:text-3xl font-display font-black text-purple-400">{t.gpaCount}</p>
                <p className="text-[10px] text-neutral-500 font-mono mt-1 leading-snug">{t.gpaLabel}</p>
              </div>
            </div>
          </div>

          {/* Card 2: Hobbies & Personal Interests block (span 5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 md:p-8 rounded-2xl glass-morphic bg-white/5 hover:border-white/10 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-950 text-purple-400 border border-purple-800/10">
                    <Heart size={20} className="text-purple-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg md:text-xl font-display font-black text-white">{t.hobbiesTitle}</h3>
                    <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-wide">{t.hobbiesSub}</p>
                  </div>
                </div>
              </div>

              {/* Bio block from data */}
              <p className="text-xs md:text-sm text-neutral-300 font-sans font-light leading-relaxed mb-6 italic bg-white/5 p-4 rounded-xl border border-white/5 text-left">
                {hob.text}
              </p>

              {/* Four categorized hobbies lists */}
              <div className="space-y-6 text-left">
                {hob.categories.map((cat, idx) => (
                  <div key={idx} className="group/hobby">
                    <h5 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1.5 mb-2 group-hover/hobby:text-white transition-colors">
                      {idx === 0 && <BookOpen size={12} />}
                      {idx === 1 && <BrainCircuit size={12} />}
                      {idx === 2 && <Compass size={12} />}
                      {idx === 3 && <Terminal size={12} />}
                      <span>{cat.title}</span>
                    </h5>
                    <div className="flex flex-wrap gap-1.5 pl-4 border-l border-white/5">
                      {cat.items.map((item, iIdx) => (
                        <span key={iIdx} className="text-[11px] text-neutral-400 font-sans">
                          {item}
                          {iIdx < cat.items.length - 1 && <span className="mx-2 text-neutral-800">·</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AIGC marketing endorsement highlight panel */}
            <div className="mt-8 pt-6 border-t border-white/5 text-left">
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/20 to-blue-950/20 border border-purple-900/10">
                <div className="flex items-center gap-2 text-white font-mono text-xs font-bold mb-1.5">
                  <Sparkles size={13} className="text-purple-400" />
                  <span>{t.aigcTitle}</span>
                </div>
                <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                  {t.aigcDesc}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
