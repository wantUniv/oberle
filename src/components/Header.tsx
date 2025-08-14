'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import AmapNavigationButton from './AmapNavigationButton'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showPurchaseDropdown, setShowPurchaseDropdown] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: '产品体系', href: '#products' },
    { name: '核心技术', href: '#technology' },
    { name: '案例库', href: '#cases' },
    { name: '服务支持', href: '#service' },
    { 
      name: '如何购买', 
      href: '#purchase',
      dropdown: [
        { 
          name: '官方淘宝店', 
          href: 'https://shop305110886.taobao.com/',
          icon: '🛒',
          external: true
        },
        { 
          name: '1688批发平台', 
          href: 'https://shizhix.1688.com/page/offerlist.htm',
          icon: '🏪',
          external: true
        }
      ]
    },
    { name: '加盟合作', href: '/franchise' },
    { name: '联系我们', href: '/contact' }
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, external?: boolean) => {
    e.preventDefault()
    
    // 处理外部链接
    if (external) {
      window.open(href, '_blank')
      setIsMobileMenuOpen(false)
      return
    }
    
    // 处理页面路由（加盟合作、联系我们等）
    if (href === '/franchise' || href === '/contact') {
      window.location.href = href
      setIsMobileMenuOpen(false)
      return
    }
    
    // 处理锚点链接
    if (href.startsWith('#')) {
      const targetId = href.substring(1) // 移除 # 符号
      
      // 检查当前是否在首页
      if (window.location.pathname !== '/') {
        // 如果不在首页，先跳转到首页再滚动到对应区域
        window.location.href = `/${href}`
        return
      }
      
      // 在首页时直接滚动到对应区域
      const targetElement = document.getElementById(targetId)
      
      if (targetElement) {
        const headerHeight = 80 // Header 高度
        const targetPosition = targetElement.offsetTop - headerHeight
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })
      }
    }
    
    // 关闭移动端菜单
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 判断是否需要深色背景（非首页或滚动时）
  const needsDarkBackground = pathname !== '/' || isScrolled

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        needsDarkBackground 
          ? 'bg-primary-dark/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => window.location.href = '/'}
          >
            <div className="w-12 h-12 bg-primary-gold rounded-lg flex items-center justify-center">
              <span className="text-primary-dark font-bold text-xl">O</span>
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold">欧伯乐</h1>
              <p className="text-sm text-gray-300">系统门窗</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setShowPurchaseDropdown(true)}
                    onMouseLeave={() => setShowPurchaseDropdown(false)}
                  >
                    <motion.button
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      whileHover={{ 
                        scale: 1.05,
                        color: '#D4AF37'
                      }}
                      className="text-white hover:text-primary-gold transition-colors duration-300 font-medium cursor-pointer flex items-center space-x-1"
                    >
                      <span>{item.name}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.button>
                    
                    <AnimatePresence>
                      {showPurchaseDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                        >
                          {item.dropdown.map((dropdownItem, dropdownIndex) => (
                            <motion.a
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              onClick={(e) => handleNavClick(e, dropdownItem.href, dropdownItem.external)}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: dropdownIndex * 0.05 }}
                              whileHover={{ scale: 1.02, backgroundColor: '#F5F7FA' }}
                              className="flex items-center space-x-3 px-4 py-3 text-primary-dark hover:bg-neutral-gray transition-all duration-300 cursor-pointer"
                            >
                              <span className="text-lg">{dropdownItem.icon}</span>
                              <span className="font-medium">{dropdownItem.name}</span>
                            </motion.a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    whileHover={{ 
                      scale: 1.05,
                      color: '#D4AF37'
                    }}
                    className="text-white hover:text-primary-gold transition-colors duration-300 font-medium cursor-pointer"
                  >
                    {item.name}
                  </motion.a>
                )}
              </div>
            ))}
            {/* 立即报价按钮 */}
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 8px 25px rgba(212, 175, 55, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/quote'}
              className="bg-gradient-to-r from-primary-gold to-yellow-500 hover:from-yellow-500 hover:to-primary-gold text-primary-dark px-6 py-2 rounded-full font-bold transition-all duration-300 cursor-pointer shadow-lg"
            >
              立即报价
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => handleNavClick(e as any, '#contact')}
              className="bg-transparent border-2 border-primary-gold hover:bg-primary-gold hover:text-primary-dark text-primary-gold px-6 py-2 rounded-lg font-semibold transition-all duration-300 cursor-pointer"
            >
              免费咨询
            </motion.button>
            <AmapNavigationButton variant="desktop" />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
              }`}></span>
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
              }`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-primary-dark/95 backdrop-blur-md border-t border-gray-700"
          >
            <div className="container mx-auto px-4 py-4">
              {navItems.map((item, index) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-white py-3 border-b border-gray-700 font-medium"
                      >
                        {item.name}
                      </motion.div>
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        <motion.a
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          onClick={(e) => handleNavClick(e, dropdownItem.href, dropdownItem.external)}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 0.1) + (dropdownIndex * 0.05) + 0.1 }}
                          className="flex items-center space-x-3 text-gray-300 hover:text-primary-gold py-2 pl-4 transition-colors duration-300 cursor-pointer"
                        >
                          <span>{dropdownItem.icon}</span>
                          <span>{dropdownItem.name}</span>
                        </motion.a>
                      ))}
                    </div>
                  ) : (
                    <motion.a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="block text-white hover:text-primary-gold py-3 border-b border-gray-700 last:border-b-0 transition-colors duration-300 cursor-pointer"
                    >
                      {item.name}
                    </motion.a>
                  )}
                </div>
              ))}
              {/* 移动端立即报价按钮 */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                onClick={() => {
                  window.location.href = '/quote'
                  setIsMobileMenuOpen(false)
                }}
                className="w-full mt-4 bg-gradient-to-r from-primary-gold to-yellow-500 text-primary-dark py-3 rounded-full font-bold transition-all duration-300 cursor-pointer shadow-lg"
              >
                立即报价
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 + 0.1 }}
                onClick={(e) => handleNavClick(e as any, '#contact')}
                className="w-full mt-2 bg-transparent border-2 border-primary-gold hover:bg-primary-gold hover:text-primary-dark text-primary-gold py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer"
              >
                免费咨询
              </motion.button>
              
              {/* 高德地图导航按钮 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 + 0.2 }}
                className="mt-4 flex justify-center"
              >
                <AmapNavigationButton variant="mobile" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Header