const webpack = require('webpack');
const helpers = require('./config/helpers');


const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
// const HtmlElementsPlugin = require('./html-elements-plugin');
// const AssetsPlugin = require('assets-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const autoprefixer = require('autoprefixer');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4200;
const METADATA = {
  host: HOST,
  port: PORT,
  title: 'Demo',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};


module.exports = function(options) {
  return {

    metadata: METADATA,

     //cache: false,

    entry: {
      'main': './demo/main.ts'
    },

    output: {
      path: helpers.root('demo-dist'),
      filename: '[name].bundle.js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[id].chunk.js',
      library: 'ac_[name]',
      libraryTarget: 'var'
    },

    resolve: {
      extensions: ['', '.ts', '.js', '.json'],
      modules: [helpers.root('demo'), 'node_modules']
    },

    module: {

      preLoaders: [
        {
          test: /\.ts$/,
          loader: 'string-replace-loader',
          query: {
            search: '(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import\\((.+)\\)',
            replace: '$1.import($3).then(mod => (mod.__esModule && mod.default) ? mod.default : mod)',
            flags: 'g'
          },
          include: [helpers.root('demo')]
        }
      ],

      loaders: [

        {
          test: /\.ts$/,
          loaders: [
            "ts-loader?{configFileName:'tsconfig.demo.json'}",
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
          loaders: ['to-string-loader', 'css-loader', 'postcss-loader']
        },

        {
          test: /\.scss$/,
          exclude: /node_modules/,
          loaders: ['to-string-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        },

        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [helpers.root('demo/index.html')]
        },

        {
          test: /\.(jpg|png|gif)$/,
          loader: 'file'
        },

        {
          test: /\.(woff2?)(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&mimetype=application/font-woff"
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&mimetype=application/octet-stream"
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: "file"
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&mimetype=image/svg+xml"
        }
      ],

      postLoaders: [
        {
          test: /\.js$/,
          loader: 'string-replace-loader',
          query: {
            search: 'var sourceMappingUrl = extractSourceMappingUrl\\(cssText\\);',
            replace: 'var sourceMappingUrl = "";',
            flags: 'g'
          }
        }
      ]
    },

    sassLoader: {
      includePaths: [
        // helpers.root('demo', 'style'),
        helpers.root('node_modules')
      ]
    },

    postcss: [autoprefixer],

    plugins: [
      // new webpack.ProvidePlugin({
      // }),

      // new AssetsPlugin({
      //   path: helpers.root('dist'),
      //   filename: 'webpack-assets.json',
      //   prettyPrint: true
      // }),

      new ForkCheckerPlugin(),

      // new webpack.optimize.CommonsChunkPlugin({
      //   name: ['polyfills', 'vendor'].reverse()
      // }),

      new ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('demo') // location of your src
      ),

      // new CopyWebpackPlugin([{
      //   from: 'src/assets',
      //   to: 'assets'
      // }], {
      //   ignore: [
      //     'humans.txt',
      //     'robots.txt'
      //   ]
      // }),


      new HtmlWebpackPlugin({
        template: 'demo/index.html',
        chunksSortMode: 'dependency'
      }),

      // new HtmlElementsPlugin({
      //   headTags: require('./head-config.common')
      // }),

      // new DefinePlugin({
      //   'ENV': JSON.stringify(METADATA.ENV),
      //   'HMR': METADATA.HMR,
      //   'process.env': {
      //     'ENV': JSON.stringify(METADATA.ENV),
      //     'NODE_ENV': JSON.stringify(METADATA.ENV),
      //     'HMR': METADATA.HMR,
      //   }
      // }),

      // new NamedModulesPlugin(),

    ],

    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      historyApiFallback: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      },
      outputPath: helpers.root('demo-dist')
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
}
