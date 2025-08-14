'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { getImagePath } from '@/utils/pathUtils'

interface CaseStudy {
  id: number
  title: string
  location: string
  type: string
  area: string
  year: string
  image: string
  description: string
  features: string[]
  region: string
}

const CaseStudies = () => {
  const [selectedType, setSelectedType] = useState('全部')
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null)
  const [showWeChatModal, setShowWeChatModal] = useState(false)
  const [modalPosition, setModalPosition] = useState({ top: 0, behavior: 'center' as 'center' | 'top' | 'bottom' })
  const [showMore, setShowMore] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const types = ['全部', '别墅', '酒店', '商业体', '公共建筑', '幕墙']

  const cases: CaseStudy[] = [
    {
      id: 1,
      title: '希姆科技（上海）生产基地及辅助用房幕墙工程',
      location: '松江区新桥镇',
      type: '公共建筑',
      area: '7489万',
      year: '2024',
      image: getImagePath('/images/幕墙.jpg'),
      description: '本次工程涵盖幕墙、栏杆和轻钢外包铝板雨棚制作安装，总面积达7489万平方米。项目采用现代化幕墙技术，确保建筑外观美观的同时提供优异的保温隔热性能。',
      features: ['幕墙系统', '栏杆安装', '轻钢外包铝板雨棚', '大面积施工'],
      region: '上海'
    },
    {
      id: 2,
      title: '新华御府',
      location: '金山区核心区域',
      type: '别墅',
      area: '待定',
      year: '2024',
      image: getImagePath('/images/别墅.jpg'),
      description: '新华御府位于金山区的核心区域，坐拥优越的地理位置和丰富的周边配套。项目以打造低密、改善、纯粹的高端居住社区为目标。新华御府的户型设计多样，包括洋房、别墅等，每一种户型都力求在空间布局、功能分区和居住体验上达到最佳。',
      features: ['低密度社区', '高端居住', '多样化户型', '优越地理位置', '丰富配套设施'],
      region: '上海'
    },
    {
      id: 3,
      title: '珑竣房地产开发项目',
      location: '上海市青浦区华新镇新府中路、华志路',
      type: '商业体',
      area: '9835.71平方米',
      year: '2024',
      image: getImagePath('/images/珑竣房地产.jpg'),
      description: '上海珑竣房地产开发有限公司开发的大型商业项目，位于青浦区华新镇核心地段。项目门窗面积达9835.71平方米，合同价6321222.8元，目前正在施工建设中。',
      features: ['大型商业项目', '核心地段', '在建项目', '专业门窗系统'],
      region: '上海'
    },
    {
      id: 4,
      title: '太仓金科旭辉悦章项目一期铝合金门窗工程',
      location: '江苏省苏州市太仓市科教新城东仓新路东、桴亭路南',
      type: '商业体',
      area: '10031.57平方米',
      year: '2024',
      image: getImagePath('/images/太仓.jpg'),
      description: '太仓兴裕置业有限公司开发的大型住宅项目，位于太仓市科教新城核心区域。项目门窗面积达10031.57平方米，合同价3783941.42元，采用高品质铝合金门窗系统，目前正在施工建设中。',
      features: ['大型住宅项目', '科教新城', '铝合金门窗', '在建项目'],
      region: '江苏'
    },
    {
      id: 5,
      title: '合肥市新站区XZQTD238号地块一期门窗及百叶工程',
      location: '安徽省合肥市新站区毕升路与学林路交叉口',
      type: '商业体',
      area: '35000平方米',
      year: '2024',
      image: getImagePath('/images/合肥.jpg'),
      description: '合肥昌恩房地产开发有限公司开发的大型项目，位于合肥市新站区核心地段。项目门窗面积达35000平方米，合同价13830281.72元，包含门窗及百叶工程，项目已完工交付。',
      features: ['大型项目', '门窗百叶工程', '已完工', '核心地段'],
      region: '安徽'
    },
    {
      id: 6,
      title: '新城悦都会项目1-3、3A、5、20-21号楼门窗百叶工程',
      location: '江西省上饶市上饶县武夷山大道29号',
      type: '商业体',
      area: '23147.14平方米',
      year: '2024',
      image: getImagePath('/images/江西.jpg'),
      description: '上饶市悦盛房地产开发有限公司开发的新城悦都会项目，位于上饶县武夷山大道核心位置。项目门窗面积达23147.14平方米，合同价9380000元，包含多栋楼宇的门窗百叶工程，项目已完工交付。',
      features: ['多栋楼宇', '门窗百叶工程', '已完工', '核心位置'],
      region: '江西'
    },
    {
      id: 7,
      title: '衣念（上海）时装贸易有限公司新建厂房门窗专业分包工程',
      location: '上海市闵行区莲花南路3110号',
      type: '商业体',
      area: '24600平方米',
      year: '2024',
      image: getImagePath('/images/上海.jpg'),
      description: '衣念（上海）时装贸易有限公司新建厂房项目，位于上海市闵行区莲花南路。项目门窗面积达24600平方米，合同价13915313.66元，专业门窗分包工程，目前正在施工建设中。',
      features: ['新建厂房', '专业分包', '在建项目', '大型工程'],
      region: '上海'
    },
    {
      id: 8,
      title: '锦绣华城15地块三期（一标段）石材幕墙维修工程',
      location: '上海市浦东新区成山路1850弄',
      type: '幕墙',
      area: '20000平方米',
      year: '2024',
      image: getImagePath('/images/浦东.png'),
      description: '上海锦绣华城房地产开发有限公司开发的锦绣华城15地块三期项目，位于上海市浦东新区成山路。项目幕墙面积达20000平方米，合同价19335749元，专业石材幕墙维修工程，目前正在施工建设中。',
      features: ['石材幕墙', '维修工程', '在建项目', '浦东新区'],
      region: '上海'
    },
    {
      id: 9,
      title: '华一大厦外立面改造工程',
      location: '上海市闵行区莲花路1555号',
      type: '幕墙',
      area: '7400平方米',
      year: '2024',
      image: getImagePath('/images/闵行区.jpg'),
      description: '华一大厦外立面改造工程，位于上海市闵行区莲花路1555号，由上海华一实业公司建设。幕墙面积7400平方米，合同价5000000元，目前施工状态为在建。',
      features: ['外立面改造', '现代化设计', '节能环保', '专业施工'],
      region: '上海'
    },
    {
      id: 10,
      title: '中国银行安徽省分行黄山培训中心项目',
      location: '安徽省黄山市',
      type: '幕墙',
      area: '6.6万平方米',
      year: '2024',
      image: getImagePath('/images/安徽.jpg'),
      description: '中国银行安徽省分行黄山培训中心项目，位于安徽省黄山市，由中国银行安徽省分行建设，合肥工业大学建筑设计研究院设计。建筑高度25.17米，幕墙面积6.6万平方米，屋面1.6万平方米。',
      features: ['大型培训中心', '现代化设计', '高品质幕墙', '专业施工'],
      region: '安徽'
    },
    {
      id: 11,
      title: '中国湖州喜来登温泉度假酒店玻璃幕墙工程',
      location: '浙江省湖州市',
      type: '幕墙',
      area: '3万平方米',
      year: '2024',
      image: getImagePath('/images/幕墙 (2).jpg'),
      description: '中国湖州喜来登温泉度假酒店玻璃幕墙工程，位于浙江省湖州市，由湖州喜来登温泉度假酒店有限公司建设，上海现代建筑设计（集团）有限公司设计。建筑高度108.6米，幕墙面积3万平方米，主要幕墙类型为框架式玻璃幕墙系统、铝板幕墙系统。',
      features: ['五星级酒店', '框架式玻璃幕墙', '铝板幕墙系统', '高端设计'],
      region: '浙江'
    },
    {
      id: 12,
      title: '重庆涪陵北站',
      location: '重庆市涪陵区',
      type: '幕墙',
      area: '1.9万平方米',
      year: '2024',
      image: getImagePath('/images/重庆.jpg'),
      description: '重庆涪陵北站项目，位于重庆市涪陵区，由中铁电气化局集团有限公司建设。建筑高度35.3米，幕墙面积1.9万平方米，幕墙类型包括玻璃幕墙系统、铝板幕墙系统、石材幕墙系统。',
      features: ['交通枢纽', '玻璃幕墙系统', '铝板幕墙系统', '石材幕墙系统'],
      region: '重庆'
    },
    {
      id: 13,
      title: '上海市长宁区71街坊31/2丘地块办公楼项目外立面',
      location: '上海市长宁区',
      type: '幕墙',
      area: '2.5万平方米',
      year: '2023',
      image: getImagePath('/images/上海2.jpg'),
      description: '上海市长宁区71街坊31/2丘地块办公楼项目是一座现代化的高层办公建筑，采用了多种幕墙系统。',
      features: ['建设单位：上海市万博房地产开发有限公司', '建筑设计：地建筑事务所(国际）', '建筑高度：108.6米', '幕墙面积：2.5万平方米', '主要幕墙类型：框架式玻璃幕墙系统、石材幕墙系统、铝板幕墙系统'],
      region: '上海'
    },
    {
      id: 14,
      title: '杭州天际大厦',
      location: '浙江省杭州市',
      type: '幕墙',
      area: '2.3万平方米',
      year: '2023',
      image: getImagePath('/images/杭州.jpg'),
      description: '杭州天际大厦是一座现代化的高层建筑，采用了先进的幕墙技术和设计理念。',
      features: ['建设单位：浙江纵横公路综合服务有限公司', '建筑设计：美国PJAR设计公司；杭州市建筑设计研究院有限公司', '建筑高度：80米', '幕墙面积：2.3万平方米', '主要幕墙类型：框架式玻璃幕墙系统、石材幕墙系统'],
      region: '浙江'
    },
    {
      id: 15,
      title: '杭州市杭州来福士广场项目',
      location: '杭州市',
      type: '幕墙',
      area: '10万平方米',
      year: '2023',
      image: getImagePath('/images/杭州来福士.jpg'),
      description: '杭州来福士广场项目是一座超高层综合性建筑，采用了多种复合型幕墙系统。',
      features: ['建设单位：来福士（杭州）房地产开发有限公司', '建筑设计：中国联合工程有限公司', '建筑高度：249.9米', '幕墙面积：10万平方米', '主要幕墙类型：单元式隐框玻璃幕墙系统、框架式采光顶玻璃幕墙系统、挂式铝板幕墙系统、复合型幕墙（不锈钢网、玻璃、铝合金格栅）'],
      region: '浙江'
    },
    {
      id: 16,
      title: '尚能研发大楼及康乐中心PV幕墙工程',
      location: '江苏省无锡市',
      type: '幕墙',
      area: '1.6万平方米',
      year: '2023',
      image: getImagePath('/images/幕墙3.jpg'),
      description: '尚能研发大楼及康乐中心PV幕墙工程是一座绿色节能建筑，采用了先进的光伏玻璃幕墙技术。',
      features: ['建设单位：尚能太阳能电力有限公司', '建筑高度：37米', '幕墙面积：1.6万平方米', '主要幕墙类型：光伏玻璃幕墙'],
      region: '江苏'
    },
    {
      id: 17,
      title: '新城国际三期D楼幕墙工程',
      location: '安徽省合肥市',
      type: '幕墙',
      area: '6.2万平方米',
      year: '2023',
      image: getImagePath('/images/幕墙05.jpg'),
      description: '新城国际三期D楼幕墙工程是一座超高层建筑，采用了多种幕墙系统的综合应用。',
      features: ['建设单位：安徽基石置业有限公司', '建筑设计：中国建筑科学研究院、中国建筑技术集团有限公司', '建筑高度：206米', '幕墙面积：6.2万平方米', '主要幕墙类型：单元式玻璃幕墙系统、石材幕墙系统、框架式玻璃幕墙系统'],
      region: '安徽'
    },
    {
      id: 18,
      title: '央央春天项目1及裙房幕墙工程',
      location: '江西省南昌市',
      type: '幕墙',
      area: '3.4万平方米',
      year: '2023',
      image: getImagePath('/images/幕墙06.jpg'),
      description: '央央春天项目1及裙房幕墙工程是一座现代化高层建筑，采用了多种幕墙系统的组合设计。',
      features: ['建设单位：江西省投资房地产开发有限公司', '建筑设计：城脉建筑设计(深圳)有限公司', '建筑高度：199.9米', '幕墙面积：3.4万平方米', '主要幕墙类型：单元式玻璃幕墙系统、框架式玻璃幕墙系统、陶板幕墙系统、石材幕墙系统'],
      region: '江西'
    },
    {
      id: 19,
      title: '英特宜家无锡购物中心幕墙工程',
      location: '江苏省无锡市',
      type: '幕墙',
      area: '8万平方米',
      year: '2023',
      image: getImagePath('/images/无锡.jpg'),
      description: '英特宜家无锡购物中心幕墙工程是一座大型商业建筑，采用了多种先进的幕墙系统技术。',
      features: ['建设单位：英特宜家购物中心(中国)管理有限公司', '建筑设计：B+H建筑师事务所、同济大学建筑设计研究院（集团）有限公司', '建筑高度：31.025米', '幕墙面积：8万平方米', '主要幕墙类型：构件式玻璃幕墙系统、点支式玻璃幕墙系统、铝板幕墙系统、锌板幕墙系统、构件式铝网幕墙系统'],
      region: '江苏'
    }
  ]

  const filteredCases = cases.filter(caseItem => {
    const typeMatch = selectedType === '全部' || caseItem.type === selectedType
    return typeMatch
  })

  return (
    <div className="max-w-7xl mx-auto">
      {/* 筛选器 */}
      <div className="mb-16">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-primary-dark mb-2">按建筑类型筛选</h3>
          <p className="text-gray-600 mb-8">选择您感兴趣的建筑类型，查看相关工程案例</p>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {types.map((type) => (
              <motion.button
                key={type}
                onClick={() => setSelectedType(type)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-md ${
                  selectedType === type
                    ? 'bg-primary-gold text-primary-dark shadow-lg transform scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:shadow-lg'
                }`}
              >
                {type}
              </motion.button>
            ))}
          </div>
          
          {/* 筛选结果统计 */}
          <div className="mt-6">
            <span className="text-sm text-gray-500">
              共找到 <span className="font-semibold text-primary-gold">{filteredCases.length}</span> 个相关案例
            </span>
          </div>
        </div>
      </div>

      {/* 案例网格 */}
      <AnimatePresence mode="wait">
        <motion.div
          ref={containerRef}
          key={selectedType}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >          {(showMore ? filteredCases : filteredCases.slice(0, 6)).map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
              onClick={(e) => {
                 const rect = e.currentTarget.getBoundingClientRect()
                 const viewportHeight = window.innerHeight
                 const cardCenter = rect.top + rect.height / 2
                 
                 let position = { top: 0, behavior: 'center' as 'center' | 'top' | 'bottom' }
                 
                 // 如果卡片中心在视口上1/3，弹窗向下对齐
                 if (cardCenter < viewportHeight * 0.33) {
                   position = { top: 0, behavior: 'top' }
                 }
                 // 如果卡片中心在视口下1/3，弹窗向上对齐
                 else if (cardCenter > viewportHeight * 0.67) {
                   position = { top: 0, behavior: 'bottom' }
                 }
                 // 否则居中显示
                 else {
                   position = { top: 0, behavior: 'center' }
                 }
                 
                 setModalPosition(position)
                 setSelectedCase(caseItem)
               }}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={caseItem.image}
                  alt={caseItem.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="bg-primary-gold text-primary-dark px-3 py-1 rounded-full text-sm font-semibold">
                    {caseItem.type}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{caseItem.title}</h3>
                  <p className="text-sm opacity-90">{caseItem.location}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500">建筑面积</span>
                    <div className="font-semibold text-primary-dark">{caseItem.area}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">完工年份</span>
                    <div className="font-semibold text-primary-dark">{caseItem.year}</div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{caseItem.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {caseItem.features.slice(0, 3).map((feature) => (
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

      {/* 显示更多按钮 */}
      {filteredCases.length > 6 && (
        <div className="flex justify-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMore(!showMore)}
            className="bg-primary-gold text-primary-dark px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg"
          >
            {showMore ? '收起' : '显示更多'}
          </motion.button>
        </div>
      )}

      {/* 案例详情弹窗 */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
             style={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: modalPosition.behavior === 'center' ? 'center' : 
                          modalPosition.behavior === 'top' ? 'flex-start' : 'flex-end',
               paddingTop: modalPosition.behavior === 'center' ? '20px' : '40px',
               paddingBottom: modalPosition.behavior === 'center' ? '20px' : '40px',
               paddingLeft: '20px',
               paddingRight: '20px'
             }}
            onClick={() => setSelectedCase(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              style={{
                marginTop: modalPosition.behavior === 'top' ? '0px' : 
                          modalPosition.behavior === 'bottom' ? '0px' : '0'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={() => setSelectedCase(null)}
                  className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* 项目图片 */}
                <div className="relative h-96 overflow-hidden">
                  <Image
                    src={selectedCase.image}
                    alt={selectedCase.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-3xl font-bold text-primary-dark mb-4">{selectedCase.title}</h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <span className="text-gray-500">项目位置</span>
                        <div className="font-semibold text-primary-dark">{selectedCase.location}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">建筑类型</span>
                        <div className="font-semibold text-primary-dark">{selectedCase.type}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">建筑面积</span>
                        <div className="font-semibold text-primary-dark">{selectedCase.area}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">完工年份</span>
                        <div className="font-semibold text-primary-dark">{selectedCase.year}</div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">{selectedCase.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-primary-dark mb-4">项目特色</h3>
                    <div className="space-y-3">
                      {selectedCase.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-primary-gold rounded-full" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8">
                      <button 
                        onClick={() => setShowWeChatModal(true)}
                        className="w-full bg-primary-gold hover:bg-yellow-600 text-primary-dark py-3 rounded-lg font-semibold transition-colors cursor-pointer"
                      >
                        获取类似方案
                      </button>
                    </div>
                  </div>
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CaseStudies