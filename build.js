// import esbuild from 'esbuild';

// (async () => {
//   esbuild.build({
//     entryPoints: ['src/assets/js/index.js'],
//     minify: true,
//     outdir: '11ty/js',
//     platform: 'browser',

//     chunkNames: 'chunks/[name]-[hash]',
//     bundle: true,
//     outdir: '11ty/js',
//     splitting: true,
//     format: 'esm',
//   }).catch(() => process.exit(1));

//   // Copy some pre bundled files
//   // await copyFile('node_modules/@zip.js/zip.js/dist/deflate.js', '11ty/js/deflate.js');
//   // await copyFile('node_modules/@zip.js/zip.js/dist/inflate.js', '11ty/js/inflate.js');
//   // await copyFile('node_modules/@zip.js/zip.js/dist/z-worker.js', '11ty/js/z-worker.js');
// })();

import { resolve } from 'node:path';
import { rimraf } from 'rimraf';
import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import template from 'rollup-plugin-html-literals';

const outputFolder = '11ty/js';

const doit = async () => {
	// eslint-disable-next-line no-console
	console.log('Building js..');

	const bun = await rollup({
		input: 'src/assets/js/index.js',
		plugins: [template(), nodeResolve(), terser()],
	});

	await bun.write({
		format: 'es',
		sourcemap: false,
		dir: outputFolder,
		chunkFileNames: '[name].[hash].js',
	});

	// closes the bundle
	await bun.close();
};

(async () => {
	rimraf.sync(resolve(outputFolder));

	try {
		await doit('src/assets/js/index.js');
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error);
		process.exit(1);
	}
})();
