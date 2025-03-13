/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: true // For development only
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // For development only
  },
  generateBuildId: async () => 'build',
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
}

module.exports = nextConfig