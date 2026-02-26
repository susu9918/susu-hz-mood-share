'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  totalMoods: number
  onPageChange: (page: number) => void
  pageSize: number
}

export default function PaginationControls({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  totalMoods,
  onPageChange,
  pageSize
}: PaginationControlsProps) {
  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalMoods)

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between py-4 px-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="text-sm text-gray-600">
        显示 {startItem}-{endItem} 条，共 {totalMoods} 条心情
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevPage}
          className="flex items-center gap-1 px-3 py-1 text-sm rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          上一页
        </button>
        
        <div className="flex items-center gap-1">
          {/* 显示页码 */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum = i + 1
            
            // 如果总页数大于5，调整显示逻辑
            if (totalPages > 5) {
              if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-8 h-8 text-sm rounded-lg border transition-colors ${
                  pageNum === currentPage
                    ? 'bg-pink-500 text-white border-pink-500'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            )
          })}
        </div>
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className="flex items-center gap-1 px-3 py-1 text-sm rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          下一页
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
