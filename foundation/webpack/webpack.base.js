const path = require('path');
const webpack = require('webpack');

module.exports = (options) => ({
  entry: options.entry,

  // TODO use ... notation
  output: Object.assign({ // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  }, options.output), // Merge with env dependent settings

  module: {
    rules: [{
      test: /\.js$/, // Transform all .js files required somewhere with Babel
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: options.babelOptions,
    }, {
      // Transform our own .css files with PostCSS and CSS-modules
      test: /\.css$/,
      exclude: /node_modules/,
      use: options.cssLoaders,
    }, {
      // Avoid transforming vendor CSS with CSS-modules
      // They should remain in global CSS scope.
      test: /\.css$/,
      include: /node_modules/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /\.png$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      }],
    }, {
      test: /\.svg$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 0,
        },
      }],
    }],
  },

  plugins: options.plugins.concat([
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV) || JSON.stringify('DEVELOPMENT'),
        GRAPHQL_ENDPOINT: process.env.URL,
      },
    }),
  ]),

  resolve: {
    modules: ['app', 'node_modules'],
    extensions: [
      '.js',
    ],
    mainFields: [
      'main',
    ],
  },

  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  stats: false, // Don't show stats in the console
});
