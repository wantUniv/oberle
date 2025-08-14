'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'

interface PerformanceData {
  label: string
  value: number
  unit: string
  color: string
  description: string
}

const TechnicalSpecs = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<HTMLCanvasElement>(null)
  const isInView = useInView(containerRef, { once: true })
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0, 0])
  const [showThermalTooltip, setShowThermalTooltip] = useState(false)

  const performanceData: PerformanceData[] = [
    {
      label: '抗风压等级',
      value: 9,
      unit: '级',
      color: '#D4AF37',
      description: '能够承受台风级别的风压测试'
    },
    {
      label: '水密性能',
      value: 6,
      unit: '级',
      color: '#4CAF50',
      description: '优异的防水密封性能'
    },
    {
      label: '气密性能',
      value: 8,
      unit: '级',
      color: '#2196F3',
      description: '卓越的气密性保证节能效果'
    },
    {
      label: '隔声性能',
      value: 42,
      unit: 'dB',
      color: '#9C27B0',
      description: '有效隔绝外界噪音干扰'
    }
  ]

  const thermalData = [
    { temp: -20, uValue: 1.0 },
    { temp: -10, uValue: 1.1 },
    { temp: 0, uValue: 1.2 },
    { temp: 10, uValue: 1.2 },
    { temp: 20, uValue: 1.2 },
    { temp: 30, uValue: 1.3 },
    { temp: 40, uValue: 1.4 }
  ]

  useEffect(() => {
    if (isInView) {
      // 动画数值
      performanceData.forEach((data, index) => {
        gsap.to({}, {
          duration: 2,
          ease: 'power2.out',
          onUpdate: function() {
            const progress = this.progress()
            setAnimatedValues(prev => {
              const newValues = [...prev]
              newValues[index] = Math.round(data.value * progress)
              return newValues
            })
          }
        })
      })

      // 绘制热工性能曲线
      drawThermalChart()
    }
  }, [isInView])

  const drawThermalChart = () => {
    const canvas = chartRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const padding = 60

    // 清空画布
    ctx.clearRect(0, 0, width, height)

    // 设置样式
    ctx.strokeStyle = '#D4AF37'
    ctx.lineWidth = 3
    ctx.font = '12px Inter'
    ctx.fillStyle = '#666'

    // 绘制坐标轴
    ctx.beginPath()
    ctx.moveTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.moveTo(padding, height - padding)
    ctx.lineTo(padding, padding)
    ctx.strokeStyle = '#ddd'
    ctx.lineWidth = 1
    ctx.stroke()

    // 绘制网格线和坐标标签
    ctx.strokeStyle = '#f0f0f0'
    ctx.fillStyle = '#666'
    ctx.font = '11px Inter'
    ctx.textAlign = 'center'
    
    // X轴网格线和标签（温度）
    for (let i = 0; i <= 6; i++) {
      const x = padding + (width - 2 * padding) * i / 6
      const temp = -20 + i * 10 // 从-20°C到40°C，每10度一个刻度
      
      // 绘制垂直网格线
      if (i > 0 && i < 6) {
        ctx.beginPath()
        ctx.moveTo(x, padding)
        ctx.lineTo(x, height - padding)
        ctx.stroke()
      }
      
      // 添加X轴标签
      ctx.fillText(temp.toString(), x, height - padding + 15)
    }
    
    // Y轴网格线和标签（U值）
    ctx.textAlign = 'right'
    for (let i = 0; i <= 6; i++) {
      const y = height - padding - (height - 2 * padding) * i / 6
      const uValue = (0.8 + i * 0.1).toFixed(1) // 从0.8到1.4，每0.1一个刻度
      
      // 绘制水平网格线
      if (i > 0 && i < 6) {
        ctx.beginPath()
        ctx.moveTo(padding, y)
        ctx.lineTo(width - padding, y)
        ctx.stroke()
      }
      
      // 添加Y轴标签
      ctx.fillText(uValue, padding - 10, y + 4)
    }

    // 绘制数据点和曲线
    ctx.strokeStyle = '#D4AF37'
    ctx.lineWidth = 3
    ctx.beginPath()

    thermalData.forEach((point, index) => {
      const x = padding + (point.temp + 20) * (width - 2 * padding) / 60
      const y = height - padding - (point.uValue - 0.8) * (height - 2 * padding) / 0.8
      
      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
      
      // 绘制数据点
      ctx.save()
      ctx.fillStyle = '#D4AF37'
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })

    ctx.stroke()

    // 添加标签
    ctx.fillStyle = '#666'
    ctx.textAlign = 'center'
    ctx.fillText('温度 (°C)', width / 2, height - 20)
    
    ctx.save()
    ctx.translate(20, height / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText('U值 W/(㎡·K)', 0, 0)
    ctx.restore()
  }

  return (
    <div ref={containerRef} className="container mx-auto px-4">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-primary-dark mb-6"
        >
          核心技术指标
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          严格按照国家标准检测，每项指标均达到行业领先水平
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* 性能指标卡片 */}
        <div className="grid grid-cols-2 gap-6">
          {performanceData.map((data, index) => (
            <motion.div
              key={data.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-center">
                <div 
                  className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl ${
                    data.color === '#D4AF37' ? 'bg-primary-gold' :
                    data.color === '#4CAF50' ? 'bg-green-500' :
                    data.color === '#2196F3' ? 'bg-blue-500' :
                    data.color === '#9C27B0' ? 'bg-purple-600' : 'bg-gray-500'
                  }`}
                >
                  {data.label.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold text-primary-dark mb-2">
                  {data.label}
                </h3>
                <div className={`text-3xl font-bold mb-2 ${
                  data.color === '#D4AF37' ? 'text-primary-gold' :
                  data.color === '#4CAF50' ? 'text-green-500' :
                  data.color === '#2196F3' ? 'text-blue-500' :
                  data.color === '#9C27B0' ? 'text-purple-600' : 'text-gray-500'
                }`}>
                  {animatedValues[index]}
                  <span className="text-lg ml-1">{data.unit}</span>
                </div>
                <p className="text-sm text-gray-600">{data.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 热工性能曲线图 */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-2xl p-8 shadow-lg relative"
        >
          <div className="relative inline-block">
            <h3 
              className="text-2xl font-bold text-primary-dark mb-6 text-center cursor-help relative"
              onMouseEnter={() => setShowThermalTooltip(true)}
              onMouseLeave={() => setShowThermalTooltip(false)}
            >
              热工性能曲线
              <span className="ml-2 text-primary-gold text-lg">ⓘ</span>
            </h3>
            {showThermalTooltip && (
               <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-10 w-96 text-sm">
                 <div className="font-semibold mb-2">什么是热工性能？</div>
                 <div className="text-gray-200 mb-3">
                   热工性能是指门窗在不同温度条件下的保温隔热能力，主要通过传热系数（U值）来衡量。U值越小，保温性能越好，能够有效减少室内外热量交换，提高建筑节能效果。
                 </div>
                 <div className="font-semibold mb-2 text-yellow-300">U值标准参考：</div>
                 <div className="text-gray-200 space-y-1">
                   <div>• <span className="text-green-300">≤1.4 W/(㎡·K)</span> - 节能建筑标准</div>
                   <div>• <span className="text-blue-300">≤1.8 W/(㎡·K)</span> - 普通建筑要求</div>
                   <div>• <span className="text-yellow-300">≤2.5 W/(㎡·K)</span> - 基本保温要求</div>
                   <div className="text-xs text-gray-400 mt-2">*数值越小保温性能越优</div>
                 </div>
                 <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
               </div>
             )}
          </div>
          <canvas
            ref={chartRef}
            width={400}
            height={300}
            className="w-full h-auto"
          />
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              在不同温度环境下的传热系数变化曲线
            </p>
          </div>
        </motion.div>
      </div>

      {/* 认证标准 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-16 bg-neutral-gray rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-primary-dark mb-8 text-center">
          权威认证标准
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'GB/T 7106', desc: '建筑外窗抗风压性能检测' },
            { name: 'GB/T 7107', desc: '建筑外窗气密性能检测' },
            { name: 'GB/T 7108', desc: '建筑外窗水密性能检测' },
            { name: 'GB/T 8485', desc: '建筑外窗隔声性能检测' }
          ].map((cert, index) => (
            <div key={cert.name} className="text-center">
              <div className="w-16 h-16 bg-primary-gold rounded-full mx-auto mb-3 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-dark" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="font-semibold text-primary-dark mb-1">{cert.name}</h4>
              <p className="text-sm text-gray-600">{cert.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default TechnicalSpecs