/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.itch.zone"]
  },
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/:path*", // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
