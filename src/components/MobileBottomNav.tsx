'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import AmapNavigationButton from './AmapNavigationButton'

const MobileBottomNav = () => {
  const [activeTab, setActiveTab] = useState('home')

  const navItems = [
    {
      id: 'home',
      name: '首页',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      action: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setActiveTab('home')
      }
    },
    {
      id: 'products',
      name: '产品',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      action: () => {
        const element = document.getElementById('products')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        setActiveTab('products')
      }
    },
    {
      id: 'quote',
      name: '报价',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      action: () => {
        window.location.href = '/quote'
        setActiveTab('quote')
      }
    },
    {
      id: 'contact',
      name: '联系',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      action: () => {
        const element = document.getElementById('contact')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        setActiveTab('contact')
      }
    }
  ]

  return (
    <>
      {/* 移动端底部导航栏 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
        {/* 高德地图导航按钮 - 悬浮在导航栏上方 */}
        <div className="flex justify-center mb-2">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
          >
            <AmapNavigationButton variant="mobile" className="shadow-2xl" />
          </motion.div>
        </div>
        
        {/* 底部导航栏 */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg"
        >
          <div className="flex items-center justify-around py-2 px-4">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={item.action}
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-300 ${
                  activeTab === item.id
                    ? 'text-primary-gold bg-primary-gold/10'
                    : 'text-gray-600 hover:text-primary-gold hover:bg-gray-100'
                }`}
              >
                <motion.div
                  animate={{
                    scale: activeTab === item.id ? 1.1 : 1,
                    color: activeTab === item.id ? '#D4AF37' : '#6B7280'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {item.icon}
                </motion.div>
                <span className="text-xs mt-1 font-medium">{item.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* 为底部导航栏预留空间 */}
      <div className="md:hidden h-20" />
    </>
  )
}

export default MobileBottomNav