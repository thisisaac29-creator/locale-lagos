# Brand observations

## Evidence reviewed
All 64 source images were visually reviewed in six numbered contact sheets, alongside four extracted frames from each of nine videos. Sources are in `public/locale-media/` (not a root-level `locale-media/` directory). File dimensions, sizes, video durations, PDF pages and original SHA-256 hashes are recorded in `audit/brand/inventory.json`; the readable inventory is `docs/media-inventory.md`. Three image pairs and one video pair are byte-identical. The gallery omits duplicate copies and the tiny 150px logo; the higher-resolution logo artwork is retained.

## What is visible
Black-and-cream murals combine angular zigzags, nested rectangles, diamonds, dots, short parallel marks and broad curved lines. Covered courtyard columns carry repeating chevrons. Food photographs show grey/black triangular floor tiles, circular woven placemats and patterned plates. Woven cane/rattan chairs, basket-like pendants and circular woven wall decorations appear in the interior-tour video. Warm wood tables, cream walls and abundant planting recur. Some event photographs show colourful printed clothing and fabric stalls, but they do not establish a particular textile tradition or its meaning. No Adire, Kente, Ankara, Ndebele, mudcloth or Adinkra attribution is claimed. Brick arches are not established by this supplied set; earlier scaffold references were removed.

## Palette
Pillow sampled each image at 120 × 120 and quantized to eight colours. Per-image swatches and pixel counts are in the inventory. Tokens use observed swatches except the two light text surfaces, deliberately lightened from the warm mural/print ground for readability.

| Token | Hex | Evidence / treatment |
|---|---|---|
| cream | #F0E6D7 | Lightened warm mural ground |
| paper | #FAF6EE | Lightened cream for calm text panels |
| sand | #EBD1AE | Dominant warm light/mural ground in image-04 |
| clay | #B8AF9E | Neutral warm stone sampled from image-53 |
| terracotta | #7F4224 | Deep warm wood/food tone sampled from image-53 |
| umber | #423327 | Dark timber sampled from image-15 |
| ink | #121111 | Near-black sampled from image-15 |
| leaf | #455232 | Courtyard planting sampled from image-19 |

## Light and type
Daylight is green and warm in the courtyard, with amber pendant lighting and darker covered seating. Food photography ranges from direct sun to low evening light. The actual wordmark has irregular outlined letters filled with small geometric marks. Menus use a rounded sans, lowercase section headings and uppercase item names; some catering artwork uses a fine italic serif. The site's self-hosted Cormorant + DM Sans pairing is retained as an editorial interpretation, not a claim to use the exact menu font.

## About image
Chosen: `SaveClip.App_503683011_18148377385379653_7228611798110517131_n (1).jpg` (`image-04`, optimized at `/images/about/image-04.webp`). No filename identifies an About image. This photograph joins the strongest evidence in one view: guests painting at a shared table, bold mural work, woven lights and the interior. The duplicate original without `(1)` is image-05. This is not represented as a founder portrait or evidence of brand history.

## Pattern system
Five original repeat geometries in `src/components/patterns/Patterns.tsx`: triangular tile, chevron band, interlaced weave, concentric rings and short mural marks. These simplify the photographed geometry rather than tracing artwork or the logo. Props control colour, scale and opacity. Tile/chevron bands frame section and menu headings; weave is used for private-dining fallback and reservations; marks accent offers, hero text and intro; tile geometry accents the footer; rings appear in the 404. Photograph framing retains the scaffold's arch shape as a layout device, not a claim that architectural arches occur in the photos. Reveals move an opaque cover with scaleX, avoiding animated stroke-dash properties. Reduced motion removes that transition.

## Media limitations
Most photographs and all videos are portrait. Desktop hero footage necessarily uses a central crop; mobile preserves much more of the room. A landscape interior film would improve desktop framing. Many food images have baked-in captions: those are retained, not retouched. The best uncaptioned food frames are used where available. No dedicated private-dining image can be confidently identified, so its card uses a weave treatment. Bar/courtyard images largely document activities, rather than empty architectural views. Useful additions: dedicated private-dining and empty courtyard/bar photos, uncaptioned food originals, a vector/transparent logo, and client-confirmed founder copy. A vertical film is already supplied.

## Video decisions
Eight unique source videos are converted to silent H.264 MP4 and VP9 WebM; all background audio is stripped. Full films are controls-only in the gallery with preload=none and explicit dimensions; their players mount near the viewport. The hero autoplays on desktop only; mobile and reduced-motion users start with its poster and can choose Play film. Video-7 supplies a 12-second hero (3,105,919 bytes MP4). All originals remain untouched. Stills are posters, not new invented photography.

## Photographs inside the PDFs
The Drinks PDF's page 8 contains four clean embedded drink photographs, now extracted into `public/images/drinks/` and mapped in `src/data/media.ts` with page/XObject provenance. They show a creamy jar drink, golden citrus cocktail, blue citrus/pineapple cocktail and creamy biscuit-garnished cocktail. No names are guessed from appearance. Two other embedded objects are screenshots of a social interface and are omitted as standalone gallery images; the complete page remains available in the PDF. These four derived assets do not change the 76-file source inventory. The home teaser uses the blue cocktail photograph.
