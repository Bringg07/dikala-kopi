import { withUt } from "uploadthing/tw";
import type { Config } from "tailwindcss";

export default withUt({
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      colors: {
        espresso: "#4E342E",
        cream: "#F8F5F2",
        gold: "#C9A227",
        beige: "#F5F5DC",
        warmWhite: "#FFFAF0",
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(78,52,46,0.08)",
      },
    },
  },
  plugins: [],
} satisfies Config);