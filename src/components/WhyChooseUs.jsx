/**
 * WHY CHOOSE US
 * -------------------------------------------------------------
 * The dark teal panel with the mountain photo. Doubles as the
 * "About" anchor for the navbar.
 */
import { Car, Headphones, ShieldCheck, Smile } from 'lucide-react'
import { SectionEyebrow } from './ui'

/* ---------- editable content ---------- */
const PANEL_IMAGE =
  'https://images.unsplash.com/photo-1780590099316-e7daa792e7d7?auto=format&fit=crop&w=1600&q=80'

const FEATURES = [
  { id: 'safe', label: 'Safe &\nReliable', icon: ShieldCheck },
  { id: 'support', label: '24/7\nSupport', icon: Headphones },
  { id: 'vehicles', label: 'Comfortable\nVehicles', icon: Car },
  { id: 'satisfaction', label: 'Customer\nSatisfaction', icon: Smile },
]

export default function WhyChooseUs() {
  return (
    <section id="about" className="container-x py-6 lg:py-8">
      <div className="relative isolate overflow-hidden rounded-2xl bg-teal text-cream">
        {/* Mountain backdrop + teal scrim */}
        <img
          src={PANEL_IMAGE}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(29,53,60,0.98)_0%,rgba(29,53,60,0.94)_42%,rgba(29,53,60,0.72)_100%)]" />

        <div className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[minmax(0,330px)_minmax(0,1fr)] lg:items-center lg:gap-12 lg:p-11">
          {/* ---- Copy ---- */}
          <div>
            <SectionEyebrow tone="cream">Why Choose Us</SectionEyebrow>
            <h2 className="mt-4 font-display text-[1.7rem] font-bold leading-[1.2] tracking-tight text-white sm:text-3xl">
              Your Trusted Travel Partner
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/75">
              We are committed to providing the best travel experience with professionalism and care.
            </p>
          </div>

          {/* ---- Features ---- */}
          <div className="grid grid-cols-2 gap-6 border-t border-white/20 pt-7 lg:grid-cols-4 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            {FEATURES.map(({ id, label, icon: Icon }) => (
              <div key={id} className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
                <Icon size={30} strokeWidth={1.7} className="text-white" aria-hidden="true" />
                <p className="whitespace-pre-line font-display text-sm font-semibold leading-snug text-white">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
