import { Project, WorkExperience, EducationData, HobbiesData } from './types';

export const personalInfo = {
  name: '黄友情',
  englishName: 'Youqing Huang',
  title: 'GTM/IMC/创意策划/产品策划',
  subTitle: 'Go-To-Market & Brand Marketing Lead',
  location: '上海',
  phone: '13800138000',
  email: 'contact@example.com',
  wechat: '13800138000',
  birth: '19XX.XX',
  bio: '我是黄友情（Aurora），曾任70迈（小米生态链）市场策划主管，兼具智能硬件产品上市经验与4A广告服务商创意的复合型营销专家。注重创意品控与高端视觉，善于深挖用户痛点，用策略链接内外部资源，并积极拥抱AIGC市场赋能。'
};

export const skills = [
  {
    name: 'GTM 全周期规划 (Go-To-Market Planning)',
    level: 95,
    description: '深度统筹产品从0到1的关键上市链路，包括核心卖点提炼、排期规划、上市资料产出。'
  },
  {
    name: '视觉创意与物料品控 (Visual & TVC Directing)',
    level: 92,
    description: '具有TVC与平面拍摄统筹把控力，擅长协调高水平供应商，用高质感视觉拉高产品溢价。'
  },
  {
    name: '多方共创与红人营销 (Co-branding & Influencer Marketing)',
    level: 94,
    description: '具备极强的跨界合作项目管理经验，牵手国家地理、专业摄影大咖和权威科技数码媒体（如数字尾巴、中关村在线）。'
  },
  {
    name: '官网制作与平台运营 (Platform Production & Operation)',
    level: 88,
    description: '深度参与70mai国内官网制作、4K平台搭建，BGC/PUGC平台审核及官方新媒体（公众号/抖音/微博）运营。'
  },
  {
    name: 'AIGC 营销前沿拥抱 (AIGC Marketing Innovation)',
    level: 85,
    description: '前沿使用新型生成式AI技术（如文字及影像创作工具）赋能日常品牌营销、素材产出和效率革新。'
  }
];

export const projects: Project[] = [
  {
    id: 'proj_xiaomi',
    title: '小米智能宠物/安防产品线市场上市发布全案',
    category: '产品策划/IMC',
    date: '2023.05 - 至今',
    client: '小米 / 米家',
    description: '负责小米智能宠物/安防产品线在国内+海外市场宣发，统筹产品站及宣发内容',
    highlights: [
      '担任小米智能宠物线、安全防护及摄影摄像产品海内外首发GTM策划及宣推统筹。',
      '主抓官方新物料高标准产出，统揽电商详细页设计方案与交互视觉传达，完美彰显高端溢价。',
      '无缝打通内部产品经理与海外分公司团队沟通，确保米家硬件多线新品一炮而红。'
    ],
    metrics: [
      { value: '8+', label: '市场对接负责人' },
      { label: '宣发范围', value: '全球发售' }
    ],
    tags: ['产品策划', 'IMC', '宠物智能', '米家安全'],
    bgGradient: 'from-cyan-900/40 via-slate-900 to-black',
    imageType: 'dashcam',
    image: '/images/dashcam_a810_1780977202798.png'
  },
  {
    id: 'proj_70mai_gtm',
    title: '70迈自研智能记录仪系列S级产品上市全案',
    category: 'GTM/创意策划/产品策划',
    date: '2020.11 - 至今',
    client: '70mai',
    description: '70迈自研行车记录仪新品上市策划（其中主导11款S级产品）\n项目角色：产品/内容策划负责人、上市物料统筹\n核心职责：从0到1完成产品卖点提炼、创意策划、物料产出',
    highlights: [
      '主导11款主力旗舰行车记录仪S级爆品首发上市，累计制作全盘策划案达52份。',
      '实现卖点深度转译，把硬核硬件参数化解为打动用户的温情美学与可靠守护。',
      '协同视觉、包装和新媒体，保证首发引流效率与极低的用户下单阻力。'
    ],
    metrics: [
      { value: '43+', label: '70迈项目' },
      { label: '主导S级', value: '11款自研' }
    ],
    tags: ['GTM统筹', '卖点转译', '11款S级', '上市白皮书'],
    bgGradient: 'from-amber-900/40 via-neutral-900 to-black',
    imageType: 'camera',
    image: 'https://i.postimg.cc/Z5LrFtcC/2-28-yun-nan-se-cai-zhi-lu-70mai-M800-wei-bo.jpg'
  },
  {
    id: 'proj_brand_ip',
    title: '70mai官方平台与潮流MaiX吉祥物IP生命周期运营',
    category: '品牌策划、创意策划、IP',
    date: '2022.05',
    client: '70mai',
    description: '从0到1搭建70mai官网（策划/设计/开发对接），首创 4K影像展示平台。打造企业IP形象 MaiX（星际小熊），与X200产品故事化结合，完成玩偶安全测试及持续内容运营。',
    highlights: [
      '深度规划并上线全新自研4K沉浸展示窗口，彻底颠覆行车流媒体传统美学认知。',
      '主导潮趣MaiX（星际小熊）IP化全生命周期开发，绑定3D表情、玩偶模型、香氛等潮流外设。',
      '拉升极客、极智社群黏性达50%以上，全面唤醒新媒体私域流量自主传播。'
    ],
    metrics: [
      { value: '2+', label: '品牌营销' },
      { label: '粉丝黏性', value: '+50%飙升' }
    ],
    tags: ['IP星际小熊', '4K官网平台', '社群活跃', '玩偶玩教'],
    bgGradient: 'from-orange-950/40 via-stone-900 to-black',
    imageType: 'organic',
    image: '/images/xinjiang_desert_1780977231997.png'
  },
  {
    id: 'proj_tvc_4a',
    title: '德业电器与联合利华微电影及CCTV全国展播全案',
    category: '快销品牌、数码科技、4A',
    date: '2019.09 - 2020.11',
    client: '快销巨头 & 德业',
    description: '4A影视广告体系服务快销巨头，产出千万级影视作品，投放于央视等大众平台',
    highlights: [
      '主理德业除湿机由国民级明星代言的精湛美学电视广告，于中央电视台黄金时间播送。',
      '为快销巨擘联合利华奥妙OMO、力士LUX定制情感微电影、抖音霸榜挑战赛与高转化病毒视频。',
      '高标准掌握超过30个亿级与千万级投放方案的镜头执笔，竞标通过率高居行业前茅。'
    ],
    metrics: [
      { value: '25+', label: '影视TVC' },
      { label: '服务巨头', value: '联合利华/德业' }
    ],
    tags: ['CCTV展播', '4A巨投TVC', '明星TVC', '快消创意'],
    bgGradient: 'from-violet-900/40 via-zinc-950 to-black',
    imageType: 'unilever',
    image: '/images/maix_mascot_1780977248089.png'
  }
];

export const workExperience: WorkExperience[] = [
  {
    id: 'exp_70mai',
    company: '上海七十迈数字科技有限公司 (小米生态链)',
    logoText: '70mai',
    title: '市场策划主管 (GTM & Market Planning Manager)',
    location: '上海',
    period: '2020.11 - 至今',
    description: [
      '负责小米业务线产品市场对接、米家相关自研及生态链海内外上市宣发布置，常驻热销第一线。',
      '主持自研高端画质产品线GTM方案，负责视频TVC摄制全包流程、高规格视觉图素（1000+套）监制。',
      '跨界深度合作热门媒体，策划拍摄南疆、云南自驾与国家地理级优秀人文影像。',
      '作为深度玩家主抓官方微、博、抖宣发质感审查，自创 MaiX 潮流IP盘活私域与极客社群互动。'
    ],
    highlights: [
      '主导11款S级硬件新品上市宣发，将70mai A810智能行车仪首期推向全行业4K销量第一。',
      '高效整合跨各部门的上市推进表与培训卖点白皮书，实现52份超硬核策划案输出。',
      '创新尝试引入Midjourney, Stable Diffusion等AIGC工具加入品牌前期配图创意，赋能极客品牌传播力。'
    ]
  },
  {
    id: 'exp_shundong',
    company: '顺动国际传媒 (Shundong International Media)',
    logoText: 'SD Media',
    title: '文案策划 (Copywriter & Creative Planner)',
    location: '上海',
    period: '2019.09 - 2020.11',
    description: [
      '面向德业除湿机、联合利华（LUX、Omo、奥妙）、三中重工（中联重科）、东成电机、西门子等知名品牌，进行定制化高端品牌TVC、企业宣传片和跨平台数字营销全案文案创作。',
      '深度撰写创意策划全案30+个，配合明星代言并登陆央视黄金时段放送。',
      '对接一线导演与制片团队，负责分镜脚本细化、影视解说词、配音字幕等精细化品控。'
    ],
    highlights: [
      '成功协调30余家大中型核心主导品牌全流程脚本对接。',
      '以超高说服力成功主导了多次大型品牌提案竞标。'
    ]
  },
  {
    id: 'exp_fantuo',
    company: '凡拓创意 (Frontop - 创业板上市公司)',
    logoText: 'Frontop',
    title: '影视策划 (Video Planner)',
    location: '上海',
    period: '2018.03 - 2019.07',
    description: [
      '作为顶尖三维数字视觉服务商的创意先锋，服务万科、中建、碧桂园、华侨城等头部房地产和重工集团。',
      '对各大开发商及重大楼盘工程进行核心卖点包装，提出主题，并撰写宏大的概念影片策划与招投标解说词。',
      '深入片场协助导演精推 execution script，跟进三维渲染后期与合成。'
    ],
    highlights: [
      '高分通过并中标万科杭州汽车小镇项目、碧桂园宜兴梅林、上阳天禧时代等高端样板标案宣传影片。',
      '擅长恢弘大气的政企工程视觉表现与细腻的解说脚本打磨。'
    ]
  }
];

export const education: EducationData = {
  school: '南昌大学 (Project 211, Nanchang University)',
  degree: '学士 (Bachelor of Arts)',
  major: '广告学 (传播学类) (Advertising & Communication Major)',
  period: '2014.09 - 2018.06',
  gpa: '3.6 / 4.0 (专业Top 20%的卓越成绩)',
  courses: [
    '广告策划与媒介战略',
    '影视与快照摄影美学',
    '视觉传达与平面创意',
    '传播学导论与媒体研究',
    '优秀广告主文案撰写',
    '新闻学与社会网络心理'
  ],
  highlights: [
    '大学四年累计获得国家级级、省、市级以及校一等奖学金近16项（其中国家级奖项6项，省/校级奖项10项）。',
    '当选为2018届年度优秀毕业生。'
  ]
};

export const hobbies: HobbiesData = {
  categories: [
    {
      icon: 'BookOpen',
      title: '人文社科狂热者',
      items: ['四大名著深度研读', '尤瓦尔·赫拉利《人类简史》三部曲', '历史长河变迁与社会学']
    },
    {
      icon: 'Milestone',
      title: '科幻奇想信徒',
      items: ['《沙丘》(Dune) 史诗宇宙', '《三体》(Three-Body Problem) 宇宙学', '软硬核科幻影视追更']
    },
    {
      icon: 'Compass',
      title: '极光与砂土的探索',
      items: ['深度实境自驾采风', '摄影镜头里多元民族的人文风土', '体验多地生活艺术']
    },
    {
      icon: 'PenTool',
      title: '幻想执笔创作',
      items: ['个人原创小说架构编写', '数字虚构叙事与剧本设计', '视觉艺术审美积累']
    }
  ],
  text: '“热烈地生活在文字、远方与科技硬件的边界线。”在阅读中构建思想张力，在自驾风土中寻找创作热忱。将文学性融入市场营销，让冰冷的科技硬件充满人文的温度。'
};

export const businessQA = [
  {
    keywords: ['GTM', '上市', '首发'],
    answer: '黄友情在GTM产品上市流程上拥有极深造诣。她曾主导11款小米生态链S级行车、车载、户外与宠物软硬件在国内及海外的上市宣发。其中代表作为70mai A810 4K旗舰行车仪。她能一手包揽核心卖点提取、策划白皮书（已累计产出52份核心策划案）、供应商TVC与平面把控（超1000万张图素视觉），并打通前后端联动以夺取销量第一名。'
  },
  {
    keywords: ['视频', '电视广告', 'TVC', '文案'],
    answer: '黄友情在传统和新势力内容媒介上是无可争议的创意执笔者。在顺动和凡拓期间，她为联合利华（LUX、奥妙）、德业家电、中联重科、 Siemens 及万科服务过，独立主笔明星代言TVC、微电影镜头原镜及长片解说脚本共服务超30+核心品牌，不少广告如德业TVC最终在央视黄金档高频率播放，专业水准极其高超。'
  },
  {
    keywords: ['合作', '媒体', '跨界', '数字尾巴', '中关村'],
    answer: '跨界整合与高标资源共创是她的另一大王牌。她打破常规的硬参数广告，牵头开展高格调人文评测《云南色彩之旅》（与《数字尾巴》合作，联合国家地理摄影大咖）和戈壁实测实拍《南疆行》（与《中关村在线》合作，展开4000公里极端环境考验），全案阅读曝光量轻松破百万。'
  },
  {
    keywords: ['IP', 'MaiX', '吉祥物'],
    answer: '具有战略创新维度的她，为70mai品牌一手操盘推出了全新虚拟IP形象「MaiX」计划。将硬件概念通过MaiX（麦克斯）吉祥物二次元衍生化，配套开发香氛等个性周边，使极客、年轻社群好评度突破95%，大幅增加了年轻化的私域拉新效果。'
  },
  {
    keywords: ['AIGC', 'AI', '人工智慧', '技术'],
    answer: '她对前沿AIGC技术具有浓厚兴趣和实践经验。曾主动在品牌GTM配图方案、视觉渲染创意阶段引入Midjourney、Stable Diffusion、ChatGPT等，将灵感草案阶段效率提升50%以上，利用AIGC赋能内容传播，体现出极佳的时代适应力和科技韧性。'
  },
  {
    keywords: ['学校', '学历', '教育', '大学'],
    answer: '黄友情毕业于国家211重点工程院校——南昌大学，获得广告学名校本科学位，在校期间专业GPA为3.6/4.0（位列专业Top 20%的顶尖行列），掌握扎实的传播学、平面设计和广告心理功底。累计荣获国家、省/校级奖项达16项（其中6项国家级），是官方盖戳的优秀毕业生。'
  },
  {
    keywords: ['联系', '电话', '怎么找', '邮箱', '微信'],
    answer: '您可以直接在网站底部使用在线表单向友情发送微信式问好，或通过以下触达方式与她洽谈业务：\n📞 电话 / 微信同号：13800138000\n📨 电子邮箱：contact@example.com\n目前她身处上海市，支持各类GTM全周期统筹、品牌营销和高端TVC策划方向的精诚合作！'
  }
];

export const defaultBotResponse = '您好！我是黄友情（Youqing）的AI助理。我可以用最亲切的语气告诉您有关友情的求职愿望、项目战绩、教育背景以及她的各种兴趣爱好（如沙丘、三体等小说）！您可以试试问我：\n\n1. "她在小米生态链主导过的A810项目是怎样的？"\n2. "她策划过哪些著名的视频TVC或联合利华广告？"\n3. "能不能介绍一下她和《数字尾巴》合作的《云南色彩之旅》？"\n4. "她平时有什么兴趣爱好和自我评价吗？"';
