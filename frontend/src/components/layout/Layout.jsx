import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import Preloader from './Preloader'
import WhatsAppButton from './WhatsAppButton'
import CustomCursor from './CustomCursor'
import SmoothScroll from '@/components/motion/SmoothScroll'
import PageTransition from '@/components/motion/PageTransition'

export default function Layout() {
  const location = useLocation()

  return (
    <SmoothScroll>
      <Preloader />
      <CustomCursor />
      <Navbar />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
    </SmoothScroll>
  )
}
