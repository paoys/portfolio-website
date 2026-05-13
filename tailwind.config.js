/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        text: {
          primary: '#0a0a0a',
          secondary: '#555555',
          muted: '#888888',
        },
      },
      backgroundColor: {
        'surface-glass': 'rgba(255, 255, 255, 0.72)',
        'dark-surface': '#141414',
        'dark-surface-glass': 'rgba(20, 20, 20, 0.82)',
        'dark-bg': '#080808',
        'dark-subtle': '#111111',
        'dark-muted': '#1a1a1a',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.05)',
        md: '0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.05)',
        lg: '0 12px 40px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        sm: '8px',
        md: '14px',
        lg: '20px',
      },
      spacing: {
        'section': '120px',
        'section-md': '80px',
        'section-sm': '72px',
      },
      fontSize: {
        'display': 'clamp(44px, 6vw, 76px)',
      },
    },
  },
  plugins: [],
  darkMode: ['class', '[data-theme="dark"]'],
}
