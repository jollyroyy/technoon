# FAQ — drafted for client approval, NOT on the site

Status: **not shipped.** Nothing in this file appears on technoon.ai or in its
structured data. It goes live only when the client approves the copy.

## Why this exists

Answer engines (ChatGPT Search, Perplexity, Google AI Overviews, Copilot) lift
question-and-answer pairs close to verbatim. A page with real Q&A on it is
several times more likely to be the thing that gets quoted than a page that
says the same things in prose. It is the single largest remaining lever on this
site for AI search visibility.

Two rules make this a client decision rather than a build decision:

1. **The Text law.** Every visible line on this page has to be on the allowlist
   in `CLAUDE.md`, which means client-supplied or storyboard-required. These
   answers are neither yet.
2. **Google's structured-data policy.** `FAQPage` markup whose answers are not
   visible on the page is a policy violation, not a shortcut. So the schema and
   the visible copy ship together or not at all.

## What ships when this is approved

- A visible FAQ section on `site/index.html`, below the process band and above
  the arrival section.
- A matching `FAQPage` node added to the JSON-LD graph already in `<head>`.
- The same Q&A appended to `site/llms.txt`.

## Draft — answers grounded only in what the site already says

Every answer below is built from copy already on the allowlist or from plain
mechanism the site already describes. Nothing here invents a statistic, a
client, a price, a timeline or a guarantee.

**What does technoon.ai do?**
technoon.ai is an AI agency that runs the operational functions of a business.
Rather than handing over a tool, it builds the system a function runs on and
then operates that system: marketing, sales, operations, HR solutions, custom
solutions and customer success, connected as one.

**Which functions can technoon.ai run?**
Six. Marketing, sales, operations, HR solutions, custom solutions and customer
success. Each one covers a named set of offerings, from brand visuals and
campaign engines through account research and outbound sequences to an AI
receptionist, workflow automation and renewal monitoring.

**Do we have to hand over every function at once?**
No. Systems go live one function at a time. The engagement starts with an audit
of what the business already does, and the design step chooses which functions
to run and how they connect.

**How does an engagement start?**
With a free audit. technoon.ai maps what the business actually does today
before proposing anything, and the audit is booked directly through the
calendar on the site.

**Does technoon.ai replace our team?**
No. The stated position is the opposite: the owner stops worrying about the
functions and leads the business instead. technoon.ai operates the systems.

**Will this work with the tools we already use?**
Systems Integration is one of the named offerings under custom solutions, and
process mapping starts by learning how the business already works rather than
by imposing a template.

**What is an AI receptionist?**
An operations offering: every call picked up and every message logged, so no
request arrives outside working hours and disappears.

## Questions technoon.ai CANNOT answer yet

These are the questions AI engines ask most often about an agency, and every
one of them needs a fact only the client has. Do not let anyone, including a
future session, fill these in from plausible-sounding guesses. That is exactly
what the zero-hallucination law exists to stop.

- **What does it cost?** No pricing model is published anywhere. Needed:
  retainer, project, per-function, or "on application".
- **How long until a function is live?** No timeline is published.
- **Where does technoon.ai operate?** No geography, timezone or language
  coverage is published, and `areaServed` is deliberately absent from the
  structured data for that reason.
- **Who is behind it?** No team, founder bio or headcount is published. An
  About or team page is the strongest single trust signal an AI engine can
  cite, and there is currently nothing to cite.
- **Which AI models or platforms are used?** Not published.
- **What happens to our data?** No privacy policy or data handling statement
  exists on the site. For a business that would be operating another company's
  sales and HR functions, this is the most conspicuous gap.

## Recommended order

1. Approve the seven answers above as written, or edit them.
2. Answer pricing and geography, which unlock the two highest-volume questions.
3. Publish a privacy policy. It is a trust signal, a likely legal requirement,
   and the thing a cautious buyer looks for before booking an audit.
