const { heroui } = require("@heroui/theme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hover: "rgb(from var(--color-hover) r g b / <alpha-value>)",
        bgs: "rgb(from var(--color-bgs) r g b / <alpha-value>)",
        bgp: "rgb(from var(--color-bgp) r g b / <alpha-value>)",
        ts: "rgb(from var(--color-ts) r g b / <alpha-value>)",
        tp: "rgb(from var(--color-tp) r g b / <alpha-value>)",
        p: "rgb(from var(--color-p) r g b / <alpha-value>)",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
