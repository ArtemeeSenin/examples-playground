const { getEntries, getPages } = require('./automation/processPageList');

const pageList = ['subject-example', 'earthquake', 'observable-of'];

module.exports = {
  entry: {
    ...getEntries(pageList)
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  devServer: {
    contentBase: ['./dist']
  },
  devtool: "source-map",
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          "presets": ["@babel/preset-env"]
        }
      }
    }]
  },
  plugins: [
    ...getPages(pageList)
  ]
};
