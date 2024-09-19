/** @type {import('tailwindcss').Config} */

import { nextui } from "@nextui-org/react";

export default {
  content: [
    './src/ui/**/*.{js,ts,jsx,tsx}',
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {
            DEFAULT: '#EF5C31',
            foreground: '#FAFAFA'
          },
          danger: {
            DEFAULT: "#E11D48"
          },
          secondary: {
            DEFAULT: '#18181b',
          },
        },
      },
    },
  })],
}