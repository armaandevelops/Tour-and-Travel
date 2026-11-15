/**
 * FOOTER
 * -------------------------------------------------------------
 * Dark teal footer with the logo, quick links, contact info and
 * social icons. Business details come from src/siteConfig.js.
 */
import { Mail, MapPin, MessageCircle, Mountain, Phone } from 'lucide-react'
import { CONTACT, whatsappLink } from '../siteConfig'
import { scrollToId } from './ui'

/* ---------- small brand icons (lucide no longer ships these) ---------- */
const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

function InstagramIcon({ size = 15 }) {
  return (
    <svg {...iconProps} width={size} height={size}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <path d="M16 11.4A4 4 0 1 1 12.6 8 4 4 0 0 1 16 11.4z" />
      <path d="M17.6 6.6h.01" />
    </svg>
  )
}

function FacebookIcon({ size = 15 }) {
  return (
    <svg {...iconProps} width={size} height={size}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function YoutubeIcon({ size = 15 }) {
  return (
    <svg {...iconProps} width={size} height={size}>
      <path d="M22.5 6.4a2.8 2.8 0 0 0-1.9-2C18.9 4 12 4 12 4s-6.9 0-8.6.4a2.8 2.8 0 0 0-1.9 2A29 29 0 0 0 1 11.8a29 29 0 0 0 .5 5.3 2.8 2.8 0 0 0 1.9 2c1.7.5 8.6.5 8.6.5s6.9 0 8.6-.5a2.8 2.8 0 0 0 1.9-2 29 29 0 0 0 .5-5.3 29 29 0 0 0-.5-5.4z" />
      <path d="M9.8 15V8.5l5.8 3.2z" />
    </svg>
  )
}

/* ---------- editable content ---------- */
const QUICK_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'Destinations', id: 'destinations' },
  { label: 'Our Fleet', id: 'fleet' },
  { label: 'Services', id: 'services' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
]

const SOCIAL_LINKS = [
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/', icon: InstagramIcon },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/', icon: FacebookIcon },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/', icon: YoutubeIcon },
]

export default function Footer() {
  const go = (id) => (event) => {
    event.preventDefault()
    scrollToId(id)
  }

  return (
    <footer className="bg-teal text-cream">
      <div className="container-x grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_0.8fr]">
        {/* ---- Brand ---- */}
        <div>
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="Karnail Tour and Travels"
              className="h-12 w-auto object-contain"
              width={833}
              height={676}
            />
            <span className="leading-none">
              <span className="block font-display text-lg font-extrabold tracking-tight text-white">KARNAIL</span>
              <span className="mt-1 block text-[9.5px] font-semibold tracking-[0.22em] text-cream/70">
                TOUR AND TRAVELS
              </span>
            </span>
          </div>
          <p className="mt-4 font-display text-sm italic text-cream/80">{CONTACT.tagline}</p>
        </div>

        {/* ---- Quick links ---- */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h3>
          <nav className="mt-4 grid grid-flow-col grid-rows-3 gap-x-6 gap-y-2.5">
            {QUICK_LINKS.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={go(id)}
                className="text-sm text-cream/75 transition-colors hover:text-flame"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* ---- Contact ---- */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Contact Info</h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/75">
            <li>
              <a href={`tel:${CONTACT.phoneDial}`} className="flex items-center gap-2.5 transition-colors hover:text-flame">
                <Phone size={14} className="shrink-0 text-flame" />
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 transition-colors hover:text-flame"
              >
                <MessageCircle size={14} className="shrink-0 text-flame" />
                Chat on WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2.5 transition-colors hover:text-flame">
                <Mail size={14} className="shrink-0 text-flame" />
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin size={14} className="shrink-0 text-flame" />
              {CONTACT.address}
            </li>
          </ul>
        </div>

        {/* ---- Social ---- */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Follow Us</h3>
          <div className="mt-4 flex gap-3">
            {SOCIAL_LINKS.map(({ id, label, href, icon: Icon }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/25 text-cream/85 transition hover:border-flame hover:bg-flame hover:text-white"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Bottom bar ---- */}
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-cream/65 sm:flex-row">
          <p>{CONTACT.copyright}</p>
          <p className="flex items-center gap-2">
            {CONTACT.signoff}
            <Mountain size={14} className="text-cream/80" aria-hidden="true" />
          </p>
        </div>
      </div>
    </footer>
  )
}
