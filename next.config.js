/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
  webpack: (config) => {
    config.ignoreWarnings = [
      {
        module: /node_modules\/@supabase\/realtime-js/,
      },
    ];
    return config;
  },
};

module.exports = nextConfig;
