'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'

const phrases = [
  'Optimize your workflow.',
  'Organize your mess.',
  'Tailored solutions designed just for you.',
]

// Code-like characters
const chars = '{}[]<>+-#*/%&|^~=:;'

interface TextScrambleProps {
  onScramblingChange?: (isScrambling: boolean) => void
}

export default function TextScramble({ onScramblingChange }: TextScrambleProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState(phrases[0])
  const [isScrambling, setIsScrambling] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const scrambleText = useCallback((targetText: string) => {
    setIsScrambling(true)
    onScramblingChange?.(true)
    const targetLength = targetText.length
    let iteration = 0
    const maxIterations = 15 // Shorter scramble time

    const interval = setInterval(() => {
      // All characters scramble together
      setDisplayText(
        targetText
          .split('')
          .map((char) => {
            if (char === ' ') return ' '
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

      if (iteration >= maxIterations) {
        clearInterval(interval)
        // Reveal entire word at once
        setDisplayText(targetText)
        setIsScrambling(false)
        onScramblingChange?.(false)
      }
      iteration++
    }, 40)

    return () => clearInterval(interval)
  }, [onScramblingChange])

  useEffect(() => {
    const scheduleNext = () => {
      const nextIndex = (currentIndex + 1) % phrases.length
      const isLoopingBack = nextIndex === 0
      
      // Wait before switching messages - reduced for quicker transitions
      const delay = isLoopingBack ? 3000 : 4000
      
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex(nextIndex)
        scrambleText(phrases[nextIndex])
      }, delay)
    }

    scheduleNext()

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentIndex, scrambleText])

  return (
    <span className="inline-block">
      {displayText}
    </span>
  )
}
