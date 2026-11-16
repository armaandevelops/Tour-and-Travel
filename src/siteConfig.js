/**
 * SHARED BUSINESS DETAILS
 * -------------------------------------------------------------
 * Edit the phone numbers, e-mail and social links in ONE place —
 * every component picks them up automatically.
 *
 * Source: Karnail Tour and Travels developer brief (business card data).
 */
export const CONTACT = {
  brand: 'Karnail Tour and Travels',
  tagline: 'Your Journey, Our Commitment.',

  /** All business lines — rendered as tap-to-call links in footer & enquiry. */
  phones: [
    { display: '+91 98156 66135', dial: '+919815666135' },
    { display: '+91 99148 63778', dial: '+919914863778' },
    { display: '+91 97791 66167 ', dial: '+919779166167 ' },
  ],

  /** Primary line — used wherever a single number is shown. */
  phoneDisplay: '+91 98156 66135',
  phoneDial: '+919815666135',

  /** Digits only (country code + number) — used to build the wa.me link */
  whatsappNumber: '919815666135',
  email: 'karnailtours55@gmail.com',
  address: 'Chandigarh, India',
  copyright: '© 2026 Karnail Tour and Travels. All rights reserved.',
  signoff: 'Travel Safe, Travel Happy.',
}

/** Builds a pre-filled WhatsApp chat link (https://wa.me/...) */
export function whatsappLink(message = 'Hello Karnail Tour and Travels, I would like to make an enquiry.') {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`
}
