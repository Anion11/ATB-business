import path from 'node:path'
import url from 'node:url'
import glob from 'glob'
import webpack from 'webpack'

export default {
  mode: process.env.NODE_ENV,
  entry: glob.sync('./src/{js,pages}/**/*.js', { ignore: ['./src/js/lib/**/*', './src/js/_backend.js', './src/pages/**/*-amp.js'] }).reduce((acc, item) => {
    const path = item.split('.').slice(0, -1).join('.').split('/')
    path.shift()
    path.shift()
    const name = path.join('/')
    acc[name] = item
    return acc
  }, {}),
  output: {
    path: path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), './build'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] }
        }
      }
    ]
  },
  performance: {
    hints: false
  }
}
