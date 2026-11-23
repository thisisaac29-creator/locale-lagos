import type { Transition, Variants } from 'framer-motion'

export const silk: Transition = { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
export const swift: Transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] }

// Transform-only entrance: content is present from first paint (good for SEO,
// no-JS and reduced motion) and the movement supplies the reveal.
export const fadeUp: Variants = {
  hidden: { y: 24 },
  visible: { y: 0, transition: silk },
}

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: silk },
}

export const stagger = (delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
})

/** Reduced-motion-safe variant: keeps content fully visible, drops travel. */
export const simpleFade: Variants = {
  hidden: {},
  visible: { transition: { duration: 0.2 } },
}
