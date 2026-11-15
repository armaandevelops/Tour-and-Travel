/**
 * HERO
 * -------------------------------------------------------------
 * Full-width photo banner with the headline, the two calls to
 * action and the booking search bar (passed in as `children`
 * from App.jsx).
 *
 * The section is at least (100svh − navbar) tall and centres its
 * content, so on first load the whole booking bar is visible on
 * any screen — short laptops, tall phones or large monitors.
 */
import { ArrowRight } from 'lucide-react'
import { scrollToId } from './ui'

/* ---------- editable content ---------- */
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1784240256663-f53a45989d1c?auto=format&fit=crop&w=1920&q=80'
const EYEBROW = 'Travel • Explore • Discover'
const HEADLINE_TOP = 'Your Journey,'
const HEADLINE_ACCENT = 'Commitment.'
const SUBTITLE =
  'Book your cab or plan your next trip with Karnail Tour and Travels – Safe, Comfortable & Reliable.'

export default function Hero({ children }) {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[calc(100svh_-_4rem)] flex-col justify-center overflow-hidden lg:min-h-[calc(100svh_-_70px)]"
    >
      {/* Background photograph */}
      <img
        src={HERO_IMAGE}
        alt="Winding mountain road through the snow capped Himalayas"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />

      {/* Dark scrim so the copy stays readable over the photo */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(18,26,29,0.97)_0%,rgba(18,26,29,0.9)_30%,rgba(18,26,29,0.7)_55%,rgba(18,26,29,0.35)_80%,rgba(18,26,29,0.2)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-black/15" />

      {/* Vertical rhythm scales with the viewport height so the whole
          booking bar stays above the fold on first load (short laptop
          screens as well as tall monitors). */}
      <div className="container-x relative w-full py-[clamp(1.25rem,4vh,3rem)]">
        <div className="max-w-[560px]">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/80">
            {EYEBROW}
            <span className="h-px w-14 bg-flame" aria-hidden="true" />
          </p>

          <h1 className="mt-4 font-display text-[clamp(1.85rem,9.5vw,2.5rem)] font-bold leading-[1.05] tracking-tight text-ink sm:mt-5 sm:text-5xl lg:text-[clamp(3rem,9vh,3.75rem)]">
            {HEADLINE_TOP}
            <br />
            Our <span className="italic text-flame">{HEADLINE_ACCENT}</span>
          </h1>

          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted sm:mt-5">{SUBTITLE}</p>

          <div className="mt-6 flex flex-wrap gap-3 sm:mt-7">
            <button type="button" onClick={() => scrollToId('book')} className="btn btn-flame">
              Book Now
              <ArrowRight size={16} />
            </button>
            <button type="button" onClick={() => scrollToId('packages')} className="btn btn-outline">
              Explore Packages
            </button>
          </div>
        </div>

        {/* Booking search bar sits on the photo at the bottom of the hero */}
        <div className="mt-[clamp(1.5rem,6vh,3.5rem)]">{children}</div>
      </div>
    </section>
  )
}
