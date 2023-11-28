/** @type {import('tailwindcss').Config} */

const tvcBlue = "#0099cc";

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
    },
    extend: {
      colors: {
        primary: {
          100: tvcBlue,
        },
      },
      borderColor: {
        primary: {
          100: tvcBlue,
        },
      },
      backgroundColor: {
        primary: {
          100: tvcBlue,
        },
      },
      fontFamily: {
        SohneLight: ["Sohne-Light"],
        SohneBuch: ["Sohne-Buch"],
        SohneKraftig: ["Sohne-Kraftig"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(-100%, 0)" },
        },
      },
      animation: {
        marquee: "marquee linear infinite",
      },
    },
  },
  plugins: [],
};
