/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cyan: "#59bcc1",
        blue: "#00122f",
      },
      fontFamily: {
        sans: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-react-aria-components")],
};
