// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
      API_URL: 'http://localhost:3000', // Pastikan URL adalah string valid
    },
  };
  
  module.exports = nextConfig;