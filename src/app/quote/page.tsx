'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { QuoteCalculator, formatPrice, formatArea, getRecommendedConfig } from '@/utils/quoteCalculator'
import priceConfig from '@/data/priceConfig.json'
import { getImagePath } from '@/utils/pathUtils'

// 配置接口定义
interface QuoteConfig {
  type: any
  profile: any
  width: number
  height: number
  glass: any
  hardware: any
  openings: number
}

const QuotePage = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [config, setConfig] = useState<QuoteConfig>({
    type: null,
    profile: null,
    width: 120,
    height: 150,
    glass: null,
    hardware: null,
    openings: 1
  })
  const [calculator, setCalculator] = useState<QuoteCalculator | null>(null)
  const [quoteResult, setQuoteResult] = useState<any>(null)
  const [showContactForm, setShowContactForm] = useState(false)
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false)
  const [showWechatQR, setShowWechatQR] = useState(false)

  const steps = [
    { id: 'basic', name: '基础信息', icon: '🏠' },
    { id: 'glass', name: '玻璃配置', icon: '🔷' },
    { id: 'hardware', name: '五金配件', icon: '⚙️' },
    { id: 'size', name: '尺寸规格', icon: '📏' }
  ]

  // 更新计算器和结果
  const updateCalculation = () => {
    try {
      const calc = new QuoteCalculator(config)
      setCalculator(calc)
      const result = calc.calculate()
      setQuoteResult(result)
    } catch (error) {
      console.error('计算器更新失败:', error)
      setCalculator(null)
      setQuoteResult(null)
    }
  }

  // 保存配置到localStorage
  const saveConfig = () => {
    localStorage.setItem('quoteConfig', JSON.stringify(config))
  }

  // 从localStorage加载配置
  const loadConfig = () => {
    const saved = localStorage.getItem('quoteConfig')
    if (saved) {
      try {
        const parsedConfig = JSON.parse(saved)
        setConfig(parsedConfig)
      } catch (e) {
        console.log('Failed to load saved config')
      }
    }
  }

  // 重置配置
  const resetConfig = () => {
    const newConfig = {
      type: null,
      profile: null,
      width: 120,
      height: 150,
      glass: null,
      hardware: null,
      openings: 1
    }
    setConfig(newConfig)
    setCurrentStep(0)
    setQuoteResult(null)
    setCalculator(null)
    localStorage.removeItem('quoteConfig')
  }

  // 性价比推荐配置
  const applyRecommendedConfig = () => {
    console.log('性价比推荐配置被点击')
    const area = (config.width * config.height) / 10000
    const recommended = getRecommendedConfig(area)
    console.log('推荐配置:', recommended)
    // 确保选择了门窗类型才能应用推荐配置
    if (priceConfig.windowTypes.length > 0) {
      const recommendedType = priceConfig.windowTypes[0] // 选择第一个类型作为推荐
      setConfig({...config, type: recommendedType, ...recommended})
    } else {
      setConfig({...config, ...recommended})
    }
  }

  useEffect(() => {
    loadConfig()
  }, [])

  useEffect(() => {
    console.log('配置更新:', config)
    updateCalculation()
    saveConfig()
    console.log('计算器状态:', calculator)
    console.log('报价结果:', quoteResult)
  }, [config])

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // 基础信息
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">选择门窗类型</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {priceConfig.windowTypes.map((type) => (
                <motion.div
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setConfig({...config, type})}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    config.type?.id === type.id
                      ? 'border-primary-gold bg-primary-gold/10'
                      : 'border-gray-600 hover:border-primary-gold/50'
                  }`}
                >
                  <div className="text-white font-semibold">{type.name}</div>
                  <div className="text-gray-300 text-sm">{type.description}</div>
                  <div className="text-primary-gold font-bold mt-2">¥{type.basePrice}/{type.unit}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {type.features?.join(' • ')}
                  </div>
                </motion.div>
              ))}
            </div>
            
            {config.type && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-white mb-3">选择型材系列</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {priceConfig.profiles.map((profile) => (
                    <motion.div
                      key={profile.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setConfig({...config, profile})}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                        config.profile?.id === profile.id
                          ? 'border-primary-gold bg-primary-gold/10'
                          : 'border-gray-600 hover:border-primary-gold/50'
                      }`}
                    >
                      <div className="text-white font-semibold">{profile.name}</div>
                      <div className="text-gray-300 text-sm">{profile.description}</div>
                      <div className="text-primary-gold font-bold mt-2">价格系数: {profile.priceFactor}x</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {profile.features?.join(' • ')}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      
      case 1: // 玻璃配置
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">选择玻璃配置</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {priceConfig.glassOptions.map((glass) => (
                <motion.div
                  key={glass.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setConfig({...config, glass})}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    config.glass?.id === glass.id
                      ? 'border-primary-gold bg-primary-gold/10'
                      : 'border-gray-600 hover:border-primary-gold/50'
                  }`}
                >
                  <div className="text-white font-semibold">{glass.name}</div>
                  <div className="text-gray-300 text-sm">{glass.description}</div>
                  <div className="text-primary-gold font-bold mt-2">
                    {glass.price === 0 ? '基础配置' : `+¥${glass.price}/m²`}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {glass.features?.join(' • ')}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )
      
      case 2: // 五金配件
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">选择五金配件</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {priceConfig.hardwareOptions.map((hardware) => (
                <motion.div
                  key={hardware.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setConfig({...config, hardware})}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    config.hardware?.id === hardware.id
                      ? 'border-primary-gold bg-primary-gold/10'
                      : 'border-gray-600 hover:border-primary-gold/50'
                  }`}
                >
                  <div className="text-white font-semibold">{hardware.name}</div>
                  <div className="text-gray-300 text-sm">{hardware.description}</div>
                  <div className="text-primary-gold font-bold mt-2">
                    {hardware.price === 0 ? '基础配置' : `+¥${hardware.price}`}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {hardware.features?.join(' • ')}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )
      
      case 3: // 尺寸规格
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">设置尺寸规格</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">宽度 (cm)</label>
                <input
                  type="number"
                  min="20"
                  max="300"
                  value={config.width}
                  onChange={(e) => setConfig({...config, width: parseInt(e.target.value) || 120})}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-primary-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">高度 (cm)</label>
                <input
                  type="number"
                  min="20"
                  max="300"
                  value={config.height}
                  onChange={(e) => setConfig({...config, height: parseInt(e.target.value) || 150})}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-primary-gold focus:outline-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-white font-semibold mb-2">开扇数量</label>
              <select
                value={config.openings}
                onChange={(e) => setConfig({...config, openings: parseInt(e.target.value)})}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-primary-gold focus:outline-none"
              >
                {[1,2,3,4,5,6].map(num => (
                  <option key={num} value={num}>
                    {num}扇 {num > 1 && `(+¥${(num-1) * priceConfig.openingCost.additional})`}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <div className="text-white font-semibold mb-2">尺寸预览</div>
              <div className="text-gray-300">
                面积: {((config.width * config.height) / 10000).toFixed(2)} m²
              </div>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  const renderPreview = () => {
    const getWindowShape = () => {
      const typeName = config.type?.name || ''
      const isWindow = typeName.includes('窗')
      const isDoor = typeName.includes('门')
      const isPivot = typeName.includes('平开')
      const isSliding = typeName.includes('推拉')
      const isTiltTurn = typeName.includes('内开内倒')
      
      // 基础尺寸
      const baseWidth = 128 // w-32
      const baseHeight = isDoor ? 140 : 96 // 门更高
      
      return (
        <div className="relative mx-auto mb-4" style={{width: baseWidth, height: baseHeight}}>
          {/* 主框架 */}
          <div 
            className="border-4 border-primary-dark rounded-lg relative bg-gradient-to-br from-blue-50 to-blue-100"
            style={{width: baseWidth, height: baseHeight}}
          >
            {/* 玻璃效果 */}
            <div className="absolute inset-2 bg-gradient-to-br from-cyan-100 to-blue-200 rounded opacity-60">
              {/* 玻璃类型指示 */}
              {config.glass?.name?.includes('三玻') && (
                <>
                  <div className="absolute inset-x-2 top-1/4 h-px bg-gray-300 opacity-50"></div>
                  <div className="absolute inset-x-2 top-3/4 h-px bg-gray-300 opacity-50"></div>
                </>
              )}
              {config.glass?.name?.includes('双层') && (
                <div className="absolute inset-x-2 top-1/2 h-px bg-gray-300 opacity-50"></div>
              )}
              {config.glass?.name?.includes('Low-E') && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full opacity-70"></div>
              )}
              {config.glass?.name?.includes('夹胶') && (
                <div className="absolute top-2 left-2 w-3 h-3 bg-yellow-400 rounded-full opacity-70"></div>
              )}
            </div>
            
            {/* 开启方式指示 */}
            {isPivot && (
              <>
                {/* 平开窗/门的合页线 */}
                <div className="absolute left-1 top-4 bottom-4 w-1 bg-primary-gold rounded-full"></div>
                {/* 开启指示箭头 */}
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <svg className="w-4 h-4 text-primary-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </>
            )}
            
            {isSliding && (
              <>
                {/* 推拉轨道 */}
                <div className="absolute inset-x-2 top-2 h-1 bg-gray-400 rounded-full"></div>
                <div className="absolute inset-x-2 bottom-2 h-1 bg-gray-400 rounded-full"></div>
                {/* 推拉分割线 */}
                <div className="absolute left-1/2 top-4 bottom-4 w-1 bg-primary-dark rounded-full transform -translate-x-1/2"></div>
                {/* 推拉指示 */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-4 h-4 text-primary-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                </div>
              </>
            )}
            
            {isTiltTurn && (
              <>
                {/* 内开内倒的双重合页 */}
                <div className="absolute left-1 top-4 bottom-4 w-1 bg-primary-gold rounded-full"></div>
                <div className="absolute inset-x-4 top-1 h-1 bg-primary-gold rounded-full"></div>
                {/* 双向开启指示 */}
                <div className="absolute right-2 top-2">
                  <svg className="w-3 h-3 text-primary-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="absolute right-2 bottom-1/3">
                  <svg className="w-3 h-3 text-primary-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </>
            )}
            
            {/* 五金等级指示 */}
            {config.hardware?.name?.includes('进口') && (
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-blue-500 rounded-full"></div>
            )}
            {config.hardware?.name?.includes('高端') && (
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-purple-500 rounded-full"></div>
            )}
            
            {/* 多扇指示 */}
            {config.openings > 1 && (
              <div className="absolute inset-0 border-2 border-primary-gold rounded-lg transform translate-x-1 translate-y-1 bg-gradient-to-br from-blue-50 to-blue-100 opacity-80">
                <div className="absolute inset-2 bg-gradient-to-br from-cyan-100 to-blue-200 rounded opacity-60"></div>
                <div className="absolute top-1 right-1 text-xs font-bold text-primary-gold">
                  {config.openings}扇
                </div>
              </div>
            )}
          </div>
          
          {/* 尺寸标注 */}
          <div className="absolute -bottom-6 left-0 right-0 text-center">
            <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded border inline-block">
              {config.width}×{config.height}cm
            </div>
          </div>
        </div>
      )
    }
    
    return (
      <div className="bg-white rounded-lg p-6 h-64 flex items-center justify-center">
        <div className="text-center">
          {getWindowShape()}
          <div className="text-primary-dark font-semibold mt-2">
            {config.type?.name || '请选择门窗类型'}
          </div>
          <div className="text-gray-600 text-sm mt-1">
            {config.profile?.name} | {config.glass?.name || '请选择玻璃'}
          </div>
          <div className="text-gray-500 text-xs mt-1">
            {config.hardware?.name || '标准五金'}
          </div>
        </div>
      </div>
    )
  }

  const renderSpecSummary = () => {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-white">配置详情</h4>
          {quoteResult && (
            <button
              onClick={() => {
                console.log('价格明细按钮被点击，当前状态:', showPriceBreakdown)
                setShowPriceBreakdown(!showPriceBreakdown)
              }}
              className="text-primary-gold text-sm hover:underline"
            >
              {showPriceBreakdown ? '隐藏' : '查看'}价格明细
            </button>
          )}
        </div>
        
        {calculator && (
          <div className="space-y-3">
            {calculator.getConfigSummary().map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-300">{item.label}</span>
                <span className="text-white font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        )}
        
        {showPriceBreakdown && calculator && (
          <div className="mt-6 pt-4 border-t border-gray-600">
            <h5 className="text-white font-medium mb-3">价格明细</h5>
            <div className="space-y-2 text-sm">
              {calculator.getPriceBreakdown().map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-400">{item.label}</span>
                  <span className="text-gray-300">¥{item.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {quoteResult && (
          <div className="mt-6 pt-4 border-t border-gray-600">
            <button
              onClick={applyRecommendedConfig}
              className="w-full py-2 px-4 bg-primary-gold/20 text-primary-gold rounded-lg hover:bg-primary-gold/30 transition-colors text-sm"
            >
              性价比推荐配置
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-dark">
      <Header />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* 页面标题 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">门窗在线报价</h1>
            <p className="text-gray-300">专业配置，实时报价，让您的选择更明智</p>
          </motion.div>

          {/* 步骤指示器 */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setCurrentStep(index)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 ${
                    currentStep === index
                      ? 'bg-primary-gold text-primary-dark'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  <span className="text-lg">{step.icon}</span>
                  <span className="font-semibold">{step.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 主要内容区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左侧配置区 */}
            <div className="lg:col-span-2">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800 rounded-lg p-6"
              >
                {renderStepContent()}
                
                {/* 步骤导航 */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-500 transition-colors"
                  >
                    上一步
                  </button>
                  <button
                    onClick={() => {
                      console.log('下一步按钮被点击，当前步骤:', currentStep)
                      setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
                    }}
                    disabled={currentStep === steps.length - 1}
                    className="px-6 py-2 bg-primary-gold text-primary-dark rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-500 transition-colors font-semibold"
                  >
                    {currentStep === steps.length - 1 ? '价格见左下角' : '下一步'}
                  </button>
                </div>
              </motion.div>
            </div>

            {/* 右侧预览区 */}
            <div className="space-y-6">
              {/* 门窗预览 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-white font-semibold mb-3">效果预览</h3>
                {renderPreview()}
              </motion.div>

              {/* 配置详情 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {renderSpecSummary()}
              </motion.div>
            </div>
          </div>

          {/* 底部报价栏 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="fixed bottom-0 left-0 right-0 bg-primary-dark/95 backdrop-blur-md border-t border-gray-700 p-4 z-40"
          >
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="text-center md:text-left">
                  <div className="text-2xl font-bold text-primary-gold">
                    预估总价: ¥{quoteResult?.total ? quoteResult.total.toLocaleString() : '0'}
                  </div>
                  <div className="text-gray-300 text-sm">
                    {config.type && `${config.type.unit} | 面积: ${((config.width * config.height) / 10000).toFixed(2)}m²`}
                  </div>
                  <div className="text-gray-400 text-xs mt-1">
                    *预估价仅供参考，如需详细报价请点击"获取详细报价"
                  </div>
                </div>
                <button
                  onClick={resetConfig}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                >
                  重置配置
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                      console.log('获取详细报价按钮被点击')
                      setShowWechatQR(true)
                    }}
                  className="px-8 py-3 bg-gradient-to-r from-primary-gold to-yellow-500 text-primary-dark font-bold rounded-full hover:shadow-lg transition-all duration-300"
                >
                  获取详细报价
                </button>
                <div className="text-gray-300 text-sm">
                  或致电: <span className="text-primary-gold font-semibold">136-3666-1988</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 微信二维码弹窗 */}
      <AnimatePresence>
        {showWechatQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowWechatQR(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">扫码获取详细报价</h3>
              <div className="bg-gray-100 rounded-xl p-4 mb-4">
                <img 
                  src={getImagePath("/images/wechat-qr.jpg")} 
                  alt="微信二维码" 
                  className="w-48 h-48 mx-auto object-cover rounded-lg"
                />
              </div>
              <p className="text-gray-600 mb-2">扫描上方二维码添加微信</p>
              <p className="text-primary-gold font-semibold mb-4">或致电：136-3666-1988</p>
              <button
                onClick={() => setShowWechatQR(false)}
                className="w-full py-3 bg-primary-gold text-white rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
              >
                关闭
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 联系表单弹窗 */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowContactForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg p-6 w-full max-w-md"
            >
              <h3 className="text-xl font-bold text-primary-dark mb-4">获取详细报价</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="您的姓名"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-primary-gold focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="联系电话"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-primary-gold focus:outline-none"
                />
                <textarea
                  placeholder="备注信息（可选）"
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-primary-gold focus:outline-none resize-none"
                ></textarea>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    取消
                  </button>
                  <button
                    onClick={() => {
                      alert('感谢您的咨询！我们将在24小时内联系您。')
                      setShowContactForm(false)
                    }}
                    className="flex-1 py-3 bg-primary-gold text-primary-dark font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
                  >
                    提交
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pb-24">
        <Footer />
      </div>
    </div>
  )
}

export default QuotePage