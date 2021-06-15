const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MODE = {
    DEBUG: 'development',
    PROD: 'production',
}
const mode = MODE.PROD;

module.exports = {
    entry: {
        index: './src/index.js',
        route: './src/common/Router.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name]_bundle.js"
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript'
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: mode === MODE.DEBUG
                    ? ['style-loader']
                    : [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist']
        }),
    ].concat(mode === MODE.DEBUG ? [] : [new MiniCssExtractPlugin()]),
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    },
    mode: mode,
};