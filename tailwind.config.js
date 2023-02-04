/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
      },
      screens: {
        xs: "365px",
      },
    },
  },
  daisyui: {
    themes: [
      "light",
      "dark",
      {
        "m-light": {
          primary: "#56c930",

          secondary: "#86909c",

          accent: "#eaa948",

          neutral: "#312C3A",

          "base-100": "#ffffff",

          "base-200": "#f9fafb",

          "base-300": "#1e293b",
        },
      },
      {
        "m-dark": {
          primary: "#56c930",

          secondary: "#86909c",

          accent: "#eaa948",

          neutral: "#312C3A",

          "base-100": "#262626",

          "base-200": "#1c1917",

          "base-300": "#1c1917",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
