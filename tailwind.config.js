/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'cherry-red': '#ed4c4c',
          'red': '#fe6c60',
          'dark-peach': '#faa09a',
          'light-peach': '#ffd0cd',
        },
      },
    },
    plugins: [require("daisyui")],
  }