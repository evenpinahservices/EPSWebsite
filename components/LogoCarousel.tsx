'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const logos = [
  'BabyClue',
  'LiritShadchanit',
  'Simcha Gefen',
  'YingYang',
]

export default function LogoCarousel() {
  const [carouselWidth, setCarouselWidth] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  useEffect(() => {
    const calculateWidth = () => {
      if (carouselRef.current) {
        // Calculate width of one set of logos
        const children = Array.from(carouselRef.current.children) as HTMLElement[]
        if (children.length > 0) {
          const firstSetWidth = children.slice(0, logos.length).reduce((acc, child) => {
            return acc + child.offsetWidth
          }, 0)
          const gap = 64 // gap-16 = 4rem = 64px on md screens
          setCarouselWidth(firstSetWidth + (gap * (logos.length - 1)))
        }
      }
    }
    
    calculateWidth()
    window.addEventListener('resize', calculateWidth)
    
    return () => {
      window.removeEventListener('resize', calculateWidth)
    }
  }, [])

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos]

  return (
    <section className="relative py-12 sm:py-16 bg-background-light overflow-hidden">
      <div className="relative">
        <motion.div
          ref={carouselRef}
          className="flex gap-16 sm:gap-24 md:gap-32"
          animate={{
            x: [0, -carouselWidth],
          }}
          transition={{
            x: {
              repeat: isMobile ? 0 : Infinity,
              repeatType: 'loop',
              duration: 25,
              ease: 'linear',
            },
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-serif font-medium text-primary-dark/30 hover:text-primary-dark/50 transition-colors whitespace-nowrap">
                {logo}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

