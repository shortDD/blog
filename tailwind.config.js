/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
      },
      screens: {
        xs: "545px",
      },
      spacing: {
        76: "19rem",
      },
      scale: {
        175: "1.75",
      },
    },
  },
  daisyui: {
    themes: [
      "light",
      "dark",
      {
        "m-light": {
          primary: "#38bdf8",

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
          primary: "#a3a3a3",

          secondary: "#86909c",

          accent: "#eaa948",

          neutral: "#312C3A",

          "base-100": "#1c1917",

          "base-200": "#262626",

          "base-300": "#171717",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
