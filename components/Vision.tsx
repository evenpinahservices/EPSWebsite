'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useMemo } from 'react'

export default function Vision() {
  const containerRef = useRef<HTMLDivElement>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.2', 'end 0.75'],
  })
  
  const paragraphText = "Specializing in Web/App Development and Applied Machine Learning and with a background in Psychology, I bridge the gap between your business needs and cutting-edge technology. My goal is simple: to bring success to my clients, through tailored technical solutions that fit naturally into the way you think and do business."
  
  // Split into words, then track character index across all words
  const words = useMemo(() => {
    const wordList = paragraphText.split(' ')
    let charIndex = 0
    return wordList.map((word) => {
      const wordWithIndex = {
        word,
        startIndex: charIndex,
        chars: word.split('').map((char, i) => ({
          char,
          globalIndex: charIndex + i,
        })),
      }
      charIndex += word.length + 1 // +1 for space
      return wordWithIndex
    })
  }, [paragraphText])
  
  const totalChars = paragraphText.length

  return (
    <section id="vision" ref={containerRef} className="pt-32 sm:pt-40 pb-24 sm:pb-32 bg-white flex items-center justify-center min-h-[60vh] relative overflow-hidden">
      {/* Gradient blend at top - centered transition */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#efeee5] via-[#efeee5]/30 to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10">
        <motion.div
          ref={ref}
          className="text-center"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary-dark mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            The Vision
          </motion.h2>

          <p className="text-lg sm:text-xl text-primary-dark leading-relaxed max-w-3xl mx-auto mb-8 text-center">
            {words.map((wordData, wordIndex) => (
              <span key={wordIndex} className="inline-block whitespace-nowrap">
                {wordData.chars.map((charData) => (
                  <CharReveal
                    key={charData.globalIndex}
                    char={charData.char}
                    revealProgress={scrollYProgress}
                    charIndex={charData.globalIndex}
                    totalChars={totalChars}
                  />
                ))}
                {wordIndex < words.length - 1 && <span>&nbsp;</span>}
              </span>
            ))}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <div>
              <p className="text-lg font-serif font-semibold text-primary-dark">
                Natanel Richey, B.sc., B.A.
              </p>
              <p className="text-base text-secondary-accent font-medium">
                Founder & Lead Strategist
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function CharReveal({ 
  char, 
  revealProgress, 
  charIndex,
  totalChars,
}: { 
  char: string
  revealProgress: any
  charIndex: number
  totalChars: number
}) {
  const startProgress = charIndex / totalChars
  const endProgress = (charIndex + 1) / totalChars
  
  const opacity = useTransform(
    revealProgress,
    (progress: number) => {
      // Start at 0.2 opacity for all text, then reveal to 1.0 letter by letter
      if (progress <= startProgress) return 0.2
      if (progress >= endProgress) return 1
      // Smooth transition from 0.2 to 1.0 for this character
      const revealAmount = (progress - startProgress) / (endProgress - startProgress)
      return 0.2 + (revealAmount * 0.8)
    }
  )
  
  return (
    <motion.span style={{ opacity }}>
      {char}
    </motion.span>
  )
}
