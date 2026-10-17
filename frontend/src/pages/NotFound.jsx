import Seo from '@/components/layout/Seo'
import Button from '@/components/ui/Button'
import Logo from '@/components/brand/Logo'

export default function NotFound() {
  return (
    <main className="container-shell flex min-h-[70svh] flex-col items-center justify-center py-16 text-center sm:py-20">
      <Seo title="Page not found" path="/404" />
      <Logo className="mb-6 w-16 sm:w-20" />
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-display text-4xl font-bold text-[var(--text)]">
        This route has departed
      </h1>
      <p className="mt-3 max-w-md text-[var(--text-muted)]">
        The page you’re looking for isn’t on our map. Head home or browse current offers.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button to="/">Back home</Button>
        <Button to="/offers" variant="secondary">
          View offers
        </Button>
      </div>
    </main>
  )
}
