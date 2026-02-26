// 本地存储管理
export interface Mood {
  id: string
  text: string
  mood: 'happy' | 'sad' | 'neutral' | 'excited'
  author: 'susu' | 'hz'
  timestamp: Date
  likes: number
  liked: boolean
  replies: Reply[]
}

export interface Reply {
  id: string
  text: string
  author: 'susu' | 'hz'
  timestamp: Date
}

const STORAGE_KEY = 'susu-hz-moods'
const USER_KEY = 'susu-hz-current-user'

// 获取当前用户
export function getCurrentUser(): 'susu' | 'hz' {
  if (typeof window === 'undefined') return 'susu'
  
  const saved = localStorage.getItem(USER_KEY)
  if (saved === 'susu' || saved === 'hz') {
    return saved
  }
  
  // 首次访问，默认为 susu
  setCurrentUser('susu')
  return 'susu'
}

// 设置当前用户
export function setCurrentUser(user: 'susu' | 'hz') {
  if (typeof window === 'undefined') return
  localStorage.setItem(USER_KEY, user)
}

// 获取所有心情
export function getMoods(): Mood[] {
  if (typeof window === 'undefined') return []
  
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return []
    
    const moods = JSON.parse(saved)
    return moods.map((mood: any) => ({
      ...mood,
      timestamp: new Date(mood.timestamp)
    }))
  } catch (error) {
    console.error('Error loading moods:', error)
    return []
  }
}

// 保存心情
export function saveMood(mood: Mood) {
  if (typeof window === 'undefined') return
  
  try {
    const moods = getMoods()
    moods.unshift(mood) // 添加到开头
    localStorage.setItem(STORAGE_KEY, JSON.stringify(moods))
  } catch (error) {
    console.error('Error saving mood:', error)
  }
}

// 更新心情（点赞等）
export function updateMood(id: string, updates: Partial<Mood>) {
  if (typeof window === 'undefined') return
  
  try {
    const moods = getMoods()
    const index = moods.findIndex(m => m.id === id)
    if (index !== -1) {
      moods[index] = { ...moods[index], ...updates }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(moods))
    }
  } catch (error) {
    console.error('Error updating mood:', error)
  }
}

// 添加回复
export function addReply(moodId: string, reply: Omit<Reply, 'id' | 'timestamp'>) {
  if (typeof window === 'undefined') return
  
  try {
    const moods = getMoods()
    const index = moods.findIndex(m => m.id === moodId)
    if (index !== -1) {
      const newReply: Reply = {
        ...reply,
        id: Date.now().toString(),
        timestamp: new Date()
      }
      
      if (!moods[index].replies) {
        moods[index].replies = []
      }
      moods[index].replies.unshift(newReply)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(moods))
    }
  } catch (error) {
    console.error('Error adding reply:', error)
  }
}

// 删除心情
export function deleteMood(moodId: string) {
  if (typeof window === 'undefined') return
  
  try {
    const moods = getMoods()
    const filteredMoods = moods.filter(m => m.id !== moodId)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredMoods))
  } catch (error) {
    console.error('Error deleting mood:', error)
  }
}

// 删除回复
export function deleteReply(moodId: string, replyId: string) {
  if (typeof window === 'undefined') return
  
  try {
    const moods = getMoods()
    const index = moods.findIndex(m => m.id === moodId)
    if (index !== -1 && moods[index].replies) {
      moods[index].replies = moods[index].replies!.filter(r => r.id !== replyId)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(moods))
    }
  } catch (error) {
    console.error('Error deleting reply:', error)
  }
}

// 切换用户
export function switchUser() {
  const current = getCurrentUser()
  const newUser = current === 'susu' ? 'hz' : 'susu'
  setCurrentUser(newUser)
  return newUser
}
