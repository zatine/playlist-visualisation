const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    path: __dirname + '/build',
    filename: '[name].bundle.js',
    clean: true,
  },
  devServer: {
    static: path.join(__dirname, 'build'),
  },
  devtool: 'eval-cheap-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Playlist Visualisation',
    }),
  ],
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
