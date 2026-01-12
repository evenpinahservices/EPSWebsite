'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const methods = [
  {
    title: 'Efficiency',
    description: 'Creating personalized tools that do exactly what you need, eliminating wasted effort.',
    video: '/efficiency-mp4.mp4',
  },
  {
    title: 'Automation',
    description: "Automating the repetitive tasks you're already doing, but faster and better.",
    video: '/automation-mp4.mp4',
  },
  {
    title: 'Organization',
    description: 'Replacing scattered workflows with a single, personalized operating system.',
    video: '/organization-mp4.mp4',
  },
]

function MethodItem({ 
  method, 
  index, 
  isSectionInView,
}: { 
  method: typeof methods[0]
  index: number
  isSectionInView: boolean
}) {
  const itemRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isItemInView = useInView(itemRef, { once: false, margin: '-50px' })
  const [isDesktop, setIsDesktop] = useState(false)

  // Check for desktop after mount (client-side only)
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768)
    
    const handleResize = () => setIsDesktop(window.innerWidth >= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Control video playback
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isDesktop) {
      // Desktop: video plays on hover only, handled by mouse events
      video.pause()
      video.currentTime = 0
    } else {
      // Mobile: play when in viewport
      if (isItemInView) {
        video.currentTime = 0
        video.play().catch(() => {})
      } else {
        video.pause()
        video.currentTime = 0
      }
    }
  }, [isItemInView, isDesktop])

  const handleMouseEnter = () => {
    if (isDesktop && videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }

  const handleMouseLeave = () => {
    if (isDesktop && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div className="relative">
      <motion.div
        ref={itemRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        className="flex flex-col items-center text-center px-4 md:px-8"
      >
        <div 
          className="mb-6 flex items-center justify-center cursor-pointer w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {method.title === 'Automation' ? (
            <div 
              className="w-full h-full rounded-full p-3 sm:p-4 md:p-5"
              style={{
                background: 'radial-gradient(circle, #eaeae1 60%, #efeee5 100%)',
              }}
            >
              <video
                ref={videoRef}
                src={method.video}
                muted
                playsInline
                loop={false}
                preload="metadata"
                className="object-contain w-full h-full"
                aria-label={method.title}
              />
            </div>
          ) : (
            <video
              ref={videoRef}
              src={method.video}
              muted
              playsInline
              loop={false}
              preload="metadata"
              className="object-contain w-full h-full"
              aria-label={method.title}
            />
          )}
        </div>
        <h3 className="text-2xl font-serif font-bold text-primary-dark mb-4">
          {method.title}
        </h3>
        <p className="text-primary-dark/70 text-base leading-relaxed">
          {method.description}
        </p>
      </motion.div>
    </div>
  )
}

export default function Mission() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="mission" className="py-24 sm:py-32" style={{ backgroundColor: '#efeee5' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main Content */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary-dark mb-6">
            Our Mission
          </h2>
        </motion.div>

        {/* Three Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {methods.map((method, index) => (
            <MethodItem
              key={method.title}
              method={method}
              index={index}
              isSectionInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
