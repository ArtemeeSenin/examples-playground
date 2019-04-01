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
            template: path.join(__dirname, '/src/', page, '/index.html')
        })
    ))
}

var pageList = ['earthquake', 'observable-of'];

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
