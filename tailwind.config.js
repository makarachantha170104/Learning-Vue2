// tailwind.config.js
module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.vue"],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
