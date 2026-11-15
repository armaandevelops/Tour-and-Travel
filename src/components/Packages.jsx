/**
 * TOUR PACKAGES  (new section — sits directly under Destinations)
 * -------------------------------------------------------------
 * Same card style, colours and typography as the destination
 * grid. "Book Package" scrolls down to the enquiry form and
 * automatically selects that package in the dropdown.
 *
 * NOTE: PACKAGES is also imported by EnquirySection.jsx so the
 * dropdown options always stay in sync with these cards.
 */
import { ArrowRight, Check } from 'lucide-react'
import { SectionEyebrow } from './ui'

/* ---------- editable content (prices, text, images) ---------- */
export const PACKAGES = [
  {
    id: 'pkg-manali-escape',
    title: 'Manali 4D/3N Escape',
    duration: '4 Days / 3 Nights',
    price: '₹12,999',
    priceNote: 'per person',
    image: 'https://images.unsplash.com/photo-1712388430474-ace0c16051e2?auto=format&fit=crop&w=800&q=80',
    highlights: ['Solang Valley & Rohtang Pass', 'Old Manali cafés & Hadimba Temple', 'Private cab + daily breakfast'],
  },
  {
    id: 'pkg-shimla-weekend',
    title: 'Shimla Weekend Getaway',
    duration: '3 Days / 2 Nights',
    price: '₹8,499',
    priceNote: 'per person',
    image: 'https://images.unsplash.com/photo-1638951405741-a353e70747a3?auto=format&fit=crop&w=800&q=80',
    highlights: ['Mall Road & Ridge walk', 'Kufri day trip', 'Hotel + all transfers included'],
  },
  {
    id: 'pkg-amritsar-golden',
    title: 'Amritsar Golden Temple Tour',
    duration: '2 Days / 1 Night',
    price: '₹5,999',
    priceNote: 'per person',
    image: 'https://images.unsplash.com/photo-1757552528834-09a6e8c7c9ed?auto=format&fit=crop&w=800&q=80',
    highlights: ['Golden Temple & Wagah Border', 'Jallianwala Bagh heritage walk', 'Doorstep pick-up & drop'],
  },
  {
    id: 'pkg-himachal-circuit',
    title: 'Himachal Complete Circuit',
    duration: '7 Days / 6 Nights',
    price: '₹24,999',
    priceNote: 'per person',
    image: 'https://images.unsplash.com/photo-1784240256663-f53a45989d1c?auto=format&fit=crop&w=800&q=80',
    highlights: ['Shimla · Manali · Dharamshala', 'Sightseeing in every city', 'Dedicated driver for the full trip'],
  },
]

export default function Packages({ onBookPackage }) {
  return (
    <section id="packages" className="py-12 lg:py-16">
      <div className="container-x">
        {/* ---- Section heading ---- */}
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow center>Tour Packages</SectionEyebrow>
          <h2 className="section-title mt-4">Packages Built for Every Traveller</h2>
          <p className="section-sub mt-3">
            Handcrafted itineraries with private cabs, verified stays and zero hidden charges.
          </p>
        </div>

        {/* ---- Package cards ---- */}
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PACKAGES.map((pkg) => (
            <article
              key={pkg.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-flame/60 hover:shadow-[0_28px_45px_-30px_rgba(18,26,29,0.6)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                  {pkg.duration}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-base font-semibold leading-snug text-ink">{pkg.title}</h3>

                <ul className="mt-3 space-y-1.5">
                  {pkg.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2 text-[13px] leading-snug text-muted">
                      <Check size={14} className="mt-0.5 shrink-0 text-flame" aria-hidden="true" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <p className="mt-4 border-t border-line pt-4 text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Starting at
                  </p>
                  <p className="mt-1 flex items-baseline gap-1.5">
                    <span className="font-display text-2xl font-bold text-flame">{pkg.price}</span>
                    <span className="text-xs text-muted">{pkg.priceNote}</span>
                  </p>

                  <button type="button" onClick={() => onBookPackage(pkg)} className="btn btn-flame mt-4 w-full">
                    Book Package
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
