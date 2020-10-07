
module.exports = {
  entry: __dirname + '/src/scripts/app.js',
  output: {
    path: __dirname + '/public/scripts',
    filename: 'bundle.min.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  watch: true
}