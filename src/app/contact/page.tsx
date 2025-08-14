'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AmapNavigationButton from '@/components/AmapNavigationButton'
import { getImagePath } from '@/utils/pathUtils'

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* 页面头部 */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary-dark to-blue-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              联系我们
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              欧伯乐系统门窗，为您提供专业的门窗解决方案
            </p>
          </motion.div>
        </div>
      </section>

      {/* 联系信息主体 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              
              {/* 左侧：联系方式 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-3xl font-bold text-primary-dark mb-8">
                    联系方式
                  </h2>
                  
                  <div className="space-y-6">
                    {/* 服务热线 */}
                    <motion.div 
                      className="flex items-center space-x-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center">
                        <span className="text-3xl">📞</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-lg">服务热线</p>
                        <p className="text-primary-gold font-bold text-2xl">136-3666-1988</p>
                        <p className="text-gray-600 text-sm">工作时间：周一至周日 8:00-18:00</p>
                      </div>
                    </motion.div>
                    
                    {/* 企业邮箱 */}
                    <motion.div 
                      className="flex items-center space-x-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center">
                        <span className="text-3xl">📧</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-lg">企业邮箱</p>
                        <p className="text-primary-gold font-bold text-xl">3278908492@qq.com</p>
                        <p className="text-gray-600 text-sm">商务合作、技术咨询</p>
                      </div>
                    </motion.div>
                    
                    {/* 公司地址 */}
                    <motion.div 
                      className="flex items-center space-x-4 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center">
                        <span className="text-3xl">📍</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-lg">公司地址</p>
                        <p className="text-primary-gold font-bold text-xl">江西省南昌市安义县东阳大道166号</p>
                        <p className="text-gray-600 text-sm">江西卢博建材科技有限公司欧伯乐系统门窗</p>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* 高德地图导航按钮 */}
                  <div className="mt-8 text-center">
                    <h3 className="text-xl font-bold text-primary-dark mb-4">
                      一键导航到店
                    </h3>
                    <AmapNavigationButton variant="desktop" />
                  </div>
                </div>
              </motion.div>
              
              {/* 右侧：微信二维码和在线咨询 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                {/* 微信咨询 */}
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                  <h3 className="text-2xl font-bold text-primary-dark mb-6">
                    微信咨询
                  </h3>
                  <p className="text-gray-600 mb-6">
                    扫描二维码添加微信，获取专业咨询服务
                  </p>
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <Image
                      src={getImagePath("/images/contact-wechat.jpg")}
                      alt="微信咨询二维码"
                      width={250}
                      height={250}
                      className="w-full max-w-xs mx-auto h-auto object-contain rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-primary-gold font-semibold text-lg">
                      专业客服在线解答
                    </p>
                    <p className="text-gray-600 text-sm">
                      产品咨询 • 技术支持 • 报价服务
                    </p>
                  </div>
                </div>
                

              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 服务优势 */}
      <section className="py-20 bg-primary-dark text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              为什么选择欧伯乐
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              专业团队，优质服务，值得信赖的门窗品牌
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🏆',
                title: '品质保证',
                desc: '严格质量控制，确保每一扇门窗都达到高标准'
              },
              {
                icon: '🔧',
                title: '专业安装',
                desc: '经验丰富的安装团队，确保安装质量和效果'
              },
              {
                icon: '💎',
                title: '定制服务',
                desc: '根据客户需求提供个性化定制解决方案'
              },
              {
                icon: '🛡️',
                title: '售后保障',
                desc: '完善的售后服务体系，让您无后顾之忧'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-primary-gold mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

export default ContactPage