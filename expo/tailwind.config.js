/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#9b87f5',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#7E69AB',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#6E59A5',
          foreground: '#ffffff',
        },
        background: '#ffffff',
        foreground: '#1A1F2C',
        card: {
          DEFAULT: '#ffffff',
          foreground: '#1A1F2C',
        },
        border: '#E5DEFF',
        muted: {
          DEFAULT: '#F1F0FB',
          foreground: '#8E9196',
        }
      }
    }
  },
  plugins: []
}
