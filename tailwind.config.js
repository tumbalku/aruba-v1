/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
      },
      backgroundImage: {
        "custom-gradient-primary":
          "linear-gradient(to right, rgb(217, 66, 192), rgb(99, 23, 195))",
      },
    },
  },
  daisyui: {
    themes: ["dracula", "light"],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
