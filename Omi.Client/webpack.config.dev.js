const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: [
        `webpack-dev-server/client?http://${process.env.npm_package_config_host}:${process.env.npm_package_config_port}`,
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        './src/scripts/index.dev.ts',
    ],
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            '__DEV__': true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/templates/index.html',
            inject: 'body'
        })
    ],
    module: {
        rules: [{
                test: /\.tsx?$/,
                loaders: ['ts-loader', 'ts-nameof-loader']
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: 'css-loader',
                }, {
                    loader: "resolve-url-loader",
                    options: {
                        silent: true
                    }
                }, {
                    loader: "sass-loader",
                }]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [{
                    loader: 'file-loader?name=[name].[ext]'
                }]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: 'file-loader?name=[name].[ext]'
                }]
            }
        ]
    },
    resolve: {
        modules: [
            path.join(__dirname, 'src', 'scripts'),
            'node_modules'
        ],
        extensions: ['.js', '.ts', '.tsx']
    }
};