import * as React from 'react';
import { useState } from 'react';
import { ArrowRight, Smartphone, Camera, Tv, Sparkles } from 'lucide-react';

interface ProjectShowcaseSliderProps {
  lang: 'zh' | 'en';
  onPreFillChat: (prompt: string) => void;
  onViewProject: (project: any) => void;
}

interface ShowcaseCard {
  id: string;
  number: string;
  titleZh: string;
  titleEn: string;
  subZh: string;
  subEn: string;
  colorTheme: string; // Theme color class (e.g. text-cyan-400)
  activeGradient: string; // Gradient class for active card background
  borderColor: string;
  badgeZh: string;
  badgeEn: string;
  mockupType: 'pet' | 'dashcam' | 'mascot' | 'tvc';
  image: string;
  highlightsZh: string[];
  highlightsEn: string[];
  metricValue: string;
  metricLabelZh: string;
  metricLabelEn: string;
}

export default function ProjectShowcaseSlider({ lang, onPreFillChat, onViewProject }: ProjectShowcaseSliderProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const list: ShowcaseCard[] = [
    {
      id: 'proj_xiaomi',
      number: '01',
      titleZh: '小米宠物与安防',
      titleEn: 'Xiaomi Mijia Smart Pet & Security GTM',
      subZh: '打通小米产品站及全球多渠道推广',
      subEn: 'Unified Product Curation & Media Release',
      colorTheme: '#6b9c45', // requested green
      activeGradient: 'from-emerald-500/25 via-emerald-950/35 to-black/40',
      borderColor: 'border-emerald-500/40',
      badgeZh: '米家生态连爆',
      badgeEn: 'Xiaomi Ecosystem',
      mockupType: 'pet',
      image: 'https://i.postimg.cc/HxkKygbf/1(1).png', 
      highlightsZh: [
        '担任小米智能宠物、安全防护产品海海外首发GTM统筹',
        '主抓官方新物料创意输出，电商详情页交互视觉高标准品控',
        '确保海外分公司与国内产品经理多方无缝对接、多款新品一炮而红'
      ],
      highlightsEn: [
        'Architected end-to-end GTM campaigns for Xiaomi Mijia Smart lines',
        'Masterminded premium interactive e-commerce layouts & art directions',
        'Bridged global divisions to secure flawless multi-region launch records'
      ],
      metricValue: '8+',
      metricLabelZh: '全球对接基地',
      metricLabelEn: 'Global Centers'
    },
    {
      id: 'proj_70mai_gtm',
      number: '02',
      titleZh: '70迈车载电子',
      titleEn: '70mai Flagship Smart Dashcams',
      subZh: '主导11款自研S级明星单品首发上市',
      subEn: 'Masterminded 11 Flagship S-Class Debuts',
      colorTheme: '#e2973c', // requested orange
      activeGradient: 'from-orange-500/25 via-orange-950/35 to-black/40',
      borderColor: 'border-orange-500/40',
      badgeZh: '爆盘行车美学',
      badgeEn: 'S-Class Leader',
      mockupType: 'dashcam',
      image: 'https://i.postimg.cc/Zq3xRD9q/20240828x80010447.png',
      highlightsZh: [
        '负责多款主力旗舰S级新品发布，输出全盘策划案52份',
        '实现硬件参数美学转化，将硬解光学化解为守护生命的温情细节',
        '协同包装、视觉及全网矩阵，打造开盘数天售罄极高溢价印记'
      ],
      highlightsEn: [
        'Commanded 11 major flagships with 52 strategic execution books',
        'Translated hardware specifications into soft safety & life-style hooks',
        'Engineered complete asset alignment to optimize day-1 conversion rates'
      ],
      metricValue: '11款',
      metricLabelZh: '自研S级首发',
      metricLabelEn: 'Flagship Debuts'
    },
    {
      id: 'proj_brand_ip',
      number: '03',
      titleZh: 'IP Maix',
      titleEn: 'Mascot MaiX IP & 4K Brand Portal',
      subZh: '星际小熊生命周期规划与次世代官网',
      subEn: 'Mascot Curation & Cinematic Tech Platform',
      colorTheme: '#d14d85', // requested pink
      activeGradient: 'from-fuchsia-500/25 via-purple-950/35 to-black/40',
      borderColor: 'border-fuchsia-500/40',
      badgeZh: '极客潮流IP化',
      badgeEn: 'IP Ecosystem',
      mockupType: 'mascot',
      image: '/src/assets/images/xinjiang_desert_1780977231997.png',
      highlightsZh: [
        '从0到1架构70mai国际官网设计 with 4K影像沉浸展示流',
        '主创潮流星际小熊 MaiX 3D表情、实体安全测试与香氛周边',
        '社群黏性拉升超50%，将冷冰冰硬件衍生为饱含温情的极客图腾'
      ],
      highlightsEn: [
        'Constructed the official international portal with the 4K video showcase',
        'Conceived mascot MaiX (Astro Bear) alongside custom retail peripherals',
        'Boosted active geeks engagement parameters by wider than 50%+'
      ],
      metricValue: '+50%',
      metricLabelZh: '社群黏性飙升',
      metricLabelEn: 'Geek Retention'
    },
    {
      id: 'proj_tvc_4a',
      number: '04',
      titleZh: '快销影视TVC',
      titleEn: '4A FMCG & CCTV Cinematic TVCs',
      subZh: '30+项核心商业TVC脚本与物料监拍',
      subEn: 'Cinematic Storytelling & High-budget Ad Bidding',
      colorTheme: '#c92c5a', // requested magenta
      activeGradient: 'from-blue-500/25 via-indigo-950/35 to-black/40',
      borderColor: 'border-blue-500/40',
      badgeZh: '央视黄金展播',
      badgeEn: 'Cinematic TVC',
      mockupType: 'tvc',
      image: '/src/assets/images/maix_mascot_1780977248089.png',
      highlightsZh: [
        '主笔德业明星代言高级TVC，并成功于CCTV央视黄金时间展播',
        '为联合利华LUX、OMO奥妙定制剧情微电影、抖音挑战赛脚本',
        '高规格掌控镜头视觉意境，累计商业策划案提案通过率高居行业前列'
      ],
      highlightsEn: [
        'Authored national television commercial spots broadcasting on CCTV',
        'Architected viral stories, short reels and TVCs for Unilever brands',
        'Supervised filmmakers and designers to output high-fidelity commercials'
      ],
      metricValue: '30+',
      metricLabelZh: '服务顶级名企',
      metricLabelEn: 'Premium Brands'
    }
  ];

  return (
    <section id="showcase-slider" className="relative py-24 bg-[#f5f5f7] text-neutral-900 border-t border-neutral-200/50 px-6 md:px-12 overflow-hidden">
      {/* Absolute Decorative Backdrops */}
      <div className="absolute inset-0 bg-mask-grid opacity-5 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-neutral-200/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-neutral-300/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto">
        {/* Title Block */}
        <div className="mb-14 text-left max-w-3xl">
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#6b9c45] uppercase block mb-3.5">
            {lang === 'en' ? 'S-CLASS GTM ACCORDION SHOWCASE' : 'S级首发项目手风琴极客拆解'}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-neutral-900 mb-4">
            {lang === 'en' ? 'Core Launch Playbooks' : '经典项目深度解构'}
          </h2>
          <p className="text-sm md:text-base text-neutral-600 font-light font-sans leading-relaxed">
            {lang === 'en' 
              ? 'Click to expand each card to explore Youqing’s direct actions, campaign indicators, and localized GTM achievements.'
              : '融合手风琴膨胀弹性拉伸动效，点击快切展开对应旗舰产品的落地策略、攻坚表现及硬核交付数据。'
            }
          </p>
        </div>

        {/* 2. Slider Container */}
        <div id="dynamic-accordion-container" className="slider-container w-full h-[640px] md:h-[500px] bg-white border border-neutral-200/60 rounded-[32px] p-5 flex flex-col md:flex-row gap-2.5 shadow-[0_40px_100px_rgba(0,0,0,0.06)] relative">
          
          {list.map((card, idx) => {
            const active = activeIndex === idx;

            // Custom high-fidelity dimensions to fit the exact aspect ratios of the uploaded media
            const isDashcam = card.mockupType === 'dashcam';
            const isPet = card.mockupType === 'pet';
            
            // Stable static dimensions to prevent browser reflow layouts during expansion
            const imgWidth = isDashcam ? '340px' : (isPet ? '190px' : '200px');
            const imgHeight = isDashcam ? '225px' : (isPet ? '225px' : '220px');

            return (
              <div
                key={card.id}
                id={`accordion-card-${card.id}`}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`card relative h-full rounded-[24px] overflow-hidden cursor-pointer flex flex-col justify-between p-7 md:p-8 select-none group/card border ${
                  active 
                    ? `active flex-grow-[2.5] border-transparent shadow-xl` 
                    : `flex-grow-[1] border-neutral-200/50 hover:bg-[#f6f6f6]`
                }`}
                style={{ 
                  flexBasis: '0px',
                  backgroundColor: active ? card.colorTheme : '#fafafa',
                  transition: 'flex-grow 800ms cubic-bezier(0.25, 1, 0.5, 1), background-color 600ms ease, border-color 600ms ease, box-shadow 600ms ease',
                  willChange: 'flex-grow, background-color, border-color'
                }}
              >
                {/* 1. Header Portion */}
                <div className={`transition-all duration-500 text-left ${active ? 'opacity-100' : 'opacity-50'}`}>
                  <div className="flex items-center justify-between">
                    <span 
                      className={`text-2xl font-display font-bold transition-colors duration-500 ${active ? 'text-white' : 'text-neutral-400'}`}
                    >
                      {card.number}
                    </span>
                  </div>
                  
                  <h3 
                    className={`font-display font-semibold tracking-tight mt-1 transition-colors duration-500 ${
                      active ? 'text-xl md:text-2xl text-white' : 'text-[1.2rem] text-neutral-800 md:truncate'
                    }`}
                  >
                    {lang === 'en' ? card.titleEn : card.titleZh}
                  </h3>
                  <p 
                    className={`text-[0.9rem] mt-1 transition-colors duration-500 ${
                      active ? 'text-white/80' : 'text-neutral-500 md:truncate'
                    }`}
                  >
                    {lang === 'en' ? card.subEn : card.subZh}
                  </p>
                </div>

                {/* 2. Visual Mockup Container (Safe Middle Flex Zone) */}
                <div className="flex-grow w-full flex items-center justify-center relative min-h-0 my-3 select-none pointer-events-none">
                  <div 
                    className={`product-img-box relative will-change-transform ${
                      active 
                        ? 'opacity-100 z-10' 
                        : 'opacity-40'
                    }`}
                    style={{
                      width: imgWidth,
                      height: imgHeight,
                      maxHeight: '100%',
                      maxWidth: '100%',
                      transform: active ? 'scale(1.12) translateY(-14px)' : 'scale(0.7) translateY(8px)',
                      transition: 'transform 800ms cubic-bezier(0.34, 1.25, 0.64, 1), opacity 600ms cubic-bezier(0.25, 1, 0.5, 1)'
                    }}
                  >
                    {/* Dense dynamic atmospheric backplate glow matching the product's energetic color theme */}
                    <div 
                      className="absolute inset-x-0 bottom-0 top-0 rounded-full blur-[32px] opacity-25 group-hover/card:opacity-40 transition-all duration-700 pointer-events-none scale-90"
                      style={{ 
                        background: active ? 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)' : `radial-gradient(circle, ${card.colorTheme} 0%, transparent 70%)` 
                      }}
                    />

                    <div className="relative w-full h-full flex items-center justify-center p-1 group-hover/card:scale-105 transition-all duration-[700ms] ease-out">
                      <img 
                        src={card.image} 
                        alt="Campaign Screen" 
                        className="w-full h-full object-contain filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.12)] hover:brightness-105 hover:contrast-105 transition-all duration-500 ease-out" 
                        style={{
                          // @ts-ignore
                          imageRendering: 'crisp-edges',
                        }}
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Pulsing indicator/glowing dot in the corner */}
                      {active && (
                        <span className="absolute bottom-2.5 right-2.5 flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#ffffff' }} />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: '#ffffff' }} />
                        </span>
                      )}
                    </div>
                  </div>
                </div>



                {/* 4. Bottom View Button (Styled elegant View Details row) */}
                <div 
                  className="w-full flex justify-between items-center relative z-10 pt-2 select-none mt-2 shrink-0"
                  style={{ borderTop: active ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(0,0,0,0.06)' }}
                >
                  <div 
                    onClick={(e) => { e.stopPropagation(); onViewProject(card); }}
                    className={`view-btn inline-flex items-center justify-center gap-1 px-4.5 py-2 rounded-full text-[12px] font-medium transition-all duration-500 cursor-pointer ${
                      active 
                        ? 'bg-white/20 text-white border border-white/40 backdrop-blur-[5px] opacity-100' 
                        : 'bg-white text-neutral-700 border border-[#ddd] opacity-80 hover:bg-neutral-50 hover:opacity-100'
                    }`}
                  >
                    <span>{lang === 'en' ? 'View more' : 'View more →'}</span>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
