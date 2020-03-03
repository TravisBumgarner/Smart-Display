const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
    let publicPath
    if (env.NODE_ENV === 'production') {
        publicPath = '/dist'
    } else {
        publicPath = '/'
    }

    return {
        entry: {
            app: './src/index.tsx'
        },
        output: {
            filename: 'app.bundle.bundle.js',
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
        }
    }
}