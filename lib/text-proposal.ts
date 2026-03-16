/**
 * Parse plain text into a numbered proposal structure (1, 1.1, 1.2, 2, 2.1, ...).
 * Used for the text-based proposal generator (same styling as JSON proposal, no signatures).
 */

export interface TextProposalSection {
  number: string
  content: string
  level: number // 0 = main section (e.g. "1"), 1 = subsection (e.g. "1.1"), 2 = sub-sub (e.g. "1.1.1")
}

export interface TextProposalData {
  sections: TextProposalSection[]
  /** Optional first line used as document title */
  title?: string
  /** Optional date line (e.g. "Date: 2025-03-03") */
  date?: string
}

/** Match line that starts with a number pattern: 1, 1., 1.1, 1.1.3, etc. */
const NUMBERED_LINE = /^\s*(\d+(?:\.\d+)*)[.\s]+(.*)$/

/** Detect if text is primarily Hebrew (RTL). */
export function isHebrewRtl(text: string): boolean {
  const hebrew = (text.match(/[\u0590-\u05FF]/g) ?? []).length
  const latin = (text.match(/[a-zA-Z]/g) ?? []).length
  return hebrew > latin
}

/**
 * Parse plain text into numbered sections. Lines like "1. Title", "1.1 Item", "2. Next" become sections.
 * Non-numbered lines at the start can be treated as title/date; blank lines are ignored.
 */
export function parseTextProposal(text: string): { success: true; data: TextProposalData } | { success: false; error: string } {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
  if (lines.length === 0) {
    return { success: false, error: 'Text is empty.' }
  }

  const sections: TextProposalSection[] = []
  let title: string | undefined
  let date: string | undefined
  let firstNumberedIndex = -1

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(NUMBERED_LINE)
    if (match) {
      if (firstNumberedIndex < 0) firstNumberedIndex = i
      const num = match[1]
      const content = match[2].trim()
      const level = num.includes('.') ? num.split('.').length - 1 : 0
      sections.push({ number: num, content, level })
    } else if (firstNumberedIndex < 0) {
      if (i === 0) title = lines[i]
      else if (i === 1) {
        const line = lines[i]
        const withLabel = line.match(/^(?:date|תאריך)\s*[:\s]+(.+)$/i)
        const onlyDate = line.match(/^(\d{1,4}[-/]\d{1,2}[-/]\d{1,4}|\d{1,4}[-/]\S+)$/)
        if (withLabel) date = withLabel[1].trim()
        else if (onlyDate) date = onlyDate[1]
      }
    }
  }

  if (sections.length === 0) {
    return { success: false, error: 'No numbered lines found (e.g. "1. Section", "1.1 Item").' }
  }

  return {
    success: true,
    data: {
      title,
      date,
      sections,
    },
  }
}
