const { merge } = require('webpack-merge')
const common = require('./webpack.common.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_module/
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }, {
          loader: 'sass-loader'
        }
        ]
      },
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false
        }
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    writeToDisk: true
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './template.dev.html'
    })
  ]
})
