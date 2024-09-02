/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        128: "81vh",
      },
      colors: {
        primary: "#121D31",
        secondary: "#2D2E38",
        third: "#313341",
        bluee: "#230D3C",
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
