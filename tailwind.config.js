/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 'sans' is the default, so this replaces the default font
        sans: ['Inter', 'sans-serif'],
        // Or you can create a custom utility class like 'font-display'
        display: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}

