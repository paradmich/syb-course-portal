/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Core brand palette (from brilliance-4crqrvqq.manus.space) ──
        blush:  '#F5E8DC',          // main light background
        maroon: '#2D1510',          // primary text on light
        dark:   '#1C0805',          // dark section background
        gold: {
          DEFAULT: '#B8882A',       // buttons, labels, accent lines
          light:   '#D4A84B',       // hover state
          dim:     '#F5EAD8',       // subtle gold tint
          muted:   '#8A6520',       // darker gold for text on light
        },
        parchment: '#E8D0B8',       // text on dark backgrounds
        stone:     '#5C3D35',       // secondary text on light
        border:    '#E0CFC4',       // light borders
        darkborder: 'rgba(184,136,42,0.2)', // gold-tinted borders on dark
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.18em',
      },
      borderRadius: {
        DEFAULT: '2px',   // site uses very square/minimal radius
      },
    },
  },
  plugins: [],
}
