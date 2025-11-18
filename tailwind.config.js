module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {},
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "cupcake", "forest", "emerald", "winter"],
  },
}
