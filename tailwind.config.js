/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        lightGray: "#f2f3f7",
        darkGray: "#6c6a6f",
      },
    },
  },
  plugins: [],
};
