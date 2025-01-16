import type { NextConfig } from "next";

import withTM from 'next-transpile-modules';

const nextConfig:NextConfig = {
  reactStrictMode: true,
  env:{
    POSTGRES_URL: process.env.POSTGRES_URL,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
  },
  images: {
    domains: ['p9xl7rgid2ng8szl.public.blob.vercel-storage.com'],
  },
};

export default withTM(['rc-picker', 'rc-input','rc-table', 'rc-tree', 'rc-util', 'rc-pagination','@ant-design/icons',])(
  nextConfig
);
