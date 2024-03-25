import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "delicious-vicious.s3.us-east-1.amazonaws.com",
        port: '',
        pathname: '/**',
      }
    ]
  }
};

export default nextConfig;
