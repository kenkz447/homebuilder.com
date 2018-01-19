const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    entry: {
        app: './src/scripts/index.prod.ts'
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'dist'),
        filename: 'app.[hash].js'
    },
    plugins: [
        new webpack.DefinePlugin({
            '__DEV__': false,
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        // new BundleAnalyzerPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: ({ resource }) => /node_modules/.test(resource),
            filename: 'vendor.[hash].js',
        }),
        new ExtractTextPlugin({
            filename: '[name].[hash].css',
            allChunks: true
        }),
        new UglifyJsPlugin({
            sourceMap: true
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].[hash].js.map',
            include: /\.js$/,
            exclude: /vendor/g,
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
                            minimize: true,
                            sourceMap: true,
                            // importLoaders: false
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "resolve-url-loader",
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            includePaths: [path.resolve(__dirname, 'src')]
                        }
                    }]
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
                exclude: /fonts/,
                use: [{
                    loader: 'file-loader?name=images/[name].[ext]'
                }]
            }
        ]
    },
    resolve: {
        modules: [
            path.join(__dirname, 'src'),
            path.join(__dirname, 'src', 'scripts'),
            'node_modules'
        ],
        extensions: ['.js', '.ts', '.tsx'],
    }
}