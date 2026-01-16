/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Static export for free hosting
  output: 'export',

  // Prevent routing issues on static hosts
  trailingSlash: true,

  images: {
    // Required for static export
    unoptimized: true,
  },

  eslint: {
    // Prevent build failures due to lint warnings
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
