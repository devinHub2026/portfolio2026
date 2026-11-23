import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Target, Award, Plus, X, Globe, MessageSquare, ArrowRight, Upload, FileText, Trash2, Eye, Download, Search, Filter, Image as ImageIcon, ChevronLeft, ChevronRight, Play, Pause, Maximize2, AlertCircle } from 'lucide-react';
import { projects } from '../data';
import { projectsEN, uiTranslations } from '../translations';
import { Project } from '../types';

const subProjectsData: Record<string, {
  zh: { title: string; metric: string; badge: string; desc: string }[];
  en: { title: string; metric: string; badge: string; desc: string }[];
}> = {
  xiaomi: {
    zh: [
      {
        title: '小米智能门铃 4 Pro',
        metric: '500万像素双摄',
        badge: '超强守门',
        desc: '补白500万双摄门铃市场需求，打出品效合围组合拳。克服极紧预算及发售空盘前提下将上市一再提速，圆满交付纸箱印刷包材。'
      },
      {
        title: '小米室外摄像机BW500',
        metric: 'S级全球首发',
        badge: '全彩安防',
        desc: '室外安防顶配，攻坚多任务高并发、交付时间提拉1个月及原定供应商不合格红线危机。上报领导调配资源，更换顶级供应商破局，成功引爆上市。'
      },
      {
        title: '米家智能宠物饮水机 2',
        metric: '多端营销',
        badge: '低价高品标杆',
        desc: '精准卡位宠物千亿赛道，以极致高性价比击穿下沉市场。攻克跨组织维护前代老品服务难点，精算定价模型保护长效利润。'
      },
      {
        title: '米家智能宠物喂食器 2 可视版',
        metric: '智能可视',
        badge: 'ID美学长板',
        desc: '颠覆行业侧置镜头，将主摄移至食盆正上方扫除死角；3个月横跨春节地狱生命线卡位，并打包智能矩阵缩短购买决策链。'
      }
    ],
    en: [
      {
        title: 'Xiaomi Smart Doorbell 4 Pro',
        metric: '5MP Dual-Cam',
        badge: 'Gate Guard',
        desc: 'Pioneering dual-camera starlight coverage within compressed deadlines. Orchestrated synchronous domestic crowdfunding and packaging box optimizations safely.'
      },
      {
        title: 'Xiaomi Outdoor Camera BW500',
        metric: 'S-Class Global Debut',
        badge: 'Smart Security',
        desc: 'Starlight 5MP clarity under extreme multi-task workloads. Shifted schedule up 1 month, resolved supplier quality blocks by direct escalation and supplier migration.'
      },
      {
        title: 'Mijia Smart Pet Water Dispenser 2',
        metric: 'Multi-Terminal Marketing',
        badge: 'Mass Flagship Blockbuster',
        desc: 'Built on rigorous dimension costing models to secure pricing advantage in high-density pet markets, bypassing cross-company integration bottlenecks.'
      },
      {
        title: 'Mijia Smart Pet Feeder 2 Camera Edition',
        metric: 'Smart View Monitor',
        badge: 'Golden Camera Hook',
        desc: 'Overheads industry dead-zones by positioning the webcam right above pet food bowls; launched in 3 compressed winter months via a bundled pet eco-system package.'
      }
    ]
  },
  '70mai': {
    zh: [
      {
        title: '70迈智能记录仪 A810S',
        metric: '4K IMX678 旗舰',
        badge: '夜视怪兽',
        desc: '搭载星光级索尼图像芯片与自研算法，配合行车ADAS，树立车载4K超清行车安全巅峰标准。'
      },
      {
        title: '70迈智能记录仪 M800',
        metric: '行车大师核心',
        badge: '安全伴侣',
        desc: '高还原宽动态夜画质，在雷雨冰雪等复杂环境下，实现断电应急安全保存和超高速云端无线连接。'
      },
      {
        title: '70迈智能记录仪 Mini 2',
        metric: '隐藏轻巧设计',
        badge: '原车美学',
        desc: '极致小巧隐藏于后视镜后方，广角镜组全面抑制反光，为自驾出行保留最细腻的原轨景色纪录。'
      },
      {
        title: '后续智能新品栏位 4',
        metric: '待填写 / 规划中',
        badge: '新品预研',
        desc: '空位备用作后期 70mai 其他 S级智能新机全球营销企划、USP宣传与画质定位填充。'
      }
    ],
    en: [
      {
        title: '70mai Smart Dashcam A810S',
        metric: '4K Sony IMX678',
        badge: 'Night Emperor',
        desc: 'Flagship image processors with Sony Night Owl algorithms, delivering unmatched resolution for highway drives.'
      },
      {
        title: '70mai Smart Dashcam M800',
        metric: 'Dashmaster Core',
        badge: 'Trip Companion',
        desc: 'Captures full WDR clarity with sudden shock detection, ensuring auto-upload triggers under hard impacts.'
      },
      {
        title: '70mai Smart Dashcam Mini 2',
        metric: 'Ultra-Mini Shield',
        badge: 'Sleek Aesthetic',
        desc: 'Blends into the cockpit layout, using high-transparency glass to prevent reflections and capture expansive road logs.'
      },
      {
        title: 'Future Hardware Slot 4',
        metric: 'Ready for details',
        badge: 'Next Release',
        desc: 'Reserved for upcoming GTM launch briefs and core specifications.'
      }
    ]
  },
  ip: {
    zh: [
      {
        title: '70mai 国际版企业门户 3.0',
        metric: '4K 沉浸视效网',
        badge: '全球形象',
        desc: '全面重画品牌门户页面布局并突破网络加载屏障，让全球百万极客用户瞬间感知硬核光影细节。'
      },
      {
        title: 'MaiX 星际小熊潮流公仔',
        metric: '实体联名潮玩',
        badge: '情绪媒介',
        desc: '首创品牌 3D 太空熊形象IP周边衍生，推出高质感实体车载挂件及微信生态包，激活私域讨论热情。'
      },
      {
        title: 'VIP 专属车主极客俱乐部',
        metric: '超10万 车友互动',
        badge: '社群连缀',
        desc: '打造国际极客用户成就徽章体系与游记创作板，将冷冰冰的车载配件升格为记录车友自驾情愫的载体。'
      },
      {
        title: '后续IP企划栏位 4',
        metric: '待填写 / 规划中',
        badge: '跨界探索',
        desc: '留作后续 IP 周边文创规划、游戏联动原画、或者是线下高端极客圈社群活动内容填充。'
      }
    ],
    en: [
      {
        title: '70mai Global Portal 3.0',
        metric: 'Retina Media View',
        badge: 'Global Portal',
        desc: 'Re-invented the modern corporate interface and layout, enabling ultra-smooth responsive streaming of raw 4K videos.'
      },
      {
        title: 'MaiX Astro Bear Mascot',
        metric: '3D Community IP',
        badge: 'Brand Mascot',
        desc: 'Animate and mold the astro-bear brand mascot, fabricating active 3D emojis and physical collectors-edition action toys.'
      },
      {
        title: 'Elite Geek Club Hub',
        metric: '100K+ Road Warriors',
        badge: 'Private Domain',
        desc: 'Introduced customized travel boards and achievement badges, fostering deep global fellowship around the brand.'
      },
      {
        title: 'Future IP Project 4',
        metric: 'Ready for details',
        badge: 'IP Blueprint',
        desc: 'Reserved for next-generation peripheral merchandise, localized designs, and cross-over campaigns.'
      }
    ]
  },
  tvc: {
    zh: [
      {
        title: '德业新风系统央视广告 TVC',
        metric: 'CCTV-1 黄金时间',
        badge: '国字号名牌',
        desc: '主导全国级商业大片从美术剧本、灯光导演到分镜确认，全周期保障德业顶奢环保家居名片树立。'
      },
      {
        title: '力士 LUX 沐浴露抖音短片',
        metric: '3000万+ 曝光互动',
        badge: '快消文案',
        desc: '为4A创意主力撰写情感爆裂脚本，用快节奏视听语言和感官描述打动年轻美妆客群。'
      },
      {
        title: '奥妙 OMO 暖心微电影',
        metric: '金奖视效 执笔',
        badge: '合家感动',
        desc: '挖掘成长与陪伴的本真痛点，让普通洗衣物料流露极富生命力的温情故事，引发全社群泛泪热议。'
      },
      {
        title: '后续影视大片栏位 4',
        metric: '待填写 / 规划中',
        badge: '经典流盘',
        desc: '空位可做后续4A影视创意策划、知名导演组联合拍摄、或者是核心文案故事线资料填充。'
      }
    ],
    en: [
      {
        title: 'Deye Clean Air CCTV Commercial',
        metric: 'CCTV-1 prime screen',
        badge: 'National Spot',
        desc: 'Orchestrated cinematic art directions, filming storyboards and master revisions, raising Deye brand values.'
      },
      {
        title: 'LUX Viral Campaign Short Film',
        metric: '30M+ Social Views',
        badge: 'FMCG Copy',
        desc: 'Crafted dynamic scent-centered narrative and scripts for Unilever partners, securing major purchasing clicks on TikTok.'
      },
      {
        title: 'OMO Heartwarming Brand Reel',
        metric: 'Emotional Mastery',
        badge: 'Family bonds',
        desc: 'Translated everyday stain-removing chores into poetic chapters of children growing and enjoying nature freely.'
      },
      {
        title: 'Future Cinematic Film 4',
        metric: 'Ready for details',
        badge: 'Copywriting Ad',
        desc: 'Reserved for succeeding commercial director agreements, bidding pitches and viral camera angles.'
      }
    ]
  }
};

const categoryOverviewData: Record<string, {
  zh: {
    title: string;
    highlights: string[];
    role: string;
    responsibilities: string[];
    workflow: string[];
    metrics: string;
  };
  en: {
    title: string;
    highlights: string[];
    role: string;
    responsibilities: string[];
    workflow: string[];
    metrics: string;
  };
}> = {
  xiaomi: {
    zh: {
      title: '小米生态链智能产品宣发板块',
      highlights: ['上新了8+款爆款单品', '全网多渠道全球同步首发', '米家深度联动智能生态'],
      role: '市场对接负责人暨首发攻坚主管',
      responsibilities: ['小米智能安防/宠物两大产品线GTM市场策略与上市宣发筹备', '核心软硬件性能参数的产品场景化提炼与宣发核心USP卖点梳理', '跨部门协同小米、有品、米家等整合营销传播(IMC)战略与公关落地'],
      workflow: [
        '针对安防门铃、宠物饮水机/喂食器等重点新品，开展全方位的多维用户痛点挖掘，将冷冰冰的数字参数转化为温度、有灵性的场景叙事文案。',
        '统一国内及出海内容宣发与视觉，主抓官方新物料高标准产出，统揽电商详情页设计方案与交互视觉传达，彰显高端溢价。',
        '无缝打通内部产品经理与海外团队沟通，确保米家硬件多线新品上市走红。'
      ],
      metrics: '单品月销百万突破 / 新品GTM首发爆量率90%'
    },
    en: {
      title: 'Xiaomi Ecosystem Smart Launches',
      highlights: ['8+ Flagship devices released', 'Global multi-channel synchronized launches', 'Deeply integrated inside Mijia IoT'],
      role: 'GTM & Launch Supervisor',
      responsibilities: ['End-to-End GTM roadmap and launching strategies across major smart lines', 'Transforming hard-core specs into high-emotional benefit-driven USP copies', 'Aligning Mijia App, Xiaomi Home, and online stores for unified IMC drops'],
      workflow: [
        'Initiated exhaustive target user focus panels across smart security & pet spaces, tailoring tech parameters into engaging life narratives.',
        'Supervised strict creative asset generation, certifying a seamless product launch experience from web portals to physical stores.',
        'Formulated active reviewer seeding circles with tech experts, sustaining major pre-order traffic surges.'
      ],
      metrics: 'Over 90% product launch target reach / Millions of active connections'
    }
  },
  '70mai': {
    zh: {
      title: '70迈（70mai）全球化车载出海智能新品首发',
      highlights: ['4K星光夜视核心定义者', '全球行车电子品类领先地位', '顶奢旗舰IMX678全案操盘'],
      role: '出海智能硬件发售统领 / 策划主管',
      responsibilities: ['海外多语种、全触点品牌视觉战略、包装设计与独立站视觉体系审定', '核心影像科技性能指标（Sony Night Owl等）的大众化创意演绎', '国际极客达人、测评博主、科技媒体生态的多梯度立体化内容共创'],
      workflow: [
        '以索尼新一代传感器和独家画质算法为爆发力点，将A810S、M800等智能行车记录仪成功塑模为“星光级夜视界碑”，确立高端产品线统治权。',
        '联动国际车迷社群、汽车发烧友、户外出行KOL，深入雷雨、极寒、荒野等现实恶劣行车场景开展深度体验式测评流，树立信赖感。',
        '科学优化海外主流众筹平台、Amazon旗舰店及Shopify自营旗舰独立站的主力转化路径，持续修正各发售周期的核心营销话术词典。'
      ],
      metrics: '稳居车载电子出海全球品类榜首 / 出海溢价率与讨论热度领跑'
    },
    en: {
      title: '70mai Global Smart Vehicle Launches',
      highlights: ['4K Starvis Image Definers', 'Global automotive category leads', 'Sony IMX678 premium drops owner'],
      role: 'International Campaign Lead / Planning Supr.',
      responsibilities: ['Steering absolute visual compliance across global web interfaces and physical packaging', 'Translating complex proprietary image processing metrics into intuitive user benefits', 'Building multi-channel, localized influencer, tech, and enthusiast content seeding network'],
      workflow: [
        'Repositioned flagship recorders like A810S into "The Night Watch" beast devices, securing highest premium segment mindshare.',
        'Mobilized automotive user clusters globally to run off-road extreme climate testing, providing solid visual user testimonials.',
        'Redefined digital funnel steps on international e-com and Shopify nodes to boost checkout transition rates.'
      ],
      metrics: 'No.1 Dashcam category market share records in global markets'
    }
  },
  ip: {
    zh: {
      title: '数码跨界、企业全球门户转型与品牌IP文化资产孵化',
      highlights: ['企业旗舰交互式官网3.0重塑', 'MaiX星际潮流熊实体潮玩周边跨界', '十万级精英车友车生活社群运营'],
      role: '品牌体验设计师暨全领域文化IP主理人',
      responsibilities: ['全生命周期文化IP衍生周边实体设计监制与私域表情包产出', '为冷硬硬件植入“探索陪伴”情绪内涵，打通潮玩、自驾与智能车载场景跨界', '全面重新定义品牌新一代旗舰官网，极致融合光影体验与顺滑浏览阻尼'],
      workflow: [
        '主创和塑造了品牌MaiX太空熊文化，出品高精度实物金属挂件、软萌潮玩公仔和全套用户表情包，激发全球用户的晒图讨论欲。',
        '统筹设计全语种、全设备自适配的新一代数码旗舰级交互网站，通过极致顺畅的流体动画，将冰冷工业品渲染为艺术画幅。',
        '主导建立车友自驾俱乐部、里程成就体系和徽章积分商城，让车上单品转化为记录车主“仗剑走天涯”的情感行囊。'
      ],
      metrics: '首发公仔破百万社群裂变 / 用户官方直营复购行为大幅提升45%'
    },
    en: {
      title: 'Portal Redev, Digital Co-branding & Character IP Assets',
      highlights: ['Responsive web portal 3.0 revamp', 'MaiX Astro Bear physical toy collectible launches', '100K+ loyalty gaming reward tier creation'],
      role: 'Brand Experience Lead & Creator of Cultural IP',
      responsibilities: ['Conceiving complete concept identity, lore, physical modeling, and digital stickers collections', 'Bridging solid mechanics with human companionship vibes across pet-care, auto-driving, and workspace', 'Re-architecting main commercial portals around high-performance sensory motion design'],
      workflow: [
        'Forged and sculpted the "MaiX Astro Bear" mascot into highly tactile dashboard charms and desktop toys, igniting high-frequency viral peer reviews.',
        'Engineered responsive interactive systems for global brand assets, bringing complex premium glass and aluminum materials to life through smooth motion files.',
        'Integrated a highly participatory gamer loyalty community, turning safety gadgets into shared driving trip assets.'
      ],
      metrics: '+45% organic retention index improvements / High community interactions'
    }
  },
  tvc: {
    zh: {
      title: '德业央视黄金档大片暨一线大牌4A影视全生命周期统筹',
      highlights: ['CCTV-1国家名片级电视宣发投放', '力士/奥妙等快消巨头微电影爆量引流', '文学创意、分镜语言及商业痛点的交融手笔'],
      role: '资深视频创意总监 / 资深4A内容架构策略师',
      responsibilities: ['宏观文学案本及分镜脚本撰写统筹，整合知名导演、美术指导与灯光美术组顶配资源', '通过高级视听艺术升格传统低频刚需家用家电品牌调性，塑造无形的高附加值心智资产', '深挖日常成长、陪伴等社会级大众痛点共鸣，实现极佳的自传播长尾溢价效应'],
      workflow: [
        '为德业新风系统等高端重工业机组量身规划并全流程执拍“国之呼吸”大型央视金奖TVC商业片，于CCTV-1黄金档展播，树立大国工匠国货风范。',
        '为联合利华力士、欧莱雅等快消彩妆巨头撰写短快新潮的网路社交短视频系列，敏锐铺设关于气味、触感、心跳等极速感官带货爽点。',
        '执笔深情叙事的奥妙暖心微电影，通过“沾染泥巴才是勇敢”的生活细腻解构，成功将重污除垢包装成父母包容爱怜的养育故事，红遍全网。'
      ],
      metrics: '电视端连续黄金节点展播 / 网络全网裂变曝光超5000万'
    },
    en: {
      title: 'CCTV National Primetime Ad & Top-Tier 4A Video Copywriting',
      highlights: ['Premium slot television airing on CCTV-1', 'LUX & OMO heartwarming video production lead', 'Perfect blend of direct marketing and premium cinematic scripting'],
      role: 'Senior Copy Director / 4A Creative Producer',
      responsibilities: ['Writing literature drafts, detailed voiceover copy, and storyboard breakdowns', 'Collaborating with industry-leading commercial directors, production teams, and editors', 'Developing deep socio-emotional connection nodes to raise typical home appliances into premium segments'],
      workflow: [
        'Formulated and executed the prime TV commercial for Deye hardware systems shown on CCTV-1, crafting a glorious signature of air purity.',
        'Produced rapid-transit social video cuts for Lux cosmetic lines, converting abstract scents and foams into direct click-to-buy triggers.',
        'Penned award-winning warmth films for OMO, translating messy clothing stain worries into touching segments of children exploring the wild.'
      ],
      metrics: 'Prime CCTV-1 broadcast clearances / 50M+ accumulated video views'
    }
  },
  summary: {
    zh: {
      title: '全案整合市场策划、出海GTM攻坚与影视广告沉淀',
      highlights: ['横跨智能终端、车载数码、宠物硬件、大家电等硬核版块', '具备4A超级整合营销创意硬核内力 & 小米顶级生态链实盘落款履绩', '专注于以极具穿透力的人性化场景文案去为硬硬冷冷的科技成果赋能温度'],
      role: '资深整合策划主管 / 顶尖GTM发布推手',
      responsibilities: ['线上线下爆品全路径发售方案统筹', '全球多维营销策划案交付质量与全效指标负责', '从科技点情感化包装、USP深度提炼到TVC、跨界IP衍生的一链式完美落地'],
      workflow: [
        '深负八年坚实的智能数码、安防及宠物大家居宣发阵地成果，构建起一整套可任意复制的高频爆款硬件新品降维起盘发布白皮书。',
        '对内精准、无损地将冷血的底层工程研发指标，活化翻译成了消费者“极渴极需”的安全/健康/陪伴感叹，提纯底层购买力。',
        '坚守“万物互联，创意暖流”的创作初心，以最富质感的组织，横跨硬件参数翻译、全域出海推广和大众情愫剧本拍摄。'
      ],
      metrics: '8年操盘经验 / 4大支柱高频赛道大满贯领衔'
    },
    en: {
      title: 'Integrated Campaign Strategy & Global GTM Portfolio Summary',
      highlights: ['Covers Smart Tech, Dashcams, Pet Hardware, and CCTV Broadcasters', 'Combines 4A Copywriting accuracy with elite Xiaomi ecosystem commercializations', 'Specializes in transforming complex specs into accessible lifestyle hits'],
      role: 'Senior Marketing Planning Supervisor & GTM Director',
      responsibilities: ['Formulating omnichannel GTM release programs globally', 'Fostering cross-departmental development and marketing visual harmony', 'Leading absolute target delivery across massive budget TVCs, packaging, and mascot designs'],
      workflow: [
        'Maintained 8 years of persistent success index improvements across highly technical spaces, establishing robust launcher toolkits.',
        'Translated deep engineering achievements into reliable consumer security and emotional touchpoints.',
        'Unified cross-country creator squads spanning content developers, videographers, and UX visual coders.'
      ],
      metrics: '8-Year continuous flawless drops record / Multi-category market mastery'
    }
  }
};

const imageMetricsData: Record<string, {
  zh: { val1: string; label1: string; val2: string; label2: string };
  en: { val1: string; label1: string; val2: string; label2: string };
}> = {
  xiaomi: {
    zh: { val1: '8+', label1: '市场对接负责人', val2: '全球发售', label2: '宣发范围' },
    en: { val1: '8+', label1: 'Launch Lead', val2: 'Global Release', label2: 'Campaign Scope' }
  },
  '70mai': {
    zh: { val1: 'No.1', label1: '全球出海榜首', val2: '4K星光', label2: '核心影像技术' },
    en: { val1: 'No.1', label1: 'Global Top Seller', val2: '4K Starvis', label2: 'Core Imaging' }
  },
  ip: {
    zh: { val1: '百万级', label1: '太空熊周边触达', val2: '+45%', label2: '用户官方复购率' },
    en: { val1: '1M+', label1: 'Astro Bear Reach', val2: '+45%', label2: 'Official Retentions' }
  },
  tvc: {
    zh: { val1: 'CCTV-1', label1: '国家级首推平台', val2: '50M+', label2: '全网裂变曝光量' },
    en: { val1: 'CCTV-1', label1: 'Prime Slot Stage', val2: '50M+', label2: 'Campaign Impressions' }
  },
  summary: {
    zh: { val1: '8年', label1: '全渠道操盘经验', val2: '4大', label2: '支柱硬件核心赛道' },
    en: { val1: '8 Yrs', label1: 'GTM Dynamic Experience', val2: '4 Major', label2: 'Prime Tech Sectors' }
  }
};

const bentoMetricsData: Record<string, {
  zh: Array<{ val: string; label: string }>;
  en: Array<{ val: string; label: string }>;
}> = {
  xiaomi: {
    zh: [
      { val: '8款+', label: '上新爆款单品' },
      { val: '全球', label: '多渠道同步首发' },
      { val: '米家', label: '智能生态深联动' }
    ],
    en: [
      { val: '8+', label: 'Flagship Releases' },
      { val: 'Global', label: 'Synced Channels' },
      { val: 'Mijia', label: 'Deep Integration' }
    ]
  },
  '70mai': {
    zh: [
      { val: '4K星光', label: '定义核心影像' },
      { val: 'No.1', label: '行车电子品类' },
      { val: 'IMX678', label: '旗舰全案操盘' }
    ],
    en: [
      { val: '4K Night', label: 'Core Starvis definition' },
      { val: 'No.1', label: 'Dashcam Segment' },
      { val: 'IMX678', label: 'Flagship GTM' }
    ]
  },
  ip: {
    zh: [
      { val: '3.0官网', label: '全设备重塑自适配' },
      { val: '太空熊', label: 'MaiX潮流周边实体' },
      { val: '十万级', label: '私域车友社群运营' }
    ],
    en: [
      { val: '3.0 Web', label: 'Portal Overhaul' },
      { val: 'MaiX', label: 'Astro Bear Mascot' },
      { val: '100K+', label: 'Loyalty Driver Circle' }
    ]
  },
  tvc: {
    zh: [
      { val: 'CCTV-1', label: '国家名片央视黄金' },
      { val: '五千万+', label: '社交微电影曝光' },
      { val: '文学/视听', label: '商业痛点完美交融' }
    ],
    en: [
      { val: 'CCTV-1', label: 'National Broadcast' },
      { val: '50M+', label: 'Social Video Views' },
      { val: 'Top 4A', label: 'Cinematic Strategy' }
    ]
  },
  summary: {
    zh: [
      { val: '全赛道', label: '终端车载宠物家电' },
      { val: '小米生态', label: '整合营销实意落地' },
      { val: '场景USP', label: '赋予冰冷设备温度' }
    ],
    en: [
      { val: 'Multi-Cat', label: 'Smart Tech Coverage' },
      { val: 'Mijia GTM', label: 'Campaign Pedigree' },
      { val: 'Warm USP', label: 'Empathetic Copywriting' }
    ]
  }
};

const workflowStepTitles: Record<string, string[]> = {
  zh: [
    '产品策划与卖点解析',
    '宣发内容输出',
    '精细化跨团队交付'
  ],
  en: [
    'Product Strategy & USP Setup',
    'Campaign Content & Creative Output',
    'Precision Cross-Team Execution'
  ]
};

const doorbellTableData: Record<string, Array<{
  feature: string;
  m4: string;
  m4p: string;
  advantage: string;
}>> = {
  zh: [
    {
      feature: 'slogan',
      m4: '高清双摄，日夜护家',
      m4p: '超清双摄，全天候安防',
      advantage: '影像Pro，智能Pro'
    },
    {
      feature: '高清双摄\n安全看护',
      m4: '1、300万像素 + 100万像素双摄大视野；\n2、红外夜视，夜晚清晰。',
      m4p: '1、500万像素 + 200万像素超清双摄；\n2、红外夜视，夜晚清晰。',
      advantage: '影像超清，行业双摄TOP级'
    },
    {
      feature: '大电池长续航\n录制持久',
      m4: '5100mAh，120天长续航',
      m4p: '9800mAh，一整年最多充两次 (一充管半年以上)',
      advantage: '超长周期续航，一年只需充两次电'
    },
    {
      feature: '智能侦测',
      m4: '红外传感；人形侦测',
      m4p: '1、多种智能AI算法，多维度守护家门安全——人脸、快递/外卖员、包裹、宠物识别；\n2、双域180°红外警戒。',
      advantage: '创新算法：特定快递、配送员精准定位识别'
    },
    {
      feature: '智能体验',
      m4: '1、多场景通话，独居友好；\n2、米家智联。',
      m4p: '1、多场景通话，独居友好；\n2、米家智联；\n3、柔光氛围灯。',
      advantage: '米家全生态交互，多设备可视连通'
    },
    {
      feature: '存储省心',
      m4: '72小时免费云存',
      m4p: '32GB内置存储 + 72小时免费云存',
      advantage: '32GB内置高防固态，离线录制安全稳定'
    },
    {
      feature: '安全易用',
      m4: '1、米家芯片守护数据安全；\n2、多重防丢；\n3、绑定配网与安装。',
      m4p: '1、米家芯片守护数据安全；\n2、多重防丢；\n3、绑定配网与安装。',
      advantage: '一键配对，软硬一体防丢防剪安全保障'
    }
  ],
  en: [
    {
      feature: 'Slogan',
      m4: 'HD Dual Cam, Day/Night Safeguard',
      m4p: 'Ultra-HD Dual Cam, All-Weather Security',
      advantage: 'Imaging Pro, Intelligence Pro'
    },
    {
      feature: 'HD Dual Cam\nSecurity Guard',
      m4: '1. 3MP + 1MP Dual Cam with grand vision.\n2. Clear infrared night-vision details for hallways.',
      m4p: '1. 5MP + 2MP ultra-crisp dual-lens output.\n2. Premium infrared security night vision.',
      advantage: 'Top-tier dual-camera output globally'
    },
    {
      feature: 'Battery &\nLongevity',
      m4: '5100mAh, up to 120-day high longevity.',
      m4p: '9800mAh, charging twice a year max (ultra-endurance).',
      advantage: 'Spectacular battery capacity, ultra-long cycle'
    },
    {
      feature: 'Smart AI\nDetection',
      m4: 'Infrared sensor; standard humanoid detection alerts.',
      m4p: '1. Advanced AI algorithms: face / courier / parcel / pet detection.\n2. Dual-zone 180° active radar sweep.',
      advantage: 'Breakthrough algorithm: Custom courier detection'
    },
    {
      feature: 'Smart Ecosystem\nExperience',
      m4: '1. Multi-scenario calling, single living friendly.\n2. Standard Mijia linkage.',
      m4p: '1. Warm interaction settings.\n2. Mijia intelligent ecosystem integration.\n3. Soft ambient guide locator light.',
      advantage: 'Deepest Mijia link, intelligent home hub'
    },
    {
      feature: 'Ecosystem\nStorage',
      m4: '72h rolling free cyclical cloud storage.',
      m4p: '32GB local secure flash memory + 72h cloud storage.',
      advantage: '32GB flash storage, ironclad data safety'
    },
    {
      feature: 'Painless Guard\n& Mounting',
      m4: '1. Mijia security chip protection.\n2. Standard anti-theft sensors.\n3. Seamless pairing.',
      m4p: '1. Advanced Mijia cryptographic chip.\n2. Deluxe triple anti-theft physical lock.\n3. Secure installation.',
      advantage: 'Absolute hardware anti-theft protections'
    }
  ]
};

const DOORBELL_4_PRO_SLICES = [
  'https://i.postimg.cc/2ypHrTJ1/jing-dong750-01.jpg',
  'https://i.postimg.cc/Znkf4jgd/jing-dong750-02.jpg',
  'https://i.postimg.cc/2ypHrTJq/jing-dong750-03.jpg',
  'https://i.postimg.cc/3NMLY96D/jing-dong750-04.jpg',
  'https://i.postimg.cc/rs6hMgbC/jing-dong750-05.jpg',
  'https://i.postimg.cc/Znkf4jg6/jing-dong750-06.jpg',
  'https://i.postimg.cc/QCL6hSPJ/jing-dong750-07.jpg',
  'https://i.postimg.cc/5ycPbpG3/jing-dong750-08.jpg',
  'https://i.postimg.cc/XqwsJdSC/jing-dong750-09.jpg',
  'https://i.postimg.cc/QCpft1G7/jing-dong750-10.jpg',
  'https://i.postimg.cc/d3851rPd/jing-dong750-11.jpg',
  'https://i.postimg.cc/tJhBTWQF/jing-dong750-12.jpg',
  'https://i.postimg.cc/WzM53gL6/jing-dong750-13.jpg',
  'https://i.postimg.cc/SRWgsCFf/jing-dong750-14.jpg',
  'https://i.postimg.cc/5yws0Ldm/jing-dong750-15.jpg',
  'https://i.postimg.cc/hv92jTWs/jing-dong750-16.jpg',
  'https://i.postimg.cc/fyx8LmnB/jing-dong750-17.jpg',
  'https://i.postimg.cc/kGxT4K3T/jing-dong750-18.jpg',
  'https://i.postimg.cc/wMhwvL8W/jing-dong750-19.jpg',
  'https://i.postimg.cc/SRWgsCF1/jing-dong750-20.jpg',
  'https://i.postimg.cc/QCpft1Gn/jing-dong750-21.jpg',
  'https://i.postimg.cc/ZnrwRpt1/jing-dong750-22.jpg',
  'https://i.postimg.cc/cCQFHwyz/jing-dong750-23.jpg',
  'https://i.postimg.cc/cCQFHwGq/jing-dong750-24.jpg',
  'https://i.postimg.cc/wMhwvLY8/jing-dong750-25.jpg',
  'https://i.postimg.cc/tJhBTWGb/jing-dong750-26.jpg',
  'https://i.postimg.cc/DfsjBkJz/jing-dong750-27.jpg',
  'https://i.postimg.cc/MZRPd2Mn/jing-dong750-28.jpg',
  'https://i.postimg.cc/gcRSNFXn/jing-dong750-29.jpg',
  'https://i.postimg.cc/L4fCNKYf/jing-dong750-30.jpg',
  'https://i.postimg.cc/dQdH4Pkr/jing-dong750-31.jpg',
  'https://i.postimg.cc/RCfsX56T/jing-dong750-32.jpg',
  'https://i.postimg.cc/9XT8J5RP/jing-dong750-33.jpg',
  'https://i.postimg.cc/jqNgZ0wZ/jing-dong750-34.jpg',
  'https://i.postimg.cc/qBnbjVhL/jing-dong750-35.jpg',
  'https://i.postimg.cc/1R6CJhnB/jing-dong750-36.jpg',
  'https://i.postimg.cc/RCfsX56g/jing-dong750-37.jpg',
  'https://i.postimg.cc/SQ8TDF2t/jing-dong750-38.jpg',
  'https://i.postimg.cc/zDWt0Zbd/jing-dong750-39.jpg',
  'https://i.postimg.cc/15QWdCwr/jing-dong750-40.jpg',
  'https://i.postimg.cc/jdb81gPM/jing-dong750-41.jpg',
  'https://i.postimg.cc/GhCMf7Gg/jing-dong750-42.jpg',
  'https://i.postimg.cc/sDrnL670/jing-dong750-43.jpg',
  'https://i.postimg.cc/5NVPr7Lr/jing-dong750-44.jpg',
  'https://i.postimg.cc/fTNHP2Yn/jing-dong750-45.jpg',
  'https://i.postimg.cc/NfcNnJRQ/jing-dong750-46.jpg',
  'https://i.postimg.cc/VL87hGX1/jing-dong750-47.jpg',
  'https://i.postimg.cc/Prj6731H/jing-dong750-48.jpg'
];

const DOORBELL_4_SLICES = [
  'https://i.postimg.cc/SR6phngw/jing-dong750-01.jpg',
  'https://i.postimg.cc/7h3yk5B8/jing-dong750-02.jpg',
  'https://i.postimg.cc/prftHmsw/jing-dong750-03.jpg',
  'https://i.postimg.cc/d32KYhWM/jing-dong750-04.jpg',
  'https://i.postimg.cc/WzGPvd9T/jing-dong750-05.jpg',
  'https://i.postimg.cc/Rh7zBWP9/jing-dong750-06.jpg',
  'https://i.postimg.cc/Xqf0br2n/jing-dong750-07.jpg',
  'https://i.postimg.cc/4y6TgY8J/jing-dong750-08.jpg',
  'https://i.postimg.cc/GtF1C4M3/jing-dong750-09.jpg',
  'https://i.postimg.cc/4y6TgY8n/jing-dong750-10.jpg',
  'https://i.postimg.cc/Y06wHvXS/jing-dong750-11.jpg',
  'https://i.postimg.cc/WzGPvd9b/jing-dong750-12.jpg',
  'https://i.postimg.cc/T1VX6Kkw/jing-dong750-13.jpg',
  'https://i.postimg.cc/PfYHZ7db/jing-dong750-14.jpg',
  'https://i.postimg.cc/PfYHZ7dQ/jing-dong750-15.jpg',
  'https://i.postimg.cc/y6cK9G7F/jing-dong750-16.jpg',
  'https://i.postimg.cc/DfLhsN7d/jing-dong750-17.jpg',
  'https://i.postimg.cc/59LJvrfp/jing-dong750-18.jpg',
  'https://i.postimg.cc/G3GRYfbQ/jing-dong750-19.jpg',
  'https://i.postimg.cc/BZH3DzJM/jing-dong750-20.jpg',
  'https://i.postimg.cc/nVBx7WnR/jing-dong750-21.jpg',
  'https://i.postimg.cc/CMk0D2wr/jing-dong750-22.jpg',
  'https://i.postimg.cc/RCKmfYvk/jing-dong750-23.jpg',
  'https://i.postimg.cc/KcBbLWmV/jing-dong750-24.jpg',
  'https://i.postimg.cc/44VGt0Xj/jing-dong750-25.jpg',
  'https://i.postimg.cc/kMKC8H7k/jing-dong750-26.jpg',
  'https://i.postimg.cc/2jhYvtzp/jing-dong750-27.jpg',
  'https://i.postimg.cc/PfYHZ7tn/jing-dong750-28.jpg',
  'https://i.postimg.cc/xjMQHZ0S/jing-dong750-29.jpg',
  'https://i.postimg.cc/MZVwRLWw/jing-dong750-30.jpg',
  'https://i.postimg.cc/ZYpm3QTJ/jing-dong750-31.jpg',
  'https://i.postimg.cc/pVzv8S2H/jing-dong750-32.jpg',
  'https://i.postimg.cc/DfLhsN2v/jing-dong750-33.jpg',
  'https://i.postimg.cc/sDzrJJ2k/jing-dong750-34.jpg',
  'https://i.postimg.cc/qMrTGGRV/jing-dong750-35.jpg',
  'https://i.postimg.cc/ncxJ11zJ/jing-dong750-36.jpg',
  'https://i.postimg.cc/ncxJ11zZ/jing-dong750-37.jpg',
  'https://i.postimg.cc/tCbjzzT9/jing-dong750-38.jpg'
];

const BW500_SLICES = [
  "https://i.postimg.cc/26yG4gpT/xiao-mi-shi-wai-she-xiang-tou-BW500-790-01.jpg",
  "https://i.postimg.cc/HxnzQFGz/xiao-mi-shi-wai-she-xiang-tou-BW500-790-02.jpg",
  "https://i.postimg.cc/W3z8MxRX/xiao-mi-shi-wai-she-xiang-tou-BW500-790-03.jpg",
  "https://i.postimg.cc/C157j9yN/xiao-mi-shi-wai-she-xiang-tou-BW500-790-04.jpg",
  "https://i.postimg.cc/NMn4bbYT/xiao-mi-shi-wai-she-xiang-tou-BW500-790-05.jpg",
  "https://i.postimg.cc/fLPK55Zm/xiao-mi-shi-wai-she-xiang-tou-BW500-790-06.jpg",
  "https://i.postimg.cc/85YHwwDR/xiao-mi-shi-wai-she-xiang-tou-BW500-790-07.jpg",
  "https://i.postimg.cc/rmHJggcC/xiao-mi-shi-wai-she-xiang-tou-BW500-790-08.jpg",
  "https://i.postimg.cc/qRFLQQ0Q/xiao-mi-shi-wai-she-xiang-tou-BW500-790-09.jpg",
  "https://i.postimg.cc/qRFLQQ0w/xiao-mi-shi-wai-she-xiang-tou-BW500-790-10.jpg",
  "https://i.postimg.cc/j51XvvKM/xiao-mi-shi-wai-she-xiang-tou-BW500-790-11.jpg",
  "https://i.postimg.cc/bJ5TLL8F/xiao-mi-shi-wai-she-xiang-tou-BW500-790-12.jpg",
  "https://i.postimg.cc/LXWTvvRC/xiao-mi-shi-wai-she-xiang-tou-BW500-790-13.jpg",
  "https://i.postimg.cc/MTLDttxL/xiao-mi-shi-wai-she-xiang-tou-BW500-790-14.jpg",
  "https://i.postimg.cc/G2fQzzr6/xiao-mi-shi-wai-she-xiang-tou-BW500-790-15.jpg",
  "https://i.postimg.cc/ZRQcjjZ2/xiao-mi-shi-wai-she-xiang-tou-BW500-790-16.jpg",
  "https://i.postimg.cc/hjYrMMcF/xiao-mi-shi-wai-she-xiang-tou-BW500-790-17.jpg",
  "https://i.postimg.cc/1tdHMMsS/xiao-mi-shi-wai-she-xiang-tou-BW500-790-18.jpg",
  "https://i.postimg.cc/xCZRggn2/xiao-mi-shi-wai-she-xiang-tou-BW500-790-19.jpg",
  "https://i.postimg.cc/hjYrMMcR/xiao-mi-shi-wai-she-xiang-tou-BW500-790-20.jpg",
  "https://i.postimg.cc/RhnTYfVY/xiao-mi-shi-wai-she-xiang-tou-BW500-790-21.jpg",
  "https://i.postimg.cc/90qBkTFs/xiao-mi-shi-wai-she-xiang-tou-BW500-790-22.jpg",
  "https://i.postimg.cc/6qGhPRpX/xiao-mi-shi-wai-she-xiang-tou-BW500-790-23.jpg",
  "https://i.postimg.cc/J0BQFJzC/xiao-mi-shi-wai-she-xiang-tou-BW500-790-24.jpg",
  "https://i.postimg.cc/XqygPFY7/xiao-mi-shi-wai-she-xiang-tou-BW500-790-25.jpg",
  "https://i.postimg.cc/8crbYWzC/xiao-mi-shi-wai-she-xiang-tou-BW500-790-26.jpg",
  "https://i.postimg.cc/D0bcNsw0/xiao-mi-shi-wai-she-xiang-tou-BW500-790-27.jpg",
  "https://i.postimg.cc/7hTNR7ZG/xiao-mi-shi-wai-she-xiang-tou-BW500-790-28.jpg",
  "https://i.postimg.cc/J0BQFJzH/xiao-mi-shi-wai-she-xiang-tou-BW500-790-29.jpg"
];

const PET_DISPENSER_2_SLICES = [
  'https://i.postimg.cc/xCqxtvPn/jing-dong750-01.jpg',
  'https://i.postimg.cc/j5989DM9/jing-dong750-02.jpg',
  'https://i.postimg.cc/Twh7CVcT/jing-dong750-03.jpg',
  'https://i.postimg.cc/9MSxSDLK/jing-dong750-04.jpg',
  'https://i.postimg.cc/rmbhbDhX/jing-dong750-05.jpg',
  'https://i.postimg.cc/0Q3t3zVT/jing-dong750-06.jpg',
  'https://i.postimg.cc/rmbhbDhk/jing-dong750-07.jpg',
  'https://i.postimg.cc/vBjPj4Pw/jing-dong750-08.jpg',
  'https://i.postimg.cc/26JHJ1HC/jing-dong750-09.jpg',
  'https://i.postimg.cc/LX7y7Jy9/jing-dong750-10.jpg',
  'https://i.postimg.cc/76cBc5BZ/jing-dong750-11.jpg',
  'https://i.postimg.cc/rmbhbDhm/jing-dong750-12.jpg',
  'https://i.postimg.cc/cHjDjvDr/jing-dong750-13.jpg',
  'https://i.postimg.cc/W3K9Kd9D/jing-dong750-14.jpg',
  'https://i.postimg.cc/hjwCwXC7/jing-dong750-15.jpg',
  'https://i.postimg.cc/bJM6MZ6t/jing-dong750-16.jpg',
  'https://i.postimg.cc/sxhnR382/jing-dong750-17.jpg'
];

const PET_FILTER_KIT_SLICES = [
  'https://i.postimg.cc/J7kK046y/xiao-mi-zhi-neng-chong-wu-yin-shui-ji2-lu-xin-tao-zhuang-1080-01.jpg',
  'https://i.postimg.cc/66vzq5j2/xiao-mi-zhi-neng-chong-wu-yin-shui-ji2-lu-xin-tao-zhuang-1080-02.jpg',
  'https://i.postimg.cc/05wZj2WK/xiao-mi-zhi-neng-chong-wu-yin-shui-ji2-lu-xin-tao-zhuang-1080-03.jpg',
  'https://i.postimg.cc/Y2W80qng/xiao-mi-zhi-neng-chong-wu-yin-shui-ji2-lu-xin-tao-zhuang-1080-04.jpg',
  'https://i.postimg.cc/WpkSzbWM/xiao-mi-zhi-neng-chong-wu-yin-shui-ji2-lu-xin-tao-zhuang-1080-05.jpg',
  'https://i.postimg.cc/v8VXTHq7/xiao-mi-zhi-neng-chong-wu-yin-shui-ji2-lu-xin-tao-zhuang-1080-06.jpg',
  'https://i.postimg.cc/FFLGzsWV/xiao-mi-zhi-neng-chong-wu-yin-shui-ji2-lu-xin-tao-zhuang-1080-07.jpg',
  'https://i.postimg.cc/Y2W80qn8/xiao-mi-zhi-neng-chong-wu-yin-shui-ji2-lu-xin-tao-zhuang-1080-08.jpg',
  'https://i.postimg.cc/MZQtHKPs/xiao-mi-zhi-neng-chong-wu-yin-shui-ji2-lu-xin-tao-zhuang-can-shu-01.jpg',
  'https://i.postimg.cc/dQyn3tHN/xiao-mi-zhi-neng-chong-wu-yin-shui-ji2-lu-xin-tao-zhuang-can-shu-02.jpg'
];

const PET_FEEDER_2_SLICES = [
  'https://i.postimg.cc/q7D5WZFx/jing-dong750xiang-qing-01.jpg',
  'https://i.postimg.cc/wB4Gnbrk/jing-dong750xiang-qing-02.jpg',
  'https://i.postimg.cc/1z7jbYdH/jing-dong750xiang-qing-03.jpg',
  'https://i.postimg.cc/tgvM8mcD/jing-dong750xiang-qing-04.jpg',
  'https://i.postimg.cc/d0NxgSfN/jing-dong750xiang-qing-05.jpg',
  'https://i.postimg.cc/8CX0xnYn/jing-dong750xiang-qing-06.jpg',
  'https://i.postimg.cc/9fgnsNkn/jing-dong750xiang-qing-07.jpg',
  'https://i.postimg.cc/0NXBhH44/jing-dong750xiang-qing-08.jpg',
  'https://i.postimg.cc/Xv1ztDPm/jing-dong750xiang-qing-09.jpg',
  'https://i.postimg.cc/C1ZQ0sy7/jing-dong750xiang-qing-10.jpg',
  'https://i.postimg.cc/hjJ5n1FM/jing-dong750xiang-qing-11.jpg',
  'https://i.postimg.cc/FRfBvVtZ/jing-dong750xiang-qing-12.jpg',
  'https://i.postimg.cc/0Q6Bv0gX/jing-dong750xiang-qing-13.jpg',
  'https://i.postimg.cc/RF3DmLry/jing-dong750xiang-qing-14.jpg',
  'https://i.postimg.cc/k4VpCvrp/jing-dong750xiang-qing-15.jpg',
  'https://i.postimg.cc/gJwTpH95/jing-dong750xiang-qing-16.jpg',
  'https://i.postimg.cc/XJZzWkSS/jing-dong750xiang-qing-17.jpg',
  'https://i.postimg.cc/637mKfJB/jing-dong750xiang-qing-18.jpg',
  'https://i.postimg.cc/76CW4n8w/jing-dong750xiang-qing-19.jpg',
  'https://i.postimg.cc/Y94s7zKp/jing-dong750xiang-qing-20.jpg',
  'https://i.postimg.cc/tT1MbNQT/jing-dong750xiang-qing-21.jpg',
  'https://i.postimg.cc/sXt0gGsV/jing-dong750xiang-qing-22.jpg',
  'https://i.postimg.cc/PxBF5vTh/jing-dong750xiang-qing-23.jpg',
  'https://i.postimg.cc/W3Qf1qTs/jing-dong750xiang-qing-24.jpg',
  'https://i.postimg.cc/9MvNQwCF/jing-dong750xiang-qing-25.jpg',
  'https://i.postimg.cc/MThrpfqG/jing-dong750xiang-qing-26.jpg',
  'https://i.postimg.cc/9MvNQwCM/jing-dong750xiang-qing-27.jpg'
];

interface PortfolioProps {
  onPreFillChat: (prompt: string) => void;
  lang: 'zh' | 'en';
  activeProject: Project | null;
  setActiveProject: (project: Project | null) => void;
}

export default function Portfolio({ onPreFillChat, lang, activeProject, setActiveProject }: PortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(lang === 'en' ? 'Case Summary' : '案例汇总');
  const [activeSubProjectDetail, setActiveSubProjectDetail] = useState<string | null>(null);
  const [doorbellTab, setDoorbellTab] = useState<number>(0);
  const [doorbellDetailSource, setDoorbellDetailSource] = useState<'pro' | 'standard' | 'upload' | 'bw500'>('pro');
  const [subProjectImages, setSubProjectImages] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('subProjectImages');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.detailPage === 'https://i.postimg.cc/YSWFFLWm/chan-pin-ming-cheng03.png' || parsed.detailPage === 'https://i.postimg.cc/Dz6TBBLs/jie-ping2026-06-14-22-56-06.png') {
          parsed.detailPage = 'https://i.postimg.cc/5yjhgLVF/jie-ping2026-06-21-15-05-35.png';
        }
        if (parsed.socialMedia === 'https://i.postimg.cc/Nf6P6LRP/chan-pin-ming-cheng-800-04.png') {
          parsed.socialMedia = 'https://i.postimg.cc/xdwsttTG/mai-dian-ji-he.jpg';
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to load subProjectImages from localStorage', e);
    }
    return {
      mindmap: 'https://i.postimg.cc/HLyzcX4H/2817bd71b1042416303f4f743d05836.png',
      script: 'https://i.postimg.cc/nLD2jBYJ/79137ceb467a122d4d603f8f89d5c11.png',
      detailPage: 'https://i.postimg.cc/5yjhgLVF/jie-ping2026-06-21-15-05-35.png',
      socialMedia: 'https://i.postimg.cc/xdwsttTG/mai-dian-ji-he.jpg',
      timeline: ''
    };
  });
  const [scriptPdf, setScriptPdf] = useState<{ name: string; url: string; size: string } | null>(null);
  const [gtmFilterTab, setGtmFilterTab] = useState<string>('all');

  // Water Dispenser Dynamic Simulator States
  const [dispenserBom, setDispenserBom] = useState<number>(65);
  const [dispenserRetail, setDispenserRetail] = useState<number>(129);
  const [dispenserXiaomiCut, setDispenserXiaomiCut] = useState<number>(20);

  // Xiaomi Outdoor Camera BW500 Dynamic Simulator States
  const [bw500ConcurrentLoad, setBw500ConcurrentLoad] = useState<number>(4);
  const [bw500VendorEfficiency, setBw500VendorEfficiency] = useState<number>(60);
  const [bw500Manpower, setBw500Manpower] = useState<number>(1);

  // Xiaomi Outdoor Camera BW500 materials showcase states
  const [bw500WhiteIndex, setBw500WhiteIndex] = useState<number>(0);
  const [bw500ScenarioIndex, setBw500ScenarioIndex] = useState<number>(0);
  const [bw500NewMediaIndex, setBw500NewMediaIndex] = useState<number>(0);
  const [activeBw500Tab, setActiveBw500Tab] = useState<string>('white-bg');

  // Water Dispenser 4-Module materials showcase states
  const [dispenserWhiteIndex, setDispenserWhiteIndex] = useState<number>(0);
  const [dispenserScenarioIndex, setDispenserScenarioIndex] = useState<number>(0);
  const [activeDispenserTab, setActiveDispenserTab] = useState<string>('video');
  const [dispenserVideoError, setDispenserVideoError] = useState<boolean>(false);

  // Pet Feeder 2 可视版 3-Module materials showcase states
  const [feederWhiteIndex, setFeederWhiteIndex] = useState<number>(0);
  const [feederScenarioIndex, setFeederScenarioIndex] = useState<number>(0);
  const [activeFeederTab, setActiveFeederTab] = useState<string>('white-bg');

  // Pet Feeder Bundle Builder States
  const [feederBundleFeeder, setFeederBundleFeeder] = useState<boolean>(true);
  const [feederBundleWater, setFeederBundleWater] = useState<boolean>(true);
  const [feederBundleCamera, setFeederBundleCamera] = useState<boolean>(false);

  const [moreMaterials, setMoreMaterials] = useState(() => {
    const defaultMaterials = [
      {
        id: 'mat-1',
        title: '小米智能门铃 4 Pro正视图',
        description: '高保真3D概念光影展现，精细还原 4 Pro 机型标志性的纯黑奢雅与精致工艺质感。',
        category: 'hd-visuals',
        image: 'https://i.postimg.cc/Nf6P6LRP/chan-pin-ming-cheng-800-04.png',
        specs: '1080 x 1440 · PNG',
        channel: '3D渲染正视图 / 官方宣发高奢图素'
      },
      {
        id: 'mat-scene-1',
        title: '产品功能展现 - AI双向变声实时对讲',
        description: '小米智能门铃核心功能，支持大叔音、小丑音等多种趣味/防护变声，让独居生活多一份安心。',
        category: 'scenes',
        image: 'https://i.postimg.cc/t4HvJVv3/1.jpg',
        specs: '1080 x 1440 · JPG',
        channel: '自媒体图文宣传 / 抖音种草视频背景'
      },
      {
        id: 'mat-scene-2',
        title: '产品功能展现 - 500W超清极清镜头表现',
        description: '多重镜头模组结构透视，支持极致分辨率画质，楼道路况一目了然。',
        category: 'scenes',
        image: 'https://i.postimg.cc/cCnT4sQR/11.jpg',
        specs: '1080 x 1440 · JPG',
        channel: '电商详情页 / 官方产品功用画册'
      },
      {
        id: 'mat-scene-3',
        title: '产品功能展现 - 深夜楼道微光全彩监控',
        description: '高感光传感器与微光夜视技术集成，在暗光下仍能呈现噪点极低、色彩细腻的门前监控画面。',
        category: 'scenes',
        image: 'https://i.postimg.cc/3JGb3Z1w/2.jpg',
        specs: '1080 x 1440 · JPG',
        channel: '微信官方公众号首图 / 科技博主深度测评'
      },
      {
        id: 'mat-scene-4',
        title: '产品功能展现 - 门前包裹防丢与区域红外侦测',
        description: '支持精确划定看护区域，当重物或快递包裹被放下或拿起时，自动发出智能声光警告并推送手机。',
        category: 'scenes',
        image: 'https://i.postimg.cc/K8ypjgp3/3.jpg',
        specs: '1080 x 1440 · JPG',
        channel: '知乎硬核科普配图 / 线上客服常见应答示范图'
      },
      {
        id: 'mat-scene-5',
        title: '产品功能展现 - 低功耗智能电源管理与长效续航',
        description: '配备大容量锂电池与定制高能效芯片，实现全天候监控的同时，提供行业领先 of 超长续航表现。',
        category: 'scenes',
        image: 'https://i.postimg.cc/ry3P6HSv/4.jpg',
        specs: '1080 x 1440 · JPG',
        channel: '米家App智能联动指引 / 社群裂变活动视觉'
      },
      {
        id: 'mat-scene-6',
        title: '产品功能展现 - 全场景联动与多端智能提醒',
        description: '当有访客来电时，支持触发全屋小爱音箱进行语音播报，同时小米电视自动弹出浮窗展示门外实时画面。',
        category: 'scenes',
        image: 'https://i.postimg.cc/yNLLLp1v/8.jpg',
        specs: '1080 x 1440 · JPG',
        channel: '新媒体平台多图文测评 / 用户体验设计规范'
      },
      {
        id: 'mat-scene-7',
        title: '产品功能展现 - 户外耐候与高级防暴贴心看护',
        description: '整机支持IP65级防尘防水与强力防拆警报，即使在恶劣天气或遭遇蓄意破坏下亦可发挥完全作用。',
        category: 'scenes',
        image: 'https://i.postimg.cc/853tSFrz/9.jpg',
        specs: '1080 x 1440 · JPG',
        channel: '全渠道宣发海报物料 / 微博话题转发配图'
      },
      {
        id: 'mat-scene-8',
        title: '产品功能展现 - 终身免费云端循环录像',
        description: '赠送终身免费的大容量云存储。门外发生异常会自动录像并无缝保存至云端，确保关键证据安全不外泄。',
        category: 'scenes',
        image: 'https://i.postimg.cc/kgF1bXkd/6.jpg',
        specs: '1080 x 1440 · JPG',
        channel: '小红书种草短图文 / 官方宣传主页功能板块'
      },
      {
        id: 'mat-4',
        title: '小米智能门铃 4 正视图',
        description: '高精细节光影原画，完美表现门铃 4 亲民版外观之简约硬核与极简几何美。',
        category: 'hd-visuals',
        image: 'https://i.postimg.cc/YSWFFLWm/chan-pin-ming-cheng03.png',
        specs: '1080 x 1440 · PNG',
        channel: '3D渲染正视图 / 官方首发布置特供'
      },
      {
        id: 'mat-detail-pro',
        title: '小米智能门铃 4 Pro 商品详情页',
        description: '小米智能门铃 4 Pro 官方上市爆款详情网页，呈现全能型配置、500W超清表现与主动防护机制。',
        category: 'campaign',
        image: 'https://i.postimg.cc/ZKFK9n3J/xiao-mi-zhi-neng-men-ling-4-Pro-1080.jpg',
        slices: DOORBELL_4_PRO_SLICES,
        specs: '1080 x 4480 · JPG',
        channel: '小米商城 / 京东首屏 / 天猫核心商详'
      },
      {
        id: 'mat-detail-4',
        title: '小米智能门铃 4 商品详情页',
        description: '小米智能门铃 4 官方主推款详情网页，突显超长续航、红外人体感应及双向变声实时通话卖点。',
        category: 'campaign',
        image: 'https://i.postimg.cc/LXfNm9kD/xiao-mi-zhi-neng-men-ling-4-1080.jpg',
        slices: DOORBELL_4_SLICES,
        specs: '1080 x 4120 · JPG',
        channel: '小米有品 / 官方零售店 / 电商爆款专供详情'
      }
    ];
    try {
      const saved = localStorage.getItem('moreMaterials');
      if (saved) {
        const parsed = JSON.parse(saved);
        const cleaned = parsed.filter((item: any) => item.category !== 'scenes' && item.category !== 'campaign' && item.category !== 'strategy');
        const newScenesAndCampaigns = defaultMaterials.filter(item => item.category === 'scenes' || item.category === 'campaign');
        return [...cleaned, ...newScenesAndCampaigns].map((item: any) => {
          if (item.id === 'mat-1') {
            return {
              ...item,
              title: '小米智能门铃 4 Pro正视图',
              image: 'https://i.postimg.cc/Nf6P6LRP/chan-pin-ming-cheng-800-04.png',
              specs: '1080 x 1440 · PNG',
              channel: '3D渲染正视图 / 官方宣发高奢图素'
            };
          }
          if (item.id === 'mat-4') {
            return {
              ...item,
              title: '小米智能门铃 4 正视图',
              image: 'https://i.postimg.cc/YSWFFLWm/chan-pin-ming-cheng03.png',
              specs: '1080 x 1440 · PNG',
              channel: '3D渲染正视图 / 官方首发布置特供'
            };
          }
          return item;
        });
      }
    } catch (e) {
      console.error('Failed to load moreMaterials from localStorage', e);
    }
    return defaultMaterials;
  });

  useEffect(() => {
    try {
      localStorage.setItem('subProjectImages', JSON.stringify(subProjectImages));
    } catch (e) {
      console.error(e);
    }
  }, [subProjectImages]);

  useEffect(() => {
    try {
      localStorage.setItem('moreMaterials', JSON.stringify(moreMaterials));
    } catch (e) {
      console.error(e);
    }
  }, [moreMaterials]);
  const [materialsCategory, setMaterialsCategory] = useState<string>('all');
  const [materialsSearchQuery, setMaterialsSearchQuery] = useState<string>('');
  const [activeLightboxItem, setActiveLightboxItem] = useState<{ id: string; title: string; description: string; category: string; image: string; specs: string; channel: string; slices?: string[] } | null>(null);
  const [lightboxZoomed, setLightboxZoomed] = useState<boolean>(false);
  const [lightboxPan, setLightboxPan] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!activeLightboxItem) return;

    const whiteImages = [
      'https://i.postimg.cc/hvJGmFzV/mi-jia-zhi-neng-chong-wu-yin-shui-ji-1.jpg',
      'https://i.postimg.cc/MHcGBkM7/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2.jpg',
      'https://i.postimg.cc/NFy0Xh91/mi-jia-zhi-neng-chong-wu-yin-shui-ji-3.jpg',
      'https://i.postimg.cc/fy3bd4t7/mi-jia-zhi-neng-chong-wu-yin-shui-ji-4.jpg',
      'https://i.postimg.cc/WzD4ZRF7/mi-jia-zhi-neng-chong-wu-yin-shui-ji-5.jpg'
    ];
    const labels = [
      '水电分离优雅正视图',
      '机身提拉悬浮斜侧图',
      '蓄水机仓提拉剖面图',
      '双重防溢流阻泥结构面',
      '外置高强度防滑垫底显'
    ];

    const scImages = [
      'https://i.postimg.cc/KYgQ0j6W/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-01.jpg',
      'https://i.postimg.cc/TPWQt1z4/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-02.jpg',
      'https://i.postimg.cc/yNSnLxM5/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-03.jpg',
      'https://i.postimg.cc/6QGzMTsJ/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-05.jpg',
      'https://i.postimg.cc/FKJGT1tX/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-06.jpg',
      'https://i.postimg.cc/XvyxsXM0/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-07.jpg',
      'https://i.postimg.cc/k43sz9CY/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-08.jpg',
      'https://i.postimg.cc/RF5dy9mD/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-09.jpg',
      'https://i.postimg.cc/nzb2gZxW/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-10.jpg',
      'https://i.postimg.cc/xdbg68wp/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-04.jpg'
    ];
    const titles = [
      '温煦客厅起锚对视图',
      '萌白小猫喝水深镜剪影',
      '一键水电阻隔一秒断电图',
      '双宠相伴大容量泉水图',
      '自纯高滤微孔深度拦截',
      '指示红灯防干烧亮彩警示',
      '折耳猫温馨抚流微尘微漾',
      '静谧幽夜低语深度美眠图',
      '充足二升高密度蓄水图',
      '机身全拆分自清状态图'
    ];

    const wdDetMats = [
      {
        id: 'wd-det-0',
        title: '米家智能宠物饮水机 2 代核心全中文高精长幅设计提案',
        description: '1080x14400 完整官方中文商用宣传设计稿，全面透析产品特性、3D水电双物理安防机制等多层卖点。',
        category: 'hd-visuals',
        image: 'https://i.postimg.cc/9FzYhT5b/mi-jia2-yin-shui-ji-zhong-wen.jpg',
        specs: '1080 x 14400 · 长幅',
        channel: '商城官商/天猫众筹重点大图'
      },
      {
        id: 'wd-det-1',
        title: '米家智能饮水机 2 滤芯套装高精独立包装及配件画幅',
        description: '滤芯多重包与净深棉科技的独立配件营销卡片。突出低耗材易更换的性价比长效保障，引导常态回购。',
        category: 'hd-visuals',
        image: 'https://i.postimg.cc/FKskKBZZ/xiao-mi-zhi-neng-chong-wu-yin-shui-ji2-lu-xin-tao-zhuang-1080.jpg',
        specs: '1080 x 2400 · 高静',
        channel: '配件大客仓耗材独立坑位'
      },
      {
        id: 'wd-det-2',
        title: 'Global English Fountain 2 Advanced Interactive Campaign Leaflet',
        description: '面向欧美海外核心玩家与跨境电商特设的整英文长图，美学理念突出智能物理安防与双重水机阻泥，契合高端养宠审美。',
        category: 'hd-visuals',
        image: 'https://i.postimg.cc/XvHGBk1V/Xiaomi-Smart-Pet-Fountain-2-M1080.jpg',
        specs: '1080 x 12800 · 长幅',
        channel: 'Amazon/Xiaomi Global Shop'
      }
    ];

    const wdMktMats = [
      {
        id: 'wd-mkt-0',
        title: '智能宠物饮水机 2 代众筹首发核心玩法大版',
        description: '完整呈现首发上线“众筹尊享价、老用户专属折上折、社群拉新砍一刀得好礼、新品尝鲜套装箱”等核心玩法。引燃口碑。',
        category: 'campaign',
        image: 'https://i.postimg.cc/3x9WzZTr/jie-ping2026-06-21-12-15-58.png',
        specs: '1080 x 2400 · PNG',
        channel: '小程序/商城主推联合首发位'
      },
      {
        id: 'wd-mkt-1',
        title: '水粮双旗舰组合大爆品·联合首发运营海报',
        description: '整合“水机2代 + 喂食机2可视版”捆绑大套餐特有折扣，在小米商城、米家生态圈建立大额返佣机制，拉满客单产出效率。',
        category: 'campaign',
        image: 'https://i.postimg.cc/L8vhGVp9/jie-ping2026-06-21-12-16-22.png',
        specs: '1080 x 2400 · PNG',
        channel: '米家全屏大推广弹窗/商城首页'
      }
    ];

    const pfMats = [
      {
        id: 'pf-mat-0',
        title: '智能宠物喂食器 2 代可视版 3D 渲染多视图',
        description: '呈现了高强钢刀自洁、多向密封结构拆析等核心3D零件。极佳的模型真实微粉反射高精模型。',
        category: 'hd-visuals',
        image: 'https://i.postimg.cc/HLyzcX4H/2817bd71b1042416303f4f743d05836.png',
        specs: '3840 x 2160 · PNG',
        channel: '天猫众筹首页KV及主版大图'
      },
      {
        id: 'pf-mat-1',
        title: '白领出差手机一键远程视频趣味多端沟通场景',
        description: '午后明媚的写字楼办公桌一角，女白领在屏幕上点触，画面呈现喂食器俯瞰下的宝贝进食吃粮萌态。打动泛情愫用户的心智痛点。',
        category: 'scenes',
        image: 'https://i.postimg.cc/xdwsttTG/mai-dian-ji-he.jpg',
        specs: '1080 x 2400 · JPG',
        channel: '小红书社群种草 / 官方直播KV配图'
      },
      {
        id: 'pf-mat-2',
        title: '米家宠物“水+粮一体大单品套装”联合引流销售宣传海报',
        description: '喂食器可视版与饮水机2代两款高端旗舰并列伫立，传递全方位洁净水、新鲜粮科技概念，提供一站式买家套餐优惠。',
        category: 'campaign',
        image: 'https://i.postimg.cc/5yjhgLVF/jie-ping2026-06-21-15-05-35.png',
        specs: '3840 x 1440 · PNG',
        channel: '新品首发线上组合Banner'
      }
    ];

    // Pet Feeder 2 details data
    const feederWhiteImages = [
      'https://i.postimg.cc/bwjSbJzr/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban01.jpg',
      'https://i.postimg.cc/zG1HWBJG/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban02.jpg',
      'https://i.postimg.cc/3xH0pRKw/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban03.jpg',
      'https://i.postimg.cc/YCwLg9pj/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban04.jpg',
      'https://i.postimg.cc/htqQxjSz/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban05.jpg'
    ];
    const feederWhiteLabels = [
      '阻漏密封圈立体结构（高精白底）',
      '3D高清摄像碗上黄金主摄侧照',
      '六格软质硅胶叶轮出粮大侧面',
      '极极简机身开盖提拉高精图示',
      '双向高清视频联动仰视视角'
    ];

    const feederScenarioImages = [
      'https://i.postimg.cc/7LZ1RV5G/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban01.jpg',
      'https://i.postimg.cc/5t25r3XF/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban02.jpg',
      'https://i.postimg.cc/HLk0N2rJ/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban03.jpg',
      'https://i.postimg.cc/0NXG1wSr/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban06.jpg',
      'https://i.postimg.cc/8CXdg6v6/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban09.jpg',
      'https://i.postimg.cc/mrp3WH99/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban10.jpg',
      'https://i.postimg.cc/HLv01yM5/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban11.jpg',
      'https://i.postimg.cc/8CXdg6vL/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban12.jpg',
      'https://i.postimg.cc/wB45YmNk/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban15.jpg',
      'https://i.postimg.cc/CKrCpq8G/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban13.jpg'
    ];
    const feederScenarioLabels = [
      '客厅双向高清对讲逗宠画格',
      '猫咪食盆大特写余粮判定图',
      '出差远程一键视频高清联动',
      '萌宠盼望守护出粮幸福时刻',
      '高清防抖红外夜视安全守护',
      '密封阻隔潮气防虫除湿极净舱',
      '宠物贴近撒娇温馨对讲生活',
      '食量精准感应定时定量规划分发',
      '高颜值契合现代化精装客厅生态',
      '饭盆超清特写舔粮憨态场景'
    ];

    const feederDetMats = [
      {
        id: 'pf-det-0',
        title: '米家智能宠物喂食器 2 可视版官方完整众筹详情页',
        description: '首发众筹主详情页。深度展现碗上黄金摄像模组、防潮锁鲜极净舱等结构卖点，共 27 张高清高保真切片拼合而成。',
        category: 'campaign',
        image: 'https://i.postimg.cc/q7D5WZFx/jing-dong750xiang-qing-01.jpg',
        slices: PET_FEEDER_2_SLICES,
        specs: '27高清切片 · 750w极清',
        channel: '官方详情页展示 / 27切片长图'
      },
      {
        id: 'pf-det-1',
        title: '米家宠物“水+粮一体大单品套装”联合引流销售宣传海报',
        description: '喂食器可视版与饮水机2代两款高端旗舰并列伫立，传递全方位洁净水、新鲜粮科技概念，提供一站式买家套餐优惠。',
        category: 'campaign',
        image: 'https://i.postimg.cc/5yjhgLVF/jie-ping2026-06-21-15-05-35.png',
        specs: '3840 x 1440 · PNG',
        channel: '新品首发线上组合Banner'
      }
    ];

    if (activeLightboxItem.id.startsWith('bw500-white-')) {
      const currentIndex = parseInt(activeLightboxItem.id.replace('bw500-white-', ''), 10);
      const camWhiteImages = [
        'https://i.postimg.cc/zG6bvMzN/1.png',
        'https://i.postimg.cc/W1CFzKNs/2.png',
        'https://i.postimg.cc/rw30sbVc/3.png',
        'https://i.postimg.cc/Qdw9CP88/4.png',
        'https://i.postimg.cc/HkRcnKYy/5.png',
        'https://i.postimg.cc/4xq7yMfc/6.png'
      ];
      const camLabels = [
        'BW500 主机镜头白底正透图',
        'BW500 侧置隐藏螺圈倾角剖面',
        'BW500 120度背部插线防水塞图',
        'BW500 底盘安装特写图',
        'BW500 一体式防风雨遮罩正面图',
        'BW500 精密注塑高密机体侧照图'
      ];
      const total = camWhiteImages.length;
      let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex >= total) nextIndex = 0;
      if (nextIndex < 0) nextIndex = total - 1;
      setActiveLightboxItem({
        id: `bw500-white-${nextIndex}`,
        title: `白底图展示 · ${camLabels[nextIndex]}`,
        description: `小米室外摄像机 BW500 无损高清纯白背景核心制备大图。全方位呈现安防级工业美学结构。`,
        category: 'hd-visuals',
        image: camWhiteImages[nextIndex],
        specs: '1200 x 1200 · PNG',
        channel: '小米商城/国际版首推黄金主图坑位'
      });
    } else if (activeLightboxItem.id.startsWith('bw500-scene-')) {
      const currentIndex = parseInt(activeLightboxItem.id.replace('bw500-scene-', ''), 10);
      const camScImages = [
        'https://i.postimg.cc/nrWZ2ywr/kv.jpg',
        'https://i.postimg.cc/brZfZ6Np/10mi.jpg',
        'https://i.postimg.cc/kGL3KxB5/AI-xin-pian-(1).jpg',
        'https://i.postimg.cc/0jz1zt2s/chu-qu.jpg',
        'https://i.postimg.cc/7h5r5BY6/hui-jia.jpg',
        'https://i.postimg.cc/C59TkjzL/tai-yang-neng-ban.jpg',
        'https://i.postimg.cc/Gt4n4Mhw/dui-bi.jpg'
      ];
      const camTitles = [
        'BW500 官方海报主视觉KV',
        'BW500 10米超远距离夜间红外监控',
        'BW500 本地 AI 智能算力芯片',
        'BW500 出门离家警惕监测场景',
        'BW500 安全回家推屏交互场景',
        'BW500 绿色低功耗太阳能板充电组合',
        'BW500 夜间全彩对比及超清红外展示'
      ];
      const total = camScImages.length;
      let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex >= total) nextIndex = 0;
      if (nextIndex < 0) nextIndex = total - 1;
      setActiveLightboxItem({
        id: `bw500-scene-${nextIndex}`,
        title: `BW500 室外场景 · ${camTitles[nextIndex]}`,
        description: `超清安防高拟真野外全彩与夜视影像。对齐海内外同步上线、海外Global与国内两套宣发特写的极致精度。`,
        category: 'scenes',
        image: camScImages[nextIndex],
        specs: '1080 x 1440 · JPG',
        channel: '海内外首推线上配图 / 全媒体种草 / 户外宣传巨幅'
      });
    } else if (activeLightboxItem.id.startsWith('bw500-media-')) {
      const currentIndex = parseInt(activeLightboxItem.id.replace('bw500-media-', ''), 10);
      const camMediaImages = [
        'https://i.postimg.cc/wMNHWf88/chan-pin-jiu-tu-01.jpg',
        'https://i.postimg.cc/WzZj9WLR/chan-pin-jiu-tu-02.jpg',
        'https://i.postimg.cc/FzSmPW5X/chan-pin-jiu-tu-03.jpg',
        'https://i.postimg.cc/0jSxtWRq/chan-pin-jiu-tu-04.jpg',
        'https://i.postimg.cc/Wpq2b3DJ/chan-pin-jiu-tu-05.jpg',
        'https://i.postimg.cc/J7H14nyk/chan-pin-jiu-tu-06.jpg',
        'https://i.postimg.cc/Df42yZWd/chan-pin-jiu-tu-07.jpg',
        'https://i.postimg.cc/PfvtrxLb/chan-pin-jiu-tu-08.jpg',
        'https://i.postimg.cc/ryR8FmdP/chan-pin-jiu-tu-09.jpg'
      ];
      const camMediaTitles = [
        'BW500 新媒体九宫格宣介图 01',
        'BW500 新媒体九宫格宣介图 02',
        'BW500 新媒体九宫格宣介图 03',
        'BW500 新媒体九宫格宣介图 04',
        'BW500 新媒体九宫格宣介图 05',
        'BW500 新媒体九宫格宣介图 06',
        'BW500 新媒体九宫格宣介图 07',
        'BW500 新媒体九宫格宣介图 08',
        'BW500 新媒体九宫格宣介图 09'
      ];
      const total = camMediaImages.length;
      let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex >= total) nextIndex = 0;
      if (nextIndex < 0) nextIndex = total - 1;
      setActiveLightboxItem({
        id: `bw500-media-${nextIndex}`,
        title: camMediaTitles[nextIndex],
        description: `九宫格精剪社群与主流社交平台种草宣传图。生动渲染、强力覆盖用户决策场景细节。`,
        category: 'campaign',
        image: camMediaImages[nextIndex],
        specs: '1000 x 1000 · JPG',
        channel: '小红书种草、社群宣发、微信朋友圈宣介柜'
      });
    } else if (activeLightboxItem.id.startsWith('wd-white-')) {
      const currentIndex = parseInt(activeLightboxItem.id.replace('wd-white-', ''), 10);
      const total = whiteImages.length;
      let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex >= total) nextIndex = 0;
      if (nextIndex < 0) nextIndex = total - 1;
      setActiveLightboxItem({
        id: `wd-white-${nextIndex}`,
        title: `白底图展示 · ${labels[nextIndex]}`,
        description: `米家智能宠物饮水机2代官方摄影白底图集。1200px無損分辨率呈現高奢質感白卡。`,
        category: 'hd-visuals',
        image: whiteImages[nextIndex],
        specs: '1200 x 1200 · JPG',
        channel: '天猫/京东黄金坑位白底主图柜'
      });
    } else if (activeLightboxItem.id.startsWith('wd-scene-')) {
      const currentIndex = parseInt(activeLightboxItem.id.replace('wd-scene-', ''), 10);
      const total = scImages.length;
      let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex >= total) nextIndex = 0;
      if (nextIndex < 0) nextIndex = total - 1;
      setActiveLightboxItem({
        id: `wd-scene-${nextIndex}`,
        title: `生活情趣描图 · ${titles[nextIndex]}`,
        description: `1080px 超清商业包装生活透视，由专业影棚校准真实暖阳氛围，是各种主流社群软文推广图、视觉卡位金牌素材。`,
        category: 'scenes',
        image: scImages[nextIndex],
        specs: '1080 x 1440 · JPG',
        channel: '小红书种草、短视频视觉、线上发布会KV'
      });
    } else if (activeLightboxItem.id.startsWith('wd-det-')) {
      const currentIndex = parseInt(activeLightboxItem.id.replace('wd-det-', ''), 10);
      const total = wdDetMats.length;
      let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex >= total) nextIndex = 0;
      if (nextIndex < 0) nextIndex = total - 1;
      setActiveLightboxItem(wdDetMats[nextIndex]);
    } else if (activeLightboxItem.id.startsWith('wd-mkt-')) {
      const currentIndex = parseInt(activeLightboxItem.id.replace('wd-mkt-', ''), 10);
      const total = wdMktMats.length;
      let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex >= total) nextIndex = 0;
      if (nextIndex < 0) nextIndex = total - 1;
      setActiveLightboxItem(wdMktMats[nextIndex]);
    } else if (activeLightboxItem.id.startsWith('pf-white-')) {
      const currentIndex = parseInt(activeLightboxItem.id.replace('pf-white-', ''), 10);
      const total = feederWhiteImages.length;
      let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex >= total) nextIndex = 0;
      if (nextIndex < 0) nextIndex = total - 1;
      setActiveLightboxItem({
        id: `pf-white-${nextIndex}`,
        title: `喂食器白底图展示 · ${feederWhiteLabels[nextIndex]}`,
        description: `米家智能宠物喂食器2可视版无损纯白背景产品集，深度还原物理安全与黄金视角的高奢质感。`,
        category: 'hd-visuals',
        image: feederWhiteImages[nextIndex],
        specs: '1200 x 1200 · JPG',
        channel: '小米商城/天猫众筹首页黄金主图坑位'
      });
    } else if (activeLightboxItem.id.startsWith('pf-scene-')) {
      const currentIndex = parseInt(activeLightboxItem.id.replace('pf-scene-', ''), 10);
      const total = feederScenarioImages.length;
      let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex >= total) nextIndex = 0;
      if (nextIndex < 0) nextIndex = total - 1;
      setActiveLightboxItem({
        id: `pf-scene-${nextIndex}`,
        title: `喂食器生活场景 · ${feederScenarioLabels[nextIndex]}`,
        description: `超清高拟真影棚采调色，是核心新媒体种草、KOL铺设及众筹上线的主视觉核心画框。`,
        category: 'scenes',
        image: feederScenarioImages[nextIndex],
        specs: '1080 x 1440 · JPG',
        channel: '小红书种草 / 抖音信息流 / 线下巨画'
      });
    } else if (activeLightboxItem.id.startsWith('pf-det-')) {
      const currentIndex = parseInt(activeLightboxItem.id.replace('pf-det-', ''), 10);
      const total = feederDetMats.length;
      let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex >= total) nextIndex = 0;
      if (nextIndex < 0) nextIndex = total - 1;
      setActiveLightboxItem(feederDetMats[nextIndex]);
    } else if (activeLightboxItem.id.startsWith('pf-mat-')) {
      const currentIndex = parseInt(activeLightboxItem.id.replace('pf-mat-', ''), 10);
      const total = pfMats.length;
      let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex >= total) nextIndex = 0;
      if (nextIndex < 0) nextIndex = total - 1;
      setActiveLightboxItem(pfMats[nextIndex]);
    } else {
      // General moreMaterials
      const filteredList = moreMaterials.filter(item => {
        if (materialsCategory !== 'all' && item.category !== materialsCategory) return false;
        if (materialsSearchQuery.trim()) {
          const q = materialsSearchQuery.toLowerCase();
          return (
            item.title.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.channel.toLowerCase().includes(q)
          );
        }
        return true;
      });

      const currentIndex = filteredList.findIndex(item => item.id === activeLightboxItem.id);
      if (currentIndex !== -1) {
        const total = filteredList.length;
        let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
        if (nextIndex >= total) nextIndex = 0;
        if (nextIndex < 0) nextIndex = total - 1;
        setActiveLightboxItem(filteredList[nextIndex]);
      }
    }
  };

  useEffect(() => {
    setLightboxZoomed(false);
    setLightboxPan({ x: 50, y: 50 });
  }, [activeLightboxItem]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeLightboxItem) return;
      if (e.key === 'ArrowLeft') {
        navigateLightbox('prev');
      } else if (e.key === 'ArrowRight') {
        navigateLightbox('next');
      } else if (e.key === 'Escape') {
        setActiveLightboxItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxItem]);

  const [showUploadForm, setShowUploadForm] = useState<boolean>(false);
  
  // New material form state
  const [newMatTitle, setNewMatTitle] = useState<string>('');
  const [newMatCategory, setNewMatCategory] = useState<string>('hd-visuals');
  const [newMatImageURL, setNewMatImageURL] = useState<string>('');
  const [newMatSpecs, setNewMatSpecs] = useState<string>('1920 x 1080 · PNG');
  const [newMatChannel, setNewMatChannel] = useState<string>('电商详情页 / 宣发社交媒体');
  const [newMatDesc, setNewMatDesc] = useState<string>('');

  const handleSubProjectImageUpload = (key: string, file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSubProjectImages(prev => ({ ...prev, [key]: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfUpload = (file: File | null) => {
    if (file) {
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        alert(lang === 'en' ? 'Please upload a PDF file.' : '请上传 PDF 格式的文件（如: *.pdf）');
        return;
      }
      const url = URL.createObjectURL(file);
      const sizeStr = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${(file.size / 1024).toFixed(0)} KB`;
      setScriptPdf({
        name: file.name,
        url,
        size: sizeStr
      });
    }
  };

  const t = uiTranslations[lang];

  // Categories corresponding to the requested project segments with '案例汇总' as first option
  const categoriesZH = ['案例汇总', '小米项目', '70迈新品', '品牌官网与IP', '4A影视广告'];
  const categoriesEN = ['Case Summary', 'Xiaomi Projects', '70mai Products', 'Official Portal & IP', '4A Video Ads'];

  const categories = lang === 'en' ? categoriesEN : categoriesZH;
  const projectList = lang === 'en' ? projectsEN : projects;

  useEffect(() => {
    setSelectedCategory(lang === 'en' ? 'Case Summary' : '案例汇总');
  }, [lang]);

  const isAllSelected = selectedCategory === '案例汇总' || selectedCategory === 'Case Summary' || selectedCategory === 'All' || selectedCategory === 'ALL';

  const getSelectedCategoryKey = () => {
    const idx = categories.indexOf(selectedCategory);
    if (idx === 1) return 'xiaomi';
    if (idx === 2) return '70mai';
    if (idx === 3) return 'ip';
    if (idx === 4) return 'tvc';
    return 'summary';
  };

  const filteredProjects = isAllSelected
    ? projectList
    : projectList.filter((p) => {
        const catIndex = categories.indexOf(selectedCategory);
        if (catIndex === 1) return p.id === 'proj_xiaomi';
        if (catIndex === 2) return p.id === 'proj_70mai_gtm';
        if (catIndex === 3) return p.id === 'proj_brand_ip';
        if (catIndex === 4) return p.id === 'proj_tvc_4a';
        return true;
      });

  const getSubProjectsKey = (cat: string) => {
    const idx = categories.indexOf(cat);
    if (idx === 1) return 'xiaomi';
    if (idx === 2) return '70mai';
    if (idx === 3) return 'ip';
    if (idx === 4) return 'tvc';
    return null;
  };

  const activeKey = getSelectedCategoryKey();
  const overview = categoryOverviewData[activeKey]?.[lang];

  return (
    <section id="portfolio" className="relative py-24 bg-[#050505] text-white overflow-hidden border-t border-white/5 px-6 md:px-12">
      {/* Decorative background grid and glowing lights */}
      <div className="absolute inset-0 bg-mask-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 glow-orb-blue opacity-30 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 glow-orb-purple opacity-20 pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">
              {lang === 'en' ? 'Works' : '作品案例'}
            </h2>
          </div>
        </div>

        {/* Categories Filtering List */}
        <div className="flex flex-wrap items-center gap-2.5 mb-12 border-b border-white/5 pb-6 overflow-x-auto no-scrollbar">
          {categories.map((cat, catIdx) => {
            const matchedCurrent = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  const defaultCat = lang === 'en' ? 'Case Summary' : '案例汇总';
                  if (selectedCategory === cat) {
                    setSelectedCategory(defaultCat);
                  } else {
                    setSelectedCategory(cat);
                  }
                }}
                className={`px-4.5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  matchedCurrent
                    ? 'bg-white text-black font-bold shadow-lg shadow-white/5'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Bento Board Layout of Cards matching user reference */}
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          
          {/* Left Intro Card: Newly customized dynamic Plate Overview Section in a premium semi-transparent dark box */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#0b0b0b]/65 text-white w-full md:w-[410px] lg:w-[440px] rounded-2xl p-6.5 flex flex-col justify-between border border-white/10 shadow-2xl shrink-0 h-[500px] md:h-[580px] lg:h-[620px] backdrop-blur-xl text-left overflow-hidden"
          >
            {(() => {
              const activeKey = getSelectedCategoryKey();
              const overview = categoryOverviewData[activeKey]?.[lang];
              if (!overview) return null;

              return (
                <div 
                  className="flex flex-col gap-5 h-full justify-between overflow-y-auto pr-3.5"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: '#1f2937 #08080a' }}
                >
                  <div>
                    {/* Header Area */}
                    <div className="flex flex-col gap-3 pb-4 border-b border-white/10">
                      <div className="flex justify-between items-start gap-2">
                        {/* Accent tag */}
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-widest uppercase bg-blue-500/10 text-[#3b82f6] border border-blue-500/20 select-none">
                          🛡️ {lang === 'en' ? 'PLATE OVERVIEW' : '板块整体介绍'}
                        </div>
                        
                        {/* Selected Cat Name */}
                        <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                          {activeKey.toUpperCase()}
                        </span>
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-display font-bold text-white tracking-tight leading-snug">
                        {overview.title}
                      </h3>
                    </div>

                    {/* Highly dynamic metric badge displayed prominently */}
                    <div className="mt-4 bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex flex-col gap-1 select-all">
                      <span className="text-[9px] font-mono font-bold text-gray-400 tracking-widest uppercase mb-0.5">
                        {lang === 'en' ? 'GTM METRIC / MILESTONE' : '核心战绩 / 首发指标'}
                      </span>
                      <span className="text-xs sm:text-sm font-display font-black text-[#3b82f6] tracking-tight leading-none">
                        ★ {overview.metrics}
                      </span>
                    </div>

                    {/* Highlights row - Custom side-by-side 3 metric cards matching requested styling from user selector */}
                    <div className="grid grid-cols-3 gap-2.5 mt-4 select-none">
                      {(() => {
                        const items = bentoMetricsData[activeKey]?.[lang] || [
                          { val: '★', label: overview.highlights[0] || '' },
                          { val: '✦', label: overview.highlights[1] || '' },
                          { val: '✧', label: overview.highlights[2] || '' }
                        ];
                        return items.map((item, idx) => (
                          <div 
                            key={idx} 
                            className="flex flex-col items-center justify-center py-3.5 px-1.5 bg-[#0e0e11]/90 border border-white/10 rounded-2xl shadow-xl hover:border-blue-500/30 hover:bg-[#141419] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                          >
                            <span className="text-[12px] sm:text-[13.5px] font-black font-display bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent tracking-tight leading-none text-center">
                              {item.val}
                            </span>
                            <span className="text-[9px] text-gray-400 mt-1.5 font-sans font-medium text-center tracking-tight leading-snug">
                              {item.label}
                            </span>
                          </div>
                        ));
                      })()}
                    </div>

                    {/* Role & Responsibilities */}
                    <div className="mt-5">
                      <span className="text-[9px] font-mono font-bold tracking-widest text-neutral-500 uppercase mb-2 block select-none">
                        {lang === 'en' ? 'ROLE & KEY INITIATIVES' : '核心角色与主抓职责'}
                      </span>
                      <div className="bg-white/5 border border-white/5 rounded-xl p-3.5">
                        <div className="text-[11.5px] font-sans font-bold text-white mb-2 flex items-center gap-1.5">
                          <span className="text-blue-400">👤</span>
                          {overview.role}
                        </div>
                        <ul className="space-y-1.5">
                          {overview.responsibilities.map((r, rIdx) => (
                            <li key={rIdx} className="text-[11px] text-gray-400 font-sans leading-relaxed flex items-start gap-1 text-justify">
                              <span className="text-[#3b82f6] shrink-0 mt-0.5 select-none">•</span>
                              <span className="select-all">{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Workflow Path */}
                    <div className="mt-5">
                      <span className="text-[9px] font-mono font-bold tracking-widest text-neutral-500 uppercase mb-2 block select-none">
                        {lang === 'en' ? 'GTM ROADMAP / ACTIONS' : '具体落实工作与攻坚路径'}
                      </span>
                      <div className="space-y-2.5">
                        {overview.workflow.map((work, wIdx) => (
                          <div 
                            key={wIdx} 
                            className="group/left-work flex gap-3 bg-white/5 border border-white/5 rounded-xl p-3 hover:bg-white/10 hover:border-white/10 transition-colors duration-300"
                          >
                            <div className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center bg-blue-500/10 text-[#3b82f6] font-mono text-[10px] font-extrabold group-hover/left-work:bg-[#3b82f6] group-hover/left-work:text-white transition-colors duration-300 select-none">
                              {wIdx + 1}
                            </div>
                            <div className="min-w-0">
                              <h5 className="text-[11.5px] font-semibold text-white/90 group-hover/left-work:text-blue-400 transition-colors duration-300 mb-1 select-none font-sans">
                                {workflowStepTitles[lang]?.[wIdx] || `Step ${wIdx + 1}`}
                              </h5>
                              <p className="text-[11px] text-gray-300 leading-relaxed font-sans font-light text-justify select-all">
                                {work}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dynamic interactive action button matching campaign discussion */}
                  <div className="mt-2 pt-3 border-t border-white/5 flex flex-col gap-3">
                    <button
                      onClick={() => {
                        const askPrompt = lang === 'en' 
                          ? `Can you share more details about the GTM workflow and metrics for: "${overview.title}"?`
                          : `能详细帮我拆解一下“${overview.title}”板块的执行路径、策划亮点及落地指标吗？`;
                        onPreFillChat(askPrompt);
                      }}
                      className="w-full bg-[#3b82f6] text-white hover:bg-[#2563eb] transition-all duration-300 text-center py-2.5 rounded-full text-[11px] font-bold shadow-lg shadow-blue-500/10 cursor-pointer tracking-wider font-sans uppercase"
                    >
                      {lang === 'en' ? 'Discuss This Plate' : `针对本板块深度研讨`}
                    </button>
                    
                    <div className="flex items-center justify-between text-[8px] font-mono text-gray-500 select-none px-1">
                      <span>🎯 {lang === 'en' ? 'GTM QUALITY COMPLIANT' : '首网发布统筹指标落地'}</span>
                      <span>{lang === 'en' ? 'STRICT IMC RUNTIME' : '全周期闭环支撑'}</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>

          {/* Right Cards Grid & Sub-grids */}
          <div className="flex flex-col gap-6 flex-grow items-start min-w-0 w-full animate-fade-in">
            <AnimatePresence mode="popLayout">
              <div className="w-full flex flex-col gap-6">
                
                {/* Case Cards Grid OR Sub-project Cards depending on selection button */}
                {isAllSelected ? (
                  /* Original Case summary overview list if '案例汇总' is active (now styled inside the grid) */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    {filteredProjects.map((project, idx) => {
                      const primaryMetric = project.metrics && project.metrics[0] 
                        ? project.metrics[0] 
                        : { value: '★ GTM', label: 'CAMPAIGN' };

                      return (
                        <motion.div
                          key={project.id}
                          layout
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.4, delay: idx * 0.05 }}
                          className="group flex flex-col bg-white text-black border border-neutral-200/50 rounded-2xl p-5 hover:bg-neutral-50 shadow-md hover:shadow-xl hover:scale-[1.015] transition-all duration-300 min-h-[196px] h-full cursor-pointer text-left"
                          onClick={() => setActiveProject(project)}
                        >
                          {/* Top Metric row matching user style */}
                          <div className="flex justify-between items-baseline gap-2 pb-2.5 mb-2.5 border-b border-[#eee]">
                            <span className="text-xl sm:text-2xl font-display font-extrabold text-neutral-900 tracking-tight leading-none select-all truncate flex items-center gap-2">
                              {project.id === 'proj_xiaomi' && (
                                <svg className="w-[22px] h-[22px] rounded-[5px] shadow-sm shrink-0" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                  <rect width="100" height="100" rx="25" fill="#FF6700" />
                                  <rect x="25" y="34" width="8" height="32" fill="white" />
                                  <path d="M25 34 H50 C54 34, 57 37, 57 41 V66 H49 V41 C49 40, 48 39, 47 39 H33 V66 H25 V34" fill="white" />
                                  <rect x="66" y="41" width="8" height="25" fill="white" />
                                  <rect x="66" y="34" width="8" height="5" fill="white" />
                                </svg>
                              )}
                              {primaryMetric.value}
                            </span>
                            <span className="text-[9px] font-mono font-bold tracking-widest text-[#888] select-none uppercase shrink-0">
                              {primaryMetric.label}
                            </span>
                          </div>

                          {/* Bottom Column: Client info & Narrative Text */}
                          <div className="flex flex-col justify-between flex-grow min-w-0">
                            <div className="pb-1">
                              {/* High-Contrast Highlight Category Tag with Micro-Interactions */}
                              {project.id === 'proj_xiaomi' && (
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans font-extrabold tracking-wider border border-amber-500/20 bg-amber-50/90 text-amber-700 shadow-sm transition-all duration-300 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 group-hover:scale-105 group-hover:-translate-y-0.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:bg-white animate-pulse" />
                                  {project.category}
                                </div>
                              )}
                              {project.id === 'proj_70mai_gtm' && (
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans font-extrabold tracking-wider border border-indigo-500/20 bg-indigo-50/80 text-indigo-700 shadow-sm transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 group-hover:scale-105 group-hover:-translate-y-0.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:bg-white animate-pulse" />
                                  {project.category}
                                </div>
                              )}
                              {project.id === 'proj_brand_ip' && (
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans font-extrabold tracking-wider border border-purple-500/20 bg-purple-50/80 text-purple-700 shadow-sm transition-all duration-300 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 group-hover:scale-105 group-hover:-translate-y-0.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover:bg-white animate-pulse" />
                                  {project.category}
                                </div>
                              )}
                              {project.id === 'proj_tvc_4a' && (
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans font-extrabold tracking-wider border border-rose-500/20 bg-rose-50/80 text-rose-700 shadow-sm transition-all duration-300 group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600 group-hover:scale-105 group-hover:-translate-y-0.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 group-hover:bg-white animate-pulse" />
                                  {project.category}
                                </div>
                              )}
                            </div>

                            {/* Bottom description paragraph */}
                            <p className="text-[11px] text-neutral-600 leading-relaxed font-sans font-normal whitespace-pre-line text-justify mt-2.5 transition-colors duration-300 group-hover:text-neutral-900">
                              {project.description}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  /* Specific 4-column cards grid layout (具体的 4 栏细分单品介绍) */
                  <div className="w-full">
                    <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-400 mb-3.5 block text-left">
                      {lang === 'en' ? 'INDIVIDUAL RELEASES (4-COLUMN ANALYSIS)' : '首发重点精耕单品详情 (4格分栏)'}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                      {(subProjectsData[getSubProjectsKey(selectedCategory) || 'xiaomi']?.[lang] || []).map((sub, sIdx) => {
                        const isXiaomiMainDoorbell = sIdx === 0 && getSubProjectsKey(selectedCategory) === 'xiaomi';
                        const isXiaomiBW500 = sIdx === 1 && getSubProjectsKey(selectedCategory) === 'xiaomi';
                        const isPetWaterDispenser = sIdx === 2 && getSubProjectsKey(selectedCategory) === 'xiaomi';
                        const isPetFeeder = sIdx === 3 && getSubProjectsKey(selectedCategory) === 'xiaomi';
                        const isClickableSubProject = isXiaomiMainDoorbell || isXiaomiBW500 || isPetWaterDispenser || isPetFeeder;

                        return (
                          <motion.div
                            key={sIdx}
                            initial={{ opacity: 0, scale: 0.96, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: sIdx * 0.05 }}
                            onClick={() => {
                              if (isXiaomiMainDoorbell) {
                                setActiveSubProjectDetail('doorbell');
                              } else if (isXiaomiBW500) {
                                setActiveSubProjectDetail('bw500');
                              } else if (isPetWaterDispenser) {
                                setActiveSubProjectDetail('water_dispenser');
                              } else if (isPetFeeder) {
                                setActiveSubProjectDetail('pet_feeder');
                              }
                            }}
                            className={`group/subcard flex flex-col justify-between rounded-xl p-4.5 hover:scale-[1.015] hover:shadow-xl transition-all duration-300 min-h-[220px] shadow-sm text-left ${
                              isClickableSubProject 
                                ? 'bg-gradient-to-br from-blue-50/80 to-white border-2 border-blue-500/30 hover:border-blue-500 cursor-pointer shadow-md' 
                                : 'bg-[#f5f5f7] border border-neutral-200/80 hover:bg-white hover:border-[#3b82f6]/40 cursor-default'
                            }`}
                          >
                            <div>
                              {/* Card Header badge & metric */}
                              <div className={`flex justify-between items-center pb-2 mb-2.5 border-b ${isClickableSubProject ? 'border-blue-100' : 'border-neutral-200/60'}`}>
                                <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${isClickableSubProject ? 'text-blue-600/70' : 'text-neutral-500'}`}>
                                  0{sIdx + 1}. {sub.badge}
                                </span>
                                <span className={`text-[9.5px] font-mono font-extrabold px-2 py-0.5 rounded-md leading-none select-all whitespace-nowrap ${
                                  isClickableSubProject 
                                    ? 'text-white bg-blue-600' 
                                    : 'text-blue-600 bg-blue-500/10'
                                }`}>
                                  {sub.metric}
                                </span>
                              </div>
                              
                              <h4 className={`text-[13px] font-display font-semibold tracking-tight mt-1 transition-colors duration-300 ${
                                isClickableSubProject ? 'text-blue-700 font-bold group-hover/subcard:text-blue-800' : 'text-neutral-900 group-hover/subcard:text-blue-600'
                              }`}>
                                {sub.title}
                              </h4>
                              
                              <p className="text-[11.5px] text-neutral-600 font-sans font-normal leading-relaxed text-justify mt-2.5 line-clamp-4 group-hover/subcard:text-neutral-800 transition-colors duration-300">
                                {sub.desc}
                              </p>
                            </div>

                            <div className={`flex justify-between items-center text-[9px] font-mono text-neutral-500 mt-3 pt-2.5 border-t select-none ${
                              isClickableSubProject ? 'border-blue-100' : 'border-neutral-200/60'
                            }`}>
                              {isClickableSubProject ? (
                                <span className="text-blue-600 font-extrabold tracking-wider flex items-center gap-1 group-hover/subcard:translate-x-1 transition-transform animate-pulse">
                                  🌟 {lang === 'en' ? 'LAUNCH STRATEGY' : '点击看上市全案'} <ArrowRight size={10} />
                                </span>
                              ) : (
                                <span className="text-blue-600 font-extrabold tracking-wider opacity-0 group-hover/subcard:opacity-100 transition-opacity duration-300">
                                  {lang === 'en' ? 'GTM VERIFIED' : '策划落地'}
                                </span>
                              )}
                              <span className={`text-[9px] tracking-widest uppercase ${isClickableSubProject ? 'text-blue-400' : 'text-neutral-400'}`}>
                                {getSubProjectsKey(selectedCategory)?.toUpperCase()}_0{sIdx + 1}
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </AnimatePresence>

            {/* Action buttons relocated under right portfolio */}
            <div className="flex flex-col sm:flex-row gap-3.5 w-full mt-4 select-none">
              <button
                onClick={() => {
                  const askPrompt = lang === 'en' 
                    ? `Can you show me more details, real-world metric details, and key actions for: "${overview?.title}"?`
                    : `能为我展示更多“${overview?.title}”板块的执行细节、亮点战绩与攻坚花絮吗？`;
                  onPreFillChat(askPrompt);
                }}
                className="flex-1 bg-white hover:bg-neutral-200 text-black transition-all duration-300 text-center py-3 rounded-full text-xs font-bold shadow-md cursor-pointer tracking-wider font-sans"
                id="btn-view-more"
              >
                {lang === 'en' ? 'View More / Key Strategies' : '查看更多执行细节与攻坚策略'}
              </button>

              <button
                onClick={() => {
                  setSelectedCategory(lang === 'en' ? 'Case Summary' : '案例汇总');
                }}
                className={`flex-1 border text-center py-3 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer tracking-wider font-sans ${
                  isAllSelected
                    ? 'border-white/5 text-gray-600 bg-white/5 cursor-not-allowed'
                    : 'border-[#3b82f6]/40 text-[#3b82f6] hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/50 shadow-lg'
                }`}
                disabled={isAllSelected}
                id="btn-back-cases"
              >
                {lang === 'en' ? 'Back to All Cases' : '返回案例集汇总'}
              </button>
            </div>
          </div>

        </div>

        {/* Counter-balance spacer for staggered vertical offset */}
        <div className="h-24 md:h-32" />

      </div>

      {/* 3. Detailed Fullscreen Interactive Drawer / Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-end">
            {/* Overlay Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-fade-in"
            />

            {/* Drawer Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="relative w-full max-w-2xl h-full bg-[#0a0a0f] border-l border-white/5 shadow-2xl p-6 md:p-10 flex flex-col justify-between overflow-y-auto no-scrollbar z-10"
            >
              <div>
                {/* Close and Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/5">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#3b82f6] uppercase">
                    {activeProject.category}
                  </span>
                  <button
                    onClick={() => setActiveProject(null)}
                    className="w-10 h-10 rounded-full border border-white/10 hover:border-white bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Widescreen Image Banner inside Modal */}
                {activeProject.image && (
                  <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden mt-6 border border-white/10 bg-neutral-900 shadow-xl flex-shrink-0 group">
                    <img
                      src={activeProject.image}
                      alt={activeProject.title}
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                    {/* Gradient shadow transition */}
                    <div className="absolute inset-x-0 bottom-0 h-24" style={{ background: 'linear-gradient(to top, rgba(10, 10, 15, 1) 0%, rgba(10, 10, 15, 0) 100%)' }} />
                  </div>
                )}

                {/* Body Content */}
                <div className="py-6">
                  <span className="text-gray-500 font-mono text-xs block mb-2">{t.projectClient}: {activeProject.client || (lang === 'en' ? 'In-house R&D' : '自主研发')}</span>
                  <h3 className="text-2xl md:text-4xl font-display font-black text-white tracking-tight leading-tight">
                    {activeProject.title}
                  </h3>

                  {/* Timeline tag */}
                  <div className="flex items-center gap-4 mt-4 font-mono text-xs text-neutral-400">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded border border-white/5">
                      <Calendar size={13} className="text-blue-400" />
                      {activeProject.date}
                    </span>
                  </div>

                  {/* Challenges and Overview */}
                  <div className="mt-8">
                    <h4 className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-gray-500 border-b border-white/5 pb-2 mb-3">
                      <Target size={14} className="text-blue-400" /> CHALLENGE & ROADMAP / {lang === 'en' ? 'BACKGROUND & ROADMAP' : '项目背景与规划'}
                    </h4>
                    <p className="text-sm text-gray-300 font-sans font-light leading-relaxed">
                      {activeProject.description}
                    </p>
                  </div>

                  {/* Metrics list */}
                  {activeProject.metrics && activeProject.metrics.length > 0 && (
                    <div className="mt-8">
                      <h4 className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-gray-500 border-b border-white/5 pb-2 mb-4">
                        <Award size={14} className="text-amber-500" /> {t.projectMetrics}
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        {activeProject.metrics.map((metric, mIdx) => (
                          <div key={mIdx} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                            <p className="text-2xl md:text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                              {metric.value}
                            </p>
                            <p className="text-[10px] text-gray-400 font-mono tracking-wider mt-1">{metric.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags matching Fig 2 details */}
                  <div className="mt-8">
                    <div className="flex flex-wrap gap-2">
                      {activeProject.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono bg-[#15151b] px-3 py-1 rounded text-gray-400 border border-white/5">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer CTA to ask AI assistant or discuss campaign details */}
              <div className="border-t border-white/5 pt-6 mt-6">
                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/20 to-purple-950/20 border border-blue-900/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0">
                      <MessageSquare size={16} />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-white">
                        {lang === 'en' ? 'Want to learn about execution details?' : '想了解关于此项目的落地细节？'}
                      </p>
                      <p className="text-[10px] text-gray-400 font-sans">
                        {lang === 'en' ? 'One-click ask AI assistant for an instant breakdown' : '一键代入提问问答，AI助理秒速给答案'}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      const askPrompt = lang === 'en' 
                        ? `Can you elaborate on the GTM blueprint and campaign details for Youqing's project: "${activeProject.title}"?`
                        : `能详细介绍一下她在小米七十迈主导的「${activeProject.title}」这个经典上市项目吗？`;
                      onPreFillChat(askPrompt);
                      setActiveProject(null);
                    }}
                    className="px-4 py-2 rounded-full text-[11px] font-bold bg-[#3b82f6] hover:bg-blue-600 text-white whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 cursor-pointer font-sans"
                  >
                    {lang === 'en' ? 'One-Click Ask AI' : 'AI 一键代问'} <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Immersive Detailed GTM Launch Case Study for Xiaomi Doorbell 4 Pro */}
      <AnimatePresence>
        {activeSubProjectDetail === 'doorbell' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-sm">
            {/* Immersive Dark Blurry Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSubProjectDetail(null)}
              className="absolute inset-0 bg-[#040407]/95"
            />

            {/* Main Modal Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 160 }}
              className="relative w-full max-w-5xl h-[90vh] bg-[#0d0d12] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
            >
              {/* Modal Banner Title */}
              <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/5 bg-[#08080c] select-none">
                <div className="text-left">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-widest uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-1">
                    🎯 PREMIUM PRODUCT GTM / 爆款单品上市全景解析
                  </div>
                  <h3 className="text-base sm:text-xl font-display font-semibold text-white tracking-tight">
                    小米智能门铃 4 Pro
                  </h3>
                </div>
                <button
                  onClick={() => setActiveSubProjectDetail(null)}
                  className="w-9 h-9 rounded-full border border-white/10 hover:border-white/30 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer shadow"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable Layout Context */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-7 bg-[#08080d]/30 text-left" style={{ scrollbarWidth: 'thin' }}>
                
                {/* Section 1: Product Specs, Challenges & Solutions (3-Column layout) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  
                  {/* Card Column 1: Project Info */}
                  <div className="bg-[#111117] border border-white/5 rounded-xl p-4.5 shadow-md">
                    <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-white/5 select-none">
                      <span className="text-blue-400 text-sm">📋</span>
                      <h4 className="text-[11px] font-mono font-extrabold tracking-wider text-[#a1a1aa] uppercase">
                        项目基本信息
                      </h4>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white/5 p-3 rounded-lg border border-white/5 hover:border-blue-500/20 transition-all">
                        <span className="text-[10px] text-blue-400 font-bold block mb-1">1. 市场需求完美补白</span>
                        <p className="text-[11px] text-gray-300 leading-relaxed font-sans font-light">
                          补充市场500万高清双摄的门铃需求空白，显著增强红外超清夜视效果的同时，牢牢锁定高吸引力的性价比定位。
                        </p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/5 hover:border-indigo-500/20 transition-all">
                        <span className="text-[10px] text-indigo-400 font-bold block mb-1">2. 精准圈定首要受众</span>
                        <p className="text-[11px] text-gray-300 leading-relaxed font-sans font-light">
                          客群主要为25-40岁之间的都市青年为主，解决其对防盗安全、即时投递、独居保障等敏感痛点。
                        </p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/5 hover:border-purple-500/20 transition-all">
                        <span className="text-[10px] text-purple-400 font-bold block mb-1">3. 同期姊妹双生款上市</span>
                        <p className="text-[11px] text-gray-300 leading-relaxed font-sans font-light">
                          配合门铃 4 Pro同期上线的有姊妹款产品小米智能门铃 4，产品功能简约，提供更具冲击力的低层售价。
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Column 2: Hard Challenges */}
                  <div className="bg-[#171113] border border-red-500/10 rounded-xl p-4.5 shadow-md">
                    <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-white/5 select-none">
                      <span className="text-red-400 text-sm">⚠️</span>
                      <h4 className="text-[11px] font-mono font-extrabold tracking-wider text-[#a1a1aa] uppercase">
                        项目关键难点
                      </h4>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-red-500/5 p-3 rounded-lg border border-red-500/10 hover:border-red-500/20 transition-all">
                        <span className="text-[10px] text-red-400 font-bold block mb-1">1. 双子星差异定位与常规预算</span>
                        <p className="text-[11px] text-gray-300 leading-relaxed font-sans font-light">
                          需要在有限预算下进行双子星产品的差异化定位宣发，全系仅用旧款 1.3 倍的预算同时上新两款硬核产品。
                        </p>
                      </div>
                      <div className="bg-red-500/5 p-3 rounded-lg border border-red-500/10 hover:border-red-500/20 transition-all">
                        <span className="text-[10px] text-red-400 font-bold block mb-1">2. 发售空盘，上市前移一个月</span>
                        <p className="text-[11px] text-gray-300 leading-relaxed font-sans font-light">
                          大盘商业策略变动，使上市时间被整体强力提前了约1个月。所有制片宣发排期进入绝对的红线极限运转状态。
                        </p>
                      </div>
                      <div className="bg-red-500/5 p-3 rounded-lg border border-red-500/10 hover:border-red-500/20 transition-all">
                        <span className="text-[10px] text-red-400 font-bold block mb-1">3. 多头并行，额外协力包材制作</span>
                        <p className="text-[11px] text-gray-300 leading-relaxed font-sans font-light">
                          在新品常规繁琐策划工作重心外，还需要倾力配合并完成海量印刷包材部门的精准高清素材及工艺工艺。
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Column 3: Solutions */}
                  <div className="bg-[#111711] border border-green-500/10 rounded-xl p-4.5 shadow-md">
                    <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-white/5 select-none">
                      <span className="text-green-400 text-sm">💡</span>
                      <h4 className="text-[11px] font-mono font-extrabold tracking-wider text-[#a1a1aa] uppercase">
                        项目解决方案
                      </h4>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-green-500/3 p-3 rounded-lg border border-green-500/10 hover:border-green-500/20 transition-all text-[10.5px]">
                        <span className="text-[10px] text-green-400 font-bold block mb-0.5">1. 双子星错位溢价策划</span>
                        <p className="text-gray-300 leading-relaxed font-light">
                          通过对 4 极简版与 4 Pro 极客升级版的错位人群定价及宣发侧重点拆解，最大化两款产品各自的溢价优势。
                        </p>
                      </div>
                      <div className="bg-green-500/3 p-3 rounded-lg border border-green-500/10 hover:border-green-500/20 transition-all text-[10.5px]">
                        <span className="text-[10px] text-green-400 font-bold block mb-0.5">2. 极限定位控制与精细化管理</span>
                        <p className="text-gray-300 leading-relaxed font-light">
                          在时间强力紧缩的前提下，以精细化制片管理对齐并极致控制预算。
                        </p>
                      </div>
                      <div className="bg-green-500/3 p-3 rounded-lg border border-green-500/10 hover:border-green-500/20 transition-all text-[10.5px]">
                        <span className="text-[10px] text-green-400 font-bold block mb-0.5">3. 跨端口闭环协同</span>
                        <p className="text-gray-300 leading-relaxed font-light">
                          全局通盘拉通新品上市全生命周期任务链条，前置消除各端口断点，全天候卡位把控宣发进度与交付质量。
                        </p>
                      </div>
                      <div className="bg-green-500/3 p-3 rounded-lg border border-green-500/10 hover:border-green-500/20 transition-all text-[10.5px]">
                        <span className="text-[10px] text-green-400 font-bold block mb-0.5">4. 前置型人力兜底</span>
                        <p className="text-gray-300 leading-relaxed font-light">
                          提前策略性注入专项视觉与设计专才，饱和式对齐并接轨包材制作生产全流程，构筑端到端的确定性交付兜底。
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Section 2: Project Key Processes (MINDMAP & FILM PLAY) */}
                <div>
                  <div className="flex items-center gap-2 mb-3.5 pb-1.5 border-b border-white/5 select-none">
                    <span className="text-purple-400 text-sm">⚙️</span>
                    <h4 className="text-[11px] font-mono font-extrabold tracking-wider text-[#a1a1aa] uppercase">
                      第一阶段：项目执行过程与方案预览
                    </h4>
                  </div>

                  {/* Project Timeline & Schedule Dashboard Placeholder */}
                  <div className="mb-5 bg-[#0f0e13] border border-white/5 rounded-xl p-5 text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4.5 pb-3 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-purple-400" />
                        <div>
                          <h5 className="text-[12px] font-semibold text-white">小米智能门铃 GTM 及产品策划工作流</h5>
                          <span className="text-[9.5px] text-gray-500 font-mono">XIAOMI SMART DOORBELL GTM & PRODUCT PLANNING WORKFLOW</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="flex bg-black/60 p-0.5 rounded-lg border border-white/10 select-none">
                          <button
                            onClick={() => setGtmFilterTab('all')}
                            className={`px-3 py-1 text-[9px] font-bold rounded-md transition-all cursor-pointer ${gtmFilterTab === 'all' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                          >
                            工作流里程碑
                          </button>
                          <button
                            onClick={() => setGtmFilterTab('tasks')}
                            className={`px-3 py-1 text-[9px] font-bold rounded-md transition-all cursor-pointer ${gtmFilterTab === 'tasks' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                          >
                            GTM及产品全景工作流表
                          </button>
                        </div>
                        <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded text-[8px] font-mono font-bold uppercase shrink-0 hidden sm:inline-block">
                          ⏱️ 研发至GTM全周期
                        </span>
                      </div>
                    </div>

                    {gtmFilterTab !== 'tasks' ? (
                      <div className="relative animate-fade-in">
                        {/* Timeline connector bar */}
                        <div className="absolute top-[38px] left-4 right-4 h-0.5 bg-gradient-to-r from-purple-500/40 via-blue-500/30 to-green-500/20 hidden md:block" />
                        
                        {/* Timeline Steps adaptive responsive list */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                          {/* Milestone 1 */}
                          <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3 hover:bg-white/[0.04] hover:border-purple-500/20 transition-all">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[8px] font-mono font-bold text-purple-400 px-1.5 py-0.5 bg-purple-500/15 rounded border border-purple-500/10">STAGE 01</span>
                              <span className="text-[9px] text-neutral-500 font-mono">W1 - W2</span>
                            </div>
                            <div className="md:h-8 flex items-center mb-2.5">
                              <span className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center text-[9px] font-bold shrink-0">01</span>
                              <span className="text-[11.5px] text-white font-semibold ml-2">需求定义与产品规划</span>
                            </div>
                            <p className="text-[10px] text-gray-400 leading-relaxed font-light">
                              对齐双子星门铃 4 与 4 Pro 技术硬件规格差异，提炼核心差异卖点、用户画像与初期定价套组框架。
                            </p>
                          </div>

                          {/* Milestone 2 */}
                          <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3 hover:bg-white/[0.04] hover:border-blue-500/20 transition-all">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[8px] font-mono font-bold text-blue-400 px-1.5 py-0.5 bg-blue-500/15 rounded border border-blue-500/10">STAGE 02</span>
                              <span className="text-[9px] text-neutral-500 font-mono">W3 - W4</span>
                            </div>
                            <div className="md:h-8 flex items-center mb-2.5">
                              <span className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center text-[9px] font-bold shrink-0">02</span>
                              <span className="text-[11.5px] text-white font-semibold ml-2">卖点提炼与方案策划</span>
                            </div>
                            <p className="text-[10px] text-gray-400 leading-relaxed font-light">
                              锁定智能安防核心痛点（高清防护/深夜防扰/长续航/双向变声），撰写产品指南及产品上市策划方案，敲定全网众筹及宣发宏观路线。
                            </p>
                          </div>

                          {/* Milestone 3 */}
                          <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3 hover:bg-white/[0.04] hover:border-indigo-500/20 transition-all">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[8px] font-mono font-bold text-indigo-400 px-1.5 py-0.5 bg-indigo-500/15 rounded border border-indigo-500/10">STAGE 03</span>
                              <span className="text-[9px] text-neutral-500 font-mono">W5 - W6</span>
                            </div>
                            <div className="md:h-8 flex items-center mb-2.5">
                              <span className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center text-[9px] font-bold shrink-0">03</span>
                              <span className="text-[11.5px] text-white font-semibold ml-2">资材开发与上市准备</span>
                            </div>
                            <p className="text-[10px] text-gray-400 leading-relaxed font-light">
                              跟进超清3D外观与内部精细透视渲染，协同包装部门调试彩打工艺，同步电商承接长图及社交视觉配图定稿。
                            </p>
                          </div>

                          {/* Milestone 4 */}
                          <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3 hover:bg-white/[0.04] hover:border-green-500/20 transition-all">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[8px] font-mono font-bold text-green-400 px-1.5 py-0.5 bg-green-500/15 rounded border border-green-500/10">STAGE 04</span>
                              <span className="text-[9px] text-neutral-500 font-mono">W7 - W8</span>
                            </div>
                            <div className="md:h-8 flex items-center mb-2.5">
                              <span className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 flex items-center justify-center text-[9px] font-bold shrink-0">04</span>
                              <span className="text-[11.5px] text-white font-semibold ml-2">首发上市与销量引爆</span>
                            </div>
                            <p className="text-[10px] text-gray-400 leading-relaxed font-light">
                              众筹黄金档开机爆量发售，铺设全量货架，无缝叠加多平台KOL测评投放、快手抖音短视频矩阵声网覆盖，冲刺大盘首胜。
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="overflow-x-auto rounded-lg border border-white/10 bg-black/30 animate-fade-in">
                        <table className="w-full text-[10px] text-left border-collapse">
                          <thead>
                            <tr className="bg-white/5 border-b border-white/10 text-gray-300 font-mono text-[9px] tracking-wider">
                              <th className="px-3.5 py-2.5 font-bold">工作阶段 (Phase)</th>
                              <th className="px-3.5 py-2.5 font-bold">时间周期 (Timeline)</th>
                              <th className="px-3.5 py-2.5 font-bold">工作流核心执行模块 (Work Module)</th>
                              <th className="px-3.5 py-2.5 font-bold">责任对接域 (Responsibility)</th>
                              <th className="px-3.5 py-2.5 font-bold">关键可交付物 (Key Deliverables)</th>
                              <th className="px-3.5 py-2.5 font-bold text-center">参与度</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-gray-300">
                            {/* STAGE 01 */}
                            <tr className="hover:bg-white/[0.02] transition-colors">
                              <td className="px-3.5 py-2.5 font-bold text-purple-400">STAGE 01 · 需求与规划</td>
                              <td className="px-3.5 py-2.5 font-mono text-gray-400">Week 1 - 2</td>
                              <td className="px-3.5 py-2.5 font-bold text-white">硬件规格差异对齐与初期定价套组卡位</td>
                              <td className="px-3.5 py-2.5">产品经理 (PM) / 品牌GTM</td>
                              <td className="px-3.5 py-2.5">产品需求文档(PRD)、竞品优势卡位大表、溢价点清单</td>
                              <td className="px-3.5 py-2.5 text-center">
                                <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded text-[8px] font-bold">50%</span>
                              </td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors border-b border-white/5">
                              <td className="px-3.5 py-2.5 font-bold text-purple-400">STAGE 01 · 需求与规划</td>
                              <td className="px-3.5 py-2.5 font-mono text-gray-400">Week 1 - 2</td>
                              <td className="px-3.5 py-2.5 font-bold text-white">目标用户痛点调研与核心价值点提炼</td>
                              <td className="px-3.5 py-2.5">用户研究 (UR) / 营销策划</td>
                              <td className="px-3.5 py-2.5">目标买家高频痛点看板、智能核心卖点红皮书</td>
                              <td className="px-3.5 py-2.5 text-center">
                                <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded text-[8px] font-bold">50%</span>
                              </td>
                            </tr>

                            {/* STAGE 02 */}
                            <tr className="hover:bg-white/[0.02] transition-colors">
                              <td className="px-3.5 py-2.5 font-bold text-blue-400">STAGE 02 · 卖点与策划</td>
                              <td className="px-3.5 py-2.5 font-mono text-gray-400">Week 3 - 4</td>
                              <td className="px-3.5 py-2.5 font-bold text-white">撰写产品指南及产品上市策划方案，敲定全网众筹及宣发宏观路线。</td>
                              <td className="px-3.5 py-2.5">整合营销（IMC）/产品策划</td>
                              <td className="px-3.5 py-2.5">输出产品指南及产品上市方案</td>
                              <td className="px-3.5 py-2.5 text-center">
                                <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-[8px] font-bold">80%</span>
                              </td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors border-b border-white/5">
                              <td className="px-3.5 py-2.5 font-bold text-blue-400">STAGE 02 · 卖点与策划</td>
                              <td className="px-3.5 py-2.5 font-mono text-gray-400">Week 3 - 4</td>
                              <td className="px-3.5 py-2.5 font-bold text-white">全网络上市敏捷GTM路线图筹备与首批预热</td>
                              <td className="px-3.5 py-2.5">品牌统筹 / 公关负责人</td>
                              <td className="px-3.5 py-2.5">GTM全景总进度表、公关送样流程、众筹渠道价格测算案</td>
                              <td className="px-3.5 py-2.5 text-center">
                                <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded text-[8px] font-bold">50%</span>
                              </td>
                            </tr>

                            {/* STAGE 03 */}
                            <tr className="hover:bg-white/[0.02] transition-colors">
                              <td className="px-3.5 py-2.5 font-bold text-indigo-400">STAGE 03 · 资材与准备</td>
                              <td className="px-3.5 py-2.5 font-mono text-gray-400">Week 5 - 6</td>
                              <td className="px-3.5 py-2.5 font-bold text-white">产品高精 3D 渲染图与电商长详情页设计</td>
                              <td className="px-3.5 py-2.5">产品策划/创意策划</td>
                              <td className="px-3.5 py-2.5">产品透视图及高精主KV、移动端/PC众筹长图及版式样稿</td>
                              <td className="px-3.5 py-2.5 text-center">
                                <span className="px-2 py-0.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded text-[8px] font-bold">100%</span>
                              </td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors border-b border-white/5">
                              <td className="px-3.5 py-2.5 font-bold text-indigo-400">STAGE 03 · 资材与准备</td>
                              <td className="px-3.5 py-2.5 font-mono text-gray-400">Week 5 - 6</td>
                              <td className="px-3.5 py-2.5 font-bold text-white">硬彩工艺盒装印刷打样与首批产品海关商务建档</td>
                              <td className="px-3.5 py-2.5">工业设计/包材设计/供应链</td>
                              <td className="px-3.5 py-2.5">彩盒防爆模型展开物理样板、工厂装箱数据表 and 物流条码表</td>
                              <td className="px-3.5 py-2.5 text-center">
                                <span className="px-2 py-0.5 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded text-[8px] font-bold">30%</span>
                              </td>
                            </tr>

                            {/* STAGE 04 */}
                            <tr className="hover:bg-white/[0.02] transition-colors border-b border-white/5">
                              <td className="px-3.5 py-2.5 font-bold text-green-400">STAGE 04 · 首发与引爆</td>
                              <td className="px-3.5 py-2.5 font-mono text-gray-400">Week 7 - 8</td>
                              <td className="px-3.5 py-2.5 font-bold text-white">全量自媒体博主预热测评寄件与声网铺开</td>
                              <td className="px-3.5 py-2.5">公关媒介 (PR) / 整合营销</td>
                              <td className="px-3.5 py-2.5">测评达人KOL排期总账、视频物料切片库、捷报大图模板</td>
                              <td className="px-3.5 py-2.5 text-center">
                                <span className="px-2 py-0.5 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded text-[8px] font-bold">30%</span>
                              </td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                              <td className="px-3.5 py-2.5 font-bold text-green-400">STAGE 04 · 首发与引爆</td>
                              <td className="px-3.5 py-2.5 font-mono text-gray-400">Week 7 - 8</td>
                              <td className="px-3.5 py-2.5 font-bold text-white">众筹首销活动开启、核心货架页面全盘发布</td>
                              <td className="px-3.5 py-2.5">渠道销售经理 / 运营组</td>
                              <td className="px-3.5 py-2.5">销售数据看板、小米商城/有品活动主入口配图、大促战报大图</td>
                              <td className="px-3.5 py-2.5 text-center">
                                <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded text-[8px] font-bold">50%</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
                    {/* Process card 1 */}
                    <div className="bg-[#121217] border border-white/5 rounded-xl p-4.5 flex flex-col justify-between">
                      <div className="mb-3.5">
                        <span className="text-[8.5px] font-mono font-extrabold text-purple-400 uppercase tracking-widest block mb-0.5">PROCESS 01 · CORE STRATEGY</span>
                        <h5 className="text-[12px] font-semibold text-white">小米智能门铃 4 Pro/小米智能门铃 4 的卖点差异分析</h5>
                        <p className="text-[10.5px] text-gray-400 mt-1 leading-relaxed">
                          精确拆解双子星定位差异，不仅利于在本土及海外市场中进行精准客群切割、避免内部竞争，更通过将 Pro 版核心升级点（2.5K画质/180°超广角/锂电电池）进行直观对比视觉化呈现，无缝赋能电商主图与达人宣发，实现高溢价机型卓越转化与普及款高性价比认知的高效双赢。
                        </p>
                      </div>

                      {/* Interactive Dashboard of the Image content */}
                      <div className="relative w-full rounded-lg border border-white/10 bg-black/50 p-2.5 flex flex-col justify-between overflow-hidden">
                        {/* Original Image Upload Region rendered directly without tabs or table */}
                        <div className="flex-1 min-h-[224px] overflow-y-auto pr-0.5 text-justify animate-fade-in" style={{ scrollbarWidth: 'none' }}>
                          <div className="w-full h-full min-h-[224px] flex flex-col items-center justify-center p-4 text-center relative bg-black/30 rounded-lg border border-dashed border-white/10 hover:border-blue-500/30 transition-all group">
                            {subProjectImages.mindmap ? (
                              <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/40">
                                <img 
                                  src={subProjectImages.mindmap} 
                                  alt="Doorbell 4 Pro Table" 
                                  className="w-full h-full object-contain" 
                                  onError={(e) => {
                                    const img = e.currentTarget;
                                    if (img.src.endsWith('.png')) {
                                      img.src = img.src.replace('.png', '.jpg');
                                    } else if (img.src.endsWith('.jpg')) {
                                      img.src = img.src.replace('.jpg', '.jpeg');
                                    } else if (img.src.endsWith('.jpeg')) {
                                      img.src = img.src.replace('.jpeg', '.webp');
                                    }
                                  }}
                                />
                                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex flex-col gap-2 items-center justify-center transition-all">
                                  <span className="text-[10px] text-gray-300 font-sans">已加载您自定义对比图素物料</span>
                                  <label className="cursor-pointer px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-md text-[9px] font-semibold text-white transition-all flex items-center gap-1 leading-none select-none">
                                    <Upload size={11} /> 重新上传物料图片
                                    <input type="file" accept="image/*" onChange={(e) => handleSubProjectImageUpload('mindmap', e.target.files?.[0] || null)} className="hidden" />
                                  </label>
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center p-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 text-gray-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-all mb-3.5">
                                  <Upload size={18} />
                                </div>
                                <span className="text-[11px] text-gray-200 font-sans font-semibold">上传您本地的原画拆解图</span>
                                <span className="text-[9.5px] text-gray-500 font-sans mt-1.5 max-w-[280px] leading-relaxed">
                                  此区专供您备份或填充原画对比图。点击下方按钮即可上传保存，以便在方案演示中完美映射真实的原厂规格对比图：
                                </span>
                                <label className="cursor-pointer mt-3 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 hover:scale-105 rounded-full text-[9px] font-bold text-white transition-all shadow-lg select-none flex items-center gap-1.5">
                                  <Upload size={11} /> <span>上传原厂图素图片</span>
                                  <input type="file" accept="image/*" onChange={(e) => handleSubProjectImageUpload('mindmap', e.target.files?.[0] || null)} className="hidden" />
                                </label>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Process card 2: Mi Doorbell 4 Pro Mindmap */}
                    <div className="bg-[#121217] border border-white/5 rounded-xl p-4.5 flex flex-col justify-between">
                      <div className="mb-3.5">
                        <span className="text-[8.5px] font-mono font-extrabold text-blue-400 uppercase tracking-widest block mb-0.5">PROCESS 02 · PRODUCT MINDMAP</span>
                        <h5 className="text-[12px] font-semibold text-white">小米智能门铃 4 Pro 思维导图规划</h5>
                        <p className="text-[10.5px] text-gray-400 mt-1 leading-relaxed">
                          系统化梳理智能门铃 4 Pro 的硬件、软件、云端协同及智能安防场景定义，深入推演本地人形过滤算法与高时效全时双向通话流程。
                        </p>
                      </div>

                      {/* Mindmap Image Showcase */}
                      <div className="relative w-full rounded-lg border border-white/10 bg-black/50 p-2.5 flex flex-col justify-between overflow-hidden">
                        <div className="flex-1 min-h-[224px] overflow-y-auto pr-0.5 text-justify animate-fade-in" style={{ scrollbarWidth: 'none' }}>
                          <div className="w-full h-full min-h-[224px] flex flex-col items-center justify-center p-4 text-center relative bg-black/30 rounded-lg border border-dashed border-white/10 hover:border-blue-500/30 transition-all group">
                            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/40">
                              <img 
                                src="https://i.postimg.cc/g0ZM0JcD/nao-tu2.png" 
                                alt="Doorbell 4 Pro Mindmap" 
                                className="w-full h-full object-contain" 
                                onError={(e) => {
                                  const img = e.currentTarget;
                                  if (img.src.endsWith('.png')) {
                                    img.src = img.src.replace('.png', '.jpg');
                                  } else if (img.src.endsWith('.jpg')) {
                                    img.src = img.src.replace('.jpg', '.jpeg');
                                  } else if (img.src.endsWith('.jpeg')) {
                                    img.src = img.src.replace('.jpeg', '.webp');
                                  }
                                }}
                              />
                              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex flex-col gap-2 items-center justify-center transition-all">
                                <span className="text-[10px] text-gray-300 font-sans">点击放大查看思维导图规划</span>
                                <a 
                                  href="https://i.postimg.cc/g0ZM0JcD/nao-tu2.png" 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-md text-[9px] font-semibold text-white transition-all flex items-center gap-1 leading-none select-none"
                                >
                                  查看高清原图
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Section 3: Promos Output Showcase (Interactive 3 columns Image zones) */}
                <div>
                  <div className="flex items-center gap-2 mb-3.5 pb-1.5 border-b border-white/5 select-none">
                    <span className="text-[#3b82f6] text-sm">✨</span>
                    <h4 className="text-[11px] font-mono font-extrabold tracking-wider text-[#a1a1aa] uppercase">
                      第二阶段：线上上市核心创意宣发物料库占位器
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4.5">
                    
                    {/* Media card 1 */}
                    <div className="bg-[#121217] border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                      <div className="mb-3">
                        <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-[7.5px] font-mono font-bold uppercase select-none">DELIVERABLE 01</span>
                        <h5 className="text-[11px] font-semibold text-white mt-1.5">小米有品/天猫电商自营详情页</h5>
                        <p className="text-[9.5px] text-gray-400 mt-1">
                          融合500w双摄画质细节与家庭安全主动防漏卖点的智能极致排版、数码高精渲染大图。
                        </p>
                      </div>

                      {/* Interactive Segmented Selector for Detail Slices */}
                      <div className="flex flex-wrap items-center gap-1 bg-black/60 p-1 rounded-lg mb-2 border border-white/5 select-none self-start">
                        <button
                          onClick={() => setDoorbellDetailSource('pro')}
                          className={`px-2 py-1 rounded text-[8.5px] font-medium transition-all cursor-pointer ${
                            doorbellDetailSource === 'pro'
                              ? 'bg-blue-600 text-white shadow-sm'
                              : 'text-gray-400 hover:text-gray-200'
                          }`}
                        >
                          门铃 4 Pro
                        </button>
                        <button
                          onClick={() => setDoorbellDetailSource('standard')}
                          className={`px-2 py-1 rounded text-[8.5px] font-medium transition-all cursor-pointer ${
                            doorbellDetailSource === 'standard'
                              ? 'bg-blue-600 text-white shadow-sm'
                              : 'text-gray-400 hover:text-gray-200'
                          }`}
                        >
                          门铃 4
                        </button>
                        <button
                          onClick={() => setDoorbellDetailSource('upload')}
                          className={`px-2 py-1 rounded text-[8.5px] font-medium transition-all cursor-pointer ${
                            doorbellDetailSource === 'upload'
                              ? 'bg-blue-600 text-white shadow-sm'
                              : 'text-gray-400 hover:text-gray-200'
                          }`}
                        >
                          自定义/上传
                        </button>
                        <button
                          onClick={() => setDoorbellDetailSource('bw500')}
                          className={`px-2 py-1 rounded text-[8.5px] font-medium transition-all cursor-pointer ${
                            doorbellDetailSource === 'bw500'
                              ? 'bg-blue-600 text-white shadow-sm'
                              : 'text-gray-400 hover:text-gray-200'
                          }`}
                        >
                          BW500详情
                        </button>
                      </div>

                      {/* Detail Page Image Dropbox */}
                      <div className="relative w-full h-[260px] rounded-lg border border-white/10 hover:border-blue-500/30 bg-black/40 overflow-y-auto flex flex-col transition-all group/dp" style={{ scrollbarWidth: 'thin' }}>
                        {doorbellDetailSource === 'pro' ? (
                          <div className="relative w-full">
                            <div 
                              onClick={() => {
                                console.log("Launching lightbox for Pro Slices.");
                                setActiveLightboxItem({
                                  id: 'mat-detail-pro',
                                  title: '小米智能门铃 4 Pro 商品详情页 (48张切片拼接)',
                                  description: '小米智能门铃 4 Pro 官方上市爆款商详拼接大图，共 48 张高清高保真切片，由黄友情策划执笔，呈现 500W 超清画质与 180° 主动人脸侦测看护亮点。',
                                  category: 'campaign',
                                  image: 'https://i.postimg.cc/ZKFK9n3J/xiao-mi-zhi-neng-men-ling-4-Pro-1080.jpg',
                                  slices: DOORBELL_4_PRO_SLICES,
                                  specs: '48高清切片 · 750w极清',
                                  channel: '官方详情页展示 / 48切片长图'
                                });
                              }}
                              className="block relative cursor-zoom-in group/img"
                            >
                              <div className="flex flex-col w-full">
                                {DOORBELL_4_PRO_SLICES.map((url, idx) => (
                                  <img 
                                    key={idx} 
                                    src={url} 
                                    alt={`Pro slice ${idx+1}`} 
                                    className="w-full h-auto block select-none border-0" 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer"
                                  />
                                ))}
                              </div>
                              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                <span className="px-2 py-1 bg-black/70 text-white rounded text-[9px] font-medium backdrop-blur-xs">🔍 点击全画幅拼接预览 (48张高清切片)</span>
                              </div>
                            </div>
                            <div className="sticky bottom-0 left-0 right-0 h-9 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none flex items-end justify-center pb-1.5 flex-col items-center">
                              <span className="text-[8px] font-mono text-blue-400 select-none tracking-widest uppercase">↕ Scroll Slices / 48切片上下滑动 ↕</span>
                            </div>
                          </div>
                        ) : doorbellDetailSource === 'standard' ? (
                          <div className="relative w-full">
                            <div 
                              onClick={() => {
                                console.log("Launching lightbox for Standard Slices.");
                                setActiveLightboxItem({
                                  id: 'mat-detail-4',
                                  title: '小米智能门铃 4 商品详情页 (38张切片拼接)',
                                  description: '小米智能门铃 4 官方首发销售款商详拼接大图，共 38 张高清高保真切片，突出 120 天超长续航与双向变声看守卖点。',
                                  category: 'campaign',
                                  image: 'https://i.postimg.cc/LXfNm9kD/xiao-mi-zhi-neng-men-ling-4-1080.jpg',
                                  slices: DOORBELL_4_SLICES,
                                  specs: '38高清切片 · 750w极清',
                                  channel: '官方零售专享 / 38切片长图'
                                });
                              }}
                              className="block relative cursor-zoom-in group/img"
                            >
                              <div className="flex flex-col w-full">
                                {DOORBELL_4_SLICES.map((url, idx) => (
                                  <img 
                                    key={idx} 
                                    src={url} 
                                    alt={`Standard slice ${idx+1}`} 
                                    className="w-full h-auto block select-none border-0" 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer"
                                  />
                                ))}
                              </div>
                              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                <span className="px-2 py-1 bg-black/70 text-white rounded text-[9px] font-medium backdrop-blur-xs">🔍 点击全画幅拼接预览 (38张高清切片)</span>
                              </div>
                            </div>
                            <div className="sticky bottom-0 left-0 right-0 h-9 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none flex items-end justify-center pb-1.5">
                              <span className="text-[8px] font-mono text-blue-400 select-none tracking-widest uppercase">↕ Scroll Slices / 38切片上下滑动 ↕</span>
                            </div>
                          </div>
                        ) : doorbellDetailSource === 'bw500' ? (
                          <div className="relative w-full">
                            <div 
                              onClick={() => {
                                console.log("Launching lightbox for BW500 Slices.");
                                setActiveLightboxItem({
                                  id: 'mat-detail-bw500',
                                  title: '小米室外摄像头 BW500 商品详情页 (29张切片拼接)',
                                  description: '小米室外摄像头 BW500 官方上市爆款商详拼接大图，共 29 张高清高保真切片，由黄友情策划执笔，呈现高清晰度室外看护与强劲电池续航防范亮点。',
                                  category: 'campaign',
                                  image: 'https://i.postimg.cc/26yG4gpT/xiao-mi-shi-wai-she-xiang-tou-BW500-790-01.jpg',
                                  slices: BW500_SLICES,
                                  specs: '29高清切片 · 790w极清',
                                  channel: '官方详情页展示 / 29切片长图'
                                });
                              }}
                              className="block relative cursor-zoom-in group/img"
                            >
                              <div className="flex flex-col w-full">
                                {BW500_SLICES.map((url, idx) => (
                                  <img 
                                    key={idx} 
                                    src={url} 
                                    alt={`BW500 slice ${idx+1}`} 
                                    className="w-full h-auto block select-none border-0" 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer"
                                  />
                                ))}
                              </div>
                              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                <span className="px-2 py-1 bg-black/70 text-white rounded text-[9px] font-medium backdrop-blur-xs">🔍 点击全画幅拼接预览 (29张高清切片)</span>
                              </div>
                            </div>
                            <div className="sticky bottom-0 left-0 right-0 h-9 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none flex items-end justify-center pb-1.5 flex-col items-center">
                              <span className="text-[8px] font-mono text-blue-400 select-none tracking-widest uppercase">↕ Scroll Slices / 29切片上下滑动 ↕</span>
                            </div>
                          </div>
                        ) : doorbellDetailSource === 'upload' && subProjectImages.detailPage ? (
                          <div className="relative w-full">
                            <a href={subProjectImages.detailPage} target="_blank" rel="noopener noreferrer" className="block relative cursor-zoom-in group/img">
                              <img src={subProjectImages.detailPage} alt="Ecom Details" className="w-full h-auto transition-transform duration-200 group-hover/img:scale-[1.01]" />
                              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                <span className="px-2 py-1 bg-black/70 text-white rounded text-[9px] font-medium backdrop-blur-xs">🔍 Open original size in new tab</span>
                              </div>
                            </a>
                            <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover/dp:opacity-100 transition-all">
                              <label className="cursor-pointer px-2.5 py-1.5 bg-black/85 hover:bg-black border border-white/10 rounded-md text-[9px] font-semibold text-white transition-all flex items-center gap-1 select-none leading-none">
                                <Upload size={11} /> 更改详情页
                                <input type="file" accept="image/*" onChange={(e) => handleSubProjectImageUpload('detailPage', e.target.files?.[0] || null)} className="hidden" />
                              </label>
                            </div>
                            <div className="sticky bottom-0 left-0 right-0 h-9 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none flex items-end justify-center pb-1.5">
                              <span className="text-[8px] font-mono text-blue-400 select-none tracking-widest uppercase">↕ Scroll to view / 上下滑动阅览 ↕</span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-3 text-center h-full min-h-[260px]">
                            <div className="w-8 h-8 rounded-full bg-white/5 text-gray-400 flex items-center justify-center mb-2 group-hover/dp:scale-105 group-hover/dp:bg-blue-500/10 group-hover/dp:text-blue-400 transition-all">
                              <Plus size={16} />
                            </div>
                            <span className="text-[10px] text-gray-300 font-bold">详情页设计占位</span>
                            <span className="text-[8.5px] text-gray-500 mt-1 max-w-[160px] leading-snug select-none">点击上传天猫详情、众筹主图或智能门防爆款主图</span>
                            <label className="cursor-pointer mt-2.5 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 rounded-full text-[9px] font-bold text-white transition-all shadow select-none">
                              传详情页物料
                              <input type="file" accept="image/*" onChange={(e) => handleSubProjectImageUpload('detailPage', e.target.files?.[0] || null)} className="hidden" />
                            </label>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Media card 2 */}
                    <div className="bg-[#121217] border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                      <div className="mb-3">
                        <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded text-[7.5px] font-mono font-bold uppercase select-none">DELIVERABLE 02</span>
                        <h5 className="text-[11px] font-semibold text-white mt-1.5">自媒体全域痛点创意宣发海报</h5>
                        <p className="text-[9.5px] text-gray-400 mt-1">
                          小红书多图文测评头图、知乎门神大PK对比图及抖音种草预热九宫格式的高清方海报。
                        </p>
                      </div>

                      {/* Social Media Image Dropbox */}
                      <div className="relative w-full h-[260px] rounded-lg border border-white/10 hover:border-indigo-500/30 bg-black/40 overflow-y-auto flex flex-col transition-all group/sm" style={{ scrollbarWidth: 'thin' }}>
                        {subProjectImages.socialMedia ? (
                          <div className="relative w-full">
                            <img src={subProjectImages.socialMedia} alt="Social Media graphics" className="w-full h-auto" />
                            <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover/sm:opacity-100 transition-all">
                              <label className="cursor-pointer px-2.5 py-1.5 bg-black/85 hover:bg-black border border-white/10 rounded-md text-[9px] font-semibold text-white transition-all flex items-center gap-1 select-none leading-none">
                                <Upload size={11} /> 更改海报物料
                                <input type="file" accept="image/*" onChange={(e) => handleSubProjectImageUpload('socialMedia', e.target.files?.[0] || null)} className="hidden" />
                              </label>
                            </div>
                            <div className="sticky bottom-0 left-0 right-0 h-9 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none flex items-end justify-center pb-1.5">
                              <span className="text-[8px] font-mono text-indigo-400 select-none tracking-widest uppercase">↕ Scroll to view / 上下滑动阅览 ↕</span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-3 text-center h-full min-h-[260px]">
                            <div className="w-8 h-8 rounded-full bg-white/5 text-gray-400 flex items-center justify-center mb-2 group-hover/sm:scale-105 group-hover/sm:bg-indigo-500/10 group-hover/sm:text-indigo-400 transition-all">
                              <Plus size={16} />
                            </div>
                            <span className="text-[10px] text-gray-300 font-bold">自媒体海报占位</span>
                            <span className="text-[8.5px] text-gray-500 mt-1 max-w-[160px] leading-snug select-none">点击在此上传社交预热九宫格、短视频引流封面或朋友圈小報</span>
                            <label className="cursor-pointer mt-2.5 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 rounded-full text-[9px] font-bold text-white transition-all shadow select-none">
                              传自媒体图素
                              <input type="file" accept="image/*" onChange={(e) => handleSubProjectImageUpload('socialMedia', e.target.files?.[0] || null)} className="hidden" />
                            </label>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Media card 3 */}
                    <div className="bg-[#121217] border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                      <div className="mb-3">
                        <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded text-[7.5px] font-mono font-bold uppercase select-none">DELIVERABLE 03</span>
                        <h5 className="text-[11px] font-semibold text-white mt-1.5">宣发布控大盘与推广发售节奏</h5>
                        <p className="text-[9.5px] text-gray-400 mt-1">
                          包含筹备周、热望期、众筹发售日和主流博主测评发布的全局推广甘特图表与里程日历。
                        </p>
                      </div>

                      {/* Timeline Image Dropbox */}
                      <div className="relative w-full h-[260px] rounded-lg border border-white/10 hover:border-purple-500/30 bg-black/40 overflow-y-auto flex flex-col transition-all group/tl" style={{ scrollbarWidth: 'thin' }}>
                        {subProjectImages.timeline ? (
                          <div className="relative w-full">
                            <img src={subProjectImages.timeline} alt="Campaign timeline" className="w-full h-auto" />
                            <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover/tl:opacity-100 transition-all">
                              <label className="cursor-pointer px-2.5 py-1.5 bg-black/85 hover:bg-black border border-white/10 rounded-md text-[9px] font-semibold text-white transition-all flex items-center gap-1 select-none leading-none">
                                <Upload size={11} /> 更改节奏图
                                <input type="file" accept="image/*" onChange={(e) => handleSubProjectImageUpload('timeline', e.target.files?.[0] || null)} className="hidden" />
                              </label>
                            </div>
                            <div className="sticky bottom-0 left-0 right-0 h-9 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none flex items-end justify-center pb-1.5">
                              <span className="text-[8px] font-mono text-purple-400 select-none tracking-widest uppercase">↕ Scroll to view / 上下滑动阅览 ↕</span>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full flex flex-col p-3.5 space-y-3.5 text-left h-full">
                            <div className="flex items-center justify-between border-b border-white/5 pb-2 select-none">
                              <span className="text-[9.5px] font-bold text-purple-300 font-sans tracking-wide">📌 小米智能门铃4/4Pro上市节奏时间轴</span>
                              <label className="cursor-pointer px-2 py-0.5 bg-purple-500/20 hover:bg-purple-500 border border-purple-500/30 rounded text-[8px] font-semibold text-white transition-all select-none flex items-center gap-0.5">
                                <Upload size={8} /> 上传节奏图
                                <input type="file" accept="image/*" onChange={(e) => handleSubProjectImageUpload('timeline', e.target.files?.[0] || null)} className="hidden" />
                              </label>
                            </div>
                            
                            {/* Vertical timeline track */}
                            <div className="relative pl-3 border-l border-purple-500/20 space-y-4">
                              {/* Item 1 */}
                              <div className="relative space-y-1">
                                <div className="absolute -left-[16.5px] top-1.5 w-2 h-2 rounded-full bg-green-500 border border-black ring-2 ring-green-500/20" />
                                <div className="flex items-center justify-between">
                                  <span className="text-[9px] font-mono font-bold text-green-400">筹备期 · Week 1 - 2</span>
                                </div>
                                <p className="text-[10px] font-bold text-white">双子星定位与产品策划</p>
                                <p className="text-[8.5px] text-gray-400 leading-normal">
                                  明晰门铃4与4 Pro双线部署，产出产品功能点与价值点，沟通对接供应商资料，安排从3D模型、基础图素到视频的物料制作。
                                </p>
                              </div>
                              
                              {/* Item 2 */}
                              <div className="relative space-y-1">
                                <div className="absolute -left-[16.5px] top-1.5 w-2 h-2 rounded-full bg-blue-500 border border-black ring-2 ring-blue-500/20" />
                                <div className="flex items-center justify-between">
                                  <span className="text-[9px] font-mono font-bold text-blue-400">预热池蓄水 · Week 3 - 4</span>
                                </div>
                                <p className="text-[10px] font-bold text-white">产品宣发内容制作与预热资源对接</p>
                                <p className="text-[8.5px] text-gray-400 leading-normal">
                                  交付高质量宣发物料，以及电商详情等所需的上架资源，协调电商与自媒体等端口的预热安排。
                                </p>
                              </div>

                              {/* Item 3 */}
                              <div className="relative space-y-1">
                                <div className="absolute -left-[16.5px] top-1.5 w-2 h-2 rounded-full bg-yellow-500 border border-black ring-2 ring-yellow-500/20" />
                                <div className="flex items-center justify-between">
                                  <span className="text-[9px] font-mono font-bold text-yellow-400">众筹狂欢日 · Week 5</span>
                                </div>
                                <p className="text-[10px] font-bold text-white">众筹首批引爆与全站物料同步</p>
                                <p className="text-[8.5px] text-gray-400 leading-normal">
                                  小米有品首发开辟，全屏高质介绍详情页、主战首销通告、预约首发九宫格全盘上线同步，激活关注。
                                </p>
                              </div>

                              {/* Item 4 */}
                              <div className="relative space-y-1">
                                <div className="absolute -left-[16.5px] top-1.5 w-2 h-2 rounded-full bg-gray-500 border border-black ring-2 ring-gray-400/10" />
                                <div className="flex items-center justify-between">
                                  <span className="text-[9px] font-mono font-bold text-gray-400">长尾霸屏 · Week 6 - 8</span>
                                  <span className="text-[7.5px] px-1 bg-white/5 text-gray-400 border border-white/10 rounded-xs">待启动</span>
                                </div>
                                <p className="text-[10px] font-bold text-white">主流达人实测联动与复盘战报</p>
                                <p className="text-[8.5px] text-gray-400 leading-normal">
                                  全域博主深挖门铃核心变声功能与电量续航实测，矩阵式短视频覆盖、捷报大图宣发，形成安防心智闭环。
                                </p>
                              </div>
                            </div>
                            
                            <div className="sticky bottom-0 left-0 right-0 h-9 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none flex items-end justify-center pb-1">
                              <span className="text-[8px] font-mono text-purple-400 select-none tracking-widest uppercase animate-pulse">↕ Scroll to view / 上下滑动阅览 ↕</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Section 4: Advanced Product Materials Library & Vault */}
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 mb-2 pb-1 bg-gradient-to-r from-transparent to-transparent select-none">
                    <span className="text-blue-400 text-sm">📁</span>
                    <h4 className="text-[11.5px] font-mono font-extrabold tracking-wider text-[#a1a1aa] uppercase">
                      第三阶段：爆款上市全景营销物料扩展展台
                    </h4>
                  </div>
                  
                  <p className="text-[10px] text-gray-400 leading-relaxed font-light mb-4">
                    系统规划上市周期内精心定制的8款核心高保真Campaign图素，承接线上首发爆量。您可以按科技渲染、新媒体图或推广时间等分类筛选，更可动态上传自增物料图片，支持无缝高清放大预览与跨渠道匹配测试。
                  </p>

                  <div className="bg-[#121217]/60 border border-white/5 rounded-xl p-4.5 space-y-4">
                    {/* Controls Bar */}
                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 pb-3 border-b border-white/5 select-none text-[10px]">
                      {/* Filter Categories */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          onClick={() => setMaterialsCategory('all')}
                          className={`px-3 py-1 rounded-full text-[10px] font-medium transition-all cursor-pointer ${
                            materialsCategory === 'all'
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
                          }`}
                        >
                          全部物料 ({moreMaterials.length})
                        </button>
                        <button
                          onClick={() => setMaterialsCategory('hd-visuals')}
                          className={`px-3 py-1 rounded-full text-[10px] font-medium transition-all cursor-pointer ${
                            materialsCategory === 'hd-visuals'
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
                          }`}
                        >
                          3D渲染 ({moreMaterials.filter(m => m.category === 'hd-visuals').length})
                        </button>
                        <button
                          onClick={() => setMaterialsCategory('scenes')}
                          className={`px-3 py-1 rounded-full text-[10px] font-medium transition-all cursor-pointer ${
                            materialsCategory === 'scenes'
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
                          }`}
                        >
                          新媒体图 ({moreMaterials.filter(m => m.category === 'scenes').length})
                        </button>
                        <button
                          onClick={() => setMaterialsCategory('campaign')}
                          className={`px-3 py-1 rounded-full text-[10px] font-medium transition-all cursor-pointer ${
                            materialsCategory === 'campaign'
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
                          }`}
                        >
                          商品详情页 ({moreMaterials.filter(m => m.category === 'campaign').length})
                        </button>
                      </div>

                      {/* Search & Dynamic Add */}
                      <div className="flex items-center gap-2 self-start xl:self-auto">
                        <div className="relative">
                          <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                          <input
                            type="text"
                            placeholder="检索物料及关键词..."
                            value={materialsSearchQuery}
                            onChange={(e) => setMaterialsSearchQuery(e.target.value)}
                            className="pl-7 pr-4 py-1.2 bg-black/45 border border-white/10 rounded-full text-[10px] text-white focus:outline-none focus:border-blue-500 w-[140px] sm:w-[170px] transition-all placeholder:text-gray-600"
                          />
                        </div>
                        <button
                          onClick={() => setShowUploadForm(!showUploadForm)}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full transition-all flex items-center gap-1 cursor-pointer shadow-md text-[10px]"
                        >
                          <Plus size={12} /> 动态增补物料
                        </button>
                      </div>
                    </div>

                    {/* Collapsible Upload Form */}
                    {showUploadForm && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="p-4 bg-[#0d0d12]/90 border border-emerald-500/15 rounded-xl space-y-3.5 text-left text-[10px]"
                      >
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <span className="font-bold text-emerald-400 flex items-center gap-1 text-[10.5px]">
                            🚀 增补全新 Campaign 上市宣传图素
                          </span>
                          <button onClick={() => setShowUploadForm(false)} className="text-gray-500 hover:text-white cursor-pointer">
                            ✕
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div className="space-y-1.2">
                            <label className="font-semibold text-gray-400 block">物料标题 *</label>
                            <input
                              type="text"
                              value={newMatTitle}
                              onChange={(e) => setNewMatTitle(e.target.value)}
                              placeholder="例: 智能门铃4全硬彩外观防钻防撬细节大图"
                              className="w-full px-2.5 py-1.8 bg-black/50 border border-white/10 rounded text-[10px] text-white focus:outline-none focus:border-emerald-500/50"
                            />
                          </div>

                          <div className="space-y-1.2">
                            <label className="font-semibold text-gray-400 block">推荐曝光渠道/频度 *</label>
                            <input
                              type="text"
                              value={newMatChannel}
                              onChange={(e) => setNewMatChannel(e.target.value)}
                              placeholder="例: 电商主页切网 / 微信私域朋友圈海报"
                              className="w-full px-2.5 py-1.8 bg-black/50 border border-white/10 rounded text-[10px] text-white focus:outline-none focus:border-emerald-500/50"
                            />
                          </div>

                          <div className="space-y-1.2">
                            <label className="font-semibold text-gray-400 block">图素定位分类</label>
                            <select
                              value={newMatCategory}
                              onChange={(e) => setNewMatCategory(e.target.value)}
                              className="w-full px-2 py-1.5 bg-black/50 border border-white/10 rounded text-[10px] text-white focus:outline-none focus:border-emerald-500/50"
                            >
                              <option value="hd-visuals">科技渲染 / 3D精显</option>
                              <option value="scenes">新媒体图</option>
                              <option value="campaign">商品详情页</option>
                            </select>
                          </div>

                          <div className="space-y-1.2">
                            <label className="font-semibold text-gray-400 block">图纸尺寸规格</label>
                            <input
                              type="text"
                              value={newMatSpecs}
                              onChange={(e) => setNewMatSpecs(e.target.value)}
                              placeholder="例: 1080 x 1920 · JPG"
                              className="w-full px-2.5 py-1.8 bg-black/50 border border-white/10 rounded text-[10px] text-white focus:outline-none focus:border-emerald-500/50"
                            />
                          </div>

                          <div className="sm:col-span-2 space-y-1.2">
                            <label className="font-semibold text-gray-400 block">图片外链 (URL) 或直接本地上传 *</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={newMatImageURL}
                                onChange={(e) => setNewMatImageURL(e.target.value)}
                                placeholder="输入您已上传图床获得的图片外链 URL (http://... 或 https://...)"
                                className="flex-1 px-2.5 py-1.8 bg-black/50 border border-white/10 rounded text-[10px] text-white focus:outline-none focus:border-emerald-500/50 placeholder:text-gray-700"
                              />
                              <label className="cursor-pointer px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded flex items-center justify-center shrink-0 text-[10px]">
                                <Upload size={11} className="mr-1" /> 选择本地
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        const base64String = reader.result as string;
                                        setNewMatImageURL(base64String);
                                        alert(`已成功转换并暂存本地图素：${file.name}，可继续补充其余项目。`);
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>

                          <div className="sm:col-span-2 space-y-1.2">
                            <label className="font-semibold text-gray-400 block">物料创意/亮点解析 *</label>
                            <textarea
                              value={newMatDesc}
                              onChange={(e) => setNewMatDesc(e.target.value)}
                              placeholder="写下该款物料展示的重点设计心得、文案痛点或者引流场景配置，加深发售研讨论证..."
                              rows={2}
                              className="w-full px-2.5 py-1.8 bg-black/50 border border-white/10 rounded text-[10px] text-white focus:outline-none focus:border-emerald-500/50 resize-none placeholder:text-gray-700"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
                          <button
                            onClick={() => {
                              setNewMatTitle('');
                              setNewMatImageURL('');
                              setNewMatDesc('');
                              setShowUploadForm(false);
                            }}
                            className="px-3.5 py-1 text-gray-400 hover:text-white rounded border border-white/10 cursor-pointer hover:bg-white/5"
                          >
                            清空重置
                          </button>
                          <button
                            onClick={() => {
                              if (!newMatTitle.trim()) {
                                alert('请填写图素标题');
                                return;
                              }
                              if (!newMatImageURL.trim()) {
                                alert('本地物料或外链 URL 为必填项，无法成空白发布。');
                                return;
                              }
                              const item = {
                                id: `mat-cust-${Date.now()}`,
                                title: newMatTitle,
                                description: newMatDesc || '精细定制款Campaign物料',
                                category: newMatCategory,
                                image: newMatImageURL,
                                specs: newMatSpecs,
                                channel: newMatChannel
                              };
                              setMoreMaterials(prev => [item, ...prev]);
                              setNewMatTitle('');
                              setNewMatImageURL('');
                              setNewMatDesc('');
                              setShowUploadForm(false);
                            }}
                            className="px-4 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded cursor-pointer"
                          >
                            保存到图素库
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Render Filtered Materials Grid */}
                    {(() => {
                      const filtered = moreMaterials.filter(item => {
                        if (materialsCategory !== 'all' && item.category !== materialsCategory) return false;
                        if (materialsSearchQuery.trim()) {
                          const q = materialsSearchQuery.toLowerCase();
                          return (
                            item.title.toLowerCase().includes(q) ||
                            item.description.toLowerCase().includes(q) ||
                            item.channel.toLowerCase().includes(q)
                          );
                        }
                        return true;
                      });

                      if (filtered.length === 0) {
                        return (
                          <div className="flex flex-col items-center justify-center py-9 select-none bg-black/30 rounded-lg border border-dashed border-white/10 text-center text-[10px]">
                            <ImageIcon className="text-gray-600 w-8 h-8 mb-2 animate-pulse" />
                            <span className="text-gray-400 font-bold">没有检索到符合条件的 Campaign 物料</span>
                            <span className="text-gray-600 mt-1">请尝试复位分类分类、清空过滤关键字搜索。</span>
                          </div>
                        );
                      }

                      return (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {filtered.map(item => {
                            const isCustom = item.id.startsWith('mat-cust-');
                            return (
                              <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="group relative bg-[#09090d] border border-white/5 hover:border-blue-500/20 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-200"
                              >
                                {/* Media Image container */}
                                <div className="relative w-full aspect-[4/3] bg-black/50 overflow-hidden flex items-center justify-center border-b border-white/5">
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    onError={(e) => {
                                      const img = e.currentTarget;
                                      if (img.src.endsWith('.png')) {
                                        img.src = img.src.replace('.png', '.jpg');
                                      } else if (img.src.endsWith('.jpg')) {
                                        img.src = img.src.replace('.jpg', '.jpeg');
                                      } else if (img.src.endsWith('.jpeg')) {
                                        img.src = img.src.replace('.jpeg', '.webp');
                                      }
                                    }}
                                  />

                                  {/* Item tags and remove controls */}
                                  <div className="absolute top-2 left-2 z-10 flex gap-1 select-none font-sans">
                                    <span className={`text-[7px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border ${
                                      item.category === 'hd-visuals' ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' :
                                      item.category === 'scenes' ? 'bg-amber-500/20 border-amber-500/30 text-amber-400' :
                                      'bg-purple-500/20 border-purple-500/30 text-purple-400'
                                    }`}>
                                      {item.category === 'hd-visuals' ? '3D精细' :
                                       item.category === 'scenes' ? '场景画质' :
                                       '推广彩盒'}
                                    </span>
                                  </div>

                                  {isCustom && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (confirm(`确认要从本地图素展台中彻底移除“${item.title}”吗？`)) {
                                          setMoreMaterials(prev => prev.filter(m => m.id !== item.id));
                                        }
                                      }}
                                      className="absolute top-2 right-2 z-10 p-1.5 bg-black/80 hover:bg-red-600/80 border border-white/10 rounded-full text-gray-400 hover:text-white transition-all cursor-pointer"
                                      title="移除该图素"
                                    >
                                      <Trash2 size={10} />
                                    </button>
                                  )}

                                  {/* Interactive screen overlay */}
                                  <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1.5 transition-all p-3 text-center">
                                    <span className="text-[9px] text-gray-400 font-mono font-semibold">{item.specs}</span>
                                    <div className="flex gap-1.5 mt-1 select-none">
                                      <button
                                        onClick={() => setActiveLightboxItem(item)}
                                        className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[8.5px] font-bold transition-all flex items-center gap-0.5 cursor-pointer shadow"
                                      >
                                        <Eye size={10} /> 放大预览
                                      </button>
                                      <a
                                        href={item.image}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white rounded text-[8.5px] font-medium transition-all flex items-center gap-0.5 cursor-pointer"
                                      >
                                        <Download size={10} /> 在新标签页
                                      </a>
                                    </div>
                                  </div>
                                </div>

                                {/* Texts */}
                                <div className="p-3 text-left space-y-1">
                                  <h6 className="text-[10.5px] font-bold text-white truncate" title={item.title}>
                                    {item.title}
                                  </h6>
                                  <p className="text-[9px] text-gray-400 leading-snug line-clamp-2 h-[26px] font-light">
                                    {item.description}
                                  </p>
                                  <div className="pt-2 border-t border-white/5 text-[8px] text-gray-500 font-mono flex flex-col gap-0.5 select-none text-[8px]">
                                    <span className="text-[7.5px] text-blue-400/80 truncate">
                                      📌 渠道: {item.channel}
                                    </span>
                                    <span>⚙️ 规格: {item.specs}</span>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      );
                    })()}

                  </div>
                </div>

              </div>

              {/* Modal Box Footer with Call To Action for AI assistance discussion */}
              <div className="px-6 py-4.5 border-t border-white/5 bg-[#08080c] flex flex-col sm:flex-row items-center justify-between gap-4 select-none animate-fade-in">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-8.5 h-8.5 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                    <MessageSquare size={15} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">想在左侧边栏深度复战本篇案例？</p>
                    <p className="text-[10px] text-gray-500 font-sans">点击AI一键深度研讨，由助理自动代入大单发售难点进行精细解答与策划案初稿撰写</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => {
                      const askPrompt = `我想深度复盘并研讨“小米智能门铃 4 Pro”这一智能安防大单品的发售节奏与双子星组合拳解决方案，能否帮我写一份相似的智能产品上市GTM计划书方案大网？`;
                      onPreFillChat(askPrompt);
                      setActiveSubProjectDetail(null);
                    }}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    AI 深度复战此单品 <ArrowRight size={12} />
                  </button>
                  <button
                    onClick={() => setActiveSubProjectDetail(null)}
                    className="px-3.5 py-2 border border-white/10 hover:border-white text-gray-300 hover:text-white rounded-full text-xs font-semibold transition-all cursor-pointer bg-white/5"
                  >
                    关闭并返回
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* 4.5 Immersive Detailed GTM Launch Case Study for Xiaomi Outdoor Camera BW500 */}
        {activeSubProjectDetail === 'bw500' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSubProjectDetail(null)}
              className="absolute inset-0 bg-[#040407]/95"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 160 }}
              className="relative w-full max-w-5xl h-[90vh] bg-[#0d0d12] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
            >
              {/* Modal Banner Title */}
              <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/5 bg-[#08080c] select-none">
                <div className="text-left">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-widest uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-1">
                    🎯 BRAND GTM STUDY / 极清安防设备全球同步上市特辑
                  </div>
                  <h3 className="text-base sm:text-lg font-display font-semibold text-white tracking-tight">
                    小米室外摄像机 BW500 核心上市全案
                  </h3>
                </div>
                <button
                  onClick={() => setActiveSubProjectDetail(null)}
                  className="w-9 h-9 rounded-full border border-white/10 hover:border-white/30 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer shadow"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable Layout Context */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-7 bg-[#08080d]/30 text-left animate-fade-in" style={{ scrollbarWidth: 'thin' }}>
                
                {/* 3-Column specs, challenges & solutions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  
                  {/* Column 1: Background & Target */}
                  <div className="bg-[#111117] border border-white/5 rounded-xl p-4.5 shadow-md">
                    <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-white/5 select-none">
                      <span className="text-blue-400 text-sm">📋</span>
                      <h4 className="text-[11px] font-mono font-extrabold tracking-wider text-[#a1a1aa] uppercase">
                        项目背景与定位
                      </h4>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                        <span className="text-[10px] text-blue-400 font-bold block mb-1">1. 500万极清与暗光夜视刚需</span>
                        <p className="text-[11px] text-gray-300 leading-relaxed font-sans font-light animate-fade-in">
                          室外摄像头对于500万像素高清以及夜视清晰的需求十分强烈，是安防大盘竞争的核心高地。
                        </p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                        <span className="text-[10px] text-indigo-400 font-bold block mb-1">2. S级旗舰全球同步上线</span>
                        <p className="text-[11px] text-gray-300 leading-relaxed font-sans font-light animate-fade-in">
                          定位为小米年度S级智能安防新品，国行天猫众筹首发与海外全球销售终端高度协同、同步引爆上线。
                        </p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                        <span className="text-[10px] text-purple-400 font-bold block mb-1">3. 临危接手与多端超载负荷</span>
                        <p className="text-[11px] text-gray-300 leading-relaxed font-sans font-light animate-fade-in">
                          因组织人员变化，此项目是临时接手了同事的项目，且同期我的手中还有3个其他的新品在跑，包含车载的S级产品X800。
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Hard Challenges */}
                  <div className="bg-[#171113] border border-red-500/10 rounded-xl p-4.5 shadow-md">
                    <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-white/5 select-none">
                      <span className="text-red-400 text-sm">⚠️</span>
                      <h4 className="text-[11px] font-mono font-extrabold tracking-wider text-[#a1a1aa] uppercase">
                        核心攻坚难点
                      </h4>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-red-500/5 p-3 rounded-lg border border-red-500/10">
                        <span className="text-[10px] text-red-400 font-bold block mb-1">1. 顶级安防严苛指标与时间周期高压</span>
                        <p className="text-[11px] text-gray-300 leading-relaxed font-sans font-light animate-fade-in">
                          小米安防系列是小米产品体系的S级，要求较高。临时接手了同事的项目，时间提拉了1个月，海外双线运作，需备齐国内及Global等多维度特挑物料，十分棘手。
                        </p>
                      </div>
                      <div className="bg-red-500/5 p-3 rounded-lg border border-red-500/10">
                        <span className="text-[10px] text-red-500/80 font-bold block mb-1">2. 极限多并发与人手严重短缺</span>
                        <p className="text-[11px] text-gray-300 leading-relaxed font-sans font-light animate-fade-in">
                          临时接手了同事的项目，时间提拉了1个月，海内外同步上线，需筹备国内版和global不同的物料内容。且同期我的手中还有3个其他的新品在跑，包含车载的S级产品X800，人手不够。
                        </p>
                      </div>
                      <div className="bg-red-500/5 p-3 rounded-lg border border-red-500/10">
                        <span className="text-[10px] text-orange-400 font-bold block mb-1">3. 供应商开天窗与物料受阻</span>
                        <p className="text-[11px] text-gray-300 leading-relaxed font-sans font-light animate-fade-in">
                          因供应商的问题，导致上市物料审核受阻。原定合作商提供的材质渲染有重大瑕疵，面临发布开天窗的生死绝境。
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Breakthrough Solutions */}
                  <div className="bg-[#111711] border border-green-500/10 rounded-xl p-4.5 shadow-md">
                    <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-white/5 select-none">
                      <span className="text-green-400 text-sm">💡</span>
                      <h4 className="text-[11px] font-mono font-extrabold tracking-wider text-[#a1a1aa] uppercase">
                        立体破局解法
                      </h4>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-green-500/3 p-3 rounded-lg border border-green-500/10 text-[10.5px]">
                        <span className="text-[10px] text-green-400 font-bold block mb-1.5 font-sans">1. 上报领导与科学降载帮扶</span>
                        <p className="text-gray-300 leading-relaxed font-light font-sans animate-fade-in">
                          上报领导，协调项目优先级，抽调人手协助。将常态事务分流，说服管理层注入美术核心骨干，安全分卸了同期车载X800等新品的脑力超载。
                        </p>
                      </div>
                      <div className="bg-green-500/3 p-3 rounded-lg border border-green-500/10 text-[10.5px]">
                        <span className="text-[10px] text-emerald-400 font-bold block mb-1.5 font-sans">2. 负责人直连拉通与快狠换商</span>
                        <p className="text-gray-300 leading-relaxed font-light font-sans animate-fade-in">
                          和小米Bw500负责人拉通，优化项目管理，换供应商，多方资源全力追进度和品质。连夜锁定头部王牌战略供应商，火速出具高清折射渲染。
                        </p>
                      </div>
                      <div className="bg-green-500/3 p-3 rounded-lg border border-green-500/10 text-[10.5px]">
                        <span className="text-[10px] text-emerald-500 font-bold block mb-1.5 font-sans">3. 连续攻坚，多端顺利发售</span>
                        <p className="text-gray-300 leading-relaxed font-light font-sans animate-fade-in">
                          加班加点，顺利上市。全线成员火力全开追回1个月被挪前的周期差，彻底排除物料瑕疵，实现国内天猫与全球无差错同步引爆。
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Pricing Calculator or Interactive Simulator Tool (小米室外摄像机BW500 并发负载与供应商破局精巧模拟器) */}
                <div className="bg-[#0f0e13] border border-white/5 rounded-xl p-5 text-left">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
                    <Sparkles size={14} className="text-blue-400 animate-pulse" />
                    <div>
                      <h4 className="text-xs font-semibold text-white">小米 BW500 并发负载及供应商合规解危模拟面板</h4>
                      <span className="text-[9.5px] text-gray-500 font-mono">XIAOMI BW500 MULTI-TASK CONCURRENCY & VENDOR COMPLIANCE SIMULATOR</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-black/30 p-4.5 rounded-lg border border-white/5">
                    
                    {/* Simulator Segment 1: Task Concurrency slider */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 block mb-1.5 animate-fade-in">
                          1. 组合同期推进新品件数: <span className="text-indigo-400 font-mono text-xs font-bold">{bw500ConcurrentLoad} 款</span>
                        </label>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setBw500ConcurrentLoad(Math.max(1, bw500ConcurrentLoad - 1))} 
                            className="w-7 h-7 bg-white/5 hover:bg-white/10 text-white rounded font-bold transition-all text-xs border border-white/10 select-none cursor-pointer"
                          >
                            -
                          </button>
                          <input 
                            type="range" min="1" max="4" step="1" value={bw500ConcurrentLoad} 
                            onChange={(e) => setBw500ConcurrentLoad(Number(e.target.value))}
                            className="flex-1 accent-indigo-500 cursor-pointer" 
                          />
                          <button 
                            onClick={() => setBw500ConcurrentLoad(Math.min(4, bw500ConcurrentLoad + 1))} 
                            className="w-7 h-7 bg-white/5 hover:bg-white/10 text-white rounded font-bold transition-all text-xs border border-white/10 select-none cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <div className="mt-1.5 flex items-center justify-between text-[9px]">
                          <span className="text-gray-500">（包含S级车载X800、猫眼等）</span>
                          <span className={`font-mono font-bold ${bw500ConcurrentLoad >= 3 ? 'text-red-400' : 'text-blue-400'}`}>
                            {bw500ConcurrentLoad >= 3 ? '🔴 处于极限超载死线' : '🟢 处于安全水位'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Simulator Segment 2: Supplier selection */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 block mb-1.5">
                          2. 物料供应商配合状况:
                        </label>
                        <div className="flex gap-2">
                          {[
                            { name: '不合规合作商 (受阻)', eff: 60 },
                            { name: '战略一级供应商 (顶级)', eff: 100 }
                          ].map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => setBw500VendorEfficiency(item.eff)}
                              className={`flex-1 py-1.5 px-1 text-center rounded border transition-all text-[9.5px] font-bold font-sans cursor-pointer ${
                                bw500VendorEfficiency === item.eff
                                  ? item.eff === 100 
                                    ? 'bg-green-600/20 border-green-500 text-green-400 font-extrabold' 
                                    : 'bg-red-600/20 border-red-500 text-red-400 font-extrabold'
                                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                              }`}
                            >
                              {item.name}
                            </button>
                          ))}
                        </div>
                        <span className="text-[8.5px] text-gray-600 block mt-1.5">因供应商的问题上市物料审核受阻 ➔ 雷厉风行拉通并果断换商</span>
                      </div>
                    </div>

                    {/* Simulator Segment 3: Escalation Manpower Support status */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 block mb-1.5">
                          3. 视觉攻坚组支援人手: 
                        </label>
                        <div className="flex gap-2">
                          {[
                            { label: '独自1人超载 (Solo)', val: 1 },
                            { label: '上报领导调配团队人手', val: 3 }
                          ].map((item) => (
                            <button
                              key={item.val}
                              onClick={() => setBw500Manpower(item.val)}
                              className={`flex-1 py-1.5 px-1 text-center rounded border transition-all text-[9px] font-sans cursor-pointer ${
                                bw500Manpower === item.val
                                  ? 'bg-blue-600/30 border-blue-500 text-blue-400 font-bold' 
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                              }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                        <span className="text-[8.5px] text-gray-600 block mt-1.5">上报领导协调项目优先级，抽调核心人员支援以防手忙脚乱</span>
                      </div>
                    </div>

                  </div>

                  {/* Dynamic Simulation Calculated Outcome Display */}
                  <div className="mt-4 p-4.5 rounded-lg border border-[#3b82f6]/10 bg-[#3b82f6]/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                        🚨 并发及物料实装模拟结果 / CLINICAL SIMULATION METRICS
                      </p>
                      
                      <div className="mt-2 text-xs text-gray-300 font-sans space-y-1">
                        <div>
                          交付周期及品质压力：
                          <span className={`font-mono font-extrabold text-[13px] ml-1.5 ${
                            (bw500ConcurrentLoad * 25 - bw500Manpower * 15 + (100 - bw500VendorEfficiency)) >= 60 
                              ? 'text-red-400 animate-pulse' 
                              : 'text-green-400'
                          }`}>
                            {Math.max(10, bw500ConcurrentLoad * 25 - bw500Manpower * 15 + (100 - bw500VendorEfficiency))}%
                          </span>
                        </div>
                        
                        <div className="text-[10.5px]">
                          上市合规及物料状态：
                          <span className={`font-mono font-bold ml-1.5 ${bw500VendorEfficiency === 100 ? 'text-green-400' : 'text-red-400'}`}>
                            {bw500VendorEfficiency === 100 ? '✅ 100% 审核达标，画幅与无死角暗光红外图素极尽展示' : '❌ 供应商不合规 / 交付渲染材质漏洞百出 ➔ 审核受阻！'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setBw500ConcurrentLoad(4);
                          setBw500Manpower(3);
                        }}
                        className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10.5px] transition-all cursor-pointer select-none active:scale-95"
                      >
                        ⚡ 上报领导，调配协调人手协助
                      </button>
                      <button
                        onClick={() => {
                          setBw500VendorEfficiency(100);
                        }}
                        className="px-3.5 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10.5px] transition-all cursor-pointer select-none active:scale-95"
                      >
                        🔄 拉通负责人，果断优化项目管理换供应商
                      </button>
                    </div>
                  </div>

                </div>

                {/* BW500 物料展示模块 */}
                <div className="bg-[#0f0e13] border border-white/5 rounded-xl p-5 text-left space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/5 select-none">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400 text-sm">🖼️</span>
                      <div>
                        <h4 className="text-[12px] font-mono font-extrabold tracking-wider text-[#e4e4e7] uppercase">
                          小米室外摄像机 BW500 上市企划核心物料展示舱
                        </h4>
                        <span className="text-[9px] font-mono text-gray-500">DIGITAL MARKETING & DESIGN GTM CONTAINER</span>
                      </div>
                    </div>
                    
                    {/* Tabs Selector */}
                    <div className="flex flex-wrap gap-1 bg-black/30 p-1 rounded-lg border border-white/5">
                      {[
                        { id: 'white-bg', label: '1. 白底图轮播 (6)' },
                        { id: 'scenarios', label: '2. 场景图轮播 (7)' },
                        { id: 'newmedia', label: '3. 新媒体推广 (9)' },
                        { id: 'details', label: '4. 详情页展示' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveBw500Tab(tab.id)}
                          className={`px-3 py-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer ${
                            activeBw500Tab === tab.id
                              ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold'
                              : 'border border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {/* Tab 1: 白底图轮播展示 */}
                    {activeBw500Tab === 'white-bg' && (
                      <motion.div
                        key="white-bg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-white/[0.01] border border-white/5 rounded-xl p-4.5"
                      >
                        {/* Left Side: Detail & Index List */}
                        <div className="md:col-span-4 flex flex-col justify-between space-y-4">
                          <div className="text-left space-y-2">
                            <span className="text-[9px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded font-bold">
                              MODULE 01
                            </span>
                            <h5 className="text-sm font-semibold text-white tracking-tight">6张高清白底图展示展台</h5>
                            <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                              极致高清纯白陈列展示图。展示小米极简设计、镜头多视角、高密遮罩细节，专供各大主流电商平台的主图柜、展示首图使用。
                            </p>
                          </div>

                          {/* Interactive indices indicator list */}
                          <div className="space-y-1.5 pt-3 border-t border-white/5">
                            {[
                              { index: 0, label: '01. BW500 主机镜头白底正透图', specs: '1200 x 1200' },
                              { index: 1, label: '02. BW500 侧置隐藏螺圈倾角剖面', specs: '1200 x 1200' },
                              { index: 2, label: '03. BW500 120度背部插线防水塞图', specs: '1200 x 1200' },
                              { index: 3, label: '04. BW500 底盘安装特写图', specs: '1200 x 1200' },
                              { index: 4, label: '05. BW500 一体式防风雨遮罩正面图', specs: '1200 x 1200' },
                              { index: 5, label: '06. BW500 精密注塑高密机体侧照图', specs: '1200 x 1200' }
                            ].map((item) => (
                              <button
                                key={item.index}
                                onClick={() => setBw500WhiteIndex(item.index)}
                                className={`w-full flex items-center justify-between text-left px-2.5 py-1.5 rounded transition-all text-[10px] cursor-pointer ${
                                  bw500WhiteIndex === item.index
                                    ? 'bg-blue-500/10 text-blue-400 font-medium'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                <span>{item.label}</span>
                                <span className="text-[8px] font-mono text-gray-500">{item.specs}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Right Side: Responsive Slider Display */}
                        <div className="md:col-span-8 bg-black/45 border border-white/5 rounded-lg overflow-hidden relative flex flex-col justify-between h-[340px]">
                          {/* Top Tag & Stats Bar */}
                          <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-center bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded border border-white/5 text-[9px]">
                            <span className="text-gray-400 font-mono">
                              PREVIEW / 图集占比 ({(bw500WhiteIndex + 1)}/6)
                            </span>
                            <button
                              onClick={() => {
                                const whiteImages = [
                                  'https://i.postimg.cc/zG6bvMzN/1.png',
                                  'https://i.postimg.cc/W1CFzKNs/2.png',
                                  'https://i.postimg.cc/rw30sbVc/3.png',
                                  'https://i.postimg.cc/Qdw9CP88/4.png',
                                  'https://i.postimg.cc/HkRcnKYy/5.png',
                                  'https://i.postimg.cc/4xq7yMfc/6.png'
                                ];
                                const labels = [
                                  'BW500 主机镜头白底正透图',
                                  'BW500 侧置隐藏螺圈倾角剖面',
                                  'BW500 120度背部插线防水塞图',
                                  'BW500 底盘安装特写图',
                                  'BW500 一体式防风雨遮罩正面图',
                                  'BW500 精密注塑高密机体侧照图'
                                ];
                                setActiveLightboxItem({
                                  id: `bw500-white-${bw500WhiteIndex}`,
                                  title: `白底图展示 · ${labels[bw500WhiteIndex]}`,
                                  description: `小米室外摄像机 BW500 无损高清纯白背景核心制备大图。全方位呈现安防级工业美学结构。`,
                                  category: 'hd-visuals',
                                  image: whiteImages[bw500WhiteIndex],
                                  specs: '1200 x 1200 · PNG',
                                  channel: '小米商城/国际版首推黄金主图坑位'
                                });
                              }}
                              className="px-2 py-0.5 rounded bg-blue-500/20 hover:bg-blue-500 text-blue-400 hover:text-white transition-all flex items-center gap-1 font-semibold cursor-pointer"
                            >
                              <Maximize2 size={9} /> 放大无损原画
                            </button>
                          </div>

                          {/* Image Container with clickable hover effect */}
                          <div 
                            className="flex-1 flex items-center justify-center p-6 bg-[#09090d] shrink-0 relative h-full cursor-zoom-in group/img"
                            onClick={() => {
                              const whiteImages = [
                                'https://i.postimg.cc/zG6bvMzN/1.png',
                                'https://i.postimg.cc/W1CFzKNs/2.png',
                                'https://i.postimg.cc/rw30sbVc/3.png',
                                'https://i.postimg.cc/Qdw9CP88/4.png',
                                'https://i.postimg.cc/HkRcnKYy/5.png',
                                'https://i.postimg.cc/4xq7yMfc/6.png'
                              ];
                              const labels = [
                                'BW500 主机镜头白底正透图',
                                'BW500 侧置隐藏螺圈倾角剖面',
                                'BW500 120度背部插线防水塞图',
                                'BW500 底盘安装特写图',
                                'BW500 一体式防风雨遮罩正面图',
                                'BW500 精密注塑高密机体侧照图'
                              ];
                              setActiveLightboxItem({
                                id: `bw500-white-${bw500WhiteIndex}`,
                                title: `白底图展示 · ${labels[bw500WhiteIndex]}`,
                                description: `小米室外摄像机 BW500 无损高清纯白背景核心制备大图。全方位呈现安防级工业美学结构。`,
                                category: 'hd-visuals',
                                image: whiteImages[bw500WhiteIndex],
                                specs: '1200 x 1200 · PNG',
                                channel: '小米商城/国际版首推黄金主图坑位'
                              });
                            }}
                          >
                            <AnimatePresence mode="wait">
                              <motion.img
                                key={bw500WhiteIndex}
                                src={[
                                  'https://i.postimg.cc/zG6bvMzN/1.png',
                                  'https://i.postimg.cc/W1CFzKNs/2.png',
                                  'https://i.postimg.cc/rw30sbVc/3.png',
                                  'https://i.postimg.cc/Qdw9CP88/4.png',
                                  'https://i.postimg.cc/HkRcnKYy/5.png',
                                  'https://i.postimg.cc/4xq7yMfc/6.png'
                                ][bw500WhiteIndex]}
                                alt={`白底图-${bw500WhiteIndex}`}
                                referrerPolicy="no-referrer"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="max-w-full max-h-[220px] object-contain select-none group-hover/img:scale-[1.03] transition-transform duration-300"
                              />
                            </AnimatePresence>

                            {/* Beautiful hover clue banner */}
                            <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none">
                              <span className="px-3 py-1 rounded bg-[#0d0d12]/90 border border-white/10 text-white font-sans text-[10px] tracking-wide shadow flex items-center gap-1.5 backdrop-blur-sm">
                                <Maximize2 size={10} className="text-blue-400" /> 点击放大无损画质预览
                              </span>
                            </div>
                          </div>

                          {/* Control arrows overlay */}
                          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-10">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setBw500WhiteIndex((prev) => (prev === 0 ? 5 : prev - 1));
                              }}
                              className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 border border-white/5 hover:border-white/20 flex items-center justify-center text-white cursor-pointer pointer-events-auto transition-all active:scale-90"
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setBw500WhiteIndex((prev) => (prev === 5 ? 0 : prev + 1));
                              }}
                              className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 border border-white/5 hover:border-white/20 flex items-center justify-center text-white cursor-pointer pointer-events-auto transition-all active:scale-90"
                            >
                              <ChevronRight size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Tab 2: 场景图轮播展示 */}
                    {activeBw500Tab === 'scenarios' && (
                      <motion.div
                        key="scenarios"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-white/[0.01] border border-white/5 rounded-xl p-4.5"
                      >
                        {/* Left Side: Detail & Index List */}
                        <div className="md:col-span-4 flex flex-col justify-between space-y-4">
                          <div className="text-left space-y-2">
                            <span className="text-[9px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded font-bold">
                              MODULE 02
                            </span>
                            <h5 className="text-sm font-semibold text-white tracking-tight">7张生活场景全彩精置原图</h5>
                            <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                              真实生活大图、全景红外对比和高清成像渲染。为海内外宣传提供安防级工业底图，满足小红书、海外社区等多渠道深度画质覆盖。
                            </p>
                          </div>

                          {/* Interactive indices indicator list */}
                          <div className="space-y-1.5 pt-3 border-t border-white/5">
                            {[
                              { index: 0, label: '01. BW500 官方海报主视觉KV', specs: '1080 x 1440' },
                              { index: 1, label: '02. 10米超远距离夜间红外监控', specs: '1080 x 1440' },
                              { index: 2, label: '03. 本地 AI 智能算力芯片', specs: '1080 x 1440' },
                              { index: 3, label: '04. 出门离家警惕监测场景', specs: '1080 x 1440' },
                              { index: 4, label: '05. 安全回家推屏交互场景', specs: '1080 x 1440' },
                              { index: 5, label: '06. 绿色低功耗太阳能板充电', specs: '1080 x 1440' },
                              { index: 6, label: '07. 夜间全彩对比及超清红外', specs: '1080 x 1440' }
                            ].map((item) => (
                              <button
                                key={item.index}
                                onClick={() => setBw500ScenarioIndex(item.index)}
                                className={`w-full flex items-center justify-between text-left px-2.5 py-1.5 rounded transition-all text-[10px] cursor-pointer ${
                                  bw500ScenarioIndex === item.index
                                    ? 'bg-purple-500/10 text-purple-400 font-medium'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                <span>{item.label}</span>
                                <span className="text-[8px] font-mono text-gray-500">{item.specs}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Right Side: Responsive Slider Display */}
                        <div className="md:col-span-8 bg-black/45 border border-white/5 rounded-lg overflow-hidden relative flex flex-col justify-between h-[340px]">
                          {/* Top Tag & Stats Bar */}
                          <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-center bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded border border-white/5 text-[9px]">
                            <span className="text-gray-400 font-mono">
                              PREVIEW / 图集占比 ({(bw500ScenarioIndex + 1)}/7)
                            </span>
                            <button
                              onClick={() => {
                                const scImages = [
                                  'https://i.postimg.cc/nrWZ2ywr/kv.jpg',
                                  'https://i.postimg.cc/brZfZ6Np/10mi.jpg',
                                  'https://i.postimg.cc/kGL3KxB5/AI-xin-pian-(1).jpg',
                                  'https://i.postimg.cc/0jz1zt2s/chu-qu.jpg',
                                  'https://i.postimg.cc/7h5r5BY6/hui-jia.jpg',
                                  'https://i.postimg.cc/C59TkjzL/tai-yang-neng-ban.jpg',
                                  'https://i.postimg.cc/Gt4n4Mhw/dui-bi.jpg'
                                ];
                                const labels = [
                                  'BW500 官方海报主视觉KV',
                                  'BW500 10米超远距离夜间红外监控',
                                  'BW500 本地 AI 智能算力芯片',
                                  'BW500 出门离家警惕监测场景',
                                  'BW500 安全回家推屏交互场景',
                                  'BW500 绿色低功耗太阳能板充电组合',
                                  'BW500 夜间全彩对比及超清红外展示'
                                ];
                                setActiveLightboxItem({
                                  id: `bw500-scene-${bw500ScenarioIndex}`,
                                  title: `BW500 室外场景 · ${labels[bw500ScenarioIndex]}`,
                                  description: `超清安防高拟真野外全彩与夜视影像。对齐海内外同步上线、海外Global与国内两套宣发特写的极致精度。`,
                                  category: 'scenes',
                                  image: scImages[bw500ScenarioIndex],
                                  specs: '1080 x 1440 · JPG',
                                  channel: '海内外首推线上配图 / 全媒体种草 / 户外宣传巨幅'
                                });
                              }}
                              className="px-2 py-0.5 rounded bg-purple-500/20 hover:bg-purple-500 text-purple-400 hover:text-white transition-all flex items-center gap-1 font-semibold cursor-pointer"
                            >
                              <Maximize2 size={9} /> 放大无损原画
                            </button>
                          </div>

                          {/* Image Container with clickable hover effect */}
                          <div 
                            className="flex-1 flex items-center justify-center p-4 bg-[#09090d] shrink-0 relative h-full cursor-zoom-in group/img"
                            onClick={() => {
                              const scImages = [
                                'https://i.postimg.cc/nrWZ2ywr/kv.jpg',
                                'https://i.postimg.cc/brZfZ6Np/10mi.jpg',
                                'https://i.postimg.cc/kGL3KxB5/AI-xin-pian-(1).jpg',
                                'https://i.postimg.cc/0jz1zt2s/chu-qu.jpg',
                                'https://i.postimg.cc/7h5r5BY6/hui-jia.jpg',
                                'https://i.postimg.cc/C59TkjzL/tai-yang-neng-ban.jpg',
                                'https://i.postimg.cc/Gt4n4Mhw/dui-bi.jpg'
                              ];
                              const labels = [
                                'BW500 官方海报主视觉KV',
                                'BW500 10米超远距离夜间红外监控',
                                'BW500 本地 AI 智能算力芯片',
                                'BW500 出门离家警惕监测场景',
                                'BW500 安全回家推屏交互场景',
                                'BW500 绿色低功耗太阳能板充电组合',
                                'BW500 夜间全彩对比及超清红外展示'
                              ];
                              setActiveLightboxItem({
                                id: `bw500-scene-${bw500ScenarioIndex}`,
                                title: `BW500 室外场景 · ${labels[bw500ScenarioIndex]}`,
                                description: `超清安防高拟真野外全彩与夜视影像。对齐海内外同步上线、海外Global与国内两套宣发特写的极致精度。`,
                                category: 'scenes',
                                image: scImages[bw500ScenarioIndex],
                                specs: '1080 x 1440 · JPG',
                                channel: '海内外首推线上配图 / 全媒体种草 / 户外宣传巨幅'
                              });
                            }}
                          >
                            <AnimatePresence mode="wait">
                              <motion.img
                                key={bw500ScenarioIndex}
                                src={[
                                  'https://i.postimg.cc/nrWZ2ywr/kv.jpg',
                                  'https://i.postimg.cc/brZfZ6Np/10mi.jpg',
                                  'https://i.postimg.cc/kGL3KxB5/AI-xin-pian-(1).jpg',
                                  'https://i.postimg.cc/0jz1zt2s/chu-qu.jpg',
                                  'https://i.postimg.cc/7h5r5BY6/hui-jia.jpg',
                                  'https://i.postimg.cc/C59TkjzL/tai-yang-neng-ban.jpg',
                                  'https://i.postimg.cc/Gt4n4Mhw/dui-bi.jpg'
                                ][bw500ScenarioIndex]}
                                alt={`场景图-${bw500ScenarioIndex}`}
                                referrerPolicy="no-referrer"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="max-w-full max-h-[220px] object-contain select-none group-hover/img:scale-[1.03] transition-transform duration-300"
                              />
                            </AnimatePresence>

                            {/* Beautiful hover clue banner */}
                            <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none">
                              <span className="px-3 py-1 rounded bg-[#0d0d12]/90 border border-white/10 text-white font-sans text-[10px] tracking-wide shadow flex items-center gap-1.5 backdrop-blur-sm">
                                <Maximize2 size={10} className="text-purple-400" /> 点击放大无损画质预览
                              </span>
                            </div>
                          </div>

                          {/* Control arrows overlay */}
                          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-10">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setBw500ScenarioIndex((prev) => (prev === 0 ? 6 : prev - 1));
                              }}
                              className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 border border-white/5 hover:border-white/20 flex items-center justify-center text-white cursor-pointer pointer-events-auto transition-all active:scale-90"
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setBw500ScenarioIndex((prev) => (prev === 6 ? 0 : prev + 1));
                              }}
                              className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 border border-white/5 hover:border-white/20 flex items-center justify-center text-white cursor-pointer pointer-events-auto transition-all active:scale-90"
                            >
                              <ChevronRight size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Tab 3: 新媒体推广展示 */}
                    {activeBw500Tab === 'newmedia' && (
                      <motion.div
                        key="newmedia"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-white/[0.01] border border-white/5 rounded-xl p-4.5"
                      >
                        {/* Left Side: Detail & Index List */}
                        <div className="md:col-span-4 flex flex-col justify-between space-y-4">
                          <div className="text-left space-y-2">
                            <span className="text-[9px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded font-bold">
                              MODULE 03
                            </span>
                            <h5 className="text-sm font-semibold text-white tracking-tight">9张新媒体营销长图/精品九宫格</h5>
                            <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                              精美的新媒体九宫格切片大图。为微信社群、朋友圈爆款和多端互动宣发布线，降低买家认知壁垒，提升决策转化。
                            </p>
                          </div>

                          {/* Interactive indices indicator list */}
                          <div className="space-y-1.5 pt-3 border-t border-white/5 max-h-[190px] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                            {[
                              { index: 0, label: '01. 新媒体九宫格宣介图一', specs: '1000 x 1000' },
                              { index: 1, label: '02. 新媒体九宫格宣介图二', specs: '1000 x 1000' },
                              { index: 2, label: '03. 新媒体九宫格宣介图三', specs: '1000 x 1000' },
                              { index: 3, label: '04. 新媒体九宫格宣介图四', specs: '1000 x 1000' },
                              { index: 4, label: '05. 新媒体九宫格宣介图五', specs: '1000 x 1000' },
                              { index: 5, label: '06. 新媒体九宫格宣介图六', specs: '1000 x 1000' },
                              { index: 6, label: '07. 新媒体九宫格宣介图七', specs: '1000 x 1000' },
                              { index: 7, label: '08. 新媒体九宫格宣介图八', specs: '1000 x 1000' },
                              { index: 8, label: '09. 新媒体九宫格宣介图九', specs: '1000 x 1000' }
                            ].map((item) => (
                              <button
                                key={item.index}
                                onClick={() => setBw500NewMediaIndex(item.index)}
                                className={`w-full flex items-center justify-between text-left px-2.5 py-1.5 rounded transition-all text-[10px] cursor-pointer ${
                                  bw500NewMediaIndex === item.index
                                    ? 'bg-indigo-500/10 text-indigo-400 font-medium'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                <span>{item.label}</span>
                                <span className="text-[8px] font-mono text-gray-500">{item.specs}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Right Side: Responsive Slider Display */}
                        <div className="md:col-span-8 bg-black/45 border border-white/5 rounded-lg overflow-hidden relative flex flex-col justify-between h-[340px]">
                          {/* Top Tag & Stats Bar */}
                          <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-center bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded border border-white/5 text-[9px]">
                            <span className="text-gray-400 font-mono">
                              PREVIEW / 图集占比 ({(bw500NewMediaIndex + 1)}/9)
                            </span>
                            <button
                              onClick={() => {
                                const camMediaImages = [
                                  'https://i.postimg.cc/wMNHWf88/chan-pin-jiu-tu-01.jpg',
                                  'https://i.postimg.cc/WzZj9WLR/chan-pin-jiu-tu-02.jpg',
                                  'https://i.postimg.cc/FzSmPW5X/chan-pin-jiu-tu-03.jpg',
                                  'https://i.postimg.cc/0jSxtWRq/chan-pin-jiu-tu-04.jpg',
                                  'https://i.postimg.cc/Wpq2b3DJ/chan-pin-jiu-tu-05.jpg',
                                  'https://i.postimg.cc/J7H14nyk/chan-pin-jiu-tu-06.jpg',
                                  'https://i.postimg.cc/Df42yZWd/chan-pin-jiu-tu-07.jpg',
                                  'https://i.postimg.cc/PfvtrxLb/chan-pin-jiu-tu-08.jpg',
                                  'https://i.postimg.cc/ryR8FmdP/chan-pin-jiu-tu-09.jpg'
                                ];
                                const labels = [
                                  'BW500 新媒体九宫格宣介图 01',
                                  'BW500 新媒体九宫格宣介图 02',
                                  'BW500 新媒体九宫格宣介图 03',
                                  'BW500 新媒体九宫格宣介图 04',
                                  'BW500 新媒体九宫格宣介图 05',
                                  'BW500 新媒体九宫格宣介图 06',
                                  'BW500 新媒体九宫格宣介图 07',
                                  'BW500 新媒体九宫格宣介图 08',
                                  'BW500 新媒体九宫格宣介图 09'
                                ];
                                setActiveLightboxItem({
                                  id: `bw500-media-${bw500NewMediaIndex}`,
                                  title: labels[bw500NewMediaIndex],
                                  description: `九宫格精剪社群与主流社交平台种草宣传图。生动渲染、强力覆盖用户决策场景细节。`,
                                  category: 'campaign',
                                  image: camMediaImages[bw500NewMediaIndex],
                                  specs: '1000 x 1000 · JPG',
                                  channel: '小红书种草、社群宣发、微信朋友圈宣介柜'
                                });
                              }}
                              className="px-2 py-0.5 rounded bg-indigo-500/20 hover:bg-indigo-500 text-indigo-400 hover:text-white transition-all flex items-center gap-1 font-semibold cursor-pointer"
                            >
                              <Maximize2 size={9} /> 放大无损原画
                            </button>
                          </div>

                          {/* Image Container with clickable hover effect */}
                          <div 
                            className="flex-1 flex items-center justify-center p-4 bg-[#09090d] shrink-0 relative h-full cursor-zoom-in group/img"
                            onClick={() => {
                              const camMediaImages = [
                                'https://i.postimg.cc/wMNHWf88/chan-pin-jiu-tu-01.jpg',
                                'https://i.postimg.cc/WzZj9WLR/chan-pin-jiu-tu-02.jpg',
                                'https://i.postimg.cc/FzSmPW5X/chan-pin-jiu-tu-03.jpg',
                                'https://i.postimg.cc/0jSxtWRq/chan-pin-jiu-tu-04.jpg',
                                'https://i.postimg.cc/Wpq2b3DJ/chan-pin-jiu-tu-05.jpg',
                                'https://i.postimg.cc/J7H14nyk/chan-pin-jiu-tu-06.jpg',
                                'https://i.postimg.cc/Df42yZWd/chan-pin-jiu-tu-07.jpg',
                                'https://i.postimg.cc/PfvtrxLb/chan-pin-jiu-tu-08.jpg',
                                'https://i.postimg.cc/ryR8FmdP/chan-pin-jiu-tu-09.jpg'
                              ];
                              const labels = [
                                'BW500 新媒体九宫格宣介图 01',
                                'BW500 新媒体九宫格宣介图 02',
                                'BW500 新媒体九宫格宣介图 03',
                                'BW500 新媒体九宫格宣介图 04',
                                'BW500 新媒体九宫格宣介图 05',
                                'BW500 新媒体九宫格宣介图 06',
                                'BW500 新媒体九宫格宣介图 07',
                                'BW500 新媒体九宫格宣介图 08',
                                'BW500 新媒体九宫格宣介图 09'
                              ];
                              setActiveLightboxItem({
                                id: `bw500-media-${bw500NewMediaIndex}`,
                                title: labels[bw500NewMediaIndex],
                                description: `九宫格精剪社群与主流社交平台种草宣传图。生动渲染、强力覆盖用户决策场景细节。`,
                                category: 'campaign',
                                image: camMediaImages[bw500NewMediaIndex],
                                specs: '1000 x 1000 · JPG',
                                channel: '小红书种草、社群宣发、微信朋友圈宣介柜'
                              });
                            }}
                          >
                            <AnimatePresence mode="wait">
                              <motion.img
                                key={bw500NewMediaIndex}
                                src={[
                                  'https://i.postimg.cc/wMNHWf88/chan-pin-jiu-tu-01.jpg',
                                  'https://i.postimg.cc/WzZj9WLR/chan-pin-jiu-tu-02.jpg',
                                  'https://i.postimg.cc/FzSmPW5X/chan-pin-jiu-tu-03.jpg',
                                  'https://i.postimg.cc/0jSxtWRq/chan-pin-jiu-tu-04.jpg',
                                  'https://i.postimg.cc/Wpq2b3DJ/chan-pin-jiu-tu-05.jpg',
                                  'https://i.postimg.cc/J7H14nyk/chan-pin-jiu-tu-06.jpg',
                                  'https://i.postimg.cc/Df42yZWd/chan-pin-jiu-tu-07.jpg',
                                  'https://i.postimg.cc/PfvtrxLb/chan-pin-jiu-tu-08.jpg',
                                  'https://i.postimg.cc/ryR8FmdP/chan-pin-jiu-tu-09.jpg'
                                ][bw500NewMediaIndex]}
                                alt={`新媒体图-${bw500NewMediaIndex}`}
                                referrerPolicy="no-referrer"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="max-w-full max-h-[220px] object-contain select-none group-hover/img:scale-[1.03] transition-transform duration-300"
                              />
                            </AnimatePresence>

                            {/* Beautiful hover clue banner */}
                            <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none">
                              <span className="px-3 py-1 rounded bg-[#0d0d12]/90 border border-white/10 text-white font-sans text-[10px] tracking-wide shadow flex items-center gap-1.5 backdrop-blur-sm">
                                <Maximize2 size={10} className="text-indigo-400" /> 点击放大无损画质预览
                              </span>
                            </div>
                          </div>

                          {/* Control arrows overlay */}
                          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-10">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setBw500NewMediaIndex((prev) => (prev === 0 ? 8 : prev - 1));
                              }}
                              className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 border border-white/5 hover:border-white/20 flex items-center justify-center text-white cursor-pointer pointer-events-auto transition-all active:scale-90"
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setBw500NewMediaIndex((prev) => (prev === 8 ? 0 : prev + 1));
                              }}
                              className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 border border-white/5 hover:border-white/20 flex items-center justify-center text-white cursor-pointer pointer-events-auto transition-all active:scale-90"
                            >
                              <ChevronRight size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Tab 4: 详情页展示 */}
                    {activeBw500Tab === 'details' && (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-white/[0.01] border border-white/5 rounded-xl p-4.5"
                      >
                        {/* Left Side: Detail Info & Launch Button */}
                        <div className="md:col-span-4 flex flex-col justify-between space-y-4">
                          <div className="text-left space-y-2">
                            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">
                              MODULE 04
                            </span>
                            <h5 className="text-sm font-semibold text-white tracking-tight">4. 详情页展示</h5>
                            <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                              小米室外摄像头 BW500 官方上市爆款商详拼接长幅，共由 29 张高清切片深度拼合而成。
                            </p>
                            <p className="text-[11px] text-gray-500 font-sans leading-relaxed">
                              由黄友情策划执笔，生动挖掘500万极清、智能全彩夜视、超强电池续航及本地AI看护等安防大单发售亮点，极力提升电商决策转化。
                            </p>
                          </div>

                          <div className="pt-3 border-t border-white/5 space-y-3">
                            <div className="bg-black/40 p-3 rounded border border-white/5 space-y-1">
                              <div className="text-[10px] text-gray-400">商详切片总数</div>
                              <div className="text-lg font-mono font-bold text-emerald-400">29 张拼接大长页</div>
                            </div>
                            <button
                              onClick={() => {
                                setActiveLightboxItem({
                                  id: 'mat-detail-bw500',
                                  title: '小米室外摄像头 BW500 商品详情页 (29张切片拼接)',
                                  description: '小米室外摄像头 BW500 官方上市爆款商详拼接大图，共 29 张高清高保真切片，由黄友情策划执笔，呈现高清晰度室外看护与强劲电池续航防范亮点。',
                                  category: 'campaign',
                                  image: 'https://i.postimg.cc/26yG4gpT/xiao-mi-shi-wai-she-xiang-tou-BW500-790-01.jpg',
                                  slices: BW500_SLICES,
                                  specs: '29高清切片 · 790w极清',
                                  channel: '官方详情页展示 / 29切片长图'
                                });
                              }}
                              className="w-full py-2 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white transition-all text-[11px] font-bold rounded flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                            >
                              <Maximize2 size={11} /> 启动全画幅沉浸阅读
                            </button>
                          </div>
                        </div>

                        {/* Right Side: Scrollable Long Image Container */}
                        <div className="md:col-span-8 bg-black/45 border border-white/5 rounded-lg overflow-hidden relative flex flex-col h-[340px]">
                          {/* Top Status Clue bar */}
                          <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-center bg-black/85 backdrop-blur-md px-2.5 py-1.5 rounded border border-white/5 text-[9px] select-none">
                            <span className="text-gray-400 font-mono">
                              PREVIEW / BW500 商详长页滚动预览
                            </span>
                            <span className="text-emerald-400 font-mono animate-pulse flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                              ↕ 鼠标悬浮滚动
                            </span>
                          </div>

                          {/* Scrollable Slices Wrapper */}
                          <div 
                            onClick={() => {
                              setActiveLightboxItem({
                                id: 'mat-detail-bw500',
                                title: '小米室外摄像头 BW500 商品详情页 (29张切片拼接)',
                                description: '小米室外摄像头 BW500 官方上市爆款商详拼接大图，共 29 张高清高保真切片，由黄友情策划执笔，呈现高清晰度室外看护与强劲电池续航防范亮点。',
                                category: 'campaign',
                                image: 'https://i.postimg.cc/26yG4gpT/xiao-mi-shi-wai-she-xiang-tou-BW500-790-01.jpg',
                                slices: BW500_SLICES,
                                specs: '29高清切片 · 790w极清',
                                channel: '官方详情页展示 / 29切片长图'
                              });
                            }}
                            className="flex-1 overflow-y-auto bg-[#09090d] p-3 pt-12 relative cursor-zoom-in group/img"
                            style={{ scrollbarWidth: 'thin' }}
                          >
                            <div className="flex flex-col w-full max-w-[420px] mx-auto shadow-2xl border border-white/5 rounded overflow-hidden">
                              {BW500_SLICES.map((url, idx) => (
                                <img
                                  key={idx}
                                  src={url}
                                  alt={`BW500 slice ${idx + 1}`}
                                  className="w-full h-auto block select-none border-0"
                                  loading="lazy"
                                  referrerPolicy="no-referrer"
                                />
                              ))}
                            </div>
                            
                            {/* Hover scale overlay banner */}
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                              <span className="px-3 py-1.5 bg-black/80 text-white border border-white/10 rounded text-[10px] font-medium backdrop-blur-xs flex items-center gap-1.5">
                                <Maximize2 size={11} className="text-emerald-400" /> 点击启动全画幅大图拼接阅读
                              </span>
                            </div>
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none flex items-end justify-center pb-2 rounded-b-lg">
                            <span className="text-[8px] font-mono text-emerald-400 select-none tracking-widest uppercase">↕ Scroll To Explore / 29 连图切片滚动 ↕</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer and Return buttons */}
                <div className="border-t border-white/5 pt-5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-gray-500">© XIAOMI SECURITY BW500 OUTSIDE CAMERA GTM VERIFIED</span>
                  <button
                    onClick={() => setActiveSubProjectDetail(null)}
                    className="px-5 py-2 rounded-full bg-white text-black hover:bg-gray-200 text-xs font-bold transition-all cursor-pointer"
                  >
                    关闭并返回
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* 5. Immersive Detailed GTM Launch Case Study for Mijia Smart Pet Water Dispenser 2 */}
        {activeSubProjectDetail === 'water_dispenser' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSubProjectDetail(null)}
              className="absolute inset-0 bg-[#040407]/95"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 160 }}
              className="relative w-full max-w-5xl h-[90vh] bg-[#0d0d12] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
            >
              {/* Modal Banner Title */}
              <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/5 bg-[#08080c] select-none">
                <div className="text-left">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-1">
                    🎯 BRAND GTM STUDY / 智能宠物硬件定价宣发全案
                  </div>
                  <h3 className="text-base sm:text-l font-display font-semibold text-white tracking-tight">
                    米家智能宠物饮水机 2
                  </h3>
                </div>
                <button
                  onClick={() => setActiveSubProjectDetail(null)}
                  className="w-9 h-9 rounded-full border border-white/10 hover:border-white/30 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer shadow"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable Layout Context */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-7 bg-[#08080d]/30 text-left animate-fade-in" style={{ scrollbarWidth: 'thin' }}>
                
                {/* 3-Column specs, challenges & solutions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <div className="bg-[#111117] border border-white/5 rounded-xl p-4.5 shadow-md">
                    <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-white/5 select-none">
                      <span className="text-emerald-400 text-sm">📋</span>
                      <h4 className="text-[11px] font-mono font-extrabold tracking-wider text-[#a1a1aa] uppercase">
                        项目背景与定位
                      </h4>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                        <span className="text-[10px] text-emerald-400 font-bold block mb-1">1. 百亿宠物市场下沉突围</span>
                        <p className="text-[11px] text-gray-300 leading-relaxed font-sans font-light">
                          宠物市场极序扩张，新兴白牌以超低售价抢占大盘。用户迫切渴望一款兼具小米软硬件品牌张力、又具备强竞争力售价的极简智能饮水机。
                        </p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                        <span className="text-[10px] text-indigo-400 font-bold block mb-1">2. 两年黄金迭代期</span>
                        <p className="text-[11px] text-gray-300 leading-relaxed font-sans font-light">
                          米家智能宠物饮水机初代已经发售长达两年，是时候推出升级款二代，运用更具粘性的智能化互联体验与自研过滤阻力技术，重新收拢大众养宠视野。
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#171113] border border-red-500/10 rounded-xl p-4.5 shadow-md">
                    <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-white/5 select-none">
                      <span className="text-red-400 text-sm">⚠️</span>
                      <h4 className="text-[11px] font-mono font-extrabold tracking-wider text-[#a1a1aa] uppercase">
                        核心攻坚难点
                      </h4>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-red-500/5 p-3 rounded-lg border border-red-500/10">
                        <span className="text-[10px] text-red-400 font-bold block mb-1">1. 严苛利润率下的微调定价</span>
                        <p className="text-[11px] text-gray-300 leading-relaxed font-sans font-light">
                          如何在顺应大众玩家低价预期的同时，扣除高昂的零部件工艺、物流耗损后，仍为生态链和小米平台保留健康的毛利红线，测算极为艰难。
                        </p>
                      </div>
                      <div className="bg-red-500/5 p-3 rounded-lg border border-red-500/10">
                        <span className="text-[10px] text-red-400 font-bold block mb-1">2. 跨生态服务阻截与老品承接</span>
                        <p className="text-[11px] text-gray-300 leading-relaxed font-sans font-light">
                          在首发筹备同时，必须同步承接和维护前代老饮水机的服务。该老品最初是非我司研发的第三方生态链合伙企业推广，跨多方对齐协作链路极长，极易发生客诉断点。
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#111711] border border-green-500/10 rounded-xl p-4.5 shadow-md">
                    <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-white/5 select-none">
                      <span className="text-green-400 text-sm">💡</span>
                      <h4 className="text-[11px] font-mono font-extrabold tracking-wider text-[#a1a1aa] uppercase">
                        立体破局解法
                      </h4>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-green-500/3 p-3 rounded-lg border border-green-500/10 text-[10.5px]">
                        <span className="text-[10px] text-green-400 font-bold block mb-0.5">1. 四维卡点定价模型</span>
                        <p className="text-gray-300 leading-relaxed font-light font-sans">
                          综合Bom成本剪裁、线上竞品日监控、小米返利收益模型及渠道空间进行深度交叉测算，定格小米级“击穿偏好”黄金售价。
                        </p>
                      </div>
                      <div className="bg-green-500/3 p-3 rounded-lg border border-green-500/10 text-[10.5px]">
                        <span className="text-[10px] text-green-400 font-bold block mb-0.5">2. 一站式跨公司责任拉通</span>
                        <p className="text-gray-300 leading-relaxed font-light font-sans">
                          牵头拉通小米云端产品经理、老品代工厂及我司服务部门，建立三方直连敏捷处理舱，使老品客诉无阻流转，为二代轻装首发斩获最良性的口碑。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing Calculator Tool (四维定价精算仿真) */}
                <div className="bg-[#0f0e13] border border-white/5 rounded-xl p-5 text-left">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
                    <Sparkles size={14} className="text-emerald-400 animate-pulse" />
                    <div>
                      <h4 className="text-xs font-semibold text-white">米家智能宠物饮水机 2 多维定价精算仿真器</h4>
                      <span className="text-[9.5px] text-gray-500 font-mono">DYNAMIC PRICING & MARGIN CALCULUS MODEL</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-black/30 p-4.5 rounded-lg border border-white/5">
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 block mb-1.5">
                          1. 零部件制造成本 (BOM): <span className="text-emerald-400 font-mono text-xs">¥{dispenserBom}</span>
                        </label>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setDispenserBom(Math.max(45, dispenserBom - 5))} 
                            className="w-7 h-7 bg-white/5 hover:bg-white/10 text-white rounded font-bold transition-all text-xs border border-white/10"
                          >
                            -
                          </button>
                          <input 
                            type="range" min="45" max="95" step="5" value={dispenserBom} 
                            onChange={(e) => setDispenserBom(Number(e.target.value))}
                            className="flex-1 accent-emerald-500" 
                          />
                          <button 
                            onClick={() => setDispenserBom(Math.min(95, dispenserBom + 5))} 
                            className="w-7 h-7 bg-white/5 hover:bg-white/10 text-white rounded font-bold transition-all text-xs border border-white/10"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-[9px] text-gray-600 block mt-1">控制低电压无线泵、自研过滤层工艺成本</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 block mb-1.5">
                          2. 拟定众筹零售价 (Price): <span className="text-indigo-400 font-mono text-xs">¥{dispenserRetail}</span>
                        </label>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setDispenserRetail(Math.max(99, dispenserRetail - 10))} 
                            className="w-7 h-7 bg-white/5 hover:bg-white/10 text-white rounded font-bold transition-all text-xs border border-white/10"
                          >
                            -
                          </button>
                          <input 
                            type="range" min="99" max="199" step="10" value={dispenserRetail} 
                            onChange={(e) => setDispenserRetail(Number(e.target.value))}
                            className="flex-1 accent-indigo-500" 
                          />
                          <button 
                            onClick={() => setDispenserRetail(Math.min(199, dispenserRetail + 10))} 
                            className="w-7 h-7 bg-white/5 hover:bg-white/10 text-white rounded font-bold transition-all text-xs border border-white/10"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-[9px] text-gray-600 block mt-1">行业新兴竞品常规定价: ¥149元</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 block mb-1.5">
                          3. 小米平台分成比例 (Cut): <span className="text-purple-400 font-mono text-xs">{dispenserXiaomiCut}%</span>
                        </label>
                        <div className="flex gap-2">
                          {[15, 20, 25].map((ct) => (
                            <button
                              key={ct}
                              onClick={() => setDispenserXiaomiCut(ct)}
                              className={`flex-1 py-1 text-center rounded border transition-all text-[10px] font-mono font-bold ${
                                dispenserXiaomiCut === ct 
                                  ? 'bg-purple-600/30 border-purple-500 text-purple-400' 
                                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                              }`}
                            >
                              {ct}%
                            </button>
                          ))}
                        </div>
                        <span className="text-[9px] text-gray-600 block mt-1.5">小米服务抽成比例</span>
                      </div>
                    </div>
                  </div>

                  {/* Simulator Results Output */}
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-white/[0.02] border border-white/5 rounded p-3 text-center">
                      <span className="text-[9px] text-gray-500 block">比竞品低廉价格差</span>
                      <span className="text-sm font-mono font-extrabold text-green-400 mt-1 block">
                        -{Math.round((1 - dispenserRetail / 149) * 100)}%
                      </span>
                      <span className="text-[8px] text-gray-600">低价高品的吸引力指数</span>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 rounded p-3 text-center">
                      <span className="text-[9px] text-gray-500 block">小米平台抽成费用</span>
                      <span className="text-sm font-mono font-extrabold text-purple-400 mt-1 block">
                        ¥{Math.round((dispenserRetail * dispenserXiaomiCut) / 100)}
                      </span>
                      <span className="text-[8px] text-gray-600">分配给渠道的基础流转费</span>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 rounded p-3 text-center">
                      <span className="text-[9px] text-gray-500 block">生态链净利润空间</span>
                      <span className="text-sm font-mono font-extrabold text-blue-400 mt-1 block">
                        ¥{Math.round(dispenserRetail - dispenserBom - (dispenserRetail * dispenserXiaomiCut) / 100)}
                      </span>
                      <span className="text-[8px] text-gray-600">公司留底直接毛利</span>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 rounded p-3 text-center">
                      <span className="text-[9px] text-gray-500 block">综合硬件毛利率</span>
                      <span className="text-sm font-mono font-extrabold text-amber-400 mt-1 block">
                        {Math.max(0, Math.round(((dispenserRetail - dispenserBom - (dispenserRetail * dispenserXiaomiCut) / 100) / dispenserRetail) * 100))}%
                      </span>
                      <span className="text-[8px] text-gray-600">
                        {((dispenserRetail - dispenserBom - (dispenserRetail * dispenserXiaomiCut) / 100) / dispenserRetail) * 100 > 20 
                          ? '✅ 优秀！契合硬性发售指标' 
                          : '⚠️ 偏紧！建议轻微剪裁BOM'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* GTM Workflow Timeline for Water Dispenser 2 */}
                <div>
                  <div className="flex items-center gap-2 mb-3 pb-1.5 border-b border-white/5 select-none">
                    <span className="text-purple-400 text-sm">⏱️</span>
                    <h4 className="text-[11px] font-mono font-extrabold tracking-wider text-[#a1a1aa] uppercase">
                      小米智能宠物饮水机 2 · 上市核心策划路线
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    {[
                      { stage: 'STAGE 01', time: 'W1 - W2', title: '多维精筹定价测算', desc: '模拟原材料与耗损，与小米平台打通抽成系数，锁死利润底线，拟定爆品级底价策略。' },
                      { stage: 'STAGE 02', time: 'W3 - W4', title: '跨生态三方沟通拉通', desc: '成立承接专项舱，与初代老品供应商及服务台对齐工单。解决客服交割障碍。' },
                      { stage: 'STAGE 03', time: 'W5 - W6', title: '智能水路视觉定案', desc: '输出3D内部渲染、无感水泵水路分离精细透视图，彩盒印制材质完成打样验收。' },
                      { stage: 'STAGE 04', time: 'W7 - W8', title: '米家发售爆款合围', desc: '众筹一站式上架。锁定主流宠物社区、小红书健康饮水痛点进行科普矩阵轰炸。' }
                    ].map((step, idx) => (
                      <div key={idx} className="bg-white/[0.01] border border-white/5 rounded-lg p-3.5 hover:border-emerald-500/20 transition-all text-[11px]">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-bold">{step.stage}</span>
                          <span className="text-gray-500 font-mono text-[9px]">{step.time}</span>
                        </div>
                        <h5 className="font-semibold text-white mb-1.5">{step.title}</h5>
                        <p className="text-gray-400 font-light leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Materials Showcase Section (四维企划图素超级展示舱) */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-2 border-b border-white/5 select-none text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 text-sm">🖼️</span>
                      <div>
                        <h4 className="text-[12px] font-mono font-extrabold tracking-wider text-[#e4e4e7] uppercase">
                          米家宠物饮水机 2 代上市企划核心物料展示舱
                        </h4>
                        <span className="text-[9px] font-mono text-gray-500">DIGITAL MARKETING & DESIGN GTM CONTAINER</span>
                      </div>
                    </div>
                    
                    {/* 5 Tabs Selector */}
                    <div className="flex flex-wrap gap-1 bg-black/30 p-1 rounded-lg border border-white/5">
                      {[
                        { id: 'video', label: '0. 企划首发视频' },
                        { id: 'white-bg', label: '1. 白底图轮播 (5)' },
                        { id: 'scenarios', label: '2. 场景图轮播 (10)' },
                        { id: 'details', label: '3. 中英详情配件' },
                        { id: 'marketing', label: '4. 营销玩法推广' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveDispenserTab(tab.id)}
                          className={`px-3 py-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer ${
                            activeDispenserTab === tab.id
                              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold'
                              : 'border border-transparent text-gray-450 text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {/* Tab 0: 企划首发视频 */}
                    {activeDispenserTab === 'video' && (
                      <motion.div
                        key="video"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-white/[0.01] border border-white/5 rounded-xl p-4.5"
                      >
                        {/* Left Side: Video Info & Actions */}
                        <div className="md:col-span-4 flex flex-col justify-between space-y-4">
                          <div className="text-left space-y-2">
                            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">
                              VIDEO SHOWCASE
                            </span>
                            <h5 className="text-sm font-semibold text-white tracking-tight">米家智能宠物饮水机 2 企划首发视频</h5>
                            <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                              极致优雅的 3D 写实渲染与实际场景互动相结合，生动演绎第二代饮水机颠覆式“水电分离”的硬核安全科技。
                            </p>
                            <p className="text-[11px] text-gray-500 font-sans leading-relaxed">
                              本视频由黄友情带领策划团队，多向度呈现机身提拉秒断电、水质净化科学滤芯以及智能联动无感保障等，旨在以高质感视觉击穿消费者转化。
                            </p>
                          </div>

                          <div className="pt-3 border-t border-white/5 space-y-3">
                            <div className="grid grid-cols-2 gap-2 text-left">
                              <div className="bg-black/40 p-2 rounded border border-white/5">
                                <span className="text-[8px] text-gray-500 block">视频解析度</span>
                                <span className="text-[10px] font-mono font-bold text-emerald-400">1080P 超清</span>
                              </div>
                              <div className="bg-black/40 p-2 rounded border border-white/5">
                                <span className="text-[8px] text-gray-500 block">播放时长</span>
                                <span className="text-[10px] font-mono font-bold text-emerald-400">00:54 精华版</span>
                              </div>
                            </div>
                            
                            <a
                              href="https://202606241.oss-cn-shanghai.aliyuncs.com/video/%E7%B1%B3%E5%AE%B6%E5%AE%A0%E7%89%A9%E9%A5%AE%E6%B0%B4%E6%9C%BA-1080P.mp4"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white transition-all text-[11px] font-bold rounded flex items-center justify-center gap-1.5 cursor-pointer shadow-sm text-center"
                            >
                              <Globe size={11} /> 🔗 新标签页直接流畅播放
                            </a>
                          </div>
                        </div>

                        {/* Right Side: Responsive Video Player Frame */}
                        <div className="md:col-span-8 bg-black/60 border border-white/5 rounded-lg overflow-hidden relative flex flex-col h-[340px]">
                          {/* Top bar control / info */}
                          <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-center bg-black/80 backdrop-blur-md px-2.5 py-1.5 rounded border border-white/5 text-[9px] select-none">
                            <span className="text-gray-400 font-mono flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                              PREVIEW / 米家宠物饮水机 2 官方视频
                            </span>
                            <span className="text-emerald-400 font-mono text-[8px] uppercase">
                              Aliyun OSS Stream
                            </span>
                          </div>

                          {/* Video player canvas */}
                          <div className="flex-1 w-full h-full pt-12 pb-2 px-2 relative bg-black/95 flex items-center justify-center">
                            {dispenserVideoError ? (
                              <div className="flex flex-col items-center justify-center text-center p-4 space-y-2.5 max-w-md">
                                <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center text-red-400">
                                  <AlertCircle size={18} />
                                </div>
                                <div className="space-y-1">
                                  <h6 className="text-[11px] font-semibold text-white">视频加载受阻 (阿里云OSS跨域或权限限制)</h6>
                                  <p className="text-[9px] text-gray-400 leading-relaxed font-light">
                                    浏览器安全沙箱或阿里云OSS权限策略拦截了在当前预览域名下的直接播放。
                                  </p>
                                </div>
                                <div className="bg-black/30 border border-white/5 p-2 rounded text-[8px] text-gray-500 text-left w-full space-y-1 font-sans">
                                  <div className="flex items-start gap-1">
                                    <span className="text-red-400 font-bold">•</span>
                                    <span><strong>403 权限保护 (私有Bucket)</strong>：如果是私有存储桶且不含有效临时签名（Expires、Signature），会返回403 Forbidden错误。</span>
                                  </div>
                                  <div className="flex items-start gap-1">
                                    <span className="text-red-400 font-bold">•</span>
                                    <span><strong>跨域规则 (CORS)</strong>：请前往阿里云OSS控制台的「数据安全 - 跨域设置」允许当前来源网站。</span>
                                  </div>
                                  <div className="flex items-start gap-1">
                                    <span className="text-red-400 font-bold">•</span>
                                    <span><strong>防盗链拦截</strong>：请检查OSS是否启用了Referer白名单限制。</span>
                                  </div>
                                </div>
                                <div className="flex gap-2 pt-1 w-full font-sans">
                                  <button
                                    onClick={() => {
                                      setDispenserVideoError(false);
                                    }}
                                    className="flex-1 py-1.5 bg-white/10 hover:bg-white/15 text-white transition-all text-[9px] font-medium rounded border border-white/5 cursor-pointer"
                                  >
                                    重新尝试
                                  </button>
                                  <a
                                    href="https://202606241.oss-cn-shanghai.aliyuncs.com/video/%E7%B1%B3%E5%AE%B6%E5%AE%A0%E7%89%A9%E9%A5%AE%E6%B0%B4%E6%9C%BA-1080P.mp4"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white transition-all text-[9px] font-medium flex items-center justify-center gap-1 cursor-pointer"
                                  >
                                    <Globe size={9} /> 外部浏览器打开
                                  </a>
                                </div>
                              </div>
                            ) : (
                              <video
                                src="https://202606241.oss-cn-shanghai.aliyuncs.com/video/%E7%B1%B3%E5%AE%B6%E5%AE%A0%E7%89%A9%E9%A5%AE%E6%B0%B4%E6%9C%BA-1080P.mp4"
                                controls
                                preload="metadata"
                                className="w-full h-full object-contain rounded"
                                playsInline
                                referrerPolicy="no-referrer"
                                onError={() => setDispenserVideoError(true)}
                              />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Tab 1: 白底图轮播展示 */}
                    {activeDispenserTab === 'white-bg' && (
                      <motion.div
                        key="white-bg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-white/[0.01] border border-white/5 rounded-xl p-4.5"
                      >
                        {/* Left Side: Detail & Index List */}
                        <div className="md:col-span-4 flex flex-col justify-between space-y-4">
                          <div className="text-left space-y-2">
                            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">
                              MODULE 01
                            </span>
                            <h5 className="text-sm font-semibold text-white tracking-tight">5张白底图大师展台</h5>
                            <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                              极致洁净的白底陈列产品首发大图。旨在多角度、高清晰度地诠释米家极简纯白美学，是各大电商核心主图、详情介绍前置位透视画框。
                            </p>
                          </div>

                          {/* Interactive indices indicator list */}
                          <div className="space-y-1.5 pt-3 border-t border-white/5">
                            {[
                              { index: 0, label: '01. 水电分离优雅正视图', specs: '1200 x 1200' },
                              { index: 1, label: '02. 机身提拉悬浮斜侧图', specs: '1200 x 1200' },
                              { index: 2, label: '03. 蓄水机仓提拉剖面图', specs: '1200 x 1200' },
                              { index: 3, label: '04. 双重防溢流阻泥结构面', specs: '1200 x 1200' },
                              { index: 4, label: '05. 外置高强度防滑垫底显', specs: '1200 x 1200' }
                            ].map((item) => (
                              <button
                                key={item.index}
                                onClick={() => setDispenserWhiteIndex(item.index)}
                                className={`w-full flex items-center justify-between text-left px-2.5 py-1.5 rounded transition-all text-[10px] cursor-pointer ${
                                  dispenserWhiteIndex === item.index
                                    ? 'bg-emerald-500/10 text-emerald-400 font-medium'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                <span>{item.label}</span>
                                <span className="text-[8px] font-mono text-gray-500">{item.specs}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Right Side: Responsive Slider Display */}
                        <div className="md:col-span-8 bg-black/40 border border-white/5 rounded-lg overflow-hidden relative flex flex-col justify-between h-[340px]">
                          {/* Top Tag & Stats Bar */}
                          <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-center bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded border border-white/5 text-[9px]">
                            <span className="text-gray-400 font-mono">
                              PREVIEW / 图集占比 ({(dispenserWhiteIndex + 1)}/5)
                            </span>
                            <button
                              onClick={() => {
                                const whiteImages = [
                                  'https://i.postimg.cc/hvJGmFzV/mi-jia-zhi-neng-chong-wu-yin-shui-ji-1.jpg',
                                  'https://i.postimg.cc/MHcGBkM7/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2.jpg',
                                  'https://i.postimg.cc/NFy0Xh91/mi-jia-zhi-neng-chong-wu-yin-shui-ji-3.jpg',
                                  'https://i.postimg.cc/fy3bd4t7/mi-jia-zhi-neng-chong-wu-yin-shui-ji-4.jpg',
                                  'https://i.postimg.cc/WzD4ZRF7/mi-jia-zhi-neng-chong-wu-yin-shui-ji-5.jpg'
                                ];
                                const labels = [
                                  '水电分离优雅正视图',
                                  '机身提拉悬浮斜侧图',
                                  '蓄水机仓提拉剖面图',
                                  '双重防溢流阻泥结构面',
                                  '外置高强度防滑垫底显'
                                ];
                                setActiveLightboxItem({
                                  id: `wd-white-${dispenserWhiteIndex}`,
                                  title: `白底图展示 · ${labels[dispenserWhiteIndex]}`,
                                  description: `米家智能宠物饮水机2代官方摄影白底图集。1200px无损分辨率呈现高奢质感白卡。`,
                                  category: 'hd-visuals',
                                  image: whiteImages[dispenserWhiteIndex],
                                  specs: '1200 x 1200 · JPG',
                                  channel: '天猫/京东黄金坑位白底主图柜'
                                });
                              }}
                              className="px-2 py-0.5 rounded bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-white transition-all flex items-center gap-1 font-semibold cursor-pointer"
                            >
                              <Maximize2 size={9} /> 放大无损原画
                            </button>
                          </div>

                          {/* Image Container with clickable hover effect */}
                          <div 
                            className="flex-1 flex items-center justify-center p-6 bg-white shrink-0 relative h-full cursor-zoom-in group/img"
                            onClick={() => {
                              const whiteImages = [
                                'https://i.postimg.cc/hvJGmFzV/mi-jia-zhi-neng-chong-wu-yin-shui-ji-1.jpg',
                                'https://i.postimg.cc/MHcGBkM7/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2.jpg',
                                'https://i.postimg.cc/NFy0Xh91/mi-jia-zhi-neng-chong-wu-yin-shui-ji-3.jpg',
                                'https://i.postimg.cc/fy3bd4t7/mi-jia-zhi-neng-chong-wu-yin-shui-ji-4.jpg',
                                'https://i.postimg.cc/WzD4ZRF7/mi-jia-zhi-neng-chong-wu-yin-shui-ji-5.jpg'
                              ];
                              const labels = [
                                '水电分离优雅正视图',
                                '机身提拉悬浮斜侧图',
                                '蓄水机仓提拉剖面图',
                                '双重防溢流阻泥结构面',
                                '外置高强度防滑垫底显'
                              ];
                              setActiveLightboxItem({
                                id: `wd-white-${dispenserWhiteIndex}`,
                                title: `白底图展示 · ${labels[dispenserWhiteIndex]}`,
                                description: `米家智能宠物饮水机2代官方摄影白底图集。1200px无损分辨率呈现高奢质感白卡。`,
                                category: 'hd-visuals',
                                image: whiteImages[dispenserWhiteIndex],
                                specs: '1200 x 1200 · JPG',
                                channel: '天猫/京东黄金坑位白底主图柜'
                              });
                            }}
                          >
                            <AnimatePresence mode="wait">
                              <motion.img
                                key={dispenserWhiteIndex}
                                src={[
                                  'https://i.postimg.cc/hvJGmFzV/mi-jia-zhi-neng-chong-wu-yin-shui-ji-1.jpg',
                                  'https://i.postimg.cc/MHcGBkM7/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2.jpg',
                                  'https://i.postimg.cc/NFy0Xh91/mi-jia-zhi-neng-chong-wu-yin-shui-ji-3.jpg',
                                  'https://i.postimg.cc/fy3bd4t7/mi-jia-zhi-neng-chong-wu-yin-shui-ji-4.jpg',
                                  'https://i.postimg.cc/WzD4ZRF7/mi-jia-zhi-neng-chong-wu-yin-shui-ji-5.jpg'
                                ][dispenserWhiteIndex]}
                                alt={`白底图-${dispenserWhiteIndex}`}
                                referrerPolicy="no-referrer"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="max-w-full max-h-[220px] object-contain select-none group-hover/img:scale-[1.03] transition-transform duration-300"
                              />
                            </AnimatePresence>

                            {/* Beautiful hover clue banner */}
                            <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none">
                              <span className="bg-emerald-500 text-white text-[9px] font-bold px-2.5 py-1 rounded shadow-lg flex items-center gap-1">
                                <Search size={9} /> 点击放大查看 100% 原始精度
                              </span>
                            </div>

                            {/* Slider Navigation arrows */}
                            <button
                              onClick={() => setDispenserWhiteIndex((prev) => (prev === 0 ? 4 : prev - 1))}
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 hover:border-white/30 transition-all cursor-pointer shadow-lg z-10"
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <button
                              onClick={() => setDispenserWhiteIndex((prev) => (prev === 4 ? 0 : prev + 1))}
                              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 hover:border-white/30 transition-all cursor-pointer shadow-lg z-10"
                            >
                              <ChevronRight size={16} />
                            </button>
                          </div>

                          {/* Indicator dots line */}
                          <div className="bg-[#050508] px-4 py-2 flex justify-between items-center border-t border-white/5">
                            <span className="text-[10px] text-gray-400 font-sans">
                              {[
                                '水电分离优雅正视大图',
                                '机身提拉悬浮斜离大图',
                                '蓄水机仓拆分内部剖面',
                                '双重自溢防漫阻阻泥孔',
                                '外部提手一体化底座显'
                              ][dispenserWhiteIndex]}
                            </span>
                            <div className="flex gap-1.5">
                              {[0, 1, 2, 3, 4].map((dot) => (
                                <button
                                  key={dot}
                                  onClick={() => setDispenserWhiteIndex(dot)}
                                  className={`w-2.5 h-1.5 rounded-full transition-all cursor-pointer ${
                                    dispenserWhiteIndex === dot ? 'bg-emerald-500 w-4' : 'bg-gray-750 bg-gray-700 hover:bg-gray-500'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Tab 2: 10张场景图轮播展示 */}
                    {activeDispenserTab === 'scenarios' && (
                      <motion.div
                        key="scenarios"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-white/[0.01] border border-white/5 rounded-xl p-4.5"
                      >
                        {/* Left description */}
                        <div className="md:col-span-4 flex flex-col justify-between space-y-4">
                          <div className="text-left space-y-2">
                            <span className="text-[9px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded font-bold">
                              MODULE 02
                            </span>
                            <h5 className="text-sm font-semibold text-white tracking-tight">智能科技生活 · 精选场景画格</h5>
                            <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                              真实呈现毛孩子家居温适饮水状态，生动对焦“无感水电物理隔断、超微静音阻尼水路、2Kg大箱自重提拉”生活场景，激发白领社交买点。
                            </p>
                          </div>

                          {/* Scroll index button drawer with active indices */}
                          <div className="grid grid-cols-2 gap-1.5 pt-3 border-t border-white/5 max-h-[180px] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                            {[
                              { idx: 0, label: '01. 温雅客厅恬静对镜' },
                              { idx: 1, label: '02. 舔水布偶贪得特写' },
                              { idx: 2, label: '03. 双重物理防干预测' },
                              { idx: 3, label: '04. 双猫聚首泉涌共享' },
                              { idx: 4, label: '05. 超滤活性炭深孔吸' },
                              { idx: 5, label: '06. 多功能智慧红白指示' },
                              { idx: 6, label: '07. 宠物轻踏微漾静泉' },
                              { idx: 7, label: '08. 极夜卧室酣眠相视' },
                              { idx: 8, label: '09. 双千克超饱腹容量' },
                              { idx: 9, label: '10. 机身大部件拆卸全家' }
                            ].map((item) => (
                              <button
                                key={item.idx}
                                onClick={() => setDispenserScenarioIndex(item.idx)}
                                className={`text-left px-2 py-1.5 rounded text-[9.5px] transition-all truncate cursor-pointer ${
                                  dispenserScenarioIndex === item.idx
                                    ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20 font-medium'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                                }`}
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Right Area Slider */}
                        <div className="md:col-span-8 bg-[#09090d]/60 border border-white/5 rounded-lg overflow-hidden relative flex flex-col justify-between h-[340px]">
                          {/* Top Floating Controls */}
                          <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-center bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded border border-white/5 text-[9px]">
                            <span className="text-gray-400 font-mono text-[9px]">
                              SCENARIO / 场景画格 ({(dispenserScenarioIndex + 1)}/10)
                            </span>
                            <button
                              onClick={() => {
                                const scImages = [
                                  'https://i.postimg.cc/KYgQ0j6W/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-01.jpg',
                                  'https://i.postimg.cc/TPWQt1z4/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-02.jpg',
                                  'https://i.postimg.cc/yNSnLxM5/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-03.jpg',
                                  'https://i.postimg.cc/6QGzMTsJ/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-05.jpg',
                                  'https://i.postimg.cc/FKJGT1tX/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-06.jpg',
                                  'https://i.postimg.cc/XvyxsXM0/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-07.jpg',
                                  'https://i.postimg.cc/k43sz9CY/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-08.jpg',
                                  'https://i.postimg.cc/RF5dy9mD/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-09.jpg',
                                  'https://i.postimg.cc/nzb2gZxW/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-10.jpg',
                                  'https://i.postimg.cc/xdbg68wp/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-04.jpg'
                                ];
                                const titles = [
                                  '温煦客厅起锚对视图',
                                  '萌白小猫喝水深镜剪影',
                                  '一键水电阻隔一秒断电图',
                                  '双宠相伴大容量泉水图',
                                  '自纯高滤微孔深度拦截',
                                  '指示红灯防干烧亮彩警示',
                                  '折耳猫温馨抚流微尘微漾',
                                  '静谧幽夜低语深度美眠图',
                                  '充足二升高密度蓄水图',
                                  '机身全拆分自清状态图'
                                ];
                                setActiveLightboxItem({
                                  id: `wd-scene-${dispenserScenarioIndex}`,
                                  title: `生活情趣描图 · ${titles[dispenserScenarioIndex]}`,
                                  description: `1080px 超清商业包装生活透视，由专业影棚校准真实暖阳氛围，是各种主流社群软文推广图、视觉卡位金牌素材。`,
                                  category: 'scenes',
                                  image: scImages[dispenserScenarioIndex],
                                  specs: '1080 x 1440 · JPG',
                                  channel: '小红书种草、短视频视觉、线上发布会KV'
                                });
                              }}
                              className="px-2 py-0.5 rounded bg-purple-500/20 hover:bg-purple-500 text-purple-400 hover:text-white transition-all flex items-center gap-1 font-semibold cursor-pointer"
                            >
                              <Maximize2 size={9} /> 放大无损原画
                            </button>
                          </div>

                          {/* Image Box with clickable zoom-in hover hint */}
                          <div 
                            className="flex-1 flex items-center justify-center p-2 bg-[#050508] relative overflow-hidden h-full select-none cursor-zoom-in group/img"
                            onClick={() => {
                              const scImages = [
                                'https://i.postimg.cc/KYgQ0j6W/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-01.jpg',
                                'https://i.postimg.cc/TPWQt1z4/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-02.jpg',
                                'https://i.postimg.cc/yNSnLxM5/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-03.jpg',
                                'https://i.postimg.cc/6QGzMTsJ/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-05.jpg',
                                'https://i.postimg.cc/FKJGT1tX/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-06.jpg',
                                'https://i.postimg.cc/XvyxsXM0/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-07.jpg',
                                'https://i.postimg.cc/k43sz9CY/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-08.jpg',
                                'https://i.postimg.cc/RF5dy9mD/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-09.jpg',
                                'https://i.postimg.cc/nzb2gZxW/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-10.jpg',
                                'https://i.postimg.cc/xdbg68wp/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-04.jpg'
                              ];
                              const titles = [
                                '温煦客厅起锚对视图',
                                '萌白小猫喝水深镜剪影',
                                '一键水电阻隔一秒断电图',
                                '双宠相伴大容量泉水图',
                                '自纯高滤微孔深度拦截',
                                '指示红灯防干烧亮彩警示',
                                '折耳猫温馨抚流微尘微漾',
                                '静谧幽夜低语深度美眠图',
                                '充足二升高密度蓄水图',
                                '机身全拆分自清状态图'
                              ];
                              setActiveLightboxItem({
                                id: `wd-scene-${dispenserScenarioIndex}`,
                                title: `生活情趣描图 · ${titles[dispenserScenarioIndex]}`,
                                description: `1080px 超清商业包装生活透视，由专业影棚校准真实暖阳氛围，是各种主流社群软文推广图、视觉卡位金牌素材。`,
                                category: 'scenes',
                                image: scImages[dispenserScenarioIndex],
                                specs: '1080 x 1440 · JPG',
                                channel: '小红书种草、短视频视觉、线上发布会KV'
                              });
                            }}
                          >
                            <AnimatePresence mode="wait">
                              <motion.img
                                key={dispenserScenarioIndex}
                                src={[
                                  'https://i.postimg.cc/KYgQ0j6W/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-01.jpg',
                                  'https://i.postimg.cc/TPWQt1z4/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-02.jpg',
                                  'https://i.postimg.cc/yNSnLxM5/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-03.jpg',
                                  'https://i.postimg.cc/6QGzMTsJ/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-05.jpg',
                                  'https://i.postimg.cc/FKJGT1tX/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-06.jpg',
                                  'https://i.postimg.cc/XvyxsXM0/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-07.jpg',
                                  'https://i.postimg.cc/k43sz9CY/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-08.jpg',
                                  'https://i.postimg.cc/RF5dy9mD/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-09.jpg',
                                  'https://i.postimg.cc/nzb2gZxW/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-10.jpg',
                                  'https://i.postimg.cc/xdbg68wp/mi-jia-zhi-neng-chong-wu-yin-shui-ji-2-chang-jing-tu-04.jpg'
                                ][dispenserScenarioIndex]}
                                alt={`场景图-${dispenserScenarioIndex}`}
                                referrerPolicy="no-referrer"
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{ duration: 0.2 }}
                                className="max-w-full max-h-[240px] rounded object-contain shadow-2xl group-hover/img:scale-[1.03] transition-transform duration-300"
                              />
                            </AnimatePresence>

                            {/* Beautiful hover clue banner */}
                            <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none">
                              <span className="bg-purple-600 text-white text-[9px] font-bold px-2.5 py-1 rounded shadow-lg flex items-center gap-1">
                                <Search size={9} /> 点击放大查看 100% 原始精度
                              </span>
                            </div>

                            {/* Arrows navigation */}
                            <button
                              onClick={() => setDispenserScenarioIndex((prev) => (prev === 0 ? 9 : prev - 1))}
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 hover:border-white/30 transition-all cursor-pointer shadow-lg z-10"
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <button
                              onClick={() => setDispenserScenarioIndex((prev) => (prev === 9 ? 0 : prev + 1))}
                              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 hover:border-white/30 transition-all cursor-pointer shadow-lg z-10"
                            >
                              <ChevronRight size={16} />
                            </button>
                          </div>

                          {/* Dot list below */}
                          <div className="bg-[#050510]/95 px-4 py-2 flex justify-between items-center border-t border-white/5">
                            <span className="text-[10px] text-purple-300 font-sans">
                              {[
                                '01. 客厅沙发柔暖日常配镜',
                                '02. 毛孩子侧卧贪甜舐饮特拍',
                                '03. 水提拉瞬时水电物理断电',
                                '04. 双猫聚首极度宽敞泉眼共享',
                                '05. 超微孔多层活性炭净化拆机',
                                '06. 机体红白多状态指示灯警告',
                                '07. 宠物轻拂静淌活泉侧面特绘',
                                '08. 极夜卧室酣享美眠静音环境',
                                '09. 双升特大容量省心离巢水箱',
                                '10. 十大部件全手拆全开水自洗'
                              ][dispenserScenarioIndex]}
                            </span>
                            <div className="flex gap-1">
                              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((dot) => (
                                <button
                                  key={dot}
                                  onClick={() => setDispenserScenarioIndex(dot)}
                                  className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                                    dispenserScenarioIndex === dot ? 'bg-purple-500 w-3' : 'bg-gray-700 hover:bg-gray-500'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Tab 3: 详情页中英双版+配件页面展示 */}
                    {activeDispenserTab === 'details' && (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        <div className="text-left bg-[#101015] border border-white/5 rounded-xl p-4.5">
                          <span className="text-[9px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded font-bold">
                            MODULE 03
                          </span>
                          <h5 className="text-sm font-semibold text-white tracking-tight mt-1.5">中英双语极高清众筹详情页 / 独家滤芯拆分画纸</h5>
                          <p className="text-[11px] text-gray-400 font-light leading-relaxed mt-1">
                            包含中文众筹详情页官方高窄原画、专配滤芯“两滤两芯超值套装”配件推广以及针对大区推出的英文版外销详情高窄长贴。
                            <span className="text-sky-400 font-bold ml-1">将光标移至预览画面将实现无阻长幅自动极速滑动。点击任何面板可调入高质感大版 Lightbox 精准放大！</span>
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {[
                            {
                              id: 'wd-det-0',
                              title: '国内 1080P 米家智能宠物饮水机 2 官方完整众筹详情页',
                              desc: '首发众筹主详情页。深度科普智能水电断气流方案、静音水箱拆洗与长效自巡多层超滤细节，打造一站式干货转化。',
                              image: 'https://i.postimg.cc/xCqxtvPn/jing-dong750-01.jpg',
                              slices: PET_DISPENSER_2_SLICES,
                              specs: '17高清切片 · 750w极清',
                              tag: '中文详情原图',
                              channel: '商城官商/天猫众筹重点大图'
                            },
                            {
                              id: 'wd-det-1',
                              title: '米家智能饮水机 2 滤芯套装高精独立包装及配件画幅',
                              desc: '滤芯多重包与净深棉科技的独立配件营销卡片。突出低耗材易更换的性价比长效保障，引导常态回购。',
                              image: 'https://i.postimg.cc/J7kK046y/xiao-mi-zhi-neng-chong-wu-yin-shui-ji2-lu-xin-tao-zhuang-1080-01.jpg',
                              slices: PET_FILTER_KIT_SLICES,
                              specs: '10高清切片 · 1080p极清',
                              tag: '滤芯耗材专属',
                              channel: '配件大客仓耗材独立坑位'
                            },
                            {
                              id: 'wd-det-2',
                              title: 'Global English Fountain 2 Advanced Interactive Campaign Leaflet',
                              desc: '面向欧美海外核心玩家与跨境电商特设的整英文长图，美学理念突出智能物理安防与双重水机阻泥，契合高端养宠审美。',
                              image: 'https://i.postimg.cc/XvHGBk1V/Xiaomi-Smart-Pet-Fountain-2-M1080.jpg',
                              specs: '1080 x 12800 · 长幅',
                              tag: 'English Edition',
                              channel: 'Amazon/Xiaomi Global Shop'
                            }
                          ].map((detMat, dIdx) => (
                            <div
                              key={dIdx}
                              onClick={() => setActiveLightboxItem({
                                id: detMat.id,
                                title: detMat.title,
                                description: detMat.desc,
                                category: 'hd-visuals',
                                image: detMat.image,
                                specs: detMat.specs,
                                channel: detMat.channel,
                                slices: detMat.slices
                              })}
                              className="group/det relative bg-[#13131b] border border-white/5 rounded-xl overflow-hidden cursor-pointer hover:border-sky-500/40 transition-all shadow-lg flex flex-col justify-between h-[360px]"
                            >
                              {/* Long Scroll simulator box */}
                              <div className="h-64 overflow-hidden relative bg-[#040406] flex items-start justify-center">
                                {detMat.slices ? (
                                  <div className="flex flex-col w-full transition-transform duration-[12000ms] ease-linear group-hover/det:translate-y-[-80%]">
                                    {detMat.slices.map((url, idx) => (
                                      <img
                                        key={idx}
                                        src={url}
                                        alt={`${detMat.title} slice ${idx+1}`}
                                        referrerPolicy="no-referrer"
                                        className="w-full h-auto block select-none border-0"
                                      />
                                    ))}
                                  </div>
                                ) : (
                                  <img
                                    src={detMat.image}
                                    alt={detMat.title}
                                    referrerPolicy="no-referrer"
                                    className="w-full object-cover origin-top opacity-50 group-hover/det:opacity-85 transition-transform duration-[6000ms] ease-linear select-none group-hover/det:translate-y-[-70%]"
                                  />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                                
                                {/* Top Floating Type Tag */}
                                <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/80 backdrop-blur-sm rounded border border-white/10 text-[8.5px] font-mono font-bold uppercase text-sky-400">
                                  {detMat.tag}
                                </div>

                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-gray-400 bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 opacity-100 group-hover/det:opacity-0 transition-all pointer-events-none select-none flex items-center gap-1">
                                  <span>滑过/触点 慢速预览长图</span>
                                </div>
                              </div>

                              <div className="p-3 bg-black/40 flex-1 flex flex-col justify-between text-left">
                                <div>
                                  <h6 className="text-[11px] font-bold text-white line-clamp-1 group-hover/det:text-sky-400 transition-all">
                                    {detMat.title}
                                  </h6>
                                  <p className="text-[9.5px] text-gray-500 font-light line-clamp-2 mt-0.5 leading-relaxed">
                                    {detMat.desc}
                                  </p>
                                </div>
                                <div className="flex items-center justify-between text-[8px] font-mono text-gray-600 border-t border-white/10 pt-2 mt-1 select-none">
                                  <span>{detMat.specs}</span>
                                  <span className="flex items-center gap-0.5 text-sky-400"><Maximize2 size={8} /> 点按放大无损</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Tab 4: 营销玩法及推广 */}
                    {activeDispenserTab === 'marketing' && (
                      <motion.div
                        key="marketing"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        <div className="text-left bg-[#15111b] border border-white/5 rounded-xl p-4.5">
                          <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-bold">
                            MODULE 04
                          </span>
                          <h5 className="text-sm font-semibold text-white tracking-tight mt-1.5">众筹爆款营销玩法 · 联合推广运营战图</h5>
                          <p className="text-[11px] text-gray-400 font-light leading-relaxed mt-1">
                            包含线上众筹大促核心返利、好券裂变传播小程序、水粮套装捆绑联购引流等多重运营玩法宣传大版，深刻诠释智能硬件下沉与爆发背后的爆款孵化链路。
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {[
                            {
                              id: 'wd-mkt-0',
                              title: '智能宠物饮水机 2 代众筹首发核心玩法大版',
                              desc: '完整呈现首发上线“众筹尊享价、老用户专属折上折、社群拉新砍一刀得好礼、新品尝鲜套装箱”等核心玩法。引燃口碑。',
                              image: 'https://i.postimg.cc/3x9WzZTr/jie-ping2026-06-21-12-15-58.png',
                              specs: '1080 x 2400 · PNG',
                              tag: '立减首发宣图',
                              channel: '小程序/商城主推联合首发位'
                            },
                            {
                              id: 'wd-mkt-1',
                              title: '水粮双旗舰组合大爆品·联合首发运营海报',
                              desc: '整合“水机2代 + 喂食机2可视版”捆绑大套餐特有折扣，在小米商城、米家生态圈建立大额返佣机制，拉满客单产出效率。',
                              image: 'https://i.postimg.cc/L8vhGVp9/jie-ping2026-06-21-12-16-22.png',
                              specs: '1080 x 2400 · PNG',
                              tag: '组合拳多品大页',
                              channel: '米家全屏大推广弹窗/商城首页'
                            }
                          ].map((promoMat, pIdx) => (
                            <div 
                              key={pIdx}
                              onClick={() => setActiveLightboxItem({
                                id: promoMat.id,
                                title: promoMat.title,
                                description: promoMat.desc,
                                category: 'campaign',
                                image: promoMat.image,
                                specs: promoMat.specs,
                                channel: promoMat.channel
                              })}
                              className="group/promo bg-[#120e17] border border-white/5 rounded-xl overflow-hidden cursor-pointer hover:border-amber-500/40 transition-all shadow-md flex flex-col h-[280px] justify-between text-left"
                            >
                              <div className="h-44 bg-black/60 relative overflow-hidden flex items-center justify-center">
                                <img 
                                  src={promoMat.image} 
                                  alt={promoMat.title} 
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover opacity-60 group-hover/promo:opacity-85 group-hover/promo:scale-103 transition-all duration-500 select-none" 
                                />
                                <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 backdrop-blur-sm rounded border border-white/10 text-[8px] font-mono font-bold uppercase text-amber-400">
                                  {promoMat.tag}
                                </div>
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/promo:opacity-100 flex items-center justify-center transition-opacity">
                                  <span className="p-1 px-2.5 bg-amber-500 text-white rounded text-[9px] font-semibold flex items-center gap-1 shadow-lg">
                                    <Eye size={10} /> 预览高清海报
                                  </span>
                                </div>
                              </div>
                              <div className="p-3.5 bg-black/20 flex-1 flex flex-col justify-between">
                                <div>
                                  <h5 className="text-[11px] font-bold text-white line-clamp-1 group-hover/promo:text-amber-400 transition-all">{promoMat.title}</h5>
                                  <p className="text-[9.5px] text-gray-500 font-light line-clamp-2 mt-0.5 leading-relaxed">{promoMat.desc}</p>
                                </div>
                                <div className="flex justify-between items-center text-[8.5px] font-mono text-gray-650 mt-2 border-t border-white/5 pt-1.5 select-none">
                                  <span>{promoMat.specs}</span>
                                  <span>{promoMat.channel}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

              {/* Modal Box Footer */}
              <div className="px-6 py-4.5 border-t border-white/5 bg-[#08080c] flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-8.5 h-8.5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                    <MessageSquare size={15} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">觉得宠物饮水机 2 代比前代更具GTM亮点么？</p>
                    <p className="text-[10px] text-gray-500 font-sans">点击AI一键分析，代入工单多重合作链与极致成本卡边，自动研讨撰写更精细的爆款营销预备方案！</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => {
                      const askPrompt = `我想深度复盘“米家智能宠物饮水机 2代”的上市定价测算。请结合:(1)BOM成本；(2)竞争对手定价；(3)小米分成比例 这三个维度，帮我拟一份更精细的下沉市场爆发推演策划书草稿？`;
                      onPreFillChat(askPrompt);
                      setActiveSubProjectDetail(null);
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    AI 深度研讨论证此品 <ArrowRight size={12} />
                  </button>
                  <button
                    onClick={() => setActiveSubProjectDetail(null)}
                    className="px-3.5 py-2 border border-white/10 hover:border-white text-gray-300 hover:text-white rounded-full text-xs font-semibold transition-all cursor-pointer bg-white/5"
                  >
                    关闭并返回
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* 6. Immersive Detailed GTM Launch Case Study for Mijia Smart Pet Feeder 2 Camera Edition */}
        {activeSubProjectDetail === 'pet_feeder' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSubProjectDetail(null)}
              className="absolute inset-0 bg-[#040407]/95"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 160 }}
              className="relative w-full max-w-5xl h-[90vh] bg-[#0d0d12] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
            >
              {/* Modal Banner Title */}
              <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/5 bg-[#08080c] select-none">
                <div className="text-left">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-widest uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-1">
                    🎯 EXPERT GTM CASE / 可视化重构与矩阵捆绑全景
                  </div>
                  <h3 className="text-base sm:text-xl font-display font-semibold text-white tracking-tight">
                    米家智能宠物喂食器 2 可视版
                  </h3>
                </div>
                <button
                  onClick={() => setActiveSubProjectDetail(null)}
                  className="w-9 h-9 rounded-full border border-white/10 hover:border-white/30 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer shadow"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable Layout Context */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-7 bg-[#08080d]/30 text-left animate-fade-in" style={{ scrollbarWidth: 'thin' }}>
                
                {/* 3-Column specs, challenges & solutions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <div className="bg-[#111117] border border-white/5 rounded-xl p-4.5 shadow-md">
                    <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-white/5 select-none">
                      <span className="text-indigo-400 text-sm">📋</span>
                      <h4 className="text-[11px] font-mono font-extrabold tracking-wider text-[#a1a1aa] uppercase">
                        项目背景与演进
                      </h4>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                        <span className="text-[10px] text-indigo-400 font-bold block mb-1">1. 可视喂食大势所趋</span>
                        <p className="text-[11px] text-gray-300 leading-relaxed font-sans font-light">
                          宠物陪伴体验经历全景爆发，年轻一代用户不再只满足于单纯“听响投喂”，渴望在上班出差时，能够无阻看清毛孩子进食表情、监控食盆余量，双向语音撩宠成为刚需。
                        </p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                        <span className="text-[10px] text-purple-400 font-bold block mb-1">2. 两年经典焕发新颜</span>
                        <p className="text-[11px] text-gray-300 leading-relaxed font-sans font-light">
                          自前款喂食器2经典版上架至今已超整整两年。增加超清可视摄像头是迎战当前白牌挑战者、完成米家生态升级的核心战略要塞。
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#171113] border border-red-500/10 rounded-xl p-4.5 shadow-md">
                    <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-white/5 select-none">
                      <span className="text-red-400 text-sm">⚠️</span>
                      <h4 className="text-[11px] font-mono font-extrabold tracking-wider text-[#a1a1aa] uppercase">
                        红海核心难点
                      </h4>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-red-500/5 p-3 rounded-lg border border-red-500/10">
                        <span className="text-[10px] text-red-400 font-bold block mb-1">1. 同质同档产品饱和竞争</span>
                        <p className="text-[11px] text-gray-300 leading-relaxed font-sans font-light">
                          市场上具备低画质可视功能的竞品喂食器数不胜数，同质化极严重。小米如何在ID视觉、美学融合及软件层面打出无阻的核心长板USP？
                        </p>
                      </div>
                      <div className="bg-red-500/5 p-3 rounded-lg border border-red-500/10">
                        <span className="text-[10px] text-red-400 font-bold block mb-1">2. 春节冻结期的3月命脉线</span>
                        <p className="text-[11px] text-gray-300 leading-relaxed font-sans font-light">
                          从立项研发到发布铺货，整期宣发筹委会仅有极为短促的3个月。更叠加了春节休业红线——供应链全面空盘、物料流转冻结，时间排布属于绝对地狱级别。
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#111711] border border-green-500/10 rounded-xl p-4.5 shadow-md">
                    <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-white/5 select-none">
                      <span className="text-green-400 text-sm">💡</span>
                      <h4 className="text-[11px] font-mono font-extrabold tracking-wider text-[#a1a1aa] uppercase">
                        精妙突围方案
                      </h4>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-green-500/3 p-3 rounded-lg border border-green-500/10 text-[10.5px]">
                        <span className="text-[10px] text-green-400 font-bold block mb-0.5">1. 自研碗上黄金主摄 (ID美学长板)</span>
                        <p className="text-gray-300 leading-relaxed font-light font-sans">
                          针对绝大多数同行将主镜低放置侧面、导致频偏盲区看不清盆底余粮的致命伤。小米科学调优，让1080P超清防尘摄像头无缝隐入喂食器食盆正上方。与结构融为一体，真可视、无盲区。
                        </p>
                      </div>
                      <div className="bg-green-500/3 p-3 rounded-lg border border-green-500/10 text-[10.5px]">
                        <span className="text-[10px] text-green-400 font-bold block mb-0.5">2. 宠物理学矩阵套餐打包组合</span>
                        <p className="text-gray-300 leading-relaxed font-light font-sans">
                          拒绝单打独斗，GTM期直接将饮水机2 + 可视喂食机包装为“米家智慧科学膳食水粮全家桶”，通过降维立减、联合APP引导卡位，缩短买家摇摆决策。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ID Camera Placement Visual Demonstration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-black/40 border border-white/5 p-4.5 rounded-lg select-none">
                  <div>
                    <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1">❌ 行业普通竞品 ID 主摄结构</h4>
                    <div className="h-28 bg-[#1e1315] border border-red-500/20 rounded relative flex flex-col justify-between p-3.5">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-red-400 font-bold">侧面偏置镜片 / 极易遮挡</span>
                        <span className="px-1.5 py-0.5 bg-red-500/10 text-red-500 rounded text-[8px] font-mono">BLIND SPOT</span>
                      </div>
                      <p className="text-[10px] text-gray-400 leading-relaxed font-sans font-light">
                        摄像头位于设备中部侧端，一旦宠物脑袋凑近，画面瞬间被黑影完全糊死。另外碗底由于夹角死区，隔夜余粮深浅根本无从洞察，形同虚设。
                      </p>
                      <div className="h-1 bg-red-600/30 rounded w-full overflow-hidden">
                        <div className="bg-red-500 h-full w-[35%]" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1 text-[#3b82f6]">✨ 米家精妙黄金碗上主摄 (Mijia Golden-eye ID)</h4>
                    <div className="h-28 bg-[#13191e] border border-blue-500/20 rounded relative flex flex-col justify-between p-3.5">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-blue-400 font-semibold">食盆正上方悬浮融合式摄像头 / 0度盲区</span>
                        <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded text-[8px] font-mono">100% VISIBLE</span>
                      </div>
                      <p className="text-[10px] text-gray-300 leading-relaxed font-sans font-light">
                        特设防油挂阻尼主摄像头，正对钢制食碗黄金圆心垂直俯瞰。无死角锁定宠物进食实况，不仅可即时检测干粮重力克数，多端设备联动更为流畅。
                      </p>
                      <div className="h-1 bg-blue-600/30 rounded w-full overflow-hidden">
                        <div className="bg-blue-400 h-full w-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Multiproduct Bundle Matrix Builder (多品矩阵套餐打包精算) */}
                <div className="bg-[#0f0e13] border border-white/5 rounded-xl p-5 text-left">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-4 pb-3 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <Sparkles size={14} className="text-indigo-400 animate-pulse" />
                      <div>
                        <h4 className="text-xs font-semibold text-white">米家宠物多爆品打包联合转化计算器</h4>
                        <span className="text-[9.5px] text-gray-500 font-mono">MIJIA SMART PET STACK BUNDLE VALUATION MODEL</span>
                      </div>
                    </div>
                    <span className="text-[9.5px] font-sans font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 border border-indigo-500/20 rounded">
                      组合拳缩减用户决策期
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-black/20 p-4 rounded-lg">
                    <div className="space-y-2.5">
                      <span className="text-[10px] font-bold text-gray-400 block mb-1">勾选打包的智能矩阵新品 (Toggle items in bundle)</span>
                      
                      {/* Feeder Item */}
                      <label className="flex items-center justify-between p-2.5 rounded bg-white/5 border border-white/5 cursor-pointer hover:bg-white/[0.08] transition-all">
                        <div className="flex items-center gap-2 text-[11px] font-medium text-white">
                          <input 
                            type="checkbox" checked={feederBundleFeeder} disabled={true}
                            className="accent-indigo-500 cursor-not-allowed" 
                          />
                          <span>米家智能宠物喂食器 2 可戏可视版</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-white">¥399元</span>
                      </label>

                      {/* Water Item */}
                      <label className="flex items-center justify-between p-2.5 rounded bg-white/5 border border-white/5 cursor-pointer hover:bg-white/[0.08] transition-all">
                        <div className="flex items-center gap-2 text-[11px] font-medium text-white" onClick={() => setFeederBundleWater(!feederBundleWater)}>
                          <input 
                            type="checkbox" checked={feederBundleWater} readOnly
                            className="accent-indigo-500 pointer-events-none" 
                          />
                          <span>配合：米家智能宠物饮水机 2代 (健康流泉)</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-white">¥129元</span>
                      </label>

                      {/* Camera Item */}
                      <label className="flex items-center justify-between p-2.5 rounded bg-white/5 border border-white/5 cursor-pointer hover:bg-white/[0.08] transition-all">
                        <div className="flex items-center gap-2 text-[11px] font-medium text-white" onClick={() => setFeederBundleCamera(!feederBundleCamera)}>
                          <input 
                            type="checkbox" checked={feederBundleCamera} readOnly
                            className="accent-indigo-500 pointer-events-none" 
                          />
                          <span>配套：米家智能家居监控探头 (安防卡位)</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-white">¥149元</span>
                      </label>
                    </div>

                    {/* Costing Output */}
                    <div className="bg-[#14121a] p-4 rounded-lg border border-[#3f385c]/30 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-indigo-400 font-bold block mb-1">水粮安防联合打包战绩预测</span>
                        <div className="flex items-baseline gap-1 mt-2">
                          <span className="text-2xl font-mono font-black text-white">
                            ¥{Math.round((399 + (feederBundleWater ? 129 : 0) + (feederBundleCamera ? 149 : 0)) * (feederBundleWater || feederBundleCamera ? 0.85 : 1))}
                          </span>
                          <span className="text-[9px] text-gray-500 line-through">
                            原价: ¥{399 + (feederBundleWater ? 129 : 0) + (feederBundleCamera ? 149 : 0)}
                          </span>
                        </div>
                        <p className="text-[10.5px] text-gray-400 mt-2 font-light leading-relaxed font-sans">
                          多爆品捆绑实现一键极速结算，立享全套 <span className="text-indigo-400 font-bold">15% 大单立减特惠</span>。将客单值从普通的单品399元瞬间倍增，大幅减短决策期。
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/5">
                        <div>
                          <span className="text-[8.5px] text-gray-500 block">新机联购率提升预估</span>
                          <span className="text-sm font-mono font-bold text-green-400 block mt-0.5">
                            {feederBundleWater && feederBundleCamera ? '+185%' : feederBundleWater || feederBundleCamera ? '+95%' : '0%'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[8.5px] text-gray-500 block">买家点击转化加速</span>
                          <span className="text-sm font-mono font-bold text-amber-400 block mt-0.5">
                            {feederBundleWater && feederBundleCamera ? '3.5x' : feederBundleWater || feederBundleCamera ? '2.1x' : '1.0x'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* GTM Workflow Timeline for Pet Feeder 2 (3-Month Compressed) */}
                <div>
                  <div className="flex items-center gap-2 mb-3 pb-1.5 border-b border-white/5 select-none">
                    <span className="text-purple-400 text-sm">⏱️</span>
                    <h4 className="text-[11px] font-mono font-extrabold tracking-wider text-[#a1a1aa] uppercase">
                      小米宠物喂食器可视版 · 3个月春节跨度极密上市排班
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    {[
                      { stage: 'M1 (首月)', time: '春节前 60 天', title: '摄像头黄金ID成型', desc: '放弃侧置镜头，确定碗上俯拍方案并快速通过3D模具验证；对齐首批备货工厂产能。' },
                      { stage: 'M2 (次月)', time: '跨年/春节节点', title: '供应链极密守线', desc: '强攻春节假期供应链封盘危机，前置锁定精细工艺纸盒印刷配给。' },
                      { stage: 'M3 (末月)', time: '发售前 30 天', title: '全家桶矩阵资材出样', desc: '交付宠物水粮“全家桶大套餐”首发主KV及众筹承接长图，安排媒体评测样品寄送。' },
                      { stage: 'LAUNCH', time: '众筹爆发大促', title: '全网真可视KOL覆盖', desc: '黄金档狂轰小红书及短视频，由萌宠博主晒碗底真可视特写视频，卡点爆量。' }
                    ].map((step, idx) => (
                      <div key={idx} className="bg-white/[0.01] border border-white/5 rounded-lg p-3.5 hover:border-indigo-500/20 transition-all text-[11px]">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[8px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded font-bold">{step.stage}</span>
                          <span className="text-gray-500 font-mono text-[9px]">{step.time}</span>
                        </div>
                        <h5 className="font-semibold text-white mb-1.5">{step.title}</h5>
                        <p className="text-gray-400 font-light leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Materials Showcase Section (米家智能宠物喂食器 2 可视版 3模块图素展示仓) */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/5 select-none text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-400 text-sm">🖼️</span>
                      <div>
                        <h4 className="text-[11px] font-mono font-extrabold tracking-wider text-[#a1a1aa] uppercase">
                          米家智能宠物喂食器 2 可视版 · 核心图素物料展示舱
                        </h4>
                        <span className="text-[9px] text-gray-500 font-mono">CORE DESIGN & VISUAL MARKETING MATERIAL WAREHOUSE</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 bg-black/30 p-1 rounded-lg border border-white/5">
                      {[
                        { id: 'white-bg', label: '1. 白底图轮播 (5)' },
                        { id: 'scenarios', label: '2. 场景图轮播 (10)' },
                        { id: 'details', label: '3. 电商推广详情页' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveFeederTab(tab.id)}
                          className={`px-3 py-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer ${
                            activeFeederTab === tab.id
                              ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold'
                              : 'border border-transparent text-gray-450 text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {/* Tab 1: 白底图轮播展示 */}
                    {activeFeederTab === 'white-bg' && (
                      <motion.div
                        key="feeder-white"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-white/[0.01] border border-white/5 rounded-xl p-4.5"
                      >
                        {/* Left Side: Detail & Index List */}
                        <div className="md:col-span-4 flex flex-col justify-between space-y-4">
                          <div className="text-left space-y-2">
                            <span className="text-[9px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded font-bold">
                              MODULE 01
                            </span>
                            <h5 className="text-sm font-semibold text-white tracking-tight">5张白底大师打样图</h5>
                            <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                              极致洁净的白底陈列产品高精图。展现碗上黄金摄像模组、防潮锁鲜极净舱等结构卖点，是各大天猫、京东、小米商城前置黄金坑位的必备首推。
                            </p>
                          </div>

                          {/* Interactive indices indicator list */}
                          <div className="space-y-1.5 pt-3 border-t border-white/5">
                            {[
                              { index: 0, label: '01. 阻漏密封圈立体结构（高精白底）', specs: '1200 x 1200' },
                              { index: 1, label: '02. 3D高清摄像碗上黄金主摄侧照', specs: '1200 x 1200' },
                              { index: 2, label: '03. 六格软质硅胶叶轮出粮大侧面', specs: '1200 x 1200' },
                              { index: 3, label: '04. 极极简机身开盖提拉高精图示', specs: '1200 x 1200' },
                              { index: 4, label: '05. 双向高清视频联动仰视视角', specs: '1200 x 1200' }
                            ].map((item) => (
                              <button
                                key={item.index}
                                onClick={() => setFeederWhiteIndex(item.index)}
                                className={`w-full flex items-center justify-between text-left px-2.5 py-1.5 rounded transition-all text-[10px] cursor-pointer ${
                                  feederWhiteIndex === item.index
                                    ? 'bg-indigo-500/10 text-indigo-400 font-medium'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                <span className="truncate pr-2">{item.label}</span>
                                <span className="text-[8px] font-mono text-gray-500 shrink-0">{item.specs}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Right Side: Responsive Slider Display */}
                        <div className="md:col-span-8 bg-black/40 border border-white/5 rounded-lg overflow-hidden relative flex flex-col justify-between h-[340px]">
                          {/* Top Tag & Stats Bar */}
                          <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-center bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded border border-white/5 text-[9px]">
                            <span className="text-gray-400 font-mono">
                              PREVIEW / 图集占比 ({(feederWhiteIndex + 1)}/5)
                            </span>
                            <button
                              onClick={() => {
                                const whiteImages = [
                                  'https://i.postimg.cc/bwjSbJzr/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban01.jpg',
                                  'https://i.postimg.cc/zG1HWBJG/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban02.jpg',
                                  'https://i.postimg.cc/3xH0pRKw/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban03.jpg',
                                  'https://i.postimg.cc/YCwLg9pj/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban04.jpg',
                                  'https://i.postimg.cc/htqQxjSz/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban05.jpg'
                                ];
                                const labels = [
                                  '阻漏密封圈立体结构（高精白底）',
                                  '3D高清摄像碗上黄金主摄侧照',
                                  '六格软质硅胶叶轮出粮大侧面',
                                  '极极简机身开盖提拉高精图示',
                                  '双向高清视频联动仰视视角'
                                ];
                                setActiveLightboxItem({
                                  id: `pf-white-${feederWhiteIndex}`,
                                  title: `白底图展示 · ${labels[feederWhiteIndex]}`,
                                  description: `米家智能宠物喂食器2可视版无损纯白背景产品集，深度还原物理安全与黄金视角的高奢质感。`,
                                  category: 'hd-visuals',
                                  image: whiteImages[feederWhiteIndex],
                                  specs: '1200 x 1200 · JPG',
                                  channel: '小米商城/天猫众筹首页黄金主图坑位'
                                });
                              }}
                              className="px-2 py-0.5 rounded bg-indigo-500/20 hover:bg-indigo-500 text-indigo-400 hover:text-white transition-all flex items-center gap-1 font-semibold cursor-pointer"
                            >
                              <Maximize2 size={9} /> 放大无损原画
                            </button>
                          </div>

                          {/* Image Container with clickable hover effect */}
                          <div 
                            className="flex-1 flex items-center justify-center p-6 bg-white shrink-0 relative h-full cursor-zoom-in group/img"
                            onClick={() => {
                              const whiteImages = [
                                'https://i.postimg.cc/bwjSbJzr/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban01.jpg',
                                'https://i.postimg.cc/zG1HWBJG/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban02.jpg',
                                'https://i.postimg.cc/3xH0pRKw/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban03.jpg',
                                'https://i.postimg.cc/YCwLg9pj/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban04.jpg',
                                'https://i.postimg.cc/htqQxjSz/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban05.jpg'
                              ];
                              const labels = [
                                '阻漏密封圈立体结构（高精白底）',
                                '3D高清摄像碗上黄金主摄侧照',
                                '六格软质硅胶叶轮出粮大侧面',
                                '极极简机身开盖提拉高精图示',
                                '双向高清视频联动仰视视角'
                              ];
                              setActiveLightboxItem({
                                id: `pf-white-${feederWhiteIndex}`,
                                title: `白底图展示 · ${labels[feederWhiteIndex]}`,
                                description: `米家智能宠物喂食器2可视版无损纯白背景产品集，深度还原物理安全与黄金视角的高奢质感。`,
                                category: 'hd-visuals',
                                image: whiteImages[feederWhiteIndex],
                                specs: '1200 x 1200 · JPG',
                                channel: '小米商城/天猫众筹首页黄金主图坑位'
                              });
                            }}
                          >
                            <AnimatePresence mode="wait">
                              <motion.img
                                key={feederWhiteIndex}
                                src={[
                                  'https://i.postimg.cc/bwjSbJzr/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban01.jpg',
                                  'https://i.postimg.cc/zG1HWBJG/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban02.jpg',
                                  'https://i.postimg.cc/3xH0pRKw/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban03.jpg',
                                  'https://i.postimg.cc/YCwLg9pj/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban04.jpg',
                                  'https://i.postimg.cc/htqQxjSz/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban05.jpg'
                                ][feederWhiteIndex]}
                                alt={`白底图-${feederWhiteIndex}`}
                                referrerPolicy="no-referrer"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="max-w-full max-h-[220px] object-contain select-none group-hover/img:scale-[1.03] transition-transform duration-300"
                              />
                            </AnimatePresence>

                            {/* Beautiful hover clue banner */}
                            <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none">
                              <span className="bg-indigo-500 text-white text-[9px] font-bold px-2.5 py-1 rounded shadow-lg flex items-center gap-1">
                                <Search size={9} /> 点击放大查看 100% 原始精度
                              </span>
                            </div>

                            {/* Slider Navigation arrows */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setFeederWhiteIndex((prev) => (prev === 0 ? 4 : prev - 1));
                              }}
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 hover:border-white/30 transition-all cursor-pointer shadow-lg z-10"
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setFeederWhiteIndex((prev) => (prev === 4 ? 0 : prev + 1));
                              }}
                              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 hover:border-white/30 transition-all cursor-pointer shadow-lg z-10"
                            >
                              <ChevronRight size={16} />
                            </button>
                          </div>

                          {/* Indicator dots line */}
                          <div className="bg-[#050508] px-4 py-2 flex justify-between items-center border-t border-white/5">
                            <span className="text-[10px] text-gray-400 font-sans">
                              {[
                                '01. 阻漏密封圈立体结构（高精白底）',
                                '02. 3D高清摄像碗上黄金主摄侧照',
                                '03. 六格软质硅胶叶轮出粮大侧面',
                                '04. 极极简机身开盖提拉高精图示',
                                '05. 双向高清视频联动仰视视角'
                              ][feederWhiteIndex]}
                            </span>
                            <div className="flex gap-1.5 shrink-0">
                              {[0, 1, 2, 3, 4].map((dot) => (
                                <button
                                  key={dot}
                                  onClick={() => setFeederWhiteIndex(dot)}
                                  className={`w-2.5 h-1.5 rounded-full transition-all cursor-pointer ${
                                    feederWhiteIndex === dot ? 'bg-indigo-500 w-4' : 'bg-gray-700 hover:bg-gray-500'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Tab 2: 10张场景图轮播展示 */}
                    {activeFeederTab === 'scenarios' && (
                      <motion.div
                        key="feeder-scenarios"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-white/[0.01] border border-white/5 rounded-xl p-4.5"
                      >
                        {/* Left description */}
                        <div className="md:col-span-4 flex flex-col justify-between space-y-4">
                          <div className="text-left space-y-2">
                            <span className="text-[9px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded font-bold">
                              MODULE 02
                            </span>
                            <h5 className="text-sm font-semibold text-white tracking-tight">智能科技生活 · 精选场景画格 (10)</h5>
                            <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                              真实呈现猫咪在客厅食盆进食、双向高清对讲趣味互动、以及高清无感防抖红外夜视、精准规划定量分发等现代高颜值人宠合一写实画卷。
                            </p>
                          </div>

                          {/* Scroll index button drawer with active indices */}
                          <div className="grid grid-cols-2 gap-1.5 pt-3 border-t border-white/5 max-h-[180px] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                            {[
                              { idx: 0, label: '01. 客厅双向高清对讲' },
                              { idx: 1, label: '02. 猫咪食盆大特写' },
                              { idx: 2, label: '03. 出差远程一键视频' },
                              { idx: 3, label: '04. 萌宠盼望守护出粮' },
                              { idx: 4, label: '05. 高清防抖红外夜视' },
                              { idx: 5, label: '06. 密封阻隔潮除湿舱' },
                              { idx: 6, label: '07. 宠物贴近温馨对讲' },
                              { idx: 7, label: '08. 精准感应定时定量' },
                              { idx: 8, label: '09. 客厅融合美学精装' },
                              { idx: 9, label: '10. 饭盆超清舔粮憨态' }
                            ].map((item) => (
                              <button
                                key={item.idx}
                                onClick={() => setFeederScenarioIndex(item.idx)}
                                className={`text-left px-2 py-1.5 rounded transition-all text-[9.5px] truncate cursor-pointer ${
                                  feederScenarioIndex === item.idx
                                    ? 'bg-purple-500/10 text-purple-400 font-semibold border-l-2 border-purple-500'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Right Area: Dynamic Scene Frame with overlays */}
                        <div className="md:col-span-8 bg-black/45 border border-white/5 rounded-lg overflow-hidden relative flex flex-col justify-between h-[340px]">
                          {/* Top Specs Bar */}
                          <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-center bg-black/75 backdrop-blur-md px-2.5 py-1.5 rounded border border-white/5 text-[9px]">
                            <span className="text-gray-400 font-mono flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping shrink-0" />
                              WARM RENDER SCENE / 场景 ({(feederScenarioIndex + 1)}/10)
                            </span>
                            <button
                              onClick={() => {
                                const scImages = [
                                  'https://i.postimg.cc/7LZ1RV5G/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban01.jpg',
                                  'https://i.postimg.cc/5t25r3XF/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban02.jpg',
                                  'https://i.postimg.cc/HLk0N2rJ/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban03.jpg',
                                  'https://i.postimg.cc/0NXG1wSr/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban06.jpg',
                                  'https://i.postimg.cc/8CXdg6v6/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban09.jpg',
                                  'https://i.postimg.cc/mrp3WH99/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban10.jpg',
                                  'https://i.postimg.cc/HLv01yM5/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban11.jpg',
                                  'https://i.postimg.cc/8CXdg6vL/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban12.jpg',
                                  'https://i.postimg.cc/wB45YmNk/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban15.jpg',
                                  'https://i.postimg.cc/CKrCpq8G/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban13.jpg'
                                ];
                                const labels = [
                                  '客厅双向高清对讲逗宠画格',
                                  '猫咪食盆大特写余粮判定图',
                                  '出差远程一键视频高清联动',
                                  '萌宠盼望守护出粮幸福时刻',
                                  '高清防抖红外夜视安全守护',
                                  '密封阻隔潮气防虫除湿极净舱',
                                  '宠物贴近撒娇温馨对讲生活',
                                  '食量精准感应定时定量规划分发',
                                  '高颜值契合现代化精装客厅生态',
                                  '饭盆超清特写舔粮憨态场景'
                                ];
                                setActiveLightboxItem({
                                  id: `pf-scene-${feederScenarioIndex}`,
                                  title: `喂食器生活场景 · ${labels[feederScenarioIndex]}`,
                                  description: `超清高拟真影棚采调色，是核心新媒体种草、KOL铺设及众筹上线的主视觉核心画框。`,
                                  category: 'scenes',
                                  image: scImages[feederScenarioIndex],
                                  specs: '1080 x 1440 · JPG',
                                  channel: '小红书种草 / 抖音信息流 / 线下巨画'
                                });
                              }}
                              className="px-2 py-0.5 rounded bg-purple-500/20 hover:bg-purple-500 text-purple-450 hover:text-white transition-all text-[9px] font-semibold cursor-pointer"
                            >
                              放大 100% 精美原图
                            </button>
                          </div>

                          {/* Image Box */}
                          <div 
                            className="flex-1 flex items-center justify-center overflow-hidden cursor-zoom-in relative bg-black/60 group/sc"
                            onClick={() => {
                              const scImages = [
                                'https://i.postimg.cc/7LZ1RV5G/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban01.jpg',
                                'https://i.postimg.cc/5t25r3XF/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban02.jpg',
                                'https://i.postimg.cc/HLk0N2rJ/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban03.jpg',
                                'https://i.postimg.cc/0NXG1wSr/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban06.jpg',
                                'https://i.postimg.cc/8CXdg6v6/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban09.jpg',
                                'https://i.postimg.cc/mrp3WH99/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban10.jpg',
                                'https://i.postimg.cc/HLv01yM5/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban11.jpg',
                                'https://i.postimg.cc/8CXdg6vL/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban12.jpg',
                                'https://i.postimg.cc/wB45YmNk/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban15.jpg',
                                'https://i.postimg.cc/CKrCpq8G/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban13.jpg'
                              ];
                              const labels = [
                                '客厅双向高清对讲逗宠画格',
                                '猫咪食盆大特写余粮判定图',
                                '出差远程一键视频高清联动',
                                '萌宠盼望守护出粮幸福时刻',
                                '高清防抖红外夜视安全守护',
                                '密封阻隔潮气防虫除湿极净舱',
                                '宠物贴近撒娇温馨对讲生活',
                                '食量精准感应定时定量规划分发',
                                '高颜值契合现代化精装客厅生态',
                                '饭盆超清特写舔粮憨态场景'
                              ];
                              setActiveLightboxItem({
                                id: `pf-scene-${feederScenarioIndex}`,
                                title: `喂食器生活场景 · ${labels[feederScenarioIndex]}`,
                                description: `超清高拟真影棚采调色，是核心新媒体种草、KOL铺设及众筹上线的主视觉核心画框。`,
                                category: 'scenes',
                                image: scImages[feederScenarioIndex],
                                specs: '1080 x 1440 · JPG',
                                channel: '小红书种草 / 抖音信息流 / 线下巨画'
                              });
                            }}
                          >
                            <AnimatePresence mode="wait">
                              <motion.img
                                key={feederScenarioIndex}
                                src={[
                                  'https://i.postimg.cc/7LZ1RV5G/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban01.jpg',
                                  'https://i.postimg.cc/5t25r3XF/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban02.jpg',
                                  'https://i.postimg.cc/HLk0N2rJ/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban03.jpg',
                                  'https://i.postimg.cc/0NXG1wSr/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban06.jpg',
                                  'https://i.postimg.cc/8CXdg6v6/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban09.jpg',
                                  'https://i.postimg.cc/mrp3WH99/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban10.jpg',
                                  'https://i.postimg.cc/HLv01yM5/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban11.jpg',
                                  'https://i.postimg.cc/8CXdg6vL/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban12.jpg',
                                  'https://i.postimg.cc/wB45YmNk/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban15.jpg',
                                  'https://i.postimg.cc/CKrCpq8G/mi-jia-zhi-neng-chong-wu-wei-shi-qi2-ke-shi-ban13.jpg'
                                ][feederScenarioIndex]}
                                alt={`场景图-${feederScenarioIndex}`}
                                referrerPolicy="no-referrer"
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.25 }}
                                className="w-full h-full object-cover select-none group-hover/sc:scale-[1.03] transition-transform duration-500"
                              />
                            </AnimatePresence>

                            {/* Click to zoom indicator banner */}
                            <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover/sc:opacity-100 transition-opacity pointer-events-none">
                              <span className="bg-purple-600 text-white text-[9px] font-bold px-2.5 py-1 rounded shadow-lg flex items-center gap-1">
                                <Search size={9} /> 点击放大体验 2.5x 坐标极限检视
                              </span>
                            </div>

                            {/* Nav arrow buttons */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setFeederScenarioIndex((prev) => (prev === 0 ? 9 : prev - 1));
                              }}
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/95 text-white flex items-center justify-center border border-white/10 hover:border-white/30 transition-all cursor-pointer shadow-lg z-10"
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setFeederScenarioIndex((prev) => (prev === 9 ? 0 : prev + 1));
                              }}
                              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/95 text-white flex items-center justify-center border border-white/10 hover:border-white/30 transition-all cursor-pointer shadow-lg z-10"
                            >
                              <ChevronRight size={16} />
                            </button>
                          </div>

                          {/* Footer text list */}
                          <div className="bg-[#050508] px-4 py-2 flex justify-between items-center border-t border-white/5">
                            <span className="text-[10px] text-gray-400 font-sans truncate">
                              {[
                                '01. 客厅双向高清对讲逗宠画格',
                                '02. 猫咪食盆大特写余粮判定图',
                                '03. 出差远程一键视频高清联动',
                                '04. 萌宠盼望守护出粮幸福时刻',
                                '05. 高清防抖红外夜视安全守护',
                                '06. 密封阻隔潮气防虫除湿极净舱',
                                '07. 宠物贴近撒娇温馨对讲生活',
                                '08. 食量精准感应定时定量规划分发',
                                '09. 高颜值契合现代化精装客厅生态',
                                '10. 饭盆超清特写舔粮憨态场景'
                              ][feederScenarioIndex]}
                            </span>
                            <div className="flex gap-1 shrink-0">
                              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((dot) => (
                                <button
                                  key={dot}
                                  onClick={() => setFeederScenarioIndex(dot)}
                                  className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                                    feederScenarioIndex === dot ? 'bg-purple-500 w-3' : 'bg-gray-700 hover:bg-gray-500'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Tab 3: 电商详细推广图 */}
                    {activeFeederTab === 'details' && (
                      <motion.div
                        key="feeder-details"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-white/[0.01] border border-white/5 rounded-xl p-4.5"
                      >
                        {/* Left Side: Detail Info & Launch Button */}
                        <div className="md:col-span-4 flex flex-col justify-between space-y-4">
                          <div className="text-left space-y-2">
                            <span className="text-[9px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded font-bold">
                              MODULE 03
                            </span>
                            <h5 className="text-sm font-semibold text-white tracking-tight">3. 官方首发众筹商详</h5>
                            <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                              米家智能宠物喂食器 2 可视版官方完整电商长详情页，共由 27 张高精高保真切片精密拼合而成。
                            </p>
                            <p className="text-[11px] text-gray-500 font-sans leading-relaxed">
                              深度包装“1080P黄金碗上主摄扫除盲区”、“主动防卡塞六叶硅胶轮”、“双向语音随时撩宠”、“三重防潮极致舱壁”等大单品上市重磅卖点。
                            </p>
                          </div>

                          <div className="pt-3 border-t border-white/5 space-y-3">
                            <div className="bg-black/40 p-3 rounded border border-white/5 space-y-1.5">
                              <div className="text-[10px] text-gray-400">核心设计资源库</div>
                              <button
                                onClick={() => {
                                  setActiveLightboxItem({
                                    id: 'pf-det-1',
                                    title: '米家宠物“水+粮一体大单品套装”联合引流销售宣传海报',
                                    description: '喂食器可视版与饮水机2代两款高端旗舰并列伫立，传递全方位洁净水、新鲜粮科技概念，提供一站式买家套餐优惠。',
                                    category: 'campaign',
                                    image: 'https://i.postimg.cc/5yjhgLVF/jie-ping2026-06-21-15-05-35.png',
                                    specs: '3840 x 1440 · PNG',
                                    channel: '新品首发线上组合Banner'
                                  });
                                }}
                                className="w-full text-left p-2 rounded bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-[10px] text-indigo-400 hover:text-white transition-all flex items-center justify-between cursor-pointer"
                              >
                                <span>🔗 关联：水粮大单品联合海报</span>
                                <span className="text-[8px] font-mono text-gray-500 shrink-0">3840 x 1440</span>
                              </button>
                            </div>

                            <button
                              onClick={() => {
                                setActiveLightboxItem({
                                  id: 'pf-det-0',
                                  title: '米家智能宠物喂食器 2 可视版官方完整众筹详情页 (27张切片拼接)',
                                  description: '小米宠物可视喂食器2代首发众筹官方商详拼接大图，共 27 张高清高保真切片，精准还原黄金俯拍主摄、自动锁鲜分粮、多端语音联动等全场景看护爆发亮点。',
                                  category: 'campaign',
                                  image: 'https://i.postimg.cc/q7D5WZFx/jing-dong750xiang-qing-01.jpg',
                                  slices: PET_FEEDER_2_SLICES,
                                  specs: '27高清切片 · 750w极清',
                                  channel: '官方详情页展示 / 27切片长图'
                                });
                              }}
                              className="w-full py-2 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white transition-all text-[11px] font-bold rounded flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                            >
                              <Maximize2 size={11} /> 启动全画幅沉浸阅读
                            </button>
                          </div>
                        </div>

                        {/* Right Side: Scrollable Long Image Container */}
                        <div className="md:col-span-8 bg-black/45 border border-white/5 rounded-lg overflow-hidden relative flex flex-col h-[340px]">
                          {/* Top Status Clue bar */}
                          <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-center bg-black/85 backdrop-blur-md px-2.5 py-1.5 rounded border border-white/5 text-[9px] select-none">
                            <span className="text-gray-400 font-mono">
                              PREVIEW / 喂食器 2 可视版商详长页滚动预览
                            </span>
                            <span className="text-indigo-400 font-mono animate-pulse flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block animate-ping" />
                              ↕ 鼠标悬浮滚动
                            </span>
                          </div>

                          {/* Scrollable Slices Wrapper */}
                          <div 
                            onClick={() => {
                              setActiveLightboxItem({
                                id: 'pf-det-0',
                                title: '米家智能宠物喂食器 2 可视版官方完整众筹详情页 (27张切片拼接)',
                                description: '小米宠物可视喂食器2代首发众筹官方商详拼接大图，共 27 张高清高保真切片，精准还原黄金俯拍主摄、自动锁鲜分粮、多端语音联动等全场景看护爆发亮点。',
                                category: 'campaign',
                                image: 'https://i.postimg.cc/q7D5WZFx/jing-dong750xiang-qing-01.jpg',
                                slices: PET_FEEDER_2_SLICES,
                                specs: '27高清切片 · 750w极清',
                                channel: '官方详情页展示 / 27切片长图'
                              });
                            }}
                            className="flex-1 overflow-y-auto bg-[#09090d] p-3 pt-12 relative cursor-zoom-in group/img"
                            style={{ scrollbarWidth: 'thin' }}
                          >
                            <div className="flex flex-col w-full max-w-[420px] mx-auto shadow-2xl border border-white/5 rounded overflow-hidden">
                              {PET_FEEDER_2_SLICES.map((url, idx) => (
                                <img
                                  key={idx}
                                  src={url}
                                  alt={`Feeder 2 slice ${idx + 1}`}
                                  className="w-full h-auto block select-none border-0"
                                  loading="lazy"
                                  referrerPolicy="no-referrer"
                                />
                              ))}
                            </div>
                            
                            {/* Hover scale overlay banner */}
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                              <span className="px-3 py-1.5 bg-black/80 text-white border border-white/10 rounded text-[10px] font-medium backdrop-blur-xs flex items-center gap-1.5">
                                <Maximize2 size={11} className="text-indigo-400" /> 点击启动全画幅大图拼接阅读
                              </span>
                            </div>
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none flex items-end justify-center pb-2 rounded-b-lg">
                            <span className="text-[8px] font-mono text-indigo-400 select-none tracking-widest uppercase">↕ Scroll To Explore / 27 连图切片滚动 ↕</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

              {/* Modal Box Footer */}
              <div className="px-6 py-4.5 border-t border-white/5 bg-[#08080c] flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-8.5 h-8.5 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                    <MessageSquare size={15} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">想了解如何冲刺3个月春节极限时间线吗？</p>
                    <p className="text-[10px] text-gray-500 font-sans">点击AI一键分析，代入春节工厂停滞排期及多产品联合推新玩法，探讨更成熟的供应链卡位策略与KOL引爆势能！</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => {
                      const askPrompt = `我想深度策划“米家智能宠物喂食器 2 可视版”在春节三个月节点下的GTM爆量手段。请重点推演:(1)碗上黄金主摄的极高溢价心智建立；(2)如何协同饮水机等建立科学喂养套餐矩阵、打包销售的实操路径大纲？`;
                      onPreFillChat(askPrompt);
                      setActiveSubProjectDetail(null);
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    AI 深度研讨论证此品 <ArrowRight size={12} />
                  </button>
                  <button
                    onClick={() => setActiveSubProjectDetail(null)}
                    className="px-3.5 py-2 border border-white/10 hover:border-white text-gray-300 hover:text-white rounded-full text-xs font-semibold transition-all cursor-pointer bg-white/5"
                  >
                    关闭并返回
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Seamless Global Interactive Lightbox Viewer with 2.5x Precision Zoom */}
      <AnimatePresence>
        {activeLightboxItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-black/95 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLightboxItem(null)}
              className="absolute inset-0 cursor-zoom-out"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full bg-[#0d0d12] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 max-h-[90vh]"
            >
              {/* Close Button top-right */}
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="absolute top-4 right-4 z-20 w-8.5 h-8.5 rounded-full bg-black/50 border border-white/10 hover:border-white/30 flex items-center justify-center text-gray-300 hover:text-white transition-all cursor-pointer"
              >
                <X size={15} />
              </button>

              {/* Left Column: Huge visual workspace with seamless coordinate scale zooming */}
              <div 
                className="flex-1 bg-black/50 flex items-center justify-center relative overflow-hidden border-b md:border-b-0 md:border-r border-white/5 min-h-[280px] md:min-h-[480px] select-none animate-fade-in"
                onMouseMove={(e) => {
                  if (!lightboxZoomed || activeLightboxItem.slices) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  setLightboxPan({ x, y });
                }}
              >
                {activeLightboxItem.slices ? (
                  <div className="w-full h-full flex flex-col items-center justify-start overflow-y-auto py-6" style={{ scrollbarWidth: 'thin', maxHeight: '78vh' }}>
                    <div className="w-full max-w-[420px] bg-[#09090c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col p-1.5 font-sans">
                      {/* Simulated smart watch or device display notch */}
                      <div className="w-full h-6 bg-[#040406] flex items-center justify-between px-3.5 text-[8.2px] text-gray-500 border-b border-white/[0.04] mb-1 select-none">
                        <span>📊 5G</span>
                        <span className="font-mono text-gray-300 font-bold select-none flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                          {activeLightboxItem.id === 'mat-detail-pro' ? '门铃 4 Pro 商详切片' : 
                           activeLightboxItem.id === 'mat-detail-bw500' ? '室外摄像头 BW500 商详切片' : 
                           activeLightboxItem.id === 'wd-det-0' ? '智能宠物饮水机 2代商详切片' :
                           activeLightboxItem.id === 'wd-det-1' ? '饮水机 2代滤芯套装商详切片' :
                           activeLightboxItem.id.startsWith('pf-det-') ? '宠物喂食器 2代商详切片' :
                           '门铃 4 极简版商详切片'}
                        </span>
                        <span>09:41 AM</span>
                      </div>
                      
                      <div className="w-full overflow-y-auto space-y-0 text-center" style={{ scrollbarWidth: 'none', maxHeight: '68vh' }}>
                        {activeLightboxItem.slices.map((sliceUrl, idx) => (
                          <img 
                            key={idx} 
                            src={sliceUrl} 
                            alt={`Slice ${idx+1}`} 
                            className="w-full h-auto block select-none border-0 m-0 p-0 animate-fade-in" 
                            loading="lazy" 
                            referrerPolicy="no-referrer"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center p-5 relative"
                    style={{ perspective: '1000px' }}
                  >
                    <img 
                      src={activeLightboxItem.image} 
                      alt={activeLightboxItem.title} 
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxZoomed(prev => !prev);
                      }}
                      className={`max-w-full max-h-[55vh] md:max-h-[75vh] object-contain transition-all duration-300 ease-out origin-center ${
                        lightboxZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in hover:brightness-110'
                      }`}
                      style={
                        lightboxZoomed ? {
                          transform: 'scale(2.5)',
                          transformOrigin: `${lightboxPan.x}% ${lightboxPan.y}%`,
                          transition: 'transform 0.15s ease-out, transform-origin 0.15s ease-out'
                        } : {
                          transform: 'scale(1)',
                          transformOrigin: 'center center'
                        }
                      }
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (img.src.endsWith('.png')) {
                          img.src = img.src.replace('.png', '.jpg');
                        } else if (img.src.endsWith('.jpg')) {
                          img.src = img.src.replace('.jpg', '.jpeg');
                        } else if (img.src.endsWith('.jpeg')) {
                          img.src = img.src.replace('.jpeg', '.webp');
                        }
                      }}
                    />
                  </div>
                )}

                {/* Floating Chevron Navigation Left */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox('prev');
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-black/90 border border-white/15 hover:border-white/40 text-gray-200 hover:text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.6)] group"
                  title="上一张 (←)"
                >
                  <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" />
                </button>

                {/* Floating Chevron Navigation Right */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox('next');
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-black/90 border border-white/15 hover:border-white/40 text-gray-200 hover:text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.6)] group"
                  title="下一张 (→)"
                >
                  <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Interactive floating clue banner */}
                <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none flex items-center gap-1.5 bg-black/80 px-2.5 py-1 rounded border border-white/10 text-[9px] text-[#e4e4e7] animate-pulse">
                  <span className={`w-1.5 h-1.5 rounded-full ${lightboxZoomed ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                  <span>{lightboxZoomed ? '移动鼠标全画幅检视 / 点击还原' : '点击图片开启 2.5x 像素级极限放大'}</span>
                </div>
                
                {/* Floating bottom status bar */}
                <div className="absolute bottom-3.5 right-3.5 z-10 font-mono text-[8.5px] bg-[#000]/75 border border-white/10 text-emerald-400 px-2.5 py-1 rounded select-none tracking-widest uppercase shadow-lg">
                  SCALE HD RENDER / 解析率: {activeLightboxItem.specs}
                </div>
              </div>

              {/* Right Column: details and metadata info */}
              <div className="w-full md:w-[320px] p-5 select-none text-left flex flex-col justify-between bg-[#111116] space-y-4 font-sans">
                <div className="space-y-4">
                  <div className="inline-block">
                    <span className={`text-[7.5px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                      activeLightboxItem.category === 'hd-visuals' ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' :
                      activeLightboxItem.category === 'scenes' ? 'bg-amber-500/20 border-amber-500/30 text-amber-400' :
                      'bg-purple-500/20 border-purple-500/30 text-purple-400'
                    }`}>
                      {activeLightboxItem.category === 'hd-visuals' ? '3D渲染 / 高精模型' :
                       activeLightboxItem.category === 'scenes' ? '新媒体图' :
                       '商品详情页'}
                    </span>
                  </div>

                  <h4 className="text-[13px] font-semibold text-white tracking-tight leading-snug">
                    {activeLightboxItem.title}
                  </h4>

                  <div className="space-y-1.5 border-t border-b border-white/5 py-3">
                    <span className="text-[8.5px] font-bold text-gray-500 block uppercase font-mono tracking-wider">物料策划与主视要点建议：</span>
                    <p className="text-[10px] text-gray-400 leading-relaxed font-light">
                      {activeLightboxItem.description}
                    </p>
                  </div>

                  <div className="space-y-2 text-[9px]">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 font-mono">🎯 营销分发频道:</span>
                      <span className="text-gray-300 text-right max-w-[160px] truncate font-medium" title={activeLightboxItem.channel}>
                        {activeLightboxItem.channel}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 font-mono">📐 图素分辨率:</span>
                      <span className="text-gray-300 font-mono font-medium">{activeLightboxItem.specs}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex flex-col gap-1.5">
                  <a
                    href={activeLightboxItem.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-1.8 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10px] font-bold text-center transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Download size={11} /> 在独立标签页中载入大图
                  </a>
                  <button
                    onClick={() => setActiveLightboxItem(null)}
                    className="w-full py-1.5 border border-white/10 hover:border-white/20 hover:bg-white/5 text-gray-400 hover:text-white rounded text-[9px] text-center transition-all cursor-pointer font-medium animate-pulse"
                  >
                    关闭本张视图
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
