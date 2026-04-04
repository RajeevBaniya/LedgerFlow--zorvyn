/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        finance: {
          cardBg: "#0B1426",
          surface: "#0F1B2D",
          border: "#2A3A52",
          primary: "#3B82F6",
          hover: "#4A8BF2",
          light: "#F9FAFB",
          secondary: "#9CA3AF",
          muted: "#D1D5DB",
          card: "#F1F5F9",
          success: "#16A34A",
          danger: "#DC2626",
          warning: "#F59E0B"
        }
      }
    }
  },
  plugins: []
}
