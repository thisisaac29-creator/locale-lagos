# Locale Lagos

Next.js 14 / React / TypeScript restaurant website, with supplied Locale photography, silent films and source menu PDFs.

## Local preview

```sh
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
npm start
```

Production builds use `.next-production` so an open development server cannot overwrite their assets.

A production preview for this task is served at http://localhost:3103. On this Windows host, Node's dependency `realpath` calls require execution outside the filesystem sandbox. Dependencies do not need to be reinstalled when the sandbox incorrectly reports them missing.

## Content and brand evidence

- `docs/media-inventory.md`: all 76 source files, dimensions, durations, page counts and sizes.
- `docs/brand-notes.md`: visual evidence, eight palette tokens, About photograph, five original pattern families and photography limitations.
- `docs/menu-review.md`: source typos, pricing discrepancies and dietary ambiguity requiring client confirmation.
- `src/data/media.ts`: all source photographs, descriptions, categories, duplicates and blur previews.
- `src/data/videos.ts`: eight unique gallery videos; each has MP4, WebM and poster versions.
- `src/data/menu.ts`: 241 entries transcribed from the three PDFs. Shisha remains in Drinks, where the source prints it. Prices may be a number, a printed multi-price string, or null for unpriced flavour options.
- `src/data/site.ts`, `offers.ts`: existing contact details, opening hours and offer terms. These were retained from the scaffold, not independently reconfirmed by the PDFs.

## Assets

Originals are in `public/locale-media/` and must remain unchanged. SHA-256 checks are stored in `audit/brand/inventory.json`. Optimized photographs are organized under `public/images/`; films and posters are under `public/video/`; downloadable source PDFs are under `public/menus/`.

Images have pre-generated WebP variants at requested widths 360, 640, 960 and 1440, capped to original resolution. `src/lib/media-loader.ts` selects a variant for Next Image without a runtime encoder. Below-fold images are lazy-loaded; dimensions and aspect ratios reserve their space. The 12-second hero is silent, muted and looped, with a poster and pause/play control. Mobile and reduced-motion users receive the still poster, with a manual play control. Gallery photographs load in batches of 12; Show more reveals the rest. Gallery films mount near the viewport and use explicit dimensions, controls and preload=none.

Legacy stock placeholder assets in `assets/` and old `public/images/placeholder-*` files are not referenced by the site.

## Design and motion

`src/components/patterns/Patterns.tsx` provides original tile, chevron, weave, ring and short-mark SVG components, each with color, scale and opacity props. Thin bands reveal through a transform-only cover; quiet texture layers move a few pixels with CSS scroll timelines where supported. Native scrolling avoids a global animation loop; desktop cinematic sections load GSAP only when motion is allowed. Reduced motion disables travel and reveals bands immediately. No cultural meaning or named textile origin is inferred.

Colors are defined in `src/app/globals.css`. Each token has a hex form and an RGB channel form so Tailwind opacity utilities work correctly. Fonts are self-hosted Cormorant and DM Sans. `DESIGN.md` records the visual direction.

No confirmed private-room photograph was identifiable; that seating card uses the weave pattern. The selected About image is the shared painting table beneath the geometric mural (`image-04`).

## Reproducibility and verification

`scripts/audit-media.py` produces the inventory/contact sheets and extracts four frames per video. `scripts/process-images.py`, `process-videos.py` and `responsive-images.py` generate web assets from copies/read-only originals. They use the configured Python runtime with Pillow/pypdf and system ffmpeg. `scripts/build-menu.py` preserves the audited source transcription; consult the review notes before changing menu content. `scripts/verify-media.py` checks original hashes and confirms silent MP4 output and hero size.

`audit/brand/` contains PDF renders, screenshots, browser checks, interaction results, media verification and Lighthouse reports. See `docs/verification.md` for the final measured results and limitations. Earlier reports directly under `audit/` describe the scaffold and are superseded by this pass.
