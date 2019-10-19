var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.join(__dirname, 'client'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [{
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            presets: ['es2015', 'react'],
            plugins: ['transform-class-properties']
        }
        },
        {
            test: /\.scss$/,
            loaders: 'style-loader!css-loader!sass-loader'
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [{loader: 'file-loader'}]
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }
        ]
    },
    devServer: {
        historyApiFallback: true
    }
}