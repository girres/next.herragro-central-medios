/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'herragro.s3.sa-east-1.amazonaws.com',
      'herragro.detodos.com.co',
      'localhost',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'herragro.s3.sa-east-1.amazonaws.com',
        pathname: '/assets-dev/**',
      },
      {
        protocol: 'https',
        hostname: 'herragro.s3.sa-east-1.amazonaws.com',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'herragro.detodos.com.co',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
