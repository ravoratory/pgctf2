/** @type {import('next').NextConfig} */
require('dotenv').config()
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: {
      ssr: true,
    },
    removeConsole: {
      exclude: ['error'],
    },
  },
}

module.exports = nextConfig
