const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports={

    entry: ['@babel/polyfill','./client/src/main.js','./client/src/scss/style.scss'],

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/bundle.js'
    },

    module:{
        rules:[
            {
                test:/\.js$/,
                include: [
                    path.resolve(__dirname, 'client/src')
                ],
                exclude:/node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env'],
                      plugins: ['@babel/plugin-proposal-class-properties']
                    }
                },
            },
            {
                test:/\.scss$/,
                use:[MiniCssExtractPlugin.loader,'css-loader','sass-loader'],
                exclude: /node_modules/
            },
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({ filename: 'css/style.css' }),
        new HtmlWebpackPlugin({
            template:'./client/public/index.html'
        }),
        new CleanWebpackPlugin(),
    ],

    devtool: 'source-map',
    mode: 'production'
}