/**
 * 路径工具函数
 * 用于处理GitHub Pages部署时的basePath前缀问题
 */

// 获取basePath配置
const getBasePath = (): string => {
  // 生产环境使用/QUOTE作为basePath，本地开发时不使用
  return process.env.NODE_ENV === 'production' ? '/QUOTE' : ''
}

/**
 * 为图片路径添加basePath前缀
 * @param imagePath 原始图片路径
 * @returns 带有basePath前缀的完整路径
 */
export const getImagePath = (imagePath: string): string => {
  const basePath = getBasePath()
  
  // 如果路径已经包含basePath，直接返回
  if (imagePath.startsWith(basePath)) {
    return imagePath
  }
  
  // 如果是绝对路径（以/开头），添加basePath前缀
  if (imagePath.startsWith('/')) {
    return `${basePath}${imagePath}`
  }
  
  // 如果是相对路径，直接返回
  return imagePath
}

/**
 * 为任意路径添加basePath前缀
 * @param path 原始路径
 * @returns 带有basePath前缀的完整路径
 */
export const getPath = (path: string): string => {
  const basePath = getBasePath()
  
  // 如果路径已经包含basePath，直接返回
  if (path.startsWith(basePath)) {
    return path
  }
  
  // 如果是绝对路径（以/开头），添加basePath前缀
  if (path.startsWith('/')) {
    return `${basePath}${path}`
  }
  
  // 如果是相对路径，直接返回
  return path
}