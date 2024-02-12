const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: './src/main/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main-bundle-[hash].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    })
  ]
}
