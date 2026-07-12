"use client";

import { useEffect, useState } from "react";
import { Bot } from "lucide-react";

type Msg = { from: "user" | "ai"; text: string };

const script: Msg[] = [
  { from: "user", text: "Hi — do you build websites for restaurants?" },
  { from: "ai", text: "We do! Conversion-ready and live in days, at a fixed price. Want a free 30-min audit?" },
  { from: "user", text: "Yes — tomorrow afternoon works." },
  { from: "ai", text: "Booked for 3:00 PM ✅ Confirmation is on its way to your WhatsApp." },
];

export default function HeroChat() {
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const advance = (i: number) => {
      if (cancelled) return;
      if (i >= script.length) {
        // pause, then loop
        timer = setTimeout(() => {
          if (cancelled) return;
          setVisible(0);
          setTyping(false);
          advance(0);
        }, 6000);
        return;
      }
      const isAi = script[i].from === "ai";
      if (isAi) {
        setTyping(true);
        timer = setTimeout(() => {
          if (cancelled) return;
          setTyping(false);
          setVisible(i + 1);
          advance(i + 1);
        }, 1400);
      } else {
        timer = setTimeout(() => {
          if (cancelled) return;
          setVisible(i + 1);
          advance(i + 1);
        }, 1100);
      }
    };

    advance(0);
    return () => { cancelled = true; clearTimeout(timer); };
  }, []);

  return (
    <div className="hero-chat" aria-label="AI receptionist demo conversation">
      <div className="hero-chat-head">
        <span className="hero-chat-avatar"><Bot size={16} /></span>
        <div>
          <p className="hero-chat-name">Technoon AI Receptionist</p>
          <p className="hero-chat-status"><i /> Online — replies in seconds</p>
        </div>
      </div>
      <div className="hero-chat-body">
        {script.slice(0, visible).map((m, i) => (
          <div key={i} className={`chat-bubble ${m.from}`}>{m.text}</div>
        ))}
        {typing && (
          <div className="chat-bubble ai chat-typing">
            <span /><span /><span />
          </div>
        )}
      </div>
      <div className="hero-chat-foot">
        <span>This is the AI receptionist we build for clients — live demo, bottom right.</span>
      </div>
    </div>
  );
}
