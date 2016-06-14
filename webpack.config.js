var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/app.js',

  output: {
    path: './dist',
    filename: 'bundle.js'
  },

  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.jsx']
  },

  devServer: {
    contentBase: 'dist'
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.ejs' 
  })]
};
