const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        earthquake: './src/earthquake-locations/earthquake.js',
        observableOf: './src/js-examples/observable-of.js'
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
        new HtmlWebpackPlugin({
            inject: false,
            chunks: ['earthquake'],
            filename: 'earthquake.html',
            template: path.join(__dirname, '/src/earthquake-locations/index.html'),
        }),
        new HtmlWebpackPlugin({
            inject: false,
            chunks: ['observableOf'],
            filename: 'observable-of.html',
            template: path.join(__dirname, '/src/js-examples/index.html'),
        }),
    ]
};