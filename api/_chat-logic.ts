import { GoogleGenAI } from "@google/genai";

export type ChatLang = "zh" | "en";

export interface ChatMessage {
  role: string;
  text: string;
}

// System instructions to shape the AI Assistant persona of Youqing
const systemInstructionZH = `
你现在是黄友情（Youqing Huang）的AI个人求职助理。
黄友情是一位非常优秀、极具战略思维的GTM（Go-To-Market）与品牌市场营销主管，目前身处上海。
她曾在小米生态链企业上海七十迈（70mai）统筹11款S级智能硬件新品上市，将旗舰行车记录仪A810推上4K全网销量第一。她也曾在顺动和凡拓为联合利华（LUX、Omo）、德业除湿机（央视CCTV展播）、中联重科、西门子等巨头执笔30+品牌TVC广告全案宣传影片。

你在回答招聘官、客户或普通来访者时，必须符合以下规范：
1. 【人设口吻】语气必须温和可亲、专业、时尚科技、富有创意而又有条理，展现出顶级市场总监的战略眼界与亲和力。
2. 【内容支撑】当被问及她的项目（A810上市、云南色彩之旅、南疆行、MaiX IP、德业央视TVC、力士奥妙日化广告）、教育（211南昌大学，广告学，GPA 3.6/4，累计获得16项大奖，优秀毕业生）时，给出详尽、专业的内容支持，不得编造任何与简历无关的伪造经历。
3. 【个人兴趣】她热爱科幻（沙丘、三体）、人文社科（四大名著、赫拉利简史三部曲）、深度自驾合影采风、写原创小说。在言谈中可以适当融入这些人性化温暖细节，展现她“科技硬核+人文温度”的跨界特质。
4. 【互动意图】如果对方表现出合作意图或请求联系她，请主动提供她的联系方式（电话/微信：13800138000；邮箱：contact@example.com）。
5. 必须使用中文回答。
`;

const systemInstructionEN = `
You are Youqing Huang's AI Personal Recruitment Assistant.
Youqing is a brilliant and highly strategic Head of Go-To-Market (GTM) and Brand Marketing based in Shanghai.
She orchestrated the debut of 11+ S-class innovative hardware launches within Shanghai 70mai (Xiaomi Ecosystem), making the flagship 4K dash cam A810 rank No.1 in online sales. She also directed 30+ TVC commercials and brand film creative scripts at Shundong Media and Frontop Digital for giants like Unilever (LUX, Omo), Siemens, Deye (nationally broadcasted on CCTV), and Sany.

When answering recruiters, clients, or visitors, follow these rules:
1. [Persona & Tone] Be elegant, courteous, professional, creative, and highly structural. Express the strategic foresight of a seasoned market lead.
2. [Data Authenticity] Rely purely on her actual credentials: A810 GTM, Yunnan Color Journey, northern/southern Xinjiang road tests, virtual IP mascot MaiX, Deye CCTV script, NCU BA Advertising degree (GPA 3.6/4, Rank Top 20%, Valedictorian, 16 national/provincial awards). Do NOT fabricate any experiences.
3. [Human Elements] Incorporate her warm personal side nicely: her obsession with sci-fi (Dune, Three-Body theory) and humanistic sociology (Yuval Harari, classical philosophies), extreme driving/photography, and writing speculative novels.
4. [Conversion Call-to-Action] If the visitor displays hiring interest, promote her contact points: Phone/WeChat (+86 13800138000), Email (contact@example.com).
5. You must respond in English.
`;

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey !== "") {
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });
      console.log("Successfully initialized Gemini Client.");
    } else {
      console.warn("GEMINI_API_KEY is not configured yet. Falling back to structured responses.");
    }
  }
  return aiClient;
}

function getFallbackAnswer(userText: string, lang: ChatLang): string {
  const lowercaseText = userText.toLowerCase();

  if (lang === "en") {
    if (lowercaseText.includes("gtm") || lowercaseText.includes("launch") || lowercaseText.includes("a810") || lowercaseText.includes("xiaomi") || lowercaseText.includes("first")) {
      return "【AI Recruiter Assistant Notice】: For her GTM launches: at 70mai (Xiaomi Ecosystem), Youqing spearheaded 11+ novel S-class launches. She authored 52 core strategy brief documents and built 1,000+ exquisite display asset packs, making the 4K dash cam family debut as No.1 online! She excels in product-value alignment and orchestrating launch timelines.";
    } else if (lowercaseText.includes("ad") || lowercaseText.includes("tvc") || lowercaseText.includes("script") || lowercaseText.includes("video") || lowercaseText.includes("commercial") || lowercaseText.includes("cctv")) {
      return "【AI Recruiter Assistant Notice】: Youqing directed 30+ premium commercials and brand video campaigns at Shundong Media and Frontop. High-profile clients include Unilever (LUX, Omo) and Siemens. Her master TVC script for Deye was televised nationally on China Central Television (CCTV). She possesses deep expertise in cinematic storyboarding and copy editing.";
    } else if (lowercaseText.includes("cross") || lowercaseText.includes("collaborat") || lowercaseText.includes("digital tail") || lowercaseText.includes("yunnan") || lowercaseText.includes("desert") || lowercaseText.includes("xinjiang")) {
      return "【AI Recruiter Assistant Notice】: She excels in high-exposure creative partnerships. Notable achievements include the 'Yunnan Color Journey' co-created with top-tier publisher Digital Tail, and the 4,000km extreme 'Southern Xinjiang' highway test in sub-zero temp. These campaigns earned millions in organic buzz, highly elevating brand conversion.";
    } else if (lowercaseText.includes("ip") || lowercaseText.includes("maix") || lowercaseText.includes("mascot")) {
      return "【AI Recruiter Assistant Notice】: To humanize technology hardware, she conceived and launched the 3D toy mascot IP 'MaiX' (Max), incorporating digital comic storytelling and physical collectibles, boosting user loyalty and cross-sale retention by over 95%.";
    } else if (lowercaseText.includes("school") || lowercaseText.includes("college") || lowercaseText.includes("gpa") || lowercaseText.includes("major") || lowercaseText.includes("award") || lowercaseText.includes("nanchang")) {
      return "【AI Recruiter Assistant Notice】: Youqing graduated from Nanchang University (National Key Project 211 Alumnus) with a Bachelor of Arts in Advertising. She placed Top 20% in GPA (3.6/4.0), won 16 academic honors (6 national, 10 provincial), and was honored as Outstanding Valedictorian.";
    } else if (lowercaseText.includes("hobby") || lowercaseText.includes("pass") || lowercaseText.includes("interest") || lowercaseText.includes("sci-fi") || lowercaseText.includes("three-body") || lowercaseText.includes("dune")) {
      return "【AI Recruiter Assistant Notice】: Youqing lives at the intersection of letters, horizons and innovative tech. She's deep into speculative sociology, Dune universe design, regional desert driving, and has written personal speculative novels. She brings beautiful humanistic warmth into cold brand assets.";
    } else if (lowercaseText.includes("contact") || lowercaseText.includes("wechat") || lowercaseText.includes("phone") || lowercaseText.includes("hire") || lowercaseText.includes("email") || lowercaseText.includes("job") || lowercaseText.includes("connect")) {
      return "【AI Recruiter Assistant Notice】: You can connect with Youqing directly!\n📞 Phone / WeChat: +86 13800138000\n📨 Email: contact@example.com\nShe's based in Shanghai and ready to discuss exceptional career opportunities in GTM or Brand marketing.";
    }
    return "Hello! I am Youqing's AI assistant. Although I am currently operating in offline backup mode, I hold her full credentials: NCU graduate (GPA 3.6), GTM launcher for 11+ Xiaomi ecosystem hardwares, and commercial scriptwriter for CCTV. Try asking 'What did she do in Xiaomi?' or 'What TVC campaigns does she have?' to see details!";
  }

  if (lowercaseText.includes("gtm") || lowercaseText.includes("上市") || lowercaseText.includes("a810") || lowercaseText.includes("小米") || lowercaseText.includes("首发")) {
    return "【AI助理友情提示】：关于我们的GTM上市经验：在上海七十迈（小米生态链）期间，友情主导了包括4K旗舰行车记录仪A810在内的11款S级新品上市，全周期产出52份核心策划案和1000+套视觉图素，首发即拿下行业4K销量第一！她非常擅长从0到1整合产品核心卖点，编制物料排期并把控TVC的出品质量。";
  } else if (lowercaseText.includes("广告") || lowercaseText.includes("tvc") || lowercaseText.includes("视频") || lowercaseText.includes("策划") || lowercaseText.includes("文案") || lowercaseText.includes("央视")) {
    return "【AI助理友情提示】：友情在顺动国际传媒与凡拓创意担任文案策划、影视策划期间，负责过30+个大中型品牌视觉项目。品牌包括联合利华奥妙、Lux力士、德业除湿机等。她主笔的德业家电代表作广告片更是登录中央电视台（CCTV）重点播映。她拥有超硬核的影视分镜执笔和解说脚本打磨能力。";
  } else if (lowercaseText.includes("跨界") || lowercaseText.includes("合作") || lowercaseText.includes("数字尾巴") || lowercaseText.includes("云南") || lowercaseText.includes("南疆") || lowercaseText.includes("中关村")) {
    return "【AI助理友情提示】：友情擅长高溢价的红人共创。代表作如：携手头部艺术数码媒体《数字尾巴》策划人文大作《云南色彩之旅》，携手《中关村在线》顶着极端暴雨严寒在西北展开4000公里《南疆行》自驾。联合国家地理极客与专业摄影大咖，全案产出千万级别的网络曝光声量，大大提高了产品的品牌价值！";
  } else if (lowercaseText.includes("ip") || lowercaseText.includes("maix") || lowercaseText.includes("吉祥物") || lowercaseText.includes("麦克斯")) {
    return "【AI助理友情提示】：友情极富品牌敏锐度。她为70mai突破性设计推出了专属科创IP形象「MaiX（麦克斯）」，将冷冰冰的硬件赋予情感化与漫画故事衍生，并联合开发车载香氛周边，赢得了超95%年轻客群的高粘性好评。";
  } else if (lowercaseText.includes("学校") || lowercaseText.includes("大学") || lowercaseText.includes("南昌") || lowercaseText.includes("学历") || lowercaseText.includes("成绩") || lowercaseText.includes("gpa")) {
    return "【AI助理友情提示】：友情毕业于国家『211工程』大学——南昌大学广告学（传播类）专业，获得学士学位。她的大学GPA为3.6/4.0，排名专业Top 20%。期间四年累计荣获包括国家级（6项）、省校级（10项）等16项核心大奖，并获得官方颁授的优秀毕业生称号。";
  } else if (lowercaseText.includes("兴趣") || lowercaseText.includes("爱好") || lowercaseText.includes("生活") || lowercaseText.includes("三体") || lowercaseText.includes("沙丘")) {
    return "【AI助理友情提示】：友情自称是一个“生活在文字、远方与科技硬件交汇处的探索者”。她极度痴迷人文历史、科幻大作《沙丘》和《三体》宇宙。她拥有庞大的独立摄影库与多次西北自驾采风积淀，甚至写过个人原创网络小说！她喜欢把文学浪漫性深度编织到每一个营销大作中。";
  } else if (lowercaseText.includes("微信") || lowercaseText.includes("电话") || lowercaseText.includes("邮箱") || lowercaseText.includes("联系") || lowercaseText.includes("合作") || lowercaseText.includes("怎么找")) {
    return "【AI助理友情提示】：您可以立刻联系黄友情本人！\n📞 手机 & 微信：13800138000\n📨 工作邮箱：contact@example.com\n她目前常驻上海，非常期待与您探讨GTM统筹、品牌整合传播、电视/社交商业片、新媒体等维度的合作可能！";
  }
  return "您好！我是黄友情的求职AI小秘书。虽然我目前运行在无API key的离线演示模式，但我仍掌握她所有的第一手情报：她211南昌大学高GPA毕业，在小米生态链统筹过多款百万级硬件爆品的GTM，也在传统大牌广告公司执笔过CCTV央视级电视TVC广告方案。您可以试着问我“她在小米做过什么？”或者“关于德业家电的CCTV广告”以揭晓详情！";
}

export async function getChatReply(messages: ChatMessage[], lang: ChatLang): Promise<string> {
  const lastMessage = messages[messages.length - 1];
  const userText = lastMessage?.text || "";

  const ai = getGeminiClient();
  if (!ai) {
    return getFallbackAnswer(userText, lang);
  }

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    })),
    config: {
      systemInstruction: lang === "en" ? systemInstructionEN : systemInstructionZH,
      temperature: 0.7,
    }
  });

  return response.text ?? "";
}
