import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter", sans-serif'],
      },
      colors: {
        "primary-black": "#111111",
        "primary-white": "#FAFAFA",
        "primary-green": "#e0f5b3",
        "primary-pink": "#d9b6ee",
        "primary-alt-green": "#d1fb96",
        "primary-gray": "#efefef",
        "primary-yellow": "#fff3b2",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@butterfail/tailwindcss-inverted-radius"),
  ],
} satisfies Config;
