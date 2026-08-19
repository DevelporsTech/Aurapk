import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  RefreshCw, 
  ShoppingBag, 
  Zap, 
  Tag, 
  Truck, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  HelpCircle,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { formatPKR } from '../../data/pakistanLocations';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  recommendedProductIds?: string[];
}

export const AIAssistantWidget: React.FC = () => {
  const { 
    products, 
    selectedCity, 
    user, 
    cart, 
    setActiveView, 
    setQuickViewProduct,
    siteDesign
  } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `Assalam-o-Alaikum! 🇵🇰 I am **Aura AI**, your Pakistani luxury shopping concierge.\n\nI can help you find festive lawn suits, pure Oud fragrances, check TCS delivery times to **${selectedCity.name}**, or apply discount codes! What are you shopping for today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickPrompts = [
    { label: '👗 Festive Lawn 2026', prompt: 'Show me the best festive embroidered lawn suits with prices' },
    { label: '👑 Long-lasting Oud', prompt: 'Which pure Oud and Attar fragrances have 24-hour longevity?' },
    { label: `📦 TCS Delivery to ${selectedCity.name}`, prompt: `How long does TCS Cash on Delivery take to arrive in ${selectedCity.name}?` },
    { label: '🎟️ Active Discount Codes', prompt: 'What active promo coupons can I use on my order today?' },
    { label: '💳 Direct Bank Transfer', prompt: 'How do I pay via Meezan / HBL Bank Transfer or Raast?' }
  ];

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized, isLoading]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Handle Text-to-Speech
  const handleSpeak = (text: string, msgId: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking === msgId) {
      window.speechSynthesis.cancel();
      setIsSpeaking(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Strip markdown formatting for cleaner speech
    const cleanText = text.replace(/[*_#`[\]()]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(null);
    utterance.onerror = () => setIsSpeaking(null);

    setIsSpeaking(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      // Build catalog summary to ground AI
      const catalogSummary = products.slice(0, 15).map(p => ({
        id: p.id,
        title: p.title,
        price: p.price,
        originalPrice: p.originalPrice,
        category: p.category,
        brand: p.brand,
        shortDescription: p.shortDescription
      }));

      // History formatted for API
      const history = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        content: m.content
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history,
          userContext: {
            city: selectedCity.name,
            province: selectedCity.province,
            userName: user?.name,
            cartCount: cart.length
          },
          catalogSummary
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const reply = data.reply || 'Assalam-o-Alaikum! How can I assist you with your shopping?';

      // Detect any mentioned product IDs
      const mentionedIds: string[] = [];
      products.forEach(p => {
        if (
          reply.toLowerCase().includes(p.title.toLowerCase()) || 
          (p.brand && reply.toLowerCase().includes(p.brand.toLowerCase()) && reply.toLowerCase().includes(p.category.toLowerCase()))
        ) {
          if (!mentionedIds.includes(p.id)) {
            mentionedIds.push(p.id);
          }
        }
      });

      const assistantMsg: Message = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedProductIds: mentionedIds.length > 0 ? mentionedIds.slice(0, 2) : undefined
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.warn('AI chat error, using local fallback:', err);
      // Fallback message
      const fallbackMsg: Message = {
        id: `ai-err-${Date.now()}`,
        role: 'assistant',
        content: `Assalam-o-Alaikum! For orders delivered to **${selectedCity.name}**, TCS Express delivers in 24-48 hours with 100% Cash on Delivery and direct Bank Transfer.\n\n✨ **Featured Pick**: *AuraPulse ANC Wireless Earbuds* (₨ 4,999) or *Festive Luxury Lawn Pret* (₨ 5,499). Use promo code **WELCOMEPK** for 15% OFF!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setIsSpeaking(null);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: `Assalam-o-Alaikum! How can I assist you with your AuraPK shopping today? You can ask about lawn pret, fragrance longevity, TCS delivery to ${selectedCity.name}, or coupon discounts.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* 1. FLOATING SIDE ICON / TRIGGER BUTTON (COMPACT & SLEEK) */}
      <div 
        id="aurapk-ai-side-icon"
        className="fixed bottom-18 sm:bottom-5 right-3 sm:right-5 z-40"
      >
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-[#0c0c0c]/95 hover:bg-[#181818] text-white border border-[#059669]/60 hover:border-emerald-400 shadow-[0_0_20px_rgba(5,150,105,0.4)] rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
            title="Aura AI Shopping Assistant"
            aria-label="Open Aura AI Shopping Assistant"
          >
            {/* Emerald Gradient Inner Circle */}
            <span className="flex items-center justify-center w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-gradient-to-tr from-[#059669] to-emerald-400 text-black shadow-md shadow-[#059669]/40">
              <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current animate-pulse" />
            </span>

            {/* Live pulsating status dot */}
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-black"></span>
            </span>

            {/* Small Hover Tooltip */}
            <span className="absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-black/90 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-lg">
              Aura AI
            </span>
          </button>
        )}
      </div>

      {/* 2. EXPANDED AI CHAT MODAL / DRAWER */}
      {isOpen && (
        <div 
          id="aurapk-ai-chat-window"
          className={`fixed right-4 sm:right-6 z-50 transition-all duration-300 flex flex-col shadow-2xl rounded-3xl overflow-hidden border border-[#059669]/40 bg-[#0a0a0a]/95 backdrop-blur-xl text-white ${
            isMinimized 
              ? 'bottom-20 sm:bottom-6 w-[320px] h-16' 
              : 'bottom-20 sm:bottom-6 w-[calc(100vw-32px)] sm:w-[420px] h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="bg-[#121212] border-b border-white/10 px-4 py-3.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#059669] to-emerald-400 text-black flex items-center justify-center font-bold shadow-md shadow-[#059669]/40">
                <Sparkles className="w-5 h-5 fill-current" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-black"></span>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display text-sm font-black uppercase tracking-tight text-white">
                    AURA AI ASSISTANT
                  </h3>
                  <span className="text-[9px] bg-[#059669]/20 text-[#059669] border border-[#059669]/30 font-black px-1.5 py-0.2 rounded uppercase">
                    GEMINI
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 flex items-center gap-1">
                  <span>📍 {selectedCity.name}, {selectedCity.province}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold">TCS COD Active</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearChat}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                title="Clear conversation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                title={isMinimized ? "Maximize" : "Minimize"}
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  if (window.speechSynthesis) window.speechSynthesis.cancel();
                  setIsSpeaking(null);
                }}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                title="Close AI Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body when Not Minimized */}
          {!isMinimized && (
            <>
              {/* Message Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-xl bg-[#1a1a1a] border border-[#059669]/40 text-[#059669] flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div className={`max-w-[85%] space-y-1.5 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                          msg.role === 'user'
                            ? 'bg-[#059669] text-white font-medium rounded-tr-xs shadow-md'
                            : 'bg-[#141414] border border-white/10 text-slate-200 rounded-tl-xs shadow-lg'
                        }`}
                      >
                        {msg.content}
                      </div>

                      {/* Attached Product Cards if AI recommended products */}
                      {msg.recommendedProductIds && msg.recommendedProductIds.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          {msg.recommendedProductIds.map(prodId => {
                            const prod = products.find(p => p.id === prodId);
                            if (!prod) return null;
                            return (
                              <div
                                key={prod.id}
                                onClick={() => setQuickViewProduct(prod)}
                                className="bg-[#1a1a1a] hover:bg-[#222] border border-[#059669]/40 hover:border-[#059669] p-2.5 rounded-xl flex items-center gap-3 cursor-pointer transition-all group"
                              >
                                <img
                                  src={prod.featuredImage}
                                  alt={prod.title}
                                  className="w-11 h-11 rounded-lg object-cover bg-black shrink-0"
                                />
                                <div className="flex-1 min-w-0 text-left">
                                  <p className="font-bold text-white uppercase text-[11px] truncate group-hover:text-[#059669] transition-colors">
                                    {prod.title}
                                  </p>
                                  <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 font-bold">
                                    <span>{formatPKR(prod.price)}</span>
                                    {prod.originalPrice > prod.price && (
                                      <span className="text-slate-500 line-through text-[9px]">
                                        {formatPKR(prod.originalPrice)}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Footer bar for assistant message */}
                      <div className="flex items-center justify-between text-[9px] text-slate-500 px-1">
                        <span>{msg.timestamp}</span>
                        {msg.role === 'assistant' && (
                          <button
                            type="button"
                            onClick={() => handleSpeak(msg.content, msg.id)}
                            className="hover:text-emerald-400 flex items-center gap-1 cursor-pointer transition-colors"
                            title="Listen to response"
                          >
                            {isSpeaking === msg.id ? (
                              <>
                                <VolumeX className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Stop</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3 h-3" />
                                <span>Listen</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {msg.role === 'user' && (
                      <div className="w-7 h-7 rounded-xl bg-[#059669]/20 border border-[#059669]/40 text-[#059669] flex items-center justify-center shrink-0 mt-0.5">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex gap-2.5 justify-start">
                    <div className="w-7 h-7 rounded-xl bg-[#1a1a1a] border border-[#059669]/40 text-[#059669] flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
                      <Sparkles className="w-3.5 h-3.5 fill-current" />
                    </div>
                    <div className="bg-[#141414] border border-white/10 text-slate-400 p-3 rounded-2xl rounded-tl-xs flex items-center gap-2 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-bounce" style={{ animationDelay: '300ms' }} />
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 ml-1">
                        Aura AI is thinking...
                      </span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestion Chips */}
              <div className="px-3 pt-2 pb-1 border-t border-white/5 bg-[#0d0d0d] overflow-x-auto no-scrollbar flex gap-1.5 shrink-0">
                {quickPrompts.map((qp, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(qp.prompt)}
                    disabled={isLoading}
                    className="bg-[#161616] hover:bg-[#202020] text-slate-300 hover:text-white border border-white/10 hover:border-[#059669]/50 rounded-full px-2.5 py-1 text-[10px] font-medium whitespace-nowrap transition-all cursor-pointer disabled:opacity-50"
                  >
                    {qp.label}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 bg-[#101010] border-t border-white/10 shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2 bg-[#181818] border border-white/10 focus-within:border-[#059669] rounded-2xl px-3 py-1.5 transition-colors shadow-inner"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={`Ask about lawn, oud, TCS ${selectedCity.name} delivery...`}
                    disabled={isLoading}
                    className="flex-1 bg-transparent text-white text-xs placeholder:text-slate-500 focus:outline-hidden py-1.5"
                  />

                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-[#059669] hover:bg-[#047857] disabled:bg-white/10 text-white disabled:text-slate-600 p-2 rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed shrink-0 shadow-md shadow-[#059669]/20"
                    title="Send message"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

                <div className="flex items-center justify-between text-[9px] text-slate-500 pt-2 px-1">
                  <span>Powered by Gemini 3.7 Flash</span>
                  <button
                    type="button"
                    onClick={() => setActiveView('catalog')}
                    className="hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    Browse 250+ Products →
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
