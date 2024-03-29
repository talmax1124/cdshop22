module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "node_modules/preline/dist/*.js"],
  theme: {
    extend: {},
  },
  plugins: ["preline/plugin", "tailwindcss", "autoprefixer", "daisyui"],
};
