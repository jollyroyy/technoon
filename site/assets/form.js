/* technoon.ai — the enquiry card.

   The third dialog on this page. Client instruction 2026-08-16 split the CTAs
   in two: "Book free audit of your business" and "Free Audit" open the Cal.com
   calendar, and the three "Build Your Intelligent Business" CTAs open this
   form. A reader who already knows they want a slot and a reader who wants to
   describe a business first are not the same reader, and they were being sent
   to the same place.

   This file is deliberately the same shape as cal.js. Everything load-bearing
   about that module is load-bearing here for the same reason:

   - Native <dialog>. showModal() brings the focus trap, Escape, the top layer
     and the inertness of the page behind it in the platform.

   - Lenis is stopped and the document is pinned TOGETHER, and release() checks
     for a sibling dialog[open] before undoing either. THREE dialogs now share
     one pin. The function card's CTA opens this one, so this one can and does
     appear on top of it, exactly as the booking card can. Whichever closes
     first must not unpin 1800vh of scroll-driven film out from under the one
     still on screen.

   - Every trigger is a real <a href="mailto:info@technoon.ai"> that this
     module intercepts. That ordering IS the fallback: until initForm() runs,
     and if it never runs, the same click still reaches the same inbox. Do not
     turn these into <button>s.

   Imported dynamically by app.js, never statically, for the reason scene.js,
   detail.js and cal.js all are: any layer may fail alone.

   ── THE ENDPOINT ─────────────────────────────────────────────────────────
   A static site has no server, so the form has to post somewhere. Set
   FORM_ENDPOINT to the Formspree or Web3Forms URL and this posts over fetch
   without leaving the page.

   Until then it is an empty string, and submitting composes the same fields
   into a mailto to the same address the triggers already point at. That path
   works today, needs no account and cannot break; it is simply worse, because
   it depends on the reader having a mail client. It is a floor, not a plan.

   Web3Forms additionally wants its access key posted as `access_key`; set
   FORM_ACCESS_KEY and it is added to the payload. Formspree needs no key, so
   leave it empty for that one.

   DEPLOY STEP: after setting FORM_ENDPOINT, add its ORIGIN to the connect-src
   list in the Content-Security-Policy in vercel.json, or the browser will
   block the post and the form will silently fall back to mailto. Both likely
   origins are already listed there and commented. */

const FORM_ENDPOINT = '';       // e.g. 'https://formspree.io/f/xxxxxxxx'
const FORM_ACCESS_KEY = '';     // Web3Forms only; leave empty for Formspree

const MAIL_TO = 'info@technoon.ai';

/* Deliberately loose. A regex is not an email validator and pretending
   otherwise rejects real addresses; this only catches the genuine typo of a
   missing @ or a missing dot, and the endpoint does the real check. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function initForm(opts = {}) {
  const dialog = document.getElementById('enq-form');
  const form = dialog && dialog.querySelector('.enq-form');

  /* no dialog, or a browser without showModal: leave every trigger as the
     plain mailto link it already is rather than half-arming an interaction */
  if (!dialog || !form || typeof dialog.showModal !== 'function') return;

  const closeBtn = dialog.querySelector('.enq-close');
  const errorEl = dialog.querySelector('.enq-error');
  const statusEl = dialog.querySelector('.enq-status');
  const sendBtn = dialog.querySelector('.enq-send');
  const potEl = form.elements['_gotcha'];
  const getLenis = typeof opts.lenis === 'function' ? opts.lenis : () => null;

  let opener = null;
  let sending = false;
  let sent = false;

  /* ── messaging ──────────────────────────────────────────────────────────
     Two elements on purpose. The error is role=alert, which interrupts; the
     status is role=status, which waits its turn. A failed submit is worth
     interrupting for and a successful one is not. Both are toggled with the
     `hidden` attribute rather than a class, so an empty one is out of the
     accessibility tree entirely and cannot be announced as a blank string. */

  function fail(msg) {
    errorEl.textContent = msg;
    errorEl.hidden = false;
    statusEl.hidden = true;
  }
  function say(msg) {
    statusEl.textContent = msg;
    statusEl.hidden = false;
    errorEl.hidden = true;
  }
  function quiet() {
    errorEl.hidden = true;
    statusEl.hidden = true;
  }

  /* ── open and close ─────────────────────────────────────────────────── */

  function open(trigger) {
    opener = trigger || null;

    /* A reader who sent one message and came back to send another gets a clean
       form. A reader who opened, typed half of it and closed by accident gets
       their typing back, which is the more common of the two by a mile. */
    if (sent) {
      sent = false;
      form.reset();
      quiet();
    }

    dialog.showModal();
    if (trigger) trigger.setAttribute('aria-expanded', 'true');

    /* see the note at the top: both scrollers, or neither */
    const lenis = getLenis();
    if (lenis && typeof lenis.stop === 'function') lenis.stop();
    document.documentElement.classList.add('detail-open');

    /* showModal focuses the first focusable thing, which is the Close button.
       Put the caret in the first field instead: this card exists to be typed
       into. preventScroll matters because the dialog sits over a pinned film
       and the browser's own scroll-into-view would fight the pin. */
    const first = form.querySelector('.enq-input');
    if (first) { try { first.focus({ preventScroll: true }); } catch (_) {} }
  }

  function release() {
    /* The booking card and the function card are the OTHER TWO dialogs sharing
       this pin, and the function card's CTA opens this one. By the time
       `close` fires this dialog has already lost its open attribute, so the
       query below only matches a sibling genuinely still on screen. cal.js and
       detail.js carry the mirror of this check. */
    const other = document.querySelector('dialog[open]');
    if (!other) {
      document.documentElement.classList.remove('detail-open');
      const lenis = getLenis();
      if (lenis && typeof lenis.start === 'function') lenis.start();
    }

    if (opener) {
      opener.setAttribute('aria-expanded', 'false');
      /* the triggers live inside scroll-driven bands that may have gone
         visibility:hidden while the card was open, so the browser's own focus
         restore cannot always find them. Skipped while another dialog holds
         the top layer, where everything outside it is inert. */
      if (!other) { try { opener.focus({ preventScroll: true }); } catch (_) {} }
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

  /* ── submit ─────────────────────────────────────────────────────────────
     novalidate is on the form, so this owns validation. The browser's own
     bubbles cannot be styled, position themselves against the viewport rather
     than the dialog, and on this page would render behind the top layer. */

  function payload() {
    const fd = new FormData(form);
    fd.delete('_gotcha');
    if (FORM_ACCESS_KEY) fd.set('access_key', FORM_ACCESS_KEY);
    /* what the site calls itself, so a shared inbox can tell these apart from
       anything else pointed at the same endpoint later */
    fd.set('_subject', 'technoon.ai enquiry');
    return fd;
  }

  function mailtoFallback() {
    const fd = payload();
    const lines = [
      'Name: ' + (fd.get('name') || ''),
      'Email: ' + (fd.get('email') || ''),
      'Company: ' + (fd.get('company') || ''),
      'Function: ' + (fd.get('function') || 'All of it'),
      '',
      String(fd.get('message') || '')
    ];
    const href = 'mailto:' + MAIL_TO +
      '?subject=' + encodeURIComponent('technoon.ai enquiry') +
      '&body=' + encodeURIComponent(lines.join('\n'));

    say('Opening your mail app.');
    sent = true;
    /* assign rather than window.open: a popup blocker eats the second one, and
       a mailto never navigates the page away from itself */
    window.location.href = href;
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (sending) return;

    /* the honeypot. A real person never sees this field and never fills it.
       Report success rather than an error: a bot that is told it failed
       retries, and a bot that is told it worked goes away. */
    if (potEl && potEl.value) {
      say('Thanks. We will be in touch.');
      sent = true;
      return;
    }

    const name = String(form.elements['name'].value || '').trim();
    const email = String(form.elements['email'].value || '').trim();

    if (!name) { fail('Add your name.'); form.elements['name'].focus(); return; }
    if (!EMAIL_RE.test(email)) {
      fail('Check the email address.');
      form.elements['email'].focus();
      return;
    }

    if (!FORM_ENDPOINT) { mailtoFallback(); return; }

    sending = true;
    sendBtn.disabled = true;
    say('Sending.');

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: payload()
      });
      if (!res.ok) throw new Error(String(res.status));
      say('Thanks. We will be in touch.');
      sent = true;
      form.reset();
    } catch (_) {
      /* the endpoint is down, blocked by CSP, or the reader is offline. Say so
         once and hand them the route that does not depend on any of that. */
      fail('That did not send. Write to ' + MAIL_TO + ' instead.');
    } finally {
      sending = false;
      sendBtn.disabled = false;
    }
  });

  /* ── wire every trigger ─────────────────────────────────────────────────
     Delegated, exactly as cal.js does it, so a trigger added later needs no JS
     change: give it data-form and it works. preventDefault is what turns the
     mailto into a modal. */

  document.addEventListener('click', e => {
    const t = e.target.closest && e.target.closest('[data-form]');
    if (!t) return;
    /* let modified clicks through: a reader who cmd-clicks wants the tab */
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    open(t);
  });

  for (const t of document.querySelectorAll('[data-form]')) {
    t.setAttribute('aria-haspopup', 'dialog');
    t.setAttribute('aria-expanded', 'false');
  }

  /* the affordance is CSS and only switches on once the wiring above has
     actually happened, the same contract detail.js and cal.js both have */
  document.documentElement.classList.add('form-ready');
}
