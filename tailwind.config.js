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

          secondary: "#d4d4d4",

          accent: "#eaa948",

          neutral: "#1e293b",

          "base-100": "#ffffff",

          "base-200": "#f6f6f7",

          "base-300": "#1e293b",
        },
      },
      {
        "m-dark": {
          primary: "#10b981",

          secondary: "#86909c",

          accent: "#eaa948",

          neutral: "#171717",

          "base-100": "#252529",

          "base-200": "#1e1e20",

          "base-300": "#171717",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
