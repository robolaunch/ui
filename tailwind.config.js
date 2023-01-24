/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-mode="dark"]'],
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter, sans-serif"],
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
    colors: {
      white: "#ffffff",
      black: "#000000",
      red: "#FF0000",
      primary: {
        color: "#35B8FA",
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
      secondary: {
        color: "#AC2DFE",
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
      gray: {
        50: "#F0F0F0",
        100: "#E3E3E3",
        200: "#C7C7C7",
        300: "#A8A8A8",
        400: "#8C8C8C",
        500: "#707070",
        600: "#595959",
        700: "#424242",
        800: "#2E2E2E",
        900: "#171717",
      },
    },
  },
  plugins: [require("daisyui")],
};
