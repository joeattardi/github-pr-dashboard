var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/js/app.js'
  ],

  output: {
    path: './dist',
    filename: 'bundle.js'
  },

  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.jsx']
  },

  devtool: 'cheap-source-map',

  devServer: {
    contentBase: 'dist'
  },

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        include: [path.resolve(__dirname, 'src')]
      }
    ],

    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.svg$/,
        loader: 'file-loader?name=[name].[ext]&outputPath=images/'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.ejs'
    })
  ]
};
