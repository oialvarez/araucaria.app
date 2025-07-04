import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: [
		vitePreprocess({
			style: {
				postcss: true,
			}
		})
	],
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
		}),
		alias: {
			$lib: 'src/lib',
			$routes: 'src/routes'
		}
	}
};

export default config;
