import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        dark: {
          background: '#0A0A0B',
          'background-secondary': '#111113',
          card: '#18181B',
          'card-hover': '#1F1F23',
          border: '#27272A',
          text: '#F4F4F5',
          'text-secondary': '#A1A1AA',
          input: '#27272A',
          'input-hover': '#323238',
          'input-focus': '#3F3F46',
        },
        gradient: {
          'purple-start': '#8B5CF6',
          'purple-end': '#A78BFA',
          'pink-start': '#EC4899',
          'pink-end': '#F472B6',
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
