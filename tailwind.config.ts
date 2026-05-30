import type { Config } from "tailwindcss";

const config: Config = {
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      brand: {
        light: "#ffad33",
        DEFAULT: "#f49200",
      },
    },
  },
  plugins: [],
};

export default config;
