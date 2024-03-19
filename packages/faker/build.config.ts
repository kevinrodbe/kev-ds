import { defineBuildConfig } from 'unbuild';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
export default defineBuildConfig({
	entries: ['src/index'],
	clean: true,
	declaration: true,
	externals: ['dexie'],
	alias: {
		'@lib': resolve(__dirname, 'src/lib'),
		'@typings': resolve(__dirname, 'src/typings'),
	},
	rollup: {
		inlineDependencies: true,
		emitCJS: true,
		esbuild: {
			minify: true,
		},
	},
});
