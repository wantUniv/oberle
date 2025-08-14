'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getImagePath } from '@/utils/pathUtils'

export default function FranchisePage() {

  const advantages = [
    {
      title: '区域独家保护',
      description: '严格的区域保护政策，确保加盟商独享区域市场，避免恶性竞争',
      icon: '🛡️'
    },
    {
      title: '全程开店支持',
      description: '从选址装修到开业运营，提供全方位专业指导和技术支持',
      icon: '🏪'
    },
    {
      title: '品牌实力保障',
      description: '德国工艺技术，航空级品质标准，强大的品牌影响力和市场认知度',
      icon: '⭐'
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-gray">
      <Header />
      
      {/* 主要内容 */}
      <main className="pt-20">
        {/* 头部展示区 */}
        <section className="bg-primary-dark text-white py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                加盟欧伯乐系统门窗
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                携手德国工艺品牌，共创门窗行业新未来
              </p>
            </motion.div>
            
            {/* 品牌优势 */}
            <div className="grid md:grid-cols-3 gap-8">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={advantage.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center hover:bg-white/20 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{advantage.icon}</div>
                  <h3 className="text-xl font-bold text-primary-gold mb-4">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {advantage.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 联系我们区域 */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-primary-dark mb-6">
                联系我们
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                欢迎咨询加盟事宜，我们的专业团队将为您提供详细的加盟政策和投资分析
              </p>
            </motion.div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* 联系方式 */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-8"
                >
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-primary-dark mb-6">
                      多种联系方式
                    </h3>
                    
                    <div className="space-y-6">
                      <motion.div 
                        className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center">
                          <span className="text-2xl">📞</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">招商热线</p>
                          <p className="text-primary-gold font-bold text-lg">136-3666-1988</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center">
                          <span className="text-2xl">📧</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">商务邮箱</p>
                          <p className="text-primary-gold font-bold">3278908492@qq.com</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center">
                          <span className="text-2xl">⏰</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">服务时间</p>
                          <p className="text-gray-600">周一至周日 8:00-20:00</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
                
                {/* 微信二维码区块 */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-center"
                >
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-primary-dark mb-6">
                      扫码添加招商经理
                    </h3>
                    <p className="text-gray-600 mb-8">
                      获取详细加盟政策和专业投资分析
                    </p>
                    
                    <motion.div 
                      className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 rounded-xl inline-block mb-6"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img 
                        src={getImagePath("/images/wechat-qr.jpg")} 
                        alt="门窗加盟咨询二维码" 
                        className="w-40 h-40 mx-auto rounded-lg shadow-md"
                      />
                    </motion.div>
                    
                    <div className="space-y-3">
                      <p className="text-sm text-gray-500">
                        微信扫码咨询
                      </p>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-green-600 font-medium">在线咨询</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* 加盟流程 */}
        <section className="bg-primary-dark text-white py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">加盟流程</h2>
              <p className="text-xl text-gray-300">
                简单四步，开启您的门窗事业
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '01', title: '咨询了解', desc: '电话或微信咨询加盟政策' },
                { step: '02', title: '实地考察', desc: '参观总部和样板店' },
                { step: '03', title: '签约合作', desc: '签署加盟协议' },
                { step: '04', title: '开业运营', desc: '培训指导，正式开业' }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary-gold text-primary-dark rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}