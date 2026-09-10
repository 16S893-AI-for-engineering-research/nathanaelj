export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Sunrise/Sunset solar theme
        'solar': {
          50: '#fffbf0',
          100: '#fff5e0',
          200: '#ffecc7',
          300: '#ffd580',
          400: '#ffb84d',
          500: '#ff9c1a',
          600: '#ff8500',
          700: '#e66a00',
          800: '#cc5500',
          900: '#994400',
        },
        // Warm orange accent
        'flame': {
          50: '#fff7f0',
          100: '#ffe8d9',
          200: '#ffd1b3',
          300: '#ffb38c',
          400: '#ff9966',
          500: '#ff7a3d',
          600: '#ff6633',
          700: '#e64d1a',
          800: '#cc4400',
          900: '#993300',
        },
        // Deep red accent
        'ember': {
          50: '#fff0f0',
          100: '#ffe0d9',
          200: '#ffc2b3',
          300: '#ff9999',
          400: '#ff6666',
          500: '#ff3333',
          600: '#e62e2e',
          700: '#cc2626',
          800: '#b31f1f',
          900: '#991818',
        },
        // Deep atmosphere (dark background)
        'void': {
          50: '#f5f5f0',
          100: '#e8e8e0',
          200: '#d1d1c0',
          300: '#a8a890',
          400: '#807860',
          500: '#5a5240',
          600: '#3d3526',
          700: '#2a231a',
          800: '#1a1410',
          900: '#0d0a06',
        },
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'sans': ['Sora', 'sans-serif'],
        'mono': ['IBM Plex Mono', 'monospace'],
      },
      backgroundImage: {
        'solar-gradient': `linear-gradient(135deg, 
          rgba(13, 10, 6, 1) 0%,
          rgba(26, 20, 16, 0.98) 25%,
          rgba(42, 35, 26, 0.95) 50%,
          rgba(26, 20, 16, 0.98) 75%,
          rgba(13, 10, 6, 1) 100%)`,
      },
      boxShadow: {
        'solar': '0 0 30px rgba(255, 152, 26, 0.3)',
        'solar-sm': '0 0 15px rgba(255, 152, 26, 0.15)',
        'flame': '0 0 25px rgba(255, 102, 51, 0.25)',
        'ember': '0 0 20px rgba(255, 51, 51, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
