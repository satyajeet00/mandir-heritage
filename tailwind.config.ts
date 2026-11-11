import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-noto-serif)", "var(--font-noto-serif-deva)", "serif"],
        sans: ["var(--font-jakarta)", "var(--font-noto-sans-deva)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
