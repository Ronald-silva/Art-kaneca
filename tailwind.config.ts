import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#FFB5C5", // Rosa claro da logo
        secondary: "#8B4513", // Marrom do texto da logo
        background: "#FFF5F7", // Rosa bem claro para fundo
        textColor: "#4A2511", // Marrom escuro para texto
        accent: "#FFFFFF", // Branco para contraste
        muted: "#F8E0E6", // Rosa suave para elementos secundários
        highlight: "#D87093", // Rosa mais vibrante para destaques
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        raleway: ["Raleway", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;