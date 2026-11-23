import { Project, WorkExperience, EducationData, HobbiesData } from './types';

export const personalInfoEN = {
  name: '黄友情',
  englishName: 'Youqing Huang',
  title: 'GTM / Brand Marketing Lead',
  subTitle: 'Go-To-Market & Brand Marketing Lead',
  location: 'Shanghai',
  phone: '13800138000',
  email: 'contact@example.com',
  wechat: '13800138000',
  birth: '19XX.XX',
  bio: 'I am Huang Youqing (Aurora), former Go-To-Market and IMC Lead at 70mai (Xiaomi Ecosystem). A dual-profile marketing champion combining direct Xiaomi hardware GTM deployment with prestigious advertising agency artistic creative. Obsessed with high-production visuals, precision copy engineering, and streamlining outputs via AIGC workflows.'
};

export const projectsEN: Project[] = [
  {
    id: 'proj_xiaomi',
    title: 'Xiaomi Smart Pet/Security Product Line Launch Campaign',
    category: 'Product Planning / IMC',
    date: '2023.05 - Present',
    client: 'Xiaomi / Mijia',
    description: "Responsible for domestic + overseas marketing launches of Xiaomi's smart pet and security product lines, coordinating product sites and promotional content.",
    highlights: [
      'Architected end-to-end GTM campaigns and cross-regional launch timelines for Xiaomi Mijia smart home lines.',
      'Supervised ultra-premium, interactive product page assets, e-commerce highlights, and high-conversion assets.',
      'Enabled smooth internal collaborations and synced division branches, facilitating highly successful global launches.'
    ],
    metrics: [
      { value: '8+', label: 'Market Coordination Lead' },
      { label: 'Market Reach', value: 'Global Release' }
    ],
    tags: ['Product Planning', 'IMC', 'Mijia Ecosystem', 'Security Line'],
    bgGradient: 'from-cyan-900/40 via-slate-900 to-black',
    imageType: 'dashcam',
    image: '/src/assets/images/dashcam_a810_1780977202798.png'
  },
  {
    id: 'proj_70mai_gtm',
    title: '70mai Self-developed Smart Dashcam Series S-Class Releases',
    category: 'GTM / Creative / Product Planning',
    date: '2020.11 - Present',
    client: '70mai',
    description: 'GTM launch campaigns of self-developed smart dashcams (leading 11 S-Class products). Role: Product & Content Curation Lead, Campaign Asset Supervisor. Core Responsibilities: Formulating unique selling points (USPs) from scratch, designing creative campaigns, and overseeing all marketing deliverables.',
    highlights: [
      'Orchestrated 11 flagship S-Class dashcam premieres, compiling overall GTM briefs (accumulating 52 core plans).',
      'Translated complex optical properties into digestible human-interest hooks and robust safety narratives.',
      'Aligned art direction, retail packages, and press kits to optimize retail conversion on day-1.'
    ],
    metrics: [
      { value: '43+', label: '70mai Projects' },
      { label: 'S-Class Directed', value: '11 Launches' }
    ],
    tags: ['GTM Strategy', 'User-testing', 'Product Planning', 'Launch Playbook'],
    bgGradient: 'from-amber-900/40 via-neutral-900 to-black',
    imageType: 'camera',
    image: 'https://i.postimg.cc/Z5LrFtcC/2-28-yun-nan-se-cai-zhi-lu-70mai-M800-wei-bo.jpg'
  },
  {
    id: 'proj_brand_ip',
    title: '70mai Official Portal Production & Brand Mascot MaiX Campaign',
    category: 'Brand, Creative & IP Marketing',
    date: '2022.05',
    client: '70mai',
    description: 'Built the international 70mai corporate portal from 0 to 1 (UX, layout, dev sync), launching a pioneering 4K premium media showcase. Conceptualized virtual mascot companion MaiX (Astro Bear), syncing with X200 storyteller stories, safety-tests, and persistent community engagement operations.',
    highlights: [
      'Pioneered 4K video showcase on the official portal, reshaping consumer perception of video clarity.',
      'Designed corporate virtual mascot MaiX with interactive 3D emojis, comic series, and premium physical peripherals.',
      'Sparked massive viral growth in online tech communities, boosting engagement indices by 50%+.'
    ],
    metrics: [
      { value: '2+', label: 'Brand Campaigns' },
      { label: 'Peripheral Items', value: '4 Products' }
    ],
    tags: ['Mascot Design', 'Web Production', 'Community Growth', 'Private Domain'],
    bgGradient: 'from-orange-950/40 via-stone-900 to-black',
    imageType: 'organic',
    image: '/src/assets/images/xinjiang_desert_1780977231997.png'
  },
  {
    id: 'proj_tvc_4a',
    title: 'CCTV hums TVC Campaign & Premium FMCG Creative Directing',
    category: 'FMCG, Digital Tech & 4A Agency',
    date: '2019.09 - 2020.11',
    client: 'CCTV & Unilever etc.',
    description: 'Served FMCG global giants with 4A-quality cinematic campaigns, creating multi-million budget TV commercials broadcasted on CCTV and national television networks.',
    highlights: [
      'Drafted cinematic master TVC for Deye, broadcasted in golden-spots on China Central Television (CCTV).',
      'Configured premium Douyin/TikTok viral campaigns and micro-story scripts for Unilever LUX & OMO.',
      'Supervised 30+ large-scale video campaigns and brand bidding proposals with supreme success rates.'
    ],
    metrics: [
      { value: '25+', label: 'Cinematic TVCs' },
      { label: 'Total Narratives', value: '30+ Campaigns' }
    ],
    tags: ['CCTV Slot', '4A Copywriting', 'Unilever LUX', 'Deye Star TVC'],
    bgGradient: 'from-violet-900/40 via-zinc-950 to-black',
    imageType: 'unilever',
    image: '/src/assets/images/maix_mascot_1780977248089.png'
  }
];

export const workExperienceEN: WorkExperience[] = [
  {
    id: 'exp_70mai',
    company: '70mai Co., Ltd (Xiaomi Ecosystem)',
    logoText: '70mai',
    title: 'Go-To-Market & Market Planning Manager',
    location: 'Shanghai',
    period: '2020.11 - Present',
    description: [
      'Led Xiaomi business coordinates, ecosystem launches, and international GTM pipelines for hot-selling devices.',
      'Directed GTM campaign tracks and TVC shoots, supervising 1000+ visual creative pieces with meticulous art quality.',
      'Partnered deep-tier tech publications to co-produce long-trip travel documentary contents and rugged field test series.',
      'Curated content schedules across WeChat, Weibo and TikTok, inventing MaiX mascot companion to gamify private communities.'
    ],
    highlights: [
      'Orchestrated 11 S-Class hardware launches, propelling the flagship 4K dashcam to the #1 bestseller.',
      'Authored 52 core product marketing briefs, GTM cookbooks and alignment specifications.',
      'Pioneered AIGC integration (Midjourney, Stable Diffusion) in storyboard drafts, improving early ideation speed by 50%.'
    ]
  },
  {
    id: 'exp_shundong',
    company: 'Shundong International Media',
    logoText: 'SD Media',
    title: 'Copywriter & Creative Planner',
    location: 'Shanghai',
    period: '2019.09 - 2020.11',
    description: [
      'Authored brand commercial blueprints, TVC storyboards, and digital campaigns for household hums including Unilever, Siemens, Deye, and Sany.',
      'Wrote 30+ comprehensive, successful broadcast scripts airing in hot CCTV-1 slots.',
      'Supervised directors, narrators and editors to enforce timing, tone and subtitle fidelity.'
    ],
    highlights: [
      'Successfully coordinated commercial production and brief alignments for over 30 leading brands.',
      'Won multiple high-budget corporate pitches via compelling, high-concept proposals.'
    ]
  },
  {
    id: 'exp_fantuo',
    company: 'Frontop Digital Creative',
    logoText: 'Frontop',
    title: 'Video General Planner',
    location: 'Shanghai',
    period: '2018.03 - 2019.07',
    description: [
      'Innovated concept screenplay layouts and urban engineering 3D visuals for real-estate majors Vanke, country Garden, and CSCEC.',
      'Configured master bidding scripts and vocal voiceover files for high-profile smart-hub projects.',
      'Provided on-site script supervision, collaborating with renderers for CGI scene accuracy.'
    ],
    highlights: [
      'Won design bids for Hangzhou Vanke Auto Town, Country Garden Merlin and luxury real-estate reels.',
      'Specialized in monumental narratives for governmental development and metropolitan engineering catalogs.'
    ]
  }
];

export const educationEN: EducationData = {
  school: 'Nanchang University (National Project 211, Elite University)',
  degree: 'Bachelor of Arts (BA)',
  major: 'Advertising & Communications Major',
  period: '2014.09 - 2018.06',
  gpa: '3.6 / 4.0 (Top 20% Placement honors)',
  courses: [
    'Advertising Strategy & Media Planning',
    'Film & Framing Photography Aesthetics',
    'Visual Communication & Graphic Design',
    'Mass Media Studies & Foundations',
    'Art Direction & Ad Copywriting',
    'Journalism & Social Network Psychology'
  ],
  highlights: [
    'Earned 16 national, provincial and honorary awards and scholarships across 4 collegiate terms.',
    'Honored as the Graduation Valedictorian & Class 2018 Outstanding Alchemist.'
  ]
};

export const hobbiesEN: HobbiesData = {
  categories: [
    {
      icon: 'BookOpen',
      title: 'Humanistic Thinker',
      items: ['Deep reading of classical Chinese Sages', 'Harari\'s Sapiens trilogy studies', 'Socio-historical frameworks']
    },
    {
      icon: 'Milestone',
      title: 'Sci-Fi Enthusiast',
      items: ['Dune cinematic worldbuilding', 'Three-Body cosmic sociology theory', 'Classic speculative sci-fi series']
    },
    {
      icon: 'Compass',
      title: 'Roadtrip Wanderer',
      items: ['Deep regional exploration roadtrips', 'Capturing local ethnic identities', 'Aesthetic lifestyle curations']
    },
    {
      icon: 'PenTool',
      title: 'Creative Scripting',
      items: ['Authoring standalone fantasy universe outlines', 'Designing speculative plots', 'Curating visual archives']
    }
  ],
  text: '"Living high-vibe at the intersection of letters, horizons and innovative tech." Unlocking creative drive from dense readings and long roadtrips. Infusing commercial recipes with humanistic warmth.'
};

export const uiTranslations = {
  zh: {
    // Nav
    works: "作品案例",
    experience: "履历",
    about: "关于我",
    aiChat: "AI助理",
    contact: "联系方式",
    gtmLead: "GTM 营销主管",
    
    // Hero
    badgeHeader: "15款+ S级智能新品上市 I 30+品牌服务案例",
    heroTitle: "让硬科技拥抱人文光芒",
    heroSubtitle: "前沿智能硬件上市(GTM)与高端TVC视觉营销的整合行者",
    heroDescription: "我是黄友情（Aurora），曾任70迈（小米生态链）市场策划主管，兼具智能硬件产品上市经验与4A广告服务商创意的复合型营销专家。注重创意品控与高端视觉，善于深挖用户痛点，用策略链接内外部资源，并积极拥抱AIGC市场赋能。",
    btnWorks: "作品案例",
    btnAiChat: "问答我的AI特助",
    footerLocation: "上海 · 随时可沟通",
    footerCredential: "211本科",
    footerRecord: "小米生态链爆款印记",
    footerExperience: "8年实战经验",
    
    // Portfolio
    portfolioSub: "全案记录",
    portfolioTitle: "作品与上市全案记录",
    portfolioDesc: "参考前沿科技与时尚双重属性，展现友情从自研智能硬件GTM爆盘到国际五百强快消品牌文案的卓越沉淀。",
    allProjects: "全部项目",
    projectClient: "客户 / 委托方",
    projectDate: "策划时间",
    projectCategory: "项目分类",
    projectHighlights: "全案攻坚闪光表现",
    projectMetrics: "硬核交付成果量化",
    projectClose: "关闭详情",
    projectChatPrompt: "向AI助理提问该项目的更多细节",
    
    // Experience
    expSub: "CAREER CHRONICLE & METHODOLOGY",
    expTitle: "工作履历与专业流盘",
    expDesc: "从数字创业板上市公司到小米生态链核心爆品推手，友情以极其靠谱的创意策划与执行，印证职业巅峰标准。",
    expCoreDuties: "CORE RESPONSIBILITIES / 核心工作职责与布局",
    expAchievements: "SPOTLIGHTS & ACHIEVEMENTS / 攻坚闪光点与产出",
    
    // Launch Workflow
    workflowTitle: "S级智能硬件首发上市全链法",
    workflowDesc: "沉淀了11+智能硬件GTM及30+核心商业TVC监盘实操，提炼出一套极富增长爆发力的闭环首发打法盘面：",
    workflowDeliverables: "核心产出交付：",
    launchWorkflow0: "核心卖点及硬核策略规划 (Strategy & Selling Points)",
    launchWorkflowRole0: "GTM 统筹起盘",
    launchWorkflowDesc0: "在产品立项初期深挖技术参数，凝练成打动最终消费者的白皮书卖点。在小米生态链期间，友情累计为主导产品出核心策划案达52份。",
    launchWorkflowDeli0_0: "撰写产品关键指导文件",
    launchWorkflowDeli0_1: "拟定制订上市排期表",
    launchWorkflowDeli0_2: "提炼高画质/高性能痛点",

    launchWorkflow1: "高品质 TVC / 影视平面创意 (Creative TVC & Production)",
    launchWorkflowRole1: "视觉品控监制",
    launchWorkflowDesc1: "联合顶级制片导演与物料供应商，跟进1对分镜，确保高奢视觉拉高溢价区间。她曾为联合利华、德业及西门子独立执笔并监制TVC首发，广告最终成功登陆 CCTV 展播。",
    launchWorkflowDeli1_0: "拍摄微电影/抖音全案视频",
    launchWorkflowDeli1_1: "输出1000+套宣发质感图素",
    launchWorkflowDeli1_2: "保障物料安全性、一致性",

    launchWorkflow2: "主流数码头部媒体跨界共创 (Influencer & Cross-over Campaign)",
    launchWorkflowRole2: "破圈品牌营销",
    launchWorkflowDesc2: "联动《数字尾巴》、《中关村在线》、国家地理、专业摄影大咖以及影像艺术博览会等顶级资源，紧跟出行与自驾热点进行真实内容产出并展开深度评测更新。",
    launchWorkflowDeli2_0: "《云南色彩之旅》影像共创",
    launchWorkflowDeli2_1: "《南疆行》4000km硬核实测",
    launchWorkflowDeli2_2: "PR媒体发布与矩阵爆发式分发",

    launchWorkflow3: "全平台多链路运营与创新IP (Platform & Virtual Mascot IP)",
    launchWorkflowRole3: "闭环私域增长",
    launchWorkflowDesc3: "深度参与小米业务国内/海外上市。首创开发企业潮流3D IP形象「MaiX麦克斯」，将冷硬硬件温暖化。深度介入小米官网以及平台开发，打通BGC平台转化漏斗。",
    launchWorkflowDeli3_0: "首创4K展示平台与官网搭建",
    launchWorkflowDeli3_1: "MaiX潮玩外设周边开发",
    launchWorkflowDeli3_2: "公众号/抖音宣传安全审核监控",

    // About
    aboutSub: "关于友情",
    aboutTitle: "硬科技背后的智性灵魂",
    aboutDesc: "融合严密的GTM逻辑、深厚的名校广告理论造诣与极富探索欲的个人趣味。科技向前，人文向心。",
    eduTitle: "教育背景 & 理论厚度",
    eduSub: "学术背书",
    coursesTitle: "广告传播主干课程",
    awardsTitle: "主要奖项荣誉",
    awardsCount: "16项",
    awardsLabel: "校级/省级/国家级竞赛大奖",
    gpaCount: "Top 20%",
    gpaLabel: "南昌大学广告学专业绩点",
    hobbiesTitle: "个人兴趣与智性侧记",
    hobbiesSub: "业余爱好",
    aigcTitle: "AI提效拥抱手",
    aigcDesc: "在GTM排版图素策划、TVC意境原画构图和创意脚本发散三大体系中，主动引入AIGC工具箱（Midjourney / Stable Diffusion / Chat models），使头脑风暴原型输出速度成倍提升，积极在不确定性时代抢占先机。",
    
    // Chat
    chatSub: "交互式 AI 助理",
    chatTitle: "对话黄友情的 AI 求职助理",
    chatDesc: "该助理采用 Google Gemini-3.5-Flash 驱动（内置本地硬核容错策略），熟稔友情的所有真实履历、项目大招、求职意向以及生活细节。尽可向它提问面试问题！",
    chatRecPrompts: "推荐提问",
    chatPromptIntro: "招聘官/业界同道可通过下方精选代答，光速对齐项目履历底细与落地经验，省去频繁翻阅简历的疲惫：",
    chatInfoTitle: "数字分身说明",
    chatInfoDesc: "本助理被预置了友情在211高校广告理论积累、小米智能摄像头/宠物新品上市物料、GTM白皮书产出、LUX等顶级日化全周期脚本策划和她对沙丘/人类简史的洞悉。支持自然语言连续提问。",
    chatAssistantTitle: "黄友情 (Youqing) 的 AI 投履特助",
    chatAssistantStatus: "常驻上海",
    chatInputPlaceholder: "直接向友情提问（如：她在小米负责什么？她的联系电话是多少？）",
    
    // Contact
    contactSub: "诚挚对接",
    contactTitle: "起航下一座里程碑",
    contactDesc: "友情目前常驻上海，期待与您 and 您的产品共探 GTM上市全闭环统筹、品牌新营销升级 或 高端TVC/社交短视频方案 创意。常态化、深度实干，让品牌声量爆发。",
    phoneLabel: "移动电话",
    emailLabel: "电子信箱",
    wechatLabel: "微信二维码",
    btnQrcode: "展开二维码",
    formTitle: "发送留言",
    formDesc: "想跟友情直接勾兑或咨询面试？填写以下便签，即可瞬间向她传达情绪：",
    formName: "您的尊称",
    formNamePlaceholder: "例如：高经理 / 策划总监",
    formEmail: "联系邮箱",
    formEmailPlaceholder: "hr-dept@corporation.com",
    formMsg: "合作内容/便签详情",
    formMsgPlaceholder: "说点什么吧，比如：对您主导的70mai A810行车仪上市全案策划很有兴趣，想约你聊聊新硬件的GTM出海机会...",
    formSubmit: "发送便签",
    formSubmitted: "便签妥投！已抄送至友情",
    btnScrollTop: "返回顶部",
  },
  en: {
    // Nav
    works: "Works",
    experience: "Experience",
    about: "About Me",
    aiChat: "AI Chat",
    contact: "Contact",
    gtmLead: "GTM Lead",
    
    // Hero
    badgeHeader: "15+ S-Class Launches | 30+ Campaigns Case",
    heroTitle: "Breathe Narrative Into Hard Tech",
    heroSubtitle: "Go-To-Market Leader & Premium Creative TVC / Digital Curation Strategist",
    heroDescription: "I am Huang Youqing (Aurora), former Go-To-Market and IMC Lead at 70mai (Xiaomi Ecosystem). A dual-profile marketing champion combining direct Xiaomi hardware GTM deployment with prestigious advertising agency artistic creative. Obsessed with high-production visuals, precision copy engineering, and streamlining outputs via AIGC workflows.",
    btnWorks: "Works",
    btnAiChat: "Chat with my AI Assistant",
    footerLocation: "Shanghai · Available immediately",
    footerCredential: "211 Elite University Graduate",
    footerRecord: "Proven Xiaomi Bestsellers",
    footerExperience: "8+ Years Experience",
    
    // Portfolio
    portfolioSub: "GTM & BRAND CAMPAIGN SHOWCASE",
    portfolioTitle: "Portfolio of Works",
    portfolioDesc: "A master showcase merging advanced hardware product Go-To-Market deployments with classical FMCG copywriting craft.",
    allProjects: "ALL PROJECTS",
    projectClient: "Client / Brand",
    projectDate: "Campaigned At",
    projectCategory: "Campaign Segment",
    projectHighlights: "Campaign Execution Highlights",
    projectMetrics: "Quantifiable Performance Metrics",
    projectClose: "Close Details",
    projectChatPrompt: "Ask the AI assistant for more details on this campaign",
    
    // Experience
    expSub: "CAREER CHRONICLE & METHODOLOGY",
    expTitle: "Experience Timeline",
    expDesc: "From leading creative agencies to spearheading Xiaomi ecological hardware releases, delivering unparalleled commercial conversions.",
    expCoreDuties: "CORE RESPONSIBILITIES & STRATEGIES",
    expAchievements: "UNPARALLELED SPOTLIGHTS & RETRIECTIONS",
    
    // Launch Workflow
    workflowTitle: "S-Class Hardware GTM Deployment Method",
    workflowDesc: "Distilling 11+ major hardware debuts and 30+ TVC directions into a high-converting, repeatable Go-to-Market playbook:",
    workflowDeliverables: "Deliverables Captured:",
    launchWorkflow0: "Strategy & Selling Points",
    launchWorkflowRole0: "GTM Director",
    launchWorkflowDesc0: "Extracting hardware values during product R&D, compiling them into consumer-facing value cookbooks. Authored 52 core product marketing briefs during ecosystem terms.",
    launchWorkflowDeli0_0: "Compose key alignment briefs",
    launchWorkflowDeli0_1: "Formulate GTM calendars",
    launchWorkflowDeli0_2: "Deconstruct resolution & features",

    launchWorkflow1: "Creative TVC & Production",
    launchWorkflowRole1: "Creative Producer",
    launchWorkflowDesc1: "Partnering with cinematic directors and design firms to forge stellar storyboards, driving premium price tags. Designed TVC catalogs for Unilever, Deye, and Siemens on national CCTV television.",
    launchWorkflowDeli1_0: "Produce brand short viral clips",
    launchWorkflowDeli1_1: "Supervise 1,000+ asset designs",
    launchWorkflowDeli1_2: "Ensure aesthetic & story consistency",

    launchWorkflow2: "Influencer & Cross-over Campaign",
    launchWorkflowRole2: "Affiliate Strategist",
    launchWorkflowDesc2: "Co-branding with elite publishers like Digital Tail, ZOL, National Geographic, and master photographers to generate travelogues and long extreme-test contents.",
    launchWorkflowDeli2_0: "Co-build 'Yunnan Color Journey'",
    launchWorkflowDeli2_1: "Trial 4,000km desert field-tests",
    launchWorkflowDeli2_2: "Drive multi-media buzz distribution",

    launchWorkflow3: "Platform & Virtual Mascot IP",
    launchWorkflowRole3: "Private Growth Hacking",
    launchWorkflowDesc3: "Integrated Xiaomi marketplace launches. Conceived and delivered 3D mascot companion IP MaiX to add personality to hardware. Optimized official web platforms to drive BGC channel funnels.",
    launchWorkflowDeli3_0: "Construct 4K web showcases",
    launchWorkflowDeli3_1: "Engineer unique physical mascot toys",
    launchWorkflowDeli3_2: "Monitor brand social media compliance",

    // About
    aboutSub: "THE CANVAS OF ME",
    aboutTitle: "An Intellect and Creative Spirit",
    aboutDesc: "A harmonious synthesis of meticulous Go-To-Market analytical logic, rich advertising psychology background, and insatiable personal passions.",
    eduTitle: "Education & Theoretical Depth",
    eduSub: "University Credentials",
    coursesTitle: "MAJOR SELECTED COURSES",
    awardsTitle: "RECOGNIZED AWARDS & SCHOLARSHIPS",
    awardsCount: "16 Wins",
    awardsLabel: "National, Provincial & University Medals",
    gpaCount: "Top 20%",
    gpaLabel: "Advertising GPA rank, NCU",
    hobbiesTitle: "Personal Passions & Intellect",
    hobbiesSub: "Hobbies & Passions",
    aigcTitle: "AIGC AI-AGILE ADOPTER / AI Accelerator",
    aigcDesc: "Actively deploying Midjourney, Stable Diffusion, and LLM text generation across GTM layouts, TVC visualization storyboarding, and draft iterations to multiply daily creative velocity.",
    
    // Chat
    chatSub: "INTERACTIVE AI AGENT",
    chatTitle: "Interview Youqing's AI特助",
    chatDesc: "Built with the Gemini-3.5-Flash model, this agent is fully trained on Youqing's background, professional metrics, resume milestones, and personal hobbies. Start asking questions directly!",
    chatRecPrompts: "RECOMMENDED PROMPTS",
    chatPromptIntro: "Recruiters and industry peers can click these pre-designed prompts to instantly align on Youqing's credentials without fatigue:",
    chatInfoTitle: "AI Double Information Statement",
    chatInfoDesc: "Trained on NCU Advertising core strategies, 70mai camera launch recipes, CCTV humidifier promotions, LUX visual guidelines, and her deep appreciation for Dune and Homo Sapiens.",
    chatAssistantTitle: "Youqing Huang's AI Double Assistant",
    chatAssistantStatus: "STATUS: STABLE / COOPERATING FROM SHANGHAI",
    chatInputPlaceholder: "Ask me questions (e.g., What did she do at Xiaomi? How to contact her?)",
    
    // Contact
    contactSub: "COMMISSION & CONNECT",
    contactTitle: "Starting the Next Milestone",
    contactDesc: "Based in Shanghai, Youqing is excited to collaborate on Go-To-Market launches, digital re-branding, premium TVC direction, and short visual video configurations. Let's make your brand shine.",
    phoneLabel: "PHONE COORD / WECHAT",
    emailLabel: "EMAIL COORD / RESUME",
    wechatLabel: "WECHAT QRSCANNER",
    btnQrcode: "Show QR Code",
    formTitle: "Leave an Offline Note",
    formDesc: "Want to schedule an interview or explore an opportunity? Ping Youqing instantly by filing a memo below:",
    formName: "Your Honorable Name",
    formNamePlaceholder: "e.g., HR Director / Brand CMO",
    formEmail: "Contact Email",
    formEmailPlaceholder: "hr-dept@corporation.com",
    formMsg: "Your Custom Message",
    formMsgPlaceholder: "Write something, e.g., We are fascinated by your 70mai performance, love to invite you for a virtual coffee...",
    formSubmit: "Send Note",
    formSubmitted: "Message Delivered! Copied to Youqing's inbox.",
    btnScrollTop: "Scroll up BACK TO TOP",
  }
};
