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
        tvc: ["tvc"],
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        marquee2: 'marquee2 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [],
};
