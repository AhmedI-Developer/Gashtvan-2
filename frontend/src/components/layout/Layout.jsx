import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import Preloader from './Preloader'
import WhatsAppButton from './WhatsAppButton'
import CustomCursor from './CustomCursor'
import SmoothScroll from '@/components/motion/SmoothScroll'
import PageTransition from '@/components/motion/PageTransition'
import { cn } from '@/lib/cn'

/** Pages whose first section is a full-bleed hero under the fixed navbar. */
function usesFlushHero(pathname) {
  if (
    pathname === '/' ||
    pathname === '/about' ||
    pathname === '/contact' ||
    pathname === '/offers' ||
    pathname === '/destinations'
  ) {
    return true
  }
  return /^\/offers\/[^/]+$/.test(pathname)
}

export default function Layout() {
  const location = useLocation()
  const flushHero = usesFlushHero(location.pathname)

  return (
    <SmoothScroll>
      <Preloader />
      <CustomCursor />
      <Navbar />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <div className={cn(!flushHero && 'page-offset')}>
            <Outlet />
          </div>
        </PageTransition>
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
    </SmoothScroll>
  )
}
