const {createConfig, defineConstants, env, entryPoint, setOutput, sourceMaps, addPlugins} = require('@webpack-blocks/webpack2');
const babel = require('@webpack-blocks/babel6');
const devServer = require('@webpack-blocks/dev-server2');
const postcss = require('@webpack-blocks/postcss');
const extractText = require('@webpack-blocks/extract-text2');
const sass = require('@webpack-blocks/sass');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AppCachePlugin = require('appcache-webpack-plugin');
const StatsPlugin = require("stats-webpack-plugin");
const webpack = require("webpack");
const excludeFromStats = [
    /node_modules[\\\/]react(-.*)?[\\\/]/,
    /node_modules[\\\/]redux(-.*)?[\\\/]/,
    /node_modules[\\\/]items-store[\\\/]/
];

module.exports = createConfig([
    entryPoint({
        index: './src/index.js'
    }),
    setOutput({
        path: process.cwd() + '/build/web',
        publicPath: '/',
        sourcePrefix: '',
        filename: '[name].[hash].js',
        chunkFilename: 'chunk-[name]-[id].[chunkhash].js'

    }),
    babel({
        cacheDirectory: true,
        presets: [
            'react-app'
        ],
        plugins: [
            'transform-decorators-legacy',
            'syntax-dynamic-import'
        ]
    }),
    postcss([
        autoprefixer({browsers: ['last 2 versions']})
    ]),
    defineConstants({
        'process.env.NODE_ENV': process.env.NODE_ENV
    }),
    env('development', [
        devServer({
            port: process.env.PORT || 3000,
            contentBase: './src',
            stats: {
                excludeFromStats: excludeFromStats,
                colors: true
            }
        })
    ]),
    env('production', [
        addPlugins([
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new AppCachePlugin({
                network: null,
                settings: ['prefer-online'],
                exclude: ['webpack-build-statistics.json']
            }),
            new StatsPlugin('../webpack-build-statistics.json', {chunkModules: true, exclude: excludeFromStats})
        ])
    ]),
    sourceMaps(),
    sass({relative_assets: true, sourceMap: true}),
    extractText('[name].css', 'text/x-sass'),
    addPlugins([
        new HtmlWebpackPlugin({
            filename: 'index.html',
            favicon: './src/favicon.ico',
            chunks: ['common', 'index'],
            template: './src/index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: function(module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: '/' // this is required for PostCSS + SASS/LESS w/sourcemaps
            }
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/) // prevents moment from loading all locales
    ])
]);