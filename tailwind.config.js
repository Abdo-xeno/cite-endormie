/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: {
          DEFAULT: "#0f2638",
          deep: "#0a1a2a",
          900: "#081521",
          800: "#0f2638",
          700: "#1a3a52",
          600: "#264a63",
        },
        gold: {
          DEFAULT: "#d4af37",
          light: "#e6c860",
          dark: "#a8842a",
          deep: "#806000",
        },
        sacred: {
          DEFAULT: "#385723",
          light: "#7ba05b",
          glow: "#9bc47a",
        },
        blood: "#a01818",
        cream: "#faf6ec",
        parchment: "#f4ead8",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        body: ['"EB Garamond"', "Georgia", "serif"],
        arabic: ['"Amiri"', '"Scheherazade New"', "serif"],
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "25%": { opacity: "0.85", transform: "scale(0.97)" },
          "50%": { opacity: "1", transform: "scale(1.02)" },
          "75%": { opacity: "0.9", transform: "scale(0.98)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
        "scroll-thumb": {
          "0%": { transform: "translateY(-6px)", opacity: "0.3" },
          "50%": { transform: "translateY(6px)", opacity: "1" },
          "100%": { transform: "translateY(-6px)", opacity: "0.3" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drift: {
          "0%": { transform: "translate(0px, 0px)" },
          "50%": { transform: "translate(40px, -30px)" },
          "100%": { transform: "translate(0px, 0px)" },
        },
        "stamp-in": {
          "0%": { opacity: "0", transform: "scale(2.3) rotate(-14deg)" },
          "60%": { opacity: "1", transform: "scale(0.92) rotate(-9deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(-8deg)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "1" },
        },
        "float-y": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-7px)" },
          "40%": { transform: "translateX(7px)" },
          "60%": { transform: "translateX(-5px)" },
          "80%": { transform: "translateX(5px)" },
        },
        sweep: {
          "0%": { transform: "translateX(-120%) skewX(-12deg)" },
          "100%": { transform: "translateX(320%) skewX(-12deg)" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.06)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-7deg)" },
          "50%": { transform: "rotate(7deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%, 100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        flicker: "flicker 3s ease-in-out infinite",
        glow: "glow 4s ease-in-out infinite",
        "scroll-thumb": "scroll-thumb 1.8s ease-in-out infinite",
        "fade-up": "fade-up 0.8s ease-out forwards",
        drift: "drift 18s ease-in-out infinite",
        "stamp-in": "stamp-in 0.6s cubic-bezier(.2,.8,.2,1) forwards",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "float-y": "float-y 6s ease-in-out infinite",
        shake: "shake 0.45s ease-in-out",
        sweep: "sweep 6s ease-in-out infinite",
        breathe: "breathe 5s ease-in-out infinite",
        sway: "sway 7s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s ease-out infinite",
        "spin-slow": "spin 80s linear infinite",
        "spin-slow-rev": "spin 110s linear infinite reverse",
      },
    },
  },
  plugins: [],
};
