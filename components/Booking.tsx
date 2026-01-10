'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export default function Booking() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeTab, setActiveTab] = useState<'calendar' | 'email'>('calendar')

  return (
    <section id="contact" className="pt-12 sm:pt-16 pb-0 bg-background-light">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pb-0">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary-dark mb-4">
            Let's Connect
          </h2>
          <p className="text-lg text-primary-dark/70 max-w-2xl mx-auto">
            Schedule a meeting or reach out directly. I'm here to help bring your vision to life.
          </p>
        </motion.div>

        {/* Tab Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex bg-white rounded-lg p-1 shadow-md border border-primary-dark/10">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'calendar'
                  ? 'bg-highlight-gold text-primary-dark shadow-sm'
                  : 'text-primary-dark/70 hover:text-primary-dark'
              }`}
            >
              Schedule Meeting
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'email'
                  ? 'bg-highlight-gold text-primary-dark shadow-sm'
                  : 'text-primary-dark/70 hover:text-primary-dark'
              }`}
            >
              Send Email
            </button>
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg border border-primary-dark/10 p-8 sm:p-12"
        >
          {activeTab === 'calendar' ? <CalendarBooking /> : <EmailContact />}
        </motion.div>
      </div>
    </section>
  )
}

function CalendarBooking() {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup: remove script when component unmounts
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')
      if (existingScript) {
        document.body.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <div>
      <h3 className="text-2xl font-serif font-bold text-primary-dark mb-6 text-center">
        Book a Consultation
      </h3>
      <div 
        className="calendly-inline-widget" 
        data-url="https://calendly.com/natanelrichey-work/30min?text_color=1a2b4b&primary_color=b7965c" 
        style={{ minWidth: '320px', height: '700px' }}
      />
    </div>
  )
}

function EmailContact() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [subject, setSubject] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string>('')
  const [submitSuccess, setSubmitSuccess] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')
    setSubmitSuccess('')
    
    try {
      const response = await fetch('/api/booking/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitSuccess('Message sent successfully! We\'ll get back to you within 24 hours.')
        // Reset form
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
      } else {
        setSubmitError(data.error || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      setSubmitError('An error occurred. Please try again later.')
      console.error('Error sending email:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h3 className="text-2xl font-serif font-bold text-primary-dark mb-6 text-center">
        Send a Message
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email-name" className="block text-sm font-medium text-primary-dark mb-2">
              Your Name *
            </label>
            <input
              type="text"
              id="email-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-primary-dark/20 rounded-lg focus:ring-2 focus:ring-highlight-gold focus:border-highlight-gold outline-none transition-all"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email-address" className="block text-sm font-medium text-primary-dark mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email-address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-primary-dark/20 rounded-lg focus:ring-2 focus:ring-highlight-gold focus:border-highlight-gold outline-none transition-all"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-primary-dark mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-3 border border-primary-dark/20 rounded-lg focus:ring-2 focus:ring-highlight-gold focus:border-highlight-gold outline-none transition-all"
            placeholder="What's this about?"
          />
        </div>

        <div>
          <label htmlFor="email-message" className="block text-sm font-medium text-primary-dark mb-2">
            Message *
          </label>
          <textarea
            id="email-message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border border-primary-dark/20 rounded-lg focus:ring-2 focus:ring-highlight-gold focus:border-highlight-gold outline-none transition-all resize-none"
            placeholder="Tell us about your project, questions, or how we can help..."
          />
        </div>

        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {submitError}
          </div>
        )}

        {submitSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {submitSuccess}
          </div>
        )}

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-primary-dark text-background-light py-4 rounded-lg font-semibold hover:bg-primary-dark/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </motion.button>

        <p className="text-xs text-primary-dark/50 text-center">
          * We'll respond to your message within 24 hours.
        </p>
      </form>
    </div>
  )
}

