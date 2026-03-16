/**
 * Front-end map: every label/title shown on the proposal document
 * and the JSON key (camelCase or snake_case) that supplies the value.
 *
 * Use this as the source of truth for translations (e.g. Hebrew).
 * Keys are the backend field names; labels are the English text shown on the PDF.
 */

export const PROPOSAL_FRONTEND_MAP = {
  /** Main document title (centered below header) */
  documentTitle: {
    label: 'Product Proposal',
    key: null as string | null,
  },

  /** Header (logo row) */
  header: {
    companyNameEn: { label: 'Even Pinah Services', key: null },
    companyNameHe: { label: 'שירותי אבן פינה', key: null },
    dateOfProposal: { label: 'Date of proposal:', key: 'proposalDate' }, // proposal_date
    dueDateForSignature: { label: 'Due date for signature:', key: 'signatureDueDate' }, // signature_due_date
  },

  /** Section 1 */
  section1: {
    title: { label: '1. Client Details', key: null },
    clientName: { label: 'Client Name:', key: 'clientName' }, // client_name
    addressedTo: { label: 'Addressed To:', key: 'recipientName' }, // recipient_name
    businessType: { label: 'Business Type:', key: 'businessType' }, // business_type
  },

  /** Section 2 */
  section2: {
    title: { label: '2. Executive Summary', key: null },
    currentSituation: { label: 'Current situation:', key: 'frankensteinStatus' }, // frankenstein_status
    corePainPoint: { label: 'Core pain point:', key: 'corePainPoint' }, // core_pain_point
    concept: { label: 'Concept:', key: 'concept' }, // concept
  },

  /** Section 3 */
  section3: {
    title: { label: '3. Project Scope', key: null },
    inScope: { label: '3.1 In Scope', key: 'inScope' }, // in_scope
    futureFeatures: { label: '3.2 Future Features', key: 'outOfScope' }, // out_of_scope
  },

  /** Section 4 */
  section4: {
    title: { label: '4. Client Obligations', key: null },
    clientMustProvide: { label: 'Client Must Provide', key: 'clientMustProvide' }, // client_must_provide
    assets: { label: 'Assets', key: 'obligations.assets' },
    technical: { label: 'Technical', key: 'obligations.technical' },
    timeline: { label: 'Timeline', key: 'obligations.timeline' },
    technicalDependencies: { label: 'Technical Dependencies', key: 'technicalDependencies' }, // technical_dependencies
  },

  /** Section 5 */
  section5: {
    title: { label: '5. Success Metrics', key: null },
    items: { label: null, key: 'definitionOfDone' }, // definition_of_done
  },

  /** Section 6 */
  section6: {
    title: { label: '6. Quote', key: null },
    contractType: { label: 'Contract Type:', key: 'contractType' }, // contract_type (+ retainer/maintenance from flags)
    estimatedDevelopmentHours: { label: 'Estimated Development Hours:', key: 'estimatedHours' }, // estimated_hours
    estimatedTimeTotal: { label: 'Estimated Time Total:', key: 'estimatedTimeTotal' }, // estimated_time_total
    projectFee: { label: 'Project Fee:', key: 'baseProjectFee' }, // base_project_fee
    retainer: { label: 'Retainer', key: null },
    retainerFee: { label: 'Retainer Fee:', key: 'retainerAmount' }, // retainer_amount, retainer_fee
    retainerDuration: { label: 'Retainer Duration:', key: 'retainerDuration' }, // retainer_duration
    retainerDetails: { label: 'Retainer Details:', key: 'retainerDetails' }, // retainer_details
    maintenance: { label: 'Maintenance', key: null },
    maintenanceFee: { label: 'Maintenance Fee:', key: 'maintenanceAmount' }, // maintenance_amount
    maintenanceDuration: { label: 'Maintenance Duration:', key: 'maintenanceDuration' }, // maintenance_duration
    maintenanceDetails: { label: 'Maintenance Details:', key: 'maintenanceDetails' }, // maintenance_details
    paymentMilestones: { label: 'Payment Milestones:', key: 'paymentMilestones' }, // payment_milestones
    riskBuffer: { label: 'Risk Buffer:', key: 'riskBuffer' }, // risk_buffer
    externalCosts: { label: 'External Costs:', key: 'externalCosts' }, // external_costs
    totalQuoteAmount: { label: 'Total quote amount:', key: 'totalQuoteAmount' }, // total_quote_amount
  },

  /** Section 7 */
  section7: {
    title: { label: '7. Project Milestones', key: null },
    tableCaptionWeeks: { label: 'Breakdown by estimated weeks per phase.', key: null },
    tableCaptionHours: { label: 'Breakdown by estimated hours per phase.', key: null },
    tableHeaderPhase: { label: 'Phase / Milestone', key: null },
    tableHeaderEstimatedWeeks: { label: 'Estimated weeks', key: null },
    tableHeaderEstimatedHours: { label: 'Estimated hours', key: null },
    tableEmpty: { label: 'No milestones defined.', key: null },
    tableFooterTotal: { label: 'Total', key: null },
    milestoneName: { label: null, key: 'projectMilestones[].name' }, // project_milestones[].name
    milestoneWeeks: { label: null, key: 'projectMilestones[].weeks' },
    milestoneHours: { label: null, key: 'projectMilestones[].hours' },
  },

  /** Section 8 */
  section8: {
    title: { label: '8. Terms and Conditions', key: null },
    /** Subsection titles come from termsAndConditions object keys, title-cased (e.g. financial_commencement → "Financial Commencement") */
    subsectionTitleFromKey: { label: null, key: 'termsAndConditions (object keys)' }, // terms_and_conditions
    subsectionItems: { label: null, key: 'termsAndConditions (object values)' },
  },

  /** Signatures block */
  signatures: {
    title: { label: 'Signatures', key: null },
    signatory1Name: { label: null, key: 'myName' }, // my_name
    signatory1Business: { label: null, key: 'myBusinessName' }, // my_business_name
    signatory2Name: { label: null, key: 'recipientName' }, // recipient_name
    signatory2Organisation: { label: null, key: 'organisationName' }, // organisation_name
    signatureLine: { label: 'Signature', key: null },
    dateLine: { label: 'Date', key: null },
  },
} as const

/** Flat list of every front-end label and its JSON key (for easy translation tables) */
export const PROPOSAL_LABELS_AND_KEYS: Array<{ label: string; key: string | null; path: string }> = [
  { label: 'Product Proposal', key: null, path: 'documentTitle' },
  { label: 'Even Pinah Services', key: null, path: 'header.companyNameEn' },
  { label: 'Date of proposal:', key: 'proposalDate', path: 'header.dateOfProposal' },
  { label: 'Due date for signature:', key: 'signatureDueDate', path: 'header.dueDateForSignature' },
  { label: '1. Client Details', key: null, path: 'section1.title' },
  { label: 'Client Name:', key: 'clientName', path: 'section1.clientName' },
  { label: 'Addressed To:', key: 'recipientName', path: 'section1.addressedTo' },
  { label: 'Business Type:', key: 'businessType', path: 'section1.businessType' },
  { label: '2. Executive Summary', key: null, path: 'section2.title' },
  { label: 'Current situation:', key: 'frankensteinStatus', path: 'section2.currentSituation' },
  { label: 'Core pain point:', key: 'corePainPoint', path: 'section2.corePainPoint' },
  { label: 'Concept:', key: 'concept', path: 'section2.concept' },
  { label: '3. Project Scope', key: null, path: 'section3.title' },
  { label: '3.1 In Scope', key: 'inScope', path: 'section3.inScope' },
  { label: '3.2 Future Features', key: 'outOfScope', path: 'section3.futureFeatures' },
  { label: '4. Client Obligations', key: null, path: 'section4.title' },
  { label: 'Client Must Provide', key: 'clientMustProvide', path: 'section4.clientMustProvide' },
  { label: 'Assets', key: 'obligations.assets', path: 'section4.assets' },
  { label: 'Technical', key: 'obligations.technical', path: 'section4.technical' },
  { label: 'Timeline', key: 'obligations.timeline', path: 'section4.timeline' },
  { label: 'Technical Dependencies', key: 'technicalDependencies', path: 'section4.technicalDependencies' },
  { label: '5. Success Metrics', key: null, path: 'section5.title' },
  { label: '6. Quote', key: null, path: 'section6.title' },
  { label: 'Contract Type:', key: 'contractType', path: 'section6.contractType' },
  { label: 'Estimated Development Hours:', key: 'estimatedHours', path: 'section6.estimatedDevelopmentHours' },
  { label: 'Estimated Time Total:', key: 'estimatedTimeTotal', path: 'section6.estimatedTimeTotal' },
  { label: 'Project Fee:', key: 'baseProjectFee', path: 'section6.projectFee' },
  { label: 'Retainer', key: null, path: 'section6.retainer' },
  { label: 'Retainer Fee:', key: 'retainerAmount', path: 'section6.retainerFee' },
  { label: 'Retainer Duration:', key: 'retainerDuration', path: 'section6.retainerDuration' },
  { label: 'Retainer Details:', key: 'retainerDetails', path: 'section6.retainerDetails' },
  { label: 'Maintenance', key: null, path: 'section6.maintenance' },
  { label: 'Maintenance Fee:', key: 'maintenanceAmount', path: 'section6.maintenanceFee' },
  { label: 'Maintenance Duration:', key: 'maintenanceDuration', path: 'section6.maintenanceDuration' },
  { label: 'Maintenance Details:', key: 'maintenanceDetails', path: 'section6.maintenanceDetails' },
  { label: 'Payment Milestones:', key: 'paymentMilestones', path: 'section6.paymentMilestones' },
  { label: 'Risk Buffer:', key: 'riskBuffer', path: 'section6.riskBuffer' },
  { label: 'External Costs:', key: 'externalCosts', path: 'section6.externalCosts' },
  { label: 'Total quote amount:', key: 'totalQuoteAmount', path: 'section6.totalQuoteAmount' },
  { label: '7. Project Milestones', key: null, path: 'section7.title' },
  { label: 'Breakdown by estimated weeks per phase.', key: null, path: 'section7.tableCaptionWeeks' },
  { label: 'Breakdown by estimated hours per phase.', key: null, path: 'section7.tableCaptionHours' },
  { label: 'Phase / Milestone', key: null, path: 'section7.tableHeaderPhase' },
  { label: 'Estimated weeks', key: null, path: 'section7.tableHeaderEstimatedWeeks' },
  { label: 'Estimated hours', key: null, path: 'section7.tableHeaderEstimatedHours' },
  { label: 'No milestones defined.', key: null, path: 'section7.tableEmpty' },
  { label: 'Total', key: null, path: 'section7.tableFooterTotal' },
  { label: '8. Terms and Conditions', key: null, path: 'section8.title' },
  { label: 'Signatures', key: null, path: 'signatures.title' },
  { label: 'Signature', key: null, path: 'signatures.signatureLine' },
  { label: 'Date', key: null, path: 'signatures.dateLine' },
]

/**
 * Hebrew (RTL) label translations – professional formal tone.
 * Keyed by the English label for direct lookup.
 */
export const HE_LABELS: Record<string, string> = {
  'Product Proposal': 'הצעת מחיר',
  'Even Pinah Services': 'שירותי אבן פינה',
  'Date of proposal:': 'תאריך ההצעה:',
  'Due date for signature:': 'תוקף ההצעה:',
  '1. Client Details': '1. פרטי הלקוח',
  'Client Name:': 'שם הלקוח:',
  'Addressed To:': 'לכבוד:',
  'Business Type:': 'סוג העסק:',
  '2. Executive Summary': '2. תקציר מנהלים',
  'Current situation:': 'מצב קיים:',
  'Core pain point:': 'אתגר מרכזי:',
  'Concept:': 'הקונספט:',
  '3. Project Scope': '3. היקף הפרויקט',
  '3.1 In Scope': '3.1 כלול בפרויקט',
  '3.2 Future Features': '3.2 תכונות עתידיות',
  '4. Client Obligations': '4. התחייבויות הלקוח',
  'Client Must Provide': 'על הלקוח לספק',
  'Assets': 'נכסים',
  'Technical': 'טכני',
  'Timeline': 'לוח זמנים',
  'Technical Dependencies': 'תלויות טכניות',
  '5. Success Metrics': '5. מדדי הצלחה',
  '6. Quote': '6. הצעת מחיר',
  'Contract Type:': 'סוג ההתקשרות:',
  'Estimated Development Hours:': 'שעות פיתוח משוערות:',
  'Estimated Time Total:': 'זמן כולל משוער:',
  'Project Fee:': 'עלות הפרויקט:',
  'Retainer': 'ריטיינר',
  'Retainer Fee:': 'דמי ריטיינר:',
  'Retainer Duration:': 'משך הריטיינר:',
  'Retainer Details:': 'פירוט ריטיינר:',
  'Maintenance': 'תחזוקה',
  'Maintenance Fee:': 'דמי תחזוקה:',
  'Maintenance Duration:': 'משך התחזוקה:',
  'Maintenance Details:': 'פירוט תחזוקה:',
  'Payment Milestones:': 'אבני דרך לתשלום:',
  'Risk Buffer:': 'מרווח ביטחון:',
  'External Costs:': 'עלויות חיצוניות:',
  'Total quote amount:': 'סה״כ הצעת מחיר:',
  '7. Project Milestones': '7. אבני דרך',
  'Breakdown by estimated weeks per phase.': 'פירוט לפי שבועות משוערים לכל שלב.',
  'Breakdown by estimated hours per phase.': 'פירוט לפי שעות משוערות לכל שלב.',
  'Phase / Milestone': 'שלב / אבן דרך',
  'Estimated weeks': 'שבועות משוערים',
  'Estimated hours': 'שעות משוערות',
  'No milestones defined.': 'לא הוגדרו אבני דרך.',
  'Total': 'סה״כ',
  '8. Terms and Conditions': '8. תנאים והתניות',
  'Signatures': 'חתימות',
  'Signature': 'חתימה',
  'Date': 'תאריך',

  // Common Terms & Conditions subsection titles
  'Financial Commencement': 'תחילת התקשרות כספית',
  'Payment Terms': 'תנאי תשלום',
  'Payment': 'תשלום',
  'Intellectual Property': 'קניין רוחני',
  'Confidentiality': 'סודיות',
  'Termination': 'סיום התקשרות',
  'Liability': 'אחריות',
  'Limitation Of Liability': 'הגבלת אחריות',
  'General': 'כללי',
  'General Terms': 'תנאים כלליים',
  'Vat': 'מע״מ',
  'VAT': 'מע״מ',
  'Warranty': 'אחריות',
  'Dispute Resolution': 'יישוב סכסוכים',
  'Force Majeure': 'כוח עליון',
  'Amendments': 'תיקונים',
  'Governing Law': 'דין חל',
  'Scope Of Work': 'היקף העבודה',
  'Project Timeline': 'לוח זמנים לפרויקט',
  'Software Costs': 'עלויות תוכנה',
  'Cancellation': 'ביטול',
  'Cancellation Policy': 'מדיניות ביטול',
  'Cancellation/Delays': 'ביטולים ועיכובים',
  'Liability IP': 'אחריות וקניין רוחני',
  'Legal Accessibility': 'נגישות חוקית',
  'Deliverables': 'תוצרים',
  'Revisions': 'תיקונים ושינויים',
  'Communication': 'תקשורת',
  'Indemnification': 'שיפוי',
  'Non Solicitation': 'אי שידול',
  'Data Protection': 'הגנת מידע',
  'Ownership': 'בעלות',

  // Contract-type values
  'hourly': 'שעתי',
  'weekly': 'שבועי',
  'project': 'פרויקט',
  'retainer': 'ריטיינר',
  'maintenance': 'תחזוקה',
}

/** Translate a label: returns Hebrew when isRtl is true, English otherwise. */
export function t(label: string, isRtl: boolean): string {
  return isRtl ? (HE_LABELS[label] ?? label) : label
}

/** Snake_case JSON keys accepted by the parser (for reference) */
export const SNAKE_CASE_KEYS = [
  'client_name',
  'recipient_name',
  'business_type',
  'frankenstein_status',
  'core_pain_point',
  'concept',
  'level_of_service',
  'contract_type',
  'in_scope',
  'out_of_scope',
  'client_must_provide',
  'technical_dependencies',
  'definition_of_done',
  'estimated_hours',
  'estimated_time_total',
  'base_project_fee',
  'retainer_amount',
  'retainer_duration',
  'retainer_details',
  'maintenance_amount',
  'maintenance_duration',
  'maintenance_details',
  'payment_milestones',
  'risk_buffer',
  'external_costs',
  'total_quote_amount',
  'project_milestones',
  'terms_and_conditions',
  'proposal_date',
  'signature_due_date',
  'my_name',
  'my_business_name',
  'organisation_name',
] as const
