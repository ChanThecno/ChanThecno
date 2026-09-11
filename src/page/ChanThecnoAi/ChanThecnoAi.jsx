import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ChanThecnoLogo from "../../assets/chanthecno.svg";

const FONT_DISPLAY = "'Space Grotesk', ui-sans-serif, system-ui, sans-serif";

const FONT_BODY = "'Inter', ui-sans-serif, system-ui, sans-serif";

const IconBuilding = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 21V7a1 1 0 011-1h6a1 1 0 011 1v14M14 21v-7a1 1 0 011-1h4a1 1 0 011 1v7"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 9h1M7 12h1M7 15h1M10 9h1M10 12h1M10 15h1M16 15h1M19 15h1"
    />
  </svg>
);

const IconSpark = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"
    />
  </svg>
);

const IconLayers = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 3l8 4.5-8 4.5-8-4.5L12 3z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 12l8 4.5 8-4.5M4 16.5L12 21l8-4.5"
    />
  </svg>
);

const IconChat = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
    />
  </svg>
);

const IconCopy = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

const IconCheck = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

// Blok kode dengan header bahasa + tombol salin
function CodeBlock({ className, children }) {
  const [copied, setCopied] = useState(false);

  const language = (className || "").replace("language-", "") || "text";

  const codeText = String(children).replace(/\n$/, "");

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error("Gagal menyalin kode:", error);
    }
  };

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-[#55708C]/20 bg-[#10141F]">
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#181D2A] border-b border-white/5">
        <span className="text-[11px] font-mono uppercase tracking-wide text-[#8CA0B5]">
          {language}
        </span>

        <button
          type="button"
          onClick={handleCopyCode}
          className="flex items-center gap-1.5 text-[11px] font-medium text-[#8CA0B5] hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Tersalin</span>
            </>
          ) : (
            <>
              <IconCopy className="w-3.5 h-3.5" />
              Salin
            </>
          )}
        </button>
      </div>

      <pre className="p-3.5 overflow-x-auto font-mono text-xs leading-relaxed text-white/90">
        <code>{codeText}</code>
      </pre>
    </div>
  );
}

export default function ChanThecnoAi() {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [streamingContent, setStreamingContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const typingIntervalRef = useRef(null);

  // Scroll otomatis ke pesan terbaru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading, streamingContent]);

  // Auto resize textarea
  useEffect(() => {
    const el = textareaRef.current;

    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [input]);

  // Bersihkan interval ketika komponen di-unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  // Copy pesan
  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (error) {
      console.error("Gagal menyalin pesan:", error);
    }
  };

  // Animasi jawaban AI
  const animateResponse = (fullText) => {
    setIsTyping(true);
    setStreamingContent("");

    let index = 0;

    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    typingIntervalRef.current = setInterval(() => {
      if (index < fullText.length) {
        const chunk = fullText.slice(index, index + 2);

        setStreamingContent((prev) => prev + chunk);

        index += 2;
      } else {
        clearInterval(typingIntervalRef.current);

        typingIntervalRef.current = null;

        setIsTyping(false);

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: fullText,
          },
        ]);

        setStreamingContent("");
      }
    }, 14);
  };

  // Kirim pesan
  const sendMessage = async (customMessage) => {
    const text = (customMessage || input).trim();

    if (!text || isLoading || isTyping) {
      return;
    }

    const userMessage = {
      role: "user",
      content: text,
    };

    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      const responseText = await response.text();

      let data = {};

      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch (error) {
          throw new Error("Respon dari server bukan JSON yang valid.");
        }
      }

      if (!response.ok) {
        throw new Error(data.error || `Server Error (${response.status})`);
      }

      const rawAnswer = data.reply || "Maaf, tidak ada respon dari server.";

      setIsLoading(false);

      animateResponse(rawAnswer);
    } catch (error) {
      setIsLoading(false);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Terjadi kesalahan: ${error.message}`,
        },
      ]);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const suggestions = [
    {
      text: "Apa itu ChanThecno?",
      icon: IconChat,
    },
    {
      text: "Bantu saya membuat website",
      icon: IconBuilding,
    },
    {
      text: "Jelaskan tentang Artificial Intelligence",
      icon: IconSpark,
    },
    {
      text: "Bantu saya membuat aplikasi",
      icon: IconLayers,
    },
  ];

  const useSuggestion = (text) => {
    sendMessage(text);
  };
  const markdownComponents = {
    table: ({ node, ...props }) => (
      <div className="overflow-x-auto my-3 rounded-lg border border-[#55708C]/20">
        <table
          className="w-full text-left border-collapse text-xs sm:text-sm"
          {...props}
        />
      </div>
    ),

    thead: ({ node, ...props }) => (
      <thead className="bg-[#10141F] text-white font-semibold" {...props} />
    ),

    th: ({ node, ...props }) => (
      <th className="p-2.5 border-b border-[#55708C]/20" {...props} />
    ),

    td: ({ node, ...props }) => (
      <td className="p-2.5 border-b border-[#55708C]/10" {...props} />
    ),

    p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,

    ul: ({ node, ...props }) => (
      <ul className="list-disc pl-5 mb-2 space-y-1" {...props} />
    ),

    ol: ({ node, ...props }) => (
      <ol className="list-decimal pl-5 mb-2 space-y-1" {...props} />
    ),

    code: ({ node, inline, className, children, ...props }) =>
      inline ? (
        <code
          className="bg-[#55708C]/10 text-[#10141F] px-1.5 py-0.5 rounded font-mono text-xs"
          {...props}
        >
          {children}
        </code>
      ) : (
        <CodeBlock className={className}>{children}</CodeBlock>
      ),
  };

  return (
    <div
      className="min-h-screen bg-[#FAFAF6] flex flex-col"
      style={{
        fontFamily: FONT_BODY,
      }}
    >
      <style>{`
        @keyframes heroGlowPulse {
          0% {
            opacity: 0;
            transform: scale(0.85);
          }

          45% {
            opacity: 0.55;
            transform: scale(1.08);
          }

          100% {
            opacity: 0.32;
            transform: scale(1);
          }
        }

        @keyframes logoRise {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.92);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes messageIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cursorBlink {
          0%,
          45% {
            opacity: 1;
          }

          50%,
          95% {
            opacity: 0;
          }

          100% {
            opacity: 1;
          }
        }

        .cn-hero-glow {
          animation:
            heroGlowPulse
            1.6s
            ease-out
            forwards;
        }

        .cn-logo-rise {
          animation:
            logoRise
            0.55s
            cubic-bezier(0.16, 1, 0.3, 1)
            both;
        }

        .cn-message-in {
          animation:
            messageIn
            0.32s
            cubic-bezier(0.16, 1, 0.3, 1)
            both;
        }

        .cn-cursor {
          animation:
            cursorBlink
            1s
            steps(1)
            infinite;
        }
      `}</style>

      {/* HEADER */}
      <header className="relative w-full h-20 bg-[#FAFAF6]/90 backdrop-blur-md flex items-center justify-between px-4 sm:px-8 lg:px-16 sticky top-0 z-50">
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F2A93B]/50 to-transparent" />

        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#10141F] rounded-xl flex items-center justify-center p-2 ring-1 ring-[#F2A93B]/40 group-hover:ring-[#F2A93B] transition-all duration-300">
            <img
              src={ChanThecnoLogo}
              alt="ChanThecno"
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <h1
              className="font-bold text-[#10141F] text-base sm:text-lg"
              style={{
                fontFamily: FONT_DISPLAY,
              }}
            >
              ChanThecno AI
            </h1>

            <p className="text-xs text-[#55708C]">Artificial Intelligence</p>
          </div>
        </Link>

        <Link
          to="/Home"
          className="text-sm font-medium text-[#3B4453] hover:text-[#10141F] transition-colors"
        >
          Kembali
        </Link>
      </header>

      {/* MAIN */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col">
        {messages.length === 0 && !isLoading && !isTyping ? (
          <div className="flex-1 flex flex-col items-center justify-center py-16">
            {/* LOGO */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 cn-logo-rise">
              <div
                className="cn-hero-glow absolute -inset-6 rounded-full blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(242,169,59,0.55), transparent 70%)",
                }}
              />

              <div className="relative w-full h-full bg-[#10141F] rounded-3xl flex items-center justify-center p-5 shadow-xl shadow-[#10141F]/10 ring-1 ring-[#F2A93B]/30">
                <img
                  src={ChanThecnoLogo}
                  alt="ChanThecno AI"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* TITLE */}
            <h2
              className="mt-8 text-3xl sm:text-4xl md:text-5xl font-bold text-[#10141F] text-center tracking-tight"
              style={{
                fontFamily: FONT_DISPLAY,
              }}
            >
              Halo, saya ChanThecno AI
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-4 text-[#3B4453] text-center max-w-xl text-sm sm:text-base leading-relaxed">
              Saya siap membantu Anda menjawab pertanyaan, mencari ide, membuat
              solusi, dan membantu berbagai kebutuhan Anda.
            </p>

            {/* SUGGESTIONS */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
              {suggestions.map(({ text, icon: Icon }) => (
                <button
                  key={text}
                  type="button"
                  onClick={() => useSuggestion(text)}
                  disabled={isLoading || isTyping}
                  className="flex items-center gap-3 text-left p-4 rounded-xl border border-[#55708C]/20 bg-white hover:border-[#F2A93B] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 text-sm text-[#3B4453] disabled:opacity-50 disabled:translate-y-0"
                >
                  <span className="shrink-0 w-8 h-8 rounded-lg bg-[#F2A93B]/15 text-[#B97417] flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </span>

                  {text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* CHAT */
          <div className="flex-1 py-8 sm:py-10 space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`cn-message-in flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`relative group max-w-[90%] sm:max-w-[80%] rounded-2xl px-5 py-4 text-sm sm:text-base leading-relaxed ${
                    message.role === "user"
                      ? "bg-[#10141F] text-white rounded-br-md whitespace-pre-wrap"
                      : "bg-white border border-[#55708C]/15 border-l-[3px] border-l-[#F2A93B] text-[#3B4453] rounded-bl-md shadow-sm"
                  }`}
                >
                  {/* COPY */}
                  {message.role === "assistant" && (
                    <button
                      type="button"
                      onClick={() => handleCopy(message.content, index)}
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-[#FAFAF6] hover:bg-[#55708C]/10 text-[#55708C] transition-colors border border-[#55708C]/15 opacity-0 group-hover:opacity-100"
                      title="Salin Pesan"
                    >
                      {copiedIndex === index ? (
                        <span className="text-xs font-semibold text-emerald-600 px-1">
                          Tersalin!
                        </span>
                      ) : (
                        <IconCopy className="w-4 h-4" />
                      )}
                    </button>
                  )}

                  {/* USER / AI */}
                  {message.role === "user" ? (
                    message.content
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={markdownComponents}
                    >
                      {message.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}

            {/* LOADING */}
            {isLoading && (
              <div className="cn-message-in flex justify-start">
                <div className="bg-white border border-[#55708C]/15 rounded-2xl rounded-bl-md px-5 py-4 flex items-center gap-3 shadow-sm">
                  <div className="relative w-7 h-7 shrink-0">
                    <div className="absolute inset-1 rounded-full bg-[#10141F] flex items-center justify-center overflow-hidden">
                      <img
                        src={ChanThecnoLogo}
                        alt=""
                        className="w-3.5 h-3.5 object-contain"
                      />
                    </div>

                    <div className="absolute inset-0 rounded-full border-2 border-[#F2A93B]/25 border-t-[#F2A93B] animate-spin" />
                  </div>

                  <span className="text-xs font-medium text-[#55708C] animate-pulse">
                    ChanThecno AI sedang berpikir…
                  </span>
                </div>
              </div>
            )}

            {/* TYPING */}
            {isTyping && (
              <div className="cn-message-in flex justify-start">
                <div className="bg-white border border-[#55708C]/15 border-l-[3px] border-l-[#F2A93B] text-[#3B4453] rounded-2xl rounded-bl-md max-w-[90%] sm:max-w-[80%] px-5 py-4 text-sm sm:text-base leading-relaxed shadow-sm">
                  <span className="whitespace-pre-wrap break-words">
                    {streamingContent}

                    <span className="cn-cursor inline-block w-[3px] h-4 ml-0.5 -mb-0.5 bg-[#F2A93B] align-middle" />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* INPUT */}
      <div className="sticky bottom-0 w-full bg-gradient-to-t from-[#FAFAF6] via-[#FAFAF6] to-transparent pt-8 pb-5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-[#55708C]/20 focus-within:border-[#F2A93B] focus-within:ring-4 focus-within:ring-[#F2A93B]/15 rounded-2xl shadow-lg shadow-[#10141F]/5 p-2 flex items-end gap-2 transition-all duration-200">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Kirim pesan ke ChanThecno AI..."
              rows="1"
              disabled={isLoading || isTyping}
              className="flex-1 resize-none bg-transparent px-4 py-3 outline-none text-sm sm:text-base text-[#10141F] placeholder:text-[#55708C]/70 max-h-40 disabled:opacity-60 transition-[height] duration-150"
            />

            <button
              type="button"
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading || isTyping}
              className="w-11 h-11 shrink-0 rounded-xl bg-[#F2A93B] text-[#10141F] flex items-center justify-center hover:bg-[#e69c28] hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-150"
              aria-label="Kirim pesan"
            >
              {isLoading || isTyping ? (
                <svg
                  className="animate-spin w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />

                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14M13 6l6 6-6 6"
                  />
                </svg>
              )}
            </button>
          </div>

          <p className="text-center text-xs text-[#55708C]/70 mt-3">
            ChanThecno AI dapat membuat kesalahan. Periksa kembali informasi
            penting.
          </p>
        </div>
      </div>
    </div>
  );
}
