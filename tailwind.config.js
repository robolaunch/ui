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

        // dark: {
        //   50: "#f6f6f6",
        //   100: "#e7e7e7",
        //   200: "#d1d1d1",
        //   300: "#b0b0b0",
        //   400: "#888888",
        //   500: "#6d6d6d",
        //   600: "#5d5d5d",
        //   700: "#4f4f4f",
        //   800: "#454545",
        //   900: "#3d3d3d",
        //   950: "#000000",
        // },

        primary: {
          50: "#F4E4FF",
          100: "#ECCFFF",
          200: "#DCA7FF",
          300: "#CC7EFE",
          400: "#BC56FE",
          500: "#AC2DFE",
          600: "#9301F2",
          700: "#7101BA",
          800: "#4F0182",
          900: "#2D004A",
          950: "#1C002E",
        },

        secondary: {
          50: "#E8F7FE",
          100: "#D4F0FE",
          200: "#ACE2FD",
          300: "#85D4FC",
          400: "#5DC6FB",
          500: "#35B8FA",
          600: "#06A2F1",
          700: "#057DBA",
          800: "#035883",
          900: "#02344D",
          950: "#012131",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
