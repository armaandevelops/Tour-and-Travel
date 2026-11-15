/**
 * ENQUIRY SECTION  ("Ready to Travel?" banner + form)
 * -------------------------------------------------------------
 * Left  : the Ready to Travel banner and the Get in Touch details.
 * Right : a comprehensive enquiry form with validation, a loading
 *         state, a success confirmation and an optional
 *         "send on WhatsApp" shortcut.
 *
 * The form is pre-filled automatically when a visitor uses
 * "Book Package", "Book Ride" or clicks a fleet card — those
 * components call sendToEnquiry() in App.jsx which passes a
 * `prefill` object down to this component.
 */
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, CheckCircle2, Loader2, Mail, MessageCircle, Phone } from 'lucide-react'
import { CONTACT, whatsappLink } from '../siteConfig'
import { PACKAGES } from './Packages'
import { scrollToId } from './ui'

/* ---------- editable content ---------- */
const BANNER_IMAGE =
  'https://images.unsplash.com/photo-1727621010793-2942eb2c7de2?auto=format&fit=crop&w=1400&q=80'

const SERVICES = [
  { value: 'cab', label: 'Cab Booking' },
  { value: 'airport', label: 'Airport Transfer' },
  { value: 'packages', label: 'Tour Packages' },
  { value: 'hotel', label: 'Hotel Assistance' },
  { value: 'corporate', label: 'Corporate Travel' },
]

/** Every package also appears as an option (kept in sync with Packages.jsx) */
const PACKAGE_OPTIONS = PACKAGES.map((pkg) => ({ value: pkg.id, label: pkg.title }))

const EMPTY_FORM = {
  name: '',
  phone: '',
  email: '',
  service: '',
  date: '',
  passengers: '',
  message: '',
}

/* ---------- small local helper ---------- */
function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="label-xs">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-[11px] font-medium text-red-600 dark:text-red-400">{error}</p>}
    </div>
  )
}

export default function EnquirySection({ prefill }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const nameRef = useRef(null)

  const update = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  /* ---------- receive a pre-filled booking from another section ---------- */
  useEffect(() => {
    if (!prefill) return undefined
    setSent(false)
    setErrors({})
    setForm((prev) => ({ ...prev, ...prefill }))
    scrollToId('contact')
    const timer = setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 850)
    return () => clearTimeout(timer)
  }, [prefill])

  /* ---------- validation ---------- */
  function validate() {
    const next = {}
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (!form.name.trim()) next.name = 'Please enter your full name'
    else if (form.name.trim().length < 2) next.name = 'That name looks too short'

    const digits = form.phone.replace(/\D/g, '')
    const mobile = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits
    if (!mobile) next.phone = 'Please enter your phone number'
    else if (!/^[6-9]\d{9}$/.test(mobile)) next.phone = 'Enter a valid 10-digit mobile number'

    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      next.email = 'Enter a valid email address'
    }

    if (!form.service) next.service = 'Please select a service or package'
    if (!form.date) next.date = 'Please choose a travel date'
    else if (new Date(`${form.date}T00:00:00`) < today) next.date = 'Travel date cannot be in the past'

    if (!form.passengers) next.passengers = 'Please enter the number of passengers'
    else if (Number(form.passengers) < 1) next.passengers = 'At least 1 passenger is required'

    return next
  }

  /* ---------- WhatsApp helpers ---------- */
  function serviceLabel() {
    return (
      SERVICES.find((s) => s.value === form.service)?.label ||
      PACKAGE_OPTIONS.find((s) => s.value === form.service)?.label ||
      'Not selected'
    )
  }

  function buildWhatsAppMessage() {
    const lines = ['Hello Karnail Tour and Travels! I would like to send an enquiry.', '']
    if (form.name) lines.push(`Name: ${form.name}`)
    if (form.phone) lines.push(`Phone: ${form.phone}`)
    if (form.email) lines.push(`Email: ${form.email}`)
    lines.push(`Service / Package: ${serviceLabel()}`)
    if (form.date) lines.push(`Travel Date: ${form.date}`)
    if (form.passengers) lines.push(`Passengers: ${form.passengers}`)
    if (form.message) lines.push('', `Details: ${form.message}`)
    return lines.join('\n')
  }

  /* ---------- submit ---------- */
  function handleSubmit(event) {
    event.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) {
      document.getElementById(`en-${Object.keys(found)[0]}`)?.focus()
      return
    }

    setSubmitting(true)
    // Swap this timeout for your API / e-mail / CRM call:
    //   await fetch('/api/enquiry', { method: 'POST', body: JSON.stringify(form) })
    setTimeout(() => {
      setSubmitting(false)
      setSent(true)
    }, 1100)
  }

  const inputClass = (name) => `field ${errors[name] ? 'has-error' : ''}`

  return (
    <section id="contact" className="container-x py-12 lg:py-16">
      <div className="grid overflow-hidden rounded-2xl border border-line bg-surface lg:grid-cols-12">
        {/* ================= LEFT: banner + contact details ================= */}
        <div className="flex flex-col lg:col-span-5">
          {/* Ready to travel banner */}
          <div className="relative isolate flex min-h-[240px] flex-1 flex-col justify-center overflow-hidden p-8 sm:p-9">
            <img
              src={BANNER_IMAGE}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 -z-10 h-full w-full object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(29,53,60,0.94)_0%,rgba(29,53,60,0.82)_55%,rgba(29,53,60,0.6)_100%)]" />

            <h2 className="font-display text-2xl font-bold leading-tight text-white sm:text-[1.75rem]">
              Ready to Travel?
            </h2>
            <p className="mt-2 max-w-[280px] text-sm leading-relaxed text-cream/80">
              Get in touch with us for bookings and enquiries.
            </p>
            <button
              type="button"
              onClick={() => {
                scrollToId('enquiry-form')
                setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 700)
              }}
              className="btn btn-flame mt-6 self-start"
            >
              Contact Us
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Get in touch */}
          <div className="border-t border-line p-7 sm:p-8">
            <h3 className="font-display text-lg font-bold text-ink">Get in Touch</h3>
            <ul className="mt-4 space-y-3.5">
              <li className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-flame/12 text-flame">
                  <Phone size={15} />
                </span>
                <span className="flex flex-col gap-1.5 pt-0.5">
                  {CONTACT.phones.map((line) => (
                    <a
                      key={line.dial}
                      href={`tel:${line.dial}`}
                      className="text-sm font-medium text-ink transition-colors hover:text-flame"
                    >
                      {line.display}
                    </a>
                  ))}
                </span>
              </li>
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 text-sm font-medium text-ink transition-colors hover:text-flame"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#25D366]/12 text-[#25D366] transition-colors group-hover:bg-[#25D366] group-hover:text-white">
                    <MessageCircle size={15} />
                  </span>
                  Chat on WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group flex items-center gap-3 text-sm font-medium text-ink transition-colors hover:text-flame"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-flame/12 text-flame transition-colors group-hover:bg-flame group-hover:text-white">
                    <Mail size={15} />
                  </span>
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ================= RIGHT: enquiry form ================= */}
        <div className="border-t border-line p-6 sm:p-8 lg:col-span-7 lg:border-l lg:border-t-0">
          <h3 className="font-display text-lg font-bold text-ink">Enquiry Form</h3>

          {sent ? (
            /* ---------- success confirmation ---------- */
            <div className="animate-fade-in mt-5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center sm:p-8">
              <CheckCircle2 size={40} className="mx-auto text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <h4 className="mt-3 font-display text-lg font-bold text-ink">Enquiry Sent Successfully!</h4>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
                Thank you, {form.name.trim().split(' ')[0]}. Our team will call you shortly on{' '}
                <span className="font-semibold text-ink">{form.phone}</span> to confirm the details.
              </p>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
                <a
                  href={whatsappLink(buildWhatsAppMessage())}
                  target="_blank"
                  rel="noreferrer"
                  className="btn bg-[#25D366] px-5 py-3.5 text-white hover:bg-[#1ebe5a]"
                >
                  <MessageCircle size={16} />
                  Send a copy on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false)
                    setForm(EMPTY_FORM)
                    setErrors({})
                  }}
                  className="btn btn-outline px-5 py-3.5"
                >
                  Submit another enquiry
                </button>
              </div>
            </div>
          ) : (
            /* ---------- the form ---------- */
            <form id="enquiry-form" onSubmit={handleSubmit} noValidate className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field id="en-name" label="Full Name" error={errors.name}>
                <input
                  ref={nameRef}
                  id="en-name"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Rahul Sharma"
                  className={inputClass('name')}
                  value={form.name}
                  onChange={(event) => update('name', event.target.value)}
                />
              </Field>

              <Field id="en-phone" label="Phone Number" error={errors.phone}>
                <input
                  id="en-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="e.g. 98156 66135"
                  className={inputClass('phone')}
                  value={form.phone}
                  onChange={(event) => update('phone', event.target.value)}
                />
              </Field>

              <Field id="en-email" label="Email (Optional)" error={errors.email}>
                <input
                  id="en-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={inputClass('email')}
                  value={form.email}
                  onChange={(event) => update('email', event.target.value)}
                />
              </Field>

              <Field id="en-service" label="Service / Package" error={errors.service}>
                <select
                  id="en-service"
                  className={inputClass('service')}
                  value={form.service}
                  onChange={(event) => update('service', event.target.value)}
                >
                  <option value="">Select service or package</option>
                  <optgroup label="Services">
                    {SERVICES.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Tour Packages">
                    {PACKAGE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </Field>

              <Field id="en-date" label="Travel Date" error={errors.date}>
                <input
                  id="en-date"
                  type="date"
                  className={inputClass('date')}
                  value={form.date}
                  onChange={(event) => update('date', event.target.value)}
                />
              </Field>

              <Field id="en-passengers" label="Number of Passengers" error={errors.passengers}>
                <input
                  id="en-passengers"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  placeholder="e.g. 4"
                  className={inputClass('passengers')}
                  value={form.passengers}
                  onChange={(event) => update('passengers', event.target.value)}
                />
              </Field>

              <div className="sm:col-span-2">
                <label htmlFor="en-message" className="label-xs">
                  Trip Details / Message
                </label>
                <textarea
                  id="en-message"
                  rows={4}
                  placeholder="Pickup location, drop location, number of bags, preferred vehicle, special requests…"
                  className="field resize-y"
                  value={form.message}
                  onChange={(event) => update('message', event.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2.5 sm:col-span-2 sm:flex-row">
                <button type="submit" disabled={submitting} className="btn btn-flame flex-1 px-5 py-3.5 disabled:cursor-not-allowed disabled:opacity-70">
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Enquiry
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <a
                  href={whatsappLink(buildWhatsAppMessage())}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline flex-1 px-5 py-3.5"
                >
                  <MessageCircle size={16} />
                  Send on WhatsApp
                </a>
              </div>

              <p className="text-xs leading-relaxed text-muted sm:col-span-2">
                By sending an enquiry you agree to be contacted by our team. We never share your details.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
