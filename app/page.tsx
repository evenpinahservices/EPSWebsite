import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import LogoCarousel from '@/components/LogoCarousel'
import Mission from '@/components/Mission'
import Vision from '@/components/Vision'
import SocialProof from '@/components/SocialProof'
import Booking from '@/components/Booking'
import Footer from '@/components/Footer'
import BugReport from '@/components/BugReport'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <LogoCarousel />
      <Mission />
      <Vision />
      <Booking />
      <SocialProof />
      <Footer />
      <BugReport />
    </main>
  )
}

