/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '8': '8px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
        '72': '72px',
      },
      borderRadius: {
        'sm': '12px',
        'md': '16px',
        'lg': '24px',
      },
    },
  },
  plugins: [],
}
