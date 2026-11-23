import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: 'rgb(var(--color-cream-rgb) / <alpha-value>)',
        paper: 'rgb(var(--color-paper-rgb) / <alpha-value>)',
        sand: 'rgb(var(--color-sand-rgb) / <alpha-value>)',
        clay: 'rgb(var(--color-clay-rgb) / <alpha-value>)',
        terracotta: 'rgb(var(--color-terracotta-rgb) / <alpha-value>)',
        umber: 'rgb(var(--color-umber-rgb) / <alpha-value>)',
        ink: 'rgb(var(--color-ink-rgb) / <alpha-value>)',
        leaf: 'rgb(var(--color-leaf-rgb) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.22em',
        display: '-0.035em',
      },
      maxWidth: {
        frame: '1600px',
      },
      transitionTimingFunction: {
        silky: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'marquee-left': {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
        'shimmer': {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        marquee: 'marquee-left 38s linear infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
