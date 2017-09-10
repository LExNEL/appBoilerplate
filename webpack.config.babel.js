import path from 'path'

process.noDeprecation = true

const NODE_ENV = process.env.NODE_ENV == 'development'
const PATHS = {
  source: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist')
}

export default {
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
      use: ['style-loader', 'css-loader', 'stylus-loader'],
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
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
}
