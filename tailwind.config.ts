import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        muted: {
          background: "var(--muted-background)",
        },
      },
    },
  },
  plugins: [],
};
export default config
