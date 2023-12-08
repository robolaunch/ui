/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./public/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#35B8FA",
        primary: "#AC2DFE",

        light: {
          50: "#ffffff",
          100: "#efefef",
          200: "#dcdcdc",
          300: "#bdbdbd",
          400: "#989898",
          500: "#7c7c7c",
          600: "#656565",
          700: "#525252",
          800: "#464646",
          900: "#3d3d3d",
          950: "#292929",
        },

        layer: {
          light: {
            bg: "#f4f8fa",
            50: "#ffffff",
            100: "#ebebeb",
            200: "#d6d6d6",
            300: "#c2c2c2",
            400: "#adadad",
            500: "#999999",
            600: "#858585",
            700: "#707070",
            800: "#5c5c5c",
            900: "#474747",
          },

          dark: {
            50: "#b8b8b8",
            100: "#a3a3a3",
            200: "#8f8f8f",
            300: "#7a7a7a",
            400: "#666666",
            500: "#525252",
            600: "#3d3d3d",
            700: "#292929",
            800: "#141414",
            900: "#000000",
          },

          primary: {
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

          secondary: {
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
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
