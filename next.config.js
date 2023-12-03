/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path')

const nextConfig = {
  reactStrictMode: true,

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
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
