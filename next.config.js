/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  env:{
    POSTGRES_URL: process.env.POSTGRES_URL,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
  }

  // styles 폴더와 같은 공간에 모아두고 싶은 경우에 해제
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },
  // webpack: (config) => {
  //   // css loader
  //   config.module.rules.push(
  //     {
  //       test: /\.css$/i,
  //       use: ['style-loader', 'css-loader', 'postcss-loader'],
  //     },
  //     {
  //       test: /\.(scss|sass)$/i,
  //       include: [path.resolve(__dirname, 'node_modules')],
  //       use: ['css-loader', 'sass-loader'],
  //     }
  //   );
  //   config.plugins.push(new CompressionPlugin());
  //   return config;
  // },
};

module.exports = nextConfig;
