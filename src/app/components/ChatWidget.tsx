"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, X, Send, CalendarCheck } from "lucide-react";

// Add your WhatsApp business number here (digits only, with country code,
// e.g. "919812345678") to show a "Chat on WhatsApp" action in the widget.
const WHATSAPP_NUMBER = "";

type Msg = { from: "user" | "ai"; text: string };

const REPLIES: { keys: RegExp; answer: string }[] = [
  {
    keys: /price|pricing|cost|charge|rate|budget|how much/i,
    answer:
      "Flat, honest pricing: landing pages $350–700 (3–5 days), responsive multi-page corporate sites $700–1,000 (1–3 weeks). AI chatbots from $400 setup + $150–300/mo. Noon HR is $3–6 per employee/month. Full details are in the Pricing section above — or book a free audit and we'll quote your exact scope.",
  },
  {
    keys: /website|web|landing|site/i,
    answer:
      "We build conversion-ready websites at a fixed price — landing pages live in 3–5 days, multi-page corporate sites in 1–2 weeks. Our featured build is bejoiceshipping-ksa.com for a 25-year Saudi logistics leader. Want a free 30-min audit to scope yours?",
  },
  {
    keys: /chatbot|receptionist|whatsapp|ai agent|bot/i,
    answer:
      "Our AI Receptionist answers in seconds, qualifies leads, and books meetings — 24/7 on WhatsApp and web. You're talking to one right now 🙂 Setup is $400 + $150–300/mo, live in 5–10 days.",
  },
  {
    keys: /hr|payroll|attendance|noon ?hr|technoonhr|compliance/i,
    answer:
      "Noon HR is our own SaaS — attendance, payroll, and compliance in one place, $3–6 per employee/month (min $60/mo). It's live with real paying users. Try it at noon-hr.vercel.app or book a demo at cal.com/technoon/hr-demo.",
  },
  {
    keys: /saudi|gcc|ksa|arab|dubai|uae|qatar|oman/i,
    answer:
      "Yes — we actively serve Saudi Arabia and the GCC. Arabic RTL builds, PDPL awareness, SAR pricing, and our featured client is a KSA logistics leader. Book a call and tell us about your market.",
  },
  {
    keys: /founder|team|who|about/i,
    answer:
      "Technoon is founder-led: Sudeshna Pal (full-stack development, AI solutions & delivery) and Ummer Shaiq (business development & growth). No account managers, no hand-offs — the founders build your project.",
  },
  {
    keys: /book|call|audit|meet|demo|talk|schedule/i,
    answer:
      "Great — grab any slot at cal.com/technoon/audit. It's a free 30-minute audit: we map your revenue leaks and hand you a plan, whether or not you hire us.",
  },
];

const FALLBACK =
  "Good question — the founders can answer that better than I can. Book a free 30-min audit at cal.com/technoon/audit, or email info@technoon.ai and you'll hear back within a day.";

const QUICK = ["💰 Pricing", "🌐 Websites", "🤖 AI Receptionist", "🧑‍💼 Noon HR"];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "ai",
      text: "Hi! I'm Technoon's AI receptionist — the same kind we build for clients. Ask me about pricing, websites, or automation.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, open]);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    setMsgs((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    const match = REPLIES.find((r) => r.keys.test(text));
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "ai", text: match ? match.answer : FALLBACK }]);
      setTyping(false);
    }, 900);
  };

  return (
    <>
      <button
        className={`chat-fab${open ? " hidden" : ""}`}
        onClick={() => setOpen(true)}
        aria-label="Open chat with Technoon AI receptionist"
      >
        <Bot size={22} />
        <span className="chat-fab-pulse" aria-hidden="true" />
      </button>

      <div className={`chat-panel${open ? " open" : ""}`} role="dialog" aria-label="Technoon AI receptionist chat">
        <div className="chat-panel-head">
          <span className="hero-chat-avatar"><Bot size={15} /></span>
          <div>
            <p className="hero-chat-name">Technoon AI Receptionist</p>
            <p className="hero-chat-status"><i /> Online — live demo</p>
          </div>
          <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">
            <X size={17} />
          </button>
        </div>

        <div className="chat-panel-body" ref={bodyRef}>
          {msgs.map((m, i) => (
            <div key={i} className={`chat-bubble ${m.from}`}>{m.text}</div>
          ))}
          {typing && (
            <div className="chat-bubble ai chat-typing"><span /><span /><span /></div>
          )}
        </div>

        <div className="chat-quick">
          {QUICK.map((q) => (
            <button key={q} onClick={() => send(q)}>{q}</button>
          ))}
        </div>

        <div className="chat-actions">
          <button className="btn btn-primary btn-sm" data-cal-link="technoon/audit">
            <CalendarCheck size={14} /> Book free audit
          </button>
          {WHATSAPP_NUMBER && (
            <a
              className="btn btn-ghost btn-sm"
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
          )}
        </div>

        <form
          className="chat-input-row"
          onSubmit={(e) => { e.preventDefault(); send(input); }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message…"
            aria-label="Type a message"
          />
          <button type="submit" aria-label="Send message"><Send size={16} /></button>
        </form>
      </div>
    </>
  );
}
