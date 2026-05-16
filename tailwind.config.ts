import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dailux: {
          black:       "#0D0D0D",
          charcoal:    "#1A1A1A",
          gold:        "#D4AF37",
          gunmetal:    "#3A3A3A",
          navy:        "#13243B",
          "steel-blue": "#2D4B6D",
          sand:        "#DCC7A1",
        },
      },
      fontFamily: {
        "exo-2":  ["var(--font-exo)", "sans-serif"],
        "cinzel": ["var(--font-cinzel)", "'Cormorant Garamond'", "'Marcellus'", "serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
