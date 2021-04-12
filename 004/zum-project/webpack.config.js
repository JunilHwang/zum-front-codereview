const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: ['@babel/polyfill', './src/main.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname + '/dist'),
        publicPath: 'dist/',
    },
    target: ['es5'],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'fe project',
            template: path.join(__dirname, './index.html'),
            inject: false,
            filename: path.join(__dirname, './dist/index.html'),
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        host: '127.0.0.1',
        contentBase: path.join(__dirname, '/'),
        port: 9000,
    },
};
