'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const testimonials = [
  {
    quote: "Natanel is one of a kind, a perfect and refreshing mix of professionalism and delightful service!! He is fun  and easy to work with, and works dilligently to try and grasp exactly what the client is looking for, which results in 100% customer satisfaction!! I truly, honestly and very highly recommend Natanel for your next project!!",
    client: 'Lirit A',
    company: '',
  },
  {
    quote: "Absolutely one of the best (and dearest) people I have worked with. Natanel is a superb communicator, incredibly responsible, and always keeps an eye on the big picture. I'm a fan, always.",
    client: 'Jonatan V',
    company: '',
  },
  {
    quote: "It was a pleasure working with Natanel. I genuinely enjoyed the collaboration. Natanel was always open to my suggestions and willing to learn things beyond the project scope to complete the job. I believe his openness to feedback were key to achieving success.",
    client: 'Yigal N',
    company: '',
  },
  {
    quote: "I had the pleasure of working with Natanel. Natanel is an exceptional developer a sharp analytical mind. Beyond his technical skills, he is professional and someone who brings both talent and a positive attitude to any project. I highly recommend him for th job!",
    client: 'Yehonatan E',
    company: '',
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  {testimonial.company && (
                    <p className="text-secondary-accent text-sm">{testimonial.company}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
