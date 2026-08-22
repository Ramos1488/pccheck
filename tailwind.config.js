/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0b0d12",
          soft: "#12151c",
          card: "#171b24",
        },
        accent: {
          DEFAULT: "#7c5cff",
          soft: "#9b82ff",
          glow: "#5eead4",
        },
        good: "#22c55e",
        mid: "#eab308",
        bad: "#ef4444",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(124,92,255,0.45)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pulseSlow: {
          "0%,100%": { opacity: 1 },
          "50%": { opacity: 0.6 },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.5s ease-out both",
        pulseSlow: "pulseSlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
