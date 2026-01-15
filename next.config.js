/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Demo Image allow করার জন্য
      },
    ],
  },
};

module.exports = nextConfig;
