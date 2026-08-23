import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Whats2Eat — WhatsApp Ordering Platform | Even Pinah Services',
  description:
    'Whats2Eat is a WhatsApp ordering platform built and operated by Even Pinah Services, letting restaurants and food vendors take orders from their customers over WhatsApp.',
}

export default function Whats2EatPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-24 sm:pt-40 sm:pb-32" style={{ backgroundColor: '#efeee5' }}>
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-primary-dark mb-4">
            Whats2Eat
          </h1>
          <p className="text-lg sm:text-xl text-primary-dark/70 mb-12">
            A WhatsApp ordering platform for restaurants and food vendors.
          </p>

          <div className="space-y-6 text-primary-dark/90 text-base sm:text-lg leading-relaxed">
            <p>
              Whats2Eat is a platform, built and operated by Even Pinah Services, that lets
              restaurants and food vendors take orders from their customers over WhatsApp.
            </p>
            <p>
              Vendors sign up and connect their own WhatsApp Business Account to the platform
              using Meta&apos;s Embedded Signup flow. Whats2Eat uses this connection to send order
              confirmations and status updates to the vendor&apos;s customers on the vendor&apos;s
              behalf, and to receive messages so the vendor can manage incoming orders. Each
              vendor only has access to their own account, phone number, and customer messages —
              vendors do not see or interact with each other&apos;s data.
            </p>
            <p>
              Customers place orders and receive updates through the vendor&apos;s own WhatsApp
              number. Whats2Eat provides the underlying technology connecting the order, the
              payment, and the WhatsApp messaging together.
            </p>
          </div>

          <div className="mt-14 pt-8 border-t border-primary-dark/10 flex gap-6">
            <a
              href="/privacy"
              className="text-secondary-accent hover:text-primary-dark transition-colors font-medium"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-secondary-accent hover:text-primary-dark transition-colors font-medium"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
