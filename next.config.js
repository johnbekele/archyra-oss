/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/components',
        destination: '/gallery/ui',
        permanent: true,
      },
      {
        source: '/components/:path*',
        destination: '/gallery/ui/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
