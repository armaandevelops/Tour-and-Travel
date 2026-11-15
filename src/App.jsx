/**
 * KARNAIL TOUR AND TRAVELS — page composition
 * -------------------------------------------------------------
 * Order of the sections:
 *   Navbar → Hero (+ booking search bar) → Destinations →
 *   Packages → Fleet → Services → Why Choose Us →
 *   Testimonials → Enquiry → Footer
 *
 * App also owns the `prefill` state that lets any section
 * (booking bar, package cards, fleet cards) pre-fill the enquiry
 * form at the bottom of the page.
 */
import { useCallback, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BookingSearchBar from './components/BookingSearchBar'
import Destinations from './components/Destinations'
import Packages from './components/Packages'
import Fleet from './components/Fleet'
import Services from './components/Services'
import WhyChooseUs from './components/WhyChooseUs'
import Testimonials from './components/Testimonials'
import EnquirySection from './components/EnquirySection'
import Footer from './components/Footer'

export default function App() {
  const [prefill, setPrefill] = useState(null)

  /** Scrolls to the enquiry form and fills it in with `values` */
  const sendToEnquiry = useCallback((values) => {
    setPrefill({ ...values, _ts: Date.now() })
  }, [])

  return (
    <div className="min-h-screen bg-bg font-sans text-ink">
      <Navbar />

      <main>
        <Hero>
          <BookingSearchBar onSendToEnquiry={sendToEnquiry} />
        </Hero>

        <Destinations />

        <Packages
          onBookPackage={(pkg) =>
            sendToEnquiry({
              service: pkg.id,
              message: `I am interested in the ${pkg.title} (${pkg.duration}) starting at ${pkg.price} ${pkg.priceNote}. Please share the itinerary and availability.`,
            })
          }
        />

        <Fleet onEnquire={sendToEnquiry} />

        <Services />
        <WhyChooseUs />
        <Testimonials />
        <EnquirySection prefill={prefill} />
      </main>

      <Footer />
    </div>
  )
}
