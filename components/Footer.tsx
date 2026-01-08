'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-background-light pt-0 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-background-light/80">
              © 2026 Even Pinah Services. All rights reserved.
            </p>
            <p className="text-background-light/60 text-sm mt-2">
              Jerusalem, Israel
            </p>
          </div>
          
          <nav className="flex gap-6 flex-wrap justify-center">
            <motion.a
              href="#mission"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-background-light/80 hover:text-background-light transition-colors"
            >
              Mission
            </motion.a>
            <motion.a
              href="#vision"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-background-light/80 hover:text-background-light transition-colors"
            >
              Vision
            </motion.a>
            <motion.a
              href="#testimonials"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-background-light/80 hover:text-background-light transition-colors"
            >
              Testimonials
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-background-light/80 hover:text-background-light transition-colors"
            >
              Contact
            </motion.a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

