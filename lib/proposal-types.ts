/**
 * Proposal data model – single canonical version.
 *
 * Accepts both camelCase and snake_case JSON keys.
 *
 * contractType drives the milestones table:
 *   "hourly"  → column shows estimated hours
 *   "weekly" / "project" → column shows estimated weeks
 *
 * retainer & maintenance are boolean flags.
 * When true, the document shows the corresponding subsection in the Quote.
 */

export type LevelOfService = 'Level 1 (Micro-Tool/Website)' | 'Level 2 (Full App System)'

export type ContractType = 'hourly' | 'weekly' | 'project'

export interface Obligations {
  assets: string[]
  technical: string[]
  timeline: string[]
}

export interface ProjectMilestoneSubFeature {
  name: string
  hours?: number
  hoursMax?: number
}

export interface ProjectMilestone {
  name: string
  hours?: number
  hoursMax?: number
  weeks?: number
  subFeatures?: ProjectMilestoneSubFeature[]
}

export interface ProposalData {
  /* ── 1. Client Details ── */
  clientName: string
  recipientName: string
  businessType: string

  /* ── 2. Executive Summary ── */
  frankensteinStatus: string
  corePainPoint: string
  concept: string
  levelOfService: LevelOfService

  /* ── 3. Project Scope ── */
  inScope: string[]
  outOfScope: string[]

  /* ── 4. Deliverables & Obligations ── */
  clientMustProvide: string[]
  obligations: Obligations
  technicalDependencies: string[]

  /* ── 5. Success Metrics ── */
  definitionOfDone: string[]

  /* ── 6. Quote ── */
  estimatedHours: string
  estimatedTimeTotal: string
  baseProjectFee: string
  contractType: ContractType

  retainer: boolean
  retainerAmount: string
  retainerDuration: string
  retainerDetails: string[]

  maintenance: boolean
  maintenanceAmount: string
  maintenanceDuration: string
  maintenanceDetails: string[]

  paymentMilestones: string
  riskBuffer: string
  externalCosts: string
  totalQuoteAmount: string

  /* ── 7. Project Milestones ── */
  projectMilestones: ProjectMilestone[]

  /* ── 8. Terms and conditions ── */
  termsAndConditions: string[] | Record<string, string | string[]>

  /* ── Dates & signatures ── */
  proposalDate: string
  signatureDueDate: string
  myName: string
  myBusinessName: string
  organisationName: string
}

/* ── Helpers ── */

const LEVELS: LevelOfService[] = [
  'Level 1 (Micro-Tool/Website)',
  'Level 2 (Full App System)',
]

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function parseNum(v: unknown): number | undefined {
  if (typeof v === 'number' && !Number.isNaN(v)) return v
  if (typeof v === 'string') {
    const n = Number(v.trim())
    return Number.isNaN(n) ? undefined : n
  }
  return undefined
}

function parseRange(v: unknown): { min: number; max: number } | undefined {
  if (typeof v === 'number' && !Number.isNaN(v)) return { min: v, max: v }
  if (typeof v !== 'string') return undefined
  const s = v.trim()
  const m = s.match(/^(\d+(?:\.\d+)?)\s*(?:\s+to\s+|\s*[-–—]\s*)\s*(\d+(?:\.\d+)?)$/i)
  if (m) {
    const lo = Number(m[1])
    const hi = Number(m[2])
    if (!Number.isNaN(lo) && !Number.isNaN(hi)) return { min: lo, max: Math.max(lo, hi) }
  }
  const single = parseNum(s)
  if (single !== undefined) return { min: single, max: single }
  return undefined
}

function str(v: unknown, fallback = ''): string {
  return typeof v === 'string' ? v : fallback
}

function bool(v: unknown): boolean {
  return v === true || v === 'true'
}

/** Read a value from an object trying camelCase first, then snake_case. */
function get(o: Record<string, unknown>, camel: string, snake: string): unknown {
  return o[camel] !== undefined ? o[camel] : o[snake]
}

/* ── Normalizers ── */

function normalizeObligations(value: unknown): Obligations {
  const empty: Obligations = { assets: [], technical: [], timeline: [] }
  if (value === null || typeof value !== 'object') return empty
  const o = value as Record<string, unknown>
  return {
    assets: isStringArray(o.assets) ? o.assets : [],
    technical: isStringArray(o.technical) ? o.technical : [],
    timeline: isStringArray(o.timeline) ? o.timeline : [],
  }
}

function normalizeTermsAndConditions(value: unknown): string[] | Record<string, string | string[]> {
  if (isStringArray(value)) return value
  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    const o = value as Record<string, unknown>
    const out: Record<string, string | string[]> = {}
    for (const key of Object.keys(o)) {
      const v = o[key]
      if (typeof v === 'string') out[key] = v
      else if (isStringArray(v)) out[key] = v
    }
    return Object.keys(out).length > 0 ? out : []
  }
  return []
}

function normalizeSubFeature(raw: unknown): ProjectMilestoneSubFeature | null {
  if (raw === null || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  if (typeof o.name !== 'string') return null
  const range = parseRange(o.hours)
  const hMin = range?.min ?? parseNum(o.hours)
  const hMax = range?.max
  return {
    name: o.name as string,
    hours: hMin,
    hoursMax: parseNum(o.hoursMax) ?? (hMax != null && hMax !== hMin ? hMax : undefined),
  }
}

function normalizeMilestones(value: unknown): ProjectMilestone[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((v): v is Record<string, unknown> =>
      v !== null && typeof v === 'object' && typeof (v as Record<string, unknown>).name === 'string')
    .map((raw) => {
      const range = parseRange(raw.hours)
      const hMin = range?.min ?? parseNum(raw.hours)
      const hMax = range?.max
      const subRaw = raw.subFeatures ?? raw.sub_features
      const subs: ProjectMilestoneSubFeature[] = Array.isArray(subRaw)
        ? subRaw.map(normalizeSubFeature).filter((s): s is ProjectMilestoneSubFeature => s != null)
        : []
      return {
        name: raw.name as string,
        hours: hMin,
        hoursMax: parseNum(raw.hoursMax) ?? parseNum(raw.hours_max) ?? (hMax != null && hMax !== hMin ? hMax : undefined),
        weeks: parseNum(raw.weeks),
        subFeatures: subs.length > 0 ? subs : undefined,
      }
    })
}

/* ── Main parser ── */

export function parseProposalData(
  value: unknown
): { success: true; data: ProposalData } | { success: false; error: string } {
  if (value === null || typeof value !== 'object') {
    return { success: false, error: 'Input must be a JSON object.' }
  }

  const o = value as Record<string, unknown>

  const clientName = str(get(o, 'clientName', 'client_name'))
  if (!clientName.trim()) return { success: false, error: 'clientName / client_name is required.' }

  const businessType = str(get(o, 'businessType', 'business_type'))
  if (!businessType.trim()) return { success: false, error: 'businessType / business_type is required.' }

  const concept = str(get(o, 'concept', 'concept'))
  if (!concept.trim()) return { success: false, error: 'concept is required.' }

  const inScopeRaw = get(o, 'inScope', 'in_scope')
  if (!isStringArray(inScopeRaw)) return { success: false, error: 'inScope / in_scope must be an array of strings.' }

  const outOfScopeRaw = get(o, 'outOfScope', 'out_of_scope')
  if (!isStringArray(outOfScopeRaw)) return { success: false, error: 'outOfScope / out_of_scope must be an array of strings.' }

  const dodRaw = get(o, 'definitionOfDone', 'definition_of_done')
  if (!isStringArray(dodRaw)) return { success: false, error: 'definitionOfDone / definition_of_done must be an array of strings.' }

  const levelRaw = str(get(o, 'levelOfService', 'level_of_service'))
  const levelOfService: LevelOfService = LEVELS.includes(levelRaw as LevelOfService)
    ? (levelRaw as LevelOfService)
    : 'Level 1 (Micro-Tool/Website)'

  const VALID: ContractType[] = ['hourly', 'weekly', 'project']
  const HE_CONTRACT_MAP: Record<string, ContractType> = {
    'שעתי': 'hourly',
    'שבועי': 'weekly',
    'פרויקט': 'project',
  }
  const ctStripped = str(get(o, 'contractType', 'contract_type'), 'hourly')
    .toLowerCase()
    .replace(/\s*\+\s*retainer\s*/i, '').replace(/\s*\+\s*maintenance\s*/i, '')
    .replace(/\s*\+\s*ריטיינר\s*/, '').replace(/\s*\+\s*תחזוקה\s*/, '')
    .trim()
  const contractType: ContractType =
    VALID.includes(ctStripped as ContractType) ? (ctStripped as ContractType)
    : HE_CONTRACT_MAP[ctStripped] ?? 'hourly'

  const ctString = str(get(o, 'contractType', 'contract_type'), '')
  const retainerFromFlag = bool(get(o, 'retainer', 'retainer'))
  const retainer = retainerFromFlag || /retainer|ריטיינר/i.test(ctString)

  const maintenanceFromFlag = bool(get(o, 'maintenance', 'maintenance'))
  const maintenance = maintenanceFromFlag || /maintenance|תחזוקה/i.test(ctString)

  const cmpRaw = get(o, 'clientMustProvide', 'client_must_provide')
  const tdRaw = get(o, 'technicalDependencies', 'technical_dependencies')

  const data: ProposalData = {
    clientName: clientName.trim(),
    recipientName: str(get(o, 'recipientName', 'recipient_name')),
    businessType: businessType.trim(),
    frankensteinStatus: str(get(o, 'frankensteinStatus', 'frankenstein_status')),
    corePainPoint: str(get(o, 'corePainPoint', 'core_pain_point')),
    concept: concept.trim(),
    levelOfService,
    inScope: inScopeRaw,
    outOfScope: outOfScopeRaw,
    clientMustProvide: isStringArray(cmpRaw) ? cmpRaw : [],
    obligations: normalizeObligations(o.obligations),
    technicalDependencies: isStringArray(tdRaw) ? tdRaw : [],
    definitionOfDone: dodRaw,
    estimatedHours: str(get(o, 'estimatedHours', 'estimated_hours')),
    estimatedTimeTotal: str(get(o, 'estimatedTimeTotal', 'estimated_time_total')),
    baseProjectFee: str(get(o, 'baseProjectFee', 'base_project_fee')),
    contractType,
    retainer,
    retainerAmount: str(get(o, 'retainerAmount', 'retainer_amount') ?? get(o, 'retainerFee', 'retainer_fee')),
    retainerDuration: str(get(o, 'retainerDuration', 'retainer_duration')),
    retainerDetails: (() => {
      const v = get(o, 'retainerDetails', 'retainer_details')
      return isStringArray(v) ? v : []
    })(),
    maintenance,
    maintenanceAmount: str(get(o, 'maintenanceAmount', 'maintenance_amount') ?? get(o, 'maintenanceFee', 'maintenance_fee')),
    maintenanceDuration: str(get(o, 'maintenanceDuration', 'maintenance_duration')),
    maintenanceDetails: (() => {
      const v = get(o, 'maintenanceDetails', 'maintenance_details')
      return isStringArray(v) ? v : []
    })(),
    paymentMilestones: str(get(o, 'paymentMilestones', 'payment_milestones')),
    riskBuffer: str(get(o, 'riskBuffer', 'risk_buffer')),
    externalCosts: str(get(o, 'externalCosts', 'external_costs')),
    totalQuoteAmount: str(get(o, 'totalQuoteAmount', 'total_quote_amount')),
    projectMilestones: normalizeMilestones(get(o, 'projectMilestones', 'project_milestones')),
    termsAndConditions: normalizeTermsAndConditions(get(o, 'termsAndConditions', 'terms_and_conditions')),
    proposalDate: str(get(o, 'proposalDate', 'proposal_date')),
    signatureDueDate: str(get(o, 'signatureDueDate', 'signature_due_date')),
    myName: str(get(o, 'myName', 'my_name')),
    myBusinessName: str(get(o, 'myBusinessName', 'my_business_name')),
    organisationName: str(get(o, 'organisationName', 'organisation_name')),
  }

  return { success: true, data }
}
