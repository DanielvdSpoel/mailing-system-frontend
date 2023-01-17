const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        danger: colors.red,
        primary: colors.indigo,
        success: colors.green,
        warning: colors.yellow,
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    // ...
  ],
};
