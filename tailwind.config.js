module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        fblue: "#4267B2",
        gred: "#DB4437",
      },
      textColor: {
        ipink: "#E1306C",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
