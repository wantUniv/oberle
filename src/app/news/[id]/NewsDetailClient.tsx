'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface NewsDetail {
  id: string
  title: string
  content: string
  publishDate: string
  category: string
  author: string
  tags: string[]
  readCount: number
}

interface NewsDetailClientProps {
  params: { id: string }
}

export default function NewsDetailClient({ params }: NewsDetailClientProps) {
  const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null)
  const [loading, setLoading] = useState(true)

  // 模拟新闻详情数据
  const mockNewsDetail: NewsDetail = {
    id: params.id,
    title: '2025年门窗行业新国标正式实施',
    content: `
      <p>2025年1月1日起，新修订的《建筑门窗》国家标准正式实施，这标志着我国门窗行业进入了更加规范化、标准化的发展新阶段。</p>
      
      <h3>新标准主要变化</h3>
      <p>新国标在以下几个方面进行了重要调整：</p>
      <ul>
        <li><strong>节能性能要求提升：</strong>对门窗的传热系数、气密性、水密性等关键指标提出了更严格的要求</li>
        <li><strong>安全性能强化：</strong>增加了抗风压性能、防盗性能等安全指标的检测标准</li>
        <li><strong>环保标准升级：</strong>对门窗材料的环保性能提出了更高要求，限制有害物质的使用</li>
        <li><strong>智能化要求：</strong>首次将智能门窗的相关技术标准纳入国标体系</li>
      </ul>
      
      <h3>对行业的影响</h3>
      <p>新国标的实施将对门窗行业产生深远影响：</p>
      <p>首先，将推动行业技术升级。企业需要投入更多资源进行技术研发，提升产品性能以满足新标准要求。</p>
      <p>其次，将加速行业洗牌。技术实力较弱、产品质量不达标的企业将面临淘汰，而具备技术优势的企业将获得更大发展空间。</p>
      <p>最后，将提升消费者体验。新标准的实施将确保消费者能够购买到更加节能、安全、环保的门窗产品。</p>
      
      <h3>企业应对策略</h3>
      <p>面对新国标的实施，门窗企业应该：</p>
      <ol>
        <li>加强技术研发投入，提升产品性能</li>
        <li>完善质量管理体系，确保产品符合新标准</li>
        <li>加强员工培训，提升技术水平</li>
        <li>积极拥抱智能化趋势，开发智能门窗产品</li>
      </ol>
      
      <p>业内专家表示，新国标的实施是门窗行业高质量发展的重要里程碑，将推动整个行业向更加规范、环保、智能的方向发展。</p>
    `,
    publishDate: '2025-01-15',
    category: '政策新规',
    author: '门窗行业观察',
    tags: ['国标', '政策', '门窗', '标准'],
    readCount: 1256
  }

  useEffect(() => {
    const fetchNewsDetail = async () => {
      setLoading(true)
      try {
        // 实际项目中这里应该调用真实的API
        // const response = await fetch(`/api/news/${params.id}`)
        // const data = await response.json()
        
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 800))
        setNewsDetail(mockNewsDetail)
      } catch (error) {
        console.error('获取新闻详情失败:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNewsDetail()
  }, [params.id])

  const handleShare = (platform: 'wechat' | 'weibo') => {
    const shareUrl = encodeURIComponent(window.location.href)
    const shareTitle = encodeURIComponent(newsDetail?.title || '')
    
    if (platform === 'wechat') {
      // 微信分享（实际需要微信SDK）
      console.log('分享到微信:', newsDetail?.title)
      alert('请使用微信扫描二维码分享')
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
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-gray">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-20">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-gold"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!newsDetail) {
    return (
      <div className="min-h-screen bg-neutral-gray">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-2xl font-bold text-gray-600 mb-4">新闻不存在</h1>
            <button 
              onClick={() => window.history.back()}
              className="bg-primary-gold hover:bg-yellow-600 text-primary-dark px-6 py-2 rounded-lg font-semibold transition-all duration-300"
            >
              返回上一页
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-gray">
      <Header />
      
      <main className="pt-20">
        <article className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* 文章头部 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-lg shadow-lg p-8 mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(newsDetail.category)}`}>
                  {newsDetail.category}
                </span>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>👁️ {newsDetail.readCount} 阅读</span>
                  <span>{newsDetail.publishDate}</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6 leading-tight">
                {newsDetail.title}
              </h1>
              
              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">作者：{newsDetail.author}</span>
                  <div className="flex space-x-2">
                    {newsDetail.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleShare('wechat')}
                    className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors duration-300"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.111.24-.248 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1 .023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.062-6.114zM12.618 9.691c-.757 0-1.368.618-1.368 1.378 0 .759.611 1.378 1.368 1.378.757 0 1.368-.618 1.368-1.378 0-.759-.611-1.378-1.368-1.378zm4.756 0c-.757 0-1.368.618-1.368 1.378 0 .759.611 1.378 1.368 1.378.757 0 1.368-.618 1.368-1.378 0-.759-.611-1.378-1.368-1.378z"/>
                    </svg>
                    <span className="text-sm">微信</span>
                  </button>
                  
                  <button
                    onClick={() => handleShare('weibo')}
                    className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-300"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9.586 21.5c-4.036 0-7.336-2.138-7.336-4.766 0-1.158.616-2.277 1.634-3.255 2.181-2.096 5.541-2.755 7.725-1.513.418.238.418.238.418-.159 0-1.273-.836-2.391-2.18-2.391-.836 0-1.553.477-1.553 1.034 0 .318.239.557.557.557.318 0 .557-.239.557-.557 0-.159-.08-.318-.239-.398.159-.159.398-.239.677-.239.836 0 1.513.677 1.513 1.513 0 .836-.677 1.513-1.513 1.513-.836 0-1.513-.677-1.513-1.513 0-1.671 1.354-3.025 3.025-3.025 2.391 0 4.343 1.952 4.343 4.343 0 .398-.08.796-.239 1.194.398-.08.796-.159 1.194-.159 2.391 0 4.343 1.952 4.343 4.343 0 2.391-1.952 4.343-4.343 4.343-1.194 0-2.391-.477-3.266-1.354-.875.875-2.072 1.354-3.266 1.354zm7.725-8.686c-1.194 0-2.391.477-3.266 1.354-.875-.875-2.072-1.354-3.266-1.354-2.391 0-4.343 1.952-4.343 4.343s1.952 4.343 4.343 4.343c1.194 0 2.391-.477 3.266-1.354.875.875 2.072 1.354 3.266 1.354 2.391 0 4.343-1.952 4.343-4.343s-1.952-4.343-4.343-4.343z"/>
                    </svg>
                    <span className="text-sm">微博</span>
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* 文章内容 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: newsDetail.content }}
                style={{
                  lineHeight: '1.8',
                  color: '#374151'
                }}
              />
            </motion.div>
            
            {/* 返回按钮 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 text-center"
            >
              <button 
                onClick={() => window.history.back()}
                className="bg-primary-gold hover:bg-yellow-600 text-primary-dark px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                ← 返回新闻列表
              </button>
            </motion.div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  )
}