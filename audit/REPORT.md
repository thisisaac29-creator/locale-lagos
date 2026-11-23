# Locale Lagos website audit

Audited 19 November 2026 against the local production build at `http://localhost:3101`. Application source was not changed. Verdict: **the core journeys work, but the site needs fixes before launch**, especially dependency updates, mobile performance, navigation accessibility, and unfinished content.

## Scope and evidence

- All six routes: Home, About, Menu, Offers, Gallery, Contact.
- Chrome 157: 320, 360, 390, 768, 1024 and 1440 CSS-pixel widths, 900px viewport height (36 route/viewport combinations). Reduced motion used for the layout matrix; normal motion additionally checked on the homepage at 320, 390 and 1440px.
- axe accessibility scans of every route at 390 and 1440px, plus Lighthouse 13.6.0 with normal motion.
- Firefox and WebKit smoke checks at 390px for Home, Menu, Gallery and Contact. These are engine checks, not physical iPhone/Android certification.
- Production build, TypeScript and ESLint pass. npm dependency audit completed against the registry.
- Feature tests cover mobile navigation, all menu tabs, keyboard tab selection, all gallery filters, lightbox navigation/dismissal/focus return, reservation validation, intercepted WhatsApp handoff, missing-JavaScript behavior and opening-hour calculations.
- Internal links return 200; robots.txt and sitemap.xml return 200; an unknown route correctly returns 404.

Raw evidence: [browser matrix](browser-results.json), [feature tests](feature-results.json), [follow-up tests](followup-results.json), [Lighthouse results](performance-summary.json), [dependency audit](dependency-audit.json). The first empty-form assertion in feature-results.json ran before React committed its update; the follow-up verifies **five field errors and focus on Full name**, so empty-field validation passes.

## Priority findings

### P1 — Dependency security updates are required

The registry reports **6 affected packages: 1 critical, 4 high, 1 moderate**. These are package counts, not six independently demonstrated exploits. Next.js is pinned to 14.2.35; development tooling also contributes findings through eslint-config-next/glob and PostCSS.

Next.js 14.2.35 falls in the affected range for a critical Windows-hosted server vulnerability ([maintainer advisory](https://github.com/vercel/next.js/security/advisories/GHSA-p293-qw3h-jr36)). The local audit server runs on Windows; the production hosting environment was not inspected. Another critical image-optimization advisory is specific to upstream sharp on glibc Linux ([maintainer advisory](https://github.com/vercel/next.js/security/advisories/GHSA-2464-fhr4-w9xw)); sharp is absent locally, so that finding is not proof of local exploitability. No exploit testing was performed.

**Action:** upgrade Next.js and its ESLint configuration to a maintained patched release, resolve the lockfile findings, then repeat build and browser checks. Do not apply a blind major-version `audit fix --force`.

### P1 — Mobile loading and JavaScript responsiveness need work

See the performance table below. All measured mobile routes have elevated blocking time. The homepage's LCP element is the hero paragraph, with substantial element render delay, rather than simply a large image download. Lighthouse identifies first-party script execution and forced layouts. Source inspection shows a global page fade, a timed intro, hero entrance delays, and globally loaded GSAP/Lenis/Framer Motion.

**Action:** render primary text immediately, remove the full-page opacity gate, defer nonessential motion, and load scroll libraries only where needed. Profile the identified chunks before changing libraries. Keep image optimization, then repeat equivalent measurements. Missing optional sharp also produces a production optimization warning; use a patched version if adding it.

Sources: `src/components/layout/PageTransition.tsx:15`, `src/components/layout/Preloader.tsx`, `src/components/home/Hero.tsx:95`, `src/hooks/useSmoothScroll.ts`, and the saved Lighthouse details.

### P1 — Full-screen mobile navigation leaks keyboard focus

Open the menu at 390px and press Escape: it stays open. Tab beyond the navigation links: focus reaches the underlying homepage's View Menu control. The overlay does not manage focus, make the background inert, or lock background scrolling. Route selection does close the menu correctly.

**Action:** implement the overlay as an accessible modal navigation surface with initial focus, contained focus, Escape dismissal, background inertness/scroll locking and focus restoration.

Source: `src/components/layout/Header.tsx:68–120`. Evidence: feature-results.json.

### P1 — Hero headline clips on narrow phones

At 320px the hashtag line needs **338px inside a 280px content box**. `whitespace-nowrap` and the SplitLines overflow wrapper clip “#GlobalMeetsLocal”. The document itself still reports no overflow, demonstrating why a horizontal-scroll test alone misses this defect.

**Action:** lower the minimum display size or allow an intentional small-screen line break; verify 320px and zoom/reflow.

Sources: `src/components/home/Hero.tsx:80–81`, `src/components/motion/SplitLines.tsx:33`. [Screenshot](hero-normal-320.png).

### P1 — Business opening status is wrong on Sunday and Monday

The weekday calculation uses Sunday=0, while openingHours starts with Monday. The actual function returns **closed on Sunday 22 November at 14:00 Lagos time** and **open on Monday 23 November at 14:00**, opposite the displayed schedule.

**Action:** match schedule entries by weekday name or use an explicitly aligned index. Test all seven days and opening/closing boundaries.

Source: `src/lib/time.ts:42`; evidence: followup-results.json.

### P1 — Unfinished menu and media are visible to customers

The About founder/team section also exposes editing instructions (`src/components/about/AboutContent.tsx:320–325`). Drinks and Desserts & Shisha display `[EDIT] Paste ...` instructions instead of menu items. The gallery shows “Video placeholder” and pending-file copy; several images/captions explicitly request replacement photography. The footer exposes an internal image-credit filepath. These are launch-content gaps, not broken image downloads.

**Action:** supply approved content or hide unavailable categories/media. Keep production-facing copy free of editor instructions. Confirm menu prices, offer details and contact information with the business.

Sources: `src/data/menu.ts:112–137`, `src/components/gallery/GalleryGrid.tsx:125`, gallery data and Footer.

### P2 — Reservation validation accepts unusable requests

The form opens a WhatsApp handoff for phone `abc`, date `2020-01-01`, time `03:00`, and 100 guests. Native validation is disabled with `noValidate`; custom validation checks only emptiness and guests below one, ignoring `max={99}` and integer constraints. The valid-input handoff and fallback link work. No message was sent.

**Action:** validate a plausible phone number, integer guest bounds, future dates using Lagos time, and the intended reservation-hours policy. Preserve field-associated errors and focus behavior.

Source: `src/components/contact/ReservationForm.tsx:31–42,115,198–210`.

### P2 — “Download full menu (PDF)” does not download a PDF

The target is `https://linktr.ee/localelagos`, a link hub. This is a mismatch between the CTA promise and its destination; external downstream PDF availability was not verified.

**Action:** link directly to the approved PDF, or rename the CTA to describe the link hub.

Source: `src/data/menu.ts:143`; rendered CTA in `src/components/menu/MenuTabs.tsx:214`.

### P2 — Text contrast and header readability fail in several states

axe measured About page clay labels at **3.84:1** and Offers terracotta labels on sand at **3.99:1**, below the 4.5:1 target for their small text. Normal-motion desktop home copy starts at **1.79:1**, below the 3:1 target for large text. Visual review also shows dark navigation over the hero photograph, with some white hero copy crossing bright areas; those image-background cases need manual contrast sampling.

**Action:** use compliant label colors; maintain legible text throughout animation; give homepage navigation a reliable contrasting surface or color treatment.

Sources: AboutContent, OffersContent, `src/components/home/BrandStatement.tsx:47,88`, Header. [Desktop hero screenshot](hero-normal-1440.png).

### P2 — Horizontal content and wordmark semantics need accessibility fixes

axe reports homepage seating/dish scroll regions without keyboard access and an invalid `aria-label` on the generic Wordmark span across all six pages. The Wordmark's visible letters are also aria-hidden. There is no skip-to-main link.

**Action:** make horizontal regions keyboard-operable with clear controls or focusable labeled regions; expose the wordmark through valid text/semantics; add a skip link targeting main. Verify actual screen-reader output after changes.

Sources: SeatingZones, SignatureDishes, `src/components/ui/Wordmark.tsx:19`, `src/app/layout.tsx`.

### P2 — Page content disappears when JavaScript fails

With JavaScript disabled, the About page's main wrapper remains at opacity zero. The route transition is server-rendered hidden and relies on JavaScript to reveal it. Reveal components also start hidden, despite a comment claiming content survives without JS.

**Action:** keep server-rendered content visible; apply optional animation only after hydration. Verify slow/failed script delivery as well as JavaScript-disabled browsing.

Sources: `src/components/layout/PageTransition.tsx:15`, `src/components/motion/Reveal.tsx`.

### P3 — SEO, resilience and polish gaps

- No canonical link on any of the six routes. Set each canonical to its approved production URL; the configured domain is explicitly marked for launch confirmation.
- Shared social metadata uses placeholder photography and the homepage URL. Add approved imagery and route-appropriate social metadata.
- `/favicon.ico` returns 404 and appears in Lighthouse console failures.
- Local response headers do not include CSP, frame restrictions, or X-Content-Type-Options. Production HTTPS/HSTS/CDN headers were not assessed; check actual deployment before treating this as a production security conclusion.
- Offers repeats the same Private Dining copy and CTA in adjacent sections; consolidate the duplicate for a shorter mobile page. The gallery poster also overlays new labels on labels already baked into its SVG, visibly colliding.
- Maps sometimes appeared partially rendered/blank during screenshots. The iframe geometry is correct (350×262.5px, exactly matching its container). This is not confirmed as a CSS sizing bug; test third-party loading on the live origin and provide a direct directions link/fallback.
- Date-dependent “Happening now” UI is initialized while statically rendering and again on the client. A build-time/current-time mismatch is a source-level hydration risk that needs a boundary-time browser test; ordinary runs did not produce page JavaScript exceptions.

## Features that passed

| Area | Result |
| --- | --- |
| Build / TypeScript / ESLint | Pass |
| Six routes across six widths | HTTP 200; no document-level horizontal overflow; narrow hero clipping reported separately |
| Core page scripts | No uncaught page errors in the layout matrix or cross-engine smoke checks |
| Images | No confirmed broken first-party images after horizontal lazy-load regions were visited; initial offscreen empty currentSrc values were lazy images |
| Menu | All three tabs switch, selected state updates, keyboard End selects last tab |
| Gallery | Six filters return 8/2/3/1/1/1 images; lightbox opens, advances, closes with Escape and restores trigger focus |
| Reservation | Empty submission produces five associated errors and focuses Full name; valid data produces encoded WhatsApp URL and fallback link |
| Navigation | Mobile route selection closes menu; internal route links resolve |
| SEO basics | Unique page titles/descriptions, lang=en, viewport metadata, restaurant JSON-LD, sitemap and robots present |
| Missing URL | Correct HTTP 404 |
| Reduced motion | Content available and motion reduced in tested views; this is not full animation certification |

## Performance results

| Route / profile | Performance /100 | LCP | Blocking time (TBT) | CLS | Accessibility /100 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Home — mobile (median of 3) | 60 | 4.05s | 1226ms | 0 | 96 |
| About — mobile | 64 | 3.44s | 1956ms | 0 | 92 |
| Menu — mobile | 66 | 3.54s | 1233ms | 0 | 96 |
| Offers — mobile (median of 3) | 44 | 5.08s | 5263ms | 0 | 91 |
| Gallery — mobile | 66 | 4.03s | 860ms | 0 | 96 |
| Contact — mobile | 70 | 3.62s | 676ms | 0 | 96 |
| Home — desktop | 92 | 1.20s | 142ms | 0 | 92 |

Homepage repeat range: performance 59–61; LCP 3.98–4.15s; TBT 1,199–1,653ms. Offers repeat range: performance 36–62; LCP 3.87–8.36s; TBT 1,382–13,806ms. Offers remains highly variable: the median is diagnostic, not a precise prediction of user experience. All final runs score SEO 100 and Best Practices 96; those scores do not override the manual findings or dependency scan.


Lighthouse uses simulated mobile conditions: 412×823, 1.75 device scale, 4× CPU slowdown, 150ms RTT and 1,638.4 Kbps throughput. Desktop uses 1440×900, 1× CPU, 40ms RTT and 10,240 Kbps. Browser storage reset remains enabled; the local server/image cache is warm after initial runs. Normal motion enabled. Other host applications were not controlled.

Initial homepage runs 1–3 overlapped browser checks and varied substantially; they are retained as exploratory evidence. The final homepage baseline uses runs 8–10, after functional browser testing finished. Offers uses runs 12–14; other route and desktop values are single-run diagnostics. Scores are not compliance certificates, and **TBT is not INP**. No production field data, real-user INP, hosting latency or CrUX evidence was available. The observed CLS is zero for these navigations, not a guarantee for every interaction.

## Suggested order and remaining validation

1. Resolve dependency advisories, then correct opening status, mobile overlay behavior, clipped headline and unfinished content.
2. Reduce mobile render delays and script cost; improve contrast, form validation, PDF destination and no-JS resilience.
3. Complete canonical/social metadata, favicon, map fallback and production header checks.
4. Repeat affected browser tests and Lighthouse under the same conditions. Check physical devices, zoom, screen readers, deployment headers, real business data, external destinations, and actual WhatsApp delivery with authorized testers.

This audit did not submit bookings, contact the restaurant, deploy changes, or modify application code. It is not a penetration test or an exhaustive screen-reader/physical-device certification. Video playback cannot be tested until actual video files are supplied.
