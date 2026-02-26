import { Mood } from './storage'

export interface PaginationResult {
  moods: Mood[]
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  totalMoods: number
}

export function getPaginatedMoods(
  allMoods: Mood[],
  page: number = 1,
  pageSize: number = 10
): PaginationResult {
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedMoods = allMoods.slice(startIndex, endIndex)
  
  const totalPages = Math.ceil(allMoods.length / pageSize)
  
  return {
    moods: paginatedMoods,
    currentPage: page,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    totalMoods: allMoods.length
  }
}

export function searchMoods(allMoods: Mood[], query: string): Mood[] {
  if (!query.trim()) return allMoods
  
  const lowerQuery = query.toLowerCase()
  return allMoods.filter(mood => 
    mood.text.toLowerCase().includes(lowerQuery) ||
    mood.author.toLowerCase().includes(lowerQuery)
  )
}
