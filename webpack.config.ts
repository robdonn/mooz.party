import type { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import 'webpack-dev-server';
import { join } from 'path';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig: Configuration = {
  name: 'mooz.party',
  entry: {
    main: ['./src/index.tsx'],
  },
  output: {
    filename: '[name].[contenthash].js',
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
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],
};

const devConfig: Configuration = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 3000,
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
