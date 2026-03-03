import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: ' ', // Minimal title so print header shows nothing useful when "Headers and footers" is on
}

export default function ProposalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
