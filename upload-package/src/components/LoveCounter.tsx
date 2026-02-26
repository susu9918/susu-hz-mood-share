'use client'

import { useState, useEffect } from 'react'
import { Heart, Calendar, Clock } from 'lucide-react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function LoveCounter() {
  const [timeTogether, setTimeTogether] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [totalDays, setTotalDays] = useState(0)

  useEffect(() => {
    // 纪念日：2025年7月18日
    const anniversaryDate = new Date('2025-07-18T00:00:00')
    
    const updateTime = () => {
      const now = new Date()
      const diff = now.getTime() - anniversaryDate.getTime()
      
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        
        setTimeTogether({ days, hours, minutes, seconds })
        setTotalDays(days)
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const getNextAnniversary = () => {
    const currentYear = new Date().getFullYear()
    let nextAnniversary = new Date(currentYear, 6, 18) // 7月18日
    
    if (nextAnniversary < new Date()) {
      nextAnniversary = new Date(currentYear + 1, 6, 18)
    }
    
    const diff = nextAnniversary.getTime() - new Date().getTime()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    
    return days
  }

  const getMilestoneMessage = () => {
    if (totalDays >= 365) {
      const years = Math.floor(totalDays / 365)
      const remainingDays = totalDays % 365
      return `${years}年${remainingDays}天`
    } else if (totalDays >= 100) {
      return `${totalDays}天`
    } else if (totalDays >= 30) {
      const months = Math.floor(totalDays / 30)
      const remainingDays = totalDays % 30
      return `${months}个月${remainingDays}天`
    } else {
      return `${totalDays}天`
    }
  }

  return (
    <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6 mb-6 border-2 border-pink-200">
      <div className="text-center">
        {/* 标题 */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-6 h-6 text-red-500 fill-red-500" />
          <h3 className="text-xl font-bold text-gray-800">我们的爱情时光</h3>
          <Heart className="w-6 h-6 text-red-500 fill-red-500" />
        </div>
        
        {/* 纪念日 */}
        <div className="flex items-center justify-center gap-2 mb-4 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>在一起纪念日：2025年7月18日</span>
        </div>

        {/* 主要时间显示 */}
        <div className="bg-white rounded-xl p-4 mb-4 shadow-inner">
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
            {getMilestoneMessage()}
          </div>
          <div className="text-sm text-gray-500">
            已经在一起啦
          </div>
        </div>

        {/* 详细时间 */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-pink-500">{timeTogether.days}</div>
            <div className="text-xs text-gray-500">天</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-purple-500">{timeTogether.hours}</div>
            <div className="text-xs text-gray-500">时</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-500">{timeTogether.minutes}</div>
            <div className="text-xs text-gray-500">分</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-500">{timeTogether.seconds}</div>
            <div className="text-xs text-gray-500">秒</div>
          </div>
        </div>

        {/* 下一个纪念日倒计时 */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-3 border border-yellow-200">
          <div className="flex items-center justify-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-gray-700">
              距离下一个纪念日还有 <span className="font-bold text-orange-600">{getNextAnniversary()}</span> 天
            </span>
          </div>
        </div>

        {/* 爱情寄语 */}
        <div className="mt-4 text-xs text-gray-500 italic">
          &ldquo;每一天都是我们爱情故事中的一页&rdquo;
        </div>
      </div>
    </div>
  )
}
