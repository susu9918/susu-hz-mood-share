'use client'

import { useState, useEffect } from 'react'
import { Calendar, Gift, Heart, Star } from 'lucide-react'

interface Anniversary {
  id: string
  name: string
  date: string
  type: 'love' | 'birthday' | 'special'
  recurring: boolean
}

export default function AnniversaryReminder() {
  const [anniversaries] = useState<Anniversary[]>([
    {
      id: '1',
      name: '在一起纪念日',
      date: '07-18',
      type: 'love',
      recurring: true
    },
    {
      id: '2',
      name: 'susu生日',
      date: '08-18',
      type: 'birthday',
      recurring: true
    },
    {
      id: '3',
      name: 'hz生日',
      date: '01-30',
      type: 'birthday',
      recurring: true
    }
  ])

  const [nextAnniversary, setNextAnniversary] = useState<{
    name: string
    daysLeft: number
    type: Anniversary['type']
  } | null>(null)

  useEffect(() => {
    const findNextAnniversary = () => {
      const today = new Date()
      const currentYear = today.getFullYear()
      
      let closestAnniversary = null
      let minDays = Infinity

      anniversaries.forEach(anniversary => {
        const [month, day] = anniversary.date.split('-').map(Number)
        let anniversaryDate = new Date(currentYear, month - 1, day)
        
        if (anniversaryDate < today) {
          anniversaryDate = new Date(currentYear + 1, month - 1, day)
        }
        
        const daysLeft = Math.ceil((anniversaryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        
        if (daysLeft < minDays) {
          minDays = daysLeft
          closestAnniversary = {
            name: anniversary.name,
            daysLeft,
            type: anniversary.type
          }
        }
      })

      setNextAnniversary(closestAnniversary)
    }

    findNextAnniversary()
  }, [anniversaries])

  const getIcon = (type: Anniversary['type']) => {
    switch (type) {
      case 'love':
        return <Heart className="w-4 h-4 text-red-500" />
      case 'birthday':
        return <Gift className="w-4 h-4 text-blue-500" />
      case 'special':
        return <Star className="w-4 h-4 text-yellow-500" />
    }
  }

  const getTypeColor = (type: Anniversary['type']) => {
    switch (type) {
      case 'love':
        return 'from-red-100 to-pink-100 border-red-200'
      case 'birthday':
        return 'from-blue-100 to-cyan-100 border-blue-200'
      case 'special':
        return 'from-yellow-100 to-orange-100 border-yellow-200'
    }
  }

  if (!nextAnniversary) return null

  return (
    <div className={`bg-gradient-to-r ${getTypeColor(nextAnniversary.type)} rounded-xl p-4 border-2`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getIcon(nextAnniversary.type)}
          <div>
            <div className="font-semibold text-gray-800">{nextAnniversary.name}</div>
            <div className="text-sm text-gray-600">
              还有 <span className="font-bold text-lg">{nextAnniversary.daysLeft}</span> 天
            </div>
          </div>
        </div>
        <Calendar className="w-5 h-5 text-gray-500" />
      </div>
    </div>
  )
}
