"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { X } from "lucide-react";

const CAL_URL = "https://cal.com/sudeshna-pal-ruww5f/technoon.ai";

export default function CalEmbed() {
  const [open, setOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const needsReset = useRef(false);

  const close = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cal-link]");
      if (!target) return;
      e.preventDefault();
      setOpen(true);
      document.body.style.overflow = "hidden";
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MessageEvent) => {
      if (e.origin !== "https://cal.com" && e.origin !== "https://app.cal.com") return;
      const t = e.data?.type;
      if (t === "cal:close" || t === "close") close();
      if (t === "bookingSuccessful" || t === "CAL_BOOKING_SUCCESSFUL" || t === "cal:booking:confirmed") {
        needsReset.current = true;
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [open, close]);

  const handleClose = useCallback(() => {
    if (needsReset.current && iframeRef.current) {
      needsReset.current = false;
      iframeRef.current.src = src();
    }
    close();
  }, [close]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) handleClose();
    };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, handleClose]);

  if (!open) return null;

  return (
    <div className="cal-overlay" onClick={handleClose}>
      <div className="cal-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="cal-close" onClick={handleClose} aria-label="Close">
          <X size={20} />
        </button>
        <iframe
          ref={iframeRef}
          src={src()}
          className="cal-iframe"
          title="Book a call"
          allow="calendar"
        />
      </div>
    </div>
  );
}

function src() {
  return `${CAL_URL}?embed=true&theme=dark&layout=month_view&brandColor=7a5cff`;
}
