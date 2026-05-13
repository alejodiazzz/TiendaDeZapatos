import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        veylo: {
          black: "#000000",
          white: "#FFFFFF",
          beige: "#D8C19A",
          "gray-light": "#EAEAEA",
          "gray-text": "#666666",
        },
      },
      fontFamily: {
        "exo-2": ["var(--font-exo-2)", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
