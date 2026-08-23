'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const sectionHref = (anchor: string) => (isHome ? `#${anchor}` : `/#${anchor}`)

  return (
    <footer className="bg-primary-dark text-background-light py-12">
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
              href={sectionHref('mission')}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-background-light/80 hover:text-background-light transition-colors"
            >
              Mission
            </motion.a>
            <motion.a
              href={sectionHref('vision')}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-background-light/80 hover:text-background-light transition-colors"
            >
              Vision
            </motion.a>
            <motion.a
              href={sectionHref('testimonials')}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-background-light/80 hover:text-background-light transition-colors"
            >
              Testimonials
            </motion.a>
            <motion.a
              href="/whats2eat"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-background-light/80 hover:text-background-light transition-colors"
            >
              Whats2Eat
            </motion.a>
            <motion.a
              href={sectionHref('contact')}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-background-light/80 hover:text-background-light transition-colors"
            >
              Contact
            </motion.a>
            <motion.a
              href="/privacy"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-background-light/80 hover:text-background-light transition-colors"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="/terms"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-background-light/80 hover:text-background-light transition-colors"
            >
              Terms of Service
            </motion.a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

