/* technoon.ai — the function card.

   Every function surface on the page (the pain kickers, the chaos headings,
   the resolution kickers and the six dock pills) carries a data-fn. This
   module points all of them at one native <dialog> and swaps the panel inside
   it.

   Native <dialog> on purpose. showModal() brings the focus trap, Escape, the
   top layer and the inertness of the page behind it in the platform. Every one
   of those is a thing a hand-rolled overlay gets subtly wrong, and none of them
   are this module's business.

   Imported dynamically by app.js, never statically, for the same reason
   scene.js is: if this file is missing or throws at module scope, the drive
   loop and the scrub have to survive it untouched. Until initDetail() actually
   runs, the labels carry no pointer cursor and no underline, so a failure here
   leaves plain words rather than words that look clickable and are not. */

const MAX_TILT = 7;          // degrees. Past about eight it stops reading as a
                             // card catching the light and starts reading as a
                             // page that is broken.

export function initDetail(opts = {}) {
  const dialog = document.getElementById('fn-detail');
  const card = dialog && dialog.querySelector('.detail-card');

  /* no dialog, or a browser without showModal: leave the page exactly as it
     was rather than half-arming an interaction */
  if (!dialog || !card || typeof dialog.showModal !== 'function') return;

  const panels = [...dialog.querySelectorAll('.detail-panel')];
  const closeBtn = dialog.querySelector('.detail-close');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const getLenis = typeof opts.lenis === 'function' ? opts.lenis : () => null;

  const byFn = new Map();
  for (const p of panels) byFn.set(p.dataset.fn, p);

  let opener = null;

  /* ── the pointer tilt ───────────────────────────────────────────────────
     Damped in a rAF loop that goes idle the moment it converges, and never
     runs at all under reduced motion. Written as one transform variable pair
     so the card's own entrance animation can hand over cleanly. */

  let rx = 0, ry = 0, rxT = 0, ryT = 0, raf = null, last = 0;

  function tiltTick(now) {
    const dt = Math.min(100, now - (last || now));
    last = now;
    /* frame-rate independent, so a 144Hz screen feels the same as a 60Hz one */
    const a = 1 - Math.pow(1 - 0.18, dt / 16.667);
    rx += (rxT - rx) * a;
    ry += (ryT - ry) * a;

    const done = Math.abs(rxT - rx) < 0.02 && Math.abs(ryT - ry) < 0.02;
    if (done) { rx = rxT; ry = ryT; }

    card.style.setProperty('--rx', rx.toFixed(2) + 'deg');
    card.style.setProperty('--ry', ry.toFixed(2) + 'deg');

    if (done) { raf = null; last = 0; }
    else raf = requestAnimationFrame(tiltTick);
  }
  function kick() {
    if (raf === null) { last = 0; raf = requestAnimationFrame(tiltTick); }
  }

  function onMove(e) {
    if (reduce.matches) return;
    const r = card.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const nx = (e.clientX - r.left) / r.width * 2 - 1;   // -1 .. 1
    const ny = (e.clientY - r.top) / r.height * 2 - 1;
    ryT = Math.max(-1, Math.min(1, nx)) * MAX_TILT;
    rxT = Math.max(-1, Math.min(1, -ny)) * MAX_TILT;
    kick();
  }
  function onLeave() { rxT = 0; ryT = 0; kick(); }

  /* ── open and close ─────────────────────────────────────────────────── */

  function open(fn, trigger) {
    const panel = byFn.get(fn);
    if (!panel) return;

    for (const p of panels) p.hidden = (p !== panel);

    /* name the dialog from the panel it is currently showing, so a screen
       reader announces "MARKETING" rather than an unlabelled dialog. The
       string is the function's own label, already on the allowlist. */
    const label = panel.querySelector('.detail-kicker');
    if (label) dialog.setAttribute('aria-label', label.textContent.trim());

    opener = trigger || null;
    rx = ry = rxT = ryT = 0;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');

    dialog.showModal();
    if (trigger) trigger.setAttribute('aria-expanded', 'true');

    /* Lenis keeps driving the journey underneath a modal otherwise: the wheel
       still reaches it, the scrub still seeks, and closing the card drops the
       reader somewhere they never chose to go. Stop the smooth scroller and
       pin the document too, since showModal() blocks interaction but not
       scrolling. */
    const lenis = getLenis();
    if (lenis && typeof lenis.stop === 'function') lenis.stop();
    document.documentElement.classList.add('detail-open');

    dialog.addEventListener('pointermove', onMove);
    dialog.addEventListener('pointerleave', onLeave);
  }

  function release() {
    dialog.removeEventListener('pointermove', onMove);
    dialog.removeEventListener('pointerleave', onLeave);
    if (raf !== null) { cancelAnimationFrame(raf); raf = null; }

    /* The booking card is a SECOND dialog sharing this exact pin, and the CTA
       inside this card opens it. Whichever of the two closes first must not
       unpin while the other is still on screen, or 1800vh of scroll-driven
       journey starts scrubbing behind an open modal. By the time `close`
       fires, this dialog has already lost its open attribute, so the query
       below only matches a sibling that is genuinely still up. cal.js carries
       the mirror of this check; releasing one scroller without the other is
       worse than releasing neither. */
    const other = document.querySelector('dialog[open]');
    if (!other) {
      document.documentElement.classList.remove('detail-open');
      const lenis = getLenis();
      if (lenis && typeof lenis.start === 'function') lenis.start();
    }

    if (opener) {
      opener.setAttribute('aria-expanded', 'false');
      /* browsers do restore focus on close, but only when the opener is still
         focusable and on screen. These triggers live inside scroll-driven
         bands that may have gone visibility:hidden in the meantime, so put it
         back explicitly and let it fail quietly when it cannot. Skipped while
         another dialog holds the top layer: everything outside it is inert,
         so the call would be a no-op that also fights that card for focus. */
      if (!other) { try { opener.focus({ preventScroll: true }); } catch (_) {} }
      opener = null;
    }
  }

  dialog.addEventListener('close', release);

  /* clicking the veil closes. The dialog element itself only receives the
     click when the pointer missed the card, because the card sits above it. */
  dialog.addEventListener('click', e => {
    if (e.target === dialog) dialog.close();
  });

  if (closeBtn) closeBtn.addEventListener('click', () => dialog.close());

  /* A link inside the card has to close before it acts.

     For an in-page anchor: the handler in app.js drives Lenis, and Lenis is
     stopped while the card is open, so the scroll would be swallowed.

     For the booking CTA and the enquiry CTA: cal.js and form.js both delegate
     off document in the bubble phase, so without this their card opens ON TOP
     of this one. Two modals in the top layer sharing one pin, and the first to
     close unpins the film for both. Closing here first means the other module
     opens into a clean single-modal state, and the release() guard in all
     three files covers the ordering.

     data-form was added 2026-08-16 when the card's own CTA stopped being a
     booking trigger and became an enquiry trigger. It has exactly the problem
     data-cal had, so it gets exactly the same treatment.

     Capture phase is what puts this ahead of all of those listeners. */
  card.addEventListener('click', e => {
    if (e.target.closest('a[href^="#"], [data-cal], [data-form]')) dialog.close();
  }, true);

  /* ── wire every trigger ─────────────────────────────────────────────── */

  const triggers = [...document.querySelectorAll('[data-fn]')].filter(el => el.tagName === 'BUTTON');
  for (const t of triggers) {
    if (!byFn.has(t.dataset.fn)) continue;      // never arm a button with no panel
    t.setAttribute('aria-expanded', 'false');
    t.addEventListener('click', () => open(t.dataset.fn, t));
  }

  /* the affordance is CSS, and it only switches on once the wiring above has
     actually happened */
  document.documentElement.classList.add('detail-ready');
}
