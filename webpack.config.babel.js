import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

process.noDeprecation = true

const NODE_ENV = process.env.NODE_ENV == 'development'
const PATHS = {
  source: path.join(__dirname, 'source'),
  build: path.join(__dirname, 'build')
}

export default {
  entry: {
      app: `${PATHS.source}/app.js`,
  },
  output: {
      path: PATHS.build,
      filename: 'js/[name].js',
  },
  module: {
    rules: [{
      test: /\.pug$/,
      loader: 'pug-loader',
      options: {
        pretty: true
      }
    }, {
      enforce: "pre",
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "eslint-loader",
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.styl$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'stylus-loader'],
      }),
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader',
      }),
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]?[hash]'
      }
    }]
  },
  devServer: {
    stats: 'errors-only'
  },
  devtool: (NODE_ENV) ? 'eval' : 'source-map',
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true,
      disable: NODE_ENV
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['app', 'common'],
      template: `${PATHS.source}/index.pug`
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    })
  ]
}
