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
        saffron: {
          DEFAULT: "#d97706",
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
        maroon: {
          DEFAULT: "#4a0d0d",
          800: "#6b1414",
          900: "#4a0d0d",
          950: "#2d0606",
        },
        parchment: "#FCF8F2",
        gold: "#D4AF37",
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "var(--font-noto-serif-deva)", "serif"],
        sans: ["var(--font-jakarta)", "var(--font-noto-sans-deva)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
