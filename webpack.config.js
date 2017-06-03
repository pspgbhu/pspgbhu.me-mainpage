var path = require('path');

module.exports = {
  entry: {
    main: './src/index.js',
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
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
};
