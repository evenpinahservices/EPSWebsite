import type { ReactNode } from 'react'

export function LegalDoc({
  title,
  lastUpdated,
  children,
}: {
  title: string
  lastUpdated: string
  children: ReactNode
}) {
  return (
    <main className="min-h-screen bg-background-light">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16">
        <a
          href="/"
          className="text-sm text-secondary-accent hover:text-primary-dark transition-colors"
        >
          &larr; Back to Whats2Eat
        </a>

        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-primary-dark mt-6">
          {title}
        </h1>
        <p className="text-sm text-primary-dark/60 mt-2">
          Even Pinah Services &middot; Last updated: {lastUpdated}
        </p>

        <div className="mt-10 space-y-8 text-primary-dark/90 leading-relaxed">
          {children}
        </div>
      </div>
    </main>
  )
}

export function Section({
  heading,
  children,
}: {
  heading: string
  children: ReactNode
}) {
  return (
    <section>
      <h2 className="font-serif text-xl font-semibold text-primary-dark border-b border-highlight-gold/40 pb-2 mb-3">
        {heading}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

export function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc pl-6 space-y-1.5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}
