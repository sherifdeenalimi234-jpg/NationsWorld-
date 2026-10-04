import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Send, Mic, MicOff, Navigation, RefreshCw } from 'lucide-react';
import { processNOVACommand } from '../services/novaEngine';
import type { ViewType, NOVAContext } from '../services/novaEngine';

interface NOVAProps {
  activeView: ViewType;
  activeSection?: string;
  activeFilter?: string;
  onNavigate: (view: ViewType, sectionId?: string, filter?: string) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'nova';
  text: string;
  timestamp: Date;
  suggestions?: string[];
}

const INITIAL_WELCOME: Message = {
  id: 'welcome',
  sender: 'nova',
  text: "Hello! I'm NOVA, your website navigation assistant. Tell me where you want to go or what you'd like to find.",
  timestamp: new Date(),
  suggestions: ['Programs', 'Events', 'Resources', 'Membership', 'Application', 'TPD']
};

export const NOVA: React.FC<NOVAProps> = ({
  activeView,
  activeSection,
  activeFilter,
  onNavigate
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([INITIAL_WELCOME]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const handleSendCommandRef = useRef<(text?: string) => Promise<void>>(async () => {});

  // Check browser speech recognition support
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(transcript);
          handleSendCommandRef.current(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Auto-scroll messages to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isProcessing]);

  // Focus input on panel open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Keyboard accessibility: ESC closes panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggleMic = () => {
    if (!speechSupported || !recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        setIsListening(true);
        recognitionRef.current.start();
      } catch {
        setIsListening(false);
      }
    }
  };

  const handleSendCommand = async (textToSend?: string) => {
    const command = (textToSend || inputText).trim();
    if (!command || isProcessing) return;

    const userMsg: Message = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: command,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsProcessing(true);

    const context: NOVAContext = {
      currentView: activeView,
      currentSection: activeSection,
      activeFilter: activeFilter
    };

    // Simulate brief processing delay for smooth conversational feel
    setTimeout(async () => {
      const result = await processNOVACommand(command, context);

      const novaMsg: Message = {
        id: 'msg_nova_' + Date.now(),
        sender: 'nova',
        text: result.response,
        timestamp: new Date(),
        suggestions: result.suggestions
      };

      setMessages((prev) => [...prev, novaMsg]);
      setIsProcessing(false);

      // Execute safe navigation action after short delay to let user read response
      if (result.action.type === 'back') {
        setTimeout(() => {
          if (window.history.length > 1) {
            window.history.back();
          } else {
            onNavigate('home', 'hero');
          }
        }, 600);
      } else if (result.action.type === 'navigate' && result.action.destination) {
        const dest = result.action.destination;
        setTimeout(() => {
          onNavigate(dest.view, dest.sectionId, dest.filter);
        }, 600);
      }
    }, 400);
  };

  useEffect(() => {
    handleSendCommandRef.current = handleSendCommand;
  });

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
    handleSendCommand(suggestion);
  };

  return (
    <>
      {/* Floating NOVA Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[99] flex items-center gap-2.5 px-4.5 py-3 rounded-full bg-gradient-to-r from-deep-emerald via-emerald to-deep-emerald text-ivory font-extrabold text-xs uppercase tracking-widest border border-gold/40 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-gold/50 cursor-pointer"
          aria-label="Open NOVA navigation assistant"
          aria-expanded={false}
        >
          <div className="w-6 h-6 rounded-full bg-obsidian/60 border border-gold/30 flex items-center justify-center text-gold group-hover:rotate-12 transition-transform">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
          </div>
          <span className="text-ivory font-bold tracking-wider">NOVA</span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-gold animate-ping ml-0.5" />
        </button>
      )}

      {/* Conversational Navigation Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="NOVA Intelligent Navigation Assistant"
          aria-modal="false"
          className="fixed bottom-4 right-4 sm:right-6 z-[100] w-[calc(100vw-2rem)] sm:w-[390px] h-[520px] max-h-[85vh] bg-obsidian/95 border border-gold/35 rounded-2xl shadow-glass-dark backdrop-blur-xl flex flex-col overflow-hidden animate-fadeIn font-sans transition-all duration-300"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-deep-emerald via-obsidian to-deep-emerald border-b border-gold/25 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald/20 border border-gold/40 flex items-center justify-center text-gold shadow-md">
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black tracking-widest uppercase text-gold">
                    NOVA
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-gold/20 text-gold text-[9px] font-mono font-bold border border-gold/30">
                    AI NAV
                  </span>
                </div>
                <p className="text-[11px] font-medium text-sage">
                  “How can I help you navigate?”
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setMessages([INITIAL_WELCOME]);
                }}
                title="Reset conversation"
                className="p-1.5 rounded-lg text-sage hover:text-gold hover:bg-white/5 transition focus:outline-none"
                aria-label="Reset conversation"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-sage hover:text-ivory hover:bg-white/10 transition focus:outline-none"
                aria-label="Close NOVA"
              >
                <X className="w-5 h-5 text-gold" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div
            className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs leading-relaxed"
            aria-live="polite"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-emerald text-white rounded-br-xs font-medium border border-emerald/50'
                      : 'bg-deep-emerald/70 text-ivory border border-gold/25 rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {/* Suggestions Pills if provided by NOVA */}
                {msg.sender === 'nova' && msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                    {msg.suggestions.map((sug) => (
                      <button
                        key={sug}
                        type="button"
                        onClick={() => handleSuggestionClick(sug)}
                        className="px-2.5 py-1 rounded-lg bg-obsidian border border-gold/30 hover:border-gold text-[11px] font-semibold text-gold hover:text-ivory hover:bg-deep-emerald/80 transition shadow-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Navigation className="w-2.5 h-2.5 text-mint" />
                        <span>{sug}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Processing Typing Indicator */}
            {isProcessing && (
              <div className="flex items-center gap-2 p-2.5 bg-deep-emerald/50 border border-gold/20 rounded-2xl w-24">
                <div className="w-2 h-2 rounded-full bg-gold animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-mint animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-emerald animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-obsidian border-t border-gold/20 flex items-center gap-2 shrink-0">
            {speechSupported && (
              <button
                type="button"
                onClick={toggleMic}
                title={isListening ? 'Listening... click to stop' : 'Voice search'}
                className={`p-2.5 rounded-xl border transition ${
                  isListening
                    ? 'bg-red-900/60 text-white border-red-500 animate-pulse'
                    : 'bg-deep-emerald/60 text-sage hover:text-gold border-gold/20 hover:border-gold/40'
                }`}
                aria-label={isListening ? 'Stop listening' : 'Start voice input'}
              >
                {isListening ? (
                  <MicOff className="w-4 h-4 text-red-400" />
                ) : (
                  <Mic className="w-4 h-4 text-gold" />
                )}
              </button>
            )}

            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendCommand();
              }}
              placeholder={isListening ? 'Listening...' : 'Tell me where you want to go...'}
              className="flex-1 bg-deep-emerald/30 border border-gold/25 rounded-xl px-3.5 py-2.5 text-xs text-ivory placeholder-sage/70 focus:outline-none focus:border-gold/60 focus:bg-deep-emerald/50 transition"
              disabled={isProcessing}
            />

            <button
              type="button"
              onClick={() => handleSendCommand()}
              disabled={!inputText.trim() || isProcessing}
              className="p-2.5 rounded-xl bg-emerald text-white hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition border border-gold/30 cursor-pointer shrink-0"
              aria-label="Send command"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
