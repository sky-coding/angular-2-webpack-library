const webpack = require('webpack');
const helpers = require('./config/helpers');

// problem with copy-webpack-plugin
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const METADATA = {
  title: 'Angular 2 Webpack Library',
  host: HOST,
  port: PORT,
  ENV: ENV,
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};

module.exports = {

  metadata: METADATA,

  // cache: false, // Cache generated modules and chunks to improve performance for multiple incremental builds. This is enabled by default in watch mode. You can pass false to disable it.
  // debug: true, // Switch loaders to debug mode.
  // devtool: 'cheap-module-source-map',

  entry: './src/index.ts',

  output: {
    path: helpers.root('dist'),
    filename: 'myLibrary.js',
    // sourceMapFilename: '[name].map',
    // chunkFilename: '[id].chunk.js',
    library: 'myLibrary',
    libraryTarget: 'umd',
    // umdNamedDefine: true
  },

  externals: [
    '@angular/core'
  ],

  resolve: {
    extensions: ['', '.ts', '.js', '.json'],
    root: helpers.root('src'),
    modulesDirectories: ['node_modules'],
  },

  module: {

    preLoaders: [
      // {
      //   test: /\.ts$/,
      //   loader: 'string-replace-loader',
      //   query: {
      //     search: '(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import\\((.+)\\)',
      //     replace: '$1.import($3).then(mod => mod.__esModule ? mod.default : mod)',
      //     flags: 'g'
      //   },
      //   include: [helpers.root('src')]
      // }
    ],

    loaders: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader'
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      },

      {
        test: /\.json$/,
        loader: 'json-loader'
      },

      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader']
      },

      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: []
      },

      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file'
      }
    ]

  },

  plugins: [
    new ForkCheckerPlugin(), //Do type checking in a separate process, so webpack don't need to wait.

    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }]),

    new DefinePlugin({
      'ENV': JSON.stringify(METADATA.ENV),
      'process.env': {
        'ENV': JSON.stringify(METADATA.ENV),
        'NODE_ENV': JSON.stringify(METADATA.ENV),
      }
    }),

    // new NamedModulesPlugin(), // Description: Uses file names as module name.
  ],

  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  },

  devServer: {
    port: METADATA.port,
    host: METADATA.host,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    outputPath: helpers.root('dist')
  },

  node: {
    global: 'window',
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }

};
