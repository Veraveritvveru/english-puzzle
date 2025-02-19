const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.scss'], // Добавьте .scss
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: './index.html'
      }),
    ],
  mode: 'development',
  devServer: {
    compress: true,
   port: 3000,
   open: true,
 }
};