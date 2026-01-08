'use client'

import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState, useRef } from 'react'

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > lastScrollY && latest > 100) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
    setLastScrollY(latest)
  })

  const navItems = [
    { name: 'What we deliver', href: '#mission' },
    { name: 'Testimonials', href: '#testimonials' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-background-light/80 backdrop-blur-md border-b border-primary-dark/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Navigation Items - Left side */}
          <div 
            className="hidden md:flex items-center gap-8 relative"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                onMouseEnter={() => setHoveredIndex(index)}
                className="text-sm font-medium text-primary-dark/80 hover:text-primary-dark transition-colors relative py-2 group"
              >
                {item.name}
                {/* Very thin underline that grows from left to right */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-primary-dark"
                  initial={{ scaleX: 0 }}
                  animate={{ 
                    scaleX: hoveredIndex === index ? 1 : 0
                  }}
                  style={{
                    originX: 0,
                    width: '100%',
                  }}
                  transition={{ 
                    duration: 0.3, 
                    ease: [0.4, 0, 0.2, 1]
                  }}
                />
              </a>
            ))}
          </div>

          {/* Logo - Centered */}
          <div className="flex-1 flex justify-center">
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              className="text-lg sm:text-xl font-serif font-semibold text-primary-dark"
            >
              Even Pinah Services
            </motion.a>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Contact Button - dark blue */}
            <a
              href="#contact"
              className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-primary-dark text-primary-dark rounded-full font-medium text-xs hover:bg-primary-dark/5 transition-colors"
            >
              Contact
            </a>

            {/* Book a Meeting Button */}
            <motion.a
              href="#contact"
              className="relative inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-dark text-background-light rounded-full overflow-hidden group"
              whileHover="hover"
              initial="initial"
            >
              <span className="text-xs font-medium whitespace-nowrap">
                Book a meeting
              </span>
              <motion.svg
                variants={{
                  initial: { rotate: 0 },
                  hover: { rotate: 180 },
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
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
