const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      letterSpacing: {
        m1: -1
      },
      colors: {
        evaTextDanger: "#f30",
        evaTextWarning: "#fa0",
        evaFillDanger: "#f23",
        borderGlowColorWarning: "rgba(var(--warning-glow-rgb), 0.7)",
        borderGlowColorDanger: "rgba(var(--danger-glow-rgb), 0.7)",
        darkGrayBg: "rgb(15 23 42)",
      },
      backgroundImage: {
        repeatLinearGrad: "repeating-linear-gradient(-45deg, var(--glow-color) calc(-1 * var(--glow-size)), var(--stripe-color) 0, var(--stripe-color), calc(var(--stripe-size) - var(--glow-size) / 2), var(--glow-color) calc(var(--stripe-size) + var(--glow-size) / 2), transparent calc(var(--stripe-size) + var(--glow-size) / 2), transparent calc(2 * var(--stripe-size)), var(--glow-color) calc(2 * var(--stripe-size) - var(--glow-size)))"
      },
      boxShadow: {
        boardedShadowWarning: "inset 0 0 0 1px rgba(var(--warning-glow-rgb), 0.7) 0 0 0 1px rgba(var(--warning-glow-rgb), 0.7)",
        boardedShadowDanger: "inset 0 0 0 1px rgba(var(--danger-glow-rgb), 0.7) 0 0 0 1px rgba(var(--danger-glow-rgb), 0.7)",
        boxShadowDecal: "inset 0 0 1px calc(var(--glow-size) / 2) var(--shade-3)",
        boxShadowTile: "0 0 var(--gutter-d-size) var(--glow-color), 0 0 calc(var(--gutter-d-size) / 2) var(--glow-color)"
      },
      textShadow: {
        warning: "-1px 1px 0 rgba(var(--warning-glow-rgb), .5), 1px -1px 0 rgba(var(--warning-glow-rgb), .5), -1px -1px 0 rgba(var(--warning-glow-rgb), .5), 1px 1px 0 rgba(var(--warning-glow-rgb), .5)",
        danger: "-1px 1px 0 rgba(var(--danger-glow-rgb), .5), 1px -1px 0 rgba(var(--danger-glow-rgb), .5), -1px -1px 0 rgba(var(--danger-glow-rgb), .5), 1px 1px 0 rgba(var(--danger-glow-rgb), .5)",
      }
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}

