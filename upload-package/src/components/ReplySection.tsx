'use client'

import { useState } from 'react'
import { MessageCircle, Send, Trash2 } from 'lucide-react'

interface Reply {
  id: string
  text: string
  author: 'susu' | 'hz'
  timestamp: Date
}

interface ReplySectionProps {
  moodId: string
  replies: Reply[]
  onAddReply: (moodId: string, reply: Omit<Reply, 'id' | 'timestamp'>) => void
  onDeleteReply: (moodId: string, replyId: string) => void
  currentUser: 'susu' | 'hz'
}

export default function ReplySection({ moodId, replies, onAddReply, onDeleteReply, currentUser }: ReplySectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [replyText, setReplyText] = useState('')

  const handleSubmitReply = () => {
    if (!replyText.trim()) return
    
    onAddReply(moodId, {
      text: replyText,
      author: currentUser
    })
    
    setReplyText('')
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    
    if (minutes < 1) return '刚刚'
    if (minutes < 60) return `${minutes}分钟前`
    
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}小时前`
    
    return `${Math.floor(hours / 24)}天前`
  }

  return (
    <div className="mt-4 border-t pt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
        <span className="text-sm">回复 ({replies.length})</span>
        <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {isExpanded && (
        <div className="mt-3 space-y-3">
          {/* 回复列表 */}
          {replies.map((reply) => (
            <div key={reply.id} className="bg-gray-50 rounded-lg p-3 relative group">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm text-gray-800">
                  {reply.author}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {formatTime(reply.timestamp)}
                  </span>
                  {reply.author === currentUser && (
                    <button
                      onClick={() => onDeleteReply(moodId, reply.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                    >
                      <Trash2 className="w-3 h-3 text-red-500" />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-700">{reply.text}</p>
            </div>
          ))}

          {/* 回复输入框 */}
          <div className="flex gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`以${currentUser}的身份回复...`}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent text-gray-800 placeholder-gray-400"
              onKeyPress={(e) => e.key === 'Enter' && handleSubmitReply()}
            />
            <button
              onClick={handleSubmitReply}
              disabled={!replyText.trim()}
              className="px-3 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
