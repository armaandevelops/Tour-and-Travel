/**
 * Tiny shared UI helpers used by more than one section.
 */
import { ArrowRight } from 'lucide-react'

/** Smooth-scrolls the page to an element id (e.g. scrollToId('packages')) */
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/**
 * The little uppercase label that sits above every section heading
 * (e.g. "POPULAR DESTINATIONS ——").
 *   center = true  → lines on both sides (used by centred sections)
 *   tone    = 'cream' → white text on the dark teal panels
 */
export function SectionEyebrow({ children, center = false, tone = 'ink' }) {
  const textColor = tone === 'cream' ? 'text-cream/85' : 'text-ink/75'
  const line = <span className="h-px w-8 shrink-0 bg-flame" />

  return (
    <p
      className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] ${textColor} ${
        center ? 'justify-center' : ''
      }`}
    >
      {center && line}
      <span>{children}</span>
      {line}
    </p>
  )
}

/** Arrow button used for the "View all…" calls to action */
export function ArrowLink({ children, onClick, variant = 'teal', className = '' }) {
  return (
    <button type="button" onClick={onClick} className={`btn ${variant === 'flame' ? 'btn-flame' : 'btn-teal'} ${className}`}>
      {children}
      <ArrowRight size={16} />
    </button>
  )
}
