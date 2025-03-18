import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#BD45BF",
        darkBlue: "#114BBF",
        mediumBlue: "#168BF2",
        lightBlue: "#139DF2",
        background: "#030826",
      },
    },
  },
  plugins: [],
} satisfies Config;
