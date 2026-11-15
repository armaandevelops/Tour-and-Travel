/**
 * OUR FLEET
 * -------------------------------------------------------------
 * Same two-column layout as the destinations section. Each vehicle
 * card can be clicked to pre-fill the enquiry form with that
 * vehicle, and the CTA button scrolls to the enquiry form too.
 */
import { ArrowRight } from 'lucide-react'
import { SectionEyebrow } from './ui'

/* ---------- editable content (vehicles + images) ---------- */
const VEHICLES = [
  {
    id: 'sedan',
    name: 'Sedan',
    seats: '(4 Seater)',
    image: 'https://images.unsplash.com/photo-1594200921738-cfbb5e7b9dce?auto=format&fit=crop&w=800&q=80',
    note: 'Dzire / Etios class',
  },
  {
    id: 'suv',
    name: 'SUV',
    seats: '(6 Seater)',
    image: 'https://images.unsplash.com/photo-1719970680701-9c9f5c3ff8b0?auto=format&fit=crop&w=800&q=80',
    note: 'Comfort for hill roads',
  },
  {
    id: 'innova',
    name: 'Innova',
    seats: '(7 Seater)',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Toyota_Innova_KUN40_FL2_2.5_V_Pearl_White.jpg/1280px-Toyota_Innova_KUN40_FL2_2.5_V_Pearl_White.jpg',
    note: 'Family favourite',
  },
  {
    id: 'tempo-traveller',
    name: 'Tempo Traveller',
    seats: '(12-17 Seater)',
    image: 'https://images.unsplash.com/photo-1776521906834-45551a2004ac?auto=format&fit=crop&w=800&q=80',
    note: 'Group tours & weddings',
  },
]

export default function Fleet({ onEnquire }) {
  const enquireAbout = (vehicle) =>
    onEnquire({
      service: 'cab',
      message: vehicle
        ? `I would like to book your ${vehicle.name} ${vehicle.seats}. Please share availability and rates.`
        : 'I would like to book a vehicle from your fleet. Please share available options and rates.',
    })

  return (
    <section id="fleet" className="container-x py-12 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,290px)_minmax(0,1fr)] lg:gap-10">
        {/* ---- Heading column ---- */}
        <div className="max-w-md">
          <SectionEyebrow>Our Fleet</SectionEyebrow>
          <h2 className="section-title mt-4">Travel in Comfort</h2>
          <p className="section-sub mt-3 max-w-[300px]">A well-maintained fleet for your every journey.</p>

          <button type="button" onClick={() => enquireAbout(null)} className="btn btn-teal mt-6">
            View Our Fleet
            <ArrowRight size={16} />
          </button>
        </div>

        {/* ---- Vehicle cards ---- */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {VEHICLES.map((vehicle) => (
            <button
              key={vehicle.id}
              type="button"
              onClick={() => enquireAbout(vehicle)}
              title={`Enquire about the ${vehicle.name}`}
              className="group rounded-2xl border border-line bg-surface p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-flame/60 hover:shadow-[0_26px_40px_-30px_rgba(18,26,29,0.6)]"
            >
              <div className="aspect-[16/11] w-full overflow-hidden rounded-xl">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-3.5 font-display text-[15px] font-semibold leading-tight text-ink">{vehicle.name}</p>
              <p className="mt-1 text-[13px] text-muted">{vehicle.seats}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
