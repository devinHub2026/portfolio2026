import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, QrCode, Clipboard, Copy, Terminal, Heart, ArrowUp } from 'lucide-react';
import { personalInfo } from '../data';
import { uiTranslations } from '../translations';

interface ContactProps {
  onScrollToTop: () => void;
  lang: 'zh' | 'en';
}

export default function Contact({ onScrollToTop, lang }: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showWechatModal, setShowWechatModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const t = uiTranslations[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    
    // Simulate server ingestion
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  const handleCopyWechat = () => {
    navigator.clipboard.writeText(personalInfo.wechat);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#050505] text-white border-t border-white/5">
      <div className="absolute inset-0 bg-mask-grid opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] glow-orb-purple opacity-20 pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-6">
        
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left panel: Info & coordinates (span 5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center space-x-2 text-blue-400 font-mono text-xs uppercase tracking-widest mb-4">
                <Terminal size={14} />
                <span>{t.contactSub}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tight leading-none mb-6">
                {t.contactTitle}
              </h2>
              <p className="text-xs md:text-sm text-gray-400 font-sans font-light leading-relaxed mb-10">
                {t.contactDesc}
              </p>

              {/* Direct Coordinate Cards */}
              <div className="space-y-4">
                {/* Phone Card */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-blue-950 text-blue-400 border border-blue-800/10 flex items-center justify-center">
                      <Phone size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-wide">{t.phoneLabel}</p>
                      <p className="text-sm font-bold text-neutral-100 mt-0.5">{personalInfo.phone}</p>
                    </div>
                  </div>
                  <a 
                    href={`tel:${personalInfo.phone}`}
                    className="text-xs text-neutral-400 hover:text-white font-mono bg-[#111115] border border-white/5 hover:border-white/20 px-3 py-1.5 rounded-lg transition-all"
                  >
                    {lang === 'en' ? 'Call' : '呼叫'}
                  </a>
                </div>

                {/* Email Card */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-blue-950 text-blue-400 border border-blue-800/10 flex items-center justify-center">
                      <Mail size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-wide">{t.emailLabel}</p>
                      <p className="text-sm font-bold text-neutral-100 mt-0.5">{personalInfo.email}</p>
                    </div>
                  </div>
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="text-xs text-neutral-400 hover:text-white font-mono bg-[#111115] border border-white/5 hover:border-white/20 px-3 py-1.5 rounded-lg transition-all"
                  >
                    {lang === 'en' ? 'Mail' : '发信'}
                  </a>
                </div>

                {/* WeChat Card */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-blue-950 text-blue-450 border border-blue-800/10 flex items-center justify-center">
                      <QrCode size={16} className="text-blue-405" />
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-wide">{t.wechatLabel}</p>
                      <p className="text-sm font-bold text-neutral-100 mt-0.5">{personalInfo.wechat}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowWechatModal(true)}
                    className="text-xs text-blue-400 hover:text-blue-300 font-mono bg-blue-950/40 border border-blue-800/20 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                  >
                    {t.btnQrcode}
                  </button>
                </div>
              </div>
            </div>

            {/* Location coordinates */}
            <div className="mt-12 flex items-center gap-2 text-xs font-mono text-neutral-500">
              <MapPin size={14} className="text-purple-400" />
              <span>{lang === 'en' ? 'Based in Shanghai, China' : '常驻中国 · 上海 PUDONG SHANGHAI'}</span>
            </div>
          </div>

          {/* Right panel: message form (span 7 columns) */}
          <div className="lg:col-span-7 p-6 md:p-8 rounded-2xl glass-morphic bg-white/5 border border-white/5 flex flex-col justify-between text-left">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-xl font-display font-bold text-white mb-1.5">{t.formTitle}</h3>
                <p className="text-xs text-[#88888b] font-sans font-light leading-snug">{t.formDesc}</p>
              </div>

              {/* Form elements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-wide text-neutral-500">{t.formName} *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.formNamePlaceholder}
                    className="w-full p-3 bg-[#0a0a0f] border border-white/10 focus:border-blue-500 rounded-lg text-xs md:text-sm text-neutral-100 placeholder-neutral-600 focus:outline-[#3b82f6]/20 transition-all font-sans font-light"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-wide text-neutral-500">{t.formEmail}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.formEmailPlaceholder}
                    className="w-full p-3 bg-[#0a0a0f] border border-white/10 focus:border-blue-500 rounded-lg text-xs md:text-sm text-neutral-100 placeholder-neutral-600 focus:outline-[#3b82f6]/20 transition-all font-sans font-light"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-wide text-neutral-500">{t.formMsg} *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.formMsgPlaceholder}
                  className="w-full p-3 bg-[#0a0a0f] border border-white/10 focus:border-blue-500 rounded-lg text-xs md:text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none transition-all resize-none font-sans font-light"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitted || !formData.name || !formData.message}
                className={`w-full py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  isSubmitted 
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' 
                    : 'bg-white text-black hover:bg-[#3b82f6] hover:text-white shadow-md font-bold'
                }`}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle2 size={14} /> {t.formSubmitted}
                  </>
                ) : (
                  <>
                    <Send size={14} /> {t.formSubmit}
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-600 font-mono">
              <span>DESIGN-TECH © 2026 HUANG YOUQING</span>
              <button 
                onClick={onScrollToTop}
                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
              >
                <span>{t.btnScrollTop}</span>
                <ArrowUp size={13} />
              </button>
            </div>
          </div>

        </div>

        {/* 3. Interactive Web wechat popup modal */}
        <AnimatePresence>
          {showWechatModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowWechatModal(false)}
                className="absolute inset-0 bg-black/95 backdrop-blur-sm"
              />

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative max-w-sm w-full bg-[#0a0a0f] p-8 rounded-2xl border border-white/5 shadow-2xl z-10 text-center"
              >
                <button
                  onClick={() => setShowWechatModal(false)}
                  className="absolute right-4 top-4 text-neutral-500 hover:text-white cursor-pointer"
                >
                  <Copy size={16} />
                </button>

                <div className="mb-6 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-800/10 text-blue-450 flex items-center justify-center mb-4">
                    <QrCode size={24} className="text-blue-400" />
                  </div>
                  <h4 className="text-base font-display font-bold text-white">
                    {lang === 'en' ? "Add Youqing on WeChat" : "添加黄友情的微信"}
                  </h4>
                  <p className="text-[10px] text-neutral-500 font-mono mt-1">Scan or copy Wechat ID below</p>
                </div>

                {/* Scanning animation canvas */}
                <div className="bg-[#050505] p-6 rounded-xl border border-white/5 mb-6 flex flex-col items-center relative overflow-hidden group">
                  {/* Laser bar animation */}
                  <div className="absolute left-0 right-0 h-[1.5px] bg-[#3b82f6] opacity-60 animate-bounce" style={{ top: '10%', animationDuration: '4s' }} />

                  {/* QR code border */}
                  <div className="w-36 h-36 border-4 border-dashed border-blue-500/10 p-2 rounded-lg flex flex-col items-center justify-center">
                    <QrCode size={110} className="text-[#3b82f6] opacity-90" />
                  </div>

                  <p className="text-[11px] text-neutral-400 mt-4 font-mono font-bold tracking-tight">
                    {lang === 'en' ? "Scan Code / Search Wechat ID" : "手机扫描 / 直接搜索微信ID"}
                  </p>
                  <p className="text-xs text-blue-400 font-mono mt-1">{personalInfo.wechat}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleCopyWechat}
                    className="flex-grow py-2.5 rounded-xl border border-white/10 hover:border-white hover:bg-white/5 text-xs font-bold text-neutral-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
                  >
                    {copied ? <CheckCircle2 size={14} className="text-green-400" /> : <Clipboard size={14} />}
                    {copied ? (lang === 'en' ? "Copied ID!" : "已复制 Wechat ID!") : (lang === 'en' ? "Copy WeChat ID" : "复制微信ID ID")}
                  </button>
                  <button
                    onClick={() => setShowWechatModal(false)}
                    className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-neutral-400 hover:text-white transition-all cursor-pointer font-sans text-neutral-500"
                  >
                    {lang === 'en' ? 'Close' : '关闭 Close'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
