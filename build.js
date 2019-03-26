/**
 * Build it!
 * 
 * Brotli is build in for node >= 11.7.0!!!
 */
const path = require('path');
const webpack = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const commonConfig = {
  mode: "production",
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules')
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: 'src/assets/js/json.json', to: path.resolve(__dirname, 'assets/js/json.json') },
      { from: 'src/assets/css/css.css', to: path.resolve(__dirname, 'assets/css/css.css') },
      { from: 'src/assets/css/opensans-light-webfont.woff2', to: path.resolve(__dirname, 'assets/css/opensans-light-webfont.woff2') },
      { from: 'src/assets/css/opensans-light-webfont.woff', to: path.resolve(__dirname, 'assets/css/opensans-light-webfont.woff') },
    ]),
    // new CompressionPlugin(
    //   {
    //     test: /\.js$/i,
    //     compressionOptions: {
    //        numiterations: 15
    //     },
    //     algorithm(input, compressionOptions, callback) {
    //       return zopfli.gzip(input, compressionOptions, callback);
    //     }
    //   }
    // ),
    // new CompressionPlugin({
    //   filename: '[path].br',
    //   algorithm: 'brotliCompress',
    //   test: /\.js$/i,
    //   compressionOptions: { level: 11 },
    //   threshold: 10240,
    //   minRatio: 0.8,
    //   deleteOriginalAssets: false
    // })
  ]
};

const doThePackaging = (config) => {
  webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log('oops', err)
    }
  });
}

const configEs5 = commonConfig;
configEs5.entry = path.resolve(__dirname, 'src/assets/js/index.js');
configEs5.output = {
  filename: 'index.es5.js',
  path: path.resolve(__dirname, 'assets/js')
};
configEs5.module = {
  rules: [
    {
      test: /\.js$/,
      // exclude: /node_modules/, DO NOT
      loader: "babel-loader",
      options: {
        presets: [
          ['@babel/preset-env',
            {
              targets: {
                ie: "11"
              },
              modules: 'auto',
              useBuiltIns: false,
              forceAllTransforms: true,
            }]
        ],
      }
    }
  ],
};

configEs5.optimization = {
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        test: /\.js(\?.*)?$/i,
        ecma: 5,
        mangle: true,
        sourceMap: false,
        output: {
          comments: false,
        }
      },
    }),
  ],
};

doThePackaging(configEs5);

const configEs6 = commonConfig;
configEs6.entry = path.resolve(__dirname, 'src/assets/js/index.js');
configEs6.output = {
  filename: 'index.es6.js',
  path: path.resolve(__dirname, 'assets/js')
};

configEs6.module = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      options: {
        presets: [
          ['@babel/preset-env',
            {
              targets: {
                chrome: "70"
              },
              modules: 'auto',
            }]
        ],
      }
    }
  ],
};

configEs6.optimization = {
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        test: /\.js(\?.*)?$/i,
        ecma: 6,
        mangle: true,
        sourceMap: false,
        output: {
          comments: false,
        }
      },
    }),
  ],
};

doThePackaging(configEs6);
