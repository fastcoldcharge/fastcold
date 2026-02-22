/** @type {import('next').NextConfig} */
const repo = 'fastcold';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
