/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./App.jsx"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0D0D12", // Obsidian
        accent: "#C9A84C",  // Champagne
        background: "#FAF8F5", // Ivory
        dark: "#2A2A35",    // Slate
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      }
    },
  },
  plugins: [],
}
