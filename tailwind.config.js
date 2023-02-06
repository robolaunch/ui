/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-mode="dark"]'],
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter, sans-serif"],
      },
      colors: {
        secondary: "#35B8FA",
        primary: "#AC2DFE",

        secondaryLayers: {
          50: "#f0f9ff",
          100: "#e0f1fe",
          200: "#b9e4fe",
          300: "#7ccffd",
          400: "#35b8fa",
          500: "#0ca0eb",
          600: "#007fc9",
          700: "#0165a3",
          800: "#065586",
          900: "#0b476f",
        },
        primaryLayers: {
          50: "#fbf4ff",
          100: "#f5e5ff",
          200: "#edd0ff",
          300: "#dfacff",
          400: "#cb77ff",
          500: "#b843ff",
          600: "#ac2dfe",
          700: "#900fe1",
          800: "#7a12b7",
          900: "#641093",
        },
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
