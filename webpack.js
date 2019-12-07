const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
    let publicPath
    if (env.NODE_ENV === 'production') {
        publicPath = '/static'
    } else {
        publicPath = '/'
    }

    return {
        entry: {
            app: './src/index.tsx'
        },
        output: {
            filename: '[name]-[hash].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.ts(x)?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                }
            ]
        },
        devServer: {
            port: 5001,
            historyApiFallback: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.template.ejs',
                inject: 'body',
                path: path.resolve(__dirname, './dist'),
                publicPath: '/dist'
            })
        ]
    }
}