const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
  },

  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://static.pspgbhu.me/main'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "src"),
        ],
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ],
        loader: "babel-loader",
        options: {
          presets: [
            "es2015",
            "stage-2",
          ],
        },
      },
    ],
  },

  devServer: {
    port: 9000,
  },

  plugins: [
    new UglifyJSPlugin({
      compress: process.env.NODE_NEV === 'production',
    }),

    // new HtmlWebpackPlugin({
    //   template: './index.html',
    //   favicon: './favicon.jpg',
    //   inject: true,
    // }),
  ],
};
