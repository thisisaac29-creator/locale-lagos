# Gallery placeholder images

Every file in this folder is a **placeholder**. Replace them with Locale's own photography before launch.

| File | Slot | Replace with |
| --- | --- | --- |
| `placeholder-courtyard.svg` | Courtyard | Wide shot of the leafy courtyard, greenery and seating |
| `placeholder-private.svg` | Private Dining | Private dining room set for a group |
| `placeholder-drinks.svg` | Drinks | Signature cocktails on the bar |
| `placeholder-video.svg` | Video tile | Poster frame for `public/videos/tour.mp4` |

Atmosphere photographs used elsewhere on the site also live in `public/images/`:

| File | Used for | Replace with |
| --- | --- | --- |
| `placeholder-indoor.jpg` | Hero / indoor seating | Interior with brick arches and woven pendants |
| `placeholder-dining.jpg` | About / brand story | The dining room at serving time |
| `placeholder-skewers.jpg` | Signature dish | Suya-rubbed pork belly skewers |
| `placeholder-suya.jpg` | About / food story | Lagos street-food reference |
| `placeholder-dining-table.jpg` | Four Ways to Sit | Main indoor dining table detail |
| `placeholder-table-texture.jpg` | Bar / texture | Bar counter detail |
| `placeholder-food-bowl.jpg` | Signature dish | Kimchi fried rice / plantain gnocchi |
| `placeholder-kitchen-dark.jpg` | Texture divider | Kitchen or room texture |
| `placeholder-food-light.jpg` | Signature dish | Pepper soup noodles / pizza |

These photographs are **not** Locale's own. They are openly licensed atmosphere references, used only while real photography is supplied. Credits are listed in `public/images/CREDITS.md` and in the site footer.

## Photo specifications

- WebP preferred, JPG acceptable. 1600px+ wide.
- Interior / courtyard: 3:2 or 16:9. Food and drinks: 4:5.
- Keep files under ~500KB each. `next/image` handles resizing.
- Hero video: `public/videos/hero.mp4` (H.264, muted, 10–15s loop) and `public/videos/tour.mp4` for the gallery tile.
- Update `src/data/site.ts` and `src/data/gallery.ts` if filenames change.
