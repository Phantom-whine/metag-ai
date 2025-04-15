/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/routes/**/*.{svelte,js,ts}',
    './src/routes/*.{svelte,js,ts}',
    './src/lib/components/**/*.{svelte,js,ts}', // Add component library
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}