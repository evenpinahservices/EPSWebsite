'use client'

import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > lastScrollY && latest > 100) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
    setLastScrollY(latest)
  })

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-background-light/80 backdrop-blur-md border-b border-primary-dark/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo - Left side */}
          <div className="flex-shrink-0">
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 sm:gap-2.5 md:gap-3"
            >
              <img
                src="/logo.png"
                alt="Even Pinah Services Logo"
                className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9 object-contain"
              />
              <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif font-semibold text-primary-dark whitespace-nowrap">
                Even Pinah Services
              </span>
            </motion.a>
          </div>

          {/* Right side buttons - Larger on mobile/tablet */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-3">
            {/* Contact Button - Larger on mobile/tablet */}
            <a
              href="#contact"
              className="inline-flex items-center px-4 sm:px-5 md:px-4 py-2 sm:py-2.5 md:py-2 border border-primary-dark text-primary-dark rounded-full font-medium text-sm sm:text-base md:text-xs hover:bg-primary-dark/5 transition-colors whitespace-nowrap"
            >
              Contact
            </a>

            {/* Book a Meeting Button - Larger on mobile/tablet */}
            <motion.a
              href="#contact"
              className="relative inline-flex items-center gap-2 sm:gap-2 md:gap-1.5 px-4 sm:px-5 md:px-4 py-2 sm:py-2.5 md:py-2 bg-primary-dark text-background-light rounded-full overflow-hidden group"
              whileHover="hover"
              initial="initial"
            >
              <span className="text-sm sm:text-base md:text-xs font-medium whitespace-nowrap">
                Book a meeting
              </span>
              <motion.svg
                variants={{
                  initial: { rotate: 0 },
                  hover: { rotate: 180 },
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 flex-shrink-0"
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
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
