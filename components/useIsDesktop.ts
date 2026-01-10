'use client'

import { useState, useEffect } from 'react'

/**
 * Hook to detect if the current viewport is desktop/laptop size (>= 768px)
 * This matches Tailwind's 'md' breakpoint
 */
export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if window is available (client-side only)
    if (typeof window === 'undefined') return

    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768) // md breakpoint
    }

    // Initial check
    checkIsDesktop()

    // Listen for resize events
    window.addEventListener('resize', checkIsDesktop)

    return () => {
      window.removeEventListener('resize', checkIsDesktop)
    }
  }, [])

  // Return false during SSR or before first render
  return isDesktop ?? false
}

