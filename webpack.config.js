const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const distPath = path.join(__dirname, 'dist');
const srcPath = path.join(__dirname, 'src');

module.exports = {

  entry: [
    './src/js/app.js',
    './src/styles/app.scss',
  ],

  output: {
    path: distPath,
    filename: '[name].js'
  },

  // devtool: 'inline-source-map',

  devServer: {
    contentBase: srcPath,
    watchContentBase: true,
    hot: true,
    inline: true,
    stats: 'errors-only'
  },

  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],

};