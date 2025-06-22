import adapter from '@sveltejs/adapter-static'; // Cambia aquí
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',
    }),
    // Aquí puedes agregar otras configuraciones si quieres
  }
};

export default config;
