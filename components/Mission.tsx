'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const methods = [
  {
    title: 'Efficiency',
    description: 'Creating personalized tools that do exactly what you need, eliminating wasted effort.',
    image: '/efficiency-icon.png',
  },
  {
    title: 'Automation',
    description: "Automating the repetitive tasks you're already doing, but faster and better.",
    image: '/automation-icon.png',
  },
  {
    title: 'Organization',
    description: 'Replacing scattered workflows with a single, personalized operating system.',
    image: '/organization-icon.png',
  },
]

export default function Mission() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="mission" className="py-24 sm:py-32 bg-background-light">
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
            <div key={method.title} className="relative">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col items-center text-center px-4 md:px-8"
              >
                <div className="mb-6 flex items-center justify-center w-20 h-20">
                  <img
                    src={method.image}
                    alt={method.title}
                    width={80}
                    height={80}
                    className="object-contain w-full h-full"
                    onError={(e) => {
                      // Show placeholder if image doesn't exist
                      const target = e.currentTarget
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjBFRUU2Ii8+CjxwYXRoIGQ9Ik00MCAyNUw0MCA1NUw1NSA2NSIgc3Ryb2tlPSIjODA4QzVBIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K'
                      target.style.opacity = '0.5'
                    }}
                  />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary-dark mb-4">
                  {method.title}
                </h3>
                <p className="text-primary-dark/70 text-base leading-relaxed">
                  {method.description}
                </p>
              </motion.div>
              
              {/* Divider - Horizontal on mobile, Vertical on desktop */}
              {index < methods.length - 1 && (
                <>
                  {/* Horizontal line for mobile */}
                  <div className="md:hidden w-full h-px bg-highlight-gold my-8" />
                  {/* Vertical divider for desktop */}
                  <div className="hidden md:block absolute top-0 right-0 w-px h-full bg-highlight-gold" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
