import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2, Compass } from 'lucide-react';
import { sendChatMessage } from '../services/api';

const QUICK_PROMPTS = [
  "Suggest a vegetarian-friendly dinner near Day 1 evening",
  "What if it rains during our afternoon activities?",
  "What is the best local neighborhood for vintage shopping?",
  "How much cash should we carry vs credit cards?"
];

export default function ChatDrawer({ destination, isOpen, onClose, onToggle }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hello! I'm your AI Travel Concierge for **${destination || "your trip"}**. Ask me anything about local restaurants, transit hacks, rainy day backups, or custom tweaks to your itinerary!`
    }
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (destination) {
      setMessages([
        {
          role: "assistant",
          content: `Hello! I'm your AI Travel Concierge for **${destination}**. Feel free to ask about restaurant recommendations, public transit tips, or adjustments to your itinerary!`
        }
      ]);
    }
  }, [destination]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (messageText) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isSending) return;

    const userMessage = { role: "user", content: textToSend.trim() };
    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput("");
    setIsSending(true);

    try {
      const response = await sendChatMessage(destination, newHistory, userMessage.content);
      setMessages([...newHistory, { role: "assistant", content: response.reply }]);
    } catch (err) {
      setMessages([
        ...newHistory,
        {
          role: "assistant",
          content: "Sorry, I had trouble connecting to the travel intelligence service. Please try asking again!"
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 hover:from-brand-500 hover:to-accent-400 text-white font-semibold text-xs sm:text-sm shadow-glow flex items-center space-x-2 transition-all transform hover:scale-105 no-print"
        >
          <Sparkles className="w-4 h-4 text-accent-200" />
          <span>Ask AI Concierge</span>
        </button>
      )}

      {/* Slide-out Drawer */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] glass-panel border-l border-slate-800 shadow-2xl flex flex-col no-print animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/60">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-500 to-accent-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-brand-400" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center space-x-1.5">
                  <span>AI Travel Concierge</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h4>
                <p className="text-[11px] text-slate-400 truncate max-w-[200px]">
                  Specialized in {destination || "Global Travel"}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompt Suggestion Chips */}
          <div className="p-3 bg-slate-900/40 border-b border-slate-800/60 flex items-center space-x-1.5 overflow-x-auto scrollbar-none text-[11px]">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                disabled={isSending}
                className="whitespace-nowrap px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-all flex-shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={idx}
                  className={`flex items-start space-x-2.5 ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs mt-0.5 ${
                      isUser
                        ? "bg-brand-500 text-white"
                        : "bg-slate-800 text-brand-400 border border-slate-700"
                    }`}
                  >
                    {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? "bg-brand-600 text-white rounded-tr-none shadow-sm"
                        : "bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              );
            })}

            {isSending && (
              <div className="flex items-center space-x-2 text-slate-400 text-xs pl-9">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-400" />
                <span>AI Concierge is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-slate-800/80 bg-slate-900/80 flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask about ${destination || "your trip"}...`}
              disabled={isSending}
              className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <button
              type="submit"
              disabled={isSending || !input.trim()}
              className="p-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 disabled:opacity-40 text-white transition-all shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
