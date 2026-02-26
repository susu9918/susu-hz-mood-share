/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
  // Vercel 不需要 basePath 和 assetPrefix
}

module.exports = nextConfig
