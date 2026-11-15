/**
 * TESTIMONIALS
 * -------------------------------------------------------------
 * Carousel with interactive dots. Desktop shows 3 cards per slide,
 * smaller screens show 1. The carousel gently auto-rotates and
 * pauses while you hover over it.
 */
import { useEffect, useState } from 'react'
import { Quote } from 'lucide-react'
import { SectionEyebrow } from './ui'

/* ---------- editable content ---------- */
const TESTIMONIALS = [
  {
    id: 't1',
    quote: 'Excellent service! The driver was polite and the journey was super comfortable.',
    name: 'Rahul Sharma',
    city: 'Chandigarh',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 't2',
    quote: 'Best travel agency in the region. Highly recommended for tours and cabs.',
    name: 'Priya Mehta',
    city: 'Delhi',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 't3',
    quote: 'Smooth booking, on-time pickup and very professional team.',
    name: 'Amanpreet Singh',
    city: 'Mohali',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    id: 't4',
    quote: 'We booked a Tempo Traveller for a family wedding — clean vehicle, courteous driver and a fair price.',
    name: 'Neha Kapoor',
    city: 'Ludhiana',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: 't5',
    quote: 'Our Manali trip was perfectly organised from day one. The cab and hotels were exactly as promised.',
    name: 'Rohit Malhotra',
    city: 'Delhi',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
  },
  {
    id: 't6',
    quote: 'Punctual 4 AM airport transfer. The driver tracked our flight and was waiting at arrivals.',
    name: 'Simran Kaur',
    city: 'Bengaluru',
    avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
  },
  {
    id: 't7',
    quote: 'Transparent pricing with no last-minute additions. Very happy with the Shimla weekend package.',
    name: 'Vikram Sethi',
    city: 'Chandigarh',
    avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
  },
  {
    id: 't8',
    quote: 'The Golden Temple tour was well planned and the driver knew every route in Amritsar.',
    name: 'Arjun Nair',
    city: 'Pune',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
  },
  {
    id: 't9',
    quote: 'Professional, safe and always reachable on call. We now use Karnail for all our office travel.',
    name: 'Kavita Sharma',
    city: 'Gurugram',
    avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
  },
]

const AUTO_ROTATE_MS = 6000

export default function Testimonials() {
  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)
  const [perView, setPerView] = useState(3)

  /* 3 cards per slide on desktop, 1 card on smaller screens */
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')
    const update = () => setPerView(media.matches ? 3 : 1)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const pages = Math.max(1, Math.ceil(TESTIMONIALS.length / perView))
  /* Clamp during render so resizing the window can never leave us on a missing page */
  const activePage = Math.min(page, pages - 1)

  /* Auto-rotate unless the user is hovering */
  useEffect(() => {
    if (paused) return undefined
    const timer = setInterval(() => setPage((current) => (Math.min(current, pages - 1) + 1) % pages), AUTO_ROTATE_MS)
    return () => clearInterval(timer)
  }, [paused, pages])

  const visible = TESTIMONIALS.slice(activePage * perView, activePage * perView + perView)

  return (
    <section className="container-x py-12 lg:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <SectionEyebrow center>Our Clients</SectionEyebrow>
        <h2 className="section-title mt-4">What Our Customers Say</h2>
      </div>

      <div
        className="mt-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div key={`${activePage}-${perView}`} className="animate-fade-in grid gap-4 lg:grid-cols-3">
          {visible.map((item) => (
            <figure
              key={item.id}
              className="flex flex-col rounded-xl border border-line bg-surface p-6 shadow-sm transition-shadow hover:shadow-[0_24px_40px_-32px_rgba(18,26,29,0.6)]"
            >
              <Quote size={30} className="text-flame fill-flame" strokeWidth={1.5} aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink">&ldquo;{item.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <img src={item.avatar} alt={item.name} loading="lazy" className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-ink">{item.name}</p>
                  <p className="text-xs text-muted">{item.city}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* ---- Dots ---- */}
        <div className="mt-7 flex items-center justify-center gap-2.5">
          {Array.from({ length: pages }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setPage(index)}
              aria-label={`Go to slide ${index + 1} of ${pages}`}
              aria-current={index === activePage}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                index === activePage ? 'scale-110 bg-flame' : 'bg-line hover:bg-flame/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
