'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface NewsItem {
  id: string
  title: string
  summary: string
  publishDate: string
  category: string
  url: string
}

const IndustryNews = () => {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // 模拟新闻数据（实际项目中应该从API获取）
  const mockNews: NewsItem[] = [
    {
      id: '1',
      title: '2025年门窗行业新国标正式实施',
      summary: '新标准对门窗的节能性能、安全性能提出更高要求，推动行业向高质量发展转型，重点关注传热系数、气密性等关键指标...',
      publishDate: '2025-01-15',
      category: '政策新规',
      url: '#'
    },
    {
      id: '2', 
      title: 'AI定制化门窗成为市场新趋势',
      summary: '人工智能技术在门窗设计和生产中的应用，为消费者提供更个性化的解决方案，智能测量、虚拟设计等技术日趋成熟...',
      publishDate: '2025-01-12',
      category: '技术趋势',
      url: '#'
    },
    {
      id: '3',
      title: '2024年门窗出口增长15.8%创新高',
      summary: '据海关总署数据显示，去年我国门窗产品出口额达到新高，主要出口市场为欧美地区，高端系统门窗产品需求旺盛...',
      publishDate: '2025-01-10',
      category: '市场数据',
      url: '#'
    },
    {
      id: '4',
      title: '新型复合材料在门窗中的应用前景',
      summary: '碳纤维、玻璃纤维等新材料的应用，为门窗产品带来更轻量化和高强度的特性，同时提升了抗腐蚀性和使用寿命...',
      publishDate: '2025-01-08',
      category: '技术趋势',
      url: '#'
    },
    {
      id: '5',
      title: '绿色建筑推动门窗行业转型升级',
      summary: '随着绿色建筑标准的普及，节能环保型门窗产品需求持续增长，市场前景广阔，被动式建筑门窗技术成为发展重点...',
      publishDate: '2025-01-05',
      category: '政策新规',
      url: '#'
    },
    {
      id: '6',
      title: '智能门窗市场规模预计突破千亿',
      summary: '智能化、自动化门窗产品受到消费者青睐，预计未来三年市场规模将快速增长，智能锁、自动开关等功能日益普及...',
      publishDate: '2025-01-03',
      category: '市场数据',
      url: '#'
    },
    {
      id: '7',
      title: '断桥铝合金型材技术再获突破',
      summary: '新一代断桥铝合金型材采用多腔体设计，隔热性能提升30%，同时降低了生产成本，为高性能门窗提供更优质材料基础...',
      publishDate: '2025-01-02',
      category: '材料创新',
      url: '#'
    },
    {
      id: '8',
      title: 'LOW-E玻璃技术迎来重大升级',
      summary: '第四代LOW-E玻璃技术正式投产，透光率提升至85%以上，同时保持优异的隔热性能，为节能门窗提供核心材料支撑...',
      publishDate: '2024-12-28',
      category: '材料创新',
      url: '#'
    },
    {
      id: '9',
      title: '三元乙丙密封胶条新标准发布',
      summary: '新版密封胶条行业标准正式发布，对耐候性、弹性恢复率等关键指标提出更严格要求，推动密封材料质量全面提升...',
      publishDate: '2024-12-25',
      category: '材料创新',
      url: '#'
    },
    {
      id: '10',
      title: '门窗五金配件智能化趋势明显',
      summary: '智能锁具、电动开窗器、智能传感器等五金配件快速发展，为门窗产品增加更多智能化功能，提升用户体验...',
      publishDate: '2024-12-22',
      category: '技术趋势',
      url: '#'
    },
    {
      id: '11',
      title: '被动式建筑门窗标准体系完善',
      summary: '被动式建筑门窗技术标准进一步完善，对超低能耗建筑门窗的性能要求更加明确，推动高性能门窗技术发展...',
      publishDate: '2024-12-20',
      category: '政策新规',
      url: '#'
    },
    {
      id: '12',
      title: '门窗行业数字化转型加速推进',
      summary: '越来越多门窗企业采用数字化生产线，通过工业4.0技术提升生产效率和产品质量，降低人工成本和材料浪费...',
      publishDate: '2024-12-18',
      category: '技术趋势',
      url: '#'
    }
  ]

  useEffect(() => {
    // 模拟API调用
    const fetchNews = async () => {
      setLoading(true)
      try {
        // 实际项目中这里应该调用真实的API
        // const response = await fetch('https://youcaiyun.com/api/news?category=windows_industry')
        // const data = await response.json()
        
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 1000))
        setNews(mockNews)
      } catch (error) {
        console.error('获取新闻失败:', error)
        setNews(mockNews) // 失败时使用模拟数据
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  // 响应式计算每页显示的项目数
  const getItemsPerPage = () => {
    if (windowWidth < 768) return 1 // 移动端显示1个
    if (windowWidth < 1024) return 2 // 平板显示2个
    return 3 // 桌面端显示3个
  }

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      // 重置当前索引以避免超出范围
      setCurrentIndex(0)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    // 自动轮播
    const itemsPerPage = getItemsPerPage()
    if (isAutoPlay && news.length > itemsPerPage) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % Math.ceil(news.length / itemsPerPage))
      }, 4000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [news.length, isAutoPlay])

  const pauseAutoPlay = () => {
    setIsAutoPlay(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const resumeAutoPlay = () => {
    setIsAutoPlay(true)
  }

  const handleNewsClick = (newsItem: NewsItem) => {
    // 跳转到新闻详情页
    window.open(`/news/${newsItem.id}`, '_blank')
  }

  const handleShare = (newsItem: NewsItem, platform: 'wechat' | 'weibo') => {
    const shareUrl = encodeURIComponent(window.location.origin + `/news/${newsItem.id}`)
    const shareTitle = encodeURIComponent(newsItem.title)
    
    if (platform === 'wechat') {
      // 微信分享（实际需要微信SDK）
      console.log('分享到微信:', newsItem.title)
    } else if (platform === 'weibo') {
      // 微博分享
      window.open(`https://service.weibo.com/share/share.php?url=${shareUrl}&title=${shareTitle}`)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '政策新规':
        return 'bg-red-100 text-red-600'
      case '技术趋势':
        return 'bg-blue-100 text-blue-600'
      case '市场数据':
        return 'bg-green-100 text-green-600'
      case '材料创新':
        return 'bg-purple-100 text-purple-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-6">
              门窗行业动态
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-gold"></div>
          </div>
        </div>
      </section>
    )
  }

  const itemsPerPage = getItemsPerPage()
  const visibleNews = news.slice(currentIndex * itemsPerPage, (currentIndex * itemsPerPage) + itemsPerPage)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-6">
            门窗行业动态
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            实时关注行业发展趋势，把握市场前沿动态
          </p>
        </motion.div>

        {/* 新闻卡片容器 */}
        <div 
          className="relative overflow-hidden mb-12"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {visibleNews.map((newsItem, index) => (
                <motion.div
                  key={newsItem.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer transform hover:-translate-y-2"
                  onClick={() => handleNewsClick(newsItem)}
                  onMouseEnter={() => setHoveredCard(newsItem.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* 卡片顶部装饰条 */}
                  <div className={`h-1 w-full ${newsItem.category === '政策新规' ? 'bg-gradient-to-r from-red-400 to-red-600' : newsItem.category === '技术趋势' ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 'bg-gradient-to-r from-green-400 to-green-600'}`}></div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <motion.span 
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(newsItem.category)} relative overflow-hidden`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white opacity-20"
                          initial={{ x: '-100%' }}
                          animate={hoveredCard === newsItem.id ? { x: '100%' } : { x: '-100%' }}
                          transition={{ duration: 0.6 }}
                        />
                        {newsItem.category}
                      </motion.span>
                      <div className="flex items-center space-x-2">
                        <motion.div
                          className="w-2 h-2 bg-primary-gold rounded-full"
                          animate={{ 
                            scale: hoveredCard === newsItem.id ? [1, 1.4, 1] : [1, 1.2, 1],
                            backgroundColor: hoveredCard === newsItem.id ? '#f59e0b' : '#d4af37'
                          }}
                          transition={{ 
                            duration: hoveredCard === newsItem.id ? 1 : 2, 
                            repeat: Infinity 
                          }}
                        />
                        <motion.span 
                          className="text-sm text-gray-500 font-medium"
                          animate={{ 
                            fontWeight: hoveredCard === newsItem.id ? 600 : 500,
                            color: hoveredCard === newsItem.id ? '#374151' : '#6b7280'
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {newsItem.publishDate}
                        </motion.span>
                      </div>
                    </div>
                    
                    <motion.h3 
                      className="text-lg font-bold text-primary-dark mb-3 group-hover:text-primary-gold transition-colors duration-300 line-clamp-2 leading-tight"
                      animate={{ 
                        color: hoveredCard === newsItem.id ? '#d4af37' : '#1a202c' 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {newsItem.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3"
                      animate={{ 
                        opacity: hoveredCard === newsItem.id ? 0.9 : 0.7 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {newsItem.summary}
                    </motion.p>
                
                     <div className="flex items-center justify-between">
                       <motion.button 
                         className="relative flex items-center space-x-2 text-primary-gold hover:text-yellow-600 font-medium text-sm transition-all duration-300 group/btn overflow-hidden"
                         whileHover={{ x: 5 }}
                         whileTap={{ scale: 0.95 }}
                       >
                         <motion.div
                           className="absolute inset-0 bg-yellow-50 rounded"
                           initial={{ x: '-100%' }}
                           animate={{ x: hoveredCard === newsItem.id ? '0%' : '-100%' }}
                           transition={{ duration: 0.3 }}
                         />
                         <span className="relative z-10">阅读全文</span>
                         <motion.span
                           className="relative z-10 transform transition-transform duration-300 group-hover/btn:translate-x-1"
                           animate={{ 
                             x: hoveredCard === newsItem.id ? [0, 3, 0] : 0,
                             rotate: hoveredCard === newsItem.id ? [0, 15, 0] : 0
                           }}
                           transition={{ 
                             duration: hoveredCard === newsItem.id ? 1.2 : 0.3, 
                             repeat: hoveredCard === newsItem.id ? Infinity : 0
                           }}
                         >
                           →
                         </motion.span>
                       </motion.button>
                       
                       <div className="flex space-x-1">
                         <motion.button
                           onClick={(e) => {
                             e.stopPropagation()
                             handleShare(newsItem, 'wechat')
                           }}
                           className="relative p-2 text-gray-400 hover:text-green-500 transition-all duration-300 rounded-full hover:bg-green-50 overflow-hidden"
                           title="分享到微信"
                           whileHover={{ scale: 1.1, rotate: 5 }}
                           whileTap={{ scale: 0.9 }}
                         >
                           <motion.div
                             className="absolute inset-0 bg-green-100 rounded-full"
                             initial={{ scale: 0 }}
                             animate={{ scale: hoveredCard === newsItem.id ? 1 : 0 }}
                             transition={{ duration: 0.3 }}
                           />
                           <motion.svg 
                             className="w-4 h-4 relative z-10" 
                             fill="currentColor" 
                             viewBox="0 0 24 24"
                             animate={{ 
                               rotate: hoveredCard === newsItem.id ? [0, 10, 0] : 0 
                             }}
                             transition={{ 
                               duration: 1.5, 
                               repeat: hoveredCard === newsItem.id ? Infinity : 0 
                             }}
                           >
                             <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.111.24-.248 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1 .023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.062-6.114zM12.618 9.691c-.757 0-1.368.618-1.368 1.378 0 .759.611 1.378 1.368 1.378.757 0 1.368-.618 1.368-1.378 0-.759-.611-1.378-1.368-1.378zm4.756 0c-.757 0-1.368.618-1.368 1.378 0 .759.611 1.378 1.368 1.378.757 0 1.368-.618 1.368-1.378 0-.759-.611-1.378-1.368-1.378z"/>
                           </motion.svg>
                         </motion.button>
                         
                         <motion.button
                           onClick={(e) => {
                             e.stopPropagation()
                             handleShare(newsItem, 'weibo')
                           }}
                           className="relative p-2 text-gray-400 hover:text-red-500 transition-all duration-300 rounded-full hover:bg-red-50 overflow-hidden"
                           title="分享到微博"
                           whileHover={{ scale: 1.1, rotate: -5 }}
                           whileTap={{ scale: 0.9 }}
                         >
                           <motion.div
                             className="absolute inset-0 bg-red-100 rounded-full"
                             initial={{ scale: 0 }}
                             animate={{ scale: hoveredCard === newsItem.id ? 1 : 0 }}
                             transition={{ duration: 0.3 }}
                           />
                           <motion.svg 
                             className="w-4 h-4 relative z-10" 
                             fill="currentColor" 
                             viewBox="0 0 24 24"
                             animate={{ 
                               rotate: hoveredCard === newsItem.id ? [0, -10, 0] : 0 
                             }}
                             transition={{ 
                               duration: 1.5, 
                               repeat: hoveredCard === newsItem.id ? Infinity : 0 
                             }}
                           >
                             <path d="M9.586 21.5c-4.036 0-7.336-2.138-7.336-4.766 0-1.158.616-2.277 1.634-3.255 2.181-2.096 5.541-2.755 7.725-1.513.418.238.418.238.418-.159 0-1.273-.836-2.391-2.18-2.391-.836 0-1.553.477-1.553 1.034 0 .318.239.557.557.557.318 0 .557-.239.557-.557 0-.159-.08-.318-.239-.398.159-.159.398-.239.677-.239.836 0 1.513.677 1.513 1.513 0 .836-.677 1.513-1.513 1.513-.836 0-1.513-.677-1.513-1.513 0-1.671 1.354-3.025 3.025-3.025 2.391 0 4.343 1.952 4.343 4.343 0 .398-.08.796-.239 1.194.398-.08.796-.159 1.194-.159 2.391 0 4.343 1.952 4.343 4.343 0 2.391-1.952 4.343-4.343 4.343-1.194 0-2.391-.477-3.266-1.354-.875.875-2.072 1.354-3.266 1.354zm7.725-8.686c-1.194 0-2.391.477-3.266 1.354-.875-.875-2.072-1.354-3.266-1.354-2.391 0-4.343 1.952-4.343 4.343s1.952 4.343 4.343 4.343c1.194 0 2.391-.477 3.266-1.354.875.875 2.072 1.354 3.266 1.354 2.391 0 4.343-1.952 4.343-4.343s-1.952-4.343-4.343-4.343z"/>
                           </motion.svg>
                         </motion.button>
                         
                         {/* 阅读数指示器 */}
                          <motion.div 
                            className="flex items-center space-x-1 px-2 py-1 bg-gray-50 rounded-full"
                            whileHover={{ scale: 1.05 }}
                          >
                            <motion.svg 
                              className="w-3 h-3 text-gray-400" 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                              animate={{ rotate: hoveredCard === newsItem.id ? 360 : 0 }}
                              transition={{ duration: 0.5 }}
                            >
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                            </motion.svg>
                            <span className="text-xs text-gray-500 font-medium">{Math.floor(Math.random() * 1000) + 100}</span>
                          </motion.div>
                       </div>
                     </div>
                   </div>
                 </motion.div>
               ))}
             </motion.div>
           </AnimatePresence>
         </div>

         {/* 控制区域 */}
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            {/* 轮播指示器 */}
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                {Array.from({ length: Math.ceil(news.length / getItemsPerPage()) }).map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'w-8 h-3 bg-primary-gold' : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {index === currentIndex && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600"
                        initial={{ x: '-100%' }}
                        animate={{ x: '0%' }}
                        transition={{ duration: 4, ease: 'linear', repeat: Infinity }}
                      />
                    )}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                      animate={{ x: index === currentIndex ? ['-100%', '100%'] : '-100%' }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                  </motion.button>
                ))}
              </div>
              
              {/* 自动播放控制 */}
              <motion.button
                onClick={() => isAutoPlay ? pauseAutoPlay() : resumeAutoPlay()}
                className="relative p-2 text-gray-400 hover:text-primary-gold transition-colors duration-300 rounded-full hover:bg-gray-50 overflow-hidden"
                title={isAutoPlay ? '暂停自动播放' : '开始自动播放'}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-yellow-200 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  animate={{ rotate: isAutoPlay ? 360 : 0 }}
                  transition={{ duration: 3, repeat: isAutoPlay ? Infinity : 0, ease: 'linear' }}
                />
                <motion.div
                  className="relative z-10"
                  animate={{ rotate: isAutoPlay ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {isAutoPlay ? (
                    <motion.svg 
                      className="w-4 h-4" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </motion.svg>
                  ) : (
                    <motion.svg 
                      className="w-4 h-4" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                      animate={{ x: [0, 2, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                    </motion.svg>
                  )}
                </motion.div>
              </motion.button>
            </div>
            
            {/* 导航按钮 */}
            <div className="flex space-x-2">
              <motion.button
                onClick={() => setCurrentIndex(prev => prev > 0 ? prev - 1 : Math.ceil(news.length / getItemsPerPage()) - 1)}
                className="relative p-2 text-gray-400 hover:text-primary-gold transition-colors duration-300 rounded-full hover:bg-gray-50 disabled:opacity-50 overflow-hidden group"
                disabled={news.length <= getItemsPerPage()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.svg 
                  className="w-5 h-5 relative z-10" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ x: news.length <= getItemsPerPage() ? 0 : [-2, 0] }}
                  transition={{ duration: 0.5, repeat: news.length <= getItemsPerPage() ? 0 : Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </motion.svg>
              </motion.button>
              
              <motion.button
                onClick={() => setCurrentIndex(prev => (prev + 1) % Math.ceil(news.length / getItemsPerPage()))}
                className="relative p-2 text-gray-400 hover:text-primary-gold transition-colors duration-300 rounded-full hover:bg-gray-50 disabled:opacity-50 overflow-hidden group"
                disabled={news.length <= getItemsPerPage()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.svg 
                  className="w-5 h-5 relative z-10" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ x: news.length <= getItemsPerPage() ? 0 : [2, 0] }}
                  transition={{ duration: 0.5, repeat: news.length <= getItemsPerPage() ? 0 : Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </motion.button>
            </div>
          </div>
      </div>
    </section>
  )
}

export default IndustryNews