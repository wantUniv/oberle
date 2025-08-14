import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '欧伯乐系统门窗 - 江西卢博建材科技有限公司',
  description: '欧伯乐系统门窗，德国工艺，航空级铝材，抗风压等级≥9级，为您打造高端门窗解决方案',
  keywords: '欧伯乐,系统门窗,铝合金门窗,断桥铝,江西卢博建材,高端门窗',
  authors: [{ name: '江西卢博建材科技有限公司' }],
  robots: 'index, follow',
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://yourusername.github.io/Oberle03-github' : 'http://localhost:3000'),
  openGraph: {
    title: '欧伯乐系统门窗 - 德国工艺 航空级品质',
    description: '抗风压等级≥9级 | 水密性6级 | 气密性8级 | 隔声量Rw≥42dB',
    type: 'website',
    locale: 'zh_CN',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} max-w-full overflow-x-hidden text-primary-dark bg-neutral-light`} suppressHydrationWarning>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}