import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#22C55E",
        accent: "#F59E0B",
        background: "#F9FAFB",
        surface: "#FFFFFF",
        muted: "#6B7280",
        danger: "#EF4444",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        card: "0 4px 12px rgba(0, 0, 0, 0.06)",
        strong: "0 8px 20px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
