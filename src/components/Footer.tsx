'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { getImagePath } from '@/utils/pathUtils'
import AmapNavigationButton from './AmapNavigationButton'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    products: [
      { name: '平开窗系列', href: '#' },
      { name: '推拉门系列', href: '#' },
      { name: '阳光房系统', href: '#' },
      { name: '幕墙系统', href: '#' }
    ],
    services: [
      { name: '设计咨询', href: '#' },
      { name: '工程安装', href: '#' },
      { name: '售后维护', href: '#' },
      { name: '技术支持', href: '#' }
    ],
    company: [
      { name: '关于我们', href: '#' },
      { name: '企业文化', href: '#' },
      { name: '发展历程', href: '#' },
      { name: '荣誉资质', href: '#' }
    ],
    contact: [
      { name: '联系方式', href: '#' },
      { name: '在线留言', href: '#' },
      { name: '招商加盟', href: '#' },
      { name: '人才招聘', href: '#' }
    ]
  }

  const socialLinks = [
    {
      name: '抖音号',
      href: 'https://www.douyin.com/user/self?from_tab_name=main',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      )
    },
    {
      name: '小红书',
      href: 'https://www.xiaohongshu.com/user/profile/687a1577000000001b01be20',
      icon: (
        <span className="text-sm font-medium">小红书</span>
      )
    }
  ]

  return (
    <footer id="contact" className="bg-primary-dark text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* 公司信息 */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary-gold rounded-lg flex items-center justify-center">
                  <span className="text-primary-dark font-bold text-xl">O</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">欧伯乐</h3>
                  <p className="text-gray-300">系统门窗</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                江西卢博建材科技有限公司旗下品牌，专注高端系统门窗研发制造，
                采用德国工艺标准，为客户提供卓越的门窗解决方案。
              </p>
              
              {/* 社交媒体 */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, color: '#D4AF37' }}
                    className={`${social.name === '小红书' ? 'px-3 py-2 h-10' : 'w-10 h-10'} bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary-gold hover:text-primary-dark transition-all duration-300`}
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 产品系列 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-primary-gold">产品系列</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary-gold transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 服务支持 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-primary-gold">服务支持</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary-gold transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 关于我们 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-primary-gold">关于我们</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary-gold transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 联系我们 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-primary-gold">联系我们</h4>
            
            {/* 联系方式图片 */}
            <div className="mb-6">
              <div className="bg-white rounded-lg p-4 shadow-lg">
                <Image
                  src={getImagePath("/images/contact-wechat.jpg")}
                  alt="联系方式"
                  width={200}
                  height={150}
                  className="w-full h-auto object-contain rounded"
                />
              </div>
            </div>
            
            {/* 高德地图导航按钮 */}
            <div className="mb-6">
              <AmapNavigationButton variant="footer" />
            </div>
            
            {/* 微信二维码 */}
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-2">扫码关注微信公众号</p>
              <div className="w-20 h-20 rounded-lg overflow-hidden">
                <Image
                  src={getImagePath("/images/wechat-qr.jpg")}
                  alt="微信二维码"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* 分割线 */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              <p>© {currentYear} 江西卢博建材科技有限公司 版权所有</p>
              <p className="mt-1">
                <a href="#" className="hover:text-primary-gold transition-colors">赣ICP备2023000000号</a>
                {' | '}
                <a href="#" className="hover:text-primary-gold transition-colors">隐私政策</a>
                {' | '}
                <a href="#" className="hover:text-primary-gold transition-colors">使用条款</a>
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-primary-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>ISO9001认证</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-primary-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <span>绿色建材认证</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer