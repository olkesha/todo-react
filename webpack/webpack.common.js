const path = require('path');
const webpack = require('webpack'); 
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const production = process.env.NODE_ENV === 'production'; 

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.jsx'),
  output: {
    path: path.resolve(__dirname, '..', './dist'),
    filename: production
      ? 'static/scripts/[name].[contenthash].js'
      : 'static/scripts/[name].js',
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(c|sc|sa)ss$/,
        use: [
          production ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]__[hash:base64:5]',
                auto: /\.module\.\w+$/i,
                namedExport: false,
              },
              importLoaders: 2,
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/images/[hash][ext][query]',
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[j]sx?$/,
        use: ['@svgr/webpack', 'url-loader'],
      }, 
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      components: path.resolve(__dirname, '..', './src/components'),
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '..', './public/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'static/styles/[name].[contenthash].css',
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    new ReactRefreshWebpackPlugin(),
  ],
};

//module.exports — это синтаксис экспорта в Node.js