/**
 * SERVICES WE OFFER
 * -------------------------------------------------------------
 * Six icon cards. Edit the SERVICES array to rename, re-order or
 * swap the icons (icons come from lucide-react).
 */
import { Briefcase, Camera, Hotel, Luggage, MountainSnow, Plane } from 'lucide-react'
import { SectionEyebrow } from './ui'

/* ---------- editable content ---------- */
const SERVICES = [
  { id: 'airport', label: 'Airport Transfers', icon: Plane },
  { id: 'outstation', label: 'Outstation Cabs', icon: Luggage },
  { id: 'corporate', label: 'Corporate Travel', icon: Briefcase },
  { id: 'hotel', label: 'Hotel Assistance', icon: Hotel },
  { id: 'packages', label: 'Tour Packages', icon: MountainSnow },
  { id: 'sightseeing', label: 'Local Sightseeing', icon: Camera },
]

export default function Services() {
  return (
    <section id="services" className="container-x py-12 lg:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <SectionEyebrow center>Our Services</SectionEyebrow>
        <h2 className="section-title mt-4">Services We Offer</h2>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {SERVICES.map(({ id, label, icon: Icon }) => (
          <div
            key={id}
            className="group flex flex-col items-center justify-center rounded-xl border border-line bg-surface px-3 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-flame/60 hover:shadow-[0_24px_38px_-30px_rgba(18,26,29,0.6)]"
          >
            <Icon
              size={30}
              strokeWidth={1.7}
              className="text-teal transition-colors group-hover:text-flame dark:text-[#5FA9B8] dark:group-hover:text-flame"
              aria-hidden="true"
            />
            <p className="mt-3.5 font-display text-[13.5px] font-semibold leading-tight text-ink">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
