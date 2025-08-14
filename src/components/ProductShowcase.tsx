'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { getImagePath } from '@/utils/pathUtils'

interface Product {
  id: number
  category: string
  title: string
  description: string
  image: string
  specs: {
    [key: string]: string
  }
  features: string[]
}

const ProductShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('平开窗')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showWeChatModal, setShowWeChatModal] = useState(false)

  const categories = ['平开窗', '推拉门', '阳光房', '幕墙']

  const products: Product[] = [
    {
      id: 1,
      category: '平开窗',
      title: 'OBL-70系列外平开窗',
      description: '70mm经典型材设计，外开式结构，适用于住宅和商业建筑',
      image: getImagePath('/images/70系列外平开窗.jpg'),
      specs: {
        'U值': '1.5W/(㎡·K)',
        '型材厚度': '1.8mm',
        '抗风压': '≥7级',
        '水密性': '5级',
        '气密性': '6级'
      },
      features: ['外开设计', '经济实用', '安装便捷', '维护简单']
    },
    {
      id: 2,
      category: '平开窗',
      title: 'OBL-75系列外平开窗',
      description: '75mm型材设计，外开式结构，节省室内空间，适用于多种建筑',
      image: getImagePath('/images/75系列外平开窗.jpg'),
      specs: {
        'U值': '1.4W/(㎡·K)',
        '型材厚度': '2.0mm',
        '抗风压': '≥8级',
        '水密性': '5级',
        '气密性': '7级'
      },
      features: ['外开设计', '节省空间', '经典造型', '稳定可靠']
    },
    {
      id: 11,
      category: '平开窗',
      title: 'OBL-108系列平开窗',
      description: '采用108mm宽型材设计，多腔体密封结构，适用于高层建筑',
      image: getImagePath('/images/casement-window-1.jpg'),
      specs: {
        'U值': '1.2W/(㎡·K)',
        '型材厚度': '2.0mm',
        '抗风压': '≥9级',
        '水密性': '6级',
        '气密性': '8级'
      },
      features: ['多腔密封', '45°转角工艺', '隐藏式排水', '多点锁闭']
    },
    {
      id: 3,
      category: '推拉门',
      title: 'OBL-80系列推拉门',
      description: '80mm经典型材设计，轻便灵活，适用于室内外各种场景',
      image: getImagePath('/images/80系列推拉门.jpg'),
      specs: {
        'U值': '2.0W/(㎡·K)',
        '型材厚度': '1.8mm',
        '抗风压': '≥6级',
        '水密性': '4级',
        '气密性': '5级'
      },
      features: ['轻便推拉', '经济实用', '安装简便', '维护方便']
    },
    {
      id: 4,
      category: '推拉门',
      title: 'OBL-108系列推拉门',
      description: '108mm宽型材，增强型推拉系统，适用于大开口应用',
      image: getImagePath('/images/108系列推拉门.jpg'),
      specs: {
        'U值': '1.8W/(㎡·K)',
        '型材厚度': '2.0mm',
        '抗风压': '≥7级',
        '水密性': '5级',
        '气密性': '6级'
      },
      features: ['大开口设计', '静音滑轨', '防脱落设计', '多重密封']
    },
    {
      id: 14,
      category: '推拉门',
      title: 'OBL-138系列推拉门',
      description: '138mm超大型材，超大开启面积，适用于阳台和露台',
      image: getImagePath('/images/sliding-door-1.jpg'),
      specs: {
        'U值': '1.8W/(㎡·K)',
        '型材厚度': '2.0mm',
        '抗风压': '≥7级',
        '水密性': '5级',
        '气密性': '6级'
      },
      features: ['超大开启', '静音滑轨', '防脱落设计', '多重密封']
    },
    {
      id: 15,
      category: '推拉门',
      title: 'OBL-168系列推拉门',
      description: '168mm宽型材，重型推拉系统，适用于大型开口',
      image: getImagePath('/images/sliding-door-2.jpg'),
      specs: {
        'U值': '1.6W/(㎡·K)',
        '型材厚度': '2.5mm',
        '抗风压': '≥8级',
        '水密性': '6级',
        '气密性': '7级'
      },
      features: ['重型系统', '承重能力强', '超静音', '防风设计']
    },
    {
      id: 16,
      category: '推拉门',
      title: 'OBL-180系列推拉门',
      description: '180mm宽框设计，大开启面积，适用于阳台客厅连接',
      image: getImagePath('/images/sliding-door-3.jpg'),
      specs: {
        'U值': '1.4W/(㎡·K)',
        '型材厚度': '2.0mm',
        '最大开启': '3000mm',
        '承重能力': '150kg/扇'
      },
      features: ['静音滑轨', '防脱落设计', '可拆卸纱窗', '缓冲关闭']
    },
    {
      id: 5,
      category: '推拉门',
      title: 'OBL-125系列推拉门',
      description: '125mm型材厚度，增强保温性能，适用于高端住宅',
      image: '/images/sliding-door-2.jpg',
      specs: {
        'U值': '1.2W/(㎡·K)',
        '型材厚度': '2.5mm',
        '最大开启': '3500mm',
        '承重能力': '180kg/扇'
      },
      features: ['增强保温', '重型滑轨', '防风锁扣', '智能缓冲']
    },

    {
      id: 21,
      category: '阳光房',
      title: 'OBL-阳光房系统',
      description: '模块化设计，可定制各种造型，打造专属休闲空间',
      image: getImagePath('/images/sunroom-1.jpg'),
      specs: {
        '雪载荷': '≥1.0kN/㎡',
        '风载荷': '≥2.5kN/㎡',
        '玻璃规格': '6+12A+6mm',
        '排水系统': '内排水'
      },
      features: ['模块化组装', '智能遮阳', '通风系统', '防水设计']
    },
    {
      id: 5,
      category: '阳光房',
      title: 'OBL-100系列阳光房',
      description: '100mm型材框架，现代简约设计，适合各种户型的阳光房解决方案',
      image: getImagePath('/images/100系列阳光房.jpg'),
      specs: {
        '框架材质': '100mm铝合金型材',
        '玻璃配置': '6+12A+6中空钢化玻璃',
        '排水系统': '隐藏式排水槽',
        '密封系统': '三元乙丙密封胶条'
      },
      features: ['现代简约', '结构稳固', '采光优良', '性价比高']
    },
    {
      id: 6,
      category: '阳光房',
      title: 'OBL-豪华阳光房',
      description: '高端定制阳光房，采用大跨度钢结构，营造宽敞明亮空间',
      image: getImagePath('/images/sunroom-2.jpg'),
      specs: {
        '雪载荷': '≥1.5kN/㎡',
        '风载荷': '≥3.0kN/㎡',
        '玻璃规格': '8+16A+8mm',
        '排水系统': '双重排水'
      },
      features: ['大跨度设计', '豪华装饰', '智能控制', '全景视野']
    },
    {
      id: 17,
      category: '阳光房',
      title: 'OBL-标准阳光房',
      description: '经典阳光房设计，优质材料配置，为您打造温馨的室外空间',
      image: getImagePath('/images/阳光房.jpg'),
      specs: {
        '框架材质': '铝合金型材',
        '玻璃配置': '中空钢化玻璃',
        '排水系统': '隐藏式排水',
        '密封系统': '三元乙丙胶条'
      },
      features: ['经济实用', '安装快捷', '维护简单', '造型美观']
    },
    {
      id: 18,
      category: '阳光房',
      title: 'OBL-精装阳光房',
      description: '精装版阳光房，高端配置，智能化控制系统，享受品质生活',
      image: getImagePath('/images/阳光房1.jpg'),
      specs: {
        '框架材质': '高强度铝合金+钢结构',
        '玻璃配置': '夹胶中空LOW-E玻璃',
        '遮阳系统': '电动天棚帘',
        '通风系统': '电动开窗器'
      },
      features: ['智能控制', '高端配置', '全景视野', '四季适用']
    },
    {
      id: 10,
      category: '幕墙',
      title: 'OBL-现代玻璃幕墙',
      description: '现代简约设计，大面积玻璃应用，展现建筑的现代美感',
      image: getImagePath('/images/幕墙3.jpg'),
      specs: {
        '系统类型': '框架幕墙系统',
        '玻璃厚度': '8+12A+8mm',
        '铝材厚度': '4.0mm',
        '抗风压': '≥4.5kPa'
      },
      features: ['现代设计', '大面积玻璃', '结构稳固', '视觉通透']
    },
    {
      id: 19,
      category: '幕墙',
      title: 'OBL-商业幕墙系统',
      description: '专业商业幕墙解决方案，适用于办公楼、商场等大型建筑',
      image: getImagePath('/images/幕墙05.jpg'),
      specs: {
        '系统类型': '单元式幕墙',
        '玻璃厚度': '6+12A+6mm',
        '铝材厚度': '3.5mm',
        '抗风压': '≥4.0kPa'
      },
      features: ['单元化安装', '施工快速', '密封可靠', '维护便捷']
    },
    {
      id: 20,
      category: '幕墙',
      title: 'OBL-高端幕墙系统',
      description: '高端幕墙系统，采用先进工艺，适用于地标性建筑项目',
      image: getImagePath('/images/幕墙06.jpg'),
      specs: {
        '系统类型': '隐框幕墙系统',
        '玻璃厚度': '10+16A+10mm',
        '铝材厚度': '5.0mm',
        '抗风压': '≥5.0kPa'
      },
      features: ['隐框设计', '高端配置', '结构胶固定', '防水优异']
    }
  ]

  const filteredProducts = products.filter(product => product.category === activeCategory)

  return (
    <div className="max-w-7xl mx-auto">
      {/* 分类选择器 */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeCategory === category
                ? 'bg-primary-gold text-primary-dark shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* 产品网格 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{product.title}</h3>
                  <p className="text-sm opacity-90">{product.category}</p>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-sm text-gray-500">{key}</div>
                      <div className="font-semibold text-primary-dark">{value}</div>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {product.features.slice(0, 3).map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-neutral-gray text-sm text-gray-600 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* 产品详情弹窗 */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-80">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-8">
                <h2 className="text-3xl font-bold text-primary-dark mb-4">{selectedProduct.title}</h2>
                <p className="text-gray-600 mb-6 text-lg">{selectedProduct.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-primary-dark mb-4">技术参数</h3>
                    <div className="space-y-3">
                      {Object.entries(selectedProduct.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600">{key}</span>
                          <span className="font-semibold text-primary-dark">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-primary-dark mb-4">产品特色</h3>
                    <div className="space-y-3">
                      {selectedProduct.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-primary-gold rounded-full" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex gap-4">
                  <button 
                    onClick={() => setShowWeChatModal(true)}
                    className="flex-1 bg-primary-gold hover:bg-yellow-600 text-primary-dark py-3 rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    获取报价
                  </button>
                  <button 
                    onClick={() => setShowWeChatModal(true)}
                    className="flex-1 border-2 border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-white py-3 rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    技术咨询
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 微信二维码弹窗 */}
      <AnimatePresence>
        {showWeChatModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowWeChatModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary-dark mb-4">
                  联系我们
                </h3>
                <p className="text-gray-600 mb-6">
                  扫描二维码添加微信咨询
                </p>
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <Image
                    src={getImagePath("/images/wechat-qr.jpg")}
                    alt="微信二维码"
                    width={200}
                    height={200}
                    className="mx-auto rounded-lg"
                  />
                </div>
                <button
                  onClick={() => setShowWeChatModal(false)}
                  className="w-full bg-primary-gold hover:bg-yellow-600 text-primary-dark py-3 rounded-lg font-semibold transition-colors"
                >
                  关闭
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProductShowcase