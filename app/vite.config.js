import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import watchAndRun from 'vite-plugin-watch-and-run';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		watchAndRun([
			{
				name: 'Graphql Update',
				watch: path.resolve('src/**/*.(gql|graphql|svelte)'),
				run: 'npm run generate',
				delay: 100,
				watchKind: ['ready', 'add', 'change', 'unlink']
			}
		])
	],
	server: {
		fs: {
			allow: ['.']
		}
	},
	optimizeDeps: {
		exclude: ['@urql/svelte']
	}
};

export default config;
