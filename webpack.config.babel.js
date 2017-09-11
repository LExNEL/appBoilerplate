import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

process.noDeprecation = true

const PATHS = {
  source: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist')
}

const COMMON = {
  entry: {
    main: `${PATHS.source}/main.js`,
  },
  output: {
    path: PATHS.build,
    publicPath: '/dist/',
    filename: 'build.js',
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
        publicPath: '../',
        fallback: 'style-loader',
        use: ['css-loader', 'stylus-loader'],
      })
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader',
      })
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]?[hash]'
      }
    }]
  }
}

const DEV = {
  devServer: {
    stats: 'errors-only'
  },
  devtool: 'eval',
  plugins: [
    new ExtractTextPlugin({
      disable: true
    })
  ]
}

const PROD = {
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
}

export default (env) => {
  if (env.production)
    return Object.assign(
      {},
      COMMON,
      PROD
    )
  if (env.development)
    return Object.assign(
      {},
      COMMON,
      DEV
    )
}
