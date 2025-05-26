/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html", // already good
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html", // ✅ add this if your index.html is in /public
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
