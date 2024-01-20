/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        128: "81vh",
      },
      colors: {
        primary: "#252731",
        secondary: "#2D2E38",
        third: "#313341",
        bluee: "#230D3C",
        perpl: "#0B213B",
        perpeel: "#9C5FAF",
      },
      backgroundImage: {
        synthwave: "url('./src/assets/loginBackground.jpg')",
        purplestars: "url('./src/assets/purpleBackground.jpg')",
        artbg: "url('./src/assets/drawing.jpg')",
      },
    },
  },
  plugins: [],
};
