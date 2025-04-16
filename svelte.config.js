import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      routes: {
        include: ['/*'], // Ensure all routes can invoke server-side logic
        exclude: ['<build>', '<prerendered>', '/static/*'] // Exclude build artifacts and static assets
      }
    }),
    prerender: {
      entries: [] // Disable automatic prerendering to prioritize server redirects
    }
  }
};

export default config;