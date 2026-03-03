'use client'

import { useState, useCallback } from 'react'
import { parseProposalData, type ProposalData } from '@/lib/proposal-types'

const labelClass = 'font-serif font-semibold text-primary-dark'

function ProposalPreview({ data }: { data: ProposalData }) {
  return (
    <article
      id="proposal-preview"
      className="proposal-preview bg-white text-primary-dark font-serif rounded-lg shadow-lg overflow-hidden print:shadow-none"
    >
      <div className="p-8 sm:p-10 md:p-12">
        {/* Logo + Even Pinah Services (left), dates (right); thin gold line; then Product Proposal underneath */}
        <div className="flex items-center justify-between gap-4 pb-4 mb-2 border-b border-highlight-gold/40 flex-wrap">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Even Pinah Services"
              className="h-10 w-10 object-contain"
            />
            <p className="font-serif text-lg font-semibold text-primary-dark">Even Pinah Services</p>
          </div>
          <div className="text-sm text-primary-dark/80 space-y-1 text-right">
            {data.proposalDate && <p><span className={labelClass}>Date of proposal:</span> {data.proposalDate}</p>}
            {data.signatureDueDate && <p><span className={labelClass}>Due date for signature:</span> {data.signatureDueDate}</p>}
          </div>
        </div>
        <h1 className="font-serif text-xl font-semibold text-primary-dark text-center mb-8 mt-6">
          Product Proposal
        </h1>

        {/* 1. Client Details */}
        <section className="mb-8">
          <h2 className="font-serif text-lg font-semibold text-primary-dark mb-4">
            1. Client Details
          </h2>
          <ul className="space-y-2 text-primary-dark list-none">
            <li><span className="tabular-nums text-primary-dark/90 mr-2">1.1</span><span className={labelClass}>Client Name:</span> {data.clientName}</li>
            {data.recipientName && (
              <li><span className="tabular-nums text-primary-dark/90 mr-2">1.2</span><span className={labelClass}>Addressed To:</span> {data.recipientName}</li>
            )}
            <li><span className="tabular-nums text-primary-dark/90 mr-2">{data.recipientName ? '1.3' : '1.2'}</span><span className={labelClass}>Business Type:</span> {data.businessType}</li>
          </ul>
        </section>

        {/* 2. Executive Summary */}
        <section className="mb-8">
          <h2 className="font-serif text-lg font-semibold text-primary-dark mb-4">
            2. Executive Summary
          </h2>
          <div className="space-y-3 text-primary-dark">
            {data.frankensteinStatus && (
              <p><span className="tabular-nums text-primary-dark/90 mr-2">2.1</span><span className={labelClass}>Current situation:</span> {data.frankensteinStatus}</p>
            )}
            {data.corePainPoint && (
              <p><span className="tabular-nums text-primary-dark/90 mr-2">2.2</span><span className={labelClass}>Core pain point:</span> {data.corePainPoint}</p>
            )}
            {data.concept && (
              <p><span className="tabular-nums text-primary-dark/90 mr-2">2.3</span><span className={labelClass}>Concept:</span> {data.concept}</p>
            )}
          </div>
        </section>

        {/* 3. Project Scope */}
        <section className="mb-8">
          <h2 className="font-serif text-lg font-semibold text-primary-dark mb-4">
            3. Project Scope
          </h2>
          <div className="space-y-4">
            <div>
              <p className="font-serif font-semibold text-primary-dark mb-2">3.1 In Scope</p>
              <ul className="list-none space-y-1 text-primary-dark">
                {data.inScope.map((item, i) => (
                  <li key={i}><span className="tabular-nums text-primary-dark/90 mr-2">3.1.{i + 1}</span>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-serif font-semibold text-primary-dark mb-2">3.2 Out of Scope / Future Features</p>
              <ul className="list-none space-y-1 text-primary-dark">
                {data.outOfScope.map((item, i) => (
                  <li key={i}><span className="tabular-nums text-primary-dark/90 mr-2">3.2.{i + 1}</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Deliverables */}
        <section className="mb-8">
          <h2 className="font-serif text-lg font-semibold text-primary-dark mb-4">
            4. Deliverables
          </h2>
          <div className="space-y-4">
            <div>
              <p className="font-serif font-semibold text-primary-dark mb-2">4.1 Client must provide</p>
              <ul className="list-none space-y-1 text-primary-dark">
                {[...data.clientMustProvide, ...data.clientObligations].map((item, i) => (
                  <li key={i}><span className="tabular-nums text-primary-dark/90 mr-2">4.1.{i + 1}</span>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-serif font-semibold text-primary-dark mb-2">4.2 Technical Dependencies</p>
              <ul className="list-none space-y-1 text-primary-dark">
                {data.technicalDependencies.map((item, i) => (
                  <li key={i}><span className="tabular-nums text-primary-dark/90 mr-2">4.2.{i + 1}</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 5. Success Metrics */}
        <section className="mb-8">
          <h2 className="font-serif text-lg font-semibold text-primary-dark mb-4">
            5. Success Metrics
          </h2>
          <ul className="list-none space-y-1 text-primary-dark">
            {data.definitionOfDone.map((item, i) => (
              <li key={i}><span className="tabular-nums text-primary-dark/90 mr-2">5.{i + 1}</span>{item}</li>
            ))}
          </ul>
        </section>

        {/* 6. Quote */}
        <section className="mb-8">
          <h2 className="font-serif text-lg font-semibold text-primary-dark mb-4">
            6. Quote
          </h2>
          <ul className="space-y-2 text-primary-dark list-none">
            <li><span className="tabular-nums text-primary-dark/90 mr-2">6.1</span><span className={labelClass}>Estimated Development Hours:</span> {data.estimatedHours}</li>
            <li><span className="tabular-nums text-primary-dark/90 mr-2">6.2</span><span className={labelClass}>Project Fee:</span> {data.baseProjectFee}</li>
            <li><span className="tabular-nums text-primary-dark/90 mr-2">6.3</span><span className={labelClass}>Payment Milestones:</span> {data.paymentMilestones}</li>
            <li><span className="tabular-nums text-primary-dark/90 mr-2">6.4</span><span className={labelClass}>Risk Buffer:</span> {data.riskBuffer?.trim() ? data.riskBuffer : 'None'}</li>
            <li><span className="tabular-nums text-primary-dark/90 mr-2">6.5</span><span className={labelClass}>External Costs:</span> {data.externalCosts}</li>
          </ul>
        </section>

        {/* Project milestones: table (always shown so it appears in PDF) */}
        <section className="mb-10">
          <h2 className="font-serif text-lg font-semibold text-primary-dark mb-4">
            7. Project Milestones
          </h2>
          <p className="text-sm text-primary-dark/80 mb-3">
            {data.contractType === 'hourly'
              ? 'Breakdown by estimated hours per phase.'
              : 'Breakdown by estimated days per phase.'}
          </p>
          <div className="overflow-x-auto rounded-lg border border-primary-dark/40">
            <table className="w-full font-serif text-primary-dark border-collapse">
              <thead>
                <tr className="bg-highlight-gold/5">
                  <th className="text-left font-semibold p-3 border-b border-primary-dark/25 align-top min-w-[11rem]">
                    Phase / Milestone
                  </th>
                  <th className="text-right font-semibold p-3 border-b border-primary-dark/25 w-32 align-top whitespace-nowrap">
                    {data.contractType === 'hourly' ? 'Estimated hours' : 'Estimated days'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.projectMilestones.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="p-3 text-primary-dark/70 text-sm align-top">
                      No milestones defined.
                    </td>
                  </tr>
                ) : (
                  data.projectMilestones.flatMap((m, i) => {
                    const isHourly = data.contractType === 'hourly'
                    const min = isHourly ? m.hours : m.days
                    const max = isHourly ? m.hoursMax : m.daysMax
                    const cellText =
                      min == null
                        ? '—'
                        : max != null && max !== min
                          ? `${min}–${max}`
                          : String(min)
                    const mainRow = (
                      <tr key={i} className="border-b border-primary-dark/15">
                        <td className="p-3 align-top font-medium">{m.name}</td>
                        <td className="p-3 text-right tabular-nums align-top">{cellText}</td>
                      </tr>
                    )
                    const subRows = (m.subFeatures ?? []).map((sub, j) => {
                      const sMin = isHourly ? sub.hours : sub.days
                      const sMax = isHourly ? sub.hoursMax : sub.daysMax
                      const subText =
                        sMin == null
                          ? '—'
                          : sMax != null && sMax !== sMin
                            ? `${sMin}–${sMax}`
                            : String(sMin)
                      return (
                        <tr key={`${i}-${j}`} className="border-b border-primary-dark/15 bg-highlight-gold/5">
                          <td className="p-2 pl-8 align-top text-primary-dark/85 text-xs">
                            {sub.name}
                          </td>
                          <td className="p-2 text-right tabular-nums align-top text-xs">{subText}</td>
                        </tr>
                      )
                    })
                    return [mainRow, ...subRows]
                  })
                )}
              </tbody>
              <tfoot>
                <tr className="bg-highlight-gold/5 font-semibold">
                  <td className="p-3 border-t border-primary-dark/25 align-top">Total</td>
                  <td className="p-3 text-right tabular-nums border-t border-primary-dark/25 align-top">
                    {(() => {
                      const isHourly = data.contractType === 'hourly'
                      const totalMin = data.projectMilestones.reduce(
                        (sum, m) => sum + (isHourly ? (m.hours ?? 0) : (m.days ?? 0)),
                        0
                      )
                      const totalMax = data.projectMilestones.reduce(
                        (sum, m) =>
                          sum +
                          (isHourly
                            ? (m.hoursMax ?? m.hours ?? 0)
                            : (m.daysMax ?? m.days ?? 0)),
                        0
                      )
                      return totalMax > totalMin ? `${totalMin}–${totalMax}` : String(totalMin)
                    })()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="font-serif text-xl font-semibold text-primary-dark mt-6">
            Total quote amount: {data.totalQuoteAmount?.trim() ? data.totalQuoteAmount : '—'}
          </p>
        </section>

        {/* Sign page: thin gold line at top only */}
        <div className="pt-8 mt-10 border-t border-highlight-gold/40">
          <p className="font-serif font-semibold text-primary-dark mb-6">Signatures</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div>
              <p className="font-serif font-semibold text-primary-dark">{data.myName || '—'}</p>
              <p className="text-sm text-primary-dark/80 mb-4">{data.myBusinessName || '—'}</p>
              <div className="mt-8 h-px bg-primary-dark/30 w-3/4" aria-hidden />
              <p className="text-xs text-primary-dark/70 mt-1">Signature</p>
              <div className="mt-7 w-24 border-b border-primary-dark/30" style={{ height: 0 }} aria-hidden />
              <p className="text-xs text-primary-dark/70 mt-1">Date</p>
            </div>
            <div>
              <p className="font-serif font-semibold text-primary-dark">{data.recipientName || '—'}</p>
              <p className="text-sm text-primary-dark/80 mb-4">{data.organisationName || '—'}</p>
              <div className="mt-8 h-px bg-primary-dark/30 w-3/4" aria-hidden />
              <p className="text-xs text-primary-dark/70 mt-1">Signature</p>
              <div className="mt-7 w-24 border-b border-primary-dark/30" style={{ height: 0 }} aria-hidden />
              <p className="text-xs text-primary-dark/70 mt-1">Date</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

const INITIAL_JSON = `{
  "clientName": "",
  "recipientName": "",
  "businessType": "",
  "frankensteinStatus": "",
  "corePainPoint": "",
  "concept": "",
  "levelOfService": "Level 1 (Micro-Tool/Website)",
  "inScope": [],
  "outOfScope": [],
  "clientMustProvide": [],
  "clientObligations": [],
  "technicalDependencies": [],
  "definitionOfDone": [],
  "estimatedHours": "",
  "baseProjectFee": "",
  "paymentMilestones": "",
  "riskBuffer": "",
  "externalCosts": "",
  "totalQuoteAmount": "",
  "contractType": "hourly",
  "projectMilestones": [
    { "name": "MVP build", "hours": "10 to 15", "subFeatures": [
      { "name": "Feature 1", "hours": 3 },
      { "name": "Feature 2", "hours": "4 to 5" }
    ]},
    { "name": "", "hours": 0 }
  ],
  "proposalDate": "",
  "signatureDueDate": "",
  "myName": "",
  "myBusinessName": "",
  "organisationName": ""
}`

export default function ProposalPage() {
  const [rawInput, setRawInput] = useState(INITIAL_JSON)
  const [error, setError] = useState<string | null>(null)
  const [proposal, setProposal] = useState<ProposalData | null>(null)

  const validate = useCallback((text: string) => {
    setRawInput(text)
    if (!text.trim()) {
      setError(null)
      setProposal(null)
      return
    }
    let parsed: unknown
    try {
      parsed = JSON.parse(text)
    } catch {
      setError('Invalid JSON. Check brackets and commas.')
      setProposal(null)
      return
    }
    const result = parseProposalData(parsed)
    if (result.success) {
      setError(null)
      setProposal(result.data)
    } else {
      setError(result.error)
      setProposal(null)
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const text = typeof reader.result === 'string' ? reader.result : ''
      validate(text)
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      <div className="no-print space-y-4">
        <h1 className="font-serif text-2xl font-semibold text-primary-dark">
          Proposal generator
        </h1>
        <p className="text-primary-dark/80 text-sm">
          Paste JSON below or upload a .json file. The preview updates as you
          edit. Use &quot;Download PDF&quot; to save as PDF.
        </p>

        <div className="flex flex-wrap gap-3 items-center">
          <label className="cursor-pointer px-4 py-2 rounded-md bg-secondary-accent/20 text-primary-dark font-medium hover:bg-secondary-accent/30 transition-colors text-sm">
            Upload .json
            <input
              type="file"
              accept=".json,application/json"
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>
        </div>

        <textarea
          value={rawInput}
          onChange={(e) => validate(e.target.value)}
          placeholder="Paste or edit proposal JSON..."
          className="w-full min-h-[220px] p-4 rounded-lg border border-primary-dark/20 bg-white text-primary-dark font-mono text-sm focus:outline-none focus:ring-2 focus:ring-secondary-accent/50"
          spellCheck={false}
        />

        {error && (
          <p className="text-red-600 text-sm font-medium" role="alert">
            {error}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handlePrint}
            disabled={!proposal}
            className="px-5 py-2.5 rounded-md bg-highlight-gold text-primary-dark font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50"
          >
            Download PDF
          </button>
          <span className="text-sm text-primary-dark/70">
            {proposal
              ? 'Print → Save as PDF'
              : 'Fix errors above to enable'}
          </span>
        </div>
      </div>

      <div className="no-print">
        <h2 className="font-serif text-lg font-semibold text-primary-dark mb-3">
          Preview
        </h2>
        {!proposal && rawInput.trim() && (
          <p className="text-primary-dark/70 text-sm mb-4">
            Fix the errors above to see the proposal preview.
          </p>
        )}
      </div>

      {proposal && <ProposalPreview data={proposal} />}
    </div>
  )
}
