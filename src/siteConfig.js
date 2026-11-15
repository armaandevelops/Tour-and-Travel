/**
 * SHARED BUSINESS DETAILS
 * -------------------------------------------------------------
 * Edit the phone number, e-mail and social links in ONE place —
 * every component picks them up automatically.
 */
export const CONTACT = {
  brand: 'Karnail Tour and Travels',
  tagline: 'Your Journey, Our Commitment.',
  phoneDisplay: '+91 98765 43210',
  phoneDial: '+919876543210',
  /** Digits only — used to build the wa.me link */
  whatsappNumber: '919876543210',
  email: 'info@karnailtravels.com',
  address: 'Mohali, Punjab',
  copyright: '© 2026 Karnail Tour and Travels. All rights reserved.',
  signoff: 'Travel Safe, Travel Happy.',
}

/** Builds a pre-filled WhatsApp chat link (https://wa.me/...) */
export function whatsappLink(message = 'Hello Karnail Tour and Travels, I would like to make an enquiry.') {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`
}
