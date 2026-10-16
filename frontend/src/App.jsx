import { lazy, Suspense } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import AdminLayout from '@/components/admin/AdminLayout'
import Home from '@/pages/Home'

const Offers = lazy(() => import('@/pages/Offers'))
const OfferDetail = lazy(() => import('@/pages/OfferDetail'))
const AboutUs = lazy(() => import('@/pages/AboutUs'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const AdminLogin = lazy(() => import('@/pages/admin/Login'))
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'))
const AdminOffersList = lazy(() => import('@/pages/admin/OffersList'))
const AdminOfferForm = lazy(() => import('@/pages/admin/OfferForm'))
const AdminDestinationsList = lazy(() => import('@/pages/admin/DestinationsList'))
const AdminDestinationForm = lazy(() => import('@/pages/admin/DestinationForm'))

function RouteFallback() {
  return (
    <div className="container-shell flex min-h-[50vh] items-center justify-center pt-28 text-[var(--text-muted)]">
      Loading…
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="offers" element={<AdminOffersList />} />
          <Route path="offers/new" element={<AdminOfferForm />} />
          <Route path="offers/:id/edit" element={<AdminOfferForm />} />
          <Route path="destinations" element={<AdminDestinationsList />} />
          <Route path="destinations/new" element={<AdminDestinationForm />} />
          <Route path="destinations/:id/edit" element={<AdminDestinationForm />} />
        </Route>

        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="offers" element={<Offers />} />
          <Route path="offers/:slug" element={<OfferDetail />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="company" element={<Navigate to="/about" replace />} />
          <Route path="vision" element={<Navigate to="/about" replace />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
