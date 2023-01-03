/** @type {import('next').NextConfig} */
require('dotenv').config()
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: {
      exclude: ['error', 'info'],
    },
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
