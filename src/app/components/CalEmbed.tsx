/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";

// Loads the official Cal.com embed script once. Any element with a
// `data-cal-link="technoon/audit"` (or `technoon/hr-demo`) attribute opens
// the booking calendar in a popup modal instead of navigating away.
export default function CalEmbed() {
  useEffect(() => {
    const w = window as any;
    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) { a.q.push(ar); };
      const d = C.document;
      C.Cal = C.Cal || function (...args: any[]) {
        const cal = C.Cal;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (args[0] === L) {
          const api: any = function (...apiArgs: any[]) { p(api, apiArgs); };
          const namespace = args[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], args);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, args);
          return;
        }
        p(cal, args);
      };
    })(w, "https://app.cal.com/embed/embed.js", "init");

    w.Cal("init", { origin: "https://cal.com" });
    w.Cal("ui", {
      theme: "dark",
      cssVarsPerTheme: { dark: { "cal-brand": "#7a5cff" } },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, []);

  return null;
}
