import priceConfig from '@/data/priceConfig.json'

export interface QuoteConfig {
  type: typeof priceConfig.windowTypes[0] | null
  profile: typeof priceConfig.profiles[0] | null
  width: number
  height: number
  glass: typeof priceConfig.glassOptions[0] | null
  hardware: typeof priceConfig.hardwareOptions[0] | null
  openings: number
}

export interface QuoteResult {
  basePrice: number
  profileUpgrade: number
  glassUpgrade: number
  hardwareUpgrade: number
  openingCost: number
  subtotal: number
  tax: number
  total: number
  area: number
  pricePerSqm: number
  isValid: boolean
  errors: string[]
}

export class QuoteCalculator {
  private config: QuoteConfig
  private rules = priceConfig.priceRules

  constructor(config: QuoteConfig) {
    this.config = config
  }

  // 验证配置
  private validateConfig(): string[] {
    const errors: string[] = []

    if (!this.config.type) {
      errors.push('请选择门窗类型')
    }

    if (!this.config.profile) {
      errors.push('请选择型材系列')
    }

    if (!this.config.glass) {
      errors.push('请选择玻璃配置')
    }

    if (!this.config.hardware) {
      errors.push('请选择五金配件')
    }

    // 尺寸验证
    if (this.config.width < this.rules.minWidth || this.config.width > this.rules.maxWidth) {
      errors.push(`宽度必须在${this.rules.minWidth}-${this.rules.maxWidth}cm之间`)
    }

    if (this.config.height < this.rules.minHeight || this.config.height > this.rules.maxHeight) {
      errors.push(`高度必须在${this.rules.minHeight}-${this.rules.maxHeight}cm之间`)
    }

    // 面积验证
    const area = this.calculateArea()
    if (area < this.rules.minArea || area > this.rules.maxArea) {
      errors.push(`面积必须在${this.rules.minArea}-${this.rules.maxArea}m²之间`)
    }

    // 开扇数量验证
    if (this.config.openings < 1 || this.config.openings > 6) {
      errors.push('开扇数量必须在1-6扇之间')
    }

    return errors
  }

  // 计算面积
  private calculateArea(): number {
    return (this.config.width * this.config.height) / 10000 // cm²转m²
  }

  // 计算基础价格
  private calculateBasePrice(): number {
    if (!this.config.type || !this.config.profile) return 0
    
    const area = this.calculateArea()
    return this.config.type.basePrice * area
  }

  // 计算型材升级费用
  private calculateProfileUpgrade(): number {
    if (!this.config.profile) return 0
    
    const basePrice = this.calculateBasePrice()
    return basePrice * (this.config.profile.priceFactor - 1)
  }

  // 计算玻璃升级费用
  private calculateGlassUpgrade(): number {
    if (!this.config.glass) return 0
    
    const area = this.calculateArea()
    return this.config.glass.price * area
  }

  // 计算五金升级费用
  private calculateHardwareUpgrade(): number {
    if (!this.config.hardware) return 0
    
    return this.config.hardware.price
  }

  // 计算开扇费用
  private calculateOpeningCost(): number {
    if (this.config.openings <= 1) return 0
    
    return (this.config.openings - 1) * priceConfig.openingCost.additional
  }

  // 计算税费
  private calculateTax(subtotal: number): number {
    return subtotal * this.rules.taxRate
  }

  // 主计算方法
  calculate(): QuoteResult {
    const errors = this.validateConfig()
    const isValid = errors.length === 0

    if (!isValid) {
      return {
        basePrice: 0,
        profileUpgrade: 0,
        glassUpgrade: 0,
        hardwareUpgrade: 0,
        openingCost: 0,
        subtotal: 0,
        tax: 0,
        total: 0,
        area: this.calculateArea(),
        pricePerSqm: 0,
        isValid: false,
        errors
      }
    }

    const basePrice = this.calculateBasePrice()
    const profileUpgrade = this.calculateProfileUpgrade()
    const glassUpgrade = this.calculateGlassUpgrade()
    const hardwareUpgrade = this.calculateHardwareUpgrade()
    const openingCost = this.calculateOpeningCost()
    
    const subtotal = basePrice + profileUpgrade + glassUpgrade + hardwareUpgrade + openingCost
    const tax = this.calculateTax(subtotal)
    const total = subtotal + tax
    
    const area = this.calculateArea()
    const pricePerSqm = area > 0 ? total / area : 0

    return {
      basePrice: Math.round(basePrice),
      profileUpgrade: Math.round(profileUpgrade),
      glassUpgrade: Math.round(glassUpgrade),
      hardwareUpgrade: Math.round(hardwareUpgrade),
      openingCost: Math.round(openingCost),
      subtotal: Math.round(subtotal),
      tax: Math.round(tax),
      total: Math.round(total),
      area: Math.round(area * 100) / 100, // 保留2位小数
      pricePerSqm: Math.round(pricePerSqm),
      isValid: true,
      errors: []
    }
  }

  // 获取价格明细
  getPriceBreakdown(): Array<{label: string, amount: number, description?: string}> {
    const result = this.calculate()
    
    if (!result.isValid) return []

    const breakdown = []

    if (result.basePrice > 0) {
      breakdown.push({
        label: `${this.config.type?.name} - ${this.config.profile?.name}`,
        amount: result.basePrice + result.profileUpgrade,
        description: `${result.area}m² × ¥${Math.round((result.basePrice + result.profileUpgrade) / result.area)}/m²`
      })
    }

    if (result.glassUpgrade > 0) {
      breakdown.push({
        label: `${this.config.glass?.name}升级`,
        amount: result.glassUpgrade,
        description: `${result.area}m² × ¥${this.config.glass?.price}/m²`
      })
    }

    if (result.hardwareUpgrade > 0) {
      breakdown.push({
        label: `${this.config.hardware?.name}升级`,
        amount: result.hardwareUpgrade,
        description: '整套五金配件'
      })
    }

    if (result.openingCost > 0) {
      breakdown.push({
        label: '开扇费用',
        amount: result.openingCost,
        description: `${this.config.openings - 1}扇 × ¥${priceConfig.openingCost.additional}/扇`
      })
    }

    if (result.tax > 0) {
      breakdown.push({
        label: '税费',
        amount: result.tax,
        description: `${(this.rules.taxRate * 100).toFixed(1)}%`
      })
    }

    return breakdown
  }

  // 获取配置摘要
  getConfigSummary(): Array<{label: string, value: string}> {
    return [
      { label: '门窗类型', value: this.config.type?.name || '未选择' },
      { label: '型材系列', value: this.config.profile?.name || '未选择' },
      { label: '玻璃配置', value: this.config.glass?.name || '未选择' },
      { label: '五金配件', value: this.config.hardware?.name || '未选择' },
      { label: '尺寸规格', value: `${this.config.width}×${this.config.height}cm` },
      { label: '开扇数量', value: `${this.config.openings}扇` },
      { label: '总面积', value: `${this.calculateArea().toFixed(2)}m²` }
    ]
  }

  // 导出配置为JSON
  exportConfig(): string {
    return JSON.stringify({
      config: this.config,
      result: this.calculate(),
      breakdown: this.getPriceBreakdown(),
      summary: this.getConfigSummary(),
      timestamp: new Date().toISOString(),
      version: priceConfig.version
    }, null, 2)
  }

  // 从JSON导入配置
  static importConfig(jsonString: string): QuoteCalculator | null {
    try {
      const data = JSON.parse(jsonString)
      if (data.config) {
        return new QuoteCalculator(data.config)
      }
    } catch (e) {
      console.error('Failed to import config:', e)
    }
    return null
  }
}

// 工具函数
export const formatPrice = (price: number): string => {
  return `¥${price.toLocaleString()}`
}

export const formatArea = (area: number): string => {
  return `${area.toFixed(2)}m²`
}

export const getRecommendedConfig = (area: number): Partial<QuoteConfig> => {
  // 根据面积推荐配置
  if (area < 1) {
    return {
      profile: priceConfig.profiles[0], // 55系列
      glass: priceConfig.glassOptions[1], // 双层中空
      hardware: priceConfig.hardwareOptions[0] // 标准五金
    }
  } else if (area < 3) {
    return {
      profile: priceConfig.profiles[1], // 70系列
      glass: priceConfig.glassOptions[1], // 双层中空
      hardware: priceConfig.hardwareOptions[1] // 进口五金
    }
  } else {
    return {
      profile: priceConfig.profiles[2], // 80系列
      glass: priceConfig.glassOptions[2], // 三玻两腔
      hardware: priceConfig.hardwareOptions[1] // 进口五金
    }
  }
}

export default QuoteCalculator