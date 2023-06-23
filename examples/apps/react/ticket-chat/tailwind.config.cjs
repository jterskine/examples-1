const defaultTheme = require("tailwindcss/defaultTheme");
const forms = require("@tailwindcss/forms");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        mono: ["Roboto Mono", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        brand: {
          dark: "#020207",
          gray: "#535353",
          primary: "#FFF7E8",
          secondary: "#FF6771",
          ui: {
            primary: "#603DEB",
            secondary: "#020207",
          },
        },
      },
    },
  },
  plugins: [forms],
};
