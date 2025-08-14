'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/Header'
import VideoCarousel from '@/components/VideoCarousel'
import ScrollerText from '@/components/ScrollerText'
import ProductShowcase from '@/components/ProductShowcase'
import CaseStudies from '@/components/CaseStudies'
import TechnicalSpecs from '@/components/TechnicalSpecs'
import IndustryNews from '@/components/IndustryNews'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import { getImagePath } from '@/utils/pathUtils'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showWeChatModal, setShowWeChatModal] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && containerRef.current) {
      // 初始化页面动画
      gsap.fromTo(
        '.hero-content',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }
      )

      // 滚动触发动画
      gsap.utils.toArray('.animate-on-scroll').forEach((element: any) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {/* 导航栏 */}
      <Header />
      
      {/* 主要内容区域 */}
      <main className="relative">
        {/* 英雄区域 - 视频轮播 */}
        <section className="relative h-screen overflow-hidden">
          <VideoCarousel />
          <div className="hero-content absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                欧伯乐系统门窗
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl mb-8 font-light">
                德国工艺 · 航空级品质
              </p>

            </div>
          </div>
        </section>

        {/* 性能参数跑马灯 */}
        <section className="bg-primary-dark py-4">
          <ScrollerText 
            content="抗风压等级≥9级 | 水密性6级 | 气密性8级 | 隔声量Rw≥42dB | 德国CNC精密加工 | 多腔体结构 | LOW-E中空玻璃"
            speed={50}
          />
        </section>

        {/* 产品展示区 */}
        <section id="products" className="animate-on-scroll py-20 bg-neutral-gray">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-6">
                核心产品体系
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                采用德国先进工艺，航空级铝材精工制造，为不同建筑需求提供专业门窗解决方案
              </p>
            </div>
            <ProductShowcase />
          </div>
        </section>

        {/* 技术规格展示 */}
        <section id="technology" className="animate-on-scroll py-20">
          <TechnicalSpecs />
        </section>

        {/* 行业新闻 */}
        <section id="news" className="animate-on-scroll">
          <IndustryNews />
        </section>

        {/* 案例展示 */}
        <section id="cases" className="animate-on-scroll py-20 bg-neutral-gray">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-6">
                工程案例库
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                遍布全国的高端项目，见证欧伯乐品质与工艺
              </p>
            </div>
            <CaseStudies />
          </div>
        </section>

        {/* 服务支持 */}
        <section id="service" className="animate-on-scroll py-20 bg-primary-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 relative overflow-hidden">
              <span className="relative inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-dark to-blue-900 border-2 border-primary-gold/20 shadow-2xl group">
                {/* 金色流光动画背景 */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-gold/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                <span className="relative z-10">
                   开启高端门窗定制之旅
                 </span>
              </span>
            </h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              专业团队为您提供从设计到安装的全程服务
            </p>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary-gold mb-2">服务热线</h3>
                <p className="text-xl">136-3666-1988</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary-gold mb-2">企业邮箱</h3>
                <p className="text-xl">3278908492@qq.com</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary-gold mb-2">公司地址</h3>
                <p className="text-xl">江西省南昌市安义县东阳大道166号</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <Footer />
      
      {/* 移动端底部导航栏 */}
      <MobileBottomNav />
      
      {/* 微信二维码弹窗 */}
      {showWeChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowWeChatModal(false)}>
          <div className="bg-white rounded-lg p-8 max-w-sm mx-4 relative" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setShowWeChatModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
            <div className="text-center">
              <h3 className="text-xl font-bold text-primary-dark mb-4">添加微信咨询</h3>
              <img 
                 src={getImagePath("/images/wechat-qr.jpg")} 
                 alt="微信二维码" 
                 className="w-48 h-48 mx-auto mb-4 rounded-lg"
               />
              <p className="text-gray-600">扫描二维码添加微信</p>
              <p className="text-gray-600">获取专业咨询服务</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}