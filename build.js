// const { copyFile } = require('fs').promises;
// const esbuild = require('esbuild');

// (async () => {
//   // esbuild.build({
//   //   entryPoints: ['src/assets/js/index.js'],
//   //   // bundle: true,
//   //   minify: true,
//   //   // outfile: '11ty/js/index.esm.js',
//   //   platform: 'browser',

//   //   chunkNames: 'chunks/[name]-[hash]',
//   //   bundle: true,
//   //   outdir: '11ty/js',
//   //   splitting: true,
//   //   format: 'esm',
//   // }).catch(() => process.exit(1));

//   // Copy some pre bundled files
//   // await copyFile('node_modules/@zip.js/zip.js/dist/deflate.js', '11ty/js/deflate.js');
//   // await copyFile('node_modules/@zip.js/zip.js/dist/inflate.js', '11ty/js/inflate.js');
//   // await copyFile('node_modules/@zip.js/zip.js/dist/z-worker.js', '11ty/js/z-worker.js');
// })();

const {
  readdir, readFile, writeFile, unlink,
} = require('fs').promises;
const { resolve } = require('path');
const { minify } = require('terser');
const rimraf = require('rimraf');
const rollup = require('rollup');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { terser } = require("rollup-plugin-terser");
const template = require("rollup-plugin-html-literals");
// const replace = require('@rollup/plugin-replace');

const outputFolder = '11ty/js';

const createMinified = async (file) => {
  const initial = await readFile(resolve(outputFolder, file), { encoding: 'utf8' });
  const mini = await minify(initial.replace('./popper.js', `./popper.min.js?${getCurrentUnixTime}`).replace('./dom.js', `./dom.min.js?${getCurrentUnixTime}`), { sourceMap: false, format: { comments: false } });
  await writeFile(resolve(outputFolder, file), initial.replace('./popper.js', `./popper.js?${getCurrentUnixTime}`).replace('./dom.js', `./dom.js?${getCurrentUnixTime}`), { encoding: 'utf8' });
  await writeFile(resolve(outputFolder, file.replace('.js', '.min.js')), mini.code, { encoding: 'utf8' });
};

const build = async () => {
  // eslint-disable-next-line no-console
  console.log('Building js..');

  const bundle = await rollup.rollup({
    input: 'src/assets/js/index.js',
    plugins: [
      template(),
      nodeResolve(),
      terser()
    ]
  });

  await bundle.write({
    format: 'es',
    sourcemap: false,
    dir: outputFolder,
    chunkFileNames: '[name].[hash].js',
  });

  // closes the bundle
  await bundle.close();
};

(async () => {
  rimraf.sync(resolve(outputFolder));

  try {
    await build('src/assets/js/index.js');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }

  // (await readdir(outputFolder)).forEach((file) => {
  //   tasks.push(createMinified(file));
  // });

})();
