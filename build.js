const { copyFile } = require('fs').promises;
const esbuild = require('esbuild');

(async () => {
  esbuild.build({
    entryPoints: ['src/assets/js/index.js'],
    bundle: true,
    minify: true,
    outfile: '11ty/js/index.esm.js',
    platform: 'browser',
    // target: [
    //     'es5',
    // ],
    // plugins: [envPlugin],
  }).catch(() => process.exit(1));

  // Copy some pre bundled files
  // await copyFile('node_modules/@zip.js/zip.js/dist/deflate.js', '11ty/js/deflate.js');
  // await copyFile('node_modules/@zip.js/zip.js/dist/inflate.js', '11ty/js/inflate.js');
  // await copyFile('node_modules/@zip.js/zip.js/dist/z-worker.js', '11ty/js/z-worker.js');
})();
