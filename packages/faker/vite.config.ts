import { defineConfig } from 'vite';

export default defineConfig({
	root: __dirname,
	cacheDir: '../../node_modules/.vite/packages/themes',
	build: {
		outDir: 'dist',
		reportCompressedSize: true,
		cssCodeSplit: false,
		cssMinify: 'esbuild',
		minify: 'esbuild',
		lib: {
			entry: 'src/index.ts',
			name: 'themes',
			fileName: 'index',
			formats: ['es'],
		},
		rollupOptions: {
			output: {
				assetFileNames: 'myTheme[extname]',
			},
			// External packages that should not be bundled into your library.
			external: [],
		},
	},
});
