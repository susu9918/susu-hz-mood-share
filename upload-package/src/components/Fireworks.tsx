'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  color: string
  life: number
}

interface Firework {
  x: number
  y: number
  targetY: number
  vx: number
  vy: number
  color: string
  exploded: boolean
  particles: Particle[]
}

export default function Fireworks({ trigger, onComplete }: { trigger: number; onComplete?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const fireworksRef = useRef<Firework[]>([])
  const startTimeRef = useRef<number>(0)
  const durationRef = useRef<number>(5000) // 5秒
  const lastTriggerRef = useRef<number>(0) // 记录上次的触发值

  useEffect(() => {
    // 只有当trigger真正变化时才触发烟花
    if (trigger === 0 || trigger === lastTriggerRef.current) return
    
    lastTriggerRef.current = trigger

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7',
      '#dfe6e9', '#ff7979', '#badc58', '#f9ca24', '#f0932b',
      '#eb4d4b', '#6ab04c', '#c7ecee', '#7bed9f', '#ff6348'
    ]

    const createFirework = () => {
      const x = Math.random() * canvas.width
      const targetY = Math.random() * canvas.height * 0.5
      const color = colors[Math.floor(Math.random() * colors.length)]
      
      return {
        x,
        y: canvas.height,
        targetY,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 3 - 12,
        color,
        exploded: false,
        particles: []
      }
    }

    const createParticles = (x: number, y: number, color: string) => {
      const particles: Particle[] = []
      const particleCount = 60 + Math.floor(Math.random() * 40) // 增加粒子数量
      
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount
        const velocity = Math.random() * 8 + 4 // 增加速度
        
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          alpha: 1,
          color,
          life: 1.0
        })
      }
      
      return particles
    }

    startTimeRef.current = Date.now()

    // 创建多波烟花，持续5秒
    const waves = 3 // 3波烟花
    const waveInterval = 1500 // 每波间隔1.5秒
    
    for (let wave = 0; wave < waves; wave++) {
      setTimeout(() => {
        const fireworksCount = 3 + Math.floor(Math.random() * 3) // 每波3-6个烟花
        for (let i = 0; i < fireworksCount; i++) {
          setTimeout(() => {
            fireworksRef.current.push(createFirework())
          }, i * 200)
        }
      }, wave * waveInterval)
    }

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current
      
      // 如果超过5秒，结束动画
      if (elapsed > durationRef.current) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        fireworksRef.current = [] // 清空烟花数组
        if (onComplete) onComplete()
        return
      }

      // 淡化效果
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      fireworksRef.current = fireworksRef.current.filter(firework => {
        if (!firework.exploded) {
          // 上升阶段
          firework.x += firework.vx
          firework.y += firework.vy
          firework.vy += 0.3

          // 绘制上升的烟花
          ctx.beginPath()
          ctx.arc(firework.x, firework.y, 3, 0, Math.PI * 2)
          ctx.fillStyle = firework.color
          ctx.fill()

          // 检查是否到达目标高度
          if (firework.y <= firework.targetY || firework.vy >= 0) {
            firework.exploded = true
            firework.particles = createParticles(firework.x, firework.y, firework.color)
          }
        } else {
          // 爆炸阶段
          firework.particles = firework.particles.filter(particle => {
            particle.x += particle.vx
            particle.y += particle.vy
            particle.vy += 0.15 // 重力
            particle.vx *= 0.98 // 空气阻力
            particle.life -= 0.008 // 生命值减少
            particle.alpha = particle.life

            if (particle.alpha > 0) {
              ctx.globalAlpha = particle.alpha
              ctx.beginPath()
              ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2) // 稍微大一点的粒子
              ctx.fillStyle = particle.color
              ctx.fill()
              
              // 添加发光效果
              ctx.shadowBlur = 10
              ctx.shadowColor = particle.color
              ctx.fill()
              ctx.shadowBlur = 0
              
              ctx.globalAlpha = 1
              return true
            }
            return false
          })

          // 如果所有粒子都消失了，移除烟花
          return firework.particles.length > 0
        }

        return true
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = undefined
      }
      // 清理所有状态
      fireworksRef.current = []
      lastTriggerRef.current = 0
    }
  }, [trigger, onComplete])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      style={{ background: 'transparent' }}
    />
  )
}
