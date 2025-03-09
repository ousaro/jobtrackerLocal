/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: 'export', // for static site generation , disable for server side rendering
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
