const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false: '#cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name]-[chunkhash].js'
    },
    resolve: {
        alias: {
            'public': path.resolve(__dirname, '../public'),
            '@': path.resolve(__dirname, '../src'),
            '~src': path.resolve(__dirname, '../src'),
            '~api': path.resolve(__dirname, '../src/api'),
            '~assets': path.resolve(__dirname, '../src/assets'),
            '~components': path.resolve(__dirname, '../src/components'),
            '~mixins': path.resolve(__dirname, '../src/mixins'),
            '~pages': path.resolve(__dirname, '../src/pages'),
            '~store': path.resolve(__dirname, '../src/store'),
        },
        extensions: ['.js', '.vue']
    },
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [
            {
                test: /\.(js|vue)/,
                use: 'eslint-loader',
                enforce: 'pre',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        preserveWhitespace: false,
                        postcss: [
                            require('autoprefixer')({
                                browsers: ['last 3 versions']
                            })
                        ]
                    }
                }
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'img/[name].[hash:7].[ext]'
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'fonts/[name].[hash:7].[ext]'
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader']
            },
            {
                test: /\.json/,
                use: 'json-loader'
            }
        ]
    },
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false
    },
    plugins: isProd ? [
        new VueLoaderPlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: { warnings: false }
        // }),
        new UglifyJsPlugin({
            cache: true,
            sourceMap: true,
            uglifyOptions: {
                compress: { warnings: false }
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({
            filename: 'common.[chunkhash].css'
        })
    ] : [
        new VueLoaderPlugin(),
        new FriendlyErrorsPlugin()
    ]
};