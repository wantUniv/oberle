'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { getImagePath } from '@/utils/pathUtils'

interface VideoSlide {
  id: number
  image: string
  caption: string
  description: string
}

const VideoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const slides: VideoSlide[] = [
    {
      id: 1,
      image: getImagePath('/images/lunbotu1.jpg'),
      caption: '德国CNC精密加工',
      description: '采用德国进口CNC设备，确保每一个细节的精准度'
    },
    {
      id: 2,
      image: getImagePath('/images/lunbotu3.jpg'),
      caption: '航空级铝材',
      description: '选用6063-T5航空级铝合金，强度与美观并重'
    },
    {
      id: 3,
      image: getImagePath('/images/lunbotu5.png'),
      caption: '三元乙丙密封胶条',
      description: '进口EPDM密封材料，50年不老化承诺'
    },
    {
      id: 4,
      image: getImagePath('/images/lunbotu7.jpg'),
      caption: '多腔体断桥设计',
      description: '创新多腔体结构，热传导系数低至1.4W/m²·K'
    },
    {
      id: 5,
      image: getImagePath('/images/lunbotu9.jpg'),
      caption: '智能五金系统',
      description: '德国ROTO五金配件，10万次开启测试验证'
    }
  ]

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 背景图片轮播 */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={false}
            animate={{
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 1.05
            }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}

            className={`absolute inset-0 ${index === currentSlide ? 'z-[2]' : 'z-[1]'}`}
          >
            <Image
              src={slide.image}
              alt={slide.caption}
              fill
              className="object-cover"
              priority={index === 0}
              quality={90}
            />
            {/* 渐变遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
          </motion.div>
        ))}
      </div>

      {/* 视差前景内容 */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 z-5 transform-gpu"
      >
        <div className="container mx-auto px-4 pb-32 flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white max-w-2xl text-center"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-primary-gold">
                {slides[currentSlide].caption}
              </h3>
              <p className="text-sm md:text-base opacity-80">
                {slides[currentSlide].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 控制按钮 */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center space-x-4">
        {/* 播放/暂停按钮 */}
        <button
          onClick={togglePlayPause}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* 指示器 */}
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-primary-gold scale-125'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 导航箭头 */}
      <button
        onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => goToSlide((currentSlide + 1) % slides.length)}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default VideoCarousel