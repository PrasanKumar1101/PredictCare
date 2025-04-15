/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Handle missing optional dependencies during build time
    if (isServer) {
      config.externals = [...config.externals, 'mongoose'];
    }
    
    return config;
  },
};

module.exports = nextConfig; 