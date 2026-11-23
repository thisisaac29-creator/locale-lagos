# Verification â€” brand and real-media pass

Production preview: http://localhost:3103. Production output is isolated in `.next-production`; development continues using `.next`.

## Build and source integrity
- `npm run build`: passed, including TypeScript and lint checks.
- `npm run lint`: passed without warnings or errors.
- SHA-256 comparison: all 76 supplied files unchanged (64 photographs, nine videos, three PDFs).
- Nine generated MP4 files checked: no audio streams. Hero MP4: 3,105,919 bytes; WebM: 4,204,459 bytes.
- Complete menu: 76 food + 150 drinks/shisha + 15 dessert/hot-drink entries = 241. Three source PDFs remain downloadable.

## Lighthouse mobile
Local production build, Chrome, Lighthouse default mobile simulated throttling. These are lab snapshots, not field Core Web Vitals. Reports are `audit/brand/lighthouse-{home,menu,gallery}.json`.

| Page | Performance | LCP | Total blocking time | CLS |
|---|---:|---:|---:|---:|
| / | 93 | 1.96 s | 192 ms | 0.0000 |
| /menu | 92 | 3.09 s | 134 ms | 0.0000 |
| /gallery | 90 | 3.48 s | 90 ms | 0.0005 |

All three measured pages meet the 90+ performance target. Gallery has a negligible nonzero shift. LCP on Menu and Gallery remains above 2.5 seconds in this simulated mobile run. Image compression and further JavaScript reduction remain possible improvements.

Initial mobile measurements were Home 46, Menu 61, Gallery 46. Improvements remove global smooth-scroll work, dynamically import desktop cinematic effects, use native scrolling and CSS pattern drift, render page content immediately, prioritize the first gallery photograph, batch gallery photos, and mount gallery videos near the viewport. Mobile hero playback is opt-in; desktop starts the muted film. Reduced-motion users start with the poster.

## Browser and interaction checks
Results and screenshots are saved in `audit/brand/`. Responsive audit covers Home, About, Menu, Gallery, Offers, Contact and custom 404 at 360, 768 and 1440 pixels: 21 checks, zero horizontal overflow, zero broken rendered images, zero JavaScript page errors and zero reported axe violations. Automated accessibility checks cover WCAG 2 A/AA and WCAG 2.1 AA rules supported by axe; this is not a certification or exhaustive manual assistive-technology audit.

The external Google Maps frame is deliberately blocked during automated responsive checks to keep third-party network behavior out of the local audit. The page's frame placement is checked, but the remote map contents are not. Existing hours, contact information and offer terms are retained from the scaffold and require business-owner confirmation separately from this media/menu pass.

### Final interaction results
At 360 and 1440 pixels: all three menu tabs expose the expected 76/150/15 entries and their PDF downloads return HTTP 200. Repeated Show more reveals all 64 usable gallery photographs. Food filtering, lightbox open/next/Escape, and both Drinks video tiles pass. At 360 pixels the full-screen menu works after scrolling, and reduced-motion mode starts with a still poster while retaining manual Play film. Desktop Pause film restores the poster. Results: `audit/brand/interaction-results.json`.

The final two interaction corrections remove header backdrop blur (which confined the fixed mobile menu after scrolling) and retain the manual play button for reduced-motion visitors. Both passed the production build/type/lint checks and interaction retest. The Lighthouse snapshot and 21-route responsive sweep immediately precede these two small corrections; performance was not remeasured after them.
