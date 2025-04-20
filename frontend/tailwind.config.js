/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#F5E1DA", // Warm book page beige
          history: "#3E2C41", // Dark Academia
          dystopian: "#1A1A2E",
          romance: "#FADADD",
          fantasy: "#2C2A4A",
          horror: "#000000",
        },
        secondary: {
          main: "#3E2C41", // Elegant dark contrast
          history: "#D1BFA9", // Parchment
          dystopian: "#E94560",
          romance: "#5A3E36",
          fantasy: "#E0AAFF",
          horror: "#D72638",
        },
      },

      fontFamily: {
        primary: {
          main: ["EB Garamond", "serif"],
          history: ["EB Garamond", "serif"],
          dystopian: ["Orbitron", "sans-serif"],
          romance: ["Dancing Script", "cursive"],
          fantasy: ["IM Fell English SC", "serif"],
          horror: ["Nosifer", "cursive"],
        },
        accent: {
          main: ["Cinzel", "serif"],
        },
      },
    },
  },
  plugins: [],
}

