'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

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
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // TODO: Integrate with calendar API (Calendly, Google Calendar, etc.)
    // For now, this is a placeholder that shows the structure
    console.log('Booking submitted:', { selectedDate, selectedTime, name, email, message })
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Meeting request submitted! (This is a placeholder - backend integration needed)')
      // Reset form
      setSelectedDate('')
      setSelectedTime('')
      setName('')
      setEmail('')
      setMessage('')
    }, 1000)
  }

  // Generate time slots (placeholder - would come from calendar API)
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ]

  return (
    <div>
      <h3 className="text-2xl font-serif font-bold text-primary-dark mb-6 text-center">
        Book a Consultation
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-primary-dark mb-2">
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-primary-dark/20 rounded-lg focus:ring-2 focus:ring-highlight-gold focus:border-highlight-gold outline-none transition-all"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary-dark mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-primary-dark/20 rounded-lg focus:ring-2 focus:ring-highlight-gold focus:border-highlight-gold outline-none transition-all"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-primary-dark mb-2">
              Preferred Date *
            </label>
            <input
              type="date"
              id="date"
              required
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-primary-dark/20 rounded-lg focus:ring-2 focus:ring-highlight-gold focus:border-highlight-gold outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-primary-dark mb-2">
              Preferred Time *
            </label>
            <select
              id="time"
              required
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-4 py-3 border border-primary-dark/20 rounded-lg focus:ring-2 focus:ring-highlight-gold focus:border-highlight-gold outline-none transition-all"
            >
              <option value="">Select a time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-primary-dark mb-2">
            Tell us about your project (optional)
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-primary-dark/20 rounded-lg focus:ring-2 focus:ring-highlight-gold focus:border-highlight-gold outline-none transition-all resize-none"
            placeholder="Brief description of what you'd like to discuss..."
          />
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-primary-dark text-background-light py-4 rounded-lg font-semibold hover:bg-primary-dark/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Scheduling...' : 'Schedule Meeting'}
        </motion.button>

        <p className="text-xs text-primary-dark/50 text-center">
          * After submission, you'll receive a confirmation email with calendar details.
          <br />
          (Backend integration required for full functionality)
        </p>
      </form>
    </div>
  )
}

function EmailContact() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [subject, setSubject] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // TODO: Integrate with email service (SendGrid, Resend, etc.)
    // For now, this is a placeholder
    console.log('Email submitted:', { name, email, subject, message })
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Message sent! (This is a placeholder - backend integration needed)')
      // Reset form
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    }, 1000)
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
          <br />
          (Backend integration required for full functionality)
        </p>
      </form>
    </div>
  )
}

