'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import html2canvas from 'html2canvas'

interface BugReportData {
  title: string
  description: string
  stepsToReproduce: string
  expectedBehavior: string
  actualBehavior: string
  screenshot: string | null
  deviceInfo: {
    userAgent: string
    platform: string
    screenResolution: string
    viewportSize: string
    browser: string
    url: string
  }
  attachments: File[]
}

export default function BugReport() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState<BugReportData>({
    title: '',
    description: '',
    stepsToReproduce: '',
    expectedBehavior: '',
    actualBehavior: '',
    screenshot: null,
    deviceInfo: {
      userAgent: '',
      platform: '',
      screenResolution: '',
      viewportSize: '',
      browser: '',
      url: '',
    },
    attachments: [],
  })
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getBrowserName = () => {
    const ua = navigator.userAgent
    if (ua.includes('Firefox')) return 'Firefox'
    if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome'
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari'
    if (ua.includes('Edg')) return 'Edge'
    return 'Unknown'
  }

  // Collect device information when modal opens
  useEffect(() => {
    if (isOpen) {
      // Collect device information
      const deviceInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        browser: getBrowserName(),
        url: window.location.href,
      }
      setFormData(prev => ({ ...prev, deviceInfo }))
    } else {
      // Reset screenshot when modal closes
      setScreenshotPreview(null)
      setFormData(prev => ({ ...prev, screenshot: null }))
    }
  }, [isOpen])

  const captureViewportScreenshot = async () => {
    setIsCapturing(true)
    try {
      // Small delay to ensure page is fully rendered
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Capture the entire viewport
      const canvas = await html2canvas(document.body, {
        height: window.innerHeight,
        width: window.innerWidth,
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
        useCORS: true,
        logging: false,
        backgroundColor: '#f0eee6',
      } as any)

      const screenshotDataUrl = canvas.toDataURL('image/png')
      setScreenshotPreview(screenshotDataUrl)
      setFormData(prev => ({ ...prev, screenshot: screenshotDataUrl }))
    } catch (error) {
      console.error('Error capturing screenshot:', error)
      // If screenshot capture fails, continue without it
    } finally {
      setIsCapturing(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setScreenshotPreview(reader.result as string)
          setFormData(prev => ({ ...prev, screenshot: reader.result as string }))
        }
        reader.readAsDataURL(file)
      } else {
        setFormData(prev => ({ ...prev, attachments: [...prev.attachments, file] }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('stepsToReproduce', formData.stepsToReproduce)
      formDataToSend.append('expectedBehavior', formData.expectedBehavior)
      formDataToSend.append('actualBehavior', formData.actualBehavior)
      formDataToSend.append('deviceInfo', JSON.stringify(formData.deviceInfo))
      
      if (formData.screenshot) {
        formDataToSend.append('screenshot', formData.screenshot)
      }

      formData.attachments.forEach((file, index) => {
        formDataToSend.append(`attachment_${index}`, file)
      })

      const response = await fetch('/api/bug-report', {
        method: 'POST',
        body: formDataToSend,
      })

      if (response.ok) {
        setSubmitStatus('success')
        // Reset form
        setFormData({
          title: '',
          description: '',
          stepsToReproduce: '',
          expectedBehavior: '',
          actualBehavior: '',
          screenshot: null,
          deviceInfo: {
            userAgent: '',
            platform: '',
            screenResolution: '',
            viewportSize: '',
            browser: '',
            url: '',
          },
          attachments: [],
        })
        setScreenshotPreview(null)
        
        // Close modal after 2 seconds
        setTimeout(() => {
          setIsOpen(false)
          setSubmitStatus('idle')
        }, 2000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting bug report:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Floating Bug Report Button */}
      <motion.button
        onClick={async () => {
          // Capture screenshot before opening modal
          await captureViewportScreenshot()
          setIsOpen(true)
        }}
        className="fixed bottom-6 right-6 z-40 bg-primary-dark text-background-light px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span className="hidden sm:inline font-medium">Report Bug</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal Content - Wrapper for centering */}
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-2xl max-h-[calc(100vh-2rem)] bg-background-light rounded-lg shadow-2xl overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
              {/* Header */}
              <div className="sticky top-0 bg-primary-dark text-background-light px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-xl font-serif font-semibold">Report a Bug</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-background-light/80 hover:text-background-light transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Title */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-primary-dark mb-2">
                      Bug Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-2 border border-primary-dark/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark/50"
                      placeholder="Brief description of the bug"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-primary-dark mb-2">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      required
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-2 border border-primary-dark/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark/50 resize-none"
                      placeholder="Describe the bug in detail"
                    />
                  </div>

                  {/* Steps to Reproduce */}
                  <div>
                    <label htmlFor="stepsToReproduce" className="block text-sm font-medium text-primary-dark mb-2">
                      Steps to Reproduce
                    </label>
                    <textarea
                      id="stepsToReproduce"
                      value={formData.stepsToReproduce}
                      onChange={(e) => setFormData(prev => ({ ...prev, stepsToReproduce: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-2 border border-primary-dark/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark/50 resize-none"
                      placeholder="1. Go to...&#10;2. Click on...&#10;3. See error..."
                    />
                  </div>

                  {/* Expected vs Actual Behavior */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expectedBehavior" className="block text-sm font-medium text-primary-dark mb-2">
                        Expected Behavior
                      </label>
                      <textarea
                        id="expectedBehavior"
                        value={formData.expectedBehavior}
                        onChange={(e) => setFormData(prev => ({ ...prev, expectedBehavior: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-2 border border-primary-dark/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark/50 resize-none"
                        placeholder="What should happen"
                      />
                    </div>
                    <div>
                      <label htmlFor="actualBehavior" className="block text-sm font-medium text-primary-dark mb-2">
                        Actual Behavior
                      </label>
                      <textarea
                        id="actualBehavior"
                        value={formData.actualBehavior}
                        onChange={(e) => setFormData(prev => ({ ...prev, actualBehavior: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-2 border border-primary-dark/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark/50 resize-none"
                        placeholder="What actually happens"
                      />
                    </div>
                  </div>

                  {/* Screenshot */}
                  <div>
                    <label className="block text-sm font-medium text-primary-dark mb-2">
                      Screenshot {isCapturing && <span className="text-primary-dark/60 text-xs">(Capturing...)</span>}
                    </label>
                    <div className="space-y-2">
                      {isCapturing ? (
                        <div className="w-full px-4 py-8 border-2 border-dashed border-primary-dark/30 rounded-lg text-center text-primary-dark/60">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-dark mx-auto mb-2"></div>
                          <p>Capturing screenshot...</p>
                        </div>
                      ) : screenshotPreview ? (
                        <div className="relative">
                          <img
                            src={screenshotPreview}
                            alt="Screenshot preview"
                            className="w-full rounded-lg border border-primary-dark/20"
                          />
                          <div className="mt-2 flex gap-2">
                            <button
                              type="button"
                              onClick={captureViewportScreenshot}
                              className="flex-1 px-4 py-2 border border-primary-dark/30 text-primary-dark rounded-lg hover:bg-primary-dark/5 transition-colors text-sm"
                            >
                              Retake Screenshot
                            </button>
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleFileUpload}
                              accept="image/*"
                              className="hidden"
                            />
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="flex-1 px-4 py-2 border border-primary-dark/30 text-primary-dark rounded-lg hover:bg-primary-dark/5 transition-colors text-sm"
                            >
                              Upload Different
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setScreenshotPreview(null)
                                setFormData(prev => ({ ...prev, screenshot: null }))
                              }}
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full px-4 py-8 border-2 border-dashed border-primary-dark/30 rounded-lg text-center text-primary-dark/60">
                          <p>No screenshot captured</p>
                          <button
                            type="button"
                            onClick={captureViewportScreenshot}
                            className="mt-2 px-4 py-2 bg-primary-dark text-background-light rounded-lg hover:bg-primary-dark/90 transition-colors text-sm"
                          >
                            Capture Screenshot
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Attachments */}
                  <div>
                    <label className="block text-sm font-medium text-primary-dark mb-2">
                      Additional Attachments
                    </label>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files || [])
                        setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...files] }))
                      }}
                      className="w-full px-4 py-2 border border-primary-dark/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark/50"
                    />
                    {formData.attachments.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {formData.attachments.map((file, index) => (
                          <div key={index} className="text-sm text-primary-dark/70 flex items-center justify-between">
                            <span>{file.name}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  attachments: prev.attachments.filter((_, i) => i !== index)
                                }))
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Device Info (Auto-filled, shown for reference) */}
                  <div className="bg-primary-dark/5 p-4 rounded-lg">
                    <p className="text-xs text-primary-dark/60 mb-2">
                      Device information will be automatically included:
                    </p>
                    <div className="text-xs text-primary-dark/70 space-y-1">
                      <p><strong>Browser:</strong> {formData.deviceInfo.browser || 'Collecting...'}</p>
                      <p><strong>Platform:</strong> {formData.deviceInfo.platform || 'Collecting...'}</p>
                      <p><strong>Screen:</strong> {formData.deviceInfo.screenResolution || 'Collecting...'}</p>
                      <p><strong>Viewport:</strong> {formData.deviceInfo.viewportSize || 'Collecting...'}</p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 px-4 py-2 border border-primary-dark/30 text-primary-dark rounded-lg hover:bg-primary-dark/5 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-2 bg-primary-dark text-background-light rounded-lg hover:bg-primary-dark/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Report'}
                    </button>
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg"
                    >
                      Bug report submitted successfully! Thank you for your feedback.
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg"
                    >
                      Error submitting bug report. Please try again or contact support.
                    </motion.div>
                  )}
                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

