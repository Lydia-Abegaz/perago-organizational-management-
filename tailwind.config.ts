import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#D4DE95',    // muted, light olive green (header/button)
        'secondary': '#FEFEFA',  // very light cream color (background)
        'accent': '#A38D6C',     // medium brown/tan (titles, button background)
        'light': '#FBFBFB',      // very light off-white (card background)
        'muted': '#8A8A8A',      // darker grey/brown (text)
        'button': '#E0B88A',     // light brown/orange (button background)
        'white': '#FFFFFF',      // white text
        // Semantic color mappings
        'olive': '#D4DE95',      // primary for olive tones
        'beige': '#FCF8ED',      // secondary for beige tones
        'brown': '#A38D6C',      // accent for brown tones
        'gray': '#8A8A8A',       // muted for gray tones
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
