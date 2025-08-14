import NewsDetailClient from './NewsDetailClient'

// 生成静态参数用于静态导出
export async function generateStaticParams() {
  // 这里定义所有可能的新闻ID
  // 在实际项目中，这些ID应该从API或数据库获取
  const newsIds = [
    '1', '2', '3', '4', '5',
    'policy-2025', 'tech-trend-2025', 'market-data-2025'
  ]
  
  return newsIds.map((id) => ({
    id: id,
  }))
}

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  return <NewsDetailClient params={params} />
}