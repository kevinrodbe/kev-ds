import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
	test: {
		setupFiles: ['tests/setup.ts'],
		environment: 'jsdom',
		coverage: {
			reporter: ['text', 'lcov'],
		},
	},
	resolve: {
		alias: {
			'@lib': resolve(__dirname, 'src/lib'),
		},
	},
});
