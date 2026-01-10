'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { useIsDesktop } from './useIsDesktop'

const methods = [
  {
    title: 'Efficiency',
    description: 'Creating personalized tools that do exactly what you need, eliminating wasted effort.',
    video: '/efficiency-mp4.mp4',
    fallback: '/efficiency-icon.png', // Static fallback image
  },
  {
    title: 'Automation',
    description: "Automating the repetitive tasks you're already doing, but faster and better.",
    video: '/automation-mp4.mp4',
    fallback: '/automation-icon.png',
  },
  {
    title: 'Organization',
    description: 'Replacing scattered workflows with a single, personalized operating system.',
    video: '/organization-mp4.mp4',
    fallback: '/organization-icon.png',
  },
]

function MethodItem({ 
  method, 
  index, 
  isSectionInView,
  isDesktop 
}: { 
  method: typeof methods[0]
  index: number
  isSectionInView: boolean
  isDesktop: boolean
}) {
  const itemRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isItemInView = useInView(itemRef, { once: false, margin: '-50px' })

  // Control video playback on mobile/tablet
  useEffect(() => {
    if (!isDesktop && videoRef.current) {
      if (isItemInView) {
        // Play video when entering viewport
        videoRef.current.currentTime = 0
        videoRef.current.play().catch(console.error)
      } else {
        // Pause and reset when leaving viewport
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }
  }, [isItemInView, isDesktop])

  return (
    <div key={method.title} className="relative">
      <motion.div
        ref={itemRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        className="flex flex-col items-center text-center px-4 md:px-8"
      >
        <div 
          className={`mb-6 flex items-center justify-center cursor-pointer ${
            method.title === 'Automation' 
              ? 'w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full p-4' 
              : 'w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48'
          }`}
          style={method.title === 'Automation' ? {
            background: 'radial-gradient(circle, #eaeae1 0%, #eaeae1 50%, #efeee5 100%)',
          } : undefined}
          onMouseEnter={(e) => {
            if (isDesktop) {
              const video = e.currentTarget.querySelector('video') as HTMLVideoElement
              if (video) {
                video.currentTime = 0
                video.play()
              }
            }
          }}
          onMouseLeave={(e) => {
            if (isDesktop) {
              const video = e.currentTarget.querySelector('video') as HTMLVideoElement
              if (video) {
                video.pause()
                video.currentTime = 0
              }
            }
          }}
        >
          {isDesktop ? (
            <video
              src={method.video}
              muted
              playsInline
              loop={false}
              preload="metadata"
              className={`object-contain ${
                method.title === 'Automation'
                  ? 'w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44'
                  : 'w-full h-full'
              }`}
              aria-label={method.title}
            />
          ) : (
            <video
              ref={videoRef}
              src={method.video}
              muted
              playsInline
              loop={false}
              preload="metadata"
              className={`object-contain ${
                method.title === 'Automation'
                  ? 'w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44'
                  : 'w-full h-full'
              }`}
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
  const isDesktop = useIsDesktop()

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
              isDesktop={isDesktop}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
