/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBg: "#0F172A",
        headerBg: "#000000",
        cardBg: "#1E293B",
        neonCyan: "#00F2FF",
        electricPurple: "#7000FF",
        descriptionText: "#94A3B8",
      },
    },
  },
  plugins: [],
}