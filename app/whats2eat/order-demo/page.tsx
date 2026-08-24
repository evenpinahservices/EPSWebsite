'use client'

import { useState } from 'react'

const SAMPLE_ORDER = {
  customerName: 'Dana Cohen',
  address: '14 Herzl St, Tel Aviv',
  item: '1x Classic Burger',
  price: '$12.50',
  note: 'No onions, please',
  // Placeholder stock photo — swap for a real product photo when this becomes a real screen.
  imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
}

type ResponseState = 'idle' | 'loading' | 'accepted' | 'declined' | 'error'

export default function OrderDemoPage() {
  const [state, setState] = useState<ResponseState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [pendingDecision, setPendingDecision] = useState<'accept' | 'decline' | null>(null)

  const handleDecision = async (decision: 'accept' | 'decline') => {
    setState('loading')
    setPendingDecision(decision)
    setErrorMessage(null)

    try {
      const res = await fetch('/api/whatsapp/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision }),
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || 'Failed to send message')
        setState('error')
        return
      }

      setState(decision === 'accept' ? 'accepted' : 'declined')
    } catch (err) {
      setErrorMessage('Network error — could not reach the server')
      setState('error')
    }
  }

  const buttonsDisabled = state === 'loading' || state === 'accepted' || state === 'declined'

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#efeee5' }}>
      <div className="max-w-md mx-auto px-4 py-8 sm:py-12">
        <div className="relative bg-white rounded-2xl shadow-md overflow-hidden">
          {state === 'loading' && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white/70 backdrop-blur-sm">
              <div className="h-8 w-8 rounded-full border-4 border-primary-dark/20 border-t-primary-dark animate-spin" />
              <p className="text-primary-dark font-medium">
                Sending {pendingDecision === 'accept' ? 'accept' : 'decline'} message…
              </p>
            </div>
          )}
          <img
            src={SAMPLE_ORDER.imageUrl}
            alt="Classic Burger"
            className="w-full h-56 object-cover"
          />

          <div className="p-5 sm:p-6">
            <h1 className="text-2xl font-serif font-bold text-primary-dark mb-1">
              New Order
            </h1>
            <p className="text-sm text-primary-dark/50 mb-5">
              Whats2Eat vendor order demo
            </p>

            <dl className="space-y-3 text-primary-dark">
              <div className="flex justify-between gap-4">
                <dt className="text-primary-dark/60">Customer</dt>
                <dd className="font-medium text-right">{SAMPLE_ORDER.customerName}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-primary-dark/60">Address</dt>
                <dd className="font-medium text-right">{SAMPLE_ORDER.address}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-primary-dark/60">Item</dt>
                <dd className="font-medium text-right">{SAMPLE_ORDER.item}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-primary-dark/60">Price</dt>
                <dd className="font-medium text-right">{SAMPLE_ORDER.price}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-primary-dark/60">Note</dt>
                <dd className="font-medium text-right">{SAMPLE_ORDER.note}</dd>
              </div>
            </dl>

            <div className="mt-6">
              {state === 'idle' || state === 'loading' ? (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleDecision('accept')}
                    disabled={buttonsDisabled}
                    className="flex-1 min-h-[48px] rounded-xl bg-green-600 text-white font-semibold text-base disabled:opacity-40 transition-opacity active:scale-[0.98]"
                  >
                    {pendingDecision === 'accept' ? 'Sending…' : 'Accept'}
                  </button>
                  <button
                    onClick={() => handleDecision('decline')}
                    disabled={buttonsDisabled}
                    className="flex-1 min-h-[48px] rounded-xl bg-red-600 text-white font-semibold text-base disabled:opacity-40 transition-opacity active:scale-[0.98]"
                  >
                    {pendingDecision === 'decline' ? 'Sending…' : 'Decline'}
                  </button>
                </div>
              ) : null}

              {state === 'accepted' && (
                <div className="min-h-[48px] rounded-xl bg-green-50 border border-green-600/30 text-green-700 font-medium flex items-center justify-center px-4 text-center">
                  ✓ Message sent — order accepted
                </div>
              )}

              {state === 'declined' && (
                <div className="min-h-[48px] rounded-xl bg-red-50 border border-red-600/30 text-red-700 font-medium flex items-center justify-center px-4 text-center">
                  ✓ Message sent — order declined
                </div>
              )}

              {state === 'error' && (
                <div className="space-y-3">
                  <div className="min-h-[48px] rounded-xl bg-red-50 border border-red-600/30 text-red-700 font-medium flex items-center justify-center px-4 text-center">
                    ⚠ {errorMessage || 'Something went wrong'}
                  </div>
                  <button
                    onClick={() => {
                      setState('idle')
                      setPendingDecision(null)
                    }}
                    className="w-full min-h-[48px] rounded-xl border border-primary-dark/20 text-primary-dark font-medium"
                  >
                    Try again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
