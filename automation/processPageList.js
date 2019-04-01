const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function getEntries(pageList){
  return pageList.reduce( (acc, page) => { acc[page] = `./src/${page}/${page}.js`; return acc; }, {});
}

function getPages(pageList){
  return pageList.map( page => (
    new HtmlWebpackPlugin({
      inject: false,
      chunks: [page],
      filename: `${page}.html`,
      template: path.join('./src/', page, '/index.html')
    })
  ))
}

module.exports = { getEntries, getPages };
