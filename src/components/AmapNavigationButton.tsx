'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface AmapNavigationButtonProps {
  variant?: 'desktop' | 'mobile' | 'footer'
  className?: string
}

const AmapNavigationButton = ({ variant = 'desktop', className = '' }: AmapNavigationButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleNavigation = () => {
    setIsLoading(true)
    // 使用提供的高德地图短链接
    window.open('https://surl.amap.com/7HTDx3P1cbIr', '_blank')
    
    // 重置加载状态
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  // 根据不同变体设置样式
  const getButtonStyles = () => {
    switch (variant) {
      case 'mobile':
        return {
          width: '180px',
          height: '50px',
          borderRadius: '40px',
          fontSize: '14px',
          iconSize: '2rem'
        }
      case 'footer':
        return {
          width: '200px',
          height: '55px',
          borderRadius: '45px',
          fontSize: '15px',
          iconSize: '2.2rem'
        }
      default: // desktop
        return {
          width: '220px',
          height: '60px',
          borderRadius: '50px',
          fontSize: '16px',
          iconSize: '2.5rem'
        }
    }
  }

  const styles = getButtonStyles()
  const buttonText = variant === 'mobile' ? '导航到店' : '高德地图导航到店'

  return (
    <motion.button
      onClick={handleNavigation}
      disabled={isLoading}
      whileHover={{ 
        y: -5,
        boxShadow: '0 15px 35px rgba(212, 175, 55, 0.4)'
      }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative overflow-hidden
        bg-gradient-to-r from-primary-dark to-blue-900
        hover:from-blue-900 hover:to-primary-dark
        text-primary-gold font-semibold
        flex items-center justify-center gap-3
        transition-all duration-300
        shadow-lg hover:shadow-xl
        border-2 border-primary-gold/20 hover:border-primary-gold/40
        group
        ${className}
      `}
      style={{
        width: styles.width,
        height: styles.height,
        borderRadius: styles.borderRadius,
        fontSize: styles.fontSize
      }}
    >
      {/* 金色流光动画背景 */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-gold/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      
      {/* 地图标记图标 */}
      <motion.div
        animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: "linear" }}
        style={{ fontSize: styles.iconSize }}
        className="text-primary-gold"
      >
        {isLoading ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        )}
      </motion.div>
      
      {/* 按钮文字 */}
      <span className="relative z-10 font-bold tracking-wide">
        {isLoading ? '导航中...' : buttonText}
      </span>
      
      {/* 右侧箭头图标 */}
      <motion.div
        whileHover={{ x: 3 }}
        className="text-primary-gold"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.div>
    </motion.button>
  )
}

export default AmapNavigationButton