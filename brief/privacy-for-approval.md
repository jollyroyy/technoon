# Privacy policy — DRAFTED FOR REVIEW, NOT PUBLISHED

Status: **not shipped.** This file is in `brief/`, not `site/`, so
`outputDirectory: "site"` keeps it off the internet. Nothing here is linked
from the page, in the sitemap, or in the structured data.

## Why it is drafted at all

The site collects a name, an email address, a company name and a free-text
message through the enquiry card. `review/audit-2026-08-16.md` calls the
absence of a policy its headline open item, the 2026-08-19 SEO audit repeats
it, and `brief/faq-for-approval.md` lists "what happens to our data" as the
most conspicuous of the questions technoon.ai cannot currently answer. For a
business proposing to operate another company's sales and HR data, it is also
the thing a cautious buyer looks for before booking.

## Why it is NOT published yet

**Every bracketed item below is a fact only the client has.** A privacy policy
that guesses at them is worse than none: it is a public statement about how
another company's data is handled, and a wrong one is a legal exposure rather
than a missing trust signal. The zero-hallucination law applies to this file
with more force than to anything else in the repo, not less.

It is also legal text. It needs a human read, and ideally a lawyer's, before it
counts as anybody's policy.

## What has to be answered before this can go live

1. **Legal entity name and registered address.** A policy has to say who the
   controller is. Neither is published anywhere today, and `address` is
   deliberately absent from the JSON-LD for that reason.
2. **Jurisdiction.** UK/EU GDPR, India DPDP Act, CCPA and others impose
   different mandatory clauses. This changes the document, not just a line.
3. **Where enquiry data actually goes.** `FORM_ENDPOINT` in
   `site/assets/form.js` is still unset, so today every enquiry composes a
   `mailto:` and lands in the `info@technoon.ai` inbox and nowhere else. The
   moment that endpoint is set to Formspree or Web3Forms, a third-party
   processor is in the chain and has to be named here.
4. **Retention.** How long enquiries are kept.
5. **Sub-processors.** Cal.com already receives a name and an email from
   anyone who books the free audit. Google Fonts receives an IP address on
   every page load. Vercel holds the access logs. Each is disclosable.
6. **Contact route for a data request.** `info@technoon.ai` unless there is a
   dedicated address.

## What is verifiable TODAY, and can be stated without asking anyone

These are facts about the build, checkable in this repository:

- There are no analytics, no tag manager and no advertising pixels. The CSP in
  `vercel.json` would block them: `connect-src` is `'self'` plus the two form
  endpoints, and `script-src` has no `'unsafe-inline'`.
- There are no cookies. The site sets none, and there is no consent banner
  because there is nothing to consent to.
- There is no account, no login and no user-generated content.
- Third parties that receive anything: **Cal.com** (only if a reader opens the
  booking card, which loads `cal.com` in an iframe with no `src` until it is
  opened), **Google Fonts** (an IP address, on every load), and **Vercel**
  (hosting and access logs).
- The enquiry form's honeypot field `_gotcha` is spam handling, not tracking.

## Draft — every [BRACKET] is a blocking question

> **Privacy**
>
> [LEGAL ENTITY] ("technoon.ai", "we") operates https://technoon.ai/. This
> page explains what we collect and what we do with it.
>
> **What we collect.** Only what you type into the enquiry form: your name,
> your email address, your company name, what you want us to run, and anything
> else you choose to add. Nothing on this site is collected automatically for
> our own purposes.
>
> **Why.** To reply to your enquiry and, if you ask for one, to arrange a free
> audit. We do not use it for anything else and we do not sell or share it for
> advertising.
>
> **Cookies and tracking.** This site sets no cookies. There is no analytics,
> no advertising pixel and no tag manager on it.
>
> **Who else sees it.** [HOSTING PROVIDER] hosts the site and keeps standard
> access logs. If you book an audit, the booking is handled by Cal.com and
> they receive the name and email you give them. Loading the page requests two
> typefaces from Google Fonts, which receives your IP address. [IF
> FORM_ENDPOINT IS SET: name the form processor here.]
>
> **How long we keep it.** [RETENTION PERIOD].
>
> **Your rights.** [JURISDICTION-SPECIFIC CLAUSE. Under GDPR this must list
> access, rectification, erasure, restriction, portability, objection, the
> lawful basis relied on, and the right to complain to a supervisory
> authority.]
>
> **Contact.** Write to info@technoon.ai [OR DEDICATED ADDRESS].
>
> **Changes.** We will update this page if what we do changes, and the date
> below will move.
>
> Last updated [DATE].

## What shipping it involves, once the brackets are filled

Small, and none of it touches the film:

1. `site/privacy.html` — a plain document reusing `app.css`. No journey, no
   scrub, no dialogs.
2. A footer link beside `info@technoon.ai`. The footer is the right place: it
   is the one part of the page reachable at every width.
3. A second `<url>` in `site/sitemap.xml`, and its own `<link rel=canonical>`.
4. A `privacyPolicy` property on the `Organization` node in the JSON-LD graph.
5. A line in `site/llms.txt` replacing "No privacy policy is published yet."
6. The footer link is new visible text, so it goes on the Text law allowlist
   in `CLAUDE.md` at the same time.
