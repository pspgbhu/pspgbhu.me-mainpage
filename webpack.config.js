const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const cssLoader = {
  test: /\.css$/,
  include: [
    path.resolve(__dirname, "src"),
  ],
  exclude: [
    path.resolve(__dirname, "node_modules"),
  ],
}

const webpackConfig = {
  entry: {
    main: './src/index.js',
  },

  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: process.env.NODE_NEV === 'production'
     ? 'http://static.pspgbhu.me/main' : '',
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

    new HtmlWebpackPlugin({
      template: './index.html',
      inject: true,
    }),
  ],
};



if (process.env.NODE_NEV === 'production') {
  cssLoader.use = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
        'css-loader',
        'postcss-loader',
      ],
    });
  webpackConfig.plugins.push(new ExtractTextPlugin({
    filename: 'css/style.css',
  }));

} else {
  cssLoader.use = ['style-loader', 'css-loader', 'postcss-loader'];
}

webpackConfig.module.rules.push(cssLoader);

module.exports = webpackConfig;
