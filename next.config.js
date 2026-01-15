/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // 🚀 REQUIRED: Enables static export to generate an 'out' folder
  // This allows you to host for FREE on Cloudflare Pages or Render Static Sites.
  output: 'export',

  images: {
    // ⚠️ REQUIRED: The default Next.js Image Optimization API does not work with 
    // static exports. We must disable it to avoid build errors.
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },

  eslint: {
    // Ignores linting warnings during the build process to prevent deployment failures.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
