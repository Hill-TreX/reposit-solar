"use client";

import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { ImagePlus, Paperclip, Send, X, Zap } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Form = { firstName: string; lastName: string; email: string };
type Message = {
  id: number;
  sender: "support" | "visitor";
  body: string;
  time: string;
};

const inputClass =
  "h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 text-sm text-[var(--text-dark)] outline-none transition placeholder:text-white/30 focus:border-white/30 focus:ring-2 focus:ring-white/10";
const inputClassLight =
  "h-11 w-full rounded-xl border border-black/10 bg-black/5 px-3.5 text-sm text-[var(--text-light)] outline-none transition placeholder:text-black/30 focus:border-black/30 focus:ring-2 focus:ring-black/10";

const timeNow = () =>
  new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(
    new Date(),
  );

function ChatBubbleIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 240 240" fill="none" aria-hidden="true">
      <path
        d="M240.808 240.808H122.123C56.6994 240.808 3.45695 187.562 3.45695 122.122C3.45695 56.7031 56.6994 3.45697 122.124 3.45697C187.566 3.45697 240.808 56.7031 240.808 122.122V240.808Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function FloatingChatWidget() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [conversation, setConversation] = useState(false);
  const [starting, setStarting] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState<Form>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [draft, setDraft] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  useEffect(() => {
    if (!open || !window.matchMedia("(max-width: 639px)").matches) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [themeVersion, setThemeVersion] = useState(0);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setThemeVersion((v) => v + 1);
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const isDark = !document.body.classList.contains("light-theme");
  const currentInputClass = isDark ? inputClass : inputClassLight;

  const beginConversation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || starting) return;
    setStarting(true);
    window.setTimeout(() => {
      setMessages([
        {
          id: 1,
          sender: "support",
          body: `Hi ${form.firstName}, welcome to Reposit. How can we help?`,
          time: timeNow(),
        },
      ]);
      setConversation(true);
      setStarting(false);
    }, 450);
  };

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = draft.trim();
    if ((!body && !attachment) || sending) return;
    setSending(true);
    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: Date.now(),
          sender: "visitor",
          body: body || `Attached ${attachment?.name}`,
          time: timeNow(),
        },
      ]);
      setDraft("");
      setAttachment(null);
      setSending(false);
    }, 250);
  };

  const closeWidget = () => {
    setOpen(false);
    setConversation(false);
    setDraft("");
    setAttachment(null);
  };

  return (
    <div className="fixed bottom-6 right-4 z-[200] sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.section
            aria-label="Reposit support chat"
            initial={
              reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 28 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 22 }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 360, damping: 30 }
            }
            className="fixed inset-0 flex h-[100dvh] w-full flex-col overflow-hidden overscroll-contain border-0 shadow-2xl sm:inset-auto sm:bottom-[104px] sm:right-6 sm:h-[min(640px,calc(100dvh-128px))] sm:w-[388px] sm:rounded-[24px] sm:border"
            style={{
              background: isDark ? "#000000" : "#ffffff",
              color: isDark ? "#E5DEC9" : "#3E3424",
              borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            }}
          >
            {!conversation ? (
              <>
                <header
                  className="relative overflow-hidden px-5 pb-8 pt-[calc(1.25rem+env(safe-area-inset-top))] sm:pt-5"
                  style={{ background: isDark ? "#1a1a1a" : "#f5f5f5" }}
                >
                  <div className="pointer-events-none absolute -right-14 -top-20 h-52 w-52 rounded-full bg-white/[0.03] blur-2xl" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.12)]" />
                        <span
                          className="flex h-7 w-7 items-center justify-center rounded-full"
                          style={{ background: isDark ? "#3E3424" : "#E5DEC9" }}
                        >
                          <img src="/logo.svg" alt="" className="logo-sm" />
                        </span>
                        <span className="text-[15px] font-semibold">
                          Reposit Support
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={closeWidget}
                        aria-label="Close support chat"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                      >
                        <X className="h-[18px] w-[18px]" />
                      </button>
                    </div>
                    <h2 className="mt-6 text-[22px] font-bold">
                      Start a conversation
                    </h2>
                    <p
                      className="mt-2 text-[13px]"
                      style={{ color: isDark ? "#898989" : "#666" }}
                    >
                      Tell us who you are once, then return to this chat
                      anytime.
                    </p>
                  </div>
                </header>
                <form
                  onSubmit={beginConversation}
                  className="min-h-0 flex-1 overflow-y-auto px-5 py-5"
                >
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <label className="block">
                        <span
                          className="mb-1.5 block text-xs font-semibold"
                          style={{ color: isDark ? "#D4D4D4" : "#333" }}
                        >
                          First name <span style={{ color: isDark ? "white" : "black" }}>*</span>
                        </span>
                        <input
                          required
                          value={form.firstName}
                          onChange={(event) =>
                            setForm((current) => ({
                              ...current,
                              firstName: event.target.value,
                            }))
                          }
                          className={currentInputClass}
                          autoComplete="given-name"
                        />
                      </label>
                      <label className="block">
                        <span
                          className="mb-1.5 block text-xs font-semibold"
                          style={{ color: isDark ? "#D4D4D4" : "#333" }}
                        >
                          Last name <span style={{ color: isDark ? "white" : "black" }}>*</span>
                        </span>
                        <input
                          required
                          value={form.lastName}
                          onChange={(event) =>
                            setForm((current) => ({
                              ...current,
                              lastName: event.target.value,
                            }))
                          }
                          className={currentInputClass}
                          autoComplete="family-name"
                        />
                      </label>
                    </div>
                    <label className="block">
                      <span
                        className="mb-1.5 block text-xs font-semibold"
                        style={{ color: isDark ? "#D4D4D4" : "#333" }}
                      >
                        Email address <span style={{ color: isDark ? "white" : "black" }}>*</span>
                      </span>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            email: event.target.value,
                          }))
                        }
                        className={currentInputClass}
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                    </label>
                    <button
                      type="submit"
                      disabled={starting}
                      className="flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold text-white disabled:opacity-70"
                      style={{
                        background: isDark ? "#ffffff" : "#1a1a1a",
                        color: isDark ? "#000000" : "#ffffff",
                      }}
                    >
                      {starting
                        ? "Starting conversation..."
                        : "Continue to chat"}
                    </button>
                    <p
                      className="text-center text-[11px] leading-4"
                      style={{ color: isDark ? "#666" : "#999" }}
                    >
                      Your details are only used to respond to this support
                      request.
                    </p>
                  </div>
                </form>
              </>
            ) : (
              <>
                <header
                  className="flex h-[calc(70px+env(safe-area-inset-top))] shrink-0 items-center gap-3 px-4 pt-[env(safe-area-inset-top)] sm:h-[70px] sm:pt-0"
                  style={{ background: isDark ? "#1a1a1a" : "#f5f5f5" }}
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-sm"
                    style={{ background: isDark ? "#3E3424" : "#E5DEC9" }}
                  >
                    <img src="/logo.svg" alt="" className="logo-sm" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-sm font-semibold">
                      Reposit Support
                    </h2>
                    <p
                      className="mt-0.5 text-xs"
                      style={{ color: isDark ? "#898989" : "#666" }}
                    >
                      We typically reply in a few minutes
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeWidget}
                    aria-label="Close support chat"
                    className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10"
                  >
                    <X className="h-[19px] w-[19px]" />
                  </button>
                </header>
                <div
                  className="min-h-0 flex-1 overflow-y-auto px-4 py-5"
                  aria-live="polite"
                  style={{ background: isDark ? "#0a0a0a" : "#fafaf5" }}
                >
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-4 flex items-end gap-2 ${message.sender === "visitor" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "support" && (
                        <span
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                          style={{ background: isDark ? "#3E3424" : "#E5DEC9" }}
                        >
                          <img src="/logo.svg" alt="" className="logo-sm" />
                        </span>
                      )}
                      <div
                        className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm ${
                          message.sender === "visitor"
                            ? "rounded-br-sm bg-white text-black"
                            : "rounded-bl-sm border"
                        }`}
                        style={
                          message.sender !== "visitor"
                            ? {
                                borderColor: isDark ? "#303030" : "#ddd",
                                background: isDark ? "#202020" : "#f0f0f0",
                                color: isDark ? "#D4D4D4" : "#333",
                              }
                            : undefined
                        }
                      >
                        {message.sender === "support" && (
                          <p
                            className="mb-0.5 text-[10px] font-bold"
                            style={{ color: isDark ? "#898989" : "#666" }}
                          >
                            Reposit Support
                          </p>
                        )}
                        <p>{message.body}</p>
                        <p
                          className={`mt-1 text-right text-[10px] ${
                            message.sender === "visitor"
                              ? "text-black/45"
                              : ""
                          }`}
                          style={
                            message.sender !== "visitor"
                              ? { color: isDark ? "#898989" : "#666" }
                              : undefined
                          }
                        >
                          {message.time}
                        </p>
                      </div>
                      {message.sender === "visitor" && (
                        <span
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
                          style={{ background: isDark ? "#303030" : "#666" }}
                        >
                          {form.firstName[0]}
                          {form.lastName[0]}
                        </span>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <form
                  onSubmit={sendMessage}
                  className="shrink-0 border-t px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 sm:p-3"
                  style={{
                    borderColor: isDark ? "#303030" : "#ddd",
                    background: isDark ? "#111" : "#fafafa",
                  }}
                >
                  {attachment && (
                    <div
                      className="mb-2 flex items-center gap-2 rounded-xl border p-2 text-xs"
                      style={{
                        borderColor: isDark ? "#303030" : "#ddd",
                        background: isDark ? "#202020" : "#f0f0f0",
                        color: isDark ? "#D4D4D4" : "#333",
                      }}
                    >
                      <Paperclip className="h-4 w-4" />
                      <span className="min-w-0 flex-1 truncate">
                        {attachment.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => setAttachment(null)}
                        aria-label="Remove attachment"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,.pdf,.doc,.docx"
                      className="hidden"
                      onChange={(event) =>
                        setAttachment(event.target.files?.[0] ?? null)
                      }
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={sending}
                      aria-label="Attach image or document"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-white/10 disabled:opacity-50"
                      style={{ color: isDark ? "#898989" : "#666" }}
                    >
                      <ImagePlus className="h-5 w-5" />
                    </button>
                    <input
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      placeholder="Write a message..."
                      aria-label="Message"
                      className="h-11 min-w-0 flex-1 rounded-full border bg-transparent px-4 text-sm outline-none placeholder:text-white/30 focus:border-white/30"
                      style={{
                        borderColor: isDark ? "#303030" : "#ddd",
                        color: isDark ? "#E5DEC9" : "#3E3424",
                      }}
                    />
                    <button
                      type="submit"
                      disabled={(!draft.trim() && !attachment) || sending}
                      aria-label="Send message"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black disabled:opacity-50"
                    >
                      {sending ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                      ) : (
                        <Send className="h-[18px] w-[18px]" />
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.section>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        onClick={() => setOpen((current) => !current)}
        whileHover={reduceMotion ? undefined : { scale: 1.06 }}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        aria-label={open ? "Close support chat" : "Open support chat"}
        aria-expanded={open}
        className={`relative ml-auto h-16 w-16 items-center justify-center rounded-full shadow-[0_12px_30px_rgba(0,0,0,0.35)] ${
          open ? "hidden sm:flex" : "flex"
        }`}
        style={{
          background: isDark ? "#1A1A1A" : "#f5f5f5",
          color: isDark ? "#E5DEC9" : "#3E3424",
        }}
      >
        {open ? <X className="h-[25px] w-[25px]" /> : <ChatBubbleIcon size={24} />}
      </motion.button>
    </div>
  );
}
