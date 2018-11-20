var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.join(__dirname, 'client'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            presets: ['es2015', 'react']
        }
        },
        {
            test: /\.scss$/,
            loaders: 'style-loader!css-loader!sass-loader'
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'file-loader'
                }]
            }]
    }
}