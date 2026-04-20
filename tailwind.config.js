/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Libre Franklin', 'sans-serif'],
        'serif': ['"Sometimes Times BETA"', 'Times New Roman', 'serif'],
      },
      animation: {
        'spin-three-times': 'spin 0.6s ease-in 1',
        float: 'float 3s ease-in-out infinite',
        'fade-in-1': 'fadeIn 0.8s ease-out forwards',
        'fade-in-2': 'fadeIn 0.8s ease-out 0.3s forwards',
        'fade-in-3': 'fadeIn 0.8s ease-out 0.6s forwards',
        'fade-in-stat': 'fadeIn 0.5s ease-in forwards 0.5s',
        'fade-in-description': 'fadeIn 0.5s ease-in forwards 1s',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-up-delay-1': 'fadeInUp 0.8s ease-out 0.2s forwards',
        'fade-in-up-delay-2': 'fadeInUp 0.8s ease-out 0.4s forwards',
        'fade-in-up-delay-3': 'fadeInUp 0.8s ease-out 0.6s forwards',
        'slot-machine': 'slot-machine 0.3s ease-out forwards',
        'typewriter': 'typing 3.5s steps(40, end)',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(500deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeInUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        slotMachine: {
          '0%': { transform: 'translate(-50%, -200%)' },
          '100%': { transform: 'translate(-50%, -50%)' }
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' }
        }
      },
      fontFamily: {
        'emoji': [
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Noto Color Emoji',
          'Android Emoji',
          'EmojiSymbols',
          'EmojiOne Mozilla',
          'Twemoji Mozilla',
          'Segoe UI Symbol',
          'sans-serif'
        ],
      },
    },
  },
  plugins: []
}


