/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        forest: { 50:"#f0fdf4", 100:"#dcfce7", 300:"#86efac", 400:"#4ade80", 500:"#22c55e", 600:"#16a34a", 700:"#15803d", 900:"#14532d" },
        sand: { 50:"#fefce8", 100:"#fef9c3", 200:"#fef08a", 300:"#fde047", 400:"#facc15" },
        earth: { 800:"#292524", 900:"#1c1917", 950:"#0f0e0d" },
      },
    },
  },
  plugins: [],
}
