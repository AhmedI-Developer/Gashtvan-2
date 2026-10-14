import MagneticButton from '@/components/ui/MagneticButton'
import { site } from '@/config/site'
import globalNetwork from '@/assets/backgroundImage/Global_network.jpg'

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 md:py-20">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(120deg, #04203a 0%, #0a3358 55%, #04203a 100%)',
        }}
      />
      <img
        src={globalNetwork}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,32,58,0.62),rgba(4,32,58,0.78))]" />
      <div className="container-shell relative z-10 text-center text-white">
        <p className="eyebrow !text-[var(--accent)]">Ready when you are</p>
        <h2 className="mx-auto mt-3 max-w-3xl font-display text-[1.65rem] font-bold sm:text-3xl md:text-5xl">
          {site.ctaBanner}
        </h2>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
          <MagneticButton to="/offers" className="w-full sm:w-auto">
            View Offers
          </MagneticButton>
          <MagneticButton
            href="/#contact"
            variant="ghost"
            as="a"
            className="w-full sm:w-auto"
          >
            Contact Us
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
