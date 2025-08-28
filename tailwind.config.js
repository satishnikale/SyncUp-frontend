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
      screens: {
        sm: "640px", // small devices (mobile landscape / large mobiles)
        md: "768px", // tablets
        lg: "1024px", // laptops
        xl: "1280px", // desktops
        "2xl": "1536px", // large screens / TVs
      },
    },
  },
  plugins: [],
};
