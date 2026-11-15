/**
 * BOOKING SEARCH BAR
 * -------------------------------------------------------------
 * • Four interactive tabs — One Way, Round Trip, Airport Transfer
 *   and Tour Packages. Switching a tab changes the inputs that are
 *   shown (Round Trip adds a Return Date, Airport Transfer adds a
 *   Flight No., Tour Packages asks for a destination + passengers).
 * • "Book Ride" validates everything, then opens a booking
 *   summary modal with an instant "Send via WhatsApp" button and a
 *   "Continue in Enquiry Form" button that pre-fills the form at
 *   the bottom of the page.
 */
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, Briefcase, Calendar, Car, MapPin, Plane, Users, X } from 'lucide-react'
import { whatsappLink } from '../siteConfig'
import { DESTINATIONS } from './Destinations'

/* ---------- editable content ---------- */
const TABS = [
  { id: 'oneway', label: 'One Way', icon: Car },
  { id: 'roundtrip', label: 'Round Trip', icon: Plane },
  { id: 'airport', label: 'Airport Transfer', icon: MapPin },
  { id: 'packages', label: 'Tour Packages', icon: Briefcase },
]

const DATE_FIELD = { icon: Calendar, type: 'date', placeholder: 'Select date', required: true }

/** The inputs shown for every tab */
const FIELDS = {
  oneway: [
    { name: 'from', label: 'From', icon: MapPin, placeholder: 'Enter pickup location', required: true },
    { name: 'to', label: 'To', icon: MapPin, placeholder: 'Enter drop location', required: true },
    { name: 'date', label: 'Travel Date', ...DATE_FIELD },
  ],
  roundtrip: [
    { name: 'from', label: 'From', icon: MapPin, placeholder: 'Enter pickup location', required: true },
    { name: 'to', label: 'To', icon: MapPin, placeholder: 'Enter drop location', required: true },
    { name: 'date', label: 'Travel Date', ...DATE_FIELD },
    { name: 'returnDate', label: 'Return Date', ...DATE_FIELD },
  ],
  airport: [
    { name: 'from', label: 'From', icon: Plane, placeholder: 'Enter airport / terminal', required: true },
    { name: 'to', label: 'To', icon: MapPin, placeholder: 'Enter drop location', required: true },
    { name: 'date', label: 'Travel Date', ...DATE_FIELD },
    { name: 'flight', label: 'Flight No.', icon: Plane, placeholder: 'e.g. AI 501 (optional)' },
  ],
  packages: [
    {
      name: 'destination',
      label: 'Destination',
      icon: MapPin,
      type: 'select',
      placeholder: 'Select destination',
      options: DESTINATIONS.map((d) => d.name),
      required: true,
    },
    { name: 'pickup', label: 'Pickup City', icon: MapPin, placeholder: 'Enter pickup city', required: true },
    { name: 'date', label: 'Travel Date', ...DATE_FIELD },
    { name: 'passengers', label: 'Passengers', icon: Users, type: 'number', placeholder: 'e.g. 4', required: true },
  ],
}

/** Which "Service / Package" entry the enquiry form should pre-select */
const SERVICE_FOR_TAB = { oneway: 'cab', roundtrip: 'cab', airport: 'airport', packages: 'packages' }

const DEFAULT_VALUES = {
  from: '',
  to: '',
  date: '',
  returnDate: '',
  flight: '',
  destination: '',
  pickup: '',
  passengers: '',
}

/* ---------- helpers ---------- */
function formatDate(value) {
  if (!value) return ''
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

export default function BookingSearchBar({ onSendToEnquiry }) {
  const [tab, setTab] = useState('oneway')
  const [values, setValues] = useState(DEFAULT_VALUES)
  const [errors, setErrors] = useState({})
  const [focusedField, setFocusedField] = useState(null)
  const [summary, setSummary] = useState(null)

  const fields = FIELDS[tab]
  const gridClass = fields.length + 1 === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'

  const setValue = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  /* ---------- validation ---------- */
  function validate() {
    const next = {}
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    fields.forEach((field) => {
      const value = (values[field.name] || '').trim()
      if (field.required && !value) next[field.name] = `${field.label} is required`
    })

    if (values.date && new Date(`${values.date}T00:00:00`) < today) {
      next.date = 'Travel date cannot be in the past'
    }
    if (values.returnDate && values.date && new Date(`${values.returnDate}T00:00:00`) < new Date(`${values.date}T00:00:00`)) {
      next.returnDate = 'Return date must be after the travel date'
    }
    if (values.passengers && Number(values.passengers) < 1) {
      next.passengers = 'At least 1 passenger is required'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!validate()) return
    setSummary({ tab, values: { ...values }, fields })
  }

  /* ---------- booking summary message ---------- */
  function buildMessage(data) {
    const tabLabel = TABS.find((t) => t.id === data.tab)?.label || 'Cab Booking'
    const lines = [
      'Hello Karnail Tour and Travels! I would like to book a ride.',
      '',
      `Ride type: ${tabLabel}`,
    ]
    data.fields.forEach((field) => {
      const raw = data.values[field.name]
      if (!raw) return
      lines.push(`${field.label}: ${field.type === 'date' ? formatDate(raw) : raw}`)
    })
    lines.push('', 'Please share the fare and availability. Thank you!')
    return lines.join('\n')
  }

  /* ---------- modal behaviour ---------- */
  useEffect(() => {
    if (!summary) return undefined
    const onKeyDown = (event) => event.key === 'Escape' && setSummary(null)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [summary])

  const sendToEnquiry = () => {
    const message = buildMessage(summary)
    setSummary(null)
    onSendToEnquiry({ service: SERVICE_FOR_TAB[summary.tab], message })
  }

  return (
    <div
      id="book"
      className="rounded-2xl border border-line bg-surface p-4 shadow-[0_28px_60px_-30px_rgba(18,26,29,0.5)] sm:p-5"
    >
      {/* ---- Tabs ---- */}
      <div className="-mx-1 flex gap-1 overflow-x-auto border-b border-line px-1 no-scrollbar sm:gap-2">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = tab === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              aria-pressed={isActive}
              className={`relative flex shrink-0 items-center gap-2 px-3 pb-3 pt-1 text-[13px] font-semibold transition-colors ${
                isActive ? 'text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              <Icon size={15} />
              {label}
              {isActive && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-flame" aria-hidden="true" />}
            </button>
          )
        })}
      </div>

      {/* ---- Inputs ---- */}
      <form onSubmit={handleSubmit} noValidate className={`mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 ${gridClass}`}>
        {fields.map((field) => {
          const isDate = field.type === 'date'
          const dateOpen = isDate && (focusedField === field.name || Boolean(values[field.name]))
          const showIcon = !dateOpen
          const hasError = Boolean(errors[field.name])

          return (
            <div key={field.name} className="min-w-0">
              <label className="label-xs" htmlFor={`bk-${field.name}`}>
                {field.label}
              </label>

              <div className="relative">
                {showIcon && field.icon && (
                  <field.icon
                    size={15}
                    className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-muted"
                    aria-hidden="true"
                  />
                )}

                {field.type === 'select' ? (
                  <select
                    id={`bk-${field.name}`}
                    className={`field ${hasError ? 'has-error' : ''}`}
                    value={values[field.name]}
                    onChange={(event) => setValue(field.name, event.target.value)}
                  >
                    <option value="">{field.placeholder}</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={`bk-${field.name}`}
                    type={isDate ? (dateOpen ? 'date' : 'text') : field.type || 'text'}
                    inputMode={field.type === 'number' ? 'numeric' : undefined}
                    min={field.type === 'number' ? 1 : undefined}
                    className={`field ${showIcon ? 'pl-9' : ''} ${hasError ? 'has-error' : ''}`}
                    placeholder={field.placeholder}
                    value={values[field.name]}
                    onFocus={isDate ? () => setFocusedField(field.name) : undefined}
                    onBlur={isDate ? () => setFocusedField(null) : undefined}
                    onChange={(event) => setValue(field.name, event.target.value)}
                  />
                )}
              </div>

              {hasError && (
                <p className="mt-1.5 text-[11px] font-medium text-red-600 dark:text-red-400">{errors[field.name]}</p>
              )}
            </div>
          )
        })}

        {/* The button slots into the grid next to the last field
            (or spans a full extra row when a tab shows 4 fields). */}
        <div
          className={`flex flex-col justify-end lg:col-span-1 ${fields.length >= 4 ? 'sm:col-span-2 md:col-span-2' : 'md:col-span-3'}`}
        >
          <button type="submit" className="btn btn-flame w-full py-[0.95rem]">
            Book Ride
            <ArrowRight size={16} />
          </button>
        </div>
      </form>

      {/* ---- Booking summary modal ----
          Portalled straight to <body>: the hero used to trap it in
          its own stacking context, so section images could paint
          over it. */}
      {summary && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-summary-title"
        >
          <div className="animate-overlay-in absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={() => setSummary(null)} />

          <div className="animate-pop-in relative max-h-[90vh] w-full overflow-y-auto rounded-t-2xl border border-line bg-surface p-5 shadow-2xl sm:max-w-lg sm:rounded-2xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flame">Booking Summary</p>
                <h3 id="booking-summary-title" className="mt-1.5 font-display text-xl font-bold text-ink">
                  {TABS.find((t) => t.id === summary.tab)?.label} Ride
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSummary(null)}
                aria-label="Close"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-muted transition hover:border-flame hover:text-flame"
              >
                <X size={15} />
              </button>
            </div>

            <dl className="mt-5 divide-y divide-line rounded-xl border border-line">
              {summary.fields.map((field) => {
                const raw = summary.values[field.name]
                if (!raw) return null
                return (
                  <div key={field.name} className="flex items-baseline justify-between gap-4 px-4 py-3">
                    <dt className="text-xs font-medium uppercase tracking-wider text-muted">{field.label}</dt>
                    <dd className="text-right text-sm font-semibold text-ink">
                      {field.type === 'date' ? formatDate(raw) : raw}
                    </dd>
                  </div>
                )
              })}
            </dl>

            <p className="mt-4 text-xs leading-relaxed text-muted">
              No advance payment needed — our team confirms the fare, driver details and availability on call.
            </p>

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <a
                href={whatsappLink(buildMessage(summary))}
                target="_blank"
                rel="noreferrer"
                className="btn flex-1 bg-[#25D366] px-5 py-3.5 text-white hover:bg-[#1ebe5a]"
              >
                Send via WhatsApp
              </a>
              <button type="button" onClick={sendToEnquiry} className="btn btn-teal flex-1 px-5 py-3.5">
                Continue in Enquiry Form
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  )
}
