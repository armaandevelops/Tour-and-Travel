/**
 * POPULAR DESTINATIONS
 * -------------------------------------------------------------
 * Left column = heading + call to action, right column = photo
 * cards. "View All Destinations" expands the grid from 4 cards to
 * the full list (edit DESTINATIONS / VISIBLE_COUNT below).
 */
import { useState } from 'react'
import { ArrowRight, MapPin } from 'lucide-react'
import { SectionEyebrow } from './ui'

/* ---------- editable content ---------- */
export const DESTINATIONS = [
  {
    id: 'manali',
    name: 'Manali',
    image: 'https://images.unsplash.com/photo-1712388430474-ace0c16051e2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'shimla',
    name: 'Shimla',
    image: 'https://images.unsplash.com/photo-1638951405741-a353e70747a3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'amritsar',
    name: 'Amritsar',
    image: 'https://images.unsplash.com/photo-1757552528834-09a6e8c7c9ed?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'goa',
    name: 'Goa',
    image: 'https://images.unsplash.com/photo-1646748019039-e908f7e41282?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dharamshala',
    name: 'Dharamshala',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Dharamshala%2C_Himachal_Pradesh_DSC07488.jpg/1280px-Dharamshala%2C_Himachal_Pradesh_DSC07488.jpg',
  },
  {
    id: 'kasol',
    name: 'Kasol',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Kasol_town_in_Kullu_District_in_Himachal_02.jpg/1280px-Kasol_town_in_Kullu_District_in_Himachal_02.jpg',
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Rishikesh_%28Ganges_View%29.jpg/1280px-Rishikesh_%28Ganges_View%29.jpg',
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/20191207_Lake_Pichola%2C_City_Palace%2C_Udaipur%2C_1516_7254.jpg/1280px-20191207_Lake_Pichola%2C_City_Palace%2C_Udaipur%2C_1516_7254.jpg',
  },
]

const VISIBLE_COUNT = 4 // how many cards show before "View All Destinations" is pressed

export default function Destinations() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? DESTINATIONS : DESTINATIONS.slice(0, VISIBLE_COUNT)

  return (
    <section id="destinations" className="container-x py-12 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,290px)_minmax(0,1fr)] lg:gap-10">
        {/* ---- Heading column ---- */}
        <div className="max-w-md">
          <SectionEyebrow>Popular Destinations</SectionEyebrow>
          <h2 className="section-title mt-4">Explore Incredible Destinations</h2>
          <p className="section-sub mt-3 max-w-[300px]">From the mountains to the beaches, travel with ease.</p>

          <button type="button" onClick={() => setShowAll((v) => !v)} className="btn btn-teal mt-6">
            {showAll ? 'Show Less' : 'View All Destinations'}
            <ArrowRight size={16} />
          </button>
        </div>

        {/* ---- Photo cards ---- */}
        <div key={String(showAll)} className="animate-fade-in grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {visible.map((place) => (
            <article
              key={place.id}
              className="group relative aspect-[5/4] overflow-hidden rounded-xl bg-surface shadow-sm"
            >
              <img
                src={place.image}
                alt={place.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 p-3 text-white">
                <MapPin size={15} className="shrink-0" aria-hidden="true" />
                <span className="font-display text-[15px] font-semibold leading-none">{place.name}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
