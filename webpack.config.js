const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require('path')
const HWP = require('html-webpack-plugin');
const isDevelopment = process.env.NODE_ENV === "development"

module.exports = {
    entry: path.join(__dirname,'/src/index.js'),
    output: {
        filename: 'build.js',
        path: path.join(__dirname,'/dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.module\.s(a|c)ss$/,
                use: [
                  isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                  {
                    loader: 'css-loader',
                    options: {
                      modules: true,
                      sourceMap: isDevelopment
                    }
                  },
                  {
                    loader: 'sass-loader',
                    options: {
                      sourceMap: isDevelopment
                    }
                  }
                ]
              },
              {
                test: /\.s(a|c)ss$/,
                exclude: /\.module.(s(a|c)ss)$/,
                use: [
                  isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                  'css-loader',
                  {
                    loader: 'sass-loader',
                    options: {
                      sourceMap: isDevelopment
                    }
                  }
                ]
              }
        ]
    },
    plugins: [
        new HWP({template: path.join(__dirname,'/public/index.html'),
    }),
        new MiniCssExtractPlugin({
            filename: isDevelopment ? '[name].css' : '[name].[hash].css',
            chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.scss']
    },
    devServer: {
        historyApiFallback: true,
    },
}