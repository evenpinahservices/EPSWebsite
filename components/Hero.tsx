'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import TextScramble from './TextScramble'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [isScrambling, setIsScrambling] = useState(false)
  // Arrow stays visible until hero section is completely out of view
  const isHeroInView = useInView(heroRef, { once: false, margin: '-100% 0px' })

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background-light pt-16 sm:pt-20">
      {/* Liquid Animation Background - fades out at bottom */}
      <div ref={containerRef} className="absolute inset-0 overflow-hidden">
        <LiquidBackground />
        {/* Gradient fade at bottom to blend into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent to-background-light pointer-events-none z-10" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        {/* Centered Content */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary-dark mb-6 leading-tight"
          >
            Curing Operational Chaos for Small Businesses.
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary-dark/80 max-w-4xl mx-auto leading-relaxed mb-8 h-20 sm:h-24 flex items-center justify-center"
          >
            <TextScramble onScramblingChange={setIsScrambling} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <motion.a
              href="#contact"
              className="relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-primary-dark text-background-light rounded-full font-semibold text-sm group"
              whileHover="hover"
              initial="initial"
            >
              <span className="whitespace-nowrap">Book a meeting</span>
              <motion.svg
                variants={{
                  initial: { rotate: 0 },
                  hover: { rotate: 180 },
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </motion.svg>
            </motion.a>
            <motion.a
              href="#mission"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 border border-primary-dark text-primary-dark rounded-full font-semibold text-sm hover:bg-primary-dark/5 transition-colors"
            >
              Learn more
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Down Arrow - Only show when hero is in view */}
      {isHeroInView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.a
            href="#mission"
            whileHover={{ y: 5 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center text-primary-dark/60 hover:text-primary-dark transition-colors"
            aria-label="Scroll down"
          >
            <motion.svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={isScrambling ? {
                y: [0, -8, 0, -8, 0, -8, 0],
              } : {
                y: 0,
              }}
              transition={isScrambling ? {
                duration: 1.2,
                times: [0, 0.2, 0.4, 0.5, 0.7, 0.85, 1],
                ease: 'easeInOut',
              } : {
                duration: 0.3,
                ease: 'easeOut',
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </motion.svg>
          </motion.a>
        </motion.div>
      )}
    </section>
  )
}

function LiquidBackground() {
  return (
    <div className="absolute inset-0">
      {/* Animated blobs - Gold/Beige tones only, no green */}
      <motion.div
        className="absolute rounded-full opacity-10 blur-3xl"
        style={{
          width: '600px',
          height: '600px',
          background: 'linear-gradient(135deg, #b7965c 0%, #d4b896 100%)',
          top: '-200px',
          left: '-200px',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute rounded-full opacity-10 blur-3xl"
        style={{
          width: '500px',
          height: '500px',
          background: 'linear-gradient(135deg, #d4b896 0%, #b7965c 100%)',
          bottom: '-150px',
          right: '-150px',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute rounded-full opacity-8 blur-3xl"
        style={{
          width: '400px',
          height: '400px',
          background: 'linear-gradient(135deg, #b7965c 0%, #d4b896 50%, #b7965c 100%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}
