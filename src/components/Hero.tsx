import { motion } from 'motion/react';
import { ArrowRight, Sparkles, MapPin, Shield, Terminal } from 'lucide-react';
import { personalInfo } from '../data';
import { personalInfoEN, uiTranslations } from '../translations';

interface HeroProps {
  onScrollToSection: (id: string) => void;
  lang: 'zh' | 'en';
  setLang: (lang: 'zh' | 'en') => void;
  onResetIntro?: () => void;
}

export default function Hero({ onScrollToSection, lang, setLang, onResetIntro }: HeroProps) {
  const info = lang === 'en' ? personalInfoEN : personalInfo;
  const t = uiTranslations[lang];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between overflow-hidden animate-tech-flow text-[#e5e5e5]">
      {/* Background Flowing Tech Lights */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Diagonal tech scanning beam representing light streams */}
        <div className="absolute inset-x-0 w-full h-[350px] bg-gradient-to-b from-transparent via-blue-500/15 to-transparent blur-3xl animate-beam-scan" />
        
        {/* Soft flowing dynamic light source highlights */}
        <div className="absolute top-[-5%] right-[-5%] w-[550px] h-[550px] glow-orb-blue opacity-60 animate-drift-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[650px] h-[650px] glow-orb-purple opacity-50 animate-drift-reverse" />
        <div className="absolute top-[30%] left-[25%] w-[400px] h-[400px] glow-orb-blue opacity-40 animate-drift-slow" style={{ animationDelay: '-6s' }} />
      </div>

      {/* Grid overlay for tech matrix texture */}
      <div className="absolute inset-0 bg-mask-grid opacity-20 pointer-events-none z-1" />

      {/* 1. Header Navigation */}
      <header className="relative w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10 border-b border-white/5 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => {
            if (onResetIntro) {
              onResetIntro();
            } else {
              onScrollToSection('hero');
            }
          }}
        >
          <span className="font-display font-bold text-xl tracking-tight text-white flex items-center">
            YOUQING<span className="text-blue-500 font-light ml-1">.H</span>
          </span>
        </motion.div>

        {/* Desktop Navbar Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-[0.2em] opacity-85">
          <button id="nav-portfolio-link" onClick={() => onScrollToSection('portfolio')} className="text-neutral-400 hover:text-white transition-colors cursor-pointer">{t.works}</button>
          <button id="nav-about-link" onClick={() => onScrollToSection('about')} className="text-neutral-400 hover:text-white transition-colors cursor-pointer">{t.about}</button>
          <button id="nav-experience-link" onClick={() => onScrollToSection('experience')} className="text-neutral-400 hover:text-white transition-colors cursor-pointer">{t.experience}</button>
          <button id="nav-aichat-link" onClick={() => onScrollToSection('interactive-qa')} className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 font-mono cursor-pointer font-bold">
            <Terminal size={14} /> {t.aiChat}
          </button>
        </nav>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-3.5"
        >
          {/* Sleek Dual Language Switcher button */}
          <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-full select-none shadow-md backdrop-blur-sm">
            <button 
              onClick={() => setLang('zh')}
              className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-tight transition-all duration-300 cursor-pointer ${
                lang === 'zh' 
                  ? 'bg-[#3b82f6] text-white shadow-md' 
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              中
            </button>
            <button 
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-tight transition-all duration-300 cursor-pointer ${
                lang === 'en' 
                  ? 'bg-[#3b82f6] text-white shadow-md' 
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          <button 
            id="nav-contact-btn"
            onClick={() => onScrollToSection('contact')}
            className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider bg-white/5 border border-white/10 hover:border-white text-white hover:bg-white hover:text-black transition-all duration-300 shadow-lg cursor-pointer"
          >
            {t.contact}
          </button>
        </motion.div>
      </header>

      {/* 2. Main Hero Area with Elegant Editorial Side-by-Side Profile Layout */}
      <main className="relative w-full max-w-4xl mx-auto px-6 flex-grow flex flex-col justify-center z-10 py-12 md:py-16">
        
        {/* Profile Header Band: Avatar + Name & Specialty Tags */}
        <div className="flex flex-row items-center gap-6 md:gap-8 mb-8 text-left w-full">
          {/* Exquisite Circular Avatar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative group/avatar w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0"
          >
            {/* Outer soft dynamic aura neon glow */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-[#3b82f6] via-indigo-600 to-[#a855f7] rounded-full blur-md opacity-20 group-hover/avatar:opacity-40 transition duration-500" />
            
            {/* Perfect ring border for the exquisite circular avatar */}
            <div className="absolute inset-x-0 inset-y-0 rounded-full border border-white/10 group-hover/avatar:border-blue-500/20 transition-colors duration-500 p-1 bg-neutral-950/80 backdrop-blur-md">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <img 
                  className="relative w-full h-full object-cover object-center scale-100 group-hover/avatar:scale-112 transition-transform duration-700" 
                  src="https://i.postimg.cc/YCNd4MxY/zhao-pian3.jpg" 
                  alt="Youqing Huang" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Blinking green online indicator symbol positioned exactly on the outer circle boundary contour line */}
            <span className="absolute bottom-[14.6%] right-[14.6%] translate-x-1/2 translate-y-1/2 flex h-3 w-3 z-20">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-[#050505]" />
            </span>
          </motion.div>

          {/* Name & Specialty Tags beautifully stacked to the right of the Avatar */}
          <div className="flex flex-col justify-center min-w-0">
            {/* Elegant name H1 */}
            <motion.h1 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold tracking-tight text-white mb-2"
            >
              {lang === 'en' ? 'Youqing Huang' : '黄友情'}
            </motion.h1>

            {/* Title tag display with core expertise */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-950/40 border border-blue-500/10 rounded-lg text-xs font-mono font-bold uppercase tracking-wider text-[#3b82f6] w-fit">
              <Sparkles size={13} className="text-blue-400 animate-pulse flex-shrink-0" />
              <span>{lang === 'en' ? 'GTM / IMC / Planner' : 'GTM / IMC / 创意策划 / 产品策划'}</span>
            </div>
          </div>
        </div>

        {/* Right side / Bottom side: Narrative styled in premium editorial layout */}
        <div className="text-left space-y-6">
          {/* Tagline / Subtitle */}
          <h2 className="text-xs sm:text-sm text-neutral-400 font-sans font-light tracking-wider leading-relaxed max-w-2xl text-justify opacity-90">
            {lang === 'en' ? (
              "I graduated from Nanchang University in Advertising, served FMCG giants in the 4A agency network, and deeply cultivated the Xiaomi Ecosystem (70mai Technology) as a Marketing Planning Supervisor, managing new product launches across automotive, pet, and security lines. With 8 years of hands-on experience, I possess rich advertising planning and project management capabilities, with a sharp dynamic instinct to drive tech products into the public spotlight."
            ) : (
              "我毕业于南昌大学广告学专业，曾在4A体系服务快销巨头，后深耕小米生态链（70迈数字科技），任职市场策划主管，负责车载/宠物/安防三条业务线的新品宣发工作。8年的实战经验，使我不仅拥有丰富的广告策划与项目管理能力，更懂得如何以敏锐的市场直觉，驱动科技产品走向大众视野。"
            )}
          </h2>

          {/* Action buttons styled with precision */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button 
              id="hero-go-portfolio"
              onClick={() => onScrollToSection('portfolio')}
              className="group px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider bg-white text-black hover:bg-[#3b82f6] hover:text-white transition-all duration-300 shadow-xl flex items-center justify-center gap-2.5 cursor-pointer"
            >
              {t.btnWorks}
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              id="hero-chat-btn"
              onClick={() => onScrollToSection('interactive-qa')}
              className="px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Terminal size={14} className="text-blue-400" />
              {t.btnAiChat}
            </button>
          </div>
        </div>
      </main>

      {/* 3. Hero Footer displaying current location and sub-highlights */}
      <footer className="relative w-full max-w-7xl mx-auto px-6 py-8 border-t border-white/5 z-10 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400/80 font-mono">
        <div className="flex items-center space-x-2.5 mb-4 sm:mb-0">
          <MapPin size={13} className="text-blue-400" />
          <span>{t.footerLocation}</span>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1.5">
            <Terminal size={12} className="text-blue-400" />
            <span>{t.footerExperience}</span>
          </div>
          <span className="text-neutral-800">/</span>
          <div className="flex items-center space-x-1.5">
            <Shield size={12} className="text-purple-400" />
            <span>{t.footerCredential}</span>
          </div>
          <span className="text-neutral-800">/</span>
          <div className="flex items-center space-x-1.5">
            <Sparkles size={12} className="text-amber-400" />
            <span>{t.footerRecord}</span>
          </div>
        </div>
      </footer>
    </section>
  );
}
