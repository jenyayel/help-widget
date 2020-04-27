const path = require('path');
const webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');
const bundleOutputDir = './dist';

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    return [{
        entry: './src/index.ts',
        output: {
            filename: 'widget.js',
            path: path.resolve(bundleOutputDir),
        },
        devServer: {
            contentBase: bundleOutputDir
        },
        plugins: isDevBuild
            ? [new webpack.SourceMapDevToolPlugin(), new copyWebpackPlugin([{ from: 'dev/' }])]
            : [],
        optimization: {
            minimize: !isDevBuild
        },
        mode: isDevBuild ? 'development' : 'production',
        module: {
            rules: [
                // packs SVG's discovered in url() into bundle
                { test: /\.svg/, use: 'svg-url-loader' },
                // allows import CSS as modules
                {
                    test: /\.css$/i,
                    use: [
                        {
                            loader: 'style-loader',
                            options: { injectType: 'singletonStyleTag' }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: '[name]-[local]-[hash:base64:5]'
                                },
                                sourceMap: isDevBuild
                            }
                        }
                    ]
                },
                // use babel-loader for TS and JS modeles,
                // starting v7 Babel babel-loader can transpile TS into JS,
                // so no need for ts-loader
                // note, that in dev we still use tsc for type checking
                {
                    test: /\.(js|ts|tsx|jsx)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    ['@babel/preset-env', {
                                        'targets': {
                                            'browsers': ['IE 11, last 2 versions']
                                        },
                                        // makes usage of @babel/polyfill because of IE11
                                        useBuiltIns: 'usage'
                                    }]
                                ]
                            }
                        }
                    ]
                }]
        },
        resolve: {
            extensions: ['*', '.js']
        }
    }];
};
