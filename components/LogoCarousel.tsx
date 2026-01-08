'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const logos = [
  'SoulSparks',
  'Chesbon Hanefesh',
  'Aunty Simcha',
]

export default function LogoCarousel() {
  const [carouselWidth, setCarouselWidth] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (carouselRef.current) {
      const width = carouselRef.current.scrollWidth / 2
      setCarouselWidth(width)
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
              repeat: Infinity,
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

