import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface IntroSplashProps {
  onEnter: () => void;
  lang: 'zh' | 'en';
  key?: string;
}

export default function IntroSplash({ onEnter, lang }: IntroSplashProps) {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Scroll down with mouse wheel / trackpad opens the home page
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 8) {
        onEnter();
      }
    };

    // Mobile Swipe-up / scroll-down also lets users enter
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY; // standard swipe up gestures
      if (diffY > 40) { 
        onEnter();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onEnter]);

  const textClasses = "text-5xl sm:text-6xl md:text-8xl font-display font-black tracking-[0.22em] select-none pl-[0.22em] pr-2 transition-all";

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: -20,
        filter: 'blur(15px)',
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030305] overflow-hidden select-none"
    >
      {/* 1. Cinematic Dark Art Background inspired by high-end Pinterest tech graphic style */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        
        {/* Shifting warm orange to technical sapphire blue fluid background orbs */}
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 50, 0],
            scale: [1, 1.15, 0.9, 1],
            opacity: [0.12, 0.18, 0.12],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-orange-500/10 to-transparent blur-[130px]"
        />
        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 40, -40, 0],
            scale: [1, 0.95, 1.1, 1],
            opacity: [0.1, 0.16, 0.1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/3 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-blue-500/15 to-indigo-600/5 blur-[150px]"
        />

        {/* Technical/Scope Crosshair Laser Lines (Aligning in the perfect center) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-400 to-transparent" />
          <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-zinc-400 to-transparent" />
        </div>

        {/* Giant Slow-Rotating Technical/Orbital Circular Ring with thin dotted style */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.1]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="w-[450px] h-[450px] sm:w-[600px] sm:h-[600px] rounded-full border border-dashed border-zinc-500 relative"
          >
            {/* Tiny tech radar dots riding the orbital ring */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-orange-400 shadow-lg shadow-orange-500" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-lg shadow-blue-500" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-zinc-400" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-zinc-400" />
          </motion.div>
          
          {/* Innermost pulsing precision ring */}
          <motion.div 
            animate={{ 
              scale: [0.95, 1.05, 0.95],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] rounded-full border border-zinc-600/30"
          />
        </div>

        {/* Elegant Minimal Tech Grid Lines overlay */}
        <div 
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Dark cinematic vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#030305] opacity-90" />
      </div>

      {/* Main Interactive Container (留白：极简居中，唯美画境) */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-2xl cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onEnter}
      >
        {/* YOUQING.H Name with custom dynamic orange-to-blue gradient blur flare */}
        <div className="relative group">
          {/* Deep glowing background flare layer behind the text, fading to sapphire blue */}
          <motion.div
            animate={isHovered ? {
              scale: 0.8,
              opacity: 0,
              filter: 'blur(10px)',
            } : {
              scale: [0.9, 1.15, 1.05, 0.95, 0.9],
              opacity: [0.3, 0.65, 0.8, 0.45, 0.3],
              filter: ['blur(20px)', 'blur(35px)', 'blur(22px)', 'blur(40px)', 'blur(20px)'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-amber-500/30 to-blue-500/20 pointer-events-none select-none mix-blend-screen"
          />

          <motion.h1
            animate={isHovered ? {
              filter: 'blur(0px)',
              color: '#ffffff', // Clean high-key white on hover
              scale: 1.02,
              opacity: 1,
              textShadow: '0 0 25px rgba(255, 114, 94, 0.35), 0 0 50px rgba(59, 130, 246, 0.2)'
            } : {
              // Shrouded breathing mist of orange to royal blue: occasionally very sharp (blur(2px))!
              filter: ['blur(13px)', 'blur(10px)', 'blur(2px)', 'blur(11px)', 'blur(15px)', 'blur(13px)'], 
              color: [
                'rgba(255, 114, 94, 0.55)', // Warm Orange
                'rgba(245, 158, 11, 0.7)',   // Amber-yellow
                'rgba(255, 255, 255, 0.95)',  // Crisp Silver White (occasionally legible)
                'rgba(59, 130, 246, 0.8)',   // Brilliant Blue
                'rgba(96, 165, 250, 0.5)',   // Soft Sky Blue
                'rgba(255, 114, 94, 0.55)'  // Back to Orange
              ],
              scale: [0.985, 1.01, 1.025, 0.995, 0.975, 0.985],
              opacity: [0.55, 0.76, 0.98, 0.72, 0.48, 0.55],
              textShadow: [
                '0 0 15px rgba(255, 114, 94, 0.25)',
                '0 0 25px rgba(245, 158, 11, 0.45)',
                '0 0 45px rgba(255, 255, 255, 0.85)',
                '0 0 35px rgba(59, 130, 246, 0.55)',
                '0 0 15px rgba(96, 165, 250, 0.25)',
                '0 0 15px rgba(255, 114, 94, 0.25)'
              ]
            }}
            transition={{
              // Super cohesive eased transitions (slightly faster 8s breathing)
              filter: { duration: isHovered ? 0.35 : 8, ease: isHovered ? [0.16, 1, 0.3, 1] : "easeInOut", repeat: isHovered ? 0 : Infinity },
              color: { duration: isHovered ? 0.3 : 8, ease: isHovered ? [0.16, 1, 0.3, 1] : "easeInOut", repeat: isHovered ? 0 : Infinity },
              scale: { duration: isHovered ? 0.45 : 8, ease: isHovered ? [0.16, 1, 0.3, 1] : "easeInOut", repeat: isHovered ? 0 : Infinity },
              opacity: { duration: isHovered ? 0.35 : 8, ease: isHovered ? [0.16, 1, 0.3, 1] : "easeInOut", repeat: isHovered ? 0 : Infinity },
              textShadow: { duration: isHovered ? 0.45 : 8, ease: isHovered ? [0.16, 1, 0.3, 1] : "easeInOut", repeat: isHovered ? 0 : Infinity }
            }}
            className={textClasses}
          >
            YOUQING.H
          </motion.h1>
        </div>

        {/* Subtitle / Description: "塑造科技品味，驱动市场增长" is now bold & features dual-color aesthetics */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.95 : 0.75,
            y: isHovered ? 2 : 0
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 md:mt-8 select-none"
        >
          <p className="text-sm md:text-base font-sans font-bold tracking-[0.22em] leading-relaxed select-none bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 via-orange-300 to-blue-400 drop-shadow-sm">
            {lang === 'en' ? 'Shaping Tech Taste, Driving Market Growth' : '塑造科技品味，驱动市场增长'}
          </p>
        </motion.div>
      </div>

      {/* Interactive Minimalist Prompt at the bottom */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none">
        <motion.p 
          animate={{
            opacity: isHovered ? 0.85 : 0.25,
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ duration: 0.4 }}
          className="font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-400 font-semibold whitespace-nowrap"
        >
          {lang === 'en' ? 'CLICK TO BROWSE PORTFOLIO' : '点击黄友情进入作品案例'}
        </motion.p>
      </div>
    </motion.div>
  );
}



