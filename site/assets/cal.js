/* technoon.ai — the booking card.

   Ported from the previous technoon site's Cal.com modal: same provider, same
   event, same trick of delegating off a data attribute so any surface anywhere
   on the page can open it. Rebuilt on this page's rules rather than copied
   across, because the two sites disagree about most of what matters here.

   What changed from the original, and why each one had to:

   - Native <dialog>. The old one was a div with a hand-rolled Escape handler
     and a hand-rolled click-outside. showModal() brings the focus trap, the
     Escape key, the top layer and the inertness of the page behind it in the
     platform. Same call detail.js makes, for the same reason.

   - Lenis is stopped and the document is pinned TOGETHER. The old one set
     body.style.overflow and stopped there. That is enough on an ordinary page
     and nowhere near enough on this one: behind this card sits 1800vh of
     scroll-driven film, so a wheel flick over the veil would scrub it and drop
     the reader somewhere they never chose when the card closed. Releasing one
     without the other is worse than releasing neither.

   - The iframe carries no src until the card is opened for the first time. The
     old one rendered it on every single page load whether or not anyone ever
     booked anything, which is a third-party connection and a few hundred KB
     spent on nothing. This page already asks the reader to carry a 12MB film;
     it does not get to be careless with the rest.

   - Light, because this site is light. theme=light, and the brand colour is
     this page's own violet rather than the old site's.

   Imported dynamically by app.js, never statically, for the same reason
   detail.js and scene.js are: any layer may fail alone. Until initCal() runs,
   every trigger is an ordinary link pointing straight at the booking page, so
   a failure in here costs the reader a modal, not the booking. That fallback
   is the whole reason the triggers are <a href> and not <button>. */

const CAL_URL = 'https://cal.com/sudeshna-pal-ruww5f/technoon.ai';

/* Cal.com posts from either host depending on how the booking page is served.
   Both are checked explicitly; a message from anywhere else is ignored, which
   is the only thing standing between an embedded third party and this page. */
const CAL_ORIGINS = ['https://cal.com', 'https://app.cal.com'];

function src() {
  return `${CAL_URL}?embed=true&theme=light&layout=month_view&brandColor=6C4CE0`;
}

export function initCal(opts = {}) {
  const dialog = document.getElementById('cal-book');
  const frame = dialog && dialog.querySelector('.cal-frame');

  /* no dialog, or a browser without showModal: leave every trigger as the
     plain link it already is rather than half-arming an interaction */
  if (!dialog || !frame || typeof dialog.showModal !== 'function') return;

  const closeBtn = dialog.querySelector('.cal-close');
  const getLenis = typeof opts.lenis === 'function' ? opts.lenis : () => null;

  let mounted = false;      // the iframe has been given a src at least once
  let needsReset = false;   // a booking completed; the next open starts clean
  let opener = null;

  /* ── the iframe ─────────────────────────────────────────────────────────
     Mounted on first open, never at boot. `is-ready` is what swaps the
     skeleton out for the real thing, and it is driven by the iframe's own
     load event rather than a timer. */

  function mount() {
    if (mounted) return;
    mounted = true;
    frame.src = src();
  }

  frame.addEventListener('load', () => {
    /* a src-less iframe fires load once for about:blank; ignore that one */
    if (mounted) dialog.classList.add('is-ready');
  });

  /* ── open and close ─────────────────────────────────────────────────── */

  function open(trigger) {
    opener = trigger || null;

    if (needsReset) {
      /* they booked something last time. Reload so the card opens on the
         calendar again rather than on the confirmation screen they already
         read, which is what the old site got wrong until it was patched. */
      needsReset = false;
      dialog.classList.remove('is-ready');
      frame.src = src();
    } else {
      mount();
    }

    dialog.showModal();
    if (trigger) trigger.setAttribute('aria-expanded', 'true');

    /* see the note at the top: both scrollers, or neither */
    const lenis = getLenis();
    if (lenis && typeof lenis.stop === 'function') lenis.stop();
    document.documentElement.classList.add('detail-open');
  }

  function release() {
    document.documentElement.classList.remove('detail-open');
    const lenis = getLenis();
    if (lenis && typeof lenis.start === 'function') lenis.start();

    if (opener) {
      opener.setAttribute('aria-expanded', 'false');
      /* the triggers live inside scroll-driven bands that may have gone
         visibility:hidden while the card was open, so the browser's own focus
         restore cannot always find them. Put it back explicitly and let it
         fail quietly when the element is genuinely gone. */
      try { opener.focus({ preventScroll: true }); } catch (_) {}
      opener = null;
    }
  }

  dialog.addEventListener('close', release);

  /* clicking the veil closes. The dialog itself only receives the click when
     the pointer missed the panel, because the panel sits above it. */
  dialog.addEventListener('click', e => {
    if (e.target === dialog) dialog.close();
  });

  if (closeBtn) closeBtn.addEventListener('click', () => dialog.close());

  /* ── what Cal.com tells us ──────────────────────────────────────────────
     Bound once at init rather than per-open. The listener is cheap, and
     binding it on open means a booking confirmed in the instant before a
     close would be missed. */

  window.addEventListener('message', e => {
    if (!CAL_ORIGINS.includes(e.origin)) return;
    const t = e.data && e.data.type;
    if (!t) return;
    if (t === 'cal:close' || t === 'close') {
      if (dialog.open) dialog.close();
    }
    if (t === 'bookingSuccessful' || t === 'CAL_BOOKING_SUCCESSFUL' || t === 'cal:booking:confirmed') {
      needsReset = true;
    }
  });

  /* ── wire every trigger ─────────────────────────────────────────────────
     Delegated, exactly as the old site did it, so a trigger added later needs
     no JS change: give it data-cal and it works. preventDefault is what turns
     the link into a modal; without this listener the same element still gets
     the reader to the same booking page, just the long way round. */

  document.addEventListener('click', e => {
    const t = e.target.closest('[data-cal]');
    if (!t) return;
    /* let modified clicks through: a reader who cmd-clicks wants the tab */
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    open(t);
  });

  for (const t of document.querySelectorAll('[data-cal]')) {
    t.setAttribute('aria-haspopup', 'dialog');
    t.setAttribute('aria-expanded', 'false');
  }

  /* the affordance is CSS and only switches on once the wiring above has
     actually happened, the same contract detail.js has with .detail-ready */
  document.documentElement.classList.add('cal-ready');
}
