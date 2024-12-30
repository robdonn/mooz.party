import { join } from 'path';
import { type Configuration, DefinePlugin } from 'webpack';
import { merge } from 'webpack-merge';
import 'webpack-dev-server';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';

import 'dotenv/config';

console.log(process.env);

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig: Configuration = {
  name: 'mooz.party',
  entry: {
    main: ['./src/index.tsx'],
  },
  output: {
    filename: 'static/[name].[contenthash].js',
    path: join(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.app.json',
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new DefinePlugin({
      'process.env.MOOZ_APP_VERSION': JSON.stringify(
        process.env.MOOZ_APP_VERSION || '0.0.0'
      ),
    }),
  ],
};

const devConfig: Configuration = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 3000,
    // Serve files from public directory
    static: join(__dirname, 'public'),
  },
};

const prodConfig: Configuration = {
  mode: 'production',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: '.',
          filter: (resourcePath: string) =>
            !resourcePath.endsWith('index.html'),
        },
      ],
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};

export default (
  env: Record<string, string>,
  argv: { mode: 'development' | 'production' }
) => {
  if (argv.mode === 'development') {
    return merge(baseConfig, devConfig);
  }

  return merge(baseConfig, prodConfig);
};
