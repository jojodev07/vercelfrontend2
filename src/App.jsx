import React, { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { AiResponse } from './axiosServices/axiosHelper';
import { ArrowUp, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "../src/assets/Screenshot_2026-08-05_155526-removebg-preview.png"
import { Button } from './components/ui/button';
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from 'react-markdown';
import Markdown from 'react-markdown';
import { useOutletContext } from "react-router-dom";



export default function ChatDashboard() {
  const [messages, setMessages] = useState([]);
  const {
    sessions,
    setSessions,
    sessionToLoad,
    clearSessionToLoad,
    sessionToDelete,
    clearSessionToDelete,
    openRatingPrompt,
  } = useOutletContext();
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [failedRequest, setFailedRequest] = useState(null);
  const firstResponseReceived = useRef(false);
  const ratingTimerRef = useRef(null);

  const {name} = useContext(AuthContext);

  useEffect(() => () => clearTimeout(ratingTimerRef.current), []);


  const loadTestMessages = () => {
    setMessages([
      {
        id: '1',
        role: 'user',
        content: 'كيف أدير صف كثير الحركة؟',
      },
      {
        id: '2',
        role: 'assistant',
        content: 'هناك عدة استراتيجيات فعالة لإدارة الصف، منها:\n\n- وضع قواعد واضحة منذ البداية\n- استخدام التعزيز الإيجابي\n- تنويع الأنشطة التعليمية',
      },
      {
        id: '3',
        role: 'user',
        content: 'هل يمكنك إعطائي مثالاً عملياً؟',
      },
    ]);
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (!sessionToLoad) return;

    const session = sessions.find((item) => item.id === sessionToLoad);
    if (session) {
      setActiveSessionId(session.id);
      setMessages(session.messages);
    }
    clearSessionToLoad();
  }, [sessionToLoad, sessions, clearSessionToLoad]);

  useEffect(() => {
    if (!sessionToDelete) return;

    if (sessionToDelete === activeSessionId) {
      setActiveSessionId(null);
      setMessages([]);
    }
    clearSessionToDelete();
  }, [sessionToDelete, activeSessionId, clearSessionToDelete]);

  useEffect(() => {
    if (!activeSessionId || sessionToLoad) return;

    setSessions((currentSessions) => currentSessions.map((session) => (
      session.id === activeSessionId ? { ...session, messages } : session
    )));
  }, [activeSessionId, messages, setSessions]);

  const requestAiResponse = (request, assistantMessageId) => {
    setLoading(true);
    AiResponse(request)
      .then(({data}) => {
        console.log(data);
        if (!firstResponseReceived.current) {
          firstResponseReceived.current = true;
          ratingTimerRef.current = setTimeout(openRatingPrompt, 20000);
        }
        setMessages(prev =>
          prev.map(msg =>
            msg.id === assistantMessageId
          ? { ...msg, content: data.answer, error: false }
          : msg
          )
        )
      }).catch(e => {
          setFailedRequest({ assistantMessageId, request });
          setMessages(prev =>
          prev.map(msg =>
            msg.id === assistantMessageId
          ? { ...msg, content: "عذرا، حدث خطأ ما. يرجى المحاولة لاحقاً", error: true }
          : msg
          )
        )
      }).finally(() => {
        setLoading(false);
      })
  };

  const handleRetry = () => {
    if (!failedRequest || loading) return;

    setFailedRequest(null);
    setMessages((prev) => prev.map((msg) => (
      msg.id === failedRequest.assistantMessageId
        ? { ...msg, content: "انتظر قليلا...", error: false }
        : msg
    )));
    requestAiResponse(failedRequest.request, failedRequest.assistantMessageId);
  };

  const handleSend = async (e) => {
    e.preventDefault();

    const request = input;
    if (!request.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: request,
    };

    if (!activeSessionId || !sessions.some((session) => session.id === activeSessionId)) {
      const sessionId = userMessage.id;
      setActiveSessionId(sessionId);
      setSessions((currentSessions) => [
        ...currentSessions,
        {
          id: sessionId,
          title: request.trim().slice(0, 40),
          messages: [userMessage],
        },
      ]);
    } else if (messages.length === 0) {
      setSessions((currentSessions) => currentSessions.map((session) => (
        session.id === activeSessionId
          ? { ...session, title: request.trim().slice(0, 40) }
          : session
      )));
    }

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const assistantMessageId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      {
        id: assistantMessageId,
        role: 'assistant',
        content: "انتظر قليلا...",
        error: false,
      },
    ]);

    requestAiResponse(request, assistantMessageId);

  };

  const isHomeState = messages.length === 0;

  return (
    <div className="flex h-[calc(100vh-theme(spacing.14))] w-screen flex-col bg-zinc-50 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 overflow-hidden" dir='rtl'>
      
      {/* Main Workspace Layout */}
      {/* Framer Motion switches this flex layout smoothly between centered and bottom-heavy alignments */}
      <div className={`flex flex-1 flex-col overflow-hidden transition-colors duration-500 font-['Noto_Sans_Arabic_Variable'] ${
        isHomeState ? 'justify-center pb-[10vh]' : 'justify-end'
      }`}>
        
        {/* Welcoming Header */}
        {/* AnimatePresence handles the clean fade-and-collapse exit animation */}
        <AnimatePresence>
          {isHomeState && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="mx-auto w-full max-w-2xl text-center px-4 overflow-hidden"
            >
              <div className='flex justify-center'>
              <img src={logo} className='w-[150px] mb-2'></img>
              </div>
                <div className="w-full flex-col flex flex-wrap gap-1 p-3 rounded-t-2xl text-right
                  bg-[#e6f0fa] dark:bg-zinc-900
                  border-2 border-b-0 border-zinc-300 dark:border-zinc-700">

                  <h2 className="text-xl font-semibold tracking-tight leading-[1.35]
                    text-gray-700 dark:text-zinc-100">
                    أهلا بك {name}👋
                  </h2>

                  <p className="text-gray-700 dark:text-zinc-300">
                    المعلم الخبير جاهز لدعمك فوراً 🫡
                  </p>

                  <p className="text-sm w-full mx-auto
                    text-zinc-500 dark:text-zinc-400">
                    لتوفير وقتك الثمين، هل يتعلق استفسارك بأحد الأمور التالية؟
                  </p>
                </div>

                <div className="flex-wrap flex gap-2 justify-center w-full py-4
                  bg-white dark:bg-zinc-950
                  border-2 border-t-0
                  border-zinc-300 dark:border-zinc-700
                  rounded-b-2xl">

                  <Button
                    variant="outline"
                    onClick={() => setInput('كيف أطور مهارات التفكير العليا لدى الطلبة؟')}
                    className="rounded-full border-green-300 dark:border-green-700 dark:text-green-300"
                  >
                    التعلم والتعليم
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setInput('ما هي أهم التشريعات التربوية التي يجب أن أعرفها؟')}
                    className="rounded-full border-blue-300 dark:border-blue-700 dark:text-blue-300"
                  >
                  التشريعات التربوية
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setInput('كيف أبني بيئة تعلم آمنة وداعمة؟')}
                    className="rounded-full border-purple-400 dark:border-purple-700 dark:text-purple-300"
                  >
                    بيئة التعلم
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setInput('ما أفضل الممارسات البيداغوجية داخل الصف؟')}
                    className="rounded-full border-gray-400 dark:border-zinc-600 dark:text-zinc-300"
                  >
                  البيداغوجية
                    
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setInput('كيف أساعد الطلبة على الاستعداد للحياة؟')}
                    className="rounded-full border-red-300 dark:border-red-700 dark:text-red-300"
                  >
                      التعلم للحياة 
                  </Button>
                </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conversational Timeline Feed */}
        {/* Takes up the remaining upper page space only when messages exist */}
        {!isHomeState && (
          <main className="flex-1 overflow-y-auto px-4 py-8">
            <div className="mx-auto max-w-2xl space-y-6">
              {messages.map((msg, index) => {
                // Check if this specific item is the current pending message
                const isLatestLoadingMessage = 
                  loading && 
                  index === messages.length - 1 && 
                  msg.role === 'assistant';

                return (
                  <div
                    key={msg.id}
                    className={`flex w-full ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-[#059669] text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900'
                          : 'bg-white border border-zinc-200/60 dark:bg-zinc-900 dark:border-zinc-800/60'
                      }`}
                    >
                      {isLatestLoadingMessage ? (
                        /* Shimmer loading layout for the active assistant message */
                        <div className="space-y-2 py-1 w-48 sm:w-64">
                          <Skeleton className="h-3.5 w-full bg-zinc-200 dark:bg-zinc-800" />
                          <Skeleton className="h-3.5 w-[20%] bg-zinc-200 dark:bg-zinc-800" />
                          <Skeleton className="h-3.5 w-[40%] bg-zinc-200 dark:bg-zinc-800" />
                        </div>
                      ) : msg.error ? (
                        <div className="space-y-3">
                          <p>{msg.content}</p>
                          <Button type="button" variant="outline" size="sm" onClick={handleRetry} disabled={loading}>
                            <RefreshCw className="ml-2 h-4 w-4" />
                            إعادة المحاولة
                          </Button>
                        </div>
                      ) : msg.role === 'assistant' ? (
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </main>
        )}

        {/* Floating Input Tray Section */}
        {/* The "layout" prop forces Framer Motion to automatically slide this element smoothly across the screen */}
        <motion.footer 
          layout 
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="p-4 flex-shrink-0 w-full"
        >
          <div className="mx-auto max-w-2xl">
            <form
              onSubmit={handleSend}
              className="relative flex items-center rounded-2xl border border-zinc-200 bg-white p-2 shadow-md transition-all focus-within:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:focus-within:border-zinc-700"
            >

              <input
                dir='rtl'
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اسألني..."
                className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-zinc-400"
              />

              <div className="flex items-center gap-1">
                
                <button
                  type="submit"
                  disabled={!input.trim() || loading === true}
                  aria-label="إرسال السؤال"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1E3A8A] text-zinc-50 transition-all disabled:opacity-30 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 cursor-pointer disabled:cursor-default"
                >
                  <ArrowUp className="h-4 w-4 stroke-[2.5]" />
                </button>
              </div>
            </form>
            
            <p className="mt-2 text-center text-xs text-zinc-400 dark:text-zinc-500">
              يرجى مراجعة الأجوبة الناتجة من النموذج
            </p>
          </div>
        </motion.footer>

      </div>
    </div>
  );
}