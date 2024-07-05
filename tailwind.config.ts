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
        light: {
          background: '#F2F2F2',
          text: '#1e293b',
          primary: '#3b82f6',
          secondary: '#64748b',
          accent: '#fbbf24',
          lighterBackground: '#EEEEEE'
        },
        dark: {
          background: '#0D0D0D',
          text: '#e2e8f0',
          primary: '#60a5fa',
          secondary: '#94a3b8',
          accent: '#fcd34d',
          grayDarkest: '#171717'
        },
        button: {
          primary: '#fbbf24',
          hover: '#f59e0b',
          text: '#1e293b',
        }
      }
    },
  },
  darkMode: 'class',
  plugins: [],
};
export default config;
