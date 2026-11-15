/**
 * NAVBAR
 * -------------------------------------------------------------
 * Sticky header with smooth-scroll links, an active-section
 * highlight and the "Book a Ride" button (jumps to the booking
 * search bar).
 *
 * Edit NAV_LINKS to rename / reorder the menu.
 */
import { useEffect, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { scrollToId } from './ui'

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'Destinations', id: 'destinations' },
  { label: 'Our Fleet', id: 'fleet' },
  { label: 'Services', id: 'services' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  /* Highlight the link of the section currently in view + add a shadow once scrolled */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
      let current = 'home'
      for (const { id } of NAV_LINKS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 140) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => (event) => {
    event.preventDefault()
    setMenuOpen(false)
    scrollToId(id)
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-surface/95 backdrop-blur-md transition-shadow ${
        scrolled ? 'border-line shadow-[0_10px_30px_-24px_rgba(18,26,29,0.6)]' : 'border-line/60'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-[70px]">
        {/* Logo ------------------------------------------------ */}
        <a href="#home" onClick={go('home')} className="flex shrink-0 items-center gap-2.5">
          <img
            src="/logo.png"
            alt="Karnail Tour and Travels"
            className="h-11 w-auto object-contain"
            width={833}
            height={676}
          />
          <span className="leading-none">
            <span className="block font-display text-lg font-extrabold tracking-tight text-ink">KARNAIL</span>
            <span className="mt-0.5 block text-[9.5px] font-semibold tracking-[0.22em] text-muted">TOUR AND TRAVELS</span>
          </span>
        </a>

        {/* Desktop links ---------------------------------------- */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={go(id)}
              className={`relative py-1 text-sm font-medium transition-colors ${
                active === id ? 'text-flame' : 'text-ink hover:text-flame'
              }`}
            >
              {label}
              {active === id && (
                <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-flame" aria-hidden="true" />
              )}
            </a>
          ))}
        </nav>

        {/* Actions ---------------------------------------------- */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={go('book')}
            className="btn btn-flame hidden px-5 py-3 sm:inline-flex"
          >
            Book a Ride
            <ArrowRight size={15} />
          </button>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink transition hover:border-flame hover:text-flame lg:hidden"
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown -------------------------------------- */}
      {menuOpen && (
        <div className="animate-fade-in border-t border-line bg-surface px-4 pb-5 pt-3 lg:hidden">
          <nav className="flex flex-col">
            {NAV_LINKS.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={go(id)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active === id ? 'bg-flame/10 text-flame' : 'text-ink hover:bg-flame/10 hover:text-flame'
                }`}
              >
                {label}
              </a>
            ))}
          </nav>
          <button type="button" onClick={go('book')} className="btn btn-flame mt-3 w-full sm:hidden">
            Book a Ride
            <ArrowRight size={15} />
          </button>
        </div>
      )}
    </header>
  )
}
