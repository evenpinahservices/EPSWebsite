'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const testimonials = [
  {
    quote: "Even Pinah didn't just build an app; they saved me 10 hours a week on manual data entry.",
    client: 'Sarah M.',
    company: 'SoulSparks',
  },
  {
    quote: "The custom platform transformed how we manage our operations. Everything is now in one place, and it just works.",
    client: 'David K.',
    company: 'Chesbon Hanefesh',
  },
  {
    quote: "Finally, a solution that understands our business needs. The automation has been a game-changer.",
    client: 'Rachel L.',
    company: 'Aunty Simcha',
  },
]

export default function SocialProof() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-background-light">
      <div ref={ref} className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Testimonials */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary-dark text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-xl p-8 shadow-lg border border-primary-dark/10 hover:shadow-xl transition-shadow"
              >
                <p className="text-primary-dark/80 text-lg mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-primary-dark/10 pt-4">
                  <p className="font-semibold text-primary-dark">{testimonial.client}</p>
                  <p className="text-secondary-accent text-sm">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
