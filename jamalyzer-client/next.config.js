/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.itch.zone"],
  },
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
