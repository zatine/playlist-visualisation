const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const appTitle = 'Playlist Visualisation';

module.exports = {
  mode: 'none',
  entry: {
    main: './src/js/index.js',
    authorize: './src/js/authorize.js',
    playlist: './src/js/playlist.js',
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].bundle.js',
    clean: true,
  },
  devServer: {
    static: path.join(__dirname, 'build'),
    watchFiles: ['./src'],
  },
  devtool: 'eval-cheap-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: appTitle,
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['main', 'authorize'],
    }),
    new HtmlWebpackPlugin({
      title: appTitle,
      template: './src/playlist.html',
      filename: 'playlist.html',
      chunks: ['main', 'playlist'],
    }),
    new Dotenv(),
  ],
  resolve: {
    fallback: {
      util: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
