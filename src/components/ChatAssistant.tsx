import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Terminal, Sparkles, User, RefreshCw, AlertCircle, ArrowRight, HelpCircle } from 'lucide-react';
import { defaultBotResponse, personalInfo } from '../data';
import { uiTranslations } from '../translations';
import { Message } from '../types';

interface ChatAssistantProps {
  preFilledPrompt: string | null;
  onClearPreFilledPrompt: () => void;
  lang: 'zh' | 'en';
}

export default function ChatAssistant({ preFilledPrompt, onClearPreFilledPrompt, lang }: ChatAssistantProps) {
  const t = uiTranslations[lang];

  const defaultBotResponseZH = "您好！我是黄友情 (Youqing) 的 AI 求职特助，很高兴为您服务。我有关于她所有的教育历程、小米生态链上市方法论、TVC执笔构想、求职优势与联系方式。有什么我可以帮您的吗？";
  const defaultBotResponseEN = "Hello! I am Youqing's AI Recruitment Assistant. I am fully versed in her academic honors, Xiaomi GTM frameworks, video storyboard scripting, and career aspirations. How can I help you today?";

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatError, setChatError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Synchronize greeting when language changes
  useEffect(() => {
    setMessages([
      { role: 'model', text: lang === 'en' ? defaultBotResponseEN : defaultBotResponseZH }
    ]);
  }, [lang]);

  // Fast preset questions matching her resume highlights
  const presetQuestionsZH = [
    { label: "📱 70mai小米生态链战绩", text: "问一个关于她在小米生态链主导过的4K旗舰行车记录仪A810项目上市和GTM详情？" },
    { label: "🎬 LUX/奥妙等CCTV视频案例", text: "她在顺动与凡拓策划过哪些影视TVC宣传片、德业央视广告或联合利华快消方案？" },
    { label: "📸 《云南色彩之旅》跨界自驾", text: "能说说她和头部媒体《数字尾巴》策划的《云南色彩之旅》以及《南疆行》自驾实测吗？" },
    { label: "🎓 211名校广告功底/获奖", text: "介绍一下她的大学教育背景，她GPA多少，拿过哪些国家或省份大奖？" },
    { label: "👾 独创科创 IP MaiX", text: "她在小米生态链推出的企业吉祥物「MaiX」IP营销计划起到了什么品牌成效？" },
  ];

  const presetQuestionsEN = [
    { label: "📱 Xiaomi GTM Strategy", text: "Tell me about her Go-To-Market and product launches inside 70mai (Xiaomi Ecosystem), specifically the 4K flagship A810?" },
    { label: "🎬 LUX & CCTV TVC Production", text: "What prominent TVC scripts and commercial directions did she lead for Unilever, Siemens, and Deye?" },
    { label: "📸 'Color Journey' Media Campaign", text: "Can you describe the 'Yunnan Color Journey' roadtrip campaign and her 4,000km extreme Xinjiang field tests?" },
    { label: "🎓 Academic Honors & GPA", text: "What is her academic background, her major, and what kind of collegiate scholarships or awards did she win?" },
    { label: "👾 MaiX Mascot IP Project", text: "What branding impact did the virtual mascot character 'MaiX' achieve in Xiaomi ecosystem channels?" },
  ];

  const presetQuestions = lang === 'en' ? presetQuestionsEN : presetQuestionsZH;

  // Auto scroll to latest message
  useEffect(() => {
    if (messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Handle outside prefilled prompts (e.g. from Portfolio deep dive buttons)
  useEffect(() => {
    if (preFilledPrompt) {
      handleSendPrompt(preFilledPrompt);
      onClearPreFilledPrompt();
    }
  }, [preFilledPrompt]);

  const handleSendPrompt = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');
    setIsLoading(true);
    setChatError(null);

    try {
      const response = await fetch('/api/chat', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Accept-Language': lang
         },
         body: JSON.stringify({ messages: updatedMessages }),
       });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', text: data.text }]);
    } catch (err: any) {
      console.error("Chat request error:", err);
      setChatError(
        lang === 'en'
          ? "There was a micro windstorm in the AI connection. Please retry or browse other sections!"
          : "AI助理连接服务器稍微遇到了一丝风暴。您可以再试一次，或者查看页面其他履历信息！"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([{ role: 'model', text: lang === 'en' ? defaultBotResponseEN : defaultBotResponseZH }]);
    setChatError(null);
  };

  return (
    <section id="interactive-qa" className="relative py-24 bg-[#050505] text-white border-t border-white/5">
      <div className="absolute inset-0 bg-mask-grid opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] glow-orb-blue opacity-20 pointer-events-none" />

      <div className="relative w-full max-w-5xl mx-auto px-6">
        
        {/* Module Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-blue-400 font-mono text-xs uppercase tracking-widest mb-3 bg-blue-950/30 border border-blue-800/10 px-3 py-1 rounded-full">
            <Terminal size={12} />
            <span>{t.chatSub}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tight">
            {t.chatTitle}
          </h2>
          <p className="text-xs text-gray-400 mt-3 font-sans font-light leading-relaxed">
            {t.chatDesc}
          </p>
        </div>

        {/* Chat Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Clickable Quick preset questions (span 4 columns) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl glass-morphic bg-white/5 border border-white/5">
              <h4 className="text-xs font-mono tracking-widest text-neutral-400 uppercase font-bold mb-4 flex items-center gap-1.5 border-b border-white/5 pb-2">
                <HelpCircle size={14} className="text-blue-500" /> {t.chatRecPrompts}
              </h4>
              <p className="text-[10px] text-neutral-500 mb-4 leading-relaxed font-sans font-light text-left">
                {t.chatPromptIntro}
              </p>

              <div className="space-y-3">
                {presetQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendPrompt(q.text)}
                    className="w-full p-3 rounded-xl text-left text-xs bg-[#09090c] hover:bg-blue-500/10 hover:text-blue-400 border border-white/5 hover:border-blue-500/20 text-neutral-400 transition-all duration-300 flex items-start gap-2 group cursor-pointer font-sans"
                  >
                    <ArrowRight size={12} className="mt-0.5 text-neutral-600 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                    <span>{q.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick stats mini-banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-tr from-blue-950/20 to-purple-950/20 border border-blue-900/10 text-xs text-left">
              <p className="text-white font-mono font-bold uppercase tracking-wide flex items-center gap-1 mb-1 shadow-sm font-semibold">
                <Sparkles size={13} className="text-blue-450 animate-pulse" /> {t.chatInfoTitle}
              </p>
              <p className="text-[10px] text-neutral-400 font-sans leading-relaxed font-light">
                {t.chatInfoDesc}
              </p>
            </div>
          </div>

          {/* Right panel: Chat dialogue interface (span 8 columns) */}
          <div className="lg:col-span-8 flex flex-col rounded-2xl glass-morphic bg-[#09090c] border border-white/5 h-[560px] relative overflow-hidden">
            
            {/* Dialogue Header */}
            <div className="p-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-3 text-left">
                <div className="relative">
                  <img
                    src="/src/assets/images/profile_portrait_1780939848564.png"
                    alt="Bot Profile Av"
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  {/* Real-time Online Indicator tag matching Fig 1 and Guidelines */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-black animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-white flex items-center gap-1 font-sans">
                    {t.chatAssistantTitle}
                    <span className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800/20 text-[9px] font-mono">GEMINI 3.5</span>
                  </h4>
                  <p className="text-[10px] text-neutral-500 font-mono tracking-wide flex items-center gap-1.5 font-bold">
                    <span className="inline-block w-1 h-1 rounded-full bg-blue-400" />
                    {t.chatAssistantStatus}
                  </p>
                </div>
              </div>

              {/* Reset chat state button */}
              <button
                onClick={handleClearChat}
                className="p-2 rounded-lg border border-white/10 hover:border-white bg-[#050505] text-neutral-400 hover:text-white transition-all cursor-pointer"
                title={lang === 'en' ? 'Restart chat session' : '重新启动对话'}
              >
                <RefreshCw size={14} />
              </button>
            </div>

            {/* Bubble Messages panel */}
            <div className="flex-grow p-6 overflow-y-auto no-scrollbar space-y-4">
              {messages.map((msg, index) => {
                const isModel = msg.role === 'model';
                return (
                  <div
                    key={index}
                    className={`flex ${isModel ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`flex items-start gap-3 max-w-[85%] ${isModel ? '' : 'flex-row-reverse'}`}>
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 text-xs font-bold leading-none overflow-hidden ${
                        isModel 
                          ? 'bg-neutral-900 border-white/10 text-blue-400' 
                          : 'bg-[#3b82f6] border-blue-600 text-white'
                      }`}>
                        {isModel ? (
                          <img src="/src/assets/images/profile_portrait_1780939848564.png" referrerPolicy="no-referrer" alt="bot avatar" className="w-full h-full object-cover" />
                        ) : (
                          <User size={13} />
                        )}
                      </div>

                      {/* Text details container */}
                      <div className={`p-4 rounded-2xl text-xs md:text-sm text-left ${
                        isModel
                          ? 'bg-white/5 border border-white/5 text-neutral-200 rounded-tl-none font-sans font-light leading-relaxed whitespace-pre-line'
                          : 'bg-blue-950/20 border border-blue-900/10 text-blue-100 rounded-tr-none font-sans font-light leading-relaxed'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Live Loader Animation */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full border border-white/5 bg-[#111115] flex items-center justify-center text-blue-400 overflow-hidden flex-shrink-0 animate-spin">
                      <Terminal size={12} className="text-blue-400 animate-pulse" />
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 rounded-tl-none flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Error messages */}
              {chatError && (
                <div className="p-3 text-xs bg-red-950/40 border border-red-900/30 text-red-350 rounded-xl flex items-start gap-2 text-left font-sans">
                  <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                  <span>{chatError}</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendPrompt(inputText);
              }}
              className="p-4 bg-white/5 border-t border-white/5 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t.chatInputPlaceholder}
                className="flex-grow p-3 bg-neutral-950 border border-white/10 focus:border-blue-500 rounded-xl text-xs sm:text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none transition-all font-sans"
                disabled={isLoading}
              />
              <button
                type="submit"
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all bg-[#3b82f6] text-white hover:bg-blue-600 ${
                  isLoading || !inputText.trim() 
                    ? 'opacity-50 cursor-not-allowed bg-neutral-800 text-neutral-500' 
                    : 'cursor-pointer'
                }`}
                disabled={isLoading || !inputText.trim()}
              >
                <Send size={15} />
              </button>
            </form>

          </div>
        </div>

      </div>
    </section>
  );
}
