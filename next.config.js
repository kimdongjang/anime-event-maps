/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const CompressionPlugin = require('compression-webpack-plugin');

const nextConfig = {
  reactStrictMode: true,
  // webpack: (config) => {
  //   // css loader
  //   config.module.rules.push({
  //     test: /\.css$/i,
  //     use: ['style-loader', 'css-loader'],
  //   });
  //   config.plugins.push(new CompressionPlugin());
  //   return config;
  // },
}

module.exports = nextConfig
