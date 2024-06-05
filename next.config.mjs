/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'rezerve-be-production.up.railway.app',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
