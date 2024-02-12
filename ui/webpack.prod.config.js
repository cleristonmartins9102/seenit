const { merge } = require('webpack-merge')
const common = require('./webpack.common.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'production',
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
          loader: MiniCssExtractPlugin.loader
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
  devtool: 'cheap-module-source-map',
  externals: {
    axios: 'axios',
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './template.prod.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'main-bundle-[hash].css'
    })
    // new FaviconsWebpackPlugin({
    //   logo: './public/static/img/favicon.png',
    //   inject: true
    // })
  ]
})
