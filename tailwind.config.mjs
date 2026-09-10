import tailwind from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultConfig';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // TODO: Add custom theme variables here
      colors: {
        // PRIMARY, SECONDARY, ACCENT colors to be defined
      },
      fontFamily: {
        // TODO: Add custom fonts if needed
      },
    },
  },
  plugins: [],
};
