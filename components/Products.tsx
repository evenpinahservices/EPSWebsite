'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Products() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="products" className="pb-24 sm:pb-32 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary-dark">
            What We&apos;ve Built
          </h2>
        </motion.div>

        <motion.a
          href="/whats2eat"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          whileHover={{ y: -6, scale: 1.01 }}
          className="block max-w-2xl mx-auto bg-background-light rounded-xl p-8 sm:p-10 shadow-lg border border-primary-dark/10 hover:shadow-xl transition-shadow"
        >
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-primary-dark mb-2">
            Whats2Eat
          </h3>
          <p className="text-primary-dark/70 text-base sm:text-lg leading-relaxed mb-4">
            A WhatsApp ordering platform for restaurants and food vendors.
          </p>
          <span className="inline-flex items-center gap-1.5 text-secondary-accent font-medium">
            Learn more
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </motion.a>
      </div>
    </section>
  )
}
