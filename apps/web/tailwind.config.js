/** @type {import('tailwindcss').Config} */

import { nextui } from "@nextui-org/react";

export default {
  content: [
    './src/ui/**/*.{js,ts,jsx,tsx}',
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#FF6200'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in forwards',
        'fade-out': 'fadeOut 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(10px)' },
        },
      },
    },
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
          success: {
            DEFAULT: '#17C964',
          },
          transparent: {
            DEFAULT: '#FAFAFA'
          }
        },
      },
    },
  }), require('@tailwindcss/typography')],
}
