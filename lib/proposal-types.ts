/**
 * Proposal data model for the internal product proposal PDF feature.
 * Mirrors the 6-section structure: Client Identity, Solution Vision, Scope Fence,
 * Requirements, Success Metrics, Quote.
 */

export type LevelOfService = 'Level 1 (Micro-Tool/Website)' | 'Level 2 (Full App System)'

/** Hourly-based contract: table shows estimated hours per milestone. Project-based: shows estimated days. */
export type ContractType = 'hourly' | 'project'

export interface ProjectMilestoneSubFeature {
  name: string
  hours?: number
  hoursMax?: number
  days?: number
  daysMax?: number
}

export interface ProjectMilestone {
  name: string
  hours?: number
  hoursMax?: number
  days?: number
  daysMax?: number
  /** Optional breakdown of this milestone into features (e.g. MVP build → Feature 1, Feature 2, …) */
  subFeatures?: ProjectMilestoneSubFeature[]
}

export interface ProposalData {
  /** 1. The Client Identity (Context) */
  clientName: string
  /** Person the document is addressed to (signatory) */
  recipientName: string
  businessType: string
  frankensteinStatus: string
  corePainPoint: string

  /** 2. The Solution Vision (High Level) - levelOfService is internal only, not shown on PDF */
  concept: string
  levelOfService: LevelOfService

  /** 3. The Scope Fence */
  inScope: string[]
  outOfScope: string[]

  /** 4. Deliverables & Obligations */
  clientMustProvide: string[]
  /** Obligations to the client / what the client's client must provide */
  clientObligations: string[]
  technicalDependencies: string[]

  /** 5. Success Metrics (Definition of Done) */
  definitionOfDone: string[]

  /** 6. The Quote */
  estimatedHours: string
  baseProjectFee: string
  paymentMilestones: string
  riskBuffer: string
  externalCosts: string
  /** Total quote amount (you insert this yourself) */
  totalQuoteAmount: string

  /** Project timeline: hourly (show hours per phase) or project/deadline (show days per phase) */
  contractType: ContractType
  projectMilestones: ProjectMilestone[]

  /** Dates */
  proposalDate: string
  signatureDueDate: string

  /** Sign page: signatory (provider) */
  myName: string
  myBusinessName: string
  /** Signatory's organisation (shown under recipient name on sign page) */
  organisationName: string
}

const LEVELS: LevelOfService[] = [
  'Level 1 (Micro-Tool/Website)',
  'Level 2 (Full App System)',
]

const CONTRACT_TYPES: ContractType[] = ['hourly', 'project']

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

/** Parse "21 to 26", "21-26", "21 – 26" into { min, max }. Single number returns { min, max: same }. */
function parseRange(v: unknown): { min: number; max: number } | undefined {
  if (typeof v === 'number' && !Number.isNaN(v)) return { min: v, max: v }
  if (typeof v !== 'string') return undefined
  const s = v.trim()
  const toMatch = s.match(/^(\d+(?:\.\d+)?)\s*(?:\s+to\s+|\s*[-–—]\s*)\s*(\d+(?:\.\d+)?)$/i)
  if (toMatch) {
    const min = Number(toMatch[1])
    const max = Number(toMatch[2])
    if (!Number.isNaN(min) && !Number.isNaN(max)) return { min, max: max >= min ? max : min }
  }
  const single = parseNum(s)
  if (single !== undefined) return { min: single, max: single }
  return undefined
}

function isProjectMilestone(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object') return false
  const o = value as Record<string, unknown>
  return typeof o.name === 'string'
}

function normalizeSubFeature(raw: unknown): ProjectMilestoneSubFeature | null {
  if (raw === null || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  if (typeof o.name !== 'string') return null
  const hoursRange = parseRange(o.hours)
  const daysRange = parseRange(o.days)
  const hMin = hoursRange?.min ?? parseNum(o.hours)
  const hMax = hoursRange?.max
  const dMin = daysRange?.min ?? parseNum(o.days)
  const dMax = daysRange?.max
  return {
    name: o.name as string,
    hours: hMin,
    hoursMax: parseNum(o.hoursMax) ?? (hMax != null && hMax !== hMin ? hMax : undefined),
    days: dMin,
    daysMax: parseNum(o.daysMax) ?? (dMax != null && dMax !== dMin ? dMax : undefined),
  }
}

function normalizeProjectMilestones(value: unknown): ProjectMilestone[] {
  if (!Array.isArray(value)) return []
  return value
    .filter(isProjectMilestone)
    .map((o) => {
      const raw = o as Record<string, unknown>
      const hoursRange = parseRange(raw.hours)
      const hoursExplicitMax = parseNum(raw.hoursMax)
      const daysRange = parseRange(raw.days)
      const daysExplicitMax = parseNum(raw.daysMax)
      const hMin = hoursRange?.min ?? parseNum(raw.hours)
      const hMax = hoursRange?.max
      const dMin = daysRange?.min ?? parseNum(raw.days)
      const dMax = daysRange?.max
      const subRaw = raw.subFeatures
      const subFeatures: ProjectMilestoneSubFeature[] = Array.isArray(subRaw)
        ? subRaw.map(normalizeSubFeature).filter((s): s is ProjectMilestoneSubFeature => s != null)
        : []
      return {
        name: raw.name as string,
        hours: hMin,
        hoursMax: parseNum(raw.hoursMax) ?? (hMax != null && hMax !== hMin ? hMax : undefined),
        days: dMin,
        daysMax: parseNum(raw.daysMax) ?? (dMax != null && dMax !== dMin ? dMax : undefined),
        subFeatures: subFeatures.length > 0 ? subFeatures : undefined,
      }
    })
}

/**
 * Type guard and validator for proposal JSON. Returns the parsed data or an error message.
 */
export function parseProposalData(value: unknown): { success: true; data: ProposalData } | { success: false; error: string } {
  if (value === null || typeof value !== 'object') {
    return { success: false, error: 'Input must be a JSON object.' }
  }

  const o = value as Record<string, unknown>

  const clientName = o.clientName
  if (typeof clientName !== 'string' || !clientName.trim()) {
    return { success: false, error: 'clientName is required and must be a non-empty string.' }
  }

  const businessType = o.businessType
  if (typeof businessType !== 'string' || !businessType.trim()) {
    return { success: false, error: 'businessType is required and must be a non-empty string.' }
  }

  const frankensteinStatus = o.frankensteinStatus
  if (typeof frankensteinStatus !== 'string') {
    return { success: false, error: 'frankensteinStatus must be a string.' }
  }

  const corePainPoint = o.corePainPoint
  if (typeof corePainPoint !== 'string') {
    return { success: false, error: 'corePainPoint must be a string.' }
  }

  const concept = o.concept
  if (typeof concept !== 'string' || !concept.trim()) {
    return { success: false, error: 'concept is required and must be a non-empty string.' }
  }

  const levelOfService = o.levelOfService
  if (typeof levelOfService !== 'string' || !LEVELS.includes(levelOfService as LevelOfService)) {
    return { success: false, error: `levelOfService must be one of: ${LEVELS.join(', ')}.` }
  }

  if (!isStringArray(o.inScope)) {
    return { success: false, error: 'inScope must be an array of strings.' }
  }
  if (!isStringArray(o.outOfScope)) {
    return { success: false, error: 'outOfScope must be an array of strings.' }
  }
  if (!isStringArray(o.clientMustProvide)) {
    return { success: false, error: 'clientMustProvide must be an array of strings.' }
  }
  const clientObligations = isStringArray(o.clientObligations) ? o.clientObligations : []
  if (!isStringArray(o.technicalDependencies)) {
    return { success: false, error: 'technicalDependencies must be an array of strings.' }
  }
  if (!isStringArray(o.definitionOfDone)) {
    return { success: false, error: 'definitionOfDone must be an array of strings.' }
  }

  const estimatedHours = o.estimatedHours
  if (typeof estimatedHours !== 'string') {
    return { success: false, error: 'estimatedHours must be a string.' }
  }
  const baseProjectFee = o.baseProjectFee
  if (typeof baseProjectFee !== 'string') {
    return { success: false, error: 'baseProjectFee must be a string.' }
  }
  const paymentMilestones = o.paymentMilestones
  if (typeof paymentMilestones !== 'string') {
    return { success: false, error: 'paymentMilestones must be a string.' }
  }
  const riskBuffer = o.riskBuffer
  if (typeof riskBuffer !== 'string') {
    return { success: false, error: 'riskBuffer must be a string.' }
  }
  const externalCosts = o.externalCosts
  if (typeof externalCosts !== 'string') {
    return { success: false, error: 'externalCosts must be a string.' }
  }

  const contractTypeRaw = o.contractType
  const contractType =
    typeof contractTypeRaw === 'string' && CONTRACT_TYPES.includes(contractTypeRaw as ContractType)
      ? (contractTypeRaw as ContractType)
      : 'project'

  const projectMilestones = normalizeProjectMilestones(o.projectMilestones)

  const recipientName = typeof o.recipientName === 'string' ? o.recipientName : ''
  const proposalDate = typeof o.proposalDate === 'string' ? o.proposalDate : ''
  const signatureDueDate = typeof o.signatureDueDate === 'string' ? o.signatureDueDate : ''
  const myName = typeof o.myName === 'string' ? o.myName : ''
  const myBusinessName = typeof o.myBusinessName === 'string' ? o.myBusinessName : ''
  const organisationName = typeof o.organisationName === 'string' ? o.organisationName : ''
  const totalQuoteAmount = typeof o.totalQuoteAmount === 'string' ? o.totalQuoteAmount : ''

  const data: ProposalData = {
    clientName: clientName.trim(),
    recipientName,
    businessType: businessType.trim(),
    frankensteinStatus: String(frankensteinStatus),
    corePainPoint: String(corePainPoint),
    concept: concept.trim(),
    levelOfService: levelOfService as LevelOfService,
    inScope: o.inScope,
    outOfScope: o.outOfScope,
    clientMustProvide: o.clientMustProvide,
    clientObligations,
    technicalDependencies: o.technicalDependencies,
    definitionOfDone: o.definitionOfDone,
    estimatedHours: String(estimatedHours),
    baseProjectFee: String(baseProjectFee),
    paymentMilestones: String(paymentMilestones),
    riskBuffer: String(riskBuffer),
    externalCosts: String(externalCosts),
    totalQuoteAmount,
    contractType,
    projectMilestones,
    proposalDate,
    signatureDueDate,
    myName,
    myBusinessName,
    organisationName,
  }

  return { success: true, data }
}
