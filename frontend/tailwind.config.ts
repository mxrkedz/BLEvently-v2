import type { Config } from "tailwindcss";
import { nextui as nextuiConfig } from "@nextui-org/react";
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      textColor: {
        skin: {
          base: "var(--color-text-base)",
          muted: "var(--color-text-muted)",
          inverted: "var(--color-text-inverted)",
        },
      },
      backgroundColor: {
        skin: {
          "button-base": "var(--color-button-base)",
          "button-base-hover": "var(--color-button-base-hover)",
          "button-accent": "var(--color-button-accent)",
          "button-accent-hover": "var(--color-button-accent-hover)",
          "button-muted": "var(--color-button-muted)",
        },
      },
    },
  },
  plugins: [
    nextuiConfig({
      themes: {
        dark: {
          colors: {
            background: "#0e1116",
            foreground: "#f1f3f9",
          },
        },
      },
      layout: {
        disabledOpacity: "0.3", // opacity-[0.3]
        radius: {
          small: "2px", // rounded-small
          medium: "4px", // rounded-medium
          large: "6px", // rounded-large
        },

        borderWidth: {
          small: "1px", // border-small
          medium: "1px", // border-medium
          large: "2px", // border-large
        },
      },
      defaultTheme: "dark",
    }),
  ],
};
export default config;
