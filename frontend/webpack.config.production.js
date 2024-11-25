const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CopyPlugin = require('copy-webpack-plugin');


module.exports = (env, options) => {
    return {
        mode: options.mode,
        entry: "./src/app/app.ts",
        devServer: {
            webSocketServer: false,
            allowedHosts: [
                '.codeai.cloud'
            ],
            host: '127.0.0.1',
            port: 8080,
            historyApiFallback: {
                index: '/',
            },
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                // Disable hashing by setting modules to false 
                                modules: false
                            }
                        },
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                        },
                    ],
                }
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".mjs"],
        },
        output: {
            filename: "js/[name].bundle.js",
            path: path.resolve(__dirname, "./dist"),
            publicPath: "/",
        },
        plugins: [
            new webpack.DefinePlugin({
                '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })'
            }),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: '',
                inject: true,
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: 'src/images',
                        to: 'images',
                    },
                ],
            }),
        ]
    };
};