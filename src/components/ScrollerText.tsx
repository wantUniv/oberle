'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface ScrollerTextProps {
  content: string
  speed?: number
  direction?: 'left' | 'right'
}

const ScrollerText = ({ content, speed = 50, direction = 'left' }: ScrollerTextProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!scrollerRef.current || !textRef.current) return

    const scroller = scrollerRef.current
    const text = textRef.current
    
    // 复制文本以实现无缝循环
    const textContent = text.innerHTML
    text.innerHTML = textContent + ' ' + textContent + ' ' + textContent

    // 获取文本宽度
    const textWidth = text.scrollWidth / 3
    
    // 设置动画
    const animation = gsap.to(text, {
      x: direction === 'left' ? -textWidth : textWidth,
      duration: textWidth / speed,
      ease: 'none',
      repeat: -1,
    })

    return () => {
      animation.kill()
    }
  }, [content, speed, direction])

  return (
    <div 
      ref={scrollerRef}
      className="relative overflow-hidden whitespace-nowrap bg-primary-dark text-primary-gold py-3"
    >
      <div 
        ref={textRef}
        className="inline-block text-lg md:text-xl font-semibold tracking-wider"
      >
        {content}
      </div>
      
      {/* 渐变边缘效果 */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-primary-dark to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-primary-dark to-transparent pointer-events-none" />
    </div>
  )
}

export default ScrollerText