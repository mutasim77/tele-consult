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
          background: '#f8fafc',
          text: '#1e293b',
          primary: '#3b82f6',
          secondary: '#64748b',
          accent: '#fbbf24',
        },
        dark: {
          background: '#1c1c1c',
          text: '#e2e8f0',
          primary: '#60a5fa',
          secondary: '#94a3b8',
          accent: '#fcd34d',
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
