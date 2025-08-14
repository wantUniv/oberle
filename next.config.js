/** @type {import('next').NextConfig} */
const nextConfig = {
  // 根据部署目标决定配置
  // 当 DEPLOY_TARGET=static 时使用静态导出（GitHub Pages）
  // 当 DEPLOY_TARGET=server 或未设置时使用服务端模式（阿里云ECS）
  ...(process.env.DEPLOY_TARGET === 'static' && {
    output: 'export',
    trailingSlash: true,
    skipTrailingSlashRedirect: true,
    distDir: 'out',
    basePath: '/QUOTE',
    assetPrefix: '/QUOTE/',
  }),
  
  images: {
    // 静态导出时禁用图片优化，服务端运行时启用
    unoptimized: process.env.DEPLOY_TARGET === 'static',
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  poweredByHeader: false,
  compress: true,
  
  // 启用实验性功能以提升性能
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig