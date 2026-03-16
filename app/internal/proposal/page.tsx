'use client'

import { useState, useCallback } from 'react'
import { parseProposalData, type ProposalData } from '@/lib/proposal-types'
import { parseTextProposal, isHebrewRtl, type TextProposalData } from '@/lib/text-proposal'

const labelClass = 'font-serif font-semibold text-primary-dark'

const HEBREW_COMPANY_NAME = 'שירותי אבן פינה'

/* ────────────────────────────────────────────
   Shared header (logo + company + dates)
   ──────────────────────────────────────────── */

function ProposalHeader({
  proposalDate,
  signatureDueDate,
  isRtl,
  showSignatureDue = true,
}: {
  proposalDate?: string
  signatureDueDate?: string
  isRtl: boolean
  showSignatureDue?: boolean
}) {
  return (
    <div
      className="flex items-center justify-between gap-4 pb-4 mb-2 border-b border-highlight-gold/40 flex-wrap"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div
        className={`flex items-center gap-3 ${isRtl ? 'justify-end' : ''}`}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <img src="/logo.png" alt="Even Pinah Services" className="h-10 w-10 object-contain shrink-0" />
        <p className={`font-serif text-lg font-semibold text-primary-dark ${isRtl ? 'text-right' : ''}`} dir={isRtl ? 'rtl' : undefined}>
          {isRtl ? HEBREW_COMPANY_NAME : 'Even Pinah Services'}
        </p>
      </div>
      <div className={`text-sm text-primary-dark/80 space-y-1 ${isRtl ? 'text-left' : 'text-right'}`}>
        {proposalDate && (
          <p><span className={labelClass}>Date of proposal:</span> {proposalDate}</p>
        )}
        {showSignatureDue && signatureDueDate && (
          <p><span className={labelClass}>Due date for signature:</span> {signatureDueDate}</p>
        )}
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────
   Numbered list helper
   ──────────────────────────────────────────── */

function NumberedList({ prefix, items }: { prefix: string; items: string[] }) {
  return (
    <ul className="list-none space-y-1 text-primary-dark">
      {items.map((item, i) => (
        <li key={i}>
          <span className="tabular-nums text-primary-dark/90 mr-2">{prefix}.{i + 1}</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

/* ────────────────────────────────────────────
   JSON proposal preview
   ──────────────────────────────────────────── */

function ProposalPreview({ data, isRtl = false }: { data: ProposalData; isRtl?: boolean }) {
  const hasWeeks = data.projectMilestones.some((m) => m.weeks != null)
  const hasHours = data.projectMilestones.some((m) => m.hours != null)
  const useWeeks =
    data.contractType === 'project' ||
    data.contractType === 'weekly' ||
    (hasWeeks && !hasHours)

  const contractTypeDisplay = (() => {
    let s = data.contractType as string
    if (data.retainer) s += ' + retainer'
    if (data.maintenance) s += ' + maintenance'
    return s.replace(/\b\w/g, (c) => c.toUpperCase())
  })()

  // Section 4 subsection counter
  let sec4 = 0
  const sec4Next = () => { sec4++; return `4.${sec4}` }

  // Section 6 quote line counter
  let qMain = 0
  const q = () => { qMain++; return `6.${qMain}` }

  return (
    <article
      id="proposal-preview"
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`proposal-preview bg-white text-primary-dark font-serif rounded-lg shadow-lg overflow-hidden print:shadow-none ${isRtl ? 'text-right' : ''}`}
    >
      <div className="p-8 sm:p-10 md:p-12">
        <ProposalHeader
          proposalDate={data.proposalDate}
          signatureDueDate={data.signatureDueDate}
          isRtl={isRtl}
          showSignatureDue
        />
        <h1 className="font-serif text-xl font-semibold text-primary-dark text-center mb-8 mt-6">
          Product Proposal
        </h1>

        {/* ── 1. Client Details ── */}
        <section className="mb-8">
          <h2 className="font-serif text-lg font-semibold text-primary-dark mb-4">1. Client Details</h2>
          <ul className="space-y-2 text-primary-dark list-none">
            <li><span className="tabular-nums text-primary-dark/90 mr-2">1.1</span><span className={labelClass}>Client Name:</span> {data.clientName}</li>
            {data.recipientName && (
              <li><span className="tabular-nums text-primary-dark/90 mr-2">1.2</span><span className={labelClass}>Addressed To:</span> {data.recipientName}</li>
            )}
            <li>
              <span className="tabular-nums text-primary-dark/90 mr-2">{data.recipientName ? '1.3' : '1.2'}</span>
              <span className={labelClass}>Business Type:</span> {data.businessType}
            </li>
          </ul>
        </section>

        {/* ── 2. Executive Summary ── */}
        <section className="mb-8">
          <h2 className="font-serif text-lg font-semibold text-primary-dark mb-4">2. Executive Summary</h2>
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

        {/* ── 3. Project Scope ── */}
        <section className="mb-8">
          <h2 className="font-serif text-lg font-semibold text-primary-dark mb-4">3. Project Scope</h2>
          <div className="space-y-4">
            <div>
              <p className="font-serif font-semibold text-primary-dark mb-2">3.1 In Scope</p>
              <NumberedList prefix="3.1" items={data.inScope} />
            </div>
            <div>
              <p className="font-serif font-semibold text-primary-dark mb-2">3.2 Out of Scope / Future Features</p>
              <NumberedList prefix="3.2" items={data.outOfScope} />
            </div>
          </div>
        </section>

        {/* ── 4. Deliverables & Obligations ── */}
        <section className="mb-8">
          <h2 className="font-serif text-lg font-semibold text-primary-dark mb-4">4. Deliverables</h2>
          <div className="space-y-4">
            {data.clientMustProvide.length > 0 && (() => {
              const n = sec4Next()
              return (
                <div>
                  <p className="font-serif font-semibold text-primary-dark mb-2">{n} Client Must Provide</p>
                  <NumberedList prefix={n} items={data.clientMustProvide} />
                </div>
              )
            })()}

            {data.obligations.assets.length > 0 && (() => {
              const n = sec4Next()
              return (
                <div>
                  <p className="font-serif font-semibold text-primary-dark mb-2">{n} Assets</p>
                  <NumberedList prefix={n} items={data.obligations.assets} />
                </div>
              )
            })()}

            {data.obligations.technical.length > 0 && (() => {
              const n = sec4Next()
              return (
                <div>
                  <p className="font-serif font-semibold text-primary-dark mb-2">{n} Technical</p>
                  <NumberedList prefix={n} items={data.obligations.technical} />
                </div>
              )
            })()}

            {data.obligations.timeline.length > 0 && (() => {
              const n = sec4Next()
              return (
                <div>
                  <p className="font-serif font-semibold text-primary-dark mb-2">{n} Timeline</p>
                  <NumberedList prefix={n} items={data.obligations.timeline} />
                </div>
              )
            })()}

            {data.technicalDependencies.length > 0 && (() => {
              const n = sec4Next()
              return (
                <div>
                  <p className="font-serif font-semibold text-primary-dark mb-2">{n} Technical Dependencies</p>
                  <NumberedList prefix={n} items={data.technicalDependencies} />
                </div>
              )
            })()}
          </div>
        </section>

        {/* ── 5. Success Metrics ── */}
        <section className="mb-8">
          <h2 className="font-serif text-lg font-semibold text-primary-dark mb-4">5. Success Metrics</h2>
          <NumberedList prefix="5" items={data.definitionOfDone} />
        </section>

        {/* ── 6. Quote ── */}
        <section className="mb-8">
          <h2 className="font-serif text-lg font-semibold text-primary-dark mb-4">6. Quote</h2>
          <ul className="space-y-2 text-primary-dark list-none">
            <li><span className="tabular-nums text-primary-dark/90 mr-2">{q()}</span><span className={labelClass}>Contract Type:</span> {contractTypeDisplay}</li>
            {data.estimatedHours && (
              <li><span className="tabular-nums text-primary-dark/90 mr-2">{q()}</span><span className={labelClass}>Estimated Development Hours:</span> {data.estimatedHours}</li>
            )}
            {data.estimatedTimeTotal && (
              <li><span className="tabular-nums text-primary-dark/90 mr-2">{q()}</span><span className={labelClass}>Estimated Time Total:</span> {data.estimatedTimeTotal}</li>
            )}
            {data.baseProjectFee && (
              <li><span className="tabular-nums text-primary-dark/90 mr-2">{q()}</span><span className={labelClass}>Project Fee:</span> {data.baseProjectFee}</li>
            )}
          </ul>

          {data.retainer && (() => {
            const rn = q()
            let rSub = 0
            const rNext = () => { rSub++; return `${rn}.${rSub}` }
            return (
              <div className="mt-4">
                <p className="text-primary-dark mb-2"><span className="tabular-nums text-primary-dark/90 mr-2">{rn}</span><span className={labelClass}>Retainer</span></p>
                <ul className="space-y-2 text-primary-dark list-none pl-4">
                  {data.retainerAmount && (
                    <li><span className="tabular-nums text-primary-dark/90 mr-2">{rNext()}</span><span className={labelClass}>Retainer Fee:</span> {data.retainerAmount}</li>
                  )}
                  {data.retainerDuration && (
                    <li><span className="tabular-nums text-primary-dark/90 mr-2">{rNext()}</span><span className={labelClass}>Retainer Duration:</span> {data.retainerDuration}</li>
                  )}
                  {data.retainerDetails.length > 0 && (
                    <li>
                      <span className="tabular-nums text-primary-dark/90 mr-2">{rNext()}</span><span className={labelClass}>Retainer Details:</span>
                      <ul className="list-none space-y-1 text-primary-dark mt-1 pl-6">
                        {data.retainerDetails.map((item, i) => (
                          <li key={i}><span className="text-primary-dark/90 mr-2">•</span>{item}</li>
                        ))}
                      </ul>
                    </li>
                  )}
                </ul>
              </div>
            )
          })()}

          {data.maintenance && (() => {
            const mn = q()
            let mSub = 0
            const mNext = () => { mSub++; return `${mn}.${mSub}` }
            return (
              <div className="mt-4">
                <p className="text-primary-dark mb-2"><span className="tabular-nums text-primary-dark/90 mr-2">{mn}</span><span className={labelClass}>Maintenance</span></p>
                <ul className="space-y-2 text-primary-dark list-none pl-4">
                  {data.maintenanceAmount && (
                    <li><span className="tabular-nums text-primary-dark/90 mr-2">{mNext()}</span><span className={labelClass}>Maintenance Fee:</span> {data.maintenanceAmount}</li>
                  )}
                  {data.maintenanceDuration && (
                    <li><span className="tabular-nums text-primary-dark/90 mr-2">{mNext()}</span><span className={labelClass}>Maintenance Duration:</span> {data.maintenanceDuration}</li>
                  )}
                  {data.maintenanceDetails.length > 0 && (
                    <li>
                      <span className="tabular-nums text-primary-dark/90 mr-2">{mNext()}</span><span className={labelClass}>Maintenance Details:</span>
                      <ul className="list-none space-y-1 text-primary-dark mt-1 pl-6">
                        {data.maintenanceDetails.map((item, i) => (
                          <li key={i}><span className="text-primary-dark/90 mr-2">•</span>{item}</li>
                        ))}
                      </ul>
                    </li>
                  )}
                </ul>
              </div>
            )
          })()}

          <ul className={`space-y-2 text-primary-dark list-none ${data.retainer || data.maintenance ? 'mt-4' : ''}`}>
            {data.paymentMilestones && (
              <li><span className="tabular-nums text-primary-dark/90 mr-2">{q()}</span><span className={labelClass}>Payment Milestones:</span> {data.paymentMilestones}</li>
            )}
            {data.riskBuffer && (
              <li><span className="tabular-nums text-primary-dark/90 mr-2">{q()}</span><span className={labelClass}>Risk Buffer:</span> {data.riskBuffer}</li>
            )}
            {data.externalCosts && (
              <li><span className="tabular-nums text-primary-dark/90 mr-2">{q()}</span><span className={labelClass}>External Costs:</span> {data.externalCosts}</li>
            )}
          </ul>
        </section>

        {/* ── 7. Project Milestones ── */}
        <section className="mb-10">
          <h2 className="font-serif text-lg font-semibold text-primary-dark mb-4">7. Project Milestones</h2>
          <p className="text-sm text-primary-dark/80 mb-3">
            {useWeeks ? 'Breakdown by estimated weeks per phase.' : 'Breakdown by estimated hours per phase.'}
          </p>
          <div className="overflow-x-auto rounded-lg border border-primary-dark/40">
            <table className="w-full font-serif text-primary-dark border-collapse">
              <thead>
                <tr className="bg-highlight-gold/5">
                  <th className="text-left font-semibold p-3 border-b border-primary-dark/25 align-top min-w-[11rem]">Phase / Milestone</th>
                  <th className="text-right font-semibold p-3 border-b border-primary-dark/25 w-32 align-top whitespace-nowrap">
                    {useWeeks ? 'Estimated weeks' : 'Estimated hours'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.projectMilestones.length === 0 ? (
                  <tr><td colSpan={2} className="p-3 text-primary-dark/70 text-sm">No milestones defined.</td></tr>
                ) : (
                  data.projectMilestones.flatMap((m, i) => {
                    const cellText = useWeeks
                      ? (m.weeks != null ? String(m.weeks) : '—')
                      : (() => {
                          if (m.hours == null) return '—'
                          if (m.hoursMax != null && m.hoursMax !== m.hours) return `${m.hours}–${m.hoursMax}`
                          return String(m.hours)
                        })()
                    const mainRow = (
                      <tr key={i} className="border-b border-primary-dark/15">
                        <td className="p-3 align-top font-medium">{m.name}</td>
                        <td className="p-3 text-right tabular-nums align-top">{cellText}</td>
                      </tr>
                    )
                    const subRows = (m.subFeatures ?? []).map((sub, j) => {
                      const subText = (() => {
                        if (sub.hours == null) return '—'
                        if (sub.hoursMax != null && sub.hoursMax !== sub.hours) return `${sub.hours}–${sub.hoursMax}`
                        return String(sub.hours)
                      })()
                      return (
                        <tr key={`${i}-${j}`} className="border-b border-primary-dark/15 bg-highlight-gold/5">
                          <td className="p-2 pl-8 align-top text-primary-dark/85 text-xs">{sub.name}</td>
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
                      if (useWeeks) {
                        const t = data.projectMilestones.reduce((s, m) => s + (m.weeks ?? 0), 0)
                        return t > 0 ? String(t) : '—'
                      }
                      const lo = data.projectMilestones.reduce((s, m) => s + (m.hours ?? 0), 0)
                      const hi = data.projectMilestones.reduce((s, m) => s + (m.hoursMax ?? m.hours ?? 0), 0)
                      return hi > lo ? `${lo}–${hi}` : (lo > 0 ? String(lo) : '—')
                    })()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="font-serif text-xl font-semibold text-primary-dark mt-6">
            Total quote amount: {data.totalQuoteAmount || '—'}
          </p>
        </section>

        {/* ── 8. Terms and conditions ── */}
        {(Array.isArray(data.termsAndConditions)
          ? data.termsAndConditions.length > 0
          : Object.keys(data.termsAndConditions).length > 0) && (
          <section className="mb-10">
            <h2 className="font-serif text-lg font-semibold text-primary-dark mb-4">8. Terms and Conditions</h2>
            {Array.isArray(data.termsAndConditions) ? (
              <ul className="list-none space-y-2 text-primary-dark">
                {data.termsAndConditions.map((item, i) => (
                  <li key={i}>
                    <span className="tabular-nums text-primary-dark/90 font-semibold mr-2">{i + 1}.</span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="space-y-6">
                {(() => {
                  const tc = data.termsAndConditions as Record<string, string | string[]>
                  const entries = Object.entries(tc)
                  const vatIdx = entries.findIndex(([k]) => /vat/i.test(k))
                  const generalIdx = entries.findIndex(([k]) => /general/i.test(k))
                  if (vatIdx > -1 && generalIdx > -1 && vatIdx > generalIdx) {
                    const [vatEntry] = entries.splice(vatIdx, 1)
                    entries.splice(generalIdx, 0, vatEntry)
                  }
                  return entries.map(([key, value], idx) => {
                    const title = key.replace(/^(\d+)_/, '$1. ').replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
                    const items = Array.isArray(value) ? value : [value]
                    return (
                      <div key={key}>
                        <p className="font-serif font-semibold text-primary-dark mb-2">8.{idx + 1} {title}</p>
                        <ul className="list-none space-y-1 text-primary-dark">
                          {items.map((item, i) => (
                            <li key={i}>
                              <span className="tabular-nums text-primary-dark/90 mr-2">8.{idx + 1}.{i + 1}</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })
                })()}
              </div>
            )}
          </section>
        )}

        {/* ── Signatures ── */}
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

/* ────────────────────────────────────────────
   Text proposal preview (plain-text mode)
   ──────────────────────────────────────────── */

function TextProposalPreview({ data, isRtl }: { data: TextProposalData; isRtl: boolean }) {
  const groups: { section: typeof data.sections[0]; items: typeof data.sections }[] = []
  let current: { section: typeof data.sections[0]; items: typeof data.sections } | null = null
  for (const sec of data.sections) {
    if (sec.level === 0) {
      current = { section: sec, items: [] }
      groups.push(current)
    } else if (current) {
      current.items.push(sec)
    }
  }

  return (
    <article
      id="proposal-preview"
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`proposal-preview bg-white text-primary-dark font-serif rounded-lg shadow-lg overflow-hidden print:shadow-none ${isRtl ? 'text-right' : ''}`}
    >
      <div className="p-8 sm:p-10 md:p-12">
        <ProposalHeader proposalDate={data.date} isRtl={isRtl} showSignatureDue={false} />
        <h1 className="font-serif text-xl font-semibold text-primary-dark text-center mb-8 mt-6">
          {data.title || 'Proposal'}
        </h1>
        <div className="space-y-8">
          {groups.map((g, gi) => (
            <section key={gi} className="mb-8">
              <h2 className="font-serif text-lg font-semibold text-primary-dark mb-4">
                {g.section.number}. {g.section.content}
              </h2>
              <ul className="list-none space-y-2 text-primary-dark">
                {g.items.map((sec, i) => (
                  <li key={i}>
                    <span className={`tabular-nums text-primary-dark/90 font-semibold ${isRtl ? 'ml-2' : 'mr-2'}`}>
                      {sec.number}
                    </span>
                    {sec.content}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}

/* ────────────────────────────────────────────
   Initial templates
   ──────────────────────────────────────────── */

const INITIAL_JSON = `{
  "clientName": "",
  "recipientName": "",
  "businessType": "",
  "frankensteinStatus": "",
  "corePainPoint": "",
  "concept": "",
  "levelOfService": "Level 1 (Micro-Tool/Website)",
  "contractType": "hourly",
  "inScope": [],
  "outOfScope": [],
  "clientMustProvide": [],
  "obligations": {
    "assets": [],
    "technical": [],
    "timeline": []
  },
  "technicalDependencies": [],
  "definitionOfDone": [],
  "estimatedHours": "",
  "estimatedTimeTotal": "",
  "baseProjectFee": "",
  "retainer": false,
  "retainerAmount": "",
  "retainerDuration": "",
  "retainerDetails": [],
  "maintenance": false,
  "maintenanceAmount": "",
  "maintenanceDuration": "",
  "maintenanceDetails": [],
  "paymentMilestones": "",
  "riskBuffer": "",
  "externalCosts": "",
  "totalQuoteAmount": "",
  "projectMilestones": [
    { "name": "", "hours": 0, "weeks": 0 }
  ],
  "termsAndConditions": [],
  "proposalDate": "",
  "signatureDueDate": "",
  "myName": "",
  "myBusinessName": "",
  "organisationName": ""
}`

const INITIAL_TEXT = `Proposal title
Date: 2025-01-15

1. Introduction
1.1 Background
1.2 Goals
2. Scope
2.1 In scope
2.2 Out of scope
`

const JSON_TEMPLATE_REFERENCE = (
  <div className="text-sm text-primary-dark/85 space-y-2 rounded-lg bg-primary-dark/5 border border-primary-dark/15 p-3">
    <p className="font-semibold text-primary-dark">Template reference</p>
    <p className="font-medium text-primary-dark/90">Optional fields (can omit or leave empty):</p>
    <ul className="list-disc list-inside space-y-0.5 text-primary-dark/80">
      <li>recipientName</li>
      <li>estimatedTimeTotal</li>
      <li>clientMustProvide, technicalDependencies</li>
      <li>termsAndConditions</li>
      <li>retainerAmount, retainerDuration, retainerDetails (only when retainer: true)</li>
      <li>maintenanceAmount, maintenanceDuration, maintenanceDetails (only when maintenance: true)</li>
    </ul>
    <p className="font-medium text-primary-dark/90 mt-2">Enums / options:</p>
    <ul className="list-disc list-inside space-y-0.5 text-primary-dark/80">
      <li><strong>levelOfService</strong>: &quot;Level 1 (Micro-Tool/Website)&quot; | &quot;Level 2 (Full App System)&quot;</li>
      <li><strong>contractType</strong>: &quot;hourly&quot; (table → hours) | &quot;weekly&quot; or &quot;project&quot; (table → weeks)</li>
      <li><strong>retainer</strong>: true | false — shows retainer subsection in Quote (fee, duration, details)</li>
      <li><strong>maintenance</strong>: true | false — shows maintenance subsection in Quote (fee, duration, details)</li>
      <li><strong>projectMilestones</strong>: each has name + hours (for hourly) or weeks (for project/weekly)</li>
      <li><strong>termsAndConditions</strong>: array of strings, or object with section keys</li>
    </ul>
  </div>
)

/* ────────────────────────────────────────────
   Page component
   ──────────────────────────────────────────── */

type EditorMode = 'json' | 'text'

export default function ProposalPage() {
  const [editorMode, setEditorMode] = useState<EditorMode>('json')
  const [rawInput, setRawInput] = useState(INITIAL_JSON)
  const [error, setError] = useState<string | null>(null)
  const [proposal, setProposal] = useState<ProposalData | null>(null)
  const [textProposal, setTextProposal] = useState<TextProposalData | null>(null)
  const [manualOpen, setManualOpen] = useState(false)

  const validate = useCallback((text: string, mode: EditorMode) => {
    setRawInput(text)
    setProposal(null)
    setTextProposal(null)
    if (!text.trim()) {
      setError(null)
      return
    }
    if (mode === 'json') {
      let parsed: unknown
      try {
        parsed = JSON.parse(text)
      } catch {
        setError('Invalid JSON. Check brackets and commas.')
        return
      }
      const result = parseProposalData(parsed)
      if (result.success) {
        setError(null)
        setProposal(result.data)
      } else {
        setError(result.error)
      }
    } else {
      const textResult = parseTextProposal(text)
      if (textResult.success) {
        setError(null)
        setTextProposal(textResult.data)
      } else {
        setError(textResult.error)
      }
    }
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    validate(e.target.value, editorMode)
  }, [editorMode, validate])

  const handleModeSwitch = useCallback((mode: EditorMode) => {
    setEditorMode(mode)
    setError(null)
    setProposal(null)
    setTextProposal(null)
    validate(rawInput, mode)
  }, [rawInput, validate])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const text = typeof reader.result === 'string' ? reader.result : ''
      validate(text, editorMode)
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const hasPreview = !!proposal || !!textProposal
  const isRtlJson = proposal ? isHebrewRtl([proposal.clientName, proposal.concept, proposal.frankensteinStatus].join(' ')) : false
  const isRtlText = textProposal ? isHebrewRtl(rawInput) : false

  return (
    <div className="space-y-6">
      <div className="no-print space-y-4">
        <h1 className="font-serif text-2xl font-semibold text-primary-dark">Proposal generator</h1>
        <p className="text-primary-dark/80 text-sm">
          Choose an editor mode, then paste or upload content. Hebrew/RTL is supported. Use &quot;Download PDF&quot; to save as PDF.
        </p>

        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-sm text-primary-dark/80">Editor:</span>
          <button
            type="button"
            onClick={() => handleModeSwitch('json')}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${editorMode === 'json' ? 'bg-highlight-gold text-primary-dark' : 'bg-secondary-accent/20 text-primary-dark hover:bg-secondary-accent/30'}`}
          >
            JSON editor
          </button>
          <button
            type="button"
            onClick={() => handleModeSwitch('text')}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${editorMode === 'text' ? 'bg-highlight-gold text-primary-dark' : 'bg-secondary-accent/20 text-primary-dark hover:bg-secondary-accent/30'}`}
          >
            Text editor
          </button>
          <label className="cursor-pointer px-4 py-2 rounded-md bg-secondary-accent/20 text-primary-dark font-medium hover:bg-secondary-accent/30 transition-colors text-sm ml-2">
            {editorMode === 'json' ? 'Upload .json' : 'Upload .txt'}
            <input
              type="file"
              accept={editorMode === 'json' ? '.json,application/json' : '.txt,text/plain'}
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>
        </div>

        {editorMode === 'json' && JSON_TEMPLATE_REFERENCE}

        <textarea
          value={rawInput}
          onChange={handleInputChange}
          placeholder={editorMode === 'json' ? 'Paste or edit proposal JSON…' : 'Paste numbered text (e.g. 1. Section, 1.1 Item)…'}
          className="w-full min-h-[220px] p-4 rounded-lg border border-primary-dark/20 bg-white text-primary-dark font-mono text-sm focus:outline-none focus:ring-2 focus:ring-secondary-accent/50"
          spellCheck={false}
        />

        {error && (
          <p className="text-red-600 text-sm font-medium" role="alert">{error}</p>
        )}

        <div className="border border-primary-dark/20 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setManualOpen((o) => !o)}
            className="w-full px-4 py-3 flex items-center justify-between bg-primary-dark/5 hover:bg-primary-dark/10 text-primary-dark font-medium text-sm transition-colors"
          >
            Manual
            <span className="text-primary-dark/70">{manualOpen ? '▼' : '▶'}</span>
          </button>
          {manualOpen && (
            <div className="p-4 pt-0 text-sm text-primary-dark/90 space-y-4 border-t border-primary-dark/15">
              <div>
                <p className="font-semibold text-primary-dark mb-1">JSON editor</p>
                <p className="mb-2">
                  Structured proposal data. Required fields: clientName, businessType, concept, inScope, outOfScope, definitionOfDone.
                  Use contractType &quot;hourly&quot; (milestones show hours) or &quot;project&quot; (milestones show weeks).
                  obligations.assets / .technical / .timeline populate Section 4.
                  Optional: retainer (+ retainerAmount/Duration/Details), maintenance (+ maintenanceAmount/Duration/Details), estimatedTimeTotal, termsAndConditions (array or object with section keys). Both camelCase and snake_case keys are supported.
                </p>
              </div>
              <div>
                <p className="font-semibold text-primary-dark mb-1">Text editor</p>
                <p className="mb-2">
                  Plain text with numbered sections. Line 1 = title, line 2 = date (optional), then &quot;1. Section&quot;, &quot;1.1 Item&quot;, etc.
                  Same styling, no signatures.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            disabled={!hasPreview}
            className="px-5 py-2.5 rounded-md bg-highlight-gold text-primary-dark font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50"
          >
            Download PDF
          </button>
          <span className="text-sm text-primary-dark/70">
            {hasPreview
              ? 'Print → Save as PDF'
              : editorMode === 'json'
                ? 'Enter valid JSON to enable'
                : 'Enter numbered text (1., 1.1, …) to enable'}
          </span>
        </div>
      </div>

      <div className="no-print">
        <h2 className="font-serif text-lg font-semibold text-primary-dark mb-3">Preview</h2>
        {!hasPreview && rawInput.trim() && (
          <p className="text-primary-dark/70 text-sm mb-4">Fix the errors above to see the proposal preview.</p>
        )}
      </div>

      {proposal && <ProposalPreview data={proposal} isRtl={isRtlJson} />}
      {textProposal && <TextProposalPreview data={textProposal} isRtl={isRtlText} />}
    </div>
  )
}
