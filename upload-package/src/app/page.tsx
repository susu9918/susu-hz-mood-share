'use client'

import { useState, useEffect } from 'react'
import { Heart, MessageCircle, Smile, Frown, Meh, Laugh, Sparkles, RefreshCw, Trash2, Search } from 'lucide-react'
import Fireworks from '@/components/Fireworks'
import ReplySection from '@/components/ReplySection'
import CatDogBackground from '@/components/CatDogBackground'
import LoveCounter from '@/components/LoveCounter'
import AnniversaryReminder from '@/components/AnniversaryReminder'
import PaginationControls from '@/components/PaginationControls'
import { getCurrentUser, setCurrentUser, getMoods, saveMood, updateMood, addReply, deleteReply, deleteMood, switchUser } from '@/lib/storage'
import { getPaginatedMoods, searchMoods } from '@/lib/pagination'

interface Mood {
  id: string
  text: string
  mood: 'happy' | 'sad' | 'neutral' | 'excited'
  author: 'susu' | 'hz'
  timestamp: Date
  likes: number
  liked: boolean
  replies: Array<{
    id: string
    text: string
    author: 'susu' | 'hz'
    timestamp: Date
  }>
}

const moodIcons = {
  happy: <Smile className="w-6 h-6 text-yellow-500" />,
  sad: <Frown className="w-6 h-6 text-blue-500" />,
  neutral: <Meh className="w-6 h-6 text-gray-500" />,
  excited: <Laugh className="w-6 h-6 text-pink-500" />
}

const moodColors = {
  happy: 'bg-yellow-50 border-yellow-200',
  sad: 'bg-blue-50 border-blue-200',
  neutral: 'bg-gray-50 border-gray-200',
  excited: 'bg-pink-50 border-pink-200'
}

export default function Home() {
  const [allMoods, setAllMoods] = useState<Mood[]>([])
  const [currentUser, setCurrentUserState] = useState<'susu' | 'hz'>('susu')
  const [newMood, setNewMood] = useState({
    text: '',
    mood: 'happy' as Mood['mood']
  })
  const [selectedMood, setSelectedMood] = useState<Mood['mood']>('happy')
  const [fireworksTrigger, setFireworksTrigger] = useState(0)
  
  // 分页状态
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const pageSize = 10

  // 初始化数据
  useEffect(() => {
    const user = getCurrentUser()
    setCurrentUserState(user)
    const savedMoods = getMoods()
    
    // 如果没有数据，添加默认示例
    if (savedMoods.length === 0) {
      const defaultMoods: Mood[] = [
        {
          id: '1',
          text: '今天工作很顺利，心情很好！想你～',
          mood: 'happy',
          author: 'hz',
          timestamp: new Date(Date.now() - 3600000),
          likes: 3,
          liked: true,
          replies: []
        },
        {
          id: '2',
          text: '有点累，但想到hz就充满动力',
          mood: 'neutral',
          author: 'susu',
          timestamp: new Date(Date.now() - 7200000),
          likes: 5,
          liked: false,
          replies: []
        }
      ]
      setAllMoods(defaultMoods)
      defaultMoods.forEach(saveMood)
    } else {
      setAllMoods(savedMoods)
    }
  }, [])

  // 获取搜索和分页后的数据
  const filteredMoods = searchMoods(allMoods, searchQuery)
  const paginationData = getPaginatedMoods(filteredMoods, currentPage, pageSize)

  const handleAddMood = (e?: React.MouseEvent) => {
    // 防止事件冒泡
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }
    
    if (!newMood.text.trim()) return

    const mood: Mood = {
      id: Date.now().toString(),
      text: newMood.text,
      mood: selectedMood,
      author: currentUser,
      timestamp: new Date(),
      likes: 0,
      liked: false,
      replies: []
    }

    saveMood(mood)
    setAllMoods([mood, ...allMoods])
    setNewMood({ text: '', mood: 'happy' })
    // 新增心情后回到第一页
    setCurrentPage(1)
  }

  const handleLike = (id: string, e?: React.MouseEvent) => {
    // 防止事件冒泡
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }
    
    const mood = allMoods.find(m => m.id === id)
    if (!mood) return

    const updatedMood = {
      ...mood,
      liked: !mood.liked,
      likes: mood.liked ? mood.likes - 1 : mood.likes + 1
    }

    updateMood(id, updatedMood)
    setAllMoods(allMoods.map(m => m.id === id ? updatedMood : m))
  }

  const triggerFireworks = (e?: React.MouseEvent) => {
    // 防止事件冒泡
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }
    
    setFireworksTrigger(prev => prev + 1)
    // 添加一个烟花心情记录
    const fireworkMood: Mood = {
      id: Date.now().toString(),
      text: '🎆 为你放烟花！爱你～',
      mood: 'excited',
      author: currentUser,
      timestamp: new Date(),
      likes: 0,
      liked: false,
      replies: []
    }
    saveMood(fireworkMood)
    setAllMoods([fireworkMood, ...allMoods])
  }

  const handleFireworksComplete = () => {
    // 烟花结束后重置触发器
    setFireworksTrigger(0)
    console.log('烟花表演结束！')
  }

  const handleAddReply = (moodId: string, reply: { text: string; author: 'susu' | 'hz' }) => {
    addReply(moodId, reply)
    
    // 更新本地状态
    setAllMoods(allMoods.map(mood => {
      if (mood.id === moodId) {
        const newReply = {
          id: Date.now().toString(),
          ...reply,
          timestamp: new Date()
        }
        return {
          ...mood,
          replies: [newReply, ...(mood.replies || [])]
        }
      }
      return mood
    }))
  }

  const handleDeleteReply = (moodId: string, replyId: string) => {
    deleteReply(moodId, replyId)
    
    // 更新本地状态
    setAllMoods(allMoods.map(mood => {
      if (mood.id === moodId) {
        return {
          ...mood,
          replies: mood.replies?.filter(r => r.id !== replyId) || []
        }
      }
      return mood
    }))
  }

  const handleDeleteMood = (moodId: string) => {
    deleteMood(moodId)
    
    // 更新本地状态
    setAllMoods(allMoods.filter(mood => mood.id !== moodId))
  }

  const handleSwitchUser = () => {
    const newUser = switchUser()
    setCurrentUserState(newUser)
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / 3600000)
    const minutes = Math.floor((diff % 3600000) / 60000)

    if (hours > 0) return `${hours}小时前`
    if (minutes > 0) return `${minutes}分钟前`
    return '刚刚'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 relative">
      <CatDogBackground />
      <Fireworks trigger={fireworksTrigger} onComplete={handleFireworksComplete} />
      <div className="max-w-2xl mx-auto p-4 relative z-10">
        {/* Header */}
        <header className="text-center py-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            <h1 className="text-3xl font-bold text-gray-800">susu&hz的心情分享</h1>
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          </div>
          <p className="text-gray-600">记录我们的甜蜜时光，分享彼此的心情</p>
          
          {/* 用户切换和烟花按钮 */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={handleSwitchUser}
              className="px-4 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              切换到 {currentUser === 'susu' ? 'hz' : 'susu'}
            </button>
            
            <button
              onClick={(e) => triggerFireworks(e)}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              🎆 放烟花给TA
            </button>
          </div>
          
          <div className="mt-2 text-sm text-gray-500">
            当前用户: <span className="font-semibold text-pink-600">{currentUser}</span>
          </div>
        </header>

        {/* 爱情计时器 */}
        <LoveCounter />

        {/* 纪念日提醒 */}
        <div className="mb-6">
          <AnniversaryReminder />
        </div>

        {/* Mood Input */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">分享你的心情</h3>
          
          {/* Mood Selection */}
          <div className="flex gap-3 mb-4">
            {Object.entries(moodIcons).map(([mood, icon]) => (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood as Mood['mood'])}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedMood === mood
                    ? moodColors[mood as Mood['mood']] + ' border-2 scale-110'
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}
              >
                {icon}
              </button>
            ))}
          </div>

          {/* Text Input */}
          <textarea
            value={newMood.text}
            onChange={(e) => setNewMood({ ...newMood, text: e.target.value })}
            placeholder="写下你现在的心情..."
            className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent text-gray-800 placeholder-gray-400"
            rows={3}
          />

          {/* Submit Button */}
          <button
              onClick={(e) => handleAddMood(e)}
              disabled={!newMood.text.trim()}
              className="mt-4 w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
            分享心情
          </button>
        </div>

        {/* Moods List */}
        <div className="space-y-4">
          {/* 搜索框 */}
          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1) // 搜索时回到第一页
                }}
                placeholder="搜索心情内容或作者..."
                className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          {/* 心情列表 */}
          {paginationData.moods.map((mood: Mood) => (
            <div
              key={mood.id}
              className={`bg-white rounded-xl shadow-md p-6 border-2 ${moodColors[mood.mood]} ${
                mood.author === 'susu' ? 'border-l-4 border-l-pink-400' : 'border-l-4 border-l-blue-400'
              } relative group`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {moodIcons[mood.mood]}
                  <div>
                    <p className="font-semibold text-gray-800">
                      {mood.author}
                    </p>
                    <p className="text-sm text-gray-500">{formatTime(mood.timestamp)}</p>
                  </div>
                </div>
                {mood.author === currentUser && (
                  <button
                    onClick={() => handleDeleteMood(mood.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-100 rounded-full"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                )}
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{mood.text}</p>

              <ReplySection
                moodId={mood.id}
                replies={mood.replies || []}
                onAddReply={handleAddReply}
                onDeleteReply={handleDeleteReply}
                currentUser={currentUser}
              />

              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => handleLike(mood.id, e)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all ${
                    mood.liked
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${mood.liked ? 'fill-red-500' : ''}`} />
                  <span className="text-sm font-medium">{mood.likes}</span>
                </button>

                <button className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">回复</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 分页控件 */}
        <PaginationControls
          currentPage={paginationData.currentPage}
          totalPages={paginationData.totalPages}
          hasNextPage={paginationData.hasNextPage}
          hasPrevPage={paginationData.hasPrevPage}
          totalMoods={paginationData.totalMoods}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
        />
      </div>
    </div>
  )
}
