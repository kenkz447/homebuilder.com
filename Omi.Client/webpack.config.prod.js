const path = require('path');
const keys = require('lodash/keys');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyESPlugin = require('uglify-es-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const pkg = require('./package.json');

module.exports = {
    entry: {
        script: path.join(__dirname, 'src/scripts/index.prod.ts'),
        vendor: keys(pkg.dependencies)
            // font-awesome doesn't have a Javascript component, there's no package to find
            .filter(name => (name != 'font-awesome'))
            .filter(name => (name != 'bootstrap'))
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            '__DEV__': false,
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new BundleAnalyzerPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new UglifyESPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: 'vendor.js',
        }),
        new ExtractTextPlugin('style.css', {
            allChunks: true
        }),
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                        }, {
                            loader: "resolve-url-loader",
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [{
                    loader: 'file-loader?name=fonts/[name].[ext]'
                }]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: 'file-loader?name=images/[name].[ext]'
                }]
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'src', 'scripts'),
            'node_modules'
        ],
        extensions: ['.js', '.ts', '.tsx'],
    }
};