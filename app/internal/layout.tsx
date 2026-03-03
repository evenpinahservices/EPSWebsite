import Link from 'next/link'

export default function InternalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background-light text-primary-dark">
      <header className="internal-nav-header no-print border-b border-primary-dark/10 bg-background-light/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-sm font-medium text-primary-dark/80">Internal</span>
          <Link
            href="/"
            className="text-sm text-secondary-accent hover:text-primary-dark font-medium"
          >
            Back to site
          </Link>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
    </div>
  )
}
