/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // --- Electric Clarity neutrals (auto-switch via CSS vars in global.css) ---
        bg:           'rgb(var(--color-bg) / <alpha-value>)',
        surface:      'rgb(var(--color-surface) / <alpha-value>)',
        'surface-alt':'rgb(var(--color-surface-alt) / <alpha-value>)',
        border:       'rgb(var(--color-border) / <alpha-value>)',
        muted:        'rgb(var(--color-muted) / <alpha-value>)',
        ink:          'rgb(var(--color-ink) / <alpha-value>)',

        // --- Tab accents (auto-switch light → dark) ---
        // Usage: text-finance, bg-finance, bg-finance/10 (wash)
        finance:  'rgb(var(--color-finance) / <alpha-value>)',
        calendar: 'rgb(var(--color-calendar) / <alpha-value>)',
        goals:    'rgb(var(--color-goals) / <alpha-value>)',
        write:    'rgb(var(--color-write) / <alpha-value>)',
        health:   'rgb(var(--color-health) / <alpha-value>)',
        settings: 'rgb(var(--color-settings) / <alpha-value>)',

        // --- Semantic ---
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
        good:   'rgb(var(--color-good) / <alpha-value>)',
      },

      fontFamily: {
        // Load these via expo-font — see src/theme/tokens.ts for font names
        sans:  ['Geist', 'system-ui', 'sans-serif'],
        mono:  ['GeistMono', 'ui-monospace', 'monospace'],
        serif: ['Newsreader', 'Georgia', 'serif'],
      },

      fontSize: {
        // Compact Index type scale (unitless = dp in React Native)
        'xxs':      [10, { lineHeight: 16 }], // caption
        'xs':       [11, { lineHeight: 16 }], // h5, buttons
        'sm':       [13, { lineHeight: 20 }],
        'base':     [14, { lineHeight: 22 }], // body
        'lg':       [15, { lineHeight: 24 }],
        'mono-num': [18, { lineHeight: 18 }], // ledger/weight numerals
        'h4':       [16, { lineHeight: 16 }],
        'h3':       [22, { lineHeight: 22 }],
        'h2':       [30, { lineHeight: 30 }],
        'h1':       [42, { lineHeight: 42 }],
        'display':  [72, { lineHeight: 68 }],
      },

      letterSpacing: {
        // Used as tracking-* utilities; combine with text-* sizes
        tightest: '-0.01em',  // tabular numerals
        tight:    '-0.005em', // body copy
        normal:   '0',
        wide:     '0.06em',   // h1
        wider:    '0.08em',   // h2–h3
        widest:   '0.12em',   // buttons, chips
        ultra:    '0.16em',   // h5, caption, toc
        max:      '0.20em',   // section headings
      },

      borderRadius: {
        // Compact Index = 4 px (sm). Refined = 10 px (md). Expressive = 18 px (lg).
        none: 0,
        sm:   4,
        DEFAULT: 4,
        md:   10,
        lg:   18,
        xl:   24,
        full: 9999,
      },
    },
  },
  plugins: [],
};
